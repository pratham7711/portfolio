'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DESK, POV, SEQ_FRAMES } from '@/lib/data'
import FrameScrubber, { FrameScrubberHandle } from '@/components/FrameScrubber'
import styles from './EngineerBridge.module.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * THE BRIDGE — match cut from the court to the desk.
 * Same player, different arena: 2 monitors, a MacBook, and the night shift.
 */
export default function EngineerBridge() {
  const wrapRef = useRef<HTMLElement>(null)
  const scrubberRef = useRef<FrameScrubberHandle>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: '+=220%',
          pin: true,
          scrub: 0.5,
          onLeave: () => window.dispatchEvent(new Event('act:transition')),
        },
      })

      // POV MATCH CUT — hands reach for the ball…
      tl.fromTo(
        `.${styles.povCourt}`,
        { opacity: 1, scale: 1 },
        { scale: 1.14, duration: 0.45, ease: 'power1.in' }
      )
        // …hard cut: same hands land on the keyboard (motion carries through)
        .set(`.${styles.povCourt}`, { opacity: 0 })
        .set(`.${styles.povDesk}`, { opacity: 1, scale: 1.14 }, '<')
        .add(() => window.dispatchEvent(new Event('act:transition')), '<')
        .to(`.${styles.povDesk}`, { scale: 1, duration: 0.45, ease: 'power2.out' })

      // line 1 — the hinge, over the desk POV
      tl.fromTo(
        `.${styles.hinge}`,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.3 }
      )
        .to(`.${styles.hinge}`, { duration: 0.4 })
        .to(`.${styles.hinge}`, { opacity: 0, y: -40, duration: 0.2 })
        // POV fades as the desk scene takes over
        .to(`.${styles.povDesk}`, { opacity: 0, duration: 0.3 }, '<')
        // desk video reveals from a clip mask
        .to(`.${styles.frame}`, { opacity: 1, duration: 0.2 }, '<')
        .fromTo(
          `.${styles.frame}`,
          { clipPath: 'inset(18% 22% 18% 22% round 24px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 0px)',
            duration: 0.7,
            ease: 'power2.inOut',
            immediateRender: false,
          },
          '<'
        )
        .fromTo(
          `.${styles.video}`,
          { scale: 1.12 },
          { scale: 1, duration: 0.9, ease: 'none' },
          '<'
        )
        .fromTo(
          `.${styles.copy}`,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.25 },
          '-=0.55'
        )
        .to(`.${styles.frame}`, { duration: 0.8 })

      const scrubber = scrubberRef.current
      if (scrubber) {
        const revealStart = 0.9
        const scrub = { p: 0 }
        tl.to(
          scrub,
          {
            p: 1,
            duration: tl.duration() - revealStart,
            ease: 'none',
            onUpdate: () => scrubber.setProgress(scrub.p),
          },
          revealStart
        )
      }
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="engineer" ref={wrapRef} className={styles.bridge} aria-label="The engineer">
      {/* POV match cut layers */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={POV.court} alt="" aria-hidden className={styles.povCourt} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={POV.desk} alt="" aria-hidden className={styles.povDesk} />

      <p className={styles.hinge}>
        Same hands. <em>Different court.</em>
      </p>

      <div className={styles.frame}>
        <FrameScrubber
          ref={scrubberRef}
          className={styles.video}
          base={DESK.seq}
          count={SEQ_FRAMES}
        />
        <div className={styles.shade} />
        <div className={styles.copy}>
          <p className={styles.label}>OFF THE COURT — THE ENGINEER</p>
          <h2 className={styles.line}>
            I read systems the way I read a rally —
            <em> everything, all at once.</em>
          </h2>
        </div>
      </div>
    </section>
  )
}

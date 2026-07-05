'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DESK } from '@/lib/data'
import styles from './EngineerBridge.module.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * THE BRIDGE — match cut from the court to the desk.
 * Same player, different arena: 2 monitors, a MacBook, and the night shift.
 */
export default function EngineerBridge() {
  const wrapRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

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

      // line 1 — the hinge
      tl.fromTo(
        `.${styles.hinge}`,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.3 }
      )
        .to(`.${styles.hinge}`, { duration: 0.4 })
        .to(`.${styles.hinge}`, { opacity: 0, y: -40, duration: 0.2 })
        // desk video reveals from a clip mask
        .fromTo(
          `.${styles.frame}`,
          { clipPath: 'inset(18% 22% 18% 22% round 24px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 0.7, ease: 'power2.inOut' }
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

      const video = videoRef.current
      if (video) {
        const revealStart = 0.9
        const scrub = { p: 0 }
        tl.to(
          scrub,
          {
            p: 1,
            duration: tl.duration() - revealStart,
            ease: 'none',
            onUpdate: () => {
              if (!video.duration) return
              const t = scrub.p * (video.duration - 0.08)
              if (Math.abs(video.currentTime - t) > 0.02) video.currentTime = t
            },
          },
          revealStart
        )
      }
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="engineer" ref={wrapRef} className={styles.bridge} aria-label="The engineer">
      <p className={styles.hinge}>
        Same player. <em>Different court.</em>
      </p>

      <div className={styles.frame}>
        <video
          ref={videoRef}
          className={styles.video}
          src={DESK.video}
          poster={DESK.still}
          muted
          playsInline
          preload="auto"
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

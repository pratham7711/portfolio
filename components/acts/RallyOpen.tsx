'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RALLY, SITE, SEQ_FRAMES } from '@/lib/data'
import FrameScrubber, { FrameScrubberHandle } from '@/components/FrameScrubber'
import styles from './RallyOpen.module.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * THE OPENER — the site starts inside the match.
 * Full-bleed rally shots, one per touch, each carrying a pitch line.
 * Scroll scrubs through the story frame by frame: dig → set → spike.
 */
export default function RallyOpen() {
  const wrapRef = useRef<HTMLElement>(null)
  const scrubberRefs = useRef<(FrameScrubberHandle | null)[]>([])

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const ctx = gsap.context(() => {
      const beats = gsap.utils.toArray<HTMLElement>(`.${styles.beat}`)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: `+=${RALLY.length * 160}%`,
          pin: true,
          scrub: 0.5,
          onLeave: () => window.dispatchEvent(new Event('act:transition')),
        },
      })

      // intro name fades away as the first beat begins
      tl.to(`.${styles.intro}`, { opacity: 0, y: -40, duration: 0.25 })

      beats.forEach((beat, i) => {
        const scrubber = scrubberRefs.current[i]
        const videoEl = beat.querySelector(`.${styles.video}`)
        const pitchA = beat.querySelector(`.${styles.pitchA}`)
        const pitchB = beat.querySelector(`.${styles.pitchB}`)
        const proof = beat.querySelector(`.${styles.proof}`)
        const segStart = tl.duration()

        // beat 1 opens already on the court; later shots punch in reel-style
        if (i === 0) gsap.set(beat, { opacity: 1 })
        tl.fromTo(
          beat,
          { opacity: i === 0 ? 1 : 0 },
          {
            opacity: 1,
            duration: 0.22,
            ease: 'power2.out',
            onStart: () => window.dispatchEvent(new Event('act:transition')),
          },
          i === 0 ? '>' : '-=0.14'
        )
        if (videoEl) {
          tl.fromTo(
            videoEl,
            { scale: 1.22, filter: 'blur(10px)' },
            { scale: 1.04, filter: 'blur(0px)', duration: 0.28, ease: 'power4.out' },
            '<'
          )
          // slow drift for the rest of the hold
          tl.to(videoEl, { scale: 1, duration: 1.1, ease: 'none' }, '>')
        }
        tl.fromTo(
          pitchA,
          { opacity: 0, y: 46 },
          { opacity: 1, y: 0, duration: 0.22, ease: 'power3.out' },
          '<+=0.05'
        )
        tl.fromTo(
          pitchB,
          { opacity: 0, y: 46 },
          { opacity: 1, y: 0, duration: 0.22, ease: 'power3.out' },
          '<+=0.12'
        )
        tl.fromTo(
          proof,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.2, ease: 'power3.out' },
          '<+=0.1'
        )
        // hold the shot
        tl.to(beat, { duration: 0.85 })
        // reel-edit whip-out: outgoing shot zooms and blurs away
        if (i < beats.length - 1) {
          tl.to(beat, { opacity: 0, duration: 0.18, ease: 'power2.in' })
          if (videoEl) {
            tl.to(
              videoEl,
              { scale: 1.18, filter: 'blur(12px)', duration: 0.18, ease: 'power2.in' },
              '<'
            )
          }
        }

        // scroll drives playback: scrub the frame sequence across this beat's segment
        if (scrubber) {
          const scrub = { p: 0 }
          tl.to(
            scrub,
            {
              p: 1,
              duration: tl.duration() - segStart,
              ease: 'none',
              onUpdate: () => scrubber.setProgress(scrub.p),
            },
            segStart
          )
        }
      })
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="rally" ref={wrapRef} className={styles.opener} aria-label="The rally">
      {/* pre-roll identity chip */}
      <div className={styles.intro}>
        <p className={styles.introName}>{SITE.name}</p>
        <p className={styles.introRole}>{SITE.positioning}</p>
        <p className={styles.introHint}>scroll — the rally decides</p>
        <a href="#projects" className={styles.introSkip}>
          hiring? skip to the work ↓
        </a>
      </div>

      {RALLY.map((r, i) => (
        <div key={r.id} className={styles.beat}>
          <FrameScrubber
            ref={(el) => {
              scrubberRefs.current[i] = el
            }}
            className={styles.video}
            base={r.seq}
            count={SEQ_FRAMES}
            priority={i === 0 ? 'high' : 'low'}
          />
          <div className={styles.shade} />
          <div className={styles.copy}>
            <h2 className={styles.pitchA}>{r.pitchA}</h2>
            <p className={styles.pitchB}>{r.pitchB}</p>
            <p className={styles.proof}>{r.proof}</p>
          </div>
        </div>
      ))}
    </section>
  )
}

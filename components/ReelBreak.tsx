'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './ReelBreak.module.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * Instagram-reel style caption slams: pinned beat where each line
 * punches in, holds, punches out — like a fast edit cut.
 */
export default function ReelBreak({
  lines,
  dark = true,
}: {
  lines: string[]
  dark?: boolean
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(`.${styles.line}`)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: `+=${lines.length * 55}%`,
          pin: true,
          scrub: 0.35,
        },
      })

      words.forEach((w, i) => {
        // punch in — scale slam like a reel caption
        tl.fromTo(
          w,
          { scale: 2.4, opacity: 0, rotate: i % 2 === 0 ? -4 : 4 },
          { scale: 1, opacity: 1, rotate: 0, duration: 0.22, ease: 'power4.out' }
        )
        // hold
        tl.to(w, { duration: 0.25 })
        // punch out (except last)
        if (i < words.length - 1) {
          tl.to(w, { yPercent: -140, opacity: 0, duration: 0.18, ease: 'power2.in' })
        }
      })
    }, ref)

    return () => ctx.revert()
  }, [lines])

  return (
    <section
      ref={ref}
      className={`${styles.break} ${dark ? styles.dark : styles.light}`}
      aria-hidden
    >
      <div className={styles.stage}>
        {lines.map((l) => (
          <p key={l} className={styles.line}>
            {l}
          </p>
        ))}
      </div>
    </section>
  )
}

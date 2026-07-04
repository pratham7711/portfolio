'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './TheTurn.module.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * THE TURN — dark world bleaches into editorial paper.
 * The transition IS the storytelling beat.
 */
export default function TheTurn() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: 0.5,
          onLeave: () => window.dispatchEvent(new Event('act:transition')),
        },
      })

      tl.fromTo(
        `.${styles.lineOne}`,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.3 }
      )
        .to(`.${styles.lineOne}`, { opacity: 0.15, duration: 0.25 }, '+=0.1')
        .fromTo(
          `.${styles.lineTwo}`,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.3 }
        )
        // the bleach: white floods up from the bottom
        .to(`.${styles.flood}`, { scaleY: 1, duration: 0.5, ease: 'power2.inOut' })
        .to(
          `.${styles.lineTwo}`,
          { color: '#141311', duration: 0.3 },
          '<+=0.2'
        )
        .to(`.${styles.lineOne}`, { opacity: 0, duration: 0.2 }, '<')
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className={styles.turn} aria-label="Transition">
      <div className={styles.flood} aria-hidden />
      <div className={styles.copy}>
        <p className={styles.lineOne}>I build systems.</p>
        <p className={styles.lineTwo}>
          But every system needs a <em>setter</em>.
        </p>
      </div>
    </section>
  )
}

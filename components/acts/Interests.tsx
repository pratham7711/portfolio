'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HOBBIES } from '@/lib/data'
import styles from './ActBody.module.css'

gsap.registerPlugin(ScrollTrigger)

/** INTERESTS — the horizontal side-quest rail (editorial palette). */
export default function Interests() {
  const wrapRef = useRef<HTMLElement>(null)
  const railRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const rail = railRef.current
    if (!wrap || !rail) return

    const ctx = gsap.context(() => {
      const getDist = () => rail.scrollWidth - window.innerWidth
      gsap.to(rail, {
        x: () => -getDist(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: () => `+=${getDist()}`,
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      })
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="interests" ref={wrapRef} className={styles.hobbyWrap} aria-label="Interests">
      <div ref={railRef} className={styles.hobbyRail}>
        <div className={styles.hobbyIntro}>
          <p className={styles.setLabel}>OFF HOURS</p>
          <h2 className={styles.hobbyTitle}>
            BETWEEN
            <br />
            SETS
          </h2>
        </div>
        {HOBBIES.map((h, i) => (
          <article key={h.id} className={styles.hobbyCard} data-hobby={h.id}>
            <span className={styles.hobbyIndex}>0{i + 1}</span>
            <h3 className={styles.hobbyName}>{h.title}</h3>
            <p className={styles.hobbyMeta}>{h.meta}</p>
            <p className={styles.hobbyDetail}>{h.detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

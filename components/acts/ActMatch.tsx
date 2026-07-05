'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS } from '@/lib/data'
import styles from './ActMatch.module.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * ACT III — MATCH POINT (fusion palette)
 * Projects as match highlights in a horizontal gallery,
 * ending on the giant serve CTA.
 */
export default function ActMatch() {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrap = wrapRef.current
      const rail = railRef.current
      if (wrap && rail) {
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
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className={styles.act}>
      {/* PROJECTS — horizontal highlight reel */}
      <div ref={wrapRef} className={styles.wrap}>
        <div ref={railRef} className={styles.rail}>
          <div className={styles.intro}>
            <p className={styles.setLabel}>THE WORK — PROJECTS</p>
            <h2 className={styles.introTitle}>
              HIGHLIGHT
              <br />
              REEL
            </h2>
            <p className={styles.introHint}>six plays, all match-winners →</p>
          </div>

          {PROJECTS.map((p) => (
            <article
              key={p.slug}
              className={styles.card}
              style={{ ['--proj' as string]: p.accent }}
            >
              <header className={styles.cardHead}>
                <span className={styles.cardNum}>{p.number}</span>
                <span className={styles.cardPlay}>{p.playCall}</span>
              </header>
              <h3 className={styles.cardName}>{p.name}</h3>
              <p className={styles.cardDesc}>{p.description}</p>
              {p.image && (
                <div className={styles.cardMedia}>
                  <img src={p.image} alt={`${p.name} screenshot`} loading="lazy" />
                </div>
              )}
              <ul className={styles.cardTags}>
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <footer className={styles.cardLinks}>
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noreferrer" className={styles.cardLink}>
                    LIVE ↗
                  </a>
                )}
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer" className={styles.cardLink}>
                    CODE ↗
                  </a>
                )}
              </footer>
            </article>
          ))}
        </div>
      </div>

    </section>
  )
}

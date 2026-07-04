'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS, SITE } from '@/lib/data'
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
  const ctaRef = useRef<HTMLDivElement>(null)

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

      // CTA letters slam in
      const cta = ctaRef.current
      if (cta) {
        gsap.fromTo(
          `.${styles.ctaWord}`,
          { yPercent: 120 },
          {
            yPercent: 0,
            stagger: 0.08,
            duration: 0.9,
            ease: 'power4.out',
            scrollTrigger: { trigger: cta, start: 'top 70%' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="act-match" ref={sectionRef} className={styles.act}>
      {/* PROJECTS — horizontal highlight reel */}
      <div ref={wrapRef} className={styles.wrap}>
        <div ref={railRef} className={styles.rail}>
          <div className={styles.intro}>
            <p className={styles.setLabel}>SET 3 — MATCH POINT</p>
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

      {/* MATCH POINT CTA */}
      <div id="contact" ref={ctaRef} className={styles.cta}>
        <p className={styles.ctaKicker}>GAME POINT — YOUR MOVE</p>
        <h2 className={styles.ctaTitle} aria-label="Match point. Your serve.">
          <span className={styles.ctaLine}>
            <span className={styles.ctaWord}>MATCH</span>{' '}
            <span className={styles.ctaWord}>POINT.</span>
          </span>
          <span className={styles.ctaLine}>
            <span className={`${styles.ctaWord} ${styles.ctaAccent}`}>YOUR</span>{' '}
            <span className={`${styles.ctaWord} ${styles.ctaAccent}`}>SERVE.</span>
          </span>
        </h2>
        <p className={styles.ctaAvail}>
          <span className={styles.availDot} /> Open to conversations — freelance,
          full-time, or just volleyball.
        </p>
        <div className={styles.ctaActions}>
          <a
            href={`mailto:${SITE.email}`}
            className={styles.ctaPrimary}
            onMouseMove={(e) => {
              const el = e.currentTarget
              const r = el.getBoundingClientRect()
              const x = e.clientX - r.left - r.width / 2
              const y = e.clientY - r.top - r.height / 2
              el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = ''
            }}
          >
            {SITE.email}
          </a>
          <div className={styles.ctaSocial}>
            <a href={SITE.github} target="_blank" rel="noreferrer">
              GITHUB ↗
            </a>
            <a href={SITE.linkedin} target="_blank" rel="noreferrer">
              LINKEDIN ↗
            </a>
          </div>
        </div>
        <footer className={styles.footer}>
          <span>© {new Date().getFullYear()} PRATHAM SHARMA</span>
          <span className={styles.footerNote}>
            BUILT IN THREE ACTS · NEXT.JS · GSAP · R3F · HIGGSFIELD
          </span>
        </footer>
      </div>
    </section>
  )
}

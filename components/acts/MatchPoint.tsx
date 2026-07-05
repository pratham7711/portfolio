'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SITE, MAILTO } from '@/lib/data'
import styles from './ActMatch.module.css'

gsap.registerPlugin(ScrollTrigger)

/** MATCH POINT — the final, powerful CTA. */
export default function MatchPoint() {
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cta = ctaRef.current
    if (!cta) return
    const ctx = gsap.context(() => {
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
    }, ctaRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.act} aria-label="Contact">
      <div id="contact" ref={ctaRef} className={styles.cta}>
        <p className={styles.ctaKicker}>SET 5 — 14 : 13 · MATCH POINT</p>
        <h2 className={styles.ctaTitle} aria-label="Match point. Your serve.">
          <span className={styles.ctaLine}>
            <span className={styles.ctaWord}>MATCH</span>{' '}
            <span className={styles.ctaWord}>POINT.</span>
          </span>
          <span className={styles.ctaLine}>
            <span className={`${styles.ctaWord} ${styles.ctaAccent} ${styles.ctaAccentA}`}>
              YOUR
            </span>{' '}
            <span className={`${styles.ctaWord} ${styles.ctaAccent} ${styles.ctaAccentB}`}>
              SERVE.
            </span>
          </span>
        </h2>
        <p className={styles.ctaAvail}>
          <span className={styles.availDot} /> Available now — freelance or
          full-time. Full-stack, frontend, AI. I reply within 24 hours.
        </p>
        <div className={styles.ctaActions}>
          <a
            href={MAILTO}
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
            <a href={SITE.resume} target="_blank" rel="noreferrer">
              RESUME ↓
            </a>
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
            BUILT IN THREE ACTS · NEXT.JS · GSAP · HIGGSFIELD
          </span>
        </footer>
      </div>
    </section>
  )
}

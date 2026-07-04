'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SITE, EXPERIENCE, SKILL_GROUPS } from '@/lib/data'
import styles from './ActMind.module.css'

gsap.registerPlugin(ScrollTrigger)

/** Canvas particle constellation — pure code, free */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let w = 0
    let h = 0
    const N = 90
    const pts = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0004,
      vy: (Math.random() - 0.5) * 0.0004,
    }))

    const resize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio
      h = canvas.height = canvas.offsetHeight * devicePixelRatio
    }
    resize()
    window.addEventListener('resize', resize)

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > 1) p.vx *= -1
        if (p.y < 0 || p.y > 1) p.vy *= -1
      }
      ctx.strokeStyle = 'rgba(0,229,209,0.10)'
      ctx.lineWidth = 1
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = (pts[i].x - pts[j].x) * w
          const dy = (pts[i].y - pts[j].y) * h
          const d2 = dx * dx + dy * dy
          if (d2 < 120 * 120 * devicePixelRatio) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x * w, pts[i].y * h)
            ctx.lineTo(pts[j].x * w, pts[j].y * h)
            ctx.stroke()
          }
        }
      }
      ctx.fillStyle = 'rgba(0,229,209,0.55)'
      for (const p of pts) {
        ctx.beginPath()
        ctx.arc(p.x * w, p.y * h, 1.4 * devicePixelRatio, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.particles} aria-hidden />
}

export default function ActMind() {
  const sectionRef = useRef<HTMLElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const railWrapRef = useRef<HTMLDivElement>(null)
  const [titleIdx, setTitleIdx] = useState(0)

  // rotating titles
  useEffect(() => {
    const t = setInterval(() => setTitleIdx((i) => (i + 1) % SITE.titles.length), 2600)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // hero letters rise in
      gsap.fromTo(
        `.${styles.heroLetter}`,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.045,
          duration: 0.9,
          ease: 'power4.out',
          delay: 0.15,
        }
      )

      // HORIZONTAL career rail — the signature horizontal scroll of Act I
      const rail = railRef.current
      const wrap = railWrapRef.current
      if (rail && wrap) {
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

        // per-card parallax inside the rail
        gsap.utils.toArray<HTMLElement>(`.${styles.playCard}`).forEach((card) => {
          gsap.fromTo(
            card.querySelector(`.${styles.playTag}`),
            { xPercent: 30, opacity: 0 },
            {
              xPercent: 0,
              opacity: 1,
              scrollTrigger: {
                trigger: card,
                containerAnimation: gsap.getTweensOf(rail)[0],
                start: 'left 80%',
                scrub: true,
              },
            }
          )
        })
      }

      // stat count-ups — reel style punch
      gsap.utils.toArray<HTMLElement>(`.${styles.statNum}`).forEach((el) => {
        const target = Number(el.dataset.count || 0)
        const suffix = el.dataset.suffix || ''
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.v)}${suffix}`
          },
        })
      })

      // skill groups stagger up
      gsap.utils.toArray<HTMLElement>(`.${styles.skillGroup}`).forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.08,
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="act-mind" ref={sectionRef} className={styles.act}>
      {/* HERO */}
      <div className={styles.hero} id="top">
        <ParticleField />
        <p className={styles.kicker}>
          <span className={styles.kickerSet}>SET 1</span> — THE MIND
        </p>
        <h1 className={styles.heroName} aria-label={SITE.name}>
          {SITE.name.split('').map((ch, i) => (
            <span key={i} className={styles.heroLetterWrap} aria-hidden>
              <span className={styles.heroLetter}>{ch === ' ' ? ' ' : ch}</span>
            </span>
          ))}
        </h1>
        <div className={styles.heroSub}>
          <span className={styles.heroTitleRotator} key={titleIdx}>
            {SITE.titles[titleIdx]}
          </span>
          <span className={styles.heroTag}>{SITE.tagline}</span>
        </div>
        <div className={styles.scrollHint} aria-hidden>
          <span>SCROLL TO SERVE</span>
          <span className={styles.scrollLine} />
        </div>
      </div>

      {/* STATEMENT */}
      <div className={styles.statement}>
        <p className={styles.statementText}>
          Engineer at <strong>Leegality</strong>. I design systems the way a setter
          reads a court — <em>see everything, touch everything, make everyone
          else look good.</em>
        </p>
        <div className={styles.statRow}>
          {[
            { n: 3, suffix: '+', label: 'YEARS SHIPPING' },
            { n: 3, suffix: '', label: 'COMPANIES' },
            { n: 6, suffix: '+', label: 'PROJECTS LIVE' },
            { n: 2, suffix: '', label: 'SEASONS AS CAPTAIN' },
          ].map((s) => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statNum} data-count={s.n} data-suffix={s.suffix}>
                0{s.suffix}
              </span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CAREER — horizontal rail */}
      <div ref={railWrapRef} className={styles.railWrap}>
        <div ref={railRef} className={styles.rail}>
          <div className={styles.railIntro}>
            <p className="act-label">CAREER</p>
            <h2 className={styles.railTitle}>
              THREE
              <br />
              TOUCHES
            </h2>
            <p className={styles.railHint}>scroll →</p>
          </div>
          {EXPERIENCE.map((exp) => (
            <article key={exp.company} className={styles.playCard}>
              <p className={styles.playTag}>{exp.play}</p>
              <h3 className={styles.playCompany}>{exp.company}</h3>
              <p className={styles.playRole}>
                {exp.role} · {exp.period}
              </p>
              <p className={styles.playSummary}>{exp.summary}</p>
              <ul className={styles.playStack}>
                {exp.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      {/* SKILLS */}
      <div className={styles.skills}>
        <p className="act-label">TOOLKIT</p>
        <div className={styles.skillGrid}>
          {SKILL_GROUPS.map((g) => (
            <div key={g.label} className={styles.skillGroup}>
              <h3 className={styles.skillLabel}>{g.label}</h3>
              <ul className={styles.skillList}>
                {g.skills.map((s) => (
                  <li key={s} className={styles.skill}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

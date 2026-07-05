'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SITE, EXPERIENCE, SKILL_GROUPS, STATS } from '@/lib/data'
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

const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#$'

function splitWords(el: HTMLElement) {
  if (el.dataset.split) return
  el.dataset.split = '1'
  const walk = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const parts = (node.textContent || '').split(/(\s+)/)
      const frag = document.createDocumentFragment()
      parts.forEach((part) => {
        if (!part.trim()) {
          frag.appendChild(document.createTextNode(part))
          return
        }
        const span = document.createElement('span')
        span.className = 'reveal-word'
        span.textContent = part
        frag.appendChild(span)
      })
      node.parentNode?.replaceChild(frag, node)
    } else {
      Array.from(node.childNodes).forEach(walk)
    }
  }
  Array.from(el.childNodes).forEach(walk)
}

export default function ActMind() {
  const sectionRef = useRef<HTMLElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const railWrapRef = useRef<HTMLDivElement>(null)
  const railSlideRef = useRef<HTMLDivElement>(null)
  const statementRef = useRef<HTMLDivElement>(null)
  const [titleIdx, setTitleIdx] = useState(0)
  const [scrambled, setScrambled] = useState(SITE.titles[0])

  // rotating titles with scramble decode effect
  useEffect(() => {
    const t = setInterval(() => setTitleIdx((i) => (i + 1) % SITE.titles.length), 2800)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const target = SITE.titles[titleIdx]
    let frame = 0
    const total = 14
    const iv = setInterval(() => {
      frame++
      const reveal = Math.floor((frame / total) * target.length)
      const out = target
        .split('')
        .map((ch, i) => {
          if (ch === ' ') return ' '
          if (i < reveal) return ch
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        })
        .join('')
      setScrambled(out)
      if (frame >= total) {
        setScrambled(target)
        clearInterval(iv)
      }
    }, 42)
    return () => clearInterval(iv)
  }, [titleIdx])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // statement copy decodes word-by-word as you scroll
      const statement = statementRef.current
      if (statement) {
        const text = statement.querySelector(`.${styles.statementText}`)
        if (text instanceof HTMLElement) {
          splitWords(text)
          gsap.fromTo(
            text.querySelectorAll('.reveal-word'),
            { opacity: 0.1 },
            {
              opacity: 1,
              stagger: 0.4,
              ease: 'none',
              scrollTrigger: {
                trigger: text,
                start: 'top 82%',
                end: 'top 28%',
                scrub: 0.4,
              },
            }
          )
        }

        // stay pinned under the incoming career panel — it covers this screen
        ScrollTrigger.create({
          trigger: statement,
          start: 'bottom bottom',
          end: () => `+=${window.innerHeight * 1.4}`,
          pin: true,
          pinSpacing: false,
        })
      }

      // HORIZONTAL career rail — sweeps in from the right, then scrolls sideways
      const rail = railRef.current
      const wrap = railWrapRef.current
      const slide = railSlideRef.current
      if (rail && wrap && slide) {
        const getDist = () => rail.scrollWidth - window.innerWidth
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            start: 'top top',
            end: () => `+=${getDist() + window.innerHeight}`,
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        })
        tl.fromTo(
          slide,
          { xPercent: 100 },
          { xPercent: 0, duration: 0.42, ease: 'power2.out' }
        )
        tl.fromTo(
          `.${styles.railIntro} > *`,
          { opacity: 0, y: 44 },
          { opacity: 1, y: 0, stagger: 0.045, duration: 0.16, ease: 'power3.out' },
          '-=0.12'
        )
        tl.fromTo(
          `.${styles.playCard}`,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, stagger: 0.05, duration: 0.18, ease: 'power3.out' },
          '<+=0.04'
        )
        tl.to(rail, { x: () => -getDist(), duration: 1, ease: 'none' }, '>')
      }

      // stat count-ups — reel style punch
      gsap.utils.toArray<HTMLElement>(`.${styles.statNum}`).forEach((el) => {
        const target = Number(el.dataset.count || 0)
        const prefix = el.dataset.prefix || ''
        const suffix = el.dataset.suffix || ''
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(obj.v).toLocaleString('en-US')}${suffix}`
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
    <section id="work" ref={sectionRef} className={styles.act}>
      {/* HERO */}
      <div className={styles.infoHead} id="top">
        <ParticleField />
        <p className={styles.kicker}>
          <span className={styles.kickerSet}>THE FILE</span> — WHO I AM
        </p>
        <h1 className={styles.infoName}>{SITE.name}</h1>
        <div className={styles.heroSub}>
          <span className={styles.heroTitleRotator}>{scrambled}</span>
          <span className={styles.heroTag}>{SITE.tagline}</span>
        </div>
      </div>

      {/* STATEMENT */}
      <div ref={statementRef} className={styles.statement}>
        <p className={styles.statementText}>
          Engineer at <strong>Leegality</strong>. I design systems the way a setter
          reads a court — <em>see everything, touch everything, make everyone
          else look good.</em>
        </p>
        <div className={styles.statRow}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.stat}>
              <span
                className={styles.statNum}
                data-count={s.n}
                data-prefix={s.prefix}
                data-suffix={s.suffix}
              >
                {s.prefix}0{s.suffix}
              </span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CAREER — horizontal rail */}
      <div ref={railWrapRef} className={styles.railWrap}>
        <div ref={railSlideRef} className={styles.railSlide}>
          <div ref={railRef} className={styles.rail}>
            <div className={styles.railIntro}>
              <p className="act-label">CAREER</p>
              <h2 className={styles.railTitle}>
                THREE
                <br />
                SEASONS
              </h2>
              <p className={styles.railRule}>
                Every season a different court, a bigger game. Same setter
                running the plays.
              </p>
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

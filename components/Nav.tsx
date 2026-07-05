'use client'

import { useEffect, useState } from 'react'
import { SITE } from '@/lib/data'
import styles from './Nav.module.css'
import SoundToggle from './SoundToggle'

const LINKS = [
  { href: '#rally', label: 'Play' },
  { href: '#work', label: 'About' },
  { href: '#projects', label: 'Work' },
  { href: SITE.resume, label: 'Resume', external: true },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [onPaper, setOnPaper] = useState(false)

  useEffect(() => {
    const paper = document.getElementById('interests')
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      if (paper) {
        const r = paper.getBoundingClientRect()
        setOnPaper(r.top <= 72 && r.bottom >= 72)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${
        onPaper ? styles.paper : ''
      }`}
    >
      <a href="#top" className={styles.logo}>
        PS<span className={styles.logoDot}>.</span>
      </a>
      <nav className={styles.links} aria-label="Primary">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className={styles.link}
            {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})}
          >
            {l.label}
          </a>
        ))}
      </nav>
      <div className={styles.right}>
        <SoundToggle />
        <a
          href="#contact"
          className={styles.cta}
          onMouseMove={(e) => {
            const el = e.currentTarget
            const r = el.getBoundingClientRect()
            el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = ''
          }}
        >
          Connect
        </a>
      </div>
    </header>
  )
}

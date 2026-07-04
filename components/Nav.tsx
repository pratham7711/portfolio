'use client'

import { useEffect, useState } from 'react'
import styles from './Nav.module.css'
import SoundToggle from './SoundToggle'

const LINKS = [
  { href: '#act-mind', label: 'Mind' },
  { href: '#act-body', label: 'Body' },
  { href: '#act-match', label: 'Work' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#top" className={styles.logo}>
        PS<span className={styles.logoDot}>.</span>
      </a>
      <nav className={styles.links} aria-label="Primary">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className={styles.link}>
            {l.label}
          </a>
        ))}
      </nav>
      <div className={styles.right}>
        <SoundToggle />
        <a href="#contact" className={styles.cta}>
          Connect
        </a>
      </div>
    </header>
  )
}

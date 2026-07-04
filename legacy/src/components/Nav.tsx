import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './Nav.module.css'

export const Nav = () => {
  const navRef = useRef<HTMLElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!navRef.current) return

    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 3.5, ease: 'power3.out' }
    )
  }, [])

  // Close menu on outside click
  useEffect(() => {
    if (!isMenuOpen) return
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [isMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  const scrollTo = (id: string) => {
    setIsMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav ref={navRef} className={styles.nav}>
      <div className={styles.container}>
        <a href="#" className={styles.logo}>
          PS<span className={styles.accent}>.</span>
        </a>

        {/* Desktop links */}
        <div className={styles.links}>
          <button onClick={() => scrollTo('work')} className={styles.link}>
            Work
          </button>
          <button onClick={() => scrollTo('skills')} className={styles.link}>
            Skills
          </button>
          <button onClick={() => scrollTo('about')} className={styles.link}>
            About
          </button>
          <button onClick={() => scrollTo('contact')} className={styles.link}>
            Contact
          </button>
        </div>

        {/* Hamburger button — mobile only */}
        <button
          className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile slide-down menu */}
      <div
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!isMenuOpen}
      >
        <button onClick={() => scrollTo('work')} className={styles.mobileLink}>Work</button>
        <button onClick={() => scrollTo('skills')} className={styles.mobileLink}>Skills</button>
        <button onClick={() => scrollTo('about')} className={styles.mobileLink}>About</button>
        <button onClick={() => scrollTo('contact')} className={styles.mobileLink}>Contact</button>
      </div>
    </nav>
  )
}

export default Nav

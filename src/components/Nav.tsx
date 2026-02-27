import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './Nav.module.css'

export const Nav = () => {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!navRef.current) return

    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 3.5, ease: 'power3.out' }
    )
  }, [])

  const scrollTo = (id: string) => {
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
      </div>
    </nav>
  )
}

export default Nav

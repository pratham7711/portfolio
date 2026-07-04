import { useEffect, useRef, type ReactElement } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Hobbies.module.css'

gsap.registerPlugin(ScrollTrigger)

interface Hobby {
  name: string
  note: string
  icon: ReactElement
  meta?: string
}

const hobbies: Hobby[] = [
  {
    name: 'Anime',
    meta: 'Currently rewatching',
    note: 'One Piece, Chainsaw Man, Frieren. Long-arc storytelling.',
    icon: (
      <svg width="44" height="44" viewBox="0 0 64 64" fill="none">
        {/* Stylized straw hat — vibe of One Piece without literal IP */}
        <ellipse cx="32" cy="42" rx="26" ry="6" stroke="currentColor" strokeWidth="2" />
        <path
          d="M14 42 Q14 22 32 22 Q50 22 50 42"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M14 42 Q14 28 32 28 Q50 28 50 42"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
        {/* Hat band */}
        <rect x="14" y="36" width="36" height="4" fill="currentColor" opacity="0.7" />
      </svg>
    ),
  },
  {
    name: 'Chess',
    meta: 'Style',
    note: 'Aggressive openings. The Sicilian Najdorf is home.',
    icon: (
      <svg width="44" height="44" viewBox="0 0 64 64" fill="none">
        {/* Knight piece silhouette */}
        <path
          d="M22 52 L42 52 L44 48 L20 48 Z"
          fill="currentColor"
        />
        <path
          d="M18 48 L46 48 L44 42 L20 42 Z"
          fill="currentColor"
          opacity="0.85"
        />
        <path
          d="M22 42 C18 30, 26 22, 30 18 L34 14 C40 18, 44 26, 44 36 L44 42 Z"
          fill="currentColor"
        />
        <circle cx="36" cy="28" r="1.5" fill="#0a0a0a" />
        <path
          d="M28 22 L33 22 L31 26 Z"
          fill="#0a0a0a"
        />
      </svg>
    ),
  },
  {
    name: 'Volleyball',
    meta: 'Position',
    note: 'Setter. Captained the college team for two seasons.',
    icon: (
      <svg width="44" height="44" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="2" />
        <path
          d="M10 32 Q32 18 54 32"
          stroke="currentColor"
          strokeWidth="1.8"
          fill="none"
        />
        <path
          d="M10 32 Q32 46 54 32"
          stroke="currentColor"
          strokeWidth="1.8"
          fill="none"
        />
        <path
          d="M32 10 Q22 32 32 54"
          stroke="currentColor"
          strokeWidth="1.8"
          fill="none"
        />
        <path
          d="M32 10 Q42 32 32 54"
          stroke="currentColor"
          strokeWidth="1.8"
          fill="none"
        />
      </svg>
    ),
  },
  {
    name: "Rubik's Cube",
    meta: 'PB',
    note: 'Sub-90s 3×3 solver. CFOP, slowly learning full OLL.',
    icon: (
      <svg width="44" height="44" viewBox="0 0 64 64" fill="none">
        {/* Isometric 3x3 cube */}
        <g stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
          {/* top face */}
          <path d="M32 8 L52 18 L32 28 L12 18 Z" fill="currentColor" fillOpacity="0.15" />
          {/* left face */}
          <path d="M12 18 L32 28 L32 52 L12 42 Z" fill="currentColor" fillOpacity="0.05" />
          {/* right face */}
          <path d="M52 18 L32 28 L32 52 L52 42 Z" fill="currentColor" fillOpacity="0.1" />
          {/* top grid lines */}
          <path d="M19 14.5 L39 24.5 M26 11 L46 21 M19 21.5 L39 11.5 M26 25 L46 15" />
          {/* left grid */}
          <path d="M18.7 21.3 L18.7 45.3 M25.3 24.7 L25.3 48.7" />
          <path d="M12 26 L32 36 M12 34 L32 44" />
          {/* right grid */}
          <path d="M45.3 21.3 L45.3 45.3 M38.7 24.7 L38.7 48.7" />
          <path d="M32 36 L52 26 M32 44 L52 34" />
        </g>
      </svg>
    ),
  },
]

export const Hobbies = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      )

      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="hobbies" className={styles.hobbies}>
      <div className={styles.container}>
        <h2 ref={headingRef} className={styles.heading}>
          OFF THE CLOCK
        </h2>

        <div className={styles.grid}>
          {hobbies.map((hobby, i) => (
            <article
              key={hobby.name}
              ref={(el) => { cardsRef.current[i] = el }}
              className={styles.card}
            >
              <div className={styles.iconBox}>{hobby.icon}</div>
              <div className={styles.body}>
                <span className={styles.meta}>{hobby.meta}</span>
                <h3 className={styles.name}>{hobby.name}</h3>
                <p className={styles.note}>{hobby.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hobbies

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './About.module.css'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '3+', label: 'YEARS EXPERIENCE' },
  { value: '4', label: 'COMPANIES' },
  { value: 'Knight', label: 'LEETCODE RANK' },
  { value: '9/10', label: 'GPA' },
]

const marqueeItems = [
  'REACT',
  'TYPESCRIPT',
  'NODE.JS',
  'JAVA',
  'AWS',
  'MONGODB',
  'KAFKA',
  'THREE.JS',
  'SPRING BOOT',
  'REDUX',
]

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const statItemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        textRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      statItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(
            item,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: index * 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: statsRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className={styles.about}>
      <div className={styles.container}>
        <span className={styles.label}>CHAPTER 01</span>
        <h2 ref={headingRef} className={styles.heading}>
          THE STORY
        </h2>

        <p ref={textRef} className={styles.text}>
          Full Stack Engineer with 3+ years building products at scale — from real-time eSigning
          platforms to crypto dashboards. Currently at Leegality building the future of digital
          agreements. Exploring the intersection of great UI and AI.
        </p>
      </div>

      {/* Marquee Strip */}
      <div className={styles.marqueeWrapper}>
        <div className={styles.marquee}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className={styles.marqueeContent}>
              {marqueeItems.map((item, j) => (
                <span key={j} className={styles.marqueeItem}>
                  <span className={styles.dash}>—</span> {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className={styles.container}>
        <div ref={statsRef} className={styles.stats}>
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              ref={(el) => { statItemsRef.current[index] = el }}
              className={styles.statItem}
            >
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About

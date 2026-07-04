import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Experience.module.css'

gsap.registerPlugin(ScrollTrigger)

interface ExperienceItem {
  company: string
  role: string
  dates: string
  location: string
  achievement: string
}

const experiences: ExperienceItem[] = [
  {
    company: 'LEEGALITY',
    role: 'Software Engineer Frontend',
    dates: 'May 2025 – Present',
    location: 'Remote',
    achievement:
      'Built a real-time co-authoring eSigning platform with React, TypeScript, Zustand and Redux-Saga; cut document workflows by 40%. Created a design system with ShadCN + Storybook, an AI Chatbot SDK, and the AI Review / Smart Extraction features.',
  },
  {
    company: 'SALESCODE.AI',
    role: 'Software Engineer',
    dates: 'Jan 2023 – May 2025',
    location: 'Gurugram',
    achievement:
      'Optimized database operations from 6-9 hours down to 1-5 minutes using Java. Built Apache Kafka pipelines achieving 40% throughput increase and 25% latency reduction.',
  },
  {
    company: 'REALTOS',
    role: 'Software Engineer',
    dates: 'Mar 2023 – Aug 2023',
    location: 'Remote',
    achievement:
      'Built full platform with ReactJS, NodeJS & Express. Implemented DynamoDB for 30% performance gain. Deployed on AWS EC2 + Amplify achieving 99.99% uptime.',
  },
]

export const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const timelineItemsRef = useRef<(HTMLDivElement | null)[]>([])

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
            once: true,
          },
        }
      )

      timelineItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(
            item,
            { y: 60, opacity: 0, x: index % 2 === 0 ? -30 : 30 },
            {
              y: 0,
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                once: true,
              },
            }
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="experience" className={styles.experience}>
      <div className={styles.container}>
        <h2 ref={headingRef} className={styles.heading}>
          THE JOURNEY
        </h2>

        <div className={styles.timeline}>
          <div className={styles.timelineLine} />
          {experiences.map((exp, index) => (
            <div
              key={exp.company}
              ref={(el) => { timelineItemsRef.current[index] = el }}
              className={styles.timelineItem}
            >
              <div className={styles.timelineLeft}>
                <h3 className={styles.company}>{exp.company}</h3>
                <span className={styles.dates}>{exp.dates}</span>
                <span className={styles.location}>{exp.location}</span>
              </div>
              <div className={styles.timelineDot} />
              <div className={styles.timelineRight} data-company={exp.company} data-dates={exp.dates}>
                <span className={styles.role}>{exp.role}</span>
                <p className={styles.achievement}>{exp.achievement}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Skills.module.css'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      'React', 'Next.js', 'TypeScript', 'JavaScript', 'Redux', 'Zustand',
      'Tailwind CSS', 'ShadCN', 'Storybook', 'GSAP', 'Three.js',
    ],
  },
  {
    title: 'Backend',
    skills: [
      'Node.js', 'Express.js', 'Java', 'Spring Boot', 'GraphQL', 'REST APIs', 'WebSockets',
    ],
  },
  {
    title: 'Databases',
    skills: ['MongoDB', 'PostgreSQL', 'DynamoDB', 'Firebase', 'Redis', 'SQL'],
  },
  {
    title: 'AI & ML',
    skills: [
      'LangChain', 'OpenAI API', 'RAG', 'Pinecone', 'Python', 'FastAPI', 'Prompt Engineering',
    ],
  },
  {
    title: 'Cloud & DevOps',
    skills: [
      'AWS (EC2, S3, Amplify)', 'Docker', 'GitHub Actions', 'CI/CD', 'Vercel', 'Apache Kafka',
    ],
  },
  {
    title: 'Tools & Testing',
    skills: [
      'Jest', 'Cypress', 'React Testing Library', 'Webpack', 'Vite',
      'Canvas API', 'Web Audio API', 'WCAG Accessibility',
    ],
  },
]

const learningSkills = ['Kubernetes', 'AWS Certified (in progress)', 'LLM Fine-tuning', 'Rust']

export const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const categoriesRef = useRef<(HTMLDivElement | null)[]>([])
  const learningRef = useRef<HTMLDivElement>(null)

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

      categoriesRef.current.forEach((cat, i) => {
        if (cat) {
          gsap.fromTo(
            cat,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              delay: i * 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: cat,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        }
      })

      if (learningRef.current) {
        gsap.fromTo(
          learningRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: learningRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="skills" className={styles.skills}>
      <div className={styles.container}>
        <span className={styles.label}>CHAPTER 03</span>
        <h2 ref={headingRef} className={styles.heading}>
          THE CRAFT
        </h2>

        <div className={styles.categories}>
          {skillCategories.map((cat, i) => (
            <div
              key={cat.title}
              ref={(el) => { categoriesRef.current[i] = el }}
              className={styles.category}
            >
              <h3 className={styles.categoryTitle}>{cat.title}</h3>
              <div className={styles.badges}>
                {cat.skills.map((skill) => (
                  <span key={skill} className={styles.badge}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div ref={learningRef} className={styles.learningSection}>
          <h3 className={styles.learningTitle}>Currently Learning</h3>
          <div className={styles.badges}>
            {learningSkills.map((skill) => (
              <span key={skill} className={styles.learningBadge}>{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills

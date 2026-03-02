import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { IconType } from 'react-icons'
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiRedux,
  SiTailwindcss, SiStorybook, SiThreedotjs,
  SiNodedotjs, SiExpress, SiSpring, SiOpenjdk, SiGraphql,
  SiMongodb, SiPostgresql, SiFirebase, SiRedis,
  SiOpenai, SiPython, SiFastapi, SiLangchain, SiGooglegemini, SiSupabase, SiUpstash,
  SiAmazonwebservices, SiDocker, SiGithubactions, SiVercel, SiApachekafka, SiRailway,
  SiJest, SiCypress, SiWebpack, SiVite,
} from 'react-icons/si'
import styles from './Skills.module.css'

gsap.registerPlugin(ScrollTrigger)

interface SkillIcon {
  icon: IconType
  color: string
}

const SKILL_ICONS: Record<string, SkillIcon> = {
  'React':                    { icon: SiReact,            color: '#61DAFB' },
  'Next.js':                  { icon: SiNextdotjs,        color: '#ffffff' },
  'TypeScript':               { icon: SiTypescript,       color: '#3178C6' },
  'JavaScript':               { icon: SiJavascript,       color: '#F7DF1E' },
  'Redux':                    { icon: SiRedux,            color: '#764ABC' },
  'Tailwind CSS':             { icon: SiTailwindcss,      color: '#38BDF8' },
  'Storybook':                { icon: SiStorybook,        color: '#FF4785' },
  'Three.js':                 { icon: SiThreedotjs,       color: '#ffffff' },
  'Node.js':                  { icon: SiNodedotjs,        color: '#339933' },
  'Express.js':               { icon: SiExpress,          color: '#a3a3a3' },
  'Java':                     { icon: SiOpenjdk,          color: '#E76F00' },
  'Spring Boot':              { icon: SiSpring,           color: '#6DB33F' },
  'GraphQL':                  { icon: SiGraphql,          color: '#E535AB' },
  'MongoDB':                  { icon: SiMongodb,          color: '#47A248' },
  'PostgreSQL':               { icon: SiPostgresql,       color: '#336791' },
  'Firebase':                 { icon: SiFirebase,         color: '#FFCA28' },
  'Redis':                    { icon: SiRedis,            color: '#DC382D' },
  'OpenAI API':               { icon: SiOpenai,           color: '#ffffff' },
  'Python':                   { icon: SiPython,           color: '#3776AB' },
  'FastAPI':                  { icon: SiFastapi,          color: '#009688' },
  'LangChain':                { icon: SiLangchain,        color: '#1C3C3C' },
  'Gemini Flash':             { icon: SiGooglegemini,     color: '#8E75B2' },
  'Supabase':                 { icon: SiSupabase,         color: '#3ECF8E' },
  'Upstash Redis':            { icon: SiUpstash,          color: '#00E9A3' },
  'AWS (EC2, S3, Amplify)':   { icon: SiAmazonwebservices, color: '#FF9900' },
  'Docker':                   { icon: SiDocker,           color: '#2496ED' },
  'GitHub Actions':           { icon: SiGithubactions,    color: '#2088FF' },
  'Vercel':                   { icon: SiVercel,           color: '#ffffff' },
  'Apache Kafka':             { icon: SiApachekafka,      color: '#e4533a' },
  'Railway':                  { icon: SiRailway,          color: '#ffffff' },
  'Jest':                     { icon: SiJest,             color: '#C21325' },
  'Cypress':                  { icon: SiCypress,          color: '#17202C' },
  'Webpack':                  { icon: SiWebpack,          color: '#8DD6F9' },
  'Vite':                     { icon: SiVite,             color: '#646CFF' },
}

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
    skills: ['MongoDB', 'PostgreSQL', 'Supabase', 'DynamoDB', 'Firebase', 'Redis', 'Upstash Redis', 'SQL'],
  },
  {
    title: 'AI & ML',
    skills: [
      'LangChain', 'Gemini Flash', 'OpenAI API', 'RAG', 'Pinecone', 'Python', 'FastAPI', 'Prompt Engineering',
    ],
  },
  {
    title: 'Cloud & DevOps',
    skills: [
      'AWS (EC2, S3, Amplify)', 'Docker', 'GitHub Actions', 'CI/CD', 'Vercel', 'Railway', 'Apache Kafka',
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

function SkillBadge({ skill, className }: { skill: string; className: string }) {
  const entry = SKILL_ICONS[skill]
  return (
    <span className={className}>
      {entry ? (
        <entry.icon
          className={styles.skillIcon}
          style={{ color: entry.color }}
          aria-hidden="true"
        />
      ) : (
        <span className={styles.skillDot} aria-hidden="true" />
      )}
      {skill}
    </span>
  )
}

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
                  <SkillBadge key={skill} skill={skill} className={styles.badge} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div ref={learningRef} className={styles.learningSection}>
          <h3 className={styles.learningTitle}>Currently Learning</h3>
          <div className={styles.badges}>
            {learningSkills.map((skill) => (
              <SkillBadge key={skill} skill={skill} className={styles.learningBadge} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills

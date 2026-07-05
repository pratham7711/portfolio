'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from 'motion/react'
import { PROJECTS, type Project } from '@/lib/data'
import styles from './ActMatch.module.css'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const rise = {
  hidden: { opacity: 0, y: 44 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
}

function DeckCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const last = index === total - 1
  const start = index / total
  const end = (index + 1) / total
  const scale = useTransform(progress, [start, end], [1, last ? 1 : 0.9])
  const brightness = useTransform(progress, [start, end], [1, last ? 1 : 0.45])
  const filter = useMotionTemplate`brightness(${brightness})`

  return (
    <motion.article
      className={styles.deckCard}
      style={{
        ['--proj' as string]: project.accent,
        ['--stack' as string]: `${index * 12}px`,
        scale,
        filter,
        transformOrigin: 'center top',
      }}
    >
      <motion.div
        className={styles.deckGrid}
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className={styles.deckInfo}>
          <motion.header variants={rise} className={styles.cardHead}>
            <span className={styles.cardNum}>{project.number}</span>
            <span className={styles.cardPlay}>{project.playCall}</span>
          </motion.header>
          <motion.h3 variants={rise} className={styles.cardName}>
            {project.name}
          </motion.h3>
          <motion.p variants={rise} className={styles.cardDesc}>
            {project.description}
          </motion.p>
          <motion.ul variants={rise} className={styles.cardTags}>
            {project.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </motion.ul>
          <motion.footer variants={rise} className={styles.cardLinks}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.cardLink}
              >
                LIVE ↗
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className={styles.cardLink}
              >
                CODE ↗
              </a>
            )}
          </motion.footer>
        </div>
        {project.image && (
          <motion.div variants={rise} className={styles.deckMedia}>
            <img
              src={project.image}
              alt={`${project.name} screenshot`}
              loading="lazy"
            />
          </motion.div>
        )}
      </motion.div>
    </motion.article>
  )
}

/**
 * THE WORK — projects as a scroll deck.
 * Each play lands over the last; the previous card sinks back as the next arrives.
 */
export default function ActMatch() {
  const deckRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: deckRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section id="projects" className={styles.act}>
      <motion.div
        className={styles.deckHead}
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.p variants={rise} className={styles.setLabel}>
          THE WORK — PROJECTS
        </motion.p>
        <motion.h2 variants={rise} className={styles.deckTitle}>
          HIGHLIGHT
          <br />
          REEL
        </motion.h2>
        <motion.p variants={rise} className={styles.deckHint}>
          six plays, all match-winners — keep scrolling ↓
        </motion.p>
      </motion.div>

      <div ref={deckRef} className={styles.deck}>
        {PROJECTS.map((p, i) => (
          <DeckCard
            key={p.slug}
            project={p}
            index={i}
            total={PROJECTS.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  )
}

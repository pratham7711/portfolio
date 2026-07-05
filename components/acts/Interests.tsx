'use client'

import { motion } from 'motion/react'
import { HOBBIES } from '@/lib/data'
import styles from './ActBody.module.css'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

const rise = {
  hidden: { opacity: 0, y: 48 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
}

/** INTERESTS — off-hours, editorial palette. */
export default function Interests() {
  return (
    <section id="interests" className={styles.hobbyWrap} aria-label="Interests">
      <motion.div
        className={styles.hobbyInner}
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className={styles.hobbyIntro}>
          <motion.p variants={rise} className={styles.setLabel}>
            OFF HOURS
          </motion.p>
          <motion.h2 variants={rise} className={styles.hobbyTitle}>
            BETWEEN
            <br />
            SETS
          </motion.h2>
        </div>
        <div className={styles.hobbyGrid}>
          {HOBBIES.map((h, i) => (
            <motion.article
              key={h.id}
              className={styles.hobbyCard}
              data-hobby={h.id}
              variants={rise}
              whileHover={{
                y: -10,
                rotate: -0.6,
                transition: { type: 'spring', stiffness: 260, damping: 18 },
              }}
            >
              <span className={styles.hobbyIndex}>0{i + 1}</span>
              <h3 className={styles.hobbyName}>{h.title}</h3>
              <p className={styles.hobbyMeta}>{h.meta}</p>
              <p className={styles.hobbyDetail}>{h.detail}</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

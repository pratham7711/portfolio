'use client'

import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Scoreboard.module.css'

gsap.registerPlugin(ScrollTrigger)

const SETS = [
  { id: 'act-mind', label: 'SET 1', name: 'THE MIND' },
  { id: 'act-body', label: 'SET 2', name: 'THE BODY' },
  { id: 'act-match', label: 'SET 3', name: 'MATCH POINT' },
]

export default function Scoreboard() {
  const [active, setActive] = useState(0)
  const fillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const triggers: ScrollTrigger[] = []

    SETS.forEach((set, i) => {
      const el = document.getElementById(set.id)
      if (!el) return
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        })
      )
    })

    if (fillRef.current) {
      gsap.to(fillRef.current, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      })
    }

    return () => triggers.forEach((t) => t.kill())
  }, [])

  return (
    <aside className={styles.board} aria-label="Reading progress">
      <div className={styles.track}>
        <div ref={fillRef} className={styles.fill} />
      </div>
      <ol className={styles.sets}>
        {SETS.map((set, i) => (
          <li
            key={set.id}
            className={`${styles.set} ${i === active ? styles.active : ''} ${
              i < active ? styles.done : ''
            }`}
          >
            <span className={styles.setLabel}>{set.label}</span>
            <span className={styles.setName}>{set.name}</span>
          </li>
        ))}
      </ol>
    </aside>
  )
}

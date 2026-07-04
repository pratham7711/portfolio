'use client'

import { useEffect, useState } from 'react'
import styles from './Loader.module.css'

const BOOT_LINES = [
  '> initializing match environment…',
  '> loading player: PRATHAM SHARMA',
  '> position: SETTER / FULL-STACK ENGINEER',
  '> compiling three acts…',
]

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [lineIdx, setLineIdx] = useState(0)
  const [phase, setPhase] = useState<'boot' | 'score' | 'out'>('boot')

  useEffect(() => {
    if (phase !== 'boot') return
    if (lineIdx >= BOOT_LINES.length) {
      const t = setTimeout(() => setPhase('score'), 250)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setLineIdx((i) => i + 1), 340)
    return () => clearTimeout(t)
  }, [lineIdx, phase])

  useEffect(() => {
    if (phase !== 'score') return
    const t = setTimeout(() => {
      setPhase('out')
      setTimeout(onComplete, 650)
    }, 900)
    return () => clearTimeout(t)
  }, [phase, onComplete])

  return (
    <div className={`${styles.loader} ${phase === 'out' ? styles.out : ''}`} aria-hidden>
      {phase === 'boot' ? (
        <div className={styles.terminal}>
          {BOOT_LINES.slice(0, lineIdx).map((l) => (
            <p key={l} className={styles.line}>
              {l}
            </p>
          ))}
          <span className={styles.cursor} />
        </div>
      ) : (
        <div className={styles.score}>
          <span className={styles.scoreLabel}>MATCH READY</span>
          <span className={styles.scoreNums}>
            0<span className={styles.scoreSep}>:</span>0
          </span>
        </div>
      )}
    </div>
  )
}

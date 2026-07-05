'use client'

import { useEffect, useState } from 'react'
import styles from './Loader.module.css'

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'score' | 'out' | 'skip'>('score')

  useEffect(() => {
    if (sessionStorage.getItem('ps-seen')) {
      setPhase('skip')
      onComplete()
      return
    }
    sessionStorage.setItem('ps-seen', '1')
    const t = setTimeout(() => {
      setPhase('out')
      setTimeout(onComplete, 500)
    }, 750)
    return () => clearTimeout(t)
  }, [onComplete])

  if (phase === 'skip') return null

  return (
    <div className={`${styles.loader} ${phase === 'out' ? styles.out : ''}`} aria-hidden>
      <div className={styles.score}>
        <span className={styles.scoreLabel}>MATCH READY</span>
        <span className={styles.scoreNums}>
          0<span className={styles.scoreSep}>:</span>0
        </span>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import styles from './EasterEggs.module.css'

/**
 * Type "najdorf" anywhere → chess overlay plays the Najdorf line.
 * Konami-lite: type "cfop" → cube confetti.
 */
const NAJDORF_MOVES = ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6']

export default function EasterEggs() {
  const [egg, setEgg] = useState<'najdorf' | 'cfop' | null>(null)
  const [moveIdx, setMoveIdx] = useState(0)

  useEffect(() => {
    let buffer = ''
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      buffer = (buffer + e.key.toLowerCase()).slice(-10)
      if (buffer.endsWith('najdorf')) {
        setEgg('najdorf')
        setMoveIdx(0)
      } else if (buffer.endsWith('cfop')) {
        setEgg('cfop')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (egg !== 'najdorf') return
    if (moveIdx >= NAJDORF_MOVES.length) {
      const t = setTimeout(() => setEgg(null), 1600)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setMoveIdx((i) => i + 1), 420)
    return () => clearTimeout(t)
  }, [egg, moveIdx])

  useEffect(() => {
    if (egg !== 'cfop') return
    const t = setTimeout(() => setEgg(null), 2400)
    return () => clearTimeout(t)
  }, [egg])

  if (!egg) return null

  return (
    <div className={styles.overlay} onClick={() => setEgg(null)} role="presentation">
      {egg === 'najdorf' && (
        <div className={styles.chess}>
          <p className={styles.chessTitle}>SICILIAN NAJDORF — B90</p>
          <p className={styles.moves}>
            {NAJDORF_MOVES.slice(0, moveIdx).map((m, i) => (
              <span key={i} className={styles.move}>
                {i % 2 === 0 ? `${i / 2 + 1}. ` : ''}
                {m}{' '}
              </span>
            ))}
          </p>
          <p className={styles.chessSub}>home turf.</p>
        </div>
      )}
      {egg === 'cfop' && (
        <div className={styles.cube}>
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className={styles.confetti}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.6}s`,
                background: ['#00e5d1', '#f5a623', '#f43f5e', '#34d399', '#fff', '#60a5fa'][i % 6],
              }}
            />
          ))}
          <p className={styles.cubeText}>SUB-90. STILL COUNTS.</p>
        </div>
      )}
    </div>
  )
}

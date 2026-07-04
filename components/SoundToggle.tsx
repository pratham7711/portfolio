'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './SoundToggle.module.css'

/**
 * Sound design toggle — off by default.
 * Plays subtle crowd-swell / whistle stingers at act transitions via WebAudio
 * (synthesised, no audio files needed — free and tiny).
 */
export default function SoundToggle() {
  const [on, setOn] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    if (!on) return

    const AudioCtx = window.AudioContext
    if (!AudioCtx) return
    const ctx = ctxRef.current ?? new AudioCtx()
    ctxRef.current = ctx

    /** soft whistle blip */
    const whistle = () => {
      const t = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(2350, t)
      osc.frequency.exponentialRampToValueAtTime(2100, t + 0.18)
      gain.gain.setValueAtTime(0.0001, t)
      gain.gain.exponentialRampToValueAtTime(0.04, t + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25)
      osc.connect(gain).connect(ctx.destination)
      osc.start(t)
      osc.stop(t + 0.3)
    }

    const onAct = () => whistle()
    window.addEventListener('act:transition', onAct)
    return () => window.removeEventListener('act:transition', onAct)
  }, [on])

  return (
    <button
      className={styles.toggle}
      aria-pressed={on}
      aria-label={on ? 'Mute sound' : 'Enable sound'}
      onClick={() => setOn((v) => !v)}
      title="Sound"
    >
      <span className={`${styles.bar} ${on ? styles.live : ''}`} />
      <span className={`${styles.bar} ${on ? styles.live : ''}`} />
      <span className={`${styles.bar} ${on ? styles.live : ''}`} />
    </button>
  )
}

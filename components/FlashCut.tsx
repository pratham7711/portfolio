'use client'

import { useEffect, useRef } from 'react'

/**
 * Reel-style hard cut: a 90ms white flash whenever an act transition fires.
 */
export default function FlashCut() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onCut = () => {
      el.style.transition = 'none'
      el.style.opacity = '0.85'
      requestAnimationFrame(() => {
        el.style.transition = 'opacity 0.35s ease-out'
        el.style.opacity = '0'
      })
    }
    window.addEventListener('act:transition', onCut)
    return () => window.removeEventListener('act:transition', onCut)
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        background: '#fff',
        opacity: 0,
        pointerEvents: 'none',
        zIndex: 130,
      }}
    />
  )
}

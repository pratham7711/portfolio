'use client'

/**
 * Cinematic film grain overlay — animated SVG turbulence, GPU-cheap,
 * the texture layer every award-tier film site ships with.
 */
export default function Grain() {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: '-100px',
        zIndex: 120,
        pointerEvents: 'none',
        opacity: 0.055,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '240px 240px',
        animation: 'grainShift 0.45s steps(3) infinite',
      }}
    />
  )
}

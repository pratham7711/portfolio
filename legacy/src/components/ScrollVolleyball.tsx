import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import styles from './ScrollVolleyball.module.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * Procedurally drawn volleyball texture.
 * Mikasa-style 6-panel layout: three orthogonal great circles split the
 * sphere into 6 patches. Each patch is faintly striped to read as "panels"
 * even at small sizes. Off-white base + dark cyan accent stripe to fit
 * the portfolio palette without breaking realism.
 */
function makeVolleyballTexture() {
  const size = 1024
  const canvas = document.createElement('canvas')
  canvas.width = size * 2
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  // Base off-white
  const bg = ctx.createLinearGradient(0, 0, 0, size)
  bg.addColorStop(0, '#f7f5ed')
  bg.addColorStop(0.5, '#fbfaf3')
  bg.addColorStop(1, '#ece8d8')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, size * 2, size)

  // Subtle leather grain (noise dots)
  ctx.globalAlpha = 0.08
  for (let i = 0; i < 8000; i++) {
    const x = Math.random() * size * 2
    const y = Math.random() * size
    const r = Math.random() * 1.2
    ctx.fillStyle = Math.random() > 0.5 ? '#d4cdb6' : '#fffefa'
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1

  // Panel seams.
  // Equirectangular UV: u=0..2π wraps around, v=0..π is pole-to-pole.
  // The three orthogonal great circles project as:
  //   - 1 horizontal line at v = 0.5  (equator)
  //   - 2 sinusoidal curves shifted by π for the two orthogonal circles
  //   - 1 vertical seam at u = 0/π (meridian) — handled by sphere wrap
  const w = size * 2
  const h = size

  const drawSeam = (phaseRad: number, color: string, lineWidth: number, glow = false) => {
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    if (glow) {
      ctx.shadowColor = color
      ctx.shadowBlur = 6
    } else {
      ctx.shadowBlur = 0
    }
    ctx.beginPath()
    for (let x = 0; x <= w; x += 2) {
      const u = (x / w) * Math.PI * 2
      // great circle at given phase: v = π/2 + arctan(tan(latMax) * sin(u - phase))
      // Simplified: a sinusoidal projection peaking at h * 0.18 amplitude
      const y = h / 2 + Math.sin(u - phaseRad) * (h * 0.32)
      if (x === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()
    ctx.shadowBlur = 0
  }

  // Three seams offset 120° around for the classic 6-panel ball.
  // Heavier dark seams so they read clearly at small on-screen sizes.
  drawSeam(0, '#0a0907', 7)
  drawSeam((Math.PI * 2) / 3, '#0a0907', 7)
  drawSeam((Math.PI * 4) / 3, '#0a0907', 7)

  // Faint accent overlay (cyan, low alpha) — branded touch without breaking realism.
  ctx.globalAlpha = 0.35
  drawSeam(0, '#00E5D1', 2.5, true)
  drawSeam((Math.PI * 2) / 3, '#00E5D1', 2.5, true)
  drawSeam((Math.PI * 4) / 3, '#00E5D1', 2.5, true)
  ctx.globalAlpha = 1

  // Stitch detail along the seams.
  ctx.setLineDash([3, 5])
  drawSeam(0, '#1a1814', 2)
  drawSeam((Math.PI * 2) / 3, '#1a1814', 2)
  drawSeam((Math.PI * 4) / 3, '#1a1814', 2)
  ctx.setLineDash([])

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  tex.needsUpdate = true
  return tex
}

/**
 * Bump map: same seam lines drawn dark on light so the seams "indent"
 * under the PBR lighting. Cheap normal-effect without authoring a real normal map.
 */
function makeBumpTexture() {
  const size = 1024
  const canvas = document.createElement('canvas')
  canvas.width = size * 2
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, size * 2, size)

  const w = size * 2
  const h = size
  ctx.strokeStyle = '#000000'
  ctx.lineWidth = 6
  for (const phase of [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3]) {
    ctx.beginPath()
    for (let x = 0; x <= w; x += 2) {
      const u = (x / w) * Math.PI * 2
      const y = h / 2 + Math.sin(u - phase) * (h * 0.32)
      if (x === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()
  }
  ctx.filter = 'blur(2px)'
  ctx.drawImage(canvas, 0, 0)

  const tex = new THREE.CanvasTexture(canvas)
  tex.anisotropy = 4
  return tex
}

interface BallState {
  x: number
  y: number
  rotX: number
  rotZ: number
  squash: number
}

interface BallProps {
  positionRef: React.MutableRefObject<BallState>
}

const BALL_RADIUS = 0.5

function Ball({ positionRef }: BallProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const map = useMemo(() => makeVolleyballTexture(), [])
  const bump = useMemo(() => makeBumpTexture(), [])

  useFrame(() => {
    if (!meshRef.current) return
    const { x, y, rotX, rotZ, squash } = positionRef.current
    meshRef.current.position.set(x, y, 0)
    meshRef.current.rotation.x = rotX
    meshRef.current.rotation.z = rotZ
    // Squash-stretch: vertical compress, horizontal expand on impact.
    meshRef.current.scale.set(1 + squash * 0.45, 1 - squash * 0.45, 1 + squash * 0.45)
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[BALL_RADIUS, 64, 64]} />
      <meshStandardMaterial
        map={map}
        bumpMap={bump}
        bumpScale={0.04}
        roughness={0.42}
        metalness={0.05}
      />
    </mesh>
  )
}

function Scene({ positionRef }: BallProps) {
  return (
    <>
      {/* Bright key + warm fill + cyan rim. Ball needs to read clearly against
          the dark page so we over-light it slightly compared to physical. */}
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 6, 5]} intensity={3.2} color="#fff7e6" />
      <directionalLight position={[-4, -3, 2]} intensity={1.1} color="#00E5D1" />
      <pointLight position={[2, 2, 4]} intensity={0.6} color="#ffffff" />
      <Ball positionRef={positionRef} />
    </>
  )
}

export const ScrollVolleyball = () => {
  const positionRef = useRef<BallState>({ x: 3.5, y: 0, rotX: 0, rotZ: 0, squash: 0 })
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [mounted] = useState(() => {
    if (typeof window === 'undefined') return false
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return !isMobile && !reduceMotion
  })

  useLayoutEffect(() => {
    if (!mounted) return
    // Ensure the wrapper + footer are in the DOM before any ScrollTrigger setup.

    // GSAP timeline tied to whole-page scroll.
    // Y range: starts above viewport (+3 world units, off-screen top)
    // ends at the bottom of the page (~ -3.5 world units at the canvas bottom).
    // Bounce sequence triggers in the last 8% of scroll.
    const ctx = gsap.context(() => {
      const obj = positionRef.current

      // ── Path definition ───────────────────────────────────────────────
      // p = scroll progress 0..1 over the WHOLE page.
      // The last 8% (p >= 0.92) is the bounce zone.
      // Position is computed directly from p — no chained gsap.to tweens —
      // so values are deterministic at every scroll position from frame 1.
      const computePath = (p: number) => {
        p = Math.max(0, Math.min(1, p))

        // Descent and bounce thresholds (normalised over full scroll).
        const DESCENT_END = 0.92

        // Horizontal sine sweep: right → center-left → right.
        // Phase 0..π over the descent. Amplitude tapers near the bounce
        // so the ball settles back to the right side for the handoff.
        const xRight = 3.5
        const xLeft = -2.5
        const sweepP = Math.min(p / DESCENT_END, 1)
        const xMid = xRight + (xLeft - xRight) * Math.sin(sweepP * Math.PI)
        // At the bounce phase, lock to right side for the handoff.
        const x = p < DESCENT_END
          ? xMid
          : xRight - (xRight - xMid) * (1 - (p - DESCENT_END) / (1 - DESCENT_END))

        // Rotation accumulates over scroll — feels like a real rolling ball.
        const rotX = p * Math.PI * 4.5
        const rotZ = p * Math.PI * 1.2

        let y: number
        let squash = 0

        if (p < DESCENT_END) {
          // Linear descent from above viewport to just above the floor.
          const dp = p / DESCENT_END
          y = 3.5 + (-1.8 - 3.5) * dp
        } else {
          // ── Bounce zone — three damped bounces using parabolic segments.
          // bp goes 0..1 within the bounce zone.
          const bp = (p - DESCENT_END) / (1 - DESCENT_END)
          // Three bounce segments with diminishing amplitudes + frequencies.
          // Segment 1: 0   .. 0.4  amplitude 1.4 → peak at 0.2
          // Segment 2: 0.4 .. 0.7  amplitude 0.55
          // Segment 3: 0.7 .. 0.95 amplitude 0.18
          const floor = -2.6
          let bounceY = floor
          if (bp < 0.4) {
            const t = bp / 0.4
            bounceY = floor + 1.4 * Math.sin(t * Math.PI)
          } else if (bp < 0.7) {
            const t = (bp - 0.4) / 0.3
            bounceY = floor + 0.55 * Math.sin(t * Math.PI)
          } else if (bp < 0.95) {
            const t = (bp - 0.7) / 0.25
            bounceY = floor + 0.18 * Math.sin(t * Math.PI)
          } else {
            bounceY = floor
          }

          y = bounceY

          // Squash spikes briefly at each floor contact.
          // Trigger at the start of each bounce segment (just landed).
          const impactWindow = (t: number, peak: number) => {
            const d = Math.abs(t)
            return d < 0.08 ? peak * (1 - d / 0.08) : 0
          }
          squash = Math.max(
            impactWindow(bp - 0.0, 0.9),
            impactWindow(bp - 0.4, 0.55),
            impactWindow(bp - 0.7, 0.25),
          )
        }

        return { x, y, rotX, rotZ, squash }
      }

      // Apply initial state so the very first useFrame has correct values.
      Object.assign(obj, computePath(0))

      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.35,
        onUpdate: (self) => {
          const p = self.progress
          const next = computePath(p)
          obj.x = next.x
          obj.y = next.y
          obj.rotX = next.rotX
          obj.rotZ = next.rotZ
          obj.squash = next.squash
        },
      })

      // Fade the 3D canvas out + reveal the static footer SVG in the same area.
      const footerImg = document.querySelector('[data-volleyball-footer]')
      gsap.fromTo(
        wrapperRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          scrollTrigger: {
            trigger: document.body,
            start: 'bottom-=240 bottom',
            end: 'bottom-=40 bottom',
            scrub: true,
          },
        }
      )
      if (footerImg) {
        gsap.fromTo(
          footerImg,
          { opacity: 0, scale: 0.55 },
          {
            opacity: 1,
            scale: 1,
            ease: 'back.out(1.8)',
            scrollTrigger: {
              trigger: document.body,
              start: 'bottom-=320 bottom',
              end: 'bottom-=60 bottom',
              scrub: 0.6,
            },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  if (!mounted) return null

  return (
    <div ref={wrapperRef} className={styles.volleyballWrapper} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Scene positionRef={positionRef} />
      </Canvas>
    </div>
  )
}

export default ScrollVolleyball

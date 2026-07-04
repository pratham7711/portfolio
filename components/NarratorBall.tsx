'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './NarratorBall.module.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * The narrator — one volleyball that travels the whole story.
 * Act I: teal wireframe (an idea of a ball)
 * Act II: solid leather-like white (the real thing)
 * Act III: hybrid — leather with a glowing teal/amber seam pulse
 * All procedural. Zero credits, zero image assets.
 */

interface BallState {
  wire: number // 0 solid → 1 wireframe
  glow: number // emissive intensity
  hue: number // 0 teal → 1 amber
  spin: number
}

function Ball({ state }: { state: React.MutableRefObject<BallState> }) {
  const group = useRef<THREE.Group>(null)
  const wireMat = useRef<THREE.MeshBasicMaterial>(null)
  const solidMat = useRef<THREE.MeshStandardMaterial>(null)

  const teal = new THREE.Color('#00e5d1')
  const amber = new THREE.Color('#f5a623')

  useFrame((_, delta) => {
    const s = state.current
    if (group.current) {
      group.current.rotation.y += delta * (0.4 + s.spin * 2.2)
      group.current.rotation.x += delta * 0.15
    }
    if (wireMat.current) {
      wireMat.current.opacity = s.wire * 0.85
      wireMat.current.color.lerpColors(teal, amber, s.hue)
    }
    if (solidMat.current) {
      solidMat.current.opacity = 1 - s.wire
      solidMat.current.emissive.lerpColors(teal, amber, s.hue)
      solidMat.current.emissiveIntensity = s.glow
    }
  })

  return (
    <group ref={group}>
      {/* leather ball */}
      <mesh>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial
          ref={solidMat}
          color="#e8e4da"
          roughness={0.55}
          transparent
          emissive="#00e5d1"
          emissiveIntensity={0}
        />
      </mesh>
      {/* seam lines — volleyball panel look via wireframe sphere with low segments */}
      <mesh scale={1.002}>
        <sphereGeometry args={[1, 12, 6]} />
        <meshBasicMaterial
          ref={wireMat}
          color="#00e5d1"
          wireframe
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  )
}

export default function NarratorBall() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const ballState = useRef<BallState>({ wire: 1, glow: 0, hue: 0, spin: 0 })
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setVisible(false)
      return
    }

    const ctx = gsap.context(() => {
      // Position path across the page — screen-space travel
      const pos = { x: 0.72, y: 0.5, scale: 1 } // fractions of viewport
      const apply = () => {
        wrap.style.transform = `translate(${pos.x * 100}vw, ${pos.y * 100}vh) translate(-50%, -50%) scale(${pos.scale})`
      }
      apply()

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
        onUpdate: apply,
      })

      // ACT I — hover right of hero, wireframe teal
      tl.to(pos, { x: 0.15, y: 0.75, scale: 0.55, duration: 1 }) // drifts to skills
        .to(ballState.current, { spin: 0.5, duration: 1 }, '<')
        // THE TURN — ball crosses the screen like a served ball, solidifies
        .to(pos, { x: 0.85, y: 0.2, scale: 0.7, duration: 0.6 })
        .to(ballState.current, { wire: 0.15, spin: 1, duration: 0.6 }, '<')
        // ACT II — real ball, editorial: parks top-right, slow
        .to(pos, { x: 0.88, y: 0.14, scale: 0.45, duration: 0.8 })
        .to(ballState.current, { wire: 0, glow: 0.05, spin: 0.15, duration: 0.8 }, '<')
        // ACT III — fusion: center-ish, glowing seams amber
        .to(pos, { x: 0.5, y: 0.85, scale: 0.8, duration: 1 })
        .to(ballState.current, { wire: 0.4, glow: 0.5, hue: 1, spin: 0.8, duration: 1 }, '<')
    })

    return () => ctx.revert()
  }, [])

  if (!visible) return null

  return (
    <div ref={wrapRef} className={styles.wrap} aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.6]}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 5]} intensity={1.1} />
        <Ball state={ballState} />
      </Canvas>
    </div>
  )
}

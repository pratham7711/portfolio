import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import type { Mesh } from 'three'
import styles from './Hero.module.css'

gsap.registerPlugin(ScrollTrigger)

function WireframeIcosahedron() {
  const meshRef = useRef<Mesh>(null)
  const { viewport } = useThree()
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += 0.002
    meshRef.current.rotation.y += 0.003
    meshRef.current.rotation.x += mouse.current.y * 0.01
    meshRef.current.rotation.y += mouse.current.x * 0.01
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
  })

  const scale = Math.min(viewport.width, viewport.height) * 0.35

  return (
    <mesh ref={meshRef} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color="#00E5D1" wireframe transparent opacity={0.6} />
    </mesh>
  )
}

const titles = ['Full Stack Engineer', 'AI Engineer', 'Frontend Expert']

export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null)
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([])
  const subtitleRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const bgTextRef = useRef<HTMLDivElement>(null)
  const canvasLayerRef = useRef<HTMLDivElement>(null)
  const contentLayerRef = useRef<HTMLDivElement>(null)

  const [displayText, setDisplayText] = useState('')

  const name = 'PRATHAM SHARMA'

  // Typewriter effect — starts after GSAP entry animation finishes
  useEffect(() => {
    let titleIdx = 0
    let charIdx = 0
    let deleting = false
    let timer: ReturnType<typeof setTimeout>

    const initialTimer = setTimeout(() => {
      const tick = () => {
        const current = titles[titleIdx]

        if (!deleting) {
          charIdx++
          setDisplayText(current.slice(0, charIdx))
          if (charIdx === current.length) {
            deleting = true
            timer = setTimeout(tick, 2200)
            return
          }
        } else {
          charIdx--
          setDisplayText(current.slice(0, charIdx))
          if (charIdx === 0) {
            deleting = false
            titleIdx = (titleIdx + 1) % titles.length
          }
        }

        timer = setTimeout(tick, deleting ? 45 : 100)
      }

      tick()
    }, 4500)

    return () => {
      clearTimeout(initialTimer)
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger letter animation
      gsap.fromTo(
        lettersRef.current.filter(Boolean),
        { y: 100, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.06,
          delay: 3.2,
          ease: 'power4.out',
        }
      )

      // Subtitle
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, delay: 4, ease: 'power3.out' }
        )
      }

      // Scroll indicator
      if (scrollIndicatorRef.current) {
        gsap.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, delay: 4.5 }
        )

        gsap.to(scrollIndicatorRef.current.querySelector(`.${styles.scrollLine}`), {
          scaleY: 1.5,
          repeat: -1,
          yoyo: true,
          duration: 1,
          ease: 'power1.inOut',
          delay: 4.5,
        })
      }

      // Parallax layers on scroll
      if (bgTextRef.current) {
        gsap.to(bgTextRef.current, {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      if (canvasLayerRef.current) {
        gsap.to(canvasLayerRef.current, {
          y: -250,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      if (contentLayerRef.current) {
        gsap.to(contentLayerRef.current, {
          y: -400,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className={styles.hero}>
      {/* Layer 1: Background text (slowest parallax) */}
      <div ref={bgTextRef} className={styles.bgText}>
        PS
      </div>

      {/* Layer 2: 3D Wireframe (medium parallax) */}
      <div ref={canvasLayerRef} className={styles.canvas}>
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <WireframeIcosahedron />
        </Canvas>
      </div>

      {/* Layer 3: Name + Subtitle (fastest parallax) */}
      <div ref={contentLayerRef} className={styles.content}>
        <h1 className={styles.title}>
          {name.split('').map((letter, i) => (
            <span
              key={i}
              ref={(el) => { lettersRef.current[i] = el }}
              className={`${styles.letter} ${letter === ' ' ? styles.space : ''}`}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>

        <div ref={subtitleRef} className={styles.subtitle}>
          <span className={styles.subtitleText}>{displayText || '\u00A0'}</span>
          <span className={styles.cursor}>|</span>
        </div>

        <div className={styles.tagline}>
          Building products at scale. Currently @ Leegality.
        </div>
      </div>

      <div ref={scrollIndicatorRef} className={styles.scrollIndicator}>
        <span className={styles.scrollText}>SCROLL</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}

export default Hero

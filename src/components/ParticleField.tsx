import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

interface ParticleFieldProps {
  count?: number
  mouse: React.MutableRefObject<{ x: number; y: number }>
}

export function ParticleField({ count = 300, mouse }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const lightRef = useRef<THREE.PointLight>(null)
  const groupRef = useRef<THREE.Group>(null)
  const { camera } = useThree()

  // Smoothed mouse values for GSAP lerping
  const smoothMouse = useRef({ x: 0, y: 0 })
  const targetRotation = useRef({ x: 0, y: 0 })

  const { positions, sizes, initialPositions } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const initialPositions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const x = (Math.random() - 0.5) * 15
      const y = (Math.random() - 0.5) * 15
      const z = (Math.random() - 0.5) * 10
      positions[i3] = x
      positions[i3 + 1] = y
      positions[i3 + 2] = z
      initialPositions[i3] = x
      initialPositions[i3 + 1] = y
      initialPositions[i3 + 2] = z
      sizes[i] = Math.random() * 2 + 0.5
    }

    return { positions, sizes, initialPositions }
  }, [count])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    return geo
  }, [positions, sizes])

  // Fade in particles after page load
  useEffect(() => {
    if (pointsRef.current) {
      const material = pointsRef.current.material as THREE.PointsMaterial
      material.opacity = 0
      gsap.to(material, {
        opacity: 0.6,
        duration: 1.5,
        delay: 1.2,
        ease: 'power2.out'
      })
    }

    return () => {
      geometry.dispose()
    }
  }, [geometry])

  // GSAP-powered smooth mouse tracking
  useEffect(() => {
    const updateMouse = () => {
      // Use GSAP to smoothly interpolate mouse values
      gsap.to(smoothMouse.current, {
        x: mouse.current.x,
        y: mouse.current.y,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: true
      })

      // Calculate target rotation (max ±15 degrees = ±0.26 radians)
      const maxRotation = 0.15 // ~8.5 degrees for subtlety
      gsap.to(targetRotation.current, {
        x: -mouse.current.y * maxRotation,
        y: mouse.current.x * maxRotation,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: true
      })
    }

    const interval = setInterval(updateMouse, 16) // ~60fps
    return () => clearInterval(interval)
  }, [mouse])

  useFrame((state) => {
    if (!pointsRef.current || !groupRef.current) return

    const positionAttr = pointsRef.current.geometry.attributes.position
    const posArray = positionAttr.array as Float32Array
    const time = state.clock.getElapsedTime()

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Gentle floating motion based on initial positions
      posArray[i3] = initialPositions[i3] + Math.sin(time * 0.3 + i) * 0.3
      posArray[i3 + 1] = initialPositions[i3 + 1] + Math.cos(time * 0.2 + i) * 0.3
      posArray[i3 + 2] = initialPositions[i3 + 2] + Math.sin(time * 0.1 + i) * 0.15

      // Particles drift gently toward cursor
      posArray[i3] += smoothMouse.current.x * 0.3
      posArray[i3 + 1] += smoothMouse.current.y * 0.3

      // Subtle mouse repulsion — push nearby particles away
      const mouseWorldX = smoothMouse.current.x * 5
      const mouseWorldY = smoothMouse.current.y * 5
      const dx = posArray[i3] - mouseWorldX
      const dy = posArray[i3 + 1] - mouseWorldY
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 2.5) {
        const force = (2.5 - dist) / 2.5 * 0.15
        posArray[i3] += (dx / dist) * force
        posArray[i3 + 1] += (dy / dist) * force
      }
    }

    positionAttr.needsUpdate = true

    // Slow continuous rotation
    pointsRef.current.rotation.y = time * 0.015
    pointsRef.current.rotation.x = time * 0.008

    // Apply GSAP-smoothed mouse parallax rotation to group
    groupRef.current.rotation.x = targetRotation.current.x
    groupRef.current.rotation.y = targetRotation.current.y

    // Update light position with smooth mouse
    if (lightRef.current) {
      lightRef.current.position.x = smoothMouse.current.x * 4
      lightRef.current.position.y = smoothMouse.current.y * 4
      lightRef.current.position.z = 2
    }

    // Subtle camera sway (very gentle)
    camera.position.x = smoothMouse.current.x * 0.2
    camera.position.y = smoothMouse.current.y * 0.2
  })

  return (
    <group ref={groupRef}>
      <pointLight ref={lightRef} color="#00f0ff" intensity={0.8} distance={25} />
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          size={0.035}
          color="#00f0ff"
          transparent
          opacity={0}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

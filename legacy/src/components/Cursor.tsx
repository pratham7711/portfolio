import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './Cursor.module.css'

const Cursor = () => {
  const dotRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const mouse = useRef({ x: 0, y: 0 })
  const circlePos = useRef({ x: 0, y: 0 })
  const rafId = useRef<number>(0)

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }

      // Dot follows exactly
      if (dotRef.current) {
        gsap.set(dotRef.current, {
          x: e.clientX,
          y: e.clientY,
        })
      }
    }

    const animate = () => {
      // Circle follows with lerp/lag
      const lerp = 0.15
      circlePos.current.x += (mouse.current.x - circlePos.current.x) * lerp
      circlePos.current.y += (mouse.current.y - circlePos.current.y) * lerp

      if (circleRef.current) {
        gsap.set(circleRef.current, {
          x: circlePos.current.x,
          y: circlePos.current.y,
        })
      }

      rafId.current = requestAnimationFrame(animate)
    }

    const handleMouseEnter = () => {
      setIsHovering(true)
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
    }

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove)
    rafId.current = requestAnimationFrame(animate)

    // Add hover listeners to all interactive elements
    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll('a, button, .hoverable, [data-hoverable]')
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
      })
    }

    // Initial setup and observe for new elements
    addHoverListeners()
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', checkMobile)
      if (rafId.current) cancelAnimationFrame(rafId.current)
      observer.disconnect()

      const hoverables = document.querySelectorAll('a, button, .hoverable, [data-hoverable]')
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  // Don't render on mobile
  if (isMobile) return null

  return (
    <>
      <div
        ref={dotRef}
        className={`${styles.dot} ${isHovering ? styles.hidden : ''}`}
      />
      <div
        ref={circleRef}
        className={`${styles.circle} ${isHovering ? styles.expanded : ''}`}
      />
    </>
  )
}

export default Cursor

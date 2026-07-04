import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './Loader.module.css'

interface LoaderProps {
  onComplete: () => void
}

const Loader = ({ onComplete }: LoaderProps) => {
  const loaderRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const counter = { value: 0 }
    const tl = gsap.timeline()

    // Count animation
    tl.to(counter, {
      value: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        setCount(Math.floor(counter.value))
      },
    })

    // Progress line animation
    tl.to(
      progressRef.current,
      {
        scaleX: 1,
        duration: 2.5,
        ease: 'power2.inOut',
      },
      0
    )

    // Wipe up reveal animation
    tl.to(loaderRef.current, {
      yPercent: -100,
      duration: 1,
      ease: 'power4.inOut',
      delay: 0.3,
      onComplete: () => {
        onComplete()
      },
    })

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <div ref={loaderRef} className={styles.loader}>
      <div className={styles.content}>
        <span ref={counterRef} className={styles.counter}>
          {count.toString().padStart(2, '0')}
        </span>
        <div className={styles.progressContainer}>
          <div ref={progressRef} className={styles.progress} />
        </div>
      </div>
    </div>
  )
}

export default Loader

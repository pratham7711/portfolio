'use client'

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

export interface FrameScrubberHandle {
  setProgress: (p: number) => void
}

interface FrameScrubberProps {
  base: string
  count: number
  className?: string
  priority?: 'high' | 'low'
}

const FrameScrubber = forwardRef<FrameScrubberHandle, FrameScrubberProps>(
  function FrameScrubber({ base, count, className, priority = 'low' }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const stateRef = useRef({
      images: [] as HTMLImageElement[],
      loaded: [] as boolean[],
      target: 0,
      drawn: -1,
      keyed: false,
      filled: false,
      armed: false,
      fill: () => {},
    })

    const draw = (idx: number) => {
      const canvas = canvasRef.current
      const s = stateRef.current
      if (!canvas) return
      let pick = idx
      if (!s.loaded[pick]) {
        pick = -1
        for (let d = 0; d < count; d++) {
          if (idx - d >= 0 && s.loaded[idx - d]) {
            pick = idx - d
            break
          }
          if (idx + d < count && s.loaded[idx + d]) {
            pick = idx + d
            break
          }
        }
        if (pick < 0) return
      }
      const img = s.images[pick]
      const ctx = canvas.getContext('2d')
      if (!ctx || !img.naturalWidth) return
      const cw = canvas.width
      const ch = canvas.height
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
      const dw = img.naturalWidth * scale
      const dh = img.naturalHeight * scale
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
      s.drawn = pick
    }

    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      const s = stateRef.current
      s.images = []
      s.loaded = new Array(count).fill(false)
      s.drawn = -1
      s.keyed = false
      s.filled = false
      s.armed = false

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
        canvas.width = Math.round(canvas.offsetWidth * dpr)
        canvas.height = Math.round(canvas.offsetHeight * dpr)
        s.drawn = -1
        draw(s.target)
      }
      const ro = new ResizeObserver(resize)
      ro.observe(canvas)
      resize()

      const loadFrames = (idxs: number[], eagerFirst: boolean) => {
        idxs.forEach((i, rank) => {
          if (s.images[i]) return
          const img = new Image()
          img.decoding = 'async'
          if (rank > 0 || !eagerFirst) img.fetchPriority = 'low'
          img.onload = () => {
            s.loaded[i] = true
            const t = s.target
            if (s.drawn === -1 || Math.abs(i - t) < Math.abs(s.drawn - t)) draw(t)
          }
          img.src = `${base}/${String(i + 1).padStart(3, '0')}.webp`
          s.images[i] = img
        })
      }

      const startFill = () => {
        if (!s.keyed || s.filled) return
        s.filled = true
        const rest: number[] = []
        for (let i = 0; i < count; i++) if (!s.images[i]) rest.push(i)
        loadFrames(rest, false)
      }
      s.fill = startFill

      const startKeyframes = () => {
        if (s.keyed) return
        s.keyed = true
        const order: number[] = [0]
        for (let i = 6; i < count; i += 6) order.push(i)
        loadFrames(order, priority === 'high')
        if (s.armed) startFill()
      }

      const ric: (cb: () => void) => void =
        typeof window.requestIdleCallback === 'function'
          ? (cb) => window.requestIdleCallback(cb, { timeout: 2000 })
          : (cb) => window.setTimeout(cb, 200)

      const onFirstScroll = () => {
        s.armed = true
        startFill()
      }
      window.addEventListener('scroll', onFirstScroll, { once: true, passive: true })

      let io: IntersectionObserver | null = null
      if (priority === 'high') {
        startKeyframes()
      } else {
        io = new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting)) {
              io?.disconnect()
              ric(startKeyframes)
            }
          },
          { rootMargin: '800px 0px' }
        )
        io.observe(canvas)
      }

      return () => {
        ro.disconnect()
        io?.disconnect()
        window.removeEventListener('scroll', onFirstScroll)
      }
    }, [base, count, priority])

    useImperativeHandle(ref, () => ({
      setProgress: (p: number) => {
        const s = stateRef.current
        const idx = Math.max(0, Math.min(count - 1, Math.round(p * (count - 1))))
        s.target = idx
        if (idx > 0 && !s.filled) {
          s.armed = true
          s.fill()
        }
        if (idx !== s.drawn) draw(idx)
      },
    }))

    return <canvas ref={canvasRef} className={className} aria-hidden />
  }
)

export default FrameScrubber

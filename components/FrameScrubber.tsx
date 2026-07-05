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
      started: false,
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
      s.started = false

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

      const startLoading = () => {
        if (s.started) return
        s.started = true

        const order: number[] = [0]
        for (let i = 6; i < count; i += 6) order.push(i)
        for (let i = 0; i < count; i++) if (!order.includes(i)) order.push(i)

        order.forEach((i, rank) => {
          const img = new Image()
          img.decoding = 'async'
          if (rank > 0 || priority === 'low') img.fetchPriority = 'low'
          img.onload = () => {
            s.loaded[i] = true
            const t = s.target
            if (s.drawn === -1 || Math.abs(i - t) < Math.abs(s.drawn - t)) draw(t)
          }
          img.src = `${base}/${String(i + 1).padStart(3, '0')}.webp`
          s.images[i] = img
        })
      }

      const ric: (cb: () => void) => void =
        typeof window.requestIdleCallback === 'function'
          ? (cb) => window.requestIdleCallback(cb, { timeout: 2000 })
          : (cb) => window.setTimeout(cb, 200)

      let io: IntersectionObserver | null = null
      if (priority === 'high') {
        startLoading()
      } else {
        io = new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting)) {
              io?.disconnect()
              ric(startLoading)
            }
          },
          { rootMargin: '800px 0px' }
        )
        io.observe(canvas)
      }

      return () => {
        ro.disconnect()
        io?.disconnect()
      }
    }, [base, count, priority])

    useImperativeHandle(ref, () => ({
      setProgress: (p: number) => {
        const s = stateRef.current
        const idx = Math.max(0, Math.min(count - 1, Math.round(p * (count - 1))))
        s.target = idx
        if (idx !== s.drawn) draw(idx)
      },
    }))

    return <canvas ref={canvasRef} className={className} aria-hidden />
  }
)

export default FrameScrubber

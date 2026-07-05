'use client'

import { useEffect, useState } from 'react'
import styles from './ViewCounter.module.css'

const NS = 'prathamsharma-in'
const KEY = 'views'
const BASE = 'https://abacus.jasoncameron.dev'

export default function ViewCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    const counted = sessionStorage.getItem('ps-viewed')
    sessionStorage.setItem('ps-viewed', '1')
    const url = `${BASE}/${counted ? 'get' : 'hit'}/${NS}/${KEY}`

    let alive = true
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => {
        if (alive && typeof d?.value === 'number') setCount(d.value)
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  if (count === null) return null

  return (
    <span className={styles.views} aria-label={`${count} portfolio views`}>
      <span className={styles.dot} aria-hidden />
      {count.toLocaleString('en-US')} views
    </span>
  )
}

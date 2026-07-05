'use client'

import styles from './Marquee.module.css'

/**
 * Infinite marquee strip — scroll-independent CSS animation, GPU-cheap.
 */
export default function Marquee({
  items,
  dark = true,
}: {
  items: string[]
  dark?: boolean
}) {
  const row = [...items, ...items, ...items, ...items]
  return (
    <div className={`${styles.strip} ${dark ? styles.dark : styles.light}`} aria-hidden>
      <div className={styles.track}>
        {row.map((t, i) => (
          <span key={i} className={styles.item}>
            {t}
            <span className={styles.sep}>●</span>
          </span>
        ))}
      </div>
    </div>
  )
}

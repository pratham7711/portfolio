import styles from './Footer.module.css'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Static volleyball — the 3D scroll ball fades into this on final bounce */}
      <div
        data-volleyball-footer
        className={styles.volleyballMark}
        aria-hidden="true"
        style={{ opacity: 0 }}
      >
        <svg viewBox="0 0 64 64" width="64" height="64" fill="none">
          <circle cx="32" cy="32" r="29" fill="#f7f5ed" stroke="#1f1d18" strokeWidth="1.2" />
          <path d="M3 32 Q32 12 61 32" stroke="#1f1d18" strokeWidth="1.4" fill="none" />
          <path d="M3 32 Q32 52 61 32" stroke="#1f1d18" strokeWidth="1.4" fill="none" />
          <path d="M32 3 Q14 32 32 61" stroke="#1f1d18" strokeWidth="1.4" fill="none" />
          <path d="M32 3 Q50 32 32 61" stroke="#1f1d18" strokeWidth="1.4" fill="none" />
          {/* faint cyan accent — ties to the brand */}
          <path d="M3 32 Q32 12 61 32" stroke="#00E5D1" strokeWidth="0.6" fill="none" opacity="0.5" />
          <path d="M32 3 Q14 32 32 61" stroke="#00E5D1" strokeWidth="0.6" fill="none" opacity="0.5" />
        </svg>
      </div>

      <div className={styles.container}>
        <span className={styles.copyright}>
          &copy; 2026 Pratham Sharma
        </span>
        <span className={styles.relocation}>
          Open to relocation: UAE · Germany · USA · Spain
        </span>
        <span className={styles.credit}>
          Built with React + Three.js + GSAP
        </span>
      </div>
    </footer>
  )
}

export default Footer

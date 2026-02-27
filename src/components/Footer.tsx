import styles from './Footer.module.css'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <span className={styles.copyright}>
          &copy; 2026 Pratham Sharma
        </span>
        <span className={styles.relocation}>
          Open to relocation — UAE · Germany · USA · Spain
        </span>
        <span className={styles.credit}>
          Built with React + Three.js + GSAP
        </span>
      </div>
    </footer>
  )
}

export default Footer

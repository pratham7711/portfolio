import { useEffect, useRef, useState } from 'react'
import styles from './ProjectPreviewModal.module.css'

interface ProjectPreviewModalProps {
  projectName: string
  liveUrl: string
  onClose: () => void
}

export const ProjectPreviewModal = ({ projectName, liveUrl, onClose }: ProjectPreviewModalProps) => {
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [showIframe, setShowIframe] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const terminalBodyRef = useRef<HTMLDivElement>(null)

  const lines = [
    '$ initializing secure tunnel...',
    `$ loading ${projectName.toLowerCase()}...`,
    '$ mounting application context...',
    '$ rendering UI components...',
    '$ connected — launching preview.',
  ]

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Typewriter
  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setTimeout(() => setShowIframe(true), 500)
      return
    }

    const line = lines[currentLineIndex]
    let charIndex = 0

    const interval = setInterval(() => {
      if (charIndex <= line.length) {
        setCurrentText(line.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(interval)
        setTerminalLines((prev) => [...prev, line])
        setCurrentText('')
        setTimeout(() => setCurrentLineIndex((prev) => prev + 1), 250)
      }
    }, 22)

    return () => clearInterval(interval)
  }, [currentLineIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight
    }
  }, [terminalLines, currentText])

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className={styles.modal}>
        {/* Browser Chrome */}
        <div className={styles.chrome}>
          <div className={styles.trafficLights}>
            <span className={`${styles.dot} ${styles.red}`} onClick={onClose} title="Close" />
            <span className={`${styles.dot} ${styles.yellow}`} />
            <span className={`${styles.dot} ${styles.green}`} />
          </div>
          <div className={styles.urlBar}>
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className={styles.urlText}>
              localhost &rsaquo;&rsaquo; <strong>{projectName.toLowerCase().replace(/ /g, '-')}</strong>
            </span>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close preview">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Area */}
        <div className={styles.content}>
          {!showIframe ? (
            <div className={styles.terminal}>
              {/* Terminal title bar */}
              <div className={styles.terminalHeader}>
                <div className={styles.terminalHeaderDots}>
                  <span />
                  <span />
                  <span />
                </div>
                <span className={styles.terminalTitle}>terminal — zsh — 80×24</span>
              </div>

              {/* Terminal body */}
              <div className={styles.terminalBody} ref={terminalBodyRef}>
                <div className={styles.terminalBanner}>
                  <pre>{`██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗
██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝`}</pre>
                  <span className={styles.terminalSubtitle}>// Pratham Sharma — Project Launcher v1.0.0</span>
                </div>

                <div className={styles.terminalDivider}>{'─'.repeat(60)}</div>

                {terminalLines.map((line, i) => (
                  <div key={i} className={styles.terminalLine}>
                    <span className={styles.prompt}>
                      <span className={styles.promptUser}>pratham</span>
                      <span className={styles.promptAt}>@</span>
                      <span className={styles.promptHost}>portfolio</span>
                      <span className={styles.promptSep}>:~$</span>
                    </span>
                    <span className={styles.lineText}>{line.replace(/^\$\s*/, '')}</span>
                  </div>
                ))}

                {currentLineIndex < lines.length && (
                  <div className={styles.terminalLine}>
                    <span className={styles.prompt}>
                      <span className={styles.promptUser}>pratham</span>
                      <span className={styles.promptAt}>@</span>
                      <span className={styles.promptHost}>portfolio</span>
                      <span className={styles.promptSep}>:~$</span>
                    </span>
                    <span className={styles.lineText}>
                      {currentText.replace(/^\$\s*/, '')}
                      <span className={styles.cursor}>▊</span>
                    </span>
                  </div>
                )}

                {currentLineIndex >= lines.length && (
                  <div className={styles.terminalSuccess}>
                    <span className={styles.successCheck}>✓</span>
                    <span>Preview ready. Loading interface...</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.iframeWrapper}>
              {!iframeLoaded && (
                <div className={styles.iframeLoader}>
                  <div className={styles.spinner} />
                  <span>Loading {projectName}...</span>
                </div>
              )}
              <iframe
                src={liveUrl}
                className={`${styles.iframe} ${iframeLoaded ? styles.iframeVisible : ''}`}
                title={`${projectName} Live Preview`}
                onLoad={() => setIframeLoaded(true)}
                allow="camera; microphone; fullscreen"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectPreviewModal

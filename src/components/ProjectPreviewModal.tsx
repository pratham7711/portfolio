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
  const [iframeBlocked, setIframeBlocked] = useState(false)
  const terminalBodyRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

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

  const handleIframeLoad = () => {
    try {
      const doc = iframeRef.current?.contentDocument
      // If we can access contentDocument and it has an empty body,
      // the browser likely replaced the content with a blank/error page (X-Frame-Options)
      if (doc && doc.body && !doc.body.children.length) {
        setIframeBlocked(true)
        return
      }
    } catch {
      // SecurityError = cross-origin page loaded successfully — this is fine
    }
    setIframeLoaded(true)
  }

  const handleIframeError = () => {
    setIframeBlocked(true)
  }

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
          ) : iframeBlocked ? (
            <div className={styles.blockedWrapper}>
              <div className={styles.blockedShimmer} />
              <div className={styles.blockedContent}>
                <div className={styles.blockedIcon}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                  </svg>
                </div>
                <h3 className={styles.blockedTitle}>{projectName}</h3>
                <p className={styles.blockedMessage}>
                  Live preview blocked by browser security (X-Frame-Options)
                </p>
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.blockedOpenBtn}
                >
                  Open Live Demo
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
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
                ref={iframeRef}
                src={liveUrl}
                className={`${styles.iframe} ${iframeLoaded ? styles.iframeVisible : ''}`}
                title={`${projectName} Live Preview`}
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                allow="camera; microphone; fullscreen"
                sandbox="allow-scripts allow-same-origin allow-forms"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectPreviewModal

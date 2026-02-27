import { useRef, useLayoutEffect, useState, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Projects.module.css'
import { ProjectPreviewModal } from './ProjectPreviewModal'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  number: string
  name: string
  description: string
  tags: string[]
  link?: string
  liveUrl?: string
  comingSoon?: boolean
  featured?: boolean
  accent?: string
}

const projects: Project[] = [
  {
    number: '01',
    name: 'DOCMIND AI',
    description:
      'AI-powered document intelligence platform — upload PDFs, ask questions, get instant answers. Built with RAG architecture and vector search for context-aware responses.',
    tags: ['LangChain', 'OpenAI API', 'RAG', 'Pinecone', 'FastAPI', 'React'],
    liveUrl: 'https://docmind-ai-git-main-prathams-projects-371c8ade.vercel.app',
    link: 'https://github.com/pratham7711/docmind-ai',
    featured: true,
    accent: '#a78bfa',
  },
  {
    number: '02',
    name: 'COLLABBOARD',
    description:
      'Real-time collaborative whiteboard with WebSocket-powered multi-cursor support, drawing tools, sticky notes, and live presence indicators.',
    tags: ['React', 'WebSockets', 'Canvas API', 'Node.js', 'Redis'],
    liveUrl: 'https://collabboard-git-main-prathams-projects-371c8ade.vercel.app',
    link: 'https://github.com/pratham7711/collabboard',
    featured: true,
    accent: '#34d399',
  },
  {
    number: '03',
    name: 'SHOPWAVE',
    description:
      'Full-featured e-commerce platform with product search, cart management, Stripe payments, and a seller dashboard with real-time analytics.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Prisma'],
    liveUrl: 'https://shopwave-git-main-prathams-projects-371c8ade.vercel.app',
    link: 'https://github.com/pratham7711/shopwave',
    featured: true,
    accent: '#f59e0b',
  },
  {
    number: '04',
    name: 'DEVPULSE',
    description:
      'Developer activity dashboard aggregating GitHub contributions, LeetCode stats, and commit heatmaps into a single profile card you can embed anywhere.',
    tags: ['React', 'GraphQL', 'GitHub API', 'Node.js', 'Chart.js'],
    liveUrl: 'https://devpulse-git-main-prathams-projects-371c8ade.vercel.app',
    link: 'https://github.com/pratham7711/devpulse',
    featured: true,
    accent: '#60a5fa',
  },
  {
    number: '05',
    name: 'CINEMATE',
    description:
      'Netflix-style streaming platform with full authentication, movie discovery, and personalized recommendations. Built with JWT auth and TMDB API integration.',
    tags: ['React', 'Express', 'Node.js', 'MongoDB', 'JWT', 'TMDB API'],
    link: 'https://github.com/pratham7711/CineMate',
    accent: '#f43f5e',
  },
  {
    number: '06',
    name: 'CRYPTOEXCHANGE',
    description:
      'Real-time cryptocurrency dashboard with live price tracking, historical charts, and portfolio management. CoinGecko API for live market data.',
    tags: ['React', 'Firebase', 'CoinGecko API', 'Chart.js', 'Real-time'],
    accent: '#fbbf24',
  },
  {
    number: '07',
    name: 'CAMPAIGN TRACKER',
    description:
      'Election campaign management platform with voter outreach tracking, advanced filters, and a live leaderboard. Built for real-world political campaign operations.',
    tags: ['React', 'JavaScript', 'Filters', 'Leaderboard'],
    link: 'https://github.com/pratham7711/campaign-tracker',
    accent: '#10b981',
  },
  {
    number: '08',
    name: 'LEEGALITY DESIGN SYSTEM',
    description:
      'Enterprise-grade UI component library standardizing design across multiple teams. Built with atomic design principles, 50+ components, and comprehensive Storybook docs.',
    tags: ['React', 'TypeScript', 'ShadCN', 'Storybook', 'Rollup', 'Design System'],
    accent: '#00E5D1',
  },
  {
    number: '09',
    name: 'STREAMDASH',
    description:
      'Real-time data pipeline monitoring dashboard powered by Apache Kafka. Visualizes message throughput, consumer lag, and partition health at a glance.',
    tags: ['React', 'Apache Kafka', 'Node.js', 'WebSockets', 'Chart.js'],
    liveUrl: 'https://streamdash-git-main-prathams-projects-371c8ade.vercel.app',
    link: 'https://github.com/pratham7711/streamdash',
    accent: '#f97316',
  },
  {
    number: '10',
    name: 'LUMINA',
    description:
      'AI-assisted design tool that generates UI component variants from text prompts, exports production-ready React code, and plugs into Figma workflows.',
    tags: ['React', 'Three.js', 'GSAP', 'TypeScript', 'Framer Motion'],
    liveUrl: 'https://lumina-git-main-prathams-projects-371c8ade.vercel.app',
    link: 'https://github.com/pratham7711/lumina',
    accent: '#c084fc',
  },
]

const featuredProjects = projects.filter((p) => p.featured)
const archiveProjects = projects.filter((p) => !p.featured)

const STATS = [
  { value: '10', label: 'Projects Built' },
  { value: '3', label: 'Countries Targeted' },
  { value: '4', label: 'AI Models Integrated' },
  { value: '50+', label: 'React Components' },
  { value: '3+', label: 'Years Experience' },
  { value: '4', label: 'Companies Worked' },
  { value: '9/10', label: 'GPA Score' },
  { value: '∞', label: 'Lines of Code' },
]

const TAG_COLORS: Record<string, string> = {
  React: '#61DAFB',
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  'Node.js': '#339933',
  Python: '#3776AB',
  FastAPI: '#009688',
  MongoDB: '#47A248',
  PostgreSQL: '#336791',
  Redis: '#DC382D',
  'OpenAI API': '#8b5cf6',
  LangChain: '#1fb8cd',
  RAG: '#ec4899',
  Pinecone: '#6366F1',
  WebSockets: '#F59E0B',
  'Canvas API': '#8B5CF6',
  GraphQL: '#E535AB',
  'Chart.js': '#FF6384',
  'Next.js': '#6b7280',
  Stripe: '#635BFF',
  Prisma: '#5b8ef7',
  Firebase: '#FFCA28',
  Express: '#a3a3a3',
  JWT: '#D63AFF',
  'TMDB API': '#01B4E4',
  'CoinGecko API': '#8DC647',
  Storybook: '#FF4785',
  Rollup: '#EC4A3F',
  ShadCN: '#94a3b8',
  'Design System': '#6366F1',
  'Apache Kafka': '#e4533a',
  'Figma Plugin API': '#F24E1E',
  'Real-time': '#10B981',
  Filters: '#6366F1',
  Leaderboard: '#F59E0B',
}

function getTagColor(tag: string): string {
  return TAG_COLORS[tag] || '#00E5D1'
}

export const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const featuredRef = useRef<HTMLElement>(null)
  const tickerRef = useRef<HTMLDivElement>(null)

  const [activeModal, setActiveModal] = useState<{ name: string; url: string } | null>(null)
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return
      setIsTransitioning(true)
      setTimeout(() => {
        setFeaturedIndex(index)
        setIsTransitioning(false)
      }, 350)
    },
    [isTransitioning]
  )

  const goNext = useCallback(() => {
    goTo((featuredIndex + 1) % featuredProjects.length)
  }, [featuredIndex, goTo])

  const goPrev = useCallback(() => {
    goTo((featuredIndex - 1 + featuredProjects.length) % featuredProjects.length)
  }, [featuredIndex, goTo])

  // Auto-rotate featured
  useEffect(() => {
    const timer = setInterval(goNext, 5000)
    return () => clearInterval(timer)
  }, [goNext])

  // Featured section entrance animation
  useLayoutEffect(() => {
    if (!featuredRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.featuredAnimIn',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featuredRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, featuredRef)
    return () => ctx.revert()
  }, [])

  // Horizontal scroll setup (desktop only)
  useLayoutEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    // Skip horizontal scroll on mobile — show vertical grid instead
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) {
      // Just animate the heading in
      const ctx = gsap.context(() => {
        gsap.fromTo(
          headingRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }, section)
      return () => ctx.revert()
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      const totalWidth = track.scrollWidth
      const viewportWidth = window.innerWidth

      gsap.to(track, {
        x: -(totalWidth - viewportWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          end: () => `+=${totalWidth - viewportWidth}`,
          invalidateOnRefresh: true,
        },
      })

      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${totalWidth - viewportWidth}`,
            scrub: 0.3,
          },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  const currentFeatured = featuredProjects[featuredIndex]

  return (
    <>
      {/* Stats Ticker */}
      <div className={styles.tickerWrapper}>
        <div className={styles.tickerInner} ref={tickerRef}>
          <div className={styles.tickerTrack}>
            {[...STATS, ...STATS].map((stat, i) => (
              <div key={i} className={styles.tickerItem}>
                <span className={styles.tickerValue}>{stat.value}</span>
                <span className={styles.tickerLabel}>{stat.label}</span>
                <span className={styles.tickerDivider}>◆</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Project Showcase */}
      <section ref={featuredRef} id="work" className={styles.featured}>
        <div className={styles.featuredInner}>
          {/* Left: Info */}
          <div className={`${styles.featuredInfo} featuredAnimIn`}>
            <span className={styles.label}>CHAPTER 04</span>
            <h2 className={styles.featuredHeading}>FEATURED WORK</h2>

            <div
              className={`${styles.featuredProject} ${isTransitioning ? styles.transitioning : ''}`}
            >
              <div
                className={styles.featuredAccentLine}
                style={{ background: currentFeatured.accent }}
              />
              <div className={styles.featuredMeta}>
                <span className={styles.featuredNumber}>{currentFeatured.number}</span>
                <span className={styles.featuredLiveBadge}>
                  <span className={styles.liveDot} />
                  LIVE
                </span>
              </div>
              <h3
                className={styles.featuredName}
                style={{ color: currentFeatured.accent }}
              >
                {currentFeatured.name}
              </h3>
              <p className={styles.featuredDescription}>{currentFeatured.description}</p>

              <div className={styles.featuredTags}>
                {currentFeatured.tags.map((tag) => (
                  <span
                    key={tag}
                    className={styles.colorTag}
                    style={{
                      color: getTagColor(tag),
                      borderColor: `${getTagColor(tag)}33`,
                      background: `${getTagColor(tag)}11`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className={styles.featuredActions}>
                <button
                  className={styles.previewBtn}
                  onClick={() =>
                    setActiveModal({ name: currentFeatured.name, url: currentFeatured.liveUrl! })
                  }
                  style={{ '--btn-accent': currentFeatured.accent } as React.CSSProperties}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  LIVE PREVIEW
                </button>
                {currentFeatured.link && (
                  <a
                    href={currentFeatured.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.githubLink}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GITHUB
                  </a>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className={styles.featuredNav}>
              <button className={styles.navBtn} onClick={goPrev} aria-label="Previous project">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <div className={styles.navDots}>
                {featuredProjects.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.navDot} ${i === featuredIndex ? styles.navDotActive : ''}`}
                    onClick={() => goTo(i)}
                    aria-label={`Go to project ${i + 1}`}
                    style={i === featuredIndex ? { background: currentFeatured.accent } : {}}
                  />
                ))}
              </div>
              <button className={styles.navBtn} onClick={goNext} aria-label="Next project">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right: Visual Preview Card */}
          <div className={`${styles.featuredVisual} featuredAnimIn`}>
            <div
              className={`${styles.visualCard} ${isTransitioning ? styles.transitioning : ''}`}
              style={{ '--card-accent': currentFeatured.accent } as React.CSSProperties}
            >
              {/* Glow */}
              <div className={styles.visualGlow} style={{ background: currentFeatured.accent }} />

              {/* Fake browser window */}
              <div className={styles.fakeBrowser}>
                <div className={styles.fakeBrowserBar}>
                  <div className={styles.fakeDots}>
                    <span className={styles.fakeDotR} />
                    <span className={styles.fakeDotY} />
                    <span className={styles.fakeDotG} />
                  </div>
                  <div className={styles.fakeUrl}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>localhost/{currentFeatured.name.toLowerCase().replace(/ /g, '-')}</span>
                  </div>
                </div>

                {/* Preview content */}
                <div
                  className={styles.fakeBrowserContent}
                  style={{ '--preview-accent': currentFeatured.accent } as React.CSSProperties}
                >
                  <div className={styles.previewSidebar}>
                    <div className={styles.previewSideItem} style={{ background: currentFeatured.accent }} />
                    {[0.6, 0.4, 0.5, 0.45, 0.55].map((w, i) => (
                      <div key={i} className={styles.previewSideItem} style={{ opacity: 0.2, width: `${w * 100}%` }} />
                    ))}
                  </div>
                  <div className={styles.previewMain}>
                    <div className={styles.previewHeader} style={{ background: `${currentFeatured.accent}22` }}>
                      <div className={styles.previewHeaderDot} style={{ background: currentFeatured.accent }} />
                      <div className={styles.previewHeaderBar} />
                    </div>
                    <div className={styles.previewCards}>
                      {[1, 2, 3].map((i) => (
                        <div key={i} className={styles.previewCard}>
                          <div className={styles.previewCardTop} style={{ background: `${currentFeatured.accent}22` }} />
                          <div className={styles.previewCardLines}>
                            <div className={styles.previewLine} style={{ width: '80%' }} />
                            <div className={styles.previewLine} style={{ width: '60%' }} />
                            <div className={styles.previewLine} style={{ width: '40%', background: currentFeatured.accent, opacity: 0.5 }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Overlay click to preview */}
              <button
                className={styles.visualOverlay}
                onClick={() =>
                  setActiveModal({ name: currentFeatured.name, url: currentFeatured.liveUrl! })
                }
                aria-label={`Launch ${currentFeatured.name} preview`}
              >
                <div className={styles.overlayIcon}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <span>LAUNCH PREVIEW</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* All Projects — Horizontal Scroll */}
      <section ref={sectionRef} className={styles.projects}>
        <div className={styles.header}>
          <span className={styles.label}>ALL WORK</span>
          <h2 ref={headingRef} className={styles.heading}>
            THE ARCHIVE
          </h2>
          <div className={styles.progressTrack}>
            <div ref={progressBarRef} className={styles.progressBar} />
          </div>
        </div>

        <div ref={trackRef} className={styles.track}>
          {archiveProjects.map((project) => (
            <div
              key={project.number}
              className={`${styles.card} ${project.comingSoon ? styles.cardComingSoon : ''}`}
            >
              <div
                className={styles.cardInner}
                style={{ '--card-accent': project.accent || 'var(--color-accent)' } as React.CSSProperties}
              >
                {/* Animated gradient border */}
                <div className={styles.cardBorderGlow} />

                <span className={styles.number}>{project.number}</span>

                {project.comingSoon && (
                  <span className={styles.devBadge}>IN DEVELOPMENT</span>
                )}
                {project.liveUrl && (
                  <span className={styles.liveBadge}>
                    <span className={styles.liveDotSmall} />
                    LIVE
                  </span>
                )}

                <div className={styles.cardContent}>
                  <h3
                    className={styles.name}
                    style={{ color: project.accent || 'var(--color-text-primary)' }}
                  >
                    {project.name}
                  </h3>
                  <p className={styles.description}>{project.description}</p>

                  <div className={styles.tags}>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={styles.colorTag}
                        style={{
                          color: getTagColor(tag),
                          borderColor: `${getTagColor(tag)}33`,
                          background: `${getTagColor(tag)}11`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className={styles.cardActions}>
                    {project.liveUrl && (
                      <button
                        className={styles.previewBtn}
                        onClick={() =>
                          setActiveModal({ name: project.name, url: project.liveUrl! })
                        }
                        style={
                          { '--btn-accent': project.accent || 'var(--color-accent)' } as React.CSSProperties
                        }
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        LIVE PREVIEW
                      </button>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.projectLink}
                      >
                        GITHUB
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Preview Modal */}
      {activeModal && (
        <ProjectPreviewModal
          projectName={activeModal.name}
          liveUrl={activeModal.url}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  )
}

export default Projects

'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HOBBIES, MEDIA } from '@/lib/data'
import styles from './ActBody.module.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * ACT II — THE BODY
 * Editorial magazine spread → scroll zooms into the photo →
 * photo comes alive as cinematic video → horizontal hobby rally.
 */
export default function ActBody() {
  const sectionRef = useRef<HTMLElement>(null)
  const zoomWrapRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hobbyWrapRef = useRef<HTMLDivElement>(null)
  const hobbyRailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ---------- THE ZOOM: editorial still → full-bleed video ----------
      const wrap = zoomWrapRef.current
      const frame = frameRef.current
      const video = videoRef.current
      if (wrap && frame) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            start: 'top top',
            end: '+=250%',
            pin: true,
            scrub: 0.5,
            onLeave: () => window.dispatchEvent(new Event('act:transition')),
          },
        })

        tl.to(`.${styles.editorialCopy}`, { opacity: 0.25, y: -30, duration: 0.4 })
          .to(
            frame,
            {
              width: '100vw',
              height: '100svh',
              borderRadius: 0,
              duration: 1,
              ease: 'power2.inOut',
            },
            '<'
          )
          .to(
            `.${styles.still}`,
            { scale: 1.06, filter: 'grayscale(0)', duration: 1 },
            '<'
          )
          // crossfade still → video once full-bleed
          .to(`.${styles.videoLayer}`, {
            opacity: 1,
            duration: 0.35,
            onStart: () => {
              video?.play().catch(() => {})
            },
          })
          .fromTo(
            `.${styles.cineCaption}`,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.3 },
            '<+=0.1'
          )
      }

      // ---------- HOBBY RALLY: horizontal ----------
      const hw = hobbyWrapRef.current
      const rail = hobbyRailRef.current
      if (hw && rail) {
        const getDist = () => rail.scrollWidth - window.innerWidth
        gsap.to(rail, {
          x: () => -getDist(),
          ease: 'none',
          scrollTrigger: {
            trigger: hw,
            start: 'top top',
            end: () => `+=${getDist()}`,
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="act-body" ref={sectionRef} className={styles.act}>
      {/* EDITORIAL SPREAD with zoom-to-video */}
      <div ref={zoomWrapRef} className={styles.zoomWrap}>
        <div className={styles.editorial}>
          <div className={styles.editorialCopy}>
            <p className={styles.setLabel}>SET 2 — THE BODY</p>
            <h2 className={styles.editorialTitle}>
              The <em>Setter</em>
            </h2>
            <p className={styles.editorialDek}>
              Two seasons as captain. Every rally runs through the setter —
              the engineer of the court.
            </p>
            <p className={styles.editorialFolio}>VOL. 02 — PLAYMAKER ISSUE</p>
          </div>

          <div ref={frameRef} className={styles.frame}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={MEDIA.editorialStill}
              alt="Pratham mid-set on a volleyball court"
              className={styles.still}
            />
            <div className={styles.videoLayer}>
              <video
                ref={videoRef}
                className={styles.video}
                src={MEDIA.volleyballVideo}
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
            <p className={styles.cineCaption}>
              VISION · TIMING · TRUST — <span>the same job, different court.</span>
            </p>
          </div>
        </div>
      </div>

      {/* HOBBY RALLY — horizontal */}
      <div ref={hobbyWrapRef} className={styles.hobbyWrap}>
        <div ref={hobbyRailRef} className={styles.hobbyRail}>
          <div className={styles.hobbyIntro}>
            <p className={styles.setLabel}>OFF THE COURT</p>
            <h2 className={styles.hobbyTitle}>
              SIDE
              <br />
              QUESTS
            </h2>
          </div>
          {HOBBIES.map((h, i) => (
            <article key={h.id} className={styles.hobbyCard} data-hobby={h.id}>
              <span className={styles.hobbyIndex}>0{i + 1}</span>
              <h3 className={styles.hobbyName}>{h.title}</h3>
              <p className={styles.hobbyMeta}>{h.meta}</p>
              <p className={styles.hobbyDetail}>{h.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

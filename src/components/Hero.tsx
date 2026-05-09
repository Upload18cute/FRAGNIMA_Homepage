import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as RPointerEvent, type MouseEvent as RMouseEvent } from 'react'
import styles from './Hero.module.css'
import bgUrl   from '../resources/background.png'
import logoUrl  from '../resources/FRAGNIMA.svg'
import signUrl  from '../resources/sign_fit.png'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const dialRef = useRef<HTMLDivElement>(null)

  /* dial handle drag state */
  const [pos,   setPos]   = useState({ x: 0, y: 0 })
  const [rotLg, setRotLg] = useState(0)
  const [rotMd, setRotMd] = useState(0)
  const draggingRef   = useRef(false)
  const pressDoneRef  = useRef(false)
  const pressTimerRef = useRef<number | null>(null)

  const clampToDial = (clientX: number, clientY: number) => {
    const rect = dialRef.current!.getBoundingClientRect()
    const cx = rect.left + rect.width  / 2
    const cy = rect.top  + rect.height / 2
    let dx = clientX - cx
    let dy = clientY - cy
    const maxR = rect.width / 2              // center diamond rides the outer edge
    const dist = Math.hypot(dx, dy)
    if (dist > maxR) {
      dx = (dx / dist) * maxR
      dy = (dy / dist) * maxR
    }
    return { x: dx, y: dy, maxR }
  }

  /* post-fx intensity scales with handle distance from center */
  const applyGrain = (p: { x: number; y: number }, maxR: number) => {
    const ratio = Math.min(Math.hypot(p.x, p.y) / maxR, 1)
    const root = document.documentElement
    root.style.setProperty('--grain', String(ratio))
    root.style.setProperty('--bokeh', String(ratio))
  }

  const onDialDown = (e: RPointerEvent<HTMLDivElement>) => {
    if (!dialRef.current) return
    e.preventDefault()
    const c = clampToDial(e.clientX, e.clientY)
    setPos({ x: c.x, y: c.y })                  // teleport handle to click point
    applyGrain(c, c.maxR)
    draggingRef.current = true
    /* mark press in flight; flips to true once the slower (0.8s) anim completes */
    pressDoneRef.current = false
    if (pressTimerRef.current !== null) window.clearTimeout(pressTimerRef.current)
    pressTimerRef.current = window.setTimeout(() => { pressDoneRef.current = true }, 800)
    setRotLg(r => r + 180)
    setRotMd(r => r + 180)
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onDialMove = (e: RPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || !dialRef.current) return
    const c = clampToDial(e.clientX, e.clientY)
    setPos({ x: c.x, y: c.y })
    applyGrain(c, c.maxR)
  }
  const onDialUp = () => {
    if (!draggingRef.current) return
    draggingRef.current = false
    if (pressTimerRef.current !== null) {
      window.clearTimeout(pressTimerRef.current)
      pressTimerRef.current = null
    }
    /* completed → keep rotating CW; aborted early → reverse CCW back to origin */
    const delta = pressDoneRef.current ? +180 : -180
    setRotLg(r => r + delta)
    setRotMd(r => r + delta)
  }

  /* macOS: trigger installer + uninstaller downloads sequentially */
  const onMacDownload = (e: RMouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const urls = [
      'https://github.com/Upload18cute/FRAGNIMA_Homepage/releases/latest/download/FRAGNIMA-macOS.pkg',
      'https://github.com/Upload18cute/FRAGNIMA_Homepage/releases/latest/download/FRAGNIMA-macOS-Uninstaller.pkg',
    ]
    urls.forEach((url, i) => {
      setTimeout(() => {
        const a = document.createElement('a')
        a.href = url
        a.download = ''
        a.style.display = 'none'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }, i * 200)
    })
  }

  useEffect(() => {
    const update = () => {
      const hero = heroRef.current
      const logo = logoRef.current
      if (!hero || !logo) return
      const heroRect = hero.getBoundingClientRect()
      const logoRect = logo.getBoundingClientRect()
      const pct = (logoRect.top - heroRect.top + logoRect.height / 2) / heroRect.height * 100
      hero.style.setProperty('--wave-top', `${pct.toFixed(2)}%`)
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <section ref={heroRef} className={styles.hero}>

      {/* background layer — receives the bokeh blur, isolated from UI */}
      <div className={styles.bgLayer} style={{ backgroundImage: `url(${bgUrl})` }}>
        <div className={styles.overlay} />
        <div className={styles.diagLines} />

        {/* sine waves */}
        <div className={styles.wavesBg} aria-hidden="true">
          {/* Wave 1 — period 1440px (1440÷1440=1) */}
          <svg className={styles.wave1} viewBox="0 0 2880 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0 50 C 360 1 360 1 720 50 C 1080 99 1080 99 1440 50 C 1800 1 1800 1 2160 50 C 2520 99 2520 99 2880 50" fill="none" stroke="rgba(180,150,255,0.72)" strokeWidth="1.4" />
          </svg>
          {/* Wave 2 — period 720px (1440÷720=2) */}
          <svg className={styles.wave2} viewBox="0 0 2880 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0 50 C 180 1 180 1 360 50 C 540 99 540 99 720 50 C 900 1 900 1 1080 50 C 1260 99 1260 99 1440 50 C 1620 1 1620 1 1800 50 C 1980 99 1980 99 2160 50 C 2340 1 2340 1 2520 50 C 2700 99 2700 99 2880 50" fill="none" stroke="rgba(220,190,255,0.55)" strokeWidth="1.1" />
          </svg>
          {/* Wave 3 — period 480px (1440÷480=3) */}
          <svg className={styles.wave3} viewBox="0 0 2880 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0 50 C 120 1 120 1 240 50 C 360 99 360 99 480 50 C 600 1 600 1 720 50 C 840 99 840 99 960 50 C 1080 1 1080 1 1200 50 C 1320 99 1320 99 1440 50 C 1560 1 1560 1 1680 50 C 1800 99 1800 99 1920 50 C 2040 1 2040 1 2160 50 C 2280 99 2280 99 2400 50 C 2520 1 2520 1 2640 50 C 2760 99 2760 99 2880 50" fill="none" stroke="rgba(200,165,255,0.42)" strokeWidth="0.9" />
          </svg>
        </div>
      </div>

      {/* HUD corners */}
      <span className={`${styles.corner} ${styles.tl}`} />
      <span className={`${styles.corner} ${styles.tr}`} />
      <span className={`${styles.corner} ${styles.bl}`} />
      <span className={`${styles.corner} ${styles.br}`} />

      <div className={styles.inner}>

        {/* ── left: copy ── */}
        <div className={styles.copy}>

          {/* ────◆ badge ◆──── */}
          <div className={styles.badge}>
            <div className={styles.badgeLine} />
            <div className={styles.badgeDiamond} />
            <span className={styles.badgeText}>VST3 &nbsp;·&nbsp; WIN &nbsp;·&nbsp; MAC</span>
            <div className={styles.badgeDiamond} />
            <div className={styles.badgeLine} />
          </div>

          <img ref={logoRef} src={logoUrl} alt="FRAGNIMA" className={styles.logo} />

          <p className={styles.sub}>360° Spatial Audio Effect</p>

          <p className={styles.desc}>
            Immerse your listeners in a full spherical soundscape.
            FRAGNIMA reproduces 360-degree audio positioning with
            precision — bringing depth, width, and height to every mix.
          </p>

          {/* ◇── Download CTAs ──◇ */}
          <div className={styles.dlGroup}>
            <div className={styles.dlCards}>
              <a href="https://github.com/Upload18cute/FRAGNIMA_Homepage/releases/latest/download/FRAGNIMA-Windows.exe" className={styles.dlCard} download>
                <svg viewBox="0 0 24 24" className={styles.dlOsIcon} fill="currentColor">
                  <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                </svg>
                <span className={styles.dlOsName}>Windows</span>
                <span className={styles.dlMeta}>VST3 · .exe</span>
              </a>
              <a href="https://github.com/Upload18cute/FRAGNIMA_Homepage/releases/latest/download/FRAGNIMA-macOS.pkg" className={styles.dlCard} onClick={onMacDownload}>
                <svg viewBox="0 0 24 24" className={styles.dlOsIcon} fill="currentColor">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                </svg>
                <span className={styles.dlOsName}>macOS</span>
                <span className={styles.dlMeta}>VST3 · .pkg</span>
              </a>
            </div>
            <div className={styles.dlExtras}>
              <a href="#" target="_blank" rel="noopener noreferrer" className={styles.dlDocsBtn}>
                <svg viewBox="0 0 24 24" className={styles.dlBtnIcon} fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                View Docs
              </a>
              <a href="https://buymeacoffee.com" target="_blank" rel="noopener noreferrer" className={styles.dlCoffeeBtn}>
                ☕ Buy me a coffee
              </a>
            </div>
          </div>
        </div>

        {/* ── right: dial visual ── */}
        <div className={styles.dialWrap}>
          <div
            ref={dialRef}
            className={styles.dialCircle}
            onPointerDown={onDialDown}
            onPointerMove={onDialMove}
            onPointerUp={onDialUp}
            onPointerCancel={onDialUp}
          >
            <div
              className={styles.dialHandle}
              style={{ left: `calc(50% + ${pos.x}px)`, top: `calc(50% + ${pos.y}px)` }}
            >
              <div
                className={`${styles.diamond} ${styles.diamondLg}`}
                style={{ '--rot': `${rotLg}deg` } as CSSProperties}
              />
              <div
                className={`${styles.diamond} ${styles.diamondMd}`}
                style={{ '--rot': `${rotMd}deg` } as CSSProperties}
              />
              <div className={`${styles.diamond} ${styles.diamondSm}`} />
            </div>
          </div>
        </div>
      </div>

      {/* signature */}
      <a
        href="https://www.youtube.com/@Upload18_music"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.signatureLink}
        aria-label="YouTube channel"
      >
        <img src={signUrl} alt="" aria-hidden="true" className={styles.signature} />
      </a>
    </section>
  )
}

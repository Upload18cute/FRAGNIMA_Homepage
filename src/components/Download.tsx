import styles from './Download.module.css'

const GITHUB_RELEASES = 'https://github.com/Upload18cute/FRAGNIMA_Homepage/releases/latest'
const DOCS_PDF = '#'
const COFFEE_URL = 'https://buymeacoffee.com'

export default function Download() {
  return (
    <section id="download" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <div className={styles.eyebrowDiam} />
            <span className={styles.eyebrowText}>Free to use</span>
            <div className={styles.eyebrowDiam} />
            <div className={styles.eyebrowLine} />
          </div>
          <h2 className={styles.title}>Download FRAGNIMA</h2>
          <p className={styles.subtitle}>VST3 · v1.0.0</p>
        </div>

        <div className={styles.cards}>
          <a href={`${GITHUB_RELEASES}/download/FRAGNIMA-Windows.zip`} className={styles.card} download>
            <div className={styles.platform}>
              <svg viewBox="0 0 24 24" className={styles.osIcon} fill="currentColor">
                <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
              </svg>
              <span className={styles.osName}>Windows</span>
            </div>
            <div className={styles.meta}>
              <span className={styles.metaLabel}>VST3 · .zip</span>
              <div className={styles.dlArrow}>↓</div>
            </div>
          </a>

          <a href={`${GITHUB_RELEASES}/download/FRAGNIMA-macOS.zip`} className={styles.card} download>
            <div className={styles.platform}>
              <svg viewBox="0 0 24 24" className={styles.osIcon} fill="currentColor">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
              </svg>
              <span className={styles.osName}>macOS</span>
            </div>
            <div className={styles.meta}>
              <span className={styles.metaLabel}>VST3 · .zip</span>
              <div className={styles.dlArrow}>↓</div>
            </div>
          </a>
        </div>

        <div className={styles.extras}>
          <a href={DOCS_PDF} target="_blank" rel="noopener noreferrer" className={styles.docsBtn}>
            <svg viewBox="0 0 24 24" className={styles.btnIcon} fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            View Documentation
          </a>
          <a href={COFFEE_URL} target="_blank" rel="noopener noreferrer" className={styles.coffeeBtn}>
            <span>☕</span> Buy me a coffee
          </a>
        </div>

        <p className={styles.note}>
          Hosted on GitHub Releases ·{' '}
          <a href={GITHUB_RELEASES} target="_blank" rel="noopener noreferrer" className={styles.link}>view all releases</a>
        </p>
      </div>
    </section>
  )
}

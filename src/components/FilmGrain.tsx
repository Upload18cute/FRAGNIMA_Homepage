import styles from './FilmGrain.module.css'

/**
 * Full-screen film-grain overlay.
 * Intensity is driven by the CSS variable `--grain` on :root (0 → 1).
 */
export default function FilmGrain() {
  return (
    <svg
      className={styles.grain}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <filter id="grainFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.35"
          numOctaves="3"
          seed="1"
        >
          <animate
            attributeName="seed"
            values="1;3;5;7;9;11;13;15;17;19"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </feTurbulence>
        <feColorMatrix
          values="0 0 0 0 1
                  0 0 0 0 1
                  0 0 0 0 1
                  0 0 0 0.75 0"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#grainFilter)" />
    </svg>
  )
}

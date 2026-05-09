import Hero from './components/Hero'
import FilmGrain from './components/FilmGrain'
import styles from './App.module.css'

export default function App() {
  return (
    <div className={styles.app}>
      <div className={styles.bloom} aria-hidden="true" />
      <Hero />
      <FilmGrain />
    </div>
  )
}

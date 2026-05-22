import styles from './WhisperCard.module.css'

export default function WhisperCard({ whisper, highlighted = false }) {
  return (
    <div className={`${styles.card} ${highlighted ? styles.highlighted : ''}`}>
      <p className={styles.text}>"{whisper.text}"</p>
      <p className={styles.attribution}>
        — Woman, {whisper.age} · {whisper.location}
      </p>
    </div>
  )
}

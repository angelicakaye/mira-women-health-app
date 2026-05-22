import styles from './ProgressDots.module.css'

export default function ProgressDots({ total, current }) {
  return (
    <div className={styles.dots} aria-label={`Step ${current} of ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`${styles.dot} ${i + 1 === current ? styles.active : ''} ${i + 1 < current ? styles.done : ''}`}
        />
      ))}
    </div>
  )
}

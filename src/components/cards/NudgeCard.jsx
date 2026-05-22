import styles from './NudgeCard.module.css'

export default function NudgeCard({ onOpen, onDismiss }) {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <p className={styles.text}>There's something worth knowing.</p>
        <button className={styles.openButton} onClick={onOpen}>
          Tell me more
        </button>
      </div>
      <button className={styles.dismissButton} onClick={onDismiss} aria-label="Dismiss">
        x
      </button>
    </div>
  )
}

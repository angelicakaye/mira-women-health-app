import styles from './Mira.module.css'

export default function Mira({ state = 'default', size = 160 }) {
  return (
    <div
      className={`${styles.wrap} ${styles[state]}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div className={styles.ring} style={{ width: size, height: size }} />
      <div className={styles.mid} style={{ width: size * 0.63, height: size * 0.63 }} />
      <div className={styles.core} style={{ width: size * 0.36, height: size * 0.36 }} />
    </div>
  )
}

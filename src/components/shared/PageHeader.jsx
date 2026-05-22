import { useNavigate } from 'react-router-dom'
import styles from './PageHeader.module.css'

export default function PageHeader({ title, onBack, showBack = true }) {
  const navigate = useNavigate()

  function handleBack() {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }

  return (
    <header className={styles.header}>
      {showBack && (
        <button className={styles.backBtn} onClick={handleBack} aria-label="Go back">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="#993556" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
      {title && <span className={styles.title}>{title}</span>}
      <div className={styles.spacer} />
    </header>
  )
}

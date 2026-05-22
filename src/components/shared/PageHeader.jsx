import { useNavigate } from 'react-router-dom'
import styles from './PageHeader.module.css'

export default function PageHeader({ title, onBack, showBack = true, rightAction = null }) {
  const navigate = useNavigate()

  function handleBack() {
    if (onBack) onBack()
    else navigate(-1)
  }

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {showBack && (
          <button className={styles.backBtn} onClick={handleBack} aria-label="Go back">
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
              <path d="M9 1L1 9L9 17" stroke="#993556" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>

      <span className={styles.title}>{title || ''}</span>

      <div className={styles.right}>
        {rightAction}
      </div>
    </header>
  )
}

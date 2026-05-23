import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Flower from '../flower/Flower'
import styles from './MiraBseReminder.module.css'

export default function MiraBseReminder({ onClose }) {
  const { currentWeekFlower, flowerType, markBseReminderDay10Seen } = useApp()
  const navigate = useNavigate()

  function handleYes() {
    markBseReminderDay10Seen()
    onClose?.()
    navigate('/bse/intro')
  }

  function handleLater() {
    markBseReminderDay10Seen()
    onClose?.()
  }

  return (
    <div className={styles.overlay}>
      <button className={styles.closeButton} onClick={handleLater} aria-label="Close">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </button>

      <div className={styles.stage}>

        <div className={styles.flowerWrap}>
          <Flower type={currentWeekFlower || flowerType || 'rose'} waterCount={5} size={118} />
          <span className={styles.sparkleOne} />
          <span className={styles.sparkleTwo} />
        </div>

        <div className={styles.content}>
          <div className={styles.bubble}>
            <h1>It's been a few days. Are you ready to check in with your body?</h1>
          </div>
          <div className={styles.copy}>
            <p>
              A gentle breast self-check takes about five minutes. There's no right way to feel —
              just noticing is enough.
            </p>
            <div className={styles.whisper}>
              <p>"I do mine after my morning shower. Five minutes, and then it's done."</p>
              <span>Mei, 34</span>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.primaryButton} onClick={handleYes}>
            Show me how
          </button>
          <button className={styles.textButton} onClick={handleLater}>
            Not today
          </button>
        </div>

      </div>
    </div>
  )
}

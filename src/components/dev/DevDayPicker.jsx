import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import styles from './DevDayPicker.module.css'

const PRESETS = [1, 7, 10, 14, 21]

export default function DevDayPicker() {
  const { dayCount, setDevDay } = useApp()
  const navigate = useNavigate()
  const location = useLocation()

  function handleDay(day) {
    setDevDay(day)
    // Always navigate to home so check-in modals can fire
    if (location.pathname !== '/home') {
      navigate('/home')
    }
  }

  return (
    <div className={styles.panel}>
      <span className={styles.label}>Demo day</span>
      <div className={styles.buttons}>
        {PRESETS.map(day => (
          <button
            key={day}
            className={`${styles.btn} ${dayCount === day ? styles.active : ''}`}
            onClick={() => handleDay(day)}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  )
}

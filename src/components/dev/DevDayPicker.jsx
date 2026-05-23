import { useApp } from '../../context/AppContext'
import styles from './DevDayPicker.module.css'

const PRESETS = [
  { day: 1,  label: 'D1'  },
  { day: 7,  label: 'D7'  },
  { day: 14, label: 'D14' },
  { day: 21, label: 'D21' },
]

export default function DevDayPicker() {
  const { dayCount, setDevDay } = useApp()

  return (
    <div className={styles.strip}>
      <span className={styles.label}>Day {dayCount}</span>
      {PRESETS.map(({ day, label }) => (
        <button
          key={day}
          className={`${styles.btn} ${dayCount === day ? styles.active : ''}`}
          onClick={() => setDevDay(day)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

import Flower from './Flower'
import styles from './FlowerPicker.module.css'

const OPTIONS = [
  { type: 'rose',  label: 'Rose' },
  { type: 'peony', label: 'Peony' },
  { type: 'lily',  label: 'Pink lily' },
]

export default function FlowerPicker({ selected, onChange }) {
  return (
    <div className={styles.wrap}>
      {OPTIONS.map(({ type, label }) => (
        <button
          key={type}
          className={`${styles.option} ${selected === type ? styles.optionActive : ''}`}
          onClick={() => onChange(type)}
          aria-pressed={selected === type}
        >
          <div className={styles.flowerWrap}>
            <Flower type={type} waterCount={5} size={64} />
          </div>
          <span className={styles.label}>{label}</span>
          {selected === type && (
            <div className={styles.check}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  )
}

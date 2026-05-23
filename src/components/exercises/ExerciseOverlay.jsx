import { useState } from 'react'
import Mira from '../mira/Mira'
import styles from './ExerciseOverlay.module.css'

export default function ExerciseOverlay({ exercise, onComplete, onDismiss }) {
  const [step, setStep] = useState(0)
  const total = exercise.steps.length
  const isLast = step === total - 1

  function handleNext() {
    if (isLast) {
      onComplete()
    } else {
      setStep(s => s + 1)
    }
  }

  return (
    <div className={styles.overlay}>
      <button className={styles.close} onClick={onDismiss} aria-label="Close">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Step dots */}
      <div className={styles.dots}>
        {exercise.steps.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i === step ? styles.dotActive : i < step ? styles.dotDone : ''}`}
          />
        ))}
      </div>

      {/* Lumi */}
      <div className={styles.lumiWrap}>
        <Mira state="glowing" size={180} />
      </div>

      {/* Step text */}
      <p className={styles.stepText}>{exercise.steps[step]}</p>

      {/* Action */}
      <button className={styles.btn} onClick={handleNext}>
        {isLast ? "I'm done" : 'Next'}
      </button>
    </div>
  )
}

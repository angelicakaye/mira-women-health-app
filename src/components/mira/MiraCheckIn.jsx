import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import Mira from './Mira'
import Flower from '../flower/Flower'
import styles from './MiraCheckIn.module.css'

const WEEK1_FOCUS = [
  { id: 'support', label: 'A little support',  emoji: '🌿' },
  { id: 'body',    label: 'Know my body',       emoji: '🫀' },
  { id: 'relax',   label: 'Just breathe',       emoji: '🌙' },
  { id: 'notsure', label: 'Not sure yet',       emoji: '☁️' },
]

const WEEK2_FOCUS = [
  { id: 'support',   label: 'A little support',  emoji: '🌿' },
  { id: 'body',      label: 'Know my body',       emoji: '🫀' },
  { id: 'relax',     label: 'Just breathe',       emoji: '🌙' },
  { id: 'screening', label: 'Breast screening',   emoji: '🔍' },
  { id: 'notsure',   label: 'Not sure yet',       emoji: '☁️' },
]

const MOOD_CHIPS = [
  { value: 'heavy',  label: 'Heavy',  emoji: '🌧️' },
  { value: 'tired',  label: 'Tired',  emoji: '😴' },
  { value: 'okay',   label: 'Okay',   emoji: '🌿' },
  { value: 'good',   label: 'Good',   emoji: '🌸' },
  { value: 'bright', label: 'Bright', emoji: '✨' },
]

const FLOWER_OPTIONS = [
  { type: 'rose',  label: 'Rose' },
  { type: 'peony', label: 'Peony' },
  { type: 'lily',  label: 'Pink lily' },
]

export default function MiraCheckIn({ onComplete, onDismiss, initialMood = null }) {
  const { today, currentWeekNum, logMood, setUserGoal, setWeekFlower, completeWeekCheckIn } = useApp()
  const isWeek1 = currentWeekNum === 1
  const initStep = initialMood ? (isWeek1 ? 'focus' : 'flower') : 'mood'
  const [step, setStep] = useState(initStep)
  const [mood, setMood] = useState(initialMood)
  const [moodText, setMoodText] = useState('')
  const [selectedFlower, setSelectedFlower] = useState(null)
  const [miraState, setMiraState] = useState('default')

  function handleMood(value) {
    setMood(value)
    setMiraState('glowing')
    setTimeout(() => {
      setMiraState('default')
      setStep(isWeek1 ? 'focus' : 'flower')
    }, 700)
  }

  function handleMoodText() {
    if (!moodText.trim()) return
    setMood(moodText.trim())
    setMiraState('glowing')
    setTimeout(() => {
      setMiraState('default')
      setStep(isWeek1 ? 'focus' : 'flower')
    }, 700)
  }

  function handleFlower(type) {
    setSelectedFlower(type)
    setTimeout(() => setStep('focus'), 350)
  }

  function handleFocus(id) {
    const flower = isWeek1 ? 'rose' : selectedFlower
    logMood(today, mood)
    setUserGoal(id)
    setWeekFlower(isWeek1 ? 1 : currentWeekNum, flower)
    completeWeekCheckIn(currentWeekNum, { mood, focus: id, flower })
    setMiraState('glowing')
    setTimeout(() => onComplete?.(), 600)
  }

  const question =
    step === 'mood'
      ? (currentWeekNum === 1 ? 'How are you feeling today?' : 'How have you been?')
      : step === 'flower'
      ? 'Pick a flower to grow with you this week.'
      : 'What feels right for this week?'

  return (
    <div className={styles.overlay}>
      {step === 'mood' && (
        <button className={styles.dismissBtn} onClick={onDismiss} aria-label="Dismiss">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      )}

      <div className={styles.miraWrap}>
        <Mira state={miraState} size={110} />
      </div>

      <div className={styles.bubble}>
        <p className={styles.bubbleText}>{question}</p>
      </div>

      <div className={styles.content}>
        {step === 'mood' && (
          <>
            <div className={styles.chips}>
              {MOOD_CHIPS.map(c => (
                <button key={c.value} className={styles.chip} onClick={() => handleMood(c.value)}>
                  <span className={styles.chipEmoji}>{c.emoji}</span>
                  <span>{c.label}</span>
                </button>
              ))}
            </div>

            <div className={styles.freeTextWrap}>
              <input
                className={styles.freeText}
                value={moodText}
                onChange={e => setMoodText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleMoodText()}
                placeholder="or in your own words…"
                maxLength={80}
              />
              {moodText.trim() && (
                <button className={styles.freeTextSend} onClick={handleMoodText} aria-label="Submit">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 12V2M3 6l4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
            </div>
          </>
        )}

        {step === 'flower' && (
          <div className={styles.flowerRow}>
            {FLOWER_OPTIONS.map(({ type, label }) => (
              <button
                key={type}
                className={`${styles.flowerOpt} ${selectedFlower === type ? styles.flowerOptActive : ''}`}
                onClick={() => handleFlower(type)}
              >
                <Flower type={type} waterCount={5} size={60} />
                <span className={styles.flowerLabel}>{label}</span>
              </button>
            ))}
          </div>
        )}

        {step === 'focus' && (
          <div className={styles.focusOpts}>
            {(isWeek1 ? WEEK1_FOCUS : WEEK2_FOCUS).map(opt => (
              <button key={opt.id} className={styles.focusOpt} onClick={() => handleFocus(opt.id)}>
                <span className={styles.focusEmoji}>{opt.emoji}</span>
                <span className={styles.focusLabel}>{opt.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {step === 'mood' && (
        <button className={styles.laterBtn} onClick={onDismiss}>maybe later</button>
      )}
    </div>
  )
}

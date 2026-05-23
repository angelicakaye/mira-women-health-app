import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Flower from '../flower/Flower'
import { MIRA_LETTER_14 } from '../../data/miraCopy'
import styles from './MiraDay14CheckIn.module.css'

const MOODS = [
  { id: 'heavy', label: 'Heavy', icon: '🌧' },
  { id: 'tired', label: 'Tired', icon: '😴' },
  { id: 'okay',  label: 'Okay',  icon: '🌿' },
  { id: 'good',  label: 'Good',  icon: '🌸' },
]

export default function MiraDay14CheckIn({ onClose }) {
  const {
    today,
    logMood,
    markLetterDay14Seen,
    addPassedWhisper,
    triggerWhisperPulse,
  } = useApp()
  const [page, setPage] = useState('letter')
  const [mood, setMood] = useState('')
  const [whisperText, setWhisperText] = useState('')
  const textareaRef = useRef(null)
  const navigate = useNavigate()

  function closeAndSave() {
    markLetterDay14Seen()
    onClose?.()
  }

  function chooseMood(value) {
    setMood(value)
    logMood(today, value)
    setTimeout(() => setPage('screening'), 220)
  }

  function handleBookScreening() {
    markLetterDay14Seen()
    onClose?.()
    navigate('/polyclinic')
  }

  function handleWhisperResize(e) {
    const el = e.target
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 120) + 'px'
  }

  function handlePassForward() {
    if (whisperText.trim()) {
      addPassedWhisper(whisperText.trim())
      triggerWhisperPulse()
    }
    markLetterDay14Seen()
    onClose?.()
    navigate('/whispers')
  }

  function handleGoToWhispers() {
    markLetterDay14Seen()
    onClose?.()
    navigate('/whispers')
  }

  return (
    <div className={styles.overlay}>
      <button className={styles.closeButton} onClick={closeAndSave} aria-label="Close">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </button>

      <div className={styles.stage}>

        {/* ── Flower — never scrolls ── */}
        <div className={styles.flowerWrap}>
          <Flower type="peony" waterCount={5} size={118} />
          <span className={styles.sparkleOne} />
          <span className={styles.sparkleTwo} />
          <span className={styles.sparkleThree} />
        </div>

        {/* ── Scrollable content ── */}
        <div className={styles.content}>

          {page === 'letter' && (
            <>
              <div className={styles.bubble}><h1>{MIRA_LETTER_14.title}</h1></div>
              <div className={styles.copy}>
                {MIRA_LETTER_14.paragraphs.map((para, i) => <p key={i}>{para}</p>)}
                <p className={styles.sign}>{MIRA_LETTER_14.sign}</p>
              </div>
            </>
          )}

          {page === 'mood' && (
            <>
              <div className={styles.bubble}><h1>How are you feeling today?</h1></div>
              <div className={styles.moodGrid}>
                {MOODS.map(item => (
                  <button
                    key={item.id}
                    className={`${styles.moodTile} ${mood === item.id ? styles.moodTileActive : ''}`}
                    onClick={() => chooseMood(item.id)}
                  >
                    <span aria-hidden="true">{item.icon}</span>
                    <strong>{item.label}</strong>
                  </button>
                ))}
              </div>
            </>
          )}

          {page === 'screening' && (
            <>
              <div className={styles.bubble}>
                <h1>Have you had a chance to think about a breast check?</h1>
              </div>
              <div className={styles.copy}>
                <p>
                  Knowing your body is one of the most powerful things you can do. At your age, a polyclinic visit is the right first step — just a conversation with a doctor, on your terms.
                </p>
                <div className={styles.whisper}>
                  <p>"I was nervous to go. But the doctor was so kind, and I felt heard for the first time."</p>
                  <span>Jess, 26</span>
                </div>
              </div>
            </>
          )}

          {page === 'whisper' && (
            <>
              <div className={styles.bubble}>
                <h1>Before you go — what would you pass on?</h1>
              </div>
              <p className={styles.counter}>
                Women like you have been leaving notes for each other here. A small thing you have learned. A moment that helped you. Anything.
              </p>
              <textarea
                ref={textareaRef}
                className={styles.textarea}
                placeholder="Something small that helped…"
                value={whisperText}
                onChange={e => { setWhisperText(e.target.value); handleWhisperResize(e) }}
                rows={3}
              />
            </>
          )}

        </div>

        {/* ── Sticky action bar ── */}
        <div className={styles.actions}>
          {page === 'letter' && (
            <button className={styles.primaryButton} onClick={() => setPage('mood')}>
              Continue
            </button>
          )}
          {page === 'screening' && (
            <>
              <button className={styles.primaryButton} onClick={handleBookScreening}>
                Book a polyclinic visit
              </button>
              <button className={styles.secondaryButton} onClick={() => setPage('whisper')}>
                I'll think about it
              </button>
            </>
          )}
          {page === 'whisper' && (
            <>
              <button
                className={styles.primaryButton}
                onClick={handlePassForward}
                disabled={!whisperText.trim()}
              >
                Pass it forward
              </button>
              <button className={styles.textButton} onClick={handleGoToWhispers}>
                Go to Whispers
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  )
}

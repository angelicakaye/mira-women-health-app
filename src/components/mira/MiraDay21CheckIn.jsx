import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Flower from '../flower/Flower'
import { MIRA_LETTER_21 } from '../../data/miraCopy'
import styles from './MiraDay21CheckIn.module.css'

const MOODS = [
  { id: 'heavy', label: 'Heavy', icon: '🌧' },
  { id: 'tired', label: 'Tired', icon: '😴' },
  { id: 'okay',  label: 'Okay',  icon: '🌿' },
  { id: 'good',  label: 'Good',  icon: '🌸' },
]

export default function MiraDay21CheckIn({ onClose }) {
  const {
    today,
    logMood,
    markLetterDay21Seen,
  } = useApp()
  const [page, setPage] = useState('letter')
  const [mood, setMood] = useState('')
  const navigate = useNavigate()

  function closeAndSave() {
    markLetterDay21Seen()
    onClose?.()
  }

  function chooseMood(value) {
    setMood(value)
    logMood(today, value)
    setTimeout(() => setPage('screening'), 220)
  }

  function handleGoScreening() {
    markLetterDay21Seen()
    onClose?.()
    navigate('/screening')
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
          <Flower type="orchid" waterCount={5} size={118} />
          <span className={styles.sparkleOne} />
          <span className={styles.sparkleTwo} />
          <span className={styles.sparkleThree} />
        </div>

        {/* ── Scrollable content ── */}
        <div className={styles.content}>

          {page === 'letter' && (
            <>
              <div className={styles.bubble}><h1>{MIRA_LETTER_21.title}</h1></div>
              <div className={styles.copy}>
                {MIRA_LETTER_21.paragraphs.map((para, i) => <p key={i}>{para}</p>)}
                <p className={styles.sign}>{MIRA_LETTER_21.sign}</p>
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
                <h1>You mentioned you weren't ready for a breast check yet.</h1>
              </div>
              <div className={styles.copy}>
                <p>
                  That is completely okay. Three weeks of showing up for yourself means you are already building that relationship with your body.
                </p>
                <p>
                  When you feel ready, breast screening is one of the most powerful things you can do. The fear is almost always worse than the thing itself.
                </p>
                <div className={styles.whisper}>
                  <p>"I kept putting it off for a year. I finally went, and it was fifteen minutes. I cried with relief."</p>
                  <span>Nurul, 52</span>
                </div>
              </div>
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
              <button className={styles.primaryButton} onClick={handleGoScreening}>
                Look at breast screening
              </button>
              <button className={styles.textButton} onClick={closeAndSave}>
                Not just yet
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  )
}

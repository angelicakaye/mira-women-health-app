import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Flower from '../flower/Flower'
import { MIRA_LETTER } from '../../data/miraCopy'
import styles from './MiraWeeklyCheckIn.module.css'

const MOODS = [
  { id: 'heavy', label: 'Heavy', icon: '🌧' },
  { id: 'tired', label: 'Tired', icon: '😴' },
  { id: 'okay',  label: 'Okay',  icon: '🌿' },
  { id: 'good',  label: 'Good',  icon: '🌸' },
]

const REMINDERS = [
  { id: 'few-days',   label: 'Remind me in a few days' },
  { id: 'one-week',   label: 'Remind me in one week' },
  { id: 'next-month', label: 'Remind me next month' },
]

export default function MiraWeeklyCheckIn({ onClose }) {
  const {
    today,
    logMood,
    markLetterSeen,
    setBseReminderChoice,
    cycleDay,
    inBseWindow,
  } = useApp()
  const [page, setPage] = useState('letter')
  const [mood, setMood] = useState('')
  const navigate = useNavigate()

  function closeAndSave() {
    markLetterSeen()
    onClose?.()
  }

  function chooseMood(value) {
    setMood(value)
    logMood(today, value)
    setTimeout(() => setPage('bse'), 220)
  }

  function startBse() {
    markLetterSeen()
    onClose?.()
    navigate('/bse/intro')
  }

  function chooseReminder(choice) {
    setBseReminderChoice(choice)
    closeAndSave()
  }

  const bseBubble = inBseWindow
    ? `You're on day ${cycleDay} of your cycle — one of the best windows to check in with your body.`
    : 'This is a good time to think about checking in with your body.'

  const bseBody = inBseWindow
    ? 'Around this time, breasts are often at their softest and least tender. A gentle five-minute check is all it takes.'
    : 'Around days 7 to 10 of your cycle, breasts are often softest — a gentler window to notice if anything feels different.'

  const bseWhisperText = inBseWindow
    ? '"Day 7 became my reminder. I do it in the shower — five minutes, quiet, just me. I feel so much better for knowing."'
    : '"I do mine after my morning shower. Quiet, private, and done in five minutes. It felt like I was really looking after myself."'

  const bseWhisperAttrib = inBseWindow ? 'Lin, 41' : 'Mei, 38'

  return (
    <div className={styles.overlay}>
      <button className={styles.closeButton} onClick={closeAndSave} aria-label="Close">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </button>

      <div className={styles.stage}>

        {/* ── Flower header — never scrolls ── */}
        <div className={styles.flowerWrap}>
          <Flower type="lily" waterCount={5} size={118} />
          <span className={styles.sparkleOne} />
          <span className={styles.sparkleTwo} />
        </div>

        {/* ── Scrollable content ── */}
        <div className={styles.content}>

          {page === 'letter' && (
            <>
              <div className={styles.bubble}><h1>{MIRA_LETTER.title}</h1></div>
              <div className={styles.copy}>
                {MIRA_LETTER.paragraphs.map((para, i) => <p key={i}>{para}</p>)}
                <p className={styles.sign}>{MIRA_LETTER.sign}</p>
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

          {page === 'bse' && (
            <>
              <div className={styles.bubble}><h1>{bseBubble}</h1></div>
              <div className={styles.copy}>
                <p>{bseBody}</p>
                <div className={styles.whisper}>
                  <p>{bseWhisperText}</p>
                  <span>{bseWhisperAttrib}</span>
                </div>
              </div>
            </>
          )}

          {page === 'reminder' && (
            <>
              <div className={styles.bubble}><h1>That's completely okay. Should I remind you?</h1></div>
              <div className={styles.copy}>
                <p>There's no rush. You can come back to this whenever it feels right.</p>
              </div>
              <div className={styles.reminderList}>
                {REMINDERS.map(item => (
                  <button
                    key={item.id}
                    className={styles.reminderButton}
                    onClick={() => chooseReminder(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </>
          )}

        </div>

        {/* ── Sticky action bar — outside scroll ── */}
        <div className={styles.actions}>
          {page === 'letter' && (
            <button className={styles.primaryButton} onClick={() => setPage('mood')}>
              Continue
            </button>
          )}
          {page === 'bse' && (
            <>
              <button className={styles.primaryButton} onClick={startBse}>
                Show me how
              </button>
              <button className={styles.secondaryButton} onClick={() => setPage('reminder')}>
                I'm not ready yet
              </button>
            </>
          )}
          {page === 'reminder' && (
            <button className={styles.textButton} onClick={closeAndSave}>
              No reminder for now
            </button>
          )}
        </div>

      </div>
    </div>
  )
}

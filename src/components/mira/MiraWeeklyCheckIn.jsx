import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Flower from '../flower/Flower'
import { MIRA_LETTER } from '../../data/miraCopy'
import styles from './MiraWeeklyCheckIn.module.css'

const MOODS = [
  { id: 'heavy', label: 'Heavy', icon: 'Rain' },
  { id: 'tired', label: 'Tired', icon: 'Rest' },
  { id: 'okay', label: 'Okay', icon: 'Leaf' },
  { id: 'good', label: 'Good', icon: 'Bloom' },
]

const REMINDERS = [
  { id: 'few-days', label: 'In a few days' },
  { id: 'one-week', label: 'In one week' },
  { id: 'next-month', label: 'Next month' },
]

export default function MiraWeeklyCheckIn({ onClose }) {
  const {
    currentWeekFlower,
    flowerType,
    today,
    logMood,
    markLetterSeen,
    setBseReminderChoice,
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

  return (
    <div className={styles.overlay}>
      <button className={styles.closeButton} onClick={closeAndSave} aria-label="Close">
        x
      </button>

      <div className={styles.stage}>
        <div className={styles.flowerWrap}>
          <Flower type={currentWeekFlower || flowerType || 'rose'} waterCount={5} size={118} />
          <span className={styles.sparkleOne} />
          <span className={styles.sparkleTwo} />
        </div>

        {page === 'letter' && (
          <section className={styles.page}>
            <div className={styles.bubble}>
              <h1>{MIRA_LETTER.title}</h1>
            </div>
            <div className={styles.copy}>
              {MIRA_LETTER.paragraphs.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
              <p className={styles.sign}>{MIRA_LETTER.sign}</p>
            </div>
            <div className={styles.actions}>
              <button className={styles.primaryButton} onClick={() => setPage('mood')}>
                Continue
              </button>
            </div>
          </section>
        )}

        {page === 'mood' && (
          <section className={styles.page}>
            <div className={styles.bubble}>
              <h1>How are you feeling today?</h1>
            </div>
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
          </section>
        )}

        {page === 'bse' && (
          <section className={styles.page}>
            <div className={styles.bubble}>
              <h1>This may be a good window to check in with your body.</h1>
            </div>
            <div className={styles.copy}>
              <p>
                Around days 7 to 10 of your cycle, breasts are often less tender. That can make a breast self-assessment feel easier.
              </p>
              <div className={styles.whisper}>
                <p>"I do mine after my shower. Quiet, private, and over in a few minutes."</p>
                <span>Woman, 42</span>
              </div>
            </div>
            <div className={styles.actions}>
              <button className={styles.primaryButton} onClick={startBse}>
                Show me how
              </button>
              <button className={styles.secondaryButton} onClick={() => setPage('reminder')}>
                I'm not ready yet
              </button>
            </div>
          </section>
        )}

        {page === 'reminder' && (
          <section className={styles.page}>
            <div className={styles.bubble}>
              <h1>That's okay. When should I remind you?</h1>
            </div>
            <div className={styles.reminderList}>
              {REMINDERS.map(item => (
                <button key={item.id} className={styles.reminderButton} onClick={() => chooseReminder(item.id)}>
                  {item.label}
                </button>
              ))}
            </div>
            <button className={styles.textButton} onClick={closeAndSave}>
              No reminder for now
            </button>
          </section>
        )}
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import Mira from './Mira'
import styles from './MiraCard.module.css'
import {
  MIRA_DAILY_AFFIRMATIONS,
  MIRA_CHECKINS,
  MIRA_MOOD_RESPONSES,
  MIRA_COMMUNITY_INTRO,
  MIRA_SCREENING_NUDGE,
} from '../../data/miraCopy'

function getPhase(dayCount) {
  if (dayCount >= 21) return 'community'
  if (dayCount >= 14) return 'community'
  if (dayCount >= 7)  return 'deeper'
  return 'early'
}

export default function MiraCard({ isGlowing, onGlowEnd, onScreeningReady }) {
  const { dayCount, today, moodLog, logMood, screeningNudgeResponse, respondToScreeningNudge } = useApp()
  const [miraState, setMiraState] = useState('default')

  const phase = getPhase(dayCount)
  const todayMood = moodLog?.[today]
  const affirmation = MIRA_DAILY_AFFIRMATIONS[(dayCount - 1) % MIRA_DAILY_AFFIRMATIONS.length]

  // Sync external glow signal
  useEffect(() => {
    if (isGlowing) {
      setMiraState('glowing')
      const t = setTimeout(() => {
        setMiraState('default')
        onGlowEnd?.()
      }, 2500)
      return () => clearTimeout(t)
    }
  }, [isGlowing, onGlowEnd])

  // Idle resting after 10s
  useEffect(() => {
    if (miraState !== 'default') return
    const t = setTimeout(() => setMiraState('resting'), 10000)
    return () => clearTimeout(t)
  }, [miraState])

  function handleMood(value) {
    logMood(today, value)
    setMiraState('glowing')
    setTimeout(() => setMiraState('default'), 2500)
  }

  // ── Day 21+: screening nudge (if not yet responded) ──
  if (dayCount >= 21 && !screeningNudgeResponse) {
    return (
      <div className={styles.wrap}>
        <Mira state={miraState} size={100} />
        <p className={styles.message}>{MIRA_SCREENING_NUDGE.prompt}</p>
        <div className={styles.chips}>
          <button className={`${styles.chip} ${styles.chipPrimary}`} onClick={() => {
            respondToScreeningNudge('ready')
            onScreeningReady?.()
          }}>
            I'm ready
          </button>
          <button className={styles.chip} onClick={() => respondToScreeningNudge('later')}>
            Not yet
          </button>
        </div>
      </div>
    )
  }

  // ── Day 21+: screening nudge accepted ──
  if (dayCount >= 21 && screeningNudgeResponse === 'ready') {
    return (
      <div className={styles.wrap}>
        <Mira state={miraState} size={100} />
        <p className={styles.message}>{MIRA_SCREENING_NUDGE.readyText}</p>
      </div>
    )
  }

  // ── Day 14+: community intro (only once, the first day it unlocks) ──
  if (dayCount === 14 && !todayMood) {
    return (
      <div className={styles.wrap}>
        <Mira state={miraState} size={100} />
        <p className={styles.message}>{MIRA_COMMUNITY_INTRO}</p>
        <div className={styles.chips}>
          <button className={styles.chip} onClick={() => handleMood('okay')}>
            I'm ready
          </button>
        </div>
      </div>
    )
  }

  // ── Check-in not yet done today ──
  if (!todayMood) {
    const checkins = MIRA_CHECKINS[phase] || MIRA_CHECKINS.early
    const checkin = checkins[(dayCount - 1) % checkins.length]
    return (
      <div className={styles.wrap}>
        <Mira state={miraState} size={100} />
        <p className={styles.message}>{checkin.prompt}</p>
        {checkin.chips && (
          <div className={styles.chips}>
            {checkin.chips.map(c => (
              <button key={c.value} className={styles.chip} onClick={() => handleMood(c.value)}>
                {c.label}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  // ── Check-in done: show response + affirmation ──
  const response = MIRA_MOOD_RESPONSES[todayMood] || affirmation
  return (
    <div className={styles.wrap}>
      <Mira state={miraState} size={100} />
      <p className={styles.message}>{response}</p>
    </div>
  )
}

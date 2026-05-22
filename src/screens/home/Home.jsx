import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Layout from '../../components/shared/Layout'
import Lumi from '../../components/lumi/Lumi'
import HabitRings from '../../components/habits/HabitRings'
import RingHistory from '../../components/habits/RingHistory'
import DailyCard from '../../components/cards/DailyCard'
import NudgeCard from '../../components/cards/NudgeCard'
import ExerciseOverlay from '../../components/exercises/ExerciseOverlay'
import styles from './Home.module.css'

function getGreeting(name) {
  const hour = new Date().getHours()
  if (hour < 12) return `Good morning, ${name}`
  if (hour < 17) return `Good afternoon, ${name}`
  return `Good evening, ${name}`
}

export default function Home() {
  const { userName, dayCount, showWhisper, showNudge, dismissNudge, today, respondToCard } = useApp()
  const [lumiState, setLumiState] = useState('default')
  const [activeExercise, setActiveExercise] = useState(null)
  const [showRingHistory, setShowRingHistory] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (activeExercise) return
    const timer = setTimeout(() => {
      if (lumiState === 'glowing') setLumiState('default')
    }, 2500)
    return () => clearTimeout(timer)
  }, [lumiState, activeExercise])

  useEffect(() => {
    if (activeExercise || lumiState !== 'default') return
    const idleTimer = setTimeout(() => setLumiState('resting'), 10000)
    return () => clearTimeout(idleTimer)
  }, [activeExercise, lumiState])

  function handleAllHabits() {
    setLumiState('glowing')
  }

  function handleGuideStart(exercise) {
    setActiveExercise(exercise)
    setLumiState('glowing')
  }

  function handleExerciseComplete() {
    respondToCard(today, 'done')
    setActiveExercise(null)
    setLumiState('glowing')
    setTimeout(() => setLumiState('default'), 2500)
  }

  function handleExerciseDismiss() {
    setActiveExercise(null)
    setLumiState('default')
  }

  return (
    <Layout>
      <div className={styles.page}>
        {/* Greeting */}
        <div className={styles.greetingRow}>
          <p className={styles.greeting}>{getGreeting(userName)}</p>
          <span className={styles.dayBadge}>Day {dayCount}</span>
        </div>

        {/* Lumi */}
        <div className={styles.lumiWrap}>
          <Lumi state={lumiState} size={140} />
          {lumiState === 'glowing' && (
            <p className={styles.lumiMessage}>
              {dayCount <= 7
                ? 'You showed up.'
                : dayCount <= 14
                ? 'Noticing is everything.'
                : "You're showing up for yourself."}
            </p>
          )}
        </div>

        {/* ── Section 1: Habit rings ── */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Today's rings</p>
            <button className={styles.sectionAction} onClick={() => setShowRingHistory(true)}>
              See all
            </button>
          </div>
          <HabitRings onComplete={handleAllHabits} />
        </div>

        {/* ── Section 2: Activity tiles ── */}
        <div className={styles.section}>
          <p className={styles.sectionLabel}>For you</p>
          <DailyCard
            onDone={() => setLumiState('glowing')}
            onGuideStart={handleGuideStart}
          />

          {/* Nudge banner */}
          {showNudge && (
            <NudgeCard onOpen={() => navigate('/nudge')} onDismiss={dismissNudge} />
          )}

          {/* Whisper link */}
          {showWhisper && (
            <div className={styles.whisperLink}>
              <button className={styles.whisperBtn} onClick={() => navigate('/whispers')}>
                <span className={styles.whisperDot} />
                Read what other women are saying
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Full-screen exercise overlay */}
      {activeExercise && (
        <ExerciseOverlay
          exercise={activeExercise}
          onComplete={handleExerciseComplete}
          onDismiss={handleExerciseDismiss}
        />
      )}

      {showRingHistory && <RingHistory onClose={() => setShowRingHistory(false)} />}
    </Layout>
  )
}

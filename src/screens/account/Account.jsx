import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Layout from '../../components/shared/Layout'
import Lumi from '../../components/lumi/Lumi'
import Button from '../../components/shared/Button'
import styles from './Account.module.css'

const GOAL_LABELS = {
  support: 'Daily support & gentle habits',
  screening: 'Ready to think about screening',
  body: 'Getting to know my body',
}

export default function Account() {
  const {
    userName, dayCount, userGoal, todayHabits,
    screeningCompleted, screeningType, whispersContributed,
    habitLogs, setUserGoal,
  } = useApp()
  const navigate = useNavigate()
  const [showReset, setShowReset] = useState(false)

  const totalDaysLogged = Object.values(habitLogs).filter(
    d => d.water || d.sleep || d.movement
  ).length

  function handleReset() {
    localStorage.clear()
    window.location.href = '/'
  }

  return (
    <Layout>
      <div className={styles.page}>
        {/* Header */}
        <div className={styles.header}>
          <Lumi state="default" size={72} />
          <div>
            <h1 className={styles.name}>{userName}</h1>
            <p className={styles.daySub}>Day {dayCount} with Mira</p>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.statsRow}>
          <div className={styles.stat}>
            <span className={styles.statNum}>{dayCount}</span>
            <span className={styles.statLabel}>Days</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>{totalDaysLogged}</span>
            <span className={styles.statLabel}>Check-ins</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>{whispersContributed.length}</span>
            <span className={styles.statLabel}>Whispers</span>
          </div>
        </div>

        {/* Today's habits */}
        <div className={styles.section}>
          <p className={styles.sectionLabel}>Today</p>
          <div className={styles.habitsRow}>
            {[
              { key: 'water', label: 'Water' },
              { key: 'sleep', label: 'Sleep' },
              { key: 'movement', label: 'Move' },
            ].map(({ key, label }) => (
              <div key={key} className={`${styles.habitChip} ${todayHabits[key] ? styles.habitDone : ''}`}>
                <span className={styles.habitDot} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Goal */}
        <div className={styles.section}>
          <p className={styles.sectionLabel}>Your focus</p>
          <div className={styles.goalCard}>
            <p className={styles.goalText}>{GOAL_LABELS[userGoal] || 'Not set'}</p>
            <div className={styles.goalActions}>
              {['support', 'screening', 'body'].map(g => (
                <button
                  key={g}
                  className={`${styles.goalChip} ${userGoal === g ? styles.goalChipActive : ''}`}
                  onClick={() => setUserGoal(g)}
                >
                  {g === 'support' ? 'Support' : g === 'screening' ? 'Screening' : 'Body'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Screening */}
        <div className={styles.section}>
          <p className={styles.sectionLabel}>Screening</p>
          <div className={styles.screeningCard}>
            {screeningCompleted ? (
              <>
                <p className={styles.screeningStatus}>
                  {screeningType === 'bse' ? 'Self-examination done' : 'Mammogram booked'}
                </p>
                <Button variant="ghost" size="sm" onClick={() => navigate('/screening')}>
                  Do it again
                </Button>
              </>
            ) : (
              <>
                <p className={styles.screeningStatus} style={{ color: '#C090A8' }}>
                  Not yet completed
                </p>
                <Button variant="primary" size="sm" onClick={() => navigate('/screening')}>
                  Explore options
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Reset */}
        <div className={styles.footer}>
          {!showReset ? (
            <button className={styles.resetLink} onClick={() => setShowReset(true)}>
              Clear all data
            </button>
          ) : (
            <div className={styles.resetConfirm}>
              <p className={styles.resetWarning}>This will erase everything. Are you sure?</p>
              <div className={styles.resetButtons}>
                <Button variant="ghost" size="sm" onClick={() => setShowReset(false)}>Cancel</Button>
                <Button variant="primary" size="sm" onClick={handleReset}>Yes, clear</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

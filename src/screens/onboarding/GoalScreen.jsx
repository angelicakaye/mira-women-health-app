import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Layout from '../../components/shared/Layout'
import Mira from '../../components/mira/Mira'
import styles from './GoalScreen.module.css'

const GOALS = [
  {
    id: 'support',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4C14 4 7 9.5 7 15a7 7 0 0 0 14 0c0-5.5-7-11-7-11Z" fill="#F4C0D1" opacity="0.8"/>
        <path d="M10 21c1.2.6 2.5 1 4 1s2.8-.4 4-1" stroke="#E8A0B8" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Daily support & gentle habits',
    desc: 'Build a quiet daily practice. Mira walks beside you — no pressure, no timelines.',
    sub: 'Water · Sleep · Movement · Whispers from other women',
  },
  {
    id: 'screening',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" fill="#F4C0D1" opacity="0.5"/>
        <circle cx="14" cy="14" r="5" fill="#F4C0D1" opacity="0.8"/>
        <path d="M14 8v2M14 18v2M8 14h2M18 14h2" stroke="#E8A0B8" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "I'm ready to think about screening",
    desc: "You know it's time. We'll help you find what feels right — at home or at a clinic.",
    sub: 'BSE self-examination · Mammogram booking · No rush',
  },
  {
    id: 'body',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 5a9 9 0 1 0 0 18A9 9 0 0 0 14 5Z" fill="#F4C0D1" opacity="0.4"/>
        <path d="M9 13c1.5-2 4.5-2 5 0s3.5 2 5 0" stroke="#E8A0B8" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="14" cy="10" r="1.5" fill="#E8A0B8" opacity="0.7"/>
      </svg>
    ),
    title: 'Getting to know my body',
    desc: "Start with awareness. A monthly self-check, a moment of noticing. Private and yours.",
    sub: 'Breast self-examination · Monthly reminders · Gentle guidance',
  },
]

export default function GoalScreen() {
  const { userName, setUserGoal } = useApp()
  const navigate = useNavigate()

  function handleSelect(goalId) {
    setUserGoal(goalId)
    navigate('/home', { replace: true })
  }

  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.header}>
          <Mira state="default" size={80} />
          <h1 className={styles.title}>What brings you here, {userName}?</h1>
          <p className={styles.subtitle}>
            Mira meets you where you are. Choose what feels right — you can always change your mind.
          </p>
        </div>

        <div className={styles.goals}>
          {GOALS.map(goal => (
            <button
              key={goal.id}
              className={styles.goalCard}
              onClick={() => handleSelect(goal.id)}
            >
              <div className={styles.goalIcon}>{goal.icon}</div>
              <div className={styles.goalBody}>
                <h2 className={styles.goalTitle}>{goal.title}</h2>
                <p className={styles.goalDesc}>{goal.desc}</p>
                <p className={styles.goalSub}>{goal.sub}</p>
              </div>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={styles.goalArrow}>
                <path d="M6.5 4l5 5-5 5" stroke="#993556" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ))}
        </div>

        <p className={styles.footnote}>
          Mira doesn't judge your choice. She just shows up.
        </p>
      </div>
    </Layout>
  )
}

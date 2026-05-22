import { useApp } from '../../context/AppContext'
import Button from '../shared/Button'
import styles from './DailyCard.module.css'
import whispers from '../../data/whispers.json'

const EARLY_CARDS = [
  'Notice your breath for one minute today.',
  'Drink one extra glass of water.',
  'Step outside, even just to your corridor.',
  'Rest without a screen for ten minutes.',
  'Notice one thing your body did well today.',
  'Move in any way that feels comfortable.',
]

export const EXERCISES = [
  {
    cta: "Let's breathe",
    steps: [
      'Find a comfortable position. Close your eyes if that feels okay.',
      'Breathe in slowly... hold for a moment... breathe out gently.',
      "One more time. In... and out. You're here. That's enough.",
    ],
  },
  {
    cta: "I'll go get it",
    steps: [
      'Go pour yourself a glass of water. Take your time.',
      'Hold the glass for a moment. Notice the coolness.',
      'Drink slowly. Small things like this add up.',
    ],
  },
  {
    cta: "Let's step out",
    steps: [
      "Grab your keys if you need them. You're just going for a moment.",
      'Step outside. Feel the air on your skin.',
      'Take a breath. Notice one thing around you. Then come back.',
    ],
  },
  {
    cta: "I'll try",
    steps: [
      'Put your phone face-down after this. That includes this screen.',
      'Find a comfortable place to sit or lie down.',
      "Let your mind wander. There's nothing to do for ten minutes.",
    ],
  },
  {
    cta: "Let's notice",
    steps: [
      'Think about your day so far. Even the smallest things count.',
      'Maybe your hands made something. Or your legs carried you somewhere.',
      'What did your body do today that you can be grateful for?',
    ],
  },
  {
    cta: "Let's move",
    steps: [
      "Stand up if you're sitting. Roll your shoulders back.",
      'Shake your hands out gently. Nod your head side to side.',
      "That's movement. Your body knows what it needs.",
    ],
  },
]

function getCardContent(dayCount) {
  const idx = (dayCount - 1) % 6
  if (dayCount <= 6) {
    return { text: EARLY_CARDS[idx], whisper: null, exercise: EXERCISES[idx] }
  }
  const stageWhispers = whispers.filter(w => w.stage === 'early' || w.stage === 'mid')
  const w = stageWhispers[(dayCount - 7) % stageWhispers.length]
  return { text: EARLY_CARDS[idx], whisper: w, exercise: EXERCISES[idx] }
}

export default function DailyCard({ onDone, onSkip, onGuideStart }) {
  const { dayCount, today, todayCardResponse, respondToCard } = useApp()
  const { text, whisper, exercise } = getCardContent(dayCount)

  function handleStartGuide() {
    onGuideStart?.(exercise)
  }

  function handleSkip() {
    respondToCard(today, 'skip')
    onSkip?.()
  }

  if (todayCardResponse === 'done') {
    return (
      <div className={`${styles.card} ${styles.responded} fade-in`}>
        <p className={styles.responseText}>You showed up today.</p>
      </div>
    )
  }

  if (todayCardResponse === 'skip') {
    return (
      <div className={`${styles.card} ${styles.responded} fade-in`}>
        <p className={styles.responseText}>Rest is showing up too.</p>
      </div>
    )
  }

  return (
    <div className={`${styles.card} fade-in`}>
      {whisper && (
        <p className={styles.whisperText}>
          "{whisper.text}"
          <span className={styles.attribution}> — Woman, {whisper.age}</span>
        </p>
      )}
      <p className={styles.prompt}>{text}</p>
      <div className={styles.actions}>
        <Button
          variant="primary"
          size="md"
          className={styles.doneBtn}
          onClick={handleStartGuide}
        >
          {exercise.cta}
        </Button>
        <button className={styles.skipBtn} onClick={handleSkip}>
          Not today
        </button>
      </div>
    </div>
  )
}

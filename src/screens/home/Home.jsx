import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Layout from '../../components/shared/Layout'
import MiraCard from '../../components/mira/MiraCard'
import MiraLetter from '../../components/mira/MiraLetter'
import MiraCheckIn from '../../components/mira/MiraCheckIn'
import Mira from '../../components/mira/Mira'
import HabitRings from '../../components/habits/HabitRings'
import RingHistory from '../../components/habits/RingHistory'
import CycleTracker from '../../components/habits/CycleTracker'
import ExerciseOverlay from '../../components/exercises/ExerciseOverlay'
import DevDayPicker from '../../components/dev/DevDayPicker'
import styles from './Home.module.css'

const MOOD_CHIPS = [
  { value: 'heavy',  label: 'Heavy',  emoji: '🌧️' },
  { value: 'tired',  label: 'Tired',  emoji: '😴' },
  { value: 'okay',   label: 'Okay',   emoji: '🌿' },
  { value: 'good',   label: 'Good',   emoji: '🌸' },
  { value: 'bright', label: 'Bright', emoji: '✨' },
]

function CheckInBanner({ onMoodSelect }) {
  const [text, setText] = useState('')

  function submitText() {
    const trimmed = text.trim()
    if (trimmed) onMoodSelect(trimmed)
  }

  return (
    <div className={styles.checkInBanner}>
      <div className={styles.checkInBannerMira}>
        <Mira state="default" size={44} />
      </div>
      <div className={styles.checkInBannerBody}>
        <p className={styles.checkInBannerQ}>How are you feeling?</p>
        <div className={styles.checkInBannerChips}>
          {MOOD_CHIPS.map(c => (
            <button key={c.value} className={styles.checkInChip} onClick={() => onMoodSelect(c.value)}>
              <span>{c.emoji}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>
        <div className={styles.checkInTextRow}>
          <input
            className={styles.checkInTextInput}
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submitText()}
            placeholder="or in your own words…"
            maxLength={80}
          />
          {text.trim() && (
            <button className={styles.checkInTextSend} onClick={submitText} aria-label="Submit">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M7 12V2M3 6l4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const AFFIRMATIONS = {
  support: [
    'Your body is doing its best. So are you.',
    'Rest is not laziness — it is how you recover.',
    'Small steps count. You are here.',
    'Gentleness is a form of strength.',
    'You do not have to earn rest.',
    'Showing up is enough.',
    'One small thing. That is all it takes.',
  ],
  screening: [
    'Knowing your body is an act of love.',
    'Every step toward screening is peace of mind.',
    'You are taking care of yourself. That matters.',
    'Knowledge is the kindest form of care.',
    'You are worth the check-up.',
    'Early action is a gift to yourself.',
    'Looking after yourself is brave.',
  ],
  body: [
    'Your body has wisdom. You are learning its language.',
    'Noticing is the first step to understanding.',
    'Every body is different. Yours deserves attention.',
    'Curiosity about your body is a kind of care.',
    'You are allowed to take up space.',
    'Listening inward is an act of courage.',
    'Your experience of your body is valid.',
  ],
  notsure: [
    'There is no right place to start. Here is fine.',
    'Not knowing is a kind of honesty.',
    'Gentleness first. Everything else can wait.',
    'You are figuring it out. That counts.',
    'Being here is enough for today.',
    'Curiosity is a form of courage.',
    'You do not need to have it all figured out.',
  ],
}

const DEFAULT_AFFIRMATIONS = AFFIRMATIONS.support

const FOCUS_ACTIVITIES = {
  support: [
    {
      id: 'breathe',
      name: 'Box breathing',
      desc: 'Slow your nervous system',
      duration: '3 min',
      steps: [
        'Find a comfortable position. Close your eyes if that feels okay.',
        'Breathe in for 4 counts… hold for 4… breathe out for 4… hold for 4.',
        "One more round. In… hold… out… hold. You're here. That's enough.",
      ],
    },
    {
      id: 'body-scan',
      name: 'Gentle body scan',
      desc: 'Check in from head to toe',
      duration: '4 min',
      steps: [
        'Close your eyes. Notice your feet on the floor. What do they feel?',
        'Slowly move your attention up — legs, belly, chest, shoulders. No judgement.',
        'What is your body holding today? Just noticing is enough.',
      ],
    },
    {
      id: 'gratitude',
      name: 'What my body did',
      desc: 'Notice what your body did well today',
      duration: '2 min',
      steps: [
        'Think about your day so far. Even the smallest things count.',
        'Maybe your hands made something. Or your legs carried you somewhere.',
        'What did your body do today that you can be grateful for?',
      ],
    },
  ],
  screening: [
    {
      id: 'bse',
      name: 'Self-examination guide',
      desc: 'A quiet 5-minute check-in with your body',
      duration: '5 min',
      navigateTo: '/bse/intro',
    },
    {
      id: 'breathe-before',
      name: 'Breathing to prepare',
      desc: 'Calm your nerves before a screening',
      duration: '3 min',
      steps: [
        'Breathe in slowly for 4 counts. Hold for 2.',
        'Breathe out gently for 6 counts. Let the tension go.',
        "You are going to look after yourself. That's brave.",
      ],
    },
    {
      id: 'questions',
      name: 'Write your questions',
      desc: 'What would you want to ask?',
      duration: '3 min',
      steps: [
        "What questions have been sitting in your mind about your health?",
        "Write them down — or just let them come. There is no wrong question.",
        "You deserve complete answers. You can bring this list to your appointment.",
      ],
    },
  ],
  body: [
    {
      id: 'five-senses',
      name: '5 senses grounding',
      desc: 'Come back to the present moment',
      duration: '3 min',
      steps: [
        "Name 5 things you can see. 4 you can touch. 3 you can hear.",
        "2 things you can smell. 1 thing you can taste.",
        "You are here. Your body is here. That is enough.",
      ],
    },
    {
      id: 'body-check',
      name: 'Body awareness',
      desc: 'Listen inward, without judgement',
      duration: '4 min',
      steps: [
        "Start at the top of your head. Notice any tension or softness.",
        "Move slowly down — face, neck, shoulders, chest, belly.",
        "Your body speaks. You are learning its language.",
      ],
    },
    {
      id: 'cycle-awareness',
      name: 'Cycle check-in',
      desc: 'How does your body feel today?',
      duration: '2 min',
      steps: [
        "Notice your energy today. High? Low? Somewhere in between?",
        "Is there any physical sensation — warmth, weight, lightness, tension?",
        "Log what you notice in the Cycle section. Small observations matter.",
      ],
    },
  ],
  notsure: [
    {
      id: 'breathe',
      name: 'Just breathe',
      desc: 'A gentle place to start',
      duration: '3 min',
      steps: [
        'Find a comfortable position. Close your eyes if that feels okay.',
        'Breathe in slowly… hold for a moment… breathe out gently.',
        "One more time. In… and out. You're here. That's enough.",
      ],
    },
    {
      id: 'brain-dump',
      name: 'Brain dump',
      desc: 'Write what is in your head. No filter.',
      duration: '5 min',
      steps: [
        "Open notes or grab a piece of paper.",
        "Write everything in your head for 5 minutes — no editing, no filter.",
        "When you are done, close the page. You do not have to read it back.",
      ],
    },
    {
      id: 'five-senses',
      name: '5 senses grounding',
      desc: 'Return to this moment',
      duration: '3 min',
      steps: [
        "Name 5 things you can see. 4 you can touch. 3 you can hear.",
        "2 things you can smell. 1 thing you can taste.",
        "You are here. That is a good place to start.",
      ],
    },
  ],
  relax: [
    {
      id: 'breathe',
      name: 'Box breathing',
      desc: 'Slow your nervous system',
      duration: '3 min',
      steps: [
        'Find a comfortable position. Close your eyes if that feels okay.',
        'Breathe in for 4 counts… hold for 4… breathe out for 4… hold for 4.',
        "One more round. In… hold… out… hold. You're here. That's enough.",
      ],
    },
    {
      id: 'body-scan',
      name: 'Gentle body scan',
      desc: 'Check in from head to toe',
      duration: '4 min',
      steps: [
        'Close your eyes. Notice your feet on the floor. What do they feel?',
        'Slowly move your attention up — legs, belly, chest, shoulders. No judgement.',
        'What is your body holding today? Just noticing is enough.',
      ],
    },
    {
      id: 'still',
      name: '2 minutes of stillness',
      desc: 'Just be here',
      duration: '2 min',
      steps: [
        'Sit somewhere you won\'t be disturbed. Set a 2-minute timer.',
        'Let your eyes go soft. Notice sounds. Notice your breath.',
        "You don't have to do anything. Being here is enough.",
      ],
    },
  ],
}

function getGreeting(name) {
  const hour = new Date().getHours()
  if (hour < 12) return `Good morning, ${name}`
  if (hour < 17) return `Good afternoon, ${name}`
  return `Good evening, ${name}`
}

function getTodayBadge() {
  return new Date().toLocaleDateString('en-SG', {
    weekday: 'short', day: 'numeric', month: 'short',
  })
}

const FOCUS_OPTIONS = [
  { id: 'support',   label: 'Daily support',   desc: 'Gentle habits & self-care',      icon: '🌿' },
  { id: 'screening', label: 'Screening',        desc: 'Understanding my options',        icon: '🔍' },
  { id: 'body',      label: 'Know my body',     desc: 'Learning to listen inward',       icon: '✨' },
  { id: 'relax',     label: 'To relax',         desc: 'Wind down and breathe',           icon: '🌙' },
]

function FocusSection({ userGoal, onSetGoal, dayCount, todaySelfCare, onBeginActivity, navigate }) {
  // Show question if no goal set (null) or user explicitly clicked Change
  const [changing, setChanging] = useState(!userGoal || userGoal === 'notsure')

  // When goal changes externally (e.g. first pick), stop showing question
  useEffect(() => {
    if (userGoal && userGoal !== 'notsure') setChanging(false)
  }, [userGoal])

  const goal = userGoal || 'notsure'
  const activities = FOCUS_ACTIVITIES[goal] || FOCUS_ACTIVITIES.notsure
  const activity = activities[(dayCount - 1) % activities.length]
  const currentOption = FOCUS_OPTIONS.find(o => o.id === userGoal)

  function handlePick(id) {
    onSetGoal(id)
    setChanging(false)
  }

  function handleBegin() {
    if (activity.navigateTo) {
      navigate(activity.navigateTo)
    } else {
      onBeginActivity(activity)
    }
  }

  // ── State A: question view ──
  if (changing) {
    return (
      <div className={styles.focusSection}>
        <p className={styles.focusQuestion}>What would you like to focus on?</p>
        <div className={styles.focusOptions}>
          {FOCUS_OPTIONS.map(o => (
            <button
              key={o.id}
              className={styles.focusOptionCard}
              onClick={() => handlePick(o.id)}
            >
              <span className={styles.focusOptionIcon}>{o.icon}</span>
              <div className={styles.focusOptionText}>
                <p className={styles.focusOptionLabel}>{o.label}</p>
                <p className={styles.focusOptionDesc}>{o.desc}</p>
              </div>
            </button>
          ))}
          <button className={styles.focusNotSure} onClick={() => handlePick('notsure')}>
            Not sure yet
          </button>
        </div>
      </div>
    )
  }

  // ── State B: focus chosen + activity ──
  return (
    <div className={styles.focusSection}>
      <div className={styles.focusChosen}>
        <div className={styles.focusChosenLeft}>
          <span className={styles.focusChosenIcon}>
            {currentOption?.icon || '✨'}
          </span>
          <div>
            <p className={styles.focusChosenLabel}>{currentOption?.label || 'Your focus'}</p>
            <p className={styles.focusChosenDesc}>{currentOption?.desc}</p>
          </div>
        </div>
        <button className={styles.focusChangeBtn} onClick={() => setChanging(true)}>Change</button>
      </div>

      {!todaySelfCare ? (
        <div className={styles.activityCard}>
          <div className={styles.activityTop}>
            <span className={styles.activityDuration}>{activity.duration}</span>
          </div>
          <p className={styles.activityName}>{activity.name}</p>
          <p className={styles.activityDesc}>{activity.desc}</p>
          <button className={styles.activityBtn} onClick={handleBegin}>Begin</button>
        </div>
      ) : (
        <div className={styles.activityDone}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8l3.5 3.5L13 5" stroke="#993556" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>You took time for yourself today.</span>
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const {
    userName, dayCount, userGoal,
    setUserGoal, today, todayHabits, logHabit,
    letterSeenDay7, needsWeekCheckIn,
  } = useApp()
  const [miraGlowing, setMiraGlowing] = useState(false)
  const [activeExercise, setActiveExercise] = useState(null)
  const [showRingHistory, setShowRingHistory] = useState(false)
  const [showLetter, setShowLetter] = useState(false)
  const [showCheckIn, setShowCheckIn] = useState(needsWeekCheckIn)
  const [dismissedMood, setDismissedMood] = useState(null)
  const navigate = useNavigate()

  const todaySelfCare = !!todayHabits.selfCare

  useEffect(() => {
    if (needsWeekCheckIn) setShowCheckIn(true)
  }, [needsWeekCheckIn])

  // Show Day 7 letter once on first eligibility, but only after check-in is done
  useEffect(() => {
    if (dayCount >= 7 && !letterSeenDay7 && !showCheckIn) setShowLetter(true)
  }, [dayCount, letterSeenDay7, showCheckIn])

  function handleAllHabits() {
    setMiraGlowing(true)
  }

  function handleBeginActivity(exercise) {
    setActiveExercise(exercise)
    setMiraGlowing(true)
  }

  function handleActivityComplete() {
    logHabit(today, 'selfCare')
    setActiveExercise(null)
    setMiraGlowing(true)
  }

  function handleActivityDismiss() {
    setActiveExercise(null)
  }

  return (
    <Layout>
      <div className={styles.page}>
        {/* Greeting */}
        <div className={styles.greetingRow}>
          <p className={styles.greeting}>{getGreeting(userName)}</p>
          <span className={styles.dayBadge}>{getTodayBadge()}</span>
        </div>

        {/* Mira check-in */}
        <MiraCard
          isGlowing={miraGlowing}
          onGlowEnd={() => setMiraGlowing(false)}
          onScreeningReady={() => navigate('/screening')}
        />

        {needsWeekCheckIn && !showCheckIn && (
          <CheckInBanner onMoodSelect={mood => {
            setDismissedMood(mood)
            setShowCheckIn(true)
          }} />
        )}

        {/* ── Your Focus + activity ── */}
        <FocusSection
          userGoal={userGoal}
          onSetGoal={setUserGoal}
          dayCount={dayCount}
          todaySelfCare={todaySelfCare}
          onBeginActivity={handleBeginActivity}
          navigate={navigate}
        />

        {/* ── Habits ── */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Today's habits</p>
            <button className={styles.sectionAction} onClick={() => setShowRingHistory(true)}>
              See all
            </button>
          </div>
          <HabitRings onComplete={handleAllHabits} />
        </div>

        {/* ── Cycle ── */}
        <div className={styles.section}>
          <p className={styles.sectionLabel}>Cycle</p>
          <CycleTracker />
        </div>

      </div>

      {activeExercise && (
        <ExerciseOverlay
          exercise={activeExercise}
          onComplete={handleActivityComplete}
          onDismiss={handleActivityDismiss}
        />
      )}

      {showRingHistory && <RingHistory onClose={() => setShowRingHistory(false)} />}

      {showLetter && <MiraLetter onClose={() => setShowLetter(false)} />}

      {showCheckIn && (
        <MiraCheckIn
          initialMood={dismissedMood}
          onComplete={() => { setShowCheckIn(false); setDismissedMood(null) }}
          onDismiss={() => { setShowCheckIn(false); setDismissedMood(null) }}
        />
      )}

      <DevDayPicker />
    </Layout>
  )
}

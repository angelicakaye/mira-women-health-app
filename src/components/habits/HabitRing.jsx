import styles from './HabitRing.module.css'

const HABITS = {
  water: {
    label: 'Water',
    sub: 'Stay hydrated today',
    stroke: '#4EB8D4',
    track: 'rgba(78,184,212,0.18)',
    bg: 'rgba(78,184,212,0.08)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 2C8 2 4 6.5 4 9.5a4 4 0 0 0 8 0C12 6.5 8 2 8 2Z" fill="currentColor"/>
      </svg>
    ),
  },
  sleep: {
    label: 'Sleep',
    sub: 'Rest & recovery',
    stroke: '#9B7FC4',
    track: 'rgba(155,127,196,0.18)',
    bg: 'rgba(155,127,196,0.08)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M13 9A6 6 0 0 1 7 3a6 6 0 1 0 6 6Z" fill="currentColor"/>
      </svg>
    ),
  },
  movement: {
    label: 'Movement',
    sub: 'Move your body',
    stroke: '#5DC483',
    track: 'rgba(93,196,131,0.18)',
    bg: 'rgba(93,196,131,0.08)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="3.5" r="1.5" fill="currentColor"/>
        <path d="M5.5 7l2.5-2 2.5 2M8 5v5M5.5 12l2.5-2 2.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  selfCare: {
    label: 'You time',
    sub: 'Take time for yourself',
    stroke: '#E88AAA',
    track: 'rgba(232,138,170,0.18)',
    bg: 'rgba(232,138,170,0.08)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 13s-5-3.5-5-6.5a3 3 0 0 1 5-2.24A3 3 0 0 1 13 6.5C13 9.5 8 13 8 13Z" fill="currentColor"/>
      </svg>
    ),
  },
}

const RING_SIZE = 40
const STROKE_W = 5

export default function HabitRing({ habit, completed, onTap }) {
  const config = HABITS[habit]
  if (!config) return null

  const radius = (RING_SIZE - STROKE_W) / 2
  const circumference = 2 * Math.PI * radius
  const offset = completed ? 0 : circumference

  return (
    <button
      className={`${styles.card} ${completed ? styles.done : ''}`}
      onClick={onTap}
      aria-label={`Log ${config.label}`}
      aria-pressed={completed}
      style={{ '--habit-bg': config.bg }}
    >
      {/* Ring indicator */}
      <div className={styles.ringWrap}>
        <svg width={RING_SIZE} height={RING_SIZE} viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}>
          <circle
            cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={radius}
            fill="none" stroke={config.track} strokeWidth={STROKE_W}
          />
          <circle
            cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={radius}
            fill="none" stroke={config.stroke} strokeWidth={STROKE_W}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
            className={styles.arc}
          />
        </svg>
        <span className={styles.ringIcon} style={{ color: completed ? config.stroke : `${config.stroke}55` }}>
          {config.icon}
        </span>
      </div>

      {/* Text */}
      <div className={styles.text}>
        <span className={styles.name} style={{ color: completed ? '#4A2232' : '#72243E' }}>
          {config.label}
        </span>
        <span className={styles.sub}>{completed ? 'Done ✓' : config.sub}</span>
      </div>

      {/* Check indicator */}
      <div
        className={`${styles.check} ${completed ? styles.checkDone : ''}`}
        style={completed ? { background: config.stroke, borderColor: config.stroke } : {}}
      >
        {completed && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
    </button>
  )
}

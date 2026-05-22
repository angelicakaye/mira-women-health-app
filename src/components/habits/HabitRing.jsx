import styles from './HabitRing.module.css'

const ICONS = {
  period: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="10" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M9 6V2M7 4h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  water: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2C9 2 4.5 7.5 4.5 11a4.5 4.5 0 0 0 9 0C13.5 7.5 9 2 9 2Z" fill="currentColor" opacity="0.9"/>
    </svg>
  ),
  sleep: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M14 10A6 6 0 0 1 8 4a6 6 0 1 0 6 6Z" fill="currentColor" opacity="0.9"/>
    </svg>
  ),
  movement: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="4.5" r="1.5" fill="currentColor" opacity="0.9"/>
      <path d="M6 8l3-2 3 2M9 6v5M6.5 13l2.5-2 2.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
    </svg>
  ),
}

const LABELS = {
  period: 'Cycle',
  water: 'Water',
  sleep: 'Sleep',
  movement: 'Move',
}

const COLORS = {
  period:   { stroke: '#993556', track: 'rgba(153,53,86,0.12)',  icon: '#993556' },
  water:    { stroke: '#993556', track: 'rgba(153,53,86,0.12)', icon: '#993556' },
  sleep:    { stroke: '#993556', track: 'rgba(153,53,86,0.12)', icon: '#993556' },
  movement: { stroke: '#993556', track: 'rgba(153,53,86,0.12)', icon: '#993556' },
}

export default function HabitRing({ habit, completed, onTap, size = 78 }) {
  const strokeWidth = 9
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = completed ? 0 : circumference
  const { stroke, track, icon } = COLORS[habit] || COLORS.water

  return (
    <button
      className={`${styles.ring} ${completed ? styles.done : ''}`}
      onClick={onTap}
      style={{ width: size, height: size }}
      aria-label={`Log ${LABELS[habit]}`}
      aria-pressed={completed}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={styles.svg}
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={track}
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className={styles.arc}
        />
      </svg>

      <span className={styles.icon} style={{ color: completed ? icon : 'rgba(153,53,86,0.35)' }}>
        {ICONS[habit]}
      </span>

      <span className={styles.label} style={{ color: completed ? '#72243E' : '#C090A8' }}>
        {LABELS[habit]}
      </span>
    </button>
  )
}

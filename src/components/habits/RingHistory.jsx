import { useMemo, useState } from 'react'
import { useApp } from '../../context/AppContext'
import styles from './RingHistory.module.css'

const HABITS = ['period', 'water', 'sleep', 'movement']
const LABELS = {
  period: 'Period',
  water: 'Water',
  sleep: 'Sleep',
  movement: 'Move',
}

function toISO(date) {
  return date.toISOString().slice(0, 10)
}

function monthLabel(date) {
  return date.toLocaleDateString('en-SG', { month: 'long', year: 'numeric' })
}

function buildMonthDays(monthDate) {
  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()
  const first = new Date(year, month, 1)
  const start = new Date(first)
  start.setDate(first.getDate() - first.getDay())

  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(start)
    day.setDate(start.getDate() + index)
    return {
      date: day,
      iso: toISO(day),
      inMonth: day.getMonth() === month,
    }
  })
}

function closedCount(habitLogs, periodLogs, iso) {
  const habits = habitLogs[iso] || {}
  return HABITS.reduce((count, habit) => {
    if (habit === 'period') return count + (periodLogs[iso] ? 1 : 0)
    return count + (habits[habit] ? 1 : 0)
  }, 0)
}

export default function RingHistory({ onClose }) {
  const { habitLogs, periodLogs = {}, today } = useApp()
  const [cursor, setCursor] = useState(() => new Date())

  const days = useMemo(() => buildMonthDays(cursor), [cursor])
  const todayCount = closedCount(habitLogs, periodLogs, today)
  const closedDays = days.filter(day => day.inMonth && closedCount(habitLogs, periodLogs, day.iso) === HABITS.length).length

  function moveMonth(delta) {
    setCursor(prev => new Date(prev.getFullYear(), prev.getMonth() + delta, 1))
  }

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label="Ring history">
      <div className={styles.sheet}>
        <div className={styles.handle} />

        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Your rings</p>
            <h2>{monthLabel(cursor)}</h2>
          </div>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close">
            x
          </button>
        </div>

        <div className={styles.summary}>
          <div>
            <span>{todayCount}/4</span>
            <small>closed today</small>
          </div>
          <div>
            <span>{closedDays}</span>
            <small>full days this month</small>
          </div>
        </div>

        <div className={styles.legend}>
          {HABITS.map(habit => (
            <span key={habit}>{LABELS[habit]}</span>
          ))}
        </div>

        <div className={styles.monthControls}>
          <button onClick={() => moveMonth(-1)}>Previous</button>
          <button onClick={() => setCursor(new Date())}>This month</button>
          <button onClick={() => moveMonth(1)}>Next</button>
        </div>

        <div className={styles.weekdays}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((label, index) => (
            <span key={`${label}-${index}`}>{label}</span>
          ))}
        </div>

        <div className={styles.calendar}>
          {days.map(day => {
            const count = closedCount(habitLogs, periodLogs, day.iso)
            const percent = count / HABITS.length
            return (
              <div
                key={day.iso}
                className={`${styles.day} ${!day.inMonth ? styles.outside : ''} ${day.iso === today ? styles.today : ''}`}
                aria-label={`${day.iso}: ${count} rings closed`}
              >
                <span className={styles.dayNumber}>{day.date.getDate()}</span>
                <span
                  className={styles.miniRing}
                  style={{ '--ring-fill': `${percent * 360}deg` }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

import { useApp } from '../../context/AppContext'
import HabitRing from './HabitRing'
import Flower from '../flower/Flower'
import styles from './HabitRings.module.css'

const HABITS = ['water', 'sleep', 'movement', 'selfCare']

const FLOWER_LABELS = { rose: 'Rose', peony: 'Peony', lily: 'Pink lily' }

function getWeekDays(installDate, weekNum) {
  const days = []
  const weekStart = (weekNum - 1) * 7
  for (let i = weekStart; i < weekStart + 7; i++) {
    const d = new Date(installDate)
    d.setDate(d.getDate() + i)
    days.push(d.toISOString().slice(0, 10))
  }
  return days
}

function weekStage(habitLogs, installDate, weekNum) {
  if (!installDate) return 0
  const days = getWeekDays(installDate, weekNum)
  const activeDays = days.filter(d => {
    const log = habitLogs[d]
    return log && (log.water || log.sleep || log.movement || log.selfCare)
  }).length
  if (activeDays === 0) return 0
  if (activeDays <= 2) return 1
  if (activeDays === 3) return 2
  if (activeDays <= 5) return 3
  return 4
}

export default function HabitRings({ onComplete }) {
  const {
    todayHabits, today, logHabit,
    installDate, habitLogs,
    currentWeekNum, currentWeekFlower, showWeeklyPicker,
    flowerPicks, flowerType, setWeekFlower,
  } = useApp()

  const doneCount = HABITS.filter(h => todayHabits[h]).length
  const currentStage = weekStage(habitLogs, installDate, currentWeekNum)
  const pastWeeks = Array.from({ length: currentWeekNum - 1 }, (_, i) => i + 1)

  function handleHabit(habit) {
    if (todayHabits[habit]) return
    logHabit(today, habit)
    const after = { ...todayHabits, [habit]: true }
    if (HABITS.every(h => after[h])) onComplete?.()
  }

  // ── Weekly picker ──
  if (showWeeklyPicker) {
    return (
      <div className={styles.wrap}>
        <div className={styles.pickerCard}>
          <p className={styles.pickerTitle}>
            {currentWeekNum === 1 ? 'Choose your first flower to grow.' : `Week ${currentWeekNum} — pick your flower.`}
          </p>
          <p className={styles.pickerSub}>It will grow as you build your habits this week.</p>
          <div className={styles.pickerRow}>
            {['rose', 'peony', 'lily'].map(type => (
              <button
                key={type}
                className={styles.pickerOption}
                onClick={() => setWeekFlower(currentWeekNum, type)}
              >
                <Flower type={type} waterCount={4} size={60} />
                <span className={styles.pickerOptionLabel}>{FLOWER_LABELS[type]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.list}>
          {HABITS.map(habit => (
            <HabitRing
              key={habit}
              habit={habit}
              completed={!!todayHabits[habit]}
              onTap={() => handleHabit(habit)}
            />
          ))}
        </div>
      </div>
    )
  }

  // ── Garden + habit cards ──
  return (
    <div className={styles.wrap}>
      {/* Garden row */}
      <div className={styles.gardenCard}>
        {/* Past week flowers */}
        {pastWeeks.length > 0 && (
          <div className={styles.pastRow}>
            {pastWeeks.slice(-8).map(wk => (
              <div key={wk} className={styles.pastFlower}>
                <Flower
                  type={flowerPicks[wk] || flowerType || 'rose'}
                  waterCount={4}
                  size={38}
                />
              </div>
            ))}
          </div>
        )}

        {/* Current week flower */}
        <div className={styles.currentFlower}>
          <Flower type={currentWeekFlower} waterCount={currentStage} size={88} />
        </div>

        <div className={styles.gardenMeta}>
          <p className={styles.gardenLabel}>
            {currentStage === 4
              ? 'In full bloom 🌸'
              : currentStage === 0
              ? 'Your flower is waiting to grow'
              : currentStage <= 2
              ? 'Growing…'
              : 'Almost blooming'}
          </p>
          <p className={styles.gardenSub}>
            {doneCount === 0
              ? 'Log a habit today to water your flower.'
              : `${doneCount} of 4 watered today · Week ${currentWeekNum}`}
          </p>
        </div>
      </div>

      {/* Habit cards */}
      <div className={styles.list}>
        {HABITS.map(habit => (
          <HabitRing
            key={habit}
            habit={habit}
            completed={!!todayHabits[habit]}
            onTap={() => handleHabit(habit)}
          />
        ))}
      </div>
    </div>
  )
}

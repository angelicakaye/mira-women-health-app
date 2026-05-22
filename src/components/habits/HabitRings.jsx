import { useApp } from '../../context/AppContext'
import HabitRing from './HabitRing'
import styles from './HabitRings.module.css'

export default function HabitRings({ onComplete }) {
  const { todayHabits, todayPeriod, today, logHabit, logPeriod } = useApp()

  function handleHabit(habit) {
    if (todayHabits[habit]) return
    logHabit(today, habit)
    const after = { ...todayHabits, [habit]: true }
    if (after.water && after.sleep && after.movement) {
      onComplete?.()
    }
  }

  return (
    <div className={styles.rings}>
      <HabitRing
        habit="period"
        completed={todayPeriod}
        onTap={() => logPeriod(today)}
      />
      <HabitRing
        habit="water"
        completed={todayHabits.water}
        onTap={() => handleHabit('water')}
      />
      <HabitRing
        habit="sleep"
        completed={todayHabits.sleep}
        onTap={() => handleHabit('sleep')}
      />
      <HabitRing
        habit="movement"
        completed={todayHabits.movement}
        onTap={() => handleHabit('movement')}
      />
    </div>
  )
}

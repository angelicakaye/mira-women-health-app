import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Layout from '../../components/shared/Layout'
import Flower from '../../components/flower/Flower'
import FlowerPicker from '../../components/flower/FlowerPicker'
import Button from '../../components/shared/Button'
import styles from './Account.module.css'

function flowerStageForDays(dayCount) {
  if (dayCount >= 21) return 4
  if (dayCount >= 11) return 3
  if (dayCount >= 6)  return 2
  return 1
}

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

function groupPeriodIntoCycles(periodLogs) {
  if (!periodLogs || periodLogs.length === 0) return []
  const sorted = [...periodLogs].sort()
  const cycles = []
  let current = [sorted[0]]
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1])
    const curr = new Date(sorted[i])
    const diff = (curr - prev) / 86400000
    if (diff <= 2) {
      current.push(sorted[i])
    } else {
      cycles.push(current)
      current = [sorted[i]]
    }
  }
  cycles.push(current)
  return cycles.reverse()
}

function formatCycleDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-SG', { day: 'numeric', month: 'short' })
}

function formatBookingDate(booking) {
  if (!booking.date) return 'Date pending'
  const d = new Date(booking.date)
  if (isNaN(d)) return 'Date pending'
  return d.toLocaleDateString('en-SG', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}

export default function Account() {
  const {
    userName, dayCount,
    habitLogs, periodLogs, bseLogs, bookings,
    whispersContributed, flowerType, setFlowerType,
    installDate, currentWeekNum, flowerPicks,
  } = useApp()
  const navigate = useNavigate()
  const [showReset, setShowReset] = useState(false)

  const today = new Date().toISOString().slice(0, 10)
  const heroFlowerStage = flowerStageForDays(dayCount)

  // Stats
  const fullDays = Object.values(habitLogs).filter(d => d.water && d.sleep && d.movement).length

  // Flowers grown = past weeks at stage 4
  const bloomedWeeks = Array.from({ length: currentWeekNum - 1 }, (_, i) => i + 1)
    .filter(wk => weekStage(habitLogs, installDate, wk) === 4).length

  // Period cycles
  const periodCycles = groupPeriodIntoCycles(periodLogs || [])

  // All weeks for garden grid
  const allWeeks = Array.from({ length: currentWeekNum }, (_, i) => i + 1)

  function handleReset() {
    localStorage.clear()
    window.location.href = '/'
  }

  return (
    <Layout>
      <div className={styles.page}>

        {/* ── Hero ── */}
        <div className={styles.hero}>
          <div className={styles.heroFlower}>
            <Flower type={flowerType || 'rose'} waterCount={heroFlowerStage} size={80} />
          </div>
          <div className={styles.heroText}>
            <h1 className={styles.heroName}>{userName}</h1>
            <p className={styles.heroDaySub}>Day {dayCount} with Mira</p>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div className={styles.statsRow}>
          <div className={styles.stat}>
            <span className={styles.statNum}>{dayCount}</span>
            <span className={styles.statLabel}>Days</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>{bloomedWeeks}</span>
            <span className={styles.statLabel}>Flowers</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>{fullDays}</span>
            <span className={styles.statLabel}>Full days</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>{(whispersContributed || []).length}</span>
            <span className={styles.statLabel}>Whispers</span>
          </div>
        </div>

        {/* ── Your flower picker ── */}
        <div className={styles.section}>
          <p className={styles.sectionLabel}>Your flower</p>
          <FlowerPicker selected={flowerType || 'rose'} onChange={setFlowerType} />
        </div>

        {/* ── Garden grid ── */}
        <div className={styles.section}>
          <p className={styles.sectionLabel}>Your garden</p>
          <p className={styles.sectionHint}>Each flower is one week of habits.</p>
          <div className={styles.gardenGrid}>
            {allWeeks.map(wk => {
              const stage = weekStage(habitLogs, installDate, wk)
              const type = flowerPicks[wk] || flowerType || 'rose'
              const isCurrent = wk === currentWeekNum
              return (
                <div
                  key={wk}
                  className={`${styles.gardenCell} ${isCurrent ? styles.gardenCellCurrent : ''}`}
                  title={`Week ${wk}`}
                >
                  <Flower type={type} waterCount={stage} size={52} />
                  <span className={styles.gardenWeekLabel}>Wk {wk}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Cycle log ── */}
        <div className={styles.section}>
          <p className={styles.sectionLabel}>Cycle log</p>
          {periodCycles.length === 0 ? (
            <div className={styles.emptyCard}>
              <p className={styles.emptyText}>No period days logged yet.</p>
              <p className={styles.emptyHint}>Track your cycle from the Today tab.</p>
            </div>
          ) : (
            <div className={styles.cycleList}>
              {periodCycles.slice(0, 4).map((cycle, i) => (
                <div key={i} className={styles.cycleItem}>
                  <div className={styles.cycleDot} />
                  <div className={styles.cycleDetails}>
                    <span className={styles.cycleRange}>
                      {formatCycleDate(cycle[0])}
                      {cycle.length > 1 ? ` – ${formatCycleDate(cycle[cycle.length - 1])}` : ''}
                    </span>
                    <span className={styles.cycleDays}>{cycle.length} day{cycle.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Screening history ── */}
        <div className={styles.section}>
          <div className={styles.sectionHeaderRow}>
            <p className={styles.sectionLabel}>Screening history</p>
            <button className={styles.sectionLink} onClick={() => navigate('/screening')}>
              + Add
            </button>
          </div>
          {(bseLogs || []).length === 0 && (bookings || []).length === 0 ? (
            <div className={styles.emptyCard}>
              <p className={styles.emptyText}>No screenings logged yet.</p>
              <p className={styles.emptyHint}>Your BSE and mammogram records will appear here.</p>
            </div>
          ) : (
            <div className={styles.screeningList}>
              {(bseLogs || []).slice().reverse().map((date, i) => (
                <div key={`bse-${i}`} className={styles.screeningItem}>
                  <div className={`${styles.screeningIcon} ${styles.screeningIconBse}`}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8.5l3.5 3.5L13 5" stroke="#FAF9F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className={styles.screeningDetails}>
                    <span className={styles.screeningTitle}>Breast self-exam</span>
                    <span className={styles.screeningDate}>{formatCycleDate(date)}</span>
                  </div>
                  <span className={styles.screeningBadge}>Done</span>
                </div>
              ))}
              {(bookings || []).map(booking => (
                <div key={booking.id} className={styles.screeningItem}>
                  <div className={`${styles.screeningIcon} ${styles.screeningIconMammo}`}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="#FAF9F7" strokeWidth="1.6"/>
                      <path d="M5 1v3M11 1v3M2 7h12" stroke="#FAF9F7" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className={styles.screeningDetails}>
                    <span className={styles.screeningTitle}>
                      {booking.type === 'bus' ? 'Mobile screening bus' : 'Mammogram'}
                    </span>
                    <span className={styles.screeningDate}>{formatBookingDate(booking)}</span>
                  </div>
                  <span className={styles.screeningBadge}>Booked</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
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

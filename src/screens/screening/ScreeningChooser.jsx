import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Layout from '../../components/shared/Layout'
import PageHeader from '../../components/shared/PageHeader'
import styles from './ScreeningChooser.module.css'

function formatDate(isoDate) {
  if (!isoDate) return ''
  return new Date(isoDate).toLocaleDateString('en-SG', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

function formatBookingDate(booking) {
  if (!booking.date) return 'Date pending'
  const d = new Date(booking.date)
  if (isNaN(d)) return 'Date pending'
  return d.toLocaleDateString('en-SG', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  })
}

function isUpcoming(booking) {
  if (!booking.date) return true
  const d = new Date(booking.date)
  if (isNaN(d)) return false
  return d >= new Date()
}

export default function ScreeningChooser() {
  const navigate = useNavigate()
  const { bseLogs, bookings } = useApp()

  const allBse = (bseLogs || []).slice().reverse()
  const allBookings = (bookings || [])
  const upcomingBookings = allBookings.filter(isUpcoming)
  const pastBookings = allBookings.filter(b => !isUpcoming(b))
  const hasHistory = allBse.length > 0 || allBookings.length > 0

  return (
    <Layout>
      <PageHeader showBack={false} />
      <div className={styles.page}>

        {/* ── My screenings ── */}
        <div className={styles.mySection}>
          <h2 className={styles.mySectionTitle}>My screenings</h2>

          {!hasHistory ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>Nothing logged yet.</p>
              <p className={styles.emptyHint}>Your BSE check-ins and mammogram bookings will appear here.</p>
            </div>
          ) : (
            <div className={styles.recordList}>
              {upcomingBookings.map(booking => (
                <div key={booking.id} className={`${styles.recordItem} ${styles.recordUpcoming}`}>
                  <div className={styles.recordIconWrap}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
                      <path d="M5 1v3M11 1v3M2 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className={styles.recordBody}>
                    <span className={styles.recordTitle}>
                      {booking.type === 'bus' ? 'Mobile screening bus' : 'Mammogram'}
                    </span>
                    <span className={styles.recordSub}>{formatBookingDate(booking)}</span>
                  </div>
                  <span className={styles.badgeUpcoming}>Upcoming</span>
                </div>
              ))}
              {allBse.slice(0, 3).map((date, i) => (
                <div key={`bse-${i}`} className={styles.recordItem}>
                  <div className={styles.recordIconWrap}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8.5l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className={styles.recordBody}>
                    <span className={styles.recordTitle}>Breast self-exam</span>
                    <span className={styles.recordSub}>{formatDate(date)}</span>
                  </div>
                  <span className={styles.badgeDone}>Done</span>
                </div>
              ))}
              {pastBookings.map(booking => (
                <div key={booking.id} className={styles.recordItem}>
                  <div className={styles.recordIconWrap}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
                      <path d="M5 1v3M11 1v3M2 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className={styles.recordBody}>
                    <span className={styles.recordTitle}>
                      {booking.type === 'bus' ? 'Mobile screening bus' : 'Mammogram'}
                    </span>
                    <span className={styles.recordSub}>{formatBookingDate(booking)}</span>
                  </div>
                  <span className={styles.badgeDone}>Done</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Divider ── */}
        <div className={styles.divider}><span>Book or log a new screening</span></div>

        {/* ── Option cards ── */}
        <div className={styles.options}>

          {/* BSE */}
          <button className={styles.optionCard} onClick={() => navigate('/bse/intro')}>
            <div className={styles.optionIllustration}>
              <svg width="48" height="48" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="25" fill="#FEF0F5" stroke="#F4C0D1" strokeWidth="1.5"/>
                <path d="M26 18c-4 0-8 3-8 8 0 3 2 6 5 7.5V36h6v-2.5c3-1.5 5-4.5 5-7.5 0-5-4-8-8-8Z" fill="#F4C0D1" opacity="0.7"/>
                <path d="M22 34h8" stroke="#E8A0B8" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className={styles.optionBody}>
              <h2 className={styles.optionTitle}>Breast self-examination</h2>
              <p className={styles.optionMeta}>At home · 5 minutes</p>
              <span className={styles.optionTag}>Try this first</span>
              <p className={styles.optionBenefit}>
                Learn what's normal for your body. The earlier you notice changes, the better.
              </p>
              <p className={styles.optionWhisper}>
                "I do this in the shower. It's private, it's mine." — Sarah, 45
              </p>
            </div>
            <div className={styles.optionArrow}>
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path d="M6.5 4l5 5-5 5" stroke="#993556" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>

          {/* Mammogram */}
          <button className={styles.optionCard} onClick={() => navigate('/mammogram')}>
            <div className={styles.optionIllustration}>
              <svg width="48" height="48" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="25" fill="#FEF0F5" stroke="#F4C0D1" strokeWidth="1.5"/>
                <rect x="16" y="20" width="20" height="14" rx="3" fill="#F4C0D1" opacity="0.6"/>
                <rect x="20" y="16" width="12" height="6" rx="2" fill="#E8A0B8" opacity="0.7"/>
                <line x1="26" y1="20" x2="26" y2="34" stroke="#FAF9F7" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className={styles.optionBody}>
              <h2 className={styles.optionTitle}>Mammogram screening</h2>
              <p className={styles.optionMeta}>Clinic or mobile bus · ~20 minutes</p>
              <span className={styles.optionTagSoft}>Recommended every 2 years (40+)</span>
              <p className={styles.optionBenefit}>
                Detects what you can't feel. The most reliable way to catch changes early.
              </p>
              <p className={styles.optionWhisper}>
                "The nurse remembered my name. That helped." — Priya, 52
              </p>
            </div>
            <div className={styles.optionArrow}>
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path d="M6.5 4l5 5-5 5" stroke="#993556" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>

        <p className={styles.footnote}>
          BSE helps you notice changes. Mammograms detect what you can't feel.<br />
          You can do one, both, or come back later.
        </p>
      </div>
    </Layout>
  )
}

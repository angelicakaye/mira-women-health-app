import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Layout from '../../components/shared/Layout'
import PageHeader from '../../components/shared/PageHeader'
import Lumi from '../../components/lumi/Lumi'
import clinics from '../../data/clinics.json'
import busSchedule from '../../data/busSchedule.json'
import styles from './CheckIn.module.css'

function formatBooking(booking) {
  if (booking.type === 'bus') {
    return {
      title: busSchedule.find(b => b.id === booking.clinicId)?.location || 'Mobile screening bus',
      meta: `${booking.date || 'Walk-in'} · ${booking.time || ''}`,
    }
  }

  const clinic = clinics.find(c => c.id === booking.clinicId)
  const date = booking.date
    ? new Date(booking.date).toLocaleDateString('en-SG', { weekday: 'short', day: 'numeric', month: 'short' })
    : 'Date pending'
  return {
    title: clinic?.name || 'Mammogram booking',
    meta: `${date} · ${booking.time || 'Time pending'}`,
  }
}

export default function CheckIn() {
  const { userName, bookings } = useApp()
  const navigate = useNavigate()
  const hasBookings = (bookings || []).length > 0

  return (
    <Layout>
      <PageHeader showBack={false} />
      <div className={styles.page}>
        <Lumi state={hasBookings ? 'glowing' : 'default'} size={96} />

        <div className={styles.content}>
          <h1 className={styles.title}>Your journey, {userName}</h1>
          <p className={styles.body}>
            A quiet place for what you have done and what is coming up.
          </p>
        </div>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Bookings</h2>
            <button onClick={() => navigate('/screening')}>Add</button>
          </div>

          {hasBookings ? (
            <div className={styles.bookingList}>
              {bookings.map(booking => {
                const item = formatBooking(booking)
                return (
                  <article key={booking.id} className={styles.bookingCard}>
                    <div>
                      <p className={styles.bookingTitle}>{item.title}</p>
                      <p className={styles.bookingMeta}>{item.meta}</p>
                    </div>
                    <span className={styles.bookingBadge}>Booked</span>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className={styles.emptyCard}>
              <p>No bookings yet.</p>
              <button onClick={() => navigate('/screening')}>Explore screening options</button>
            </div>
          )}
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Check-in</h2>
          </div>
        <div className={styles.options}>
          <button className={styles.optionBtn} onClick={() => navigate('/celebrate')}>
            <span className={styles.optionIcon}>✓</span>
            <div className={styles.optionText}>
              <span className={styles.optionLabel}>I went</span>
              <span className={styles.optionSub}>I did my screening</span>
            </div>
          </button>

          <button className={styles.optionBtn} onClick={() => navigate('/home')}>
            <span className={styles.optionIcon}>→</span>
            <div className={styles.optionText}>
              <span className={styles.optionLabel}>I'm going soon</span>
              <span className={styles.optionSub}>Still planning to go</span>
            </div>
          </button>

          <button className={styles.optionBtn} onClick={() => navigate('/home')}>
            <span className={styles.optionIcon}>○</span>
            <div className={styles.optionText}>
              <span className={styles.optionLabel}>Not yet</span>
              <span className={styles.optionSub}>That's okay. Lumi will be here.</span>
            </div>
          </button>
        </div>
        </section>
      </div>
    </Layout>
  )
}

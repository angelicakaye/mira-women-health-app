import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Layout from '../../components/shared/Layout'
import PageHeader from '../../components/shared/PageHeader'
import Button from '../../components/shared/Button'
import clinics from '../../data/clinics.json'
import styles from './Mammogram.module.css'

function formatDateLabel(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-SG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

function formatTime(t) {
  if (!t) return ''
  const [h, m] = t.split(':')
  const hour = parseInt(h)
  const ampm = hour >= 12 ? 'pm' : 'am'
  const display = hour > 12 ? hour - 12 : hour
  return `${display}:${m} ${ampm}`
}

export default function BookingConfirm() {
  const { bookingDetails, userDetails, confirmBooking } = useApp()
  const navigate = useNavigate()
  const clinic = clinics.find(c => c.id === bookingDetails.clinicId)

  function handleConfirm() {
    confirmBooking()
    navigate('/mammogram/confirmed')
  }

  return (
    <Layout>
      <PageHeader title="Confirm your booking" />
      <div className={styles.page}>
        <div className={styles.confirmCard}>
          <div className={styles.confirmRow}>
            <span className={styles.confirmRowLabel}>Clinic</span>
            <span className={styles.confirmRowValue}>{clinic?.name}</span>
          </div>
          <div className={styles.confirmDivider} />
          <div className={styles.confirmRow}>
            <span className={styles.confirmRowLabel}>Name</span>
            <span className={styles.confirmRowValue}>{userDetails.fullName}</span>
          </div>
          <div className={styles.confirmDivider} />
          <div className={styles.confirmRow}>
            <span className={styles.confirmRowLabel}>Mobile</span>
            <span className={styles.confirmRowValue}>{userDetails.phone}</span>
          </div>
          <div className={styles.confirmDivider} />
          <div className={styles.confirmRow}>
            <span className={styles.confirmRowLabel}>Address</span>
            <span className={styles.confirmRowValue}>{clinic?.address}</span>
          </div>
          <div className={styles.confirmDivider} />
          <div className={styles.confirmRow}>
            <span className={styles.confirmRowLabel}>Date</span>
            <span className={styles.confirmRowValue}>{formatDateLabel(bookingDetails.date)}</span>
          </div>
          <div className={styles.confirmDivider} />
          <div className={styles.confirmRow}>
            <span className={styles.confirmRowLabel}>Time</span>
            <span className={styles.confirmRowValue}>{formatTime(bookingDetails.time)}</span>
          </div>
          <div className={styles.confirmDivider} />
          <div className={styles.confirmRow}>
            <span className={styles.confirmRowLabel}>Contact</span>
            <span className={styles.confirmRowValue}>{clinic?.phone}</span>
          </div>
        </div>

        <div className={styles.confirmCard}>
          <p style={{ fontSize: 13, color: '#72243E', fontWeight: 500, marginBottom: 10 }}>What to bring</p>
          <div className={styles.bringList}>
            {['Your NRIC', 'Comfortable, easy-to-remove top', 'Any referral letter (if applicable)'].map(item => (
              <div key={item} className={styles.bringItem}>
                <div className={styles.bringDot} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <Button variant="primary" size="lg" fullWidth onClick={handleConfirm}>
            Yes, book this
          </Button>
          <Button variant="text" size="md" onClick={() => navigate(-1)}>
            Change time
          </Button>
        </div>
      </div>
    </Layout>
  )
}

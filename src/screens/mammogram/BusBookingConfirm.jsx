import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Layout from '../../components/shared/Layout'
import PageHeader from '../../components/shared/PageHeader'
import Button from '../../components/shared/Button'
import styles from './Mammogram.module.css'

export default function BusBookingConfirm() {
  const { bookingDetails, userDetails, confirmBooking } = useApp()
  const navigate = useNavigate()

  function handleConfirm() {
    confirmBooking()
    navigate('/mammogram/confirmed')
  }

  return (
    <Layout>
      <PageHeader title="Confirm your visit" />
      <div className={styles.page}>
        <div className={styles.confirmCard}>
          <div className={styles.confirmRow}>
            <span className={styles.confirmRowLabel}>Location</span>
            <span className={styles.confirmRowValue}>{bookingDetails.location}</span>
          </div>
          <div className={styles.confirmDivider} />
          <div className={styles.confirmRow}>
            <span className={styles.confirmRowLabel}>Address</span>
            <span className={styles.confirmRowValue}>{bookingDetails.address}</span>
          </div>
          <div className={styles.confirmDivider} />
          <div className={styles.confirmRow}>
            <span className={styles.confirmRowLabel}>Dates</span>
            <span className={styles.confirmRowValue}>{bookingDetails.date}</span>
          </div>
          <div className={styles.confirmDivider} />
          <div className={styles.confirmRow}>
            <span className={styles.confirmRowLabel}>Hours</span>
            <span className={styles.confirmRowValue}>{bookingDetails.time}</span>
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
        </div>

        <div className={styles.confirmCard}>
          <p style={{ fontSize: 13, color: '#72243E', fontWeight: 500, marginBottom: 10 }}>What to bring</p>
          <div className={styles.bringList}>
            {['Your NRIC', 'Comfortable, easy-to-remove top', 'No appointment needed — just walk in'].map(item => (
              <div key={item} className={styles.bringItem}>
                <div className={styles.bringDot} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <Button variant="primary" size="lg" fullWidth onClick={handleConfirm}>
            Yes, I'll go here
          </Button>
          <Button variant="text" size="md" onClick={() => navigate(-1)}>
            Change details
          </Button>
        </div>
      </div>
    </Layout>
  )
}

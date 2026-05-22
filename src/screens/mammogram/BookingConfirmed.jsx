import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Layout from '../../components/shared/Layout'
import Lumi from '../../components/lumi/Lumi'
import Button from '../../components/shared/Button'
import clinics from '../../data/clinics.json'
import busSchedule from '../../data/busSchedule.json'
import styles from './Mammogram.module.css'

function fmtTime(t) {
  if (!t) return ''
  const [h, m] = t.split(':')
  const hour = parseInt(h)
  const ampm = hour >= 12 ? 'pm' : 'am'
  const display = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
  return `${display}:${m} ${ampm}`
}

export default function BookingConfirmed() {
  const { userName, bookingDetails } = useApp()
  const navigate = useNavigate()

  const isBus = bookingDetails.type === 'bus'
  const bus = busSchedule.find(b => b.id === bookingDetails.clinicId)
  const clinic = clinics.find(c => c.id === bookingDetails.clinicId)

  const locationName = isBus ? bus?.location : clinic?.name
  const when = isBus
    ? `${bookingDetails.date} · ${bookingDetails.time}`
    : `${bookingDetails.date ? new Date(bookingDetails.date).toLocaleDateString('en-SG', { weekday: 'short', day: 'numeric', month: 'short' }) : ''} · ${fmtTime(bookingDetails.time)}`

  return (
    <Layout>
      <div className={styles.confirmedPage}>
        <Lumi state="glowing" size={180} />

        <div>
          <h1 className={styles.confirmedTitle}>You're going, {userName}.</h1>
          <p className={styles.confirmedSub} style={{ marginTop: 12 }}>
            That took courage. Lumi is proud of you.
          </p>
        </div>

        <div className={styles.confirmedDetail}>
          <p className={styles.confirmedDetailLabel}>
            {isBus ? 'Where you&apos;re going' : 'Your appointment'}
          </p>
          <p className={styles.confirmedDetailVal}>{locationName}</p>
          {when && <p style={{ fontSize: 13, color: '#993556', marginTop: 3 }}>{when}</p>}
        </div>

        <p style={{ fontSize: 13, color: '#C090A8', textAlign: 'center', lineHeight: 1.65 }}>
          A woman who went before you said:<br />
          <em style={{ color: '#993556' }}>"I was nervous. The nurse was kind. It took 8 minutes. Then I ate laksa."</em>
        </p>

        <div className={styles.actions}>
          <Button variant="primary" size="lg" fullWidth onClick={() => navigate('/home')}>
            Back to home
          </Button>
        </div>
      </div>
    </Layout>
  )
}

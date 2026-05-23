import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Layout from '../../components/shared/Layout'
import Flower from '../../components/flower/Flower'
import Button from '../../components/shared/Button'
import polyclinics from '../../data/polyclinics.json'
import styles from '../mammogram/Mammogram.module.css'

function fmtDate(iso) {
  if (!iso) return ''
  return new Date(iso + 'T12:00:00').toLocaleDateString('en-SG', {
    weekday: 'long', day: 'numeric', month: 'long',
  })
}

function fmtTime(t) {
  if (!t) return ''
  const [h, m] = t.split(':')
  const hour = parseInt(h)
  return `${hour > 12 ? hour - 12 : hour}:${m} ${hour >= 12 ? 'pm' : 'am'}`
}

export default function PolyclinicConfirmed() {
  const { userName, bookingDetails, currentWeekFlower } = useApp()
  const navigate = useNavigate()

  const poly = polyclinics.find(p => p.id === bookingDetails.clinicId)
  const firstName = userName?.split(' ')[0] || userName || 'you'

  return (
    <Layout>
      <div className={styles.confirmedPage}>

        {/* Flower hero instead of Mira blob */}
        <div style={{ filter: 'drop-shadow(0 0 32px rgba(244,192,209,0.65))' }}>
          <Flower type={currentWeekFlower || 'rose'} waterCount={5} size={120} />
        </div>

        <div>
          <h1 className={styles.confirmedTitle}>You're booked, {firstName}.</h1>
          <p className={styles.confirmedSub} style={{ marginTop: 10 }}>
            That step took courage. Mira is proud of you.
          </p>
        </div>

        {/* Appointment details */}
        <div className={styles.confirmedDetail}>
          <p className={styles.confirmedDetailLabel}>Your appointment</p>
          <p className={styles.confirmedDetailVal}>{poly?.name}</p>
          {bookingDetails.date && (
            <p style={{ fontSize: 13.5, color: '#993556', marginTop: 5, fontWeight: 500 }}>
              {fmtDate(bookingDetails.date)} · {fmtTime(bookingDetails.time)}
            </p>
          )}
          <p style={{ fontSize: 12.5, color: '#C090A8', marginTop: 4, lineHeight: 1.55 }}>
            {poly?.address}
          </p>
        </div>

        {/* Whisper encouragement */}
        <p style={{
          fontSize: 13,
          color: '#B07090',
          textAlign: 'center',
          lineHeight: 1.7,
          fontStyle: 'italic',
          padding: '0 4px',
        }}>
          "I was nervous walking in. The doctor was gentle and I left feeling heard."
          <br />
          <span style={{ fontStyle: 'normal', fontSize: 12, fontWeight: 600, color: '#C090A8' }}>
            — Riya, 32
          </span>
        </p>

        <div className={styles.actions}>
          <Button variant="primary" size="lg" fullWidth onClick={() => navigate('/home')}>
            Back to home
          </Button>
          <Button variant="ghost" size="md" fullWidth onClick={() => navigate('/screening')}>
            View in screenings
          </Button>
        </div>

      </div>
    </Layout>
  )
}

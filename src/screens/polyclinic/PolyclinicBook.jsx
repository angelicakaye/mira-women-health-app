import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Layout from '../../components/shared/Layout'
import PageHeader from '../../components/shared/PageHeader'
import Button from '../../components/shared/Button'
import polyclinics from '../../data/polyclinics.json'
import styles from '../mammogram/Mammogram.module.css'

function formatDateLabel(iso) {
  return new Date(iso + 'T12:00:00').toLocaleDateString('en-SG', {
    weekday: 'short', day: 'numeric', month: 'short',
  })
}

function formatTime(t) {
  const [h, m] = t.split(':')
  const hour = parseInt(h)
  const ampm = hour >= 12 ? 'pm' : 'am'
  const display = hour > 12 ? hour - 12 : hour
  return `${display}:${m} ${ampm}`
}

export default function PolyclinicBook() {
  const { bookingDetails, setBookingDetails } = useApp()
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const navigate = useNavigate()

  const poly = polyclinics.find(p => p.id === bookingDetails.clinicId)

  if (!poly) {
    navigate('/polyclinic/choose', { replace: true })
    return null
  }

  const dates = Object.keys(poly.availableSlots).sort()
  const slots = selectedDate ? poly.availableSlots[selectedDate] : []

  function handleConfirm() {
    setBookingDetails({ date: selectedDate, time: selectedTime })
    navigate('/polyclinic/details')
  }

  return (
    <Layout>
      <PageHeader title={poly.name} />
      <div className={styles.page}>
        <p className={styles.subtitle} style={{ paddingTop: 0 }}>
          {poly.address}
        </p>

        <div className={styles.slotSection}>
          <p className={styles.slotLabel}>Choose a date</p>
          <div className={styles.dateGrid}>
            {dates.map(date => (
              <button
                key={date}
                className={`${styles.dateBtn} ${selectedDate === date ? styles.dateBtnSelected : ''}`}
                onClick={() => { setSelectedDate(date); setSelectedTime(null) }}
              >
                {formatDateLabel(date)}
              </button>
            ))}
          </div>
        </div>

        {selectedDate && (
          <div className={styles.slotSection}>
            <p className={styles.slotLabel}>Choose a time</p>
            <div className={styles.timeGrid}>
              {slots.map(t => (
                <button
                  key={t}
                  className={`${styles.timeBtn} ${selectedTime === t ? styles.timeBtnSelected : ''}`}
                  onClick={() => setSelectedTime(t)}
                >
                  {formatTime(t)}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className={styles.actions} style={{ marginTop: 'auto' }}>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            disabled={!selectedDate || !selectedTime}
            onClick={handleConfirm}
          >
            Continue
          </Button>
          <Button variant="text" size="md" onClick={() => navigate(-1)}>
            Choose a different polyclinic
          </Button>
        </div>
      </div>
    </Layout>
  )
}

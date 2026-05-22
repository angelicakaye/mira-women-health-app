import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Layout from '../../components/shared/Layout'
import PageHeader from '../../components/shared/PageHeader'
import Button from '../../components/shared/Button'
import clinics from '../../data/clinics.json'
import styles from './Mammogram.module.css'

function formatDateLabel(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-SG', { weekday: 'short', day: 'numeric', month: 'short' })
}

function formatTime(t) {
  const [h, m] = t.split(':')
  const hour = parseInt(h)
  const ampm = hour >= 12 ? 'pm' : 'am'
  const display = hour > 12 ? hour - 12 : hour
  return `${display}:${m}${ampm}`
}

export default function BookSlot() {
  const { bookingDetails, setBookingDetails } = useApp()
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const navigate = useNavigate()

  const clinic = clinics.find(c => c.id === bookingDetails.clinicId)

  if (!clinic) {
    navigate('/mammogram/clinic-list', { replace: true })
    return null
  }

  const dates = Object.keys(clinic.availableSlots).sort()
  const slots = selectedDate ? clinic.availableSlots[selectedDate] : []

  function handleConfirm() {
    setBookingDetails({ date: selectedDate, time: selectedTime })
    navigate('/mammogram/confirm')
  }

  return (
    <Layout>
      <PageHeader title={clinic.name} />
      <div className={styles.page}>
        <p className={styles.subtitle} style={{ paddingTop: 0 }}>
          {clinic.address}
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
            Confirm this time
          </Button>
          <Button variant="text" size="md" onClick={() => navigate(-1)}>
            Choose a different clinic
          </Button>
        </div>
      </div>
    </Layout>
  )
}

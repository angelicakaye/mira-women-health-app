import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Layout from '../../components/shared/Layout'
import PageHeader from '../../components/shared/PageHeader'
import Button from '../../components/shared/Button'
import polyclinics from '../../data/polyclinics.json'
import styles from '../mammogram/Mammogram.module.css'

function fmtDate(iso) {
  if (!iso) return ''
  return new Date(iso + 'T12:00:00').toLocaleDateString('en-SG', {
    weekday: 'short', day: 'numeric', month: 'short',
  })
}

function fmtTime(t) {
  if (!t) return ''
  const [h, m] = t.split(':')
  const hour = parseInt(h)
  return `${hour > 12 ? hour - 12 : hour}:${m} ${hour >= 12 ? 'pm' : 'am'}`
}

export default function PolyclinicDetails() {
  const { userName, bookingDetails, userDetails, setUserDetails, confirmBooking } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: userDetails.fullName || userName || '',
    phone: userDetails.phone || '91234567',
    email: userDetails.email || '',
    nric: userDetails.nric || '567B',
    birthYear: userDetails.birthYear || '1990',
  })

  const poly = polyclinics.find(p => p.id === bookingDetails.clinicId)

  useEffect(() => {
    if (!poly) navigate('/polyclinic/choose', { replace: true })
  }, [poly, navigate])

  const canSubmit =
    form.fullName.trim().length >= 2 &&
    form.phone.trim().length >= 8 &&
    form.nric.trim().length >= 4

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit) return
    setUserDetails(form)
    confirmBooking()
    navigate('/polyclinic/confirmed')
  }

  if (!poly) return null

  return (
    <Layout>
      <PageHeader title="Your details" />
      <form className={styles.page} onSubmit={handleSubmit}>

        <div className={styles.bookingIntro}>
          <p className={styles.subtitle} style={{ paddingTop: 0 }}>
            Saved locally in Mira only — never shared.
          </p>
          <div className={styles.selectedPlace}>
            <span>{poly.name}</span>
            <small>
              {fmtDate(bookingDetails.date)}
              {bookingDetails.date && bookingDetails.time ? ' · ' : ''}
              {fmtTime(bookingDetails.time)}
            </small>
          </div>
        </div>

        <div className={styles.formGrid}>
          <label className={styles.field}>
            <span>Full name</span>
            <input
              value={form.fullName}
              onChange={e => update('fullName', e.target.value)}
              autoComplete="name"
              placeholder="As in NRIC"
            />
          </label>

          <label className={styles.field}>
            <span>Mobile number</span>
            <input
              value={form.phone}
              onChange={e => update('phone', e.target.value)}
              inputMode="tel"
              autoComplete="tel"
              placeholder="9123 4567"
            />
          </label>

          <label className={styles.field}>
            <span>Email (optional)</span>
            <input
              value={form.email}
              onChange={e => update('email', e.target.value)}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
            />
          </label>

          <div className={styles.formRow}>
            <label className={styles.field}>
              <span>NRIC (last 4)</span>
              <input
                value={form.nric}
                onChange={e => update('nric', e.target.value.toUpperCase())}
                autoComplete="off"
                placeholder="567B"
                maxLength={9}
              />
            </label>
            <label className={styles.field}>
              <span>Birth year</span>
              <input
                value={form.birthYear}
                onChange={e => update('birthYear', e.target.value.replace(/\D/g, '').slice(0, 4))}
                inputMode="numeric"
                placeholder="1984"
                maxLength={4}
              />
            </label>
          </div>
        </div>

        <div className={styles.actions} style={{ marginTop: 'auto' }}>
          <Button variant="primary" size="lg" fullWidth disabled={!canSubmit} type="submit">
            Book appointment
          </Button>
          <Button variant="text" size="md" type="button" onClick={() => navigate(-1)}>
            Change date or time
          </Button>
        </div>
      </form>
    </Layout>
  )
}

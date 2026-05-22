import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Layout from '../../components/shared/Layout'
import PageHeader from '../../components/shared/PageHeader'
import Button from '../../components/shared/Button'
import clinics from '../../data/clinics.json'
import styles from './Mammogram.module.css'

export default function BookingDetails() {
  const { userName, bookingDetails, userDetails, setUserDetails } = useApp()
  const [form, setForm] = useState({
    fullName: userDetails.fullName || userName || '',
    phone: userDetails.phone || '',
    email: userDetails.email || '',
    nric: userDetails.nric || '',
    birthYear: userDetails.birthYear || '',
  })
  const navigate = useNavigate()

  const clinic = clinics.find(c => c.id === bookingDetails.clinicId)

  useEffect(() => {
    if (!clinic) navigate('/mammogram/clinic-list', { replace: true })
  }, [clinic, navigate])

  const canContinue =
    form.fullName.trim() &&
    form.phone.trim().length >= 8 &&
    form.email.includes('@') &&
    form.nric.trim().length >= 4 &&
    form.birthYear.trim().length === 4

  function updateField(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!canContinue) return
    setUserDetails(form)
    navigate('/mammogram/book')
  }

  if (!clinic) return null

  return (
    <Layout>
      <PageHeader title="Your details" />
      <form className={styles.page} onSubmit={handleSubmit}>
        <div className={styles.bookingIntro}>
          <p className={styles.subtitle} style={{ paddingTop: 0 }}>
            We only use this to hold the appointment locally in Mira.
          </p>
          <div className={styles.selectedPlace}>
            <span>{clinic.name}</span>
            <small>{clinic.location}</small>
          </div>
        </div>

        <div className={styles.formGrid}>
          <label className={styles.field}>
            <span>Full name</span>
            <input
              value={form.fullName}
              onChange={e => updateField('fullName', e.target.value)}
              autoComplete="name"
              placeholder="As in NRIC"
            />
          </label>

          <label className={styles.field}>
            <span>Mobile number</span>
            <input
              value={form.phone}
              onChange={e => updateField('phone', e.target.value)}
              inputMode="tel"
              autoComplete="tel"
              placeholder="9123 4567"
            />
          </label>

          <label className={styles.field}>
            <span>Email</span>
            <input
              value={form.email}
              onChange={e => updateField('email', e.target.value)}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
            />
          </label>

          <div className={styles.formRow}>
            <label className={styles.field}>
              <span>NRIC/FIN</span>
              <input
                value={form.nric}
                onChange={e => updateField('nric', e.target.value.toUpperCase())}
                autoComplete="off"
                placeholder="Last 4 chars"
                maxLength={9}
              />
            </label>

            <label className={styles.field}>
              <span>Birth year</span>
              <input
                value={form.birthYear}
                onChange={e => updateField('birthYear', e.target.value.replace(/\D/g, '').slice(0, 4))}
                inputMode="numeric"
                placeholder="1984"
                maxLength={4}
              />
            </label>
          </div>
        </div>

        <div className={styles.actions} style={{ marginTop: 'auto' }}>
          <Button variant="primary" size="lg" fullWidth disabled={!canContinue} type="submit">
            Continue to date and time
          </Button>
          <Button variant="text" size="md" type="button" onClick={() => navigate(-1)}>
            Choose another location
          </Button>
        </div>
      </form>
    </Layout>
  )
}

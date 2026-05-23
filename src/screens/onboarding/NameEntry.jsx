import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Layout from '../../components/shared/Layout'
import Mira from '../../components/mira/Mira'
import Button from '../../components/shared/Button'
import styles from './NameEntry.module.css'

const CURRENT_YEAR = new Date().getFullYear()

const MOODS = [
  { id: 'heavy', label: 'Heavy', emoji: '🌧' },
  { id: 'tired', label: 'Tired', emoji: '😴' },
  { id: 'okay', label: 'Okay', emoji: '🌿' },
  { id: 'good', label: 'Good', emoji: '🌸' },
  { id: 'bright', label: 'Bright', emoji: '✨' },
]

const MIRA_LINES = [
  "Hi, I'm Mira.",
  'Before we begin, privacy first.',
  'What would you like me to call you?',
  'What year were you born?',
  'How are you feeling today?',
  'Where are you in your cycle?',
]

export default function NameEntry() {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [mood, setMood] = useState('')
  const [lastPeriodDate, setLastPeriodDate] = useState('')
  const [currentlyOnPeriod, setCurrentlyOnPeriod] = useState(false)
  const [agreements, setAgreements] = useState({ privacy: false, data: false, terms: false })
  const { completeOnboarding } = useApp()
  const navigate = useNavigate()

  const trimmedName = name.trim()
  const numericBirthYear = Number(birthYear)
  const hasAgreed = agreements.privacy && agreements.data && agreements.terms
  const birthYearValid = birthYear.length === 4 && numericBirthYear >= 1920 && numericBirthYear <= CURRENT_YEAR
  const periodAnswered = currentlyOnPeriod || Boolean(lastPeriodDate)
  const canFinish = mood && periodAnswered

  const progressText = useMemo(() => `${step + 1} of 6`, [step])

  function toggleAgreement(key) {
    setAgreements(prev => ({ ...prev, [key]: !prev[key] }))
  }

  function finishOnboarding() {
    if (!canFinish) return
    completeOnboarding({
      name: trimmedName,
      birthYear,
      mood,
      lastPeriodDate,
      currentlyOnPeriod,
      agreements,
    })
    navigate('/home', { replace: true })
  }

  function skipForDemo() {
    completeOnboarding({
      name: 'Angel',
      birthYear: '1988',
      mood: 'okay',
      lastPeriodDate: '',
      currentlyOnPeriod: true,
      agreements: { privacy: true, data: true, terms: true },
    })
    navigate('/home', { replace: true })
  }

  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.progress}>{progressText}</div>

        <div className={styles.miraStage}>
          <Mira state={step === 4 ? 'glowing' : 'default'} size={step === 4 ? 124 : 112} />
          <div className={styles.miraBubble}>
            <p>{MIRA_LINES[step]}</p>
          </div>
        </div>

        {step === 0 && (
          <section className={styles.panel}>
            <div className={styles.copyBlock}>
              <h1 className={styles.title}>Mira helps you notice, reflect, and take gentle next steps for your health.</h1>
              <p className={styles.subtitle}>Women's health, one tiny habit at a time.</p>
            </div>
            <div className={styles.actions}>
              <Button variant="primary" size="lg" fullWidth onClick={() => setStep(1)}>
                Continue
              </Button>
              <button className={styles.demoSkip} onClick={skipForDemo} type="button">
                Skip for demo
              </button>
            </div>
          </section>
        )}

        {step === 1 && (
          <section className={styles.panel}>
            <div className={styles.copyBlock}>
              <p className={styles.kicker}>Before we begin</p>
              <h1 className={styles.title}>Your privacy comes first.</h1>
              <p className={styles.subtitle}>
                Your data is kept secure and confidential. Nothing is shared with external parties.
              </p>
            </div>

            <div className={styles.checkList}>
              <label className={styles.checkRow}>
                <input type="checkbox" checked={agreements.privacy} onChange={() => toggleAgreement('privacy')} />
                <span>I agree to the Privacy Policy.</span>
              </label>
              <label className={styles.checkRow}>
                <input type="checkbox" checked={agreements.data} onChange={() => toggleAgreement('data')} />
                <span>I understand Mira saves my wellness and booking details locally on this device.</span>
              </label>
              <label className={styles.checkRow}>
                <input type="checkbox" checked={agreements.terms} onChange={() => toggleAgreement('terms')} />
                <span>I agree to the Terms of Use.</span>
              </label>
            </div>

            <div className={styles.actions}>
              <Button variant="primary" size="lg" fullWidth disabled={!hasAgreed} onClick={() => setStep(2)}>
                I agree
              </Button>
              <Button variant="text" size="md" onClick={() => setStep(0)}>
                Back
              </Button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className={styles.panel}>
            <label className={styles.label} htmlFor="name">
              Preferred name
            </label>
            <input
              id="name"
              className={styles.input}
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              autoComplete="given-name"
              autoFocus
            />
            <div className={styles.actions}>
              <Button variant="primary" size="lg" fullWidth disabled={!trimmedName} onClick={() => setStep(3)}>
                Continue
              </Button>
              <Button variant="text" size="md" onClick={() => setStep(1)}>
                Back
              </Button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className={styles.panel}>
            <p className={styles.helperText}>
              This helps Mira keep screening guidance age-aware without asking for your full date of birth.
            </p>
            <label className={styles.label} htmlFor="birthYear">
              Year of birth
            </label>
            <input
              id="birthYear"
              className={styles.input}
              type="text"
              inputMode="numeric"
              placeholder="1988"
              maxLength={4}
              value={birthYear}
              onChange={e => setBirthYear(e.target.value.replace(/\D/g, '').slice(0, 4))}
            />
            <div className={styles.actions}>
              <Button variant="primary" size="lg" fullWidth disabled={!birthYearValid} onClick={() => setStep(4)}>
                Continue
              </Button>
              <Button variant="text" size="md" onClick={() => setStep(2)}>
                Back
              </Button>
            </div>
          </section>
        )}

        {step === 4 && (
          <section className={styles.panel}>
            <p className={styles.kicker}>Welcome, {trimmedName}</p>

            <div className={styles.moodGrid}>
              {MOODS.map(item => (
                <button
                  key={item.id}
                  className={`${styles.choiceButton} ${mood === item.id ? styles.choiceActive : ''}`}
                  onClick={() => setMood(item.id)}
                  type="button"
                >
                  <span className={styles.choiceEmoji}>{item.emoji}</span>
                  {item.label}
                </button>
              ))}
            </div>

            <input
              className={styles.input}
              value={mood && !MOODS.some(item => item.id === mood) ? mood : ''}
              onChange={e => setMood(e.target.value)}
              placeholder="or in your own words..."
              maxLength={80}
            />

            <div className={styles.actions}>
              <Button variant="primary" size="lg" fullWidth disabled={!mood} onClick={() => setStep(5)}>
                Continue
              </Button>
              <Button variant="text" size="md" onClick={() => setStep(3)}>
                Back
              </Button>
            </div>
          </section>
        )}

        {step === 5 && (
          <section className={styles.panel}>
            <p className={styles.kicker}>Almost there</p>
            <div className={styles.periodBox}>
              <button
                className={`${styles.periodToggle} ${currentlyOnPeriod ? styles.periodToggleActive : ''}`}
                onClick={() => setCurrentlyOnPeriod(prev => !prev)}
                type="button"
              >
                I'm currently on my period
              </button>

              <label className={styles.label} htmlFor="lastPeriod">
                Or when did your last period start?
              </label>
              <input
                id="lastPeriod"
                className={styles.input}
                type="date"
                value={lastPeriodDate}
                max={new Date().toISOString().slice(0, 10)}
                onChange={e => {
                  setLastPeriodDate(e.target.value)
                  if (e.target.value) setCurrentlyOnPeriod(false)
                }}
                disabled={currentlyOnPeriod}
              />
            </div>

            <div className={styles.actions}>
              <Button variant="primary" size="lg" fullWidth disabled={!periodAnswered} onClick={finishOnboarding}>
                Begin day 1
              </Button>
              <Button variant="text" size="md" onClick={() => setStep(4)}>
                Back
              </Button>
            </div>
          </section>
        )}

      </div>
    </Layout>
  )
}

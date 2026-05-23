import { useNavigate } from 'react-router-dom'
import Layout from '../../components/shared/Layout'
import PageHeader from '../../components/shared/PageHeader'
import styles from './PolyclinicInfo.module.css'

export default function PolyclinicInfo() {
  const navigate = useNavigate()

  return (
    <Layout>
      <PageHeader />
      <div className={styles.page}>

        <div className={styles.header}>
          <h1 className={styles.title}>See a polyclinic doctor</h1>
          <p className={styles.subtitle}>
            A gentle first step for any breast concern.
          </p>
        </div>

        <div className={styles.infoCard}>
          <p className={styles.infoText}>
            A doctor will examine you, listen to your concerns, and guide you on whether
            you need an ultrasound, mammogram, or specialist referral. You don't need to
            figure it out alone.
          </p>
        </div>

        <div className={styles.steps}>
          <div className={styles.stepRow}>
            <div className={styles.stepNum}>1</div>
            <p className={styles.stepLabel}>Book via the HealthHub app or call your nearest polyclinic</p>
          </div>
          <div className={styles.stepRow}>
            <div className={styles.stepNum}>2</div>
            <p className={styles.stepLabel}>Describe what you noticed — even small things are worth sharing</p>
          </div>
          <div className={styles.stepRow}>
            <div className={styles.stepNum}>3</div>
            <p className={styles.stepLabel}>Your doctor will guide you on next steps</p>
          </div>
        </div>

        <div className={styles.contactCard}>
          <div className={styles.contactRow}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={styles.contactIcon}>
              <rect x="2" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M2 7h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="6" cy="11" r="1" fill="currentColor"/>
              <circle cx="9" cy="11" r="1" fill="currentColor"/>
            </svg>
            <div>
              <p className={styles.contactLabel}>Book online</p>
              <p className={styles.contactValue}>HealthHub app or healthhub.sg</p>
            </div>
          </div>
          <div className={styles.contactDivider} />
          <div className={styles.contactRow}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={styles.contactIcon}>
              <path d="M3 3h4l1.5 4-2 1.5A10 10 0 0 0 11.5 13l1.5-2 4 1.5V16a2 2 0 0 1-2 2C5.4 18 0 12.6 0 5a2 2 0 0 1 2-2h1Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
            <div>
              <p className={styles.contactLabel}>Call the National Health Hotline</p>
              <p className={styles.contactValue}>1800 223 1313</p>
            </div>
          </div>
        </div>

        <div className={styles.actionCards}>
          <button
            className={styles.actionCard}
            onClick={() => window.open('https://www.healthhub.sg', '_blank')}
          >
            <div className={styles.actionCardIcon}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M3 8h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                <path d="M7 2v4M13 2v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                <path d="M7 12h2m-1-1v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className={styles.actionCardBody}>
              <p className={styles.actionCardTitle}>Book a polyclinic visit</p>
              <p className={styles.actionCardDesc}>Via HealthHub app · Subsidised rates</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={styles.actionCardChevron}>
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button
            className={styles.actionCard}
            onClick={() => navigate('/mammogram/bus-schedule')}
          >
            <div className={styles.actionCardIcon}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="5" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M2 9h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                <circle cx="5.5" cy="17" r="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <circle cx="14.5" cy="17" r="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M5.5 15v-2M14.5 15v-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
            <div className={styles.actionCardBody}>
              <p className={styles.actionCardTitle}>Mobile mammogram bus</p>
              <p className={styles.actionCardDesc}>Free · No referral needed</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={styles.actionCardChevron}>
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

      </div>
    </Layout>
  )
}

import { useNavigate } from 'react-router-dom'
import Layout from '../../components/shared/Layout'
import PageHeader from '../../components/shared/PageHeader'
import Button from '../../components/shared/Button'
import styles from './BSE.module.css'

export default function BSEIntro() {
  const navigate = useNavigate()

  return (
    <Layout>
      <PageHeader title="Breast self-examination" />
      <div className={styles.page}>
        <div className={styles.illustration}>
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <circle cx="60" cy="60" r="58" fill="#FEF0F5" stroke="#F4C0D1" strokeWidth="1.5"/>
            {/* Three step icons */}
            <circle cx="30" cy="60" r="14" fill="#F4C0D1" opacity="0.5"/>
            <circle cx="60" cy="60" r="14" fill="#F4C0D1" opacity="0.65"/>
            <circle cx="90" cy="60" r="14" fill="#F4C0D1" opacity="0.8"/>
            <text x="30" y="65" textAnchor="middle" fontSize="11" fill="#72243E" fontFamily="system-ui">1</text>
            <text x="60" y="65" textAnchor="middle" fontSize="11" fill="#72243E" fontFamily="system-ui">2</text>
            <text x="90" y="65" textAnchor="middle" fontSize="11" fill="#72243E" fontFamily="system-ui">3</text>
          </svg>
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>How to do a breast self-examination</h1>
          <p className={styles.body}>
            For women aged 20 and above, a monthly breast self-examination helps you become familiar with how your breasts normally look and feel — so you can notice any changes early.
          </p>

          <div className={styles.infoBox}>
            <p className={styles.infoText}>
              Best time: a few days after your period ends, when breasts are least tender.
            </p>
          </div>

          <div className={styles.steps}>
            {['Look', 'Touch', 'Check'].map((step, i) => (
              <div key={step} className={styles.stepRow}>
                <div className={styles.stepNum}>{i + 1}</div>
                <span className={styles.stepLabel}>{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <Button variant="primary" size="lg" fullWidth onClick={() => navigate('/bse/step1')}>
            Start the guide
          </Button>
          <Button variant="text" size="md" onClick={() => navigate(-1)}>
            I'll do this later
          </Button>
        </div>
      </div>
    </Layout>
  )
}

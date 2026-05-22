import { useNavigate } from 'react-router-dom'
import Layout from '../../components/shared/Layout'
import PageHeader from '../../components/shared/PageHeader'
import ProgressDots from '../../components/shared/ProgressDots'
import Button from '../../components/shared/Button'
import styles from './BSE.module.css'

export default function BSEStep2Touch() {
  const navigate = useNavigate()

  return (
    <Layout>
      <PageHeader title="Step 2 of 3" />
      <div className={styles.page}>
        <ProgressDots total={3} current={2} />

        <div className={styles.illustration}>
          <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
            <circle cx="70" cy="70" r="68" fill="#FEF0F5" stroke="#F4C0D1" strokeWidth="1.5"/>
            {/* Circular motion pattern */}
            <circle cx="70" cy="70" r="36" fill="none" stroke="#F4C0D1" strokeWidth="1.5" strokeDasharray="6 4"/>
            <circle cx="70" cy="70" r="22" fill="none" stroke="#F4C0D1" strokeWidth="1.5" strokeDasharray="5 3"/>
            <circle cx="70" cy="70" r="10" fill="none" stroke="#E8A0B8" strokeWidth="1.5"/>
            {/* Finger */}
            <ellipse cx="70" cy="34" rx="8" ry="12" fill="#F4C0D1" opacity="0.7"/>
            <path d="M70 46 Q70 58 78 62" stroke="#F4C0D1" strokeWidth="2" strokeLinecap="round" fill="none"/>
          </svg>
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>Touch</h1>
          <p className={styles.body}>
            Raise one arm. Use your other hand to feel your breast in circular motions.
          </p>
          <div className={styles.bulletList}>
            {[
              'Use the pads of your 3 middle fingers',
              'Apply light, then medium, then firm pressure',
              'Cover the entire breast and armpit area',
            ].map(item => (
              <div key={item} className={styles.bullet}>
                <div className={styles.bulletDot} />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className={styles.infoBox}>
            <p className={styles.infoText}>
              Many women find this easier in the shower.
            </p>
          </div>
        </div>

        <div className={styles.actions}>
          <Button variant="primary" size="lg" fullWidth onClick={() => navigate('/bse/step3')}>
            Next: Check
          </Button>
        </div>
      </div>
    </Layout>
  )
}

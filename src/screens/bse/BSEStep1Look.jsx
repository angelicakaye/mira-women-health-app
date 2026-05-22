import { useNavigate } from 'react-router-dom'
import Layout from '../../components/shared/Layout'
import PageHeader from '../../components/shared/PageHeader'
import ProgressDots from '../../components/shared/ProgressDots'
import Button from '../../components/shared/Button'
import styles from './BSE.module.css'

export default function BSEStep1Look() {
  const navigate = useNavigate()

  return (
    <Layout>
      <PageHeader title="Step 1 of 3" />
      <div className={styles.page}>
        <ProgressDots total={3} current={1} />

        <div className={styles.illustration}>
          <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
            <circle cx="70" cy="70" r="68" fill="#FEF0F5" stroke="#F4C0D1" strokeWidth="1.5"/>
            {/* Person standing, arms at sides */}
            <circle cx="70" cy="38" r="12" fill="#F4C0D1" opacity="0.7"/>
            <rect x="60" y="52" width="20" height="38" rx="6" fill="#F4C0D1" opacity="0.6"/>
            <rect x="42" y="54" width="16" height="8" rx="4" fill="#F4C0D1" opacity="0.4"/>
            <rect x="82" y="54" width="16" height="8" rx="4" fill="#F4C0D1" opacity="0.4"/>
            <rect x="62" y="90" width="8" height="22" rx="4" fill="#F4C0D1" opacity="0.5"/>
            <rect x="70" y="90" width="8" height="22" rx="4" fill="#F4C0D1" opacity="0.5"/>
            {/* Mirror frame */}
            <rect x="22" y="30" width="18" height="80" rx="4" fill="none" stroke="#E8A0B8" strokeWidth="1.5" strokeDasharray="4 3"/>
          </svg>
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>Look</h1>
          <p className={styles.body}>
            Stand in front of a mirror with your arms at your sides.
          </p>
          <div className={styles.bulletList}>
            {[
              'Changes in size, shape, or contour',
              'Dimpling, puckering, or bulging of the skin',
              'Changes in your nipples — direction or appearance',
            ].map(item => (
              <div key={item} className={styles.bullet}>
                <div className={styles.bulletDot} />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className={styles.lumiHint}>"Take your time. Just notice."</p>
        </div>

        <div className={styles.actions}>
          <Button variant="primary" size="lg" fullWidth onClick={() => navigate('/bse/step2')}>
            Next: Touch
          </Button>
        </div>
      </div>
    </Layout>
  )
}

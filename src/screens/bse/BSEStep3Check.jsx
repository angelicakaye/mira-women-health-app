import { useNavigate } from 'react-router-dom'
import Layout from '../../components/shared/Layout'
import PageHeader from '../../components/shared/PageHeader'
import ProgressDots from '../../components/shared/ProgressDots'
import Button from '../../components/shared/Button'
import styles from './BSE.module.css'

const LOOK_FOR = [
  'Hard lump or knot',
  'New thickness',
  'Nipple discharge',
  'Skin dimpling',
  'Redness or swelling',
  'Size or shape change',
]

export default function BSEStep3Check() {
  const navigate = useNavigate()

  return (
    <Layout>
      <PageHeader title="Step 3 of 3" />
      <div className={styles.page}>
        <ProgressDots total={3} current={3} />

        <div className={styles.illustration}>
          <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
            <circle cx="70" cy="70" r="68" fill="#FEF0F5" stroke="#F4C0D1" strokeWidth="1.5"/>
            {/* Person lying down */}
            <ellipse cx="70" cy="80" rx="45" ry="18" fill="#F4C0D1" opacity="0.35"/>
            <circle cx="28" cy="70" r="12" fill="#F4C0D1" opacity="0.7"/>
            <rect x="34" y="64" width="78" height="14" rx="7" fill="#F4C0D1" opacity="0.5"/>
            {/* Arm raised */}
            <ellipse cx="106" cy="52" rx="8" ry="18" fill="#F4C0D1" opacity="0.45" transform="rotate(-30 106 52)"/>
          </svg>
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>Check</h1>
          <p className={styles.body}>
            Lie down and repeat the touch examination with one arm raised.
          </p>
          <div className={styles.bulletList}>
            {[
              'Examine your entire breast from armpit to collarbone',
              'Use different levels of pressure',
              'Note anything that feels unusual',
            ].map(item => (
              <div key={item} className={styles.bullet}>
                <div className={styles.bulletDot} />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className={styles.content} style={{ gap: 10 }}>
            <p className={styles.body} style={{ fontWeight: 500, color: '#72243E', fontSize: 14 }}>
              What to look for:
            </p>
            <div className={styles.lookForGrid}>
              {LOOK_FOR.map(item => (
                <div key={item} className={styles.lookForItem}>{item}</div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Button variant="primary" size="lg" fullWidth onClick={() => navigate('/bse/complete')}>
            I'm done
          </Button>
        </div>
      </div>
    </Layout>
  )
}

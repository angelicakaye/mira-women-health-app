import { useNavigate } from 'react-router-dom'
import Layout from '../../components/shared/Layout'
import PageHeader from '../../components/shared/PageHeader'
import styles from './ScreeningChooser.module.css'

export default function ScreeningChooser() {
  const navigate = useNavigate()

  return (
    <Layout>
      <PageHeader />
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>Two ways to check in with yourself</h1>
          <p className={styles.subtitle}>
            Both matter. Both help. Choose what feels right today.
          </p>
        </div>

        <div className={styles.options}>
          {/* BSE Option */}
          <button className={styles.optionCard} onClick={() => navigate('/bse/intro')}>
            <div className={styles.optionIllustration}>
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="25" fill="#FEF0F5" stroke="#F4C0D1" strokeWidth="1.5"/>
                <path d="M26 18c-4 0-8 3-8 8 0 3 2 6 5 7.5V36h6v-2.5c3-1.5 5-4.5 5-7.5 0-5-4-8-8-8Z" fill="#F4C0D1" opacity="0.7"/>
                <path d="M22 34h8" stroke="#E8A0B8" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className={styles.optionBody}>
              <div className={styles.optionBadge}>Try this first</div>
              <h2 className={styles.optionTitle}>Breast self-examination</h2>
              <p className={styles.optionMeta}>At home · 5 minutes</p>
              <p className={styles.optionWhisper}>
                "I do this in the shower. It's private, it's mine."
                <span className={styles.optionAttrib}> — Sarah, 45</span>
              </p>
            </div>
            <div className={styles.optionArrow}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M6.5 4l5 5-5 5" stroke="#993556" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>

          {/* Mammogram Option */}
          <button className={styles.optionCard} onClick={() => navigate('/mammogram')}>
            <div className={styles.optionIllustration}>
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="25" fill="#FEF0F5" stroke="#F4C0D1" strokeWidth="1.5"/>
                <rect x="16" y="20" width="20" height="14" rx="3" fill="#F4C0D1" opacity="0.6"/>
                <rect x="20" y="16" width="12" height="6" rx="2" fill="#E8A0B8" opacity="0.7"/>
                <line x1="26" y1="20" x2="26" y2="34" stroke="#FAF9F7" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className={styles.optionBody}>
              <div className={`${styles.optionBadge} ${styles.optionBadgeSoft}`}>
                Recommended every 2 years (age 40+)
              </div>
              <h2 className={styles.optionTitle}>Mammogram screening</h2>
              <p className={styles.optionMeta}>Clinic or mobile bus · ~20 minutes</p>
              <p className={styles.optionWhisper}>
                "The nurse remembered my name. That helped."
                <span className={styles.optionAttrib}> — Priya, 52</span>
              </p>
            </div>
            <div className={styles.optionArrow}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M6.5 4l5 5-5 5" stroke="#993556" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>

        <p className={styles.footnote}>
          BSE helps you notice changes. Mammograms detect what you can't feel.<br />
          You can do one, both, or come back later.
        </p>
      </div>
    </Layout>
  )
}

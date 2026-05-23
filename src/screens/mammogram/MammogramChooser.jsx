import { useNavigate } from 'react-router-dom'
import Layout from '../../components/shared/Layout'
import PageHeader from '../../components/shared/PageHeader'
import styles from './Mammogram.module.css'

export default function MammogramChooser() {
  const navigate = useNavigate()

  return (
    <Layout>
      <PageHeader />
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>Find a place that feels right</h1>
          <p className={styles.subtitle}>
            You choose. We'll show you what's nearby.
          </p>
        </div>

        <div className={styles.options}>
          <button className={styles.optionCard} onClick={() => navigate('/mammogram/clinic-list')}>
            <div className={styles.optionIcon}>
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="21" fill="#FEF0F5" stroke="#F4C0D1" strokeWidth="1.5"/>
                <path d="M13 32V18a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14" stroke="#E8A0B8" strokeWidth="1.5" strokeLinecap="round"/>
                <rect x="18" y="25" width="8" height="7" rx="1" fill="#F4C0D1" opacity="0.6"/>
                <line x1="13" y1="32" x2="31" y2="32" stroke="#E8A0B8" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="22" cy="20" r="2.5" fill="#F4C0D1"/>
              </svg>
            </div>
            <div className={styles.optionBody}>
              <h2 className={styles.optionTitle}>Book at a clinic</h2>
              <p className={styles.optionDesc}>Private rooms, appointments available</p>
            </div>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={styles.arrow}>
              <path d="M6.5 4l5 5-5 5" stroke="#993556" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button className={styles.optionCard} onClick={() => navigate('/mammogram/bus-schedule')}>
            <div className={styles.optionIcon}>
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="21" fill="#FEF0F5" stroke="#F4C0D1" strokeWidth="1.5"/>
                <rect x="10" y="18" width="24" height="12" rx="3" fill="#F4C0D1" opacity="0.5"/>
                <rect x="10" y="18" width="24" height="6" rx="3" fill="#F4C0D1" opacity="0.7"/>
                <circle cx="15" cy="32" r="3" fill="#E8A0B8" opacity="0.8"/>
                <circle cx="29" cy="32" r="3" fill="#E8A0B8" opacity="0.8"/>
                <rect x="13" y="21" width="5" height="4" rx="1" fill="#FAF9F7" opacity="0.8"/>
                <rect x="20" y="21" width="5" height="4" rx="1" fill="#FAF9F7" opacity="0.8"/>
                <rect x="27" y="21" width="5" height="4" rx="1" fill="#FAF9F7" opacity="0.8"/>
              </svg>
            </div>
            <div className={styles.optionBody}>
              <h2 className={styles.optionTitle}>Mobile screening bus</h2>
              <p className={styles.optionDesc}>Community setting, walk-ins welcome</p>
            </div>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={styles.arrow}>
              <path d="M6.5 4l5 5-5 5" stroke="#993556" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <p className={styles.footnote}>
          Not today is always an option. Mira will be here when you're ready.
        </p>
      </div>
    </Layout>
  )
}

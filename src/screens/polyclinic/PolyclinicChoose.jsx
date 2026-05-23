import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Layout from '../../components/shared/Layout'
import PageHeader from '../../components/shared/PageHeader'
import polyclinics from '../../data/polyclinics.json'
import styles from '../mammogram/Mammogram.module.css'

function formatDate(iso) {
  return new Date(iso + 'T12:00:00').toLocaleDateString('en-SG', {
    weekday: 'short', day: 'numeric', month: 'short',
  })
}

export default function PolyclinicChoose() {
  const { setBookingDetails } = useApp()
  const navigate = useNavigate()

  function handlePick(poly) {
    setBookingDetails({ clinicId: poly.id, type: 'polyclinic', date: null, time: null })
    navigate('/polyclinic/book')
  }

  return (
    <Layout>
      <PageHeader title="Choose a polyclinic" />
      <div className={styles.page}>
        <p className={styles.subtitle} style={{ paddingTop: 0 }}>
          All polyclinics accept Medisave and CHAS. Subsidised rates apply.
        </p>

        <div className={styles.clinicList}>
          {polyclinics.map(poly => {
            const dates = Object.keys(poly.availableSlots).sort()
            const next = dates[0]
            return (
              <button key={poly.id} className={styles.clinicCard} onClick={() => handlePick(poly)}>
                <div className={styles.clinicHeader}>
                  <span className={styles.clinicName}>{poly.name}</span>
                  <span className={styles.clinicDistance}>{poly.distance}</span>
                </div>
                <div className={styles.clinicMeta}>
                  <span className={styles.clinicMetaRow}>{poly.address}</span>
                  {next && (
                    <span className={styles.clinicAvail}>Next available: {formatDate(next)}</span>
                  )}
                </div>
                <div className={styles.clinicTags}>
                  <span className={styles.tag}>{poly.cluster}</span>
                  <span className={`${styles.tag} ${styles.tagBCF}`}>Medisave · CHAS</span>
                </div>
              </button>
            )
          })}
        </div>

        <p className={styles.footnote}>
          Not sure which one? Pick the closest — they all offer the same care.
        </p>
      </div>
    </Layout>
  )
}

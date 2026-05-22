import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Layout from '../../components/shared/Layout'
import PageHeader from '../../components/shared/PageHeader'
import clinics from '../../data/clinics.json'
import styles from './Mammogram.module.css'

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-SG', { weekday: 'short', day: 'numeric', month: 'short' })
}

export default function ClinicList() {
  const { setBookingDetails } = useApp()
  const navigate = useNavigate()

  function handleSelect(clinic) {
    setBookingDetails({ clinicId: clinic.id, type: 'clinic', date: null, time: null })
    navigate('/mammogram/details')
  }

  return (
    <Layout>
      <PageHeader title="Nearby clinics" />
      <div className={styles.page}>
        <p className={styles.subtitle} style={{ paddingTop: 0 }}>
          All clinics below offer mammogram screening. Distances are approximate from Jurong West.
        </p>

        <div className={styles.clinicList}>
          {clinics.map(clinic => (
            <button key={clinic.id} className={styles.clinicCard} onClick={() => handleSelect(clinic)}>
              <div className={styles.clinicHeader}>
                <span className={styles.clinicName}>{clinic.name}</span>
                <span className={styles.clinicDistance}>{clinic.distance}</span>
              </div>

              <div className={styles.clinicMeta}>
                <span className={styles.clinicMetaRow}>{clinic.address}</span>
                <span className={styles.clinicMetaRow}>{clinic.hours}</span>
                <span className={styles.clinicAvail}>
                  Next available: {formatDate(clinic.nextAvailable)}
                </span>
              </div>

              <div className={styles.clinicTags}>
                {clinic.bcfPartner && (
                  <span className={`${styles.tag} ${styles.tagBCF}`}>BCF Partner</span>
                )}
                {clinic.accepts.map(a => (
                  <span key={a} className={styles.tag}>{a}</span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </Layout>
  )
}

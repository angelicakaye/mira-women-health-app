import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Layout from '../../components/shared/Layout'
import Mira from '../../components/mira/Mira'
import Button from '../../components/shared/Button'
import styles from './BSE.module.css'

export default function BSEComplete() {
  const { userName, logBse } = useApp()
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  function handleNormal() {
    logBse()
    navigate('/celebrate')
  }

  function handleNoticed() {
    setShowModal(true)
  }

  function handleBookPolyclinic() {
    logBse()
    navigate('/polyclinic')
  }

  function handleModalClose() {
    logBse()
    navigate('/home')
  }

  return (
    <Layout>
      <div className={styles.page} style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div className={styles.completionWrap}>
          <Mira state="glowing" size={180} />
          <h1 className={styles.completionTitle}>You did it, {userName}.</h1>
          <p className={styles.completionSub}>Five minutes for yourself. That's brave.</p>

          <div className={styles.branchButtons}>
            <p className={styles.branchLabel}>Did you notice anything unusual?</p>
            <Button variant="primary" size="lg" fullWidth onClick={handleNormal}>
              Everything felt normal
            </Button>
            <Button variant="soft" size="lg" fullWidth onClick={handleNoticed}>
              I noticed something different
            </Button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={handleModalClose}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Talk to a doctor first.</h2>
            <p className={styles.modalBody}>
              Most changes are not cancer. But noticing something is exactly the right instinct — please don't wait.
              A polyclinic doctor can examine you and recommend whether you need a mammogram or further tests.
            </p>
            <div className={styles.modalContact}>
              <p className={styles.modalContactLabel}>Breast Cancer Foundation Singapore</p>
              <p className={styles.modalContactNum}>6275 6443</p>
            </div>
            <Button variant="primary" size="lg" fullWidth onClick={handleBookPolyclinic}>
              Book a polyclinic appointment
            </Button>
            <Button variant="text" size="md" onClick={handleModalClose}>
              I'll do this later
            </Button>
          </div>
        </div>
      )}
    </Layout>
  )
}

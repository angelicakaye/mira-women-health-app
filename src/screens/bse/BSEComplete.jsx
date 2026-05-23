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
            <h2 className={styles.modalTitle}>Most changes are not cancer.</h2>
            <p className={styles.modalBody}>
              But it's always worth checking with your doctor. Please don't wait — the earlier you go, the better.
            </p>
            <div className={styles.modalContact}>
              <p className={styles.modalContactLabel}>Breast Cancer Foundation Singapore</p>
              <p className={styles.modalContactNum}>6275 6443</p>
            </div>
            <Button variant="primary" size="lg" fullWidth onClick={handleModalClose}>
              I'll make an appointment
            </Button>
          </div>
        </div>
      )}
    </Layout>
  )
}

import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Layout from '../../components/shared/Layout'
import PageHeader from '../../components/shared/PageHeader'
import Mira from '../../components/mira/Mira'
import Button from '../../components/shared/Button'
import styles from './Nudge.module.css'

export default function Nudge() {
  const { userName, dayCount, dismissNudge } = useApp()
  const navigate = useNavigate()

  function handleLearnMore() {
    navigate('/whispers')
  }

  function handleNotToday() {
    dismissNudge()
    navigate('/home')
  }

  return (
    <Layout>
      <PageHeader />
      <div className={styles.page}>
        <Mira state="glowing" size={130} />

        <div className={styles.content}>
          <p className={styles.prelude}>You've been showing up for yourself, {userName}.</p>
          <p className={styles.body}>
            {dayCount} days of noticing, resting, choosing yourself.
          </p>
          <p className={styles.body}>
            Some women, around now, start thinking about their next step.
          </p>
          <p className={styles.body} style={{ marginTop: 4 }}>
            No rush. Just... if you're curious.
          </p>
        </div>

        <div className={styles.actions}>
          <Button variant="primary" size="lg" fullWidth onClick={handleLearnMore}>
            I'm curious
          </Button>
          <Button variant="text" size="md" onClick={handleNotToday}>
            Not yet
          </Button>
        </div>

        <p className={styles.footnote}>
          Mira will be here whenever you're ready.
        </p>
      </div>
    </Layout>
  )
}

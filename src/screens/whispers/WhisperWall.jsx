import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Layout from '../../components/shared/Layout'
import PageHeader from '../../components/shared/PageHeader'
import WhisperCard from '../../components/cards/WhisperCard'
import Button from '../../components/shared/Button'
import Lumi from '../../components/lumi/Lumi'
import styles from './WhisperWall.module.css'
import whispers from '../../data/whispers.json'

function selectWhispers(dayCount) {
  const pool = dayCount >= 21
    ? whispers
    : whispers.filter(w => w.stage === 'early' || w.stage === 'mid')

  // Deterministic shuffle seeded by dayCount
  const arr = [...pool]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (dayCount * 31 + i * 17) % (i + 1)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr.slice(0, 4)
}

export default function WhisperWall() {
  const { dayCount, dismissNudge } = useApp()
  const navigate = useNavigate()
  const selected = selectWhispers(dayCount)

  function handleShowMe() {
    navigate('/screening')
  }

  function handleNotToday() {
    dismissNudge()
    navigate('/home')
  }

  return (
    <Layout>
      <PageHeader />
      <div className={styles.page}>
        <div className={styles.header}>
          <Lumi state="default" size={80} />
          <h1 className={styles.title}>Women who've been here</h1>
          <p className={styles.subtitle}>
            They left these words for you.
          </p>
        </div>

        <div className={styles.whispers}>
          {selected.map((w, i) => (
            <WhisperCard key={w.id} whisper={w} highlighted={i === 0} />
          ))}
        </div>

        <div className={styles.actions}>
          <Button variant="primary" size="lg" fullWidth onClick={handleShowMe}>
            Show me how
          </Button>
          <Button variant="text" size="md" onClick={handleNotToday}>
            Not today
          </Button>
        </div>
      </div>
    </Layout>
  )
}

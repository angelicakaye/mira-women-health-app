import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Layout from '../../components/shared/Layout'
import Lumi from '../../components/lumi/Lumi'
import Button from '../../components/shared/Button'
import styles from './Celebrate.module.css'

export default function Celebrate() {
  const { userName, contributeWhisper } = useApp()
  const [whisperText, setWhisperText] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (!whisperText.trim()) return
    contributeWhisper({ text: whisperText.trim(), date: new Date().toISOString() })
    setSubmitted(true)
  }

  return (
    <Layout>
      <div className={styles.page}>
        <Lumi state="glowing" size={160} />

        <div className={styles.content}>
          <h1 className={styles.title}>You did it, {userName}.</h1>
          <p className={styles.body}>
            You showed up for yourself. That matters more than you know.
          </p>
        </div>

        {!submitted ? (
          <div className={styles.whisperSection}>
            <div className={styles.whisperHeader}>
              <p className={styles.whisperPrompt}>
                Would you leave a whisper for the next woman?
              </p>
              <p className={styles.whisperHint}>
                She'll read it when she needs it most.
              </p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <textarea
                className={styles.textarea}
                placeholder="What would you tell a woman who's nervous about going..."
                value={whisperText}
                onChange={e => setWhisperText(e.target.value)}
                rows={4}
                maxLength={200}
              />
              <p className={styles.charCount}>{whisperText.length}/200</p>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={!whisperText.trim()}
              >
                Leave this whisper
              </Button>
            </form>

            <Button variant="text" size="md" onClick={() => navigate('/home')}>
              Maybe later
            </Button>
          </div>
        ) : (
          <div className={styles.thankYou}>
            <p className={styles.thankYouText}>
              Your whisper is in the wall now. Someone will find it.
            </p>
            <Button variant="primary" size="lg" fullWidth onClick={() => navigate('/home')}>
              Back to home
            </Button>
          </div>
        )}
      </div>
    </Layout>
  )
}

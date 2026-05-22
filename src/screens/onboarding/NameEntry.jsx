import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Layout from '../../components/shared/Layout'
import Lumi from '../../components/lumi/Lumi'
import Button from '../../components/shared/Button'
import styles from './NameEntry.module.css'

export default function NameEntry() {
  const [name, setName] = useState('')
  const { setUserName } = useApp()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    setUserName(trimmed)
    navigate('/home', { replace: true })
  }

  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.top}>
          <Lumi state="default" size={120} />
          <h1 className={styles.title}>Meet Lumi</h1>
          <p className={styles.subtitle}>
            She'll walk beside you. Gently. Daily.<br />Without pushing.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="name">
            What shall we call you?
          </label>
          <input
            id="name"
            className={styles.input}
            type="text"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            autoComplete="given-name"
            autoFocus
          />
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={!name.trim()}
          >
            Let's begin
          </Button>
        </form>

        <p className={styles.footnote}>No sign-up. No account. Just you and Lumi.</p>
      </div>
    </Layout>
  )
}

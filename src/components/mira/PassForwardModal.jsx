import { useRef, useState } from 'react'
import { useApp } from '../../context/AppContext'
import Flower from '../flower/Flower'
import styles from './PassForwardModal.module.css'

export default function PassForwardModal({ onClose }) {
  const { currentWeekFlower, flowerType, addPassedWhisper, triggerWhisperPulse } = useApp()
  const [text, setText] = useState('')
  const [animating, setAnimating] = useState(false)
  const textareaRef = useRef(null)

  function handleInput(e) {
    setText(e.target.value)
    const el = e.target
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 96) + 'px'
  }

  function handleSkip() {
    onClose?.()
  }

  function handlePassForward() {
    if (!text.trim()) { onClose?.(); return }
    setAnimating(true)
    setTimeout(() => {
      addPassedWhisper(text.trim())
      triggerWhisperPulse()
      onClose?.()
    }, 700)
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.stage}>

        {/* ── Flower — never scrolls ── */}
        <div className={styles.flowerWrap}>
          <Flower type={currentWeekFlower || flowerType || 'rose'} waterCount={5} size={100} />
          <span className={styles.sparkleOne} />
          <span className={styles.sparkleTwo} />
        </div>

        {/* ── Scrollable content ── */}
        <div className={styles.content}>
          <div className={styles.bubble}>
            <h1>You showed up for yourself today.</h1>
          </div>
          <p className={styles.counter}>
            You're the <strong>48th</strong> woman to do this this month.
          </p>
          <p className={styles.prompt}>
            Would you like to leave something for the next woman?
          </p>
          <div className={`${styles.textareaWrap} ${animating ? styles.flyOut : ''}`}>
            <textarea
              ref={textareaRef}
              className={styles.textarea}
              placeholder="Type a few words…"
              value={text}
              onChange={handleInput}
              onInput={handleInput}
              rows={1}
              maxLength={280}
            />
          </div>
        </div>

        {/* ── Sticky action bar ── */}
        <div className={styles.actions}>
          <button className={styles.passBtn} onClick={handlePassForward} disabled={animating}>
            Pass it forward
          </button>
          <button className={styles.skipBtn} onClick={handleSkip} disabled={animating}>
            Skip
          </button>
        </div>

      </div>
    </div>
  )
}

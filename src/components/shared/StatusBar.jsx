import { useState, useEffect } from 'react'
import styles from './StatusBar.module.css'

function getTime() {
  const d = new Date()
  const h = d.getHours().toString().padStart(2, '0')
  const m = d.getMinutes().toString().padStart(2, '0')
  return `${h}:${m}`
}

const SignalIcon = () => (
  <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
    <rect x="0" y="7" width="3" height="5" rx="0.8" opacity="1"/>
    <rect x="4.5" y="4.5" width="3" height="7.5" rx="0.8" opacity="1"/>
    <rect x="9" y="2" width="3" height="10" rx="0.8" opacity="1"/>
    <rect x="13.5" y="0" width="3" height="12" rx="0.8" opacity="0.35"/>
  </svg>
)

const WifiIcon = () => (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
    <path d="M8 9.5a1.2 1.2 0 1 1 0 2.4A1.2 1.2 0 0 1 8 9.5Z" fill="currentColor"/>
    <path d="M4.5 6.8C5.5 5.8 6.7 5.2 8 5.2s2.5.6 3.5 1.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
    <path d="M1.5 3.8C3.2 2.1 5.5 1 8 1s4.8 1.1 6.5 2.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.45"/>
  </svg>
)

const BatteryIcon = () => (
  <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
    <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1"/>
    <rect x="2" y="2" width="16" height="8" rx="1.5" fill="currentColor"/>
    <path d="M23 4v4a1.5 1.5 0 0 0 0-4Z" fill="currentColor" opacity="0.4"/>
  </svg>
)

export default function StatusBar() {
  const [time, setTime] = useState(getTime)

  useEffect(() => {
    const id = setInterval(() => setTime(getTime()), 15000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className={styles.bar}>
      <span className={styles.time}>{time}</span>
      <div className={styles.icons}>
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </div>
    </div>
  )
}

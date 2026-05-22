import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import styles from './CycleTracker.module.css'

const FLOW_OPTIONS = [
  { id: 'none',      label: 'None',      color: '#C090A8' },
  { id: 'spotting',  label: 'Spotting',  color: '#E8A0B8' },
  { id: 'light',     label: 'Light',     color: '#D4708C' },
  { id: 'medium',    label: 'Medium',    color: '#B83A60' },
  { id: 'heavy',     label: 'Heavy',     color: '#8C1A3C' },
]

const SYMPTOMS = [
  { id: 'cramps',   label: 'Cramps' },
  { id: 'bloating', label: 'Bloating' },
  { id: 'fatigue',  label: 'Fatigue' },
  { id: 'mood',     label: 'Mood changes' },
  { id: 'headache', label: 'Headache' },
  { id: 'backpain', label: 'Back pain' },
  { id: 'tender',   label: 'Tender breasts' },
  { id: 'spotting', label: 'Spotting' },
]

export default function CycleTracker() {
  const { today, cycleDetails, logCycleDay } = useApp()
  const [expanded, setExpanded] = useState(false)

  const todayData = cycleDetails?.[today] || {}
  const hasFlow = todayData.flow && todayData.flow !== 'none'
  const symptoms = todayData.symptoms || []
  const currentFlow = FLOW_OPTIONS.find(f => f.id === todayData.flow)

  function toggleSymptom(id) {
    const next = symptoms.includes(id)
      ? symptoms.filter(s => s !== id)
      : [...symptoms, id]
    logCycleDay(today, { flow: todayData.flow || 'none', symptoms: next })
  }

  function setFlow(id) {
    logCycleDay(today, { flow: id, symptoms })
  }

  const summaryText = hasFlow
    ? `${currentFlow?.label || ''} flow${symptoms.length > 0 ? ` · ${symptoms.length} symptom${symptoms.length > 1 ? 's' : ''}` : ''}`
    : symptoms.length > 0
    ? `${symptoms.length} symptom${symptoms.length > 1 ? 's' : ''} logged`
    : 'Nothing logged yet'

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.iconWrap}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="9" r="3.5" stroke="#993556" strokeWidth="1.5" fill="none"/>
              <path d="M8 5.5V2.5M6.5 4h3" stroke="#993556" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <p className={styles.title}>Cycle</p>
            <p className={styles.summary}>{summaryText}</p>
          </div>
        </div>
        <button className={styles.expandBtn} onClick={() => setExpanded(v => !v)}>
          {expanded ? 'Done' : (hasFlow || symptoms.length > 0 ? 'Edit' : 'Log')}
        </button>
      </div>

      {expanded && (
        <div className={styles.body}>
          {/* Flow */}
          <div className={styles.group}>
            <p className={styles.groupLabel}>Flow</p>
            <div className={styles.flowRow}>
              {FLOW_OPTIONS.map(f => (
                <button
                  key={f.id}
                  className={`${styles.flowBtn} ${todayData.flow === f.id ? styles.flowActive : ''}`}
                  style={todayData.flow === f.id ? { background: f.color, borderColor: f.color, color: '#fff' } : {}}
                  onClick={() => setFlow(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Symptoms */}
          <div className={styles.group}>
            <p className={styles.groupLabel}>Symptoms</p>
            <div className={styles.symptomsGrid}>
              {SYMPTOMS.map(s => (
                <button
                  key={s.id}
                  className={`${styles.symptomChip} ${symptoms.includes(s.id) ? styles.symptomActive : ''}`}
                  onClick={() => toggleSymptom(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

import { useApp } from '../../context/AppContext'
import Flower from '../flower/Flower'
import styles from './MiraLetter.module.css'
import { MIRA_LETTER } from '../../data/miraCopy'

export default function MiraLetter({ onClose }) {
  const { markLetterSeen, flowerType, currentWeekFlower } = useApp()

  function handleKeep() {
    markLetterSeen()
    onClose?.()
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.sheet}>
        <div className={styles.flowerWrap}>
          <Flower type={currentWeekFlower || flowerType || 'rose'} waterCount={4} size={120} />
        </div>

        <div className={styles.letterWrap}>
          <p className={styles.title}>{MIRA_LETTER.title}</p>
          {MIRA_LETTER.paragraphs.map((para, i) => (
            <p key={i} className={styles.para}>{para}</p>
          ))}
          <p className={styles.sign}>{MIRA_LETTER.sign}</p>
        </div>

        <button className={styles.keepBtn} onClick={handleKeep}>
          Keep it
        </button>
        <p className={styles.hint}>Saved to Whispers</p>
      </div>
    </div>
  )
}

import styles from './Card.module.css'

export default function Card({ children, className = '', onClick, variant = 'default' }) {
  const cls = [styles.card, styles[variant], onClick ? styles.clickable : '', className].filter(Boolean).join(' ')
  return (
    <div className={cls} onClick={onClick} role={onClick ? 'button' : undefined}>
      {children}
    </div>
  )
}

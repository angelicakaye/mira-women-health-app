import { useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import BottomNav from './BottomNav'
import StatusBar from './StatusBar'
import DevDayPicker from '../dev/DevDayPicker'
import styles from './Layout.module.css'

const L1_PATHS = ['/home', '/whispers', '/screening', '/account']

function shouldShowNav(pathname, userName) {
  if (!userName) return false
  return L1_PATHS.includes(pathname)
}

export default function Layout({ children, className = '' }) {
  const { userName } = useApp()
  const location = useLocation()
  const showNav = shouldShowNav(location.pathname, userName)

  return (
    <div className={styles.shell}>
      <aside className={styles.sidePanel}>
        <DevDayPicker />
      </aside>
      <div className={`${styles.container} ${className}`}>
        <StatusBar />
        <div className={styles.content}>
          {children}
          {showNav && <div className={styles.navSpacer} />}
        </div>
        {showNav && <BottomNav />}
      </div>
    </div>
  )
}

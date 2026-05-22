import { useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import BottomNav from './BottomNav'
import StatusBar from './StatusBar'
import styles from './Layout.module.css'

const NO_NAV_PATHS = ['/onboarding', '/bse/step', '/mammogram/details', '/mammogram/book', '/mammogram/confirm']

function shouldShowNav(pathname, userName) {
  if (!userName) return false
  if (pathname === '/') return false
  return !NO_NAV_PATHS.some(p => pathname.startsWith(p))
}

export default function Layout({ children, className = '' }) {
  const { userName } = useApp()
  const location = useLocation()
  const showNav = shouldShowNav(location.pathname, userName)

  return (
    <div className={styles.shell}>
      <div className={`${styles.container} ${className}`}>
        <StatusBar />
        <div className={`${styles.content} ${showNav ? styles.withNav : ''}`}>
          {children}
        </div>
        {showNav && <BottomNav />}
      </div>
    </div>
  )
}

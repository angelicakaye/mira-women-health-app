import { useLocation, useNavigate } from 'react-router-dom'
import Lumi from '../lumi/Lumi'
import styles from './BottomNav.module.css'

/* ── Tab icons ── */

const WhispersIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    {active ? (
      <>
        <path d="M4 4h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H7l-4 3V5a1 1 0 0 1 1-1Z"
          fill="#C47B9A" stroke="#C47B9A" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M8 9h6M8 12h4" stroke="#FAF9F7" strokeWidth="1.4" strokeLinecap="round"/>
      </>
    ) : (
      <>
        <path d="M4 4h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H7l-4 3V5a1 1 0 0 1 1-1Z"
          fill="none" stroke="#C090A8" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M8 9h6M8 12h4" stroke="#C090A8" strokeWidth="1.4" strokeLinecap="round"/>
      </>
    )}
  </svg>
)

const ScreeningIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    {active ? (
      <>
        <rect x="3" y="5" width="16" height="15" rx="2"
          fill="#C47B9A" stroke="#C47B9A" strokeWidth="1.4"/>
        <path d="M7 2v4M15 2v4M3 10h16" stroke="#FAF9F7" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7.5 14.5l2 2 4-4" stroke="#FAF9F7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    ) : (
      <>
        <rect x="3" y="5" width="16" height="15" rx="2"
          fill="none" stroke="#C090A8" strokeWidth="1.6"/>
        <path d="M7 2v4M15 2v4M3 10h16" stroke="#C090A8" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M7.5 14.5l2 2 4-4" stroke="#C090A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    )}
  </svg>
)

const YouIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    {active ? (
      <>
        <circle cx="11" cy="8" r="3.5" fill="#C47B9A" stroke="#C47B9A" strokeWidth="1.2"/>
        <path d="M4 19c0-3.866 3.134-7 7-7h0c3.866 0 7 3.134 7 7"
          stroke="#C47B9A" strokeWidth="1.8" strokeLinecap="round"/>
      </>
    ) : (
      <>
        <circle cx="11" cy="8" r="3.5" fill="none" stroke="#C090A8" strokeWidth="1.6"/>
        <path d="M4 19c0-3.866 3.134-7 7-7h0c3.866 0 7 3.134 7 7"
          stroke="#C090A8" strokeWidth="1.6" strokeLinecap="round"/>
      </>
    )}
  </svg>
)

const ALL_TABS = [
  { id: 'today',     label: 'Today',     path: '/home' },
  { id: 'whispers',  label: 'Whispers',  path: '/whispers',  Icon: WhispersIcon },
  { id: 'screening', label: 'Screening', path: '/screening', Icon: ScreeningIcon },
  { id: 'you',       label: 'You',       path: '/account',   Icon: YouIcon },
]

const PATH_TAB_MAP = {
  '/home':      'today',
  '/nudge':     'today',
  '/whispers':  'whispers',
  '/screening': 'screening',
  '/bse':       'screening',
  '/mammogram': 'screening',
  '/checkin':   'you',
  '/celebrate': 'today',
  '/account':   'you',
}

function getActiveTab(pathname) {
  for (const [prefix, tab] of Object.entries(PATH_TAB_MAP)) {
    if (pathname.startsWith(prefix)) return tab
  }
  return 'today'
}

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const activeTab = getActiveTab(location.pathname)

  return (
    <nav className={styles.nav}>
      {ALL_TABS.map(({ id, label, path, Icon }) => {
        const active = activeTab === id
        return (
          <button
            key={id}
            className={`${styles.tab} ${active ? styles.tabActive : ''}`}
            onClick={() => navigate(path)}
            aria-label={label}
            aria-current={active ? 'page' : undefined}
          >
            {id === 'today'
              ? <div className={styles.lumiWrap}><Lumi state={active ? 'glowing' : 'default'} size={32} /></div>
              : <Icon active={active} />
            }
            <span className={styles.label}>{label}</span>
          </button>
        )
      })}
    </nav>
  )
}

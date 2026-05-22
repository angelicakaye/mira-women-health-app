import { useLocation, useNavigate } from 'react-router-dom'
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

const JournalIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    {active ? (
      <>
        <path d="M11 3C7.5 3.5 4 6.5 4 11c0 3.9 3.1 7 7 7 3.9 0 7-3.1 7-7C18 6 14.5 3 11 3z"
          fill="#C47B9A"/>
        <path d="M11 7v4l2.5 2.5" stroke="#FAF9F7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    ) : (
      <>
        <path d="M11 3C7.5 3.5 4 6.5 4 11c0 3.9 3.1 7 7 7 3.9 0 7-3.1 7-7C18 6 14.5 3 11 3z"
          fill="none" stroke="#C090A8" strokeWidth="1.6"/>
        <path d="M11 7v4l2.5 2.5" stroke="#C090A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

/* ── Lumi centre illustration ── */
const LumiMini = ({ active }) => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    {/* outer blob */}
    <path
      d="M16 4C11 4.5 4 10 4 16c0 6.6 5.4 12 12 12 6.6 0 12-5.4 12-12C28 9 22.5 4 16 4z"
      fill={active ? 'rgba(255,255,255,0.25)' : 'rgba(228,168,196,0.35)'}
    />
    {/* mid blob */}
    <path
      d="M16 8C12 8 8 12 8 16c0 4.4 3.6 8 8 8 4.4 0 8-3.6 8-8 0-4.5-3.5-8-8-8z"
      fill={active ? 'rgba(255,255,255,0.55)' : 'rgba(228,168,196,0.6)'}
    />
    {/* core */}
    <circle cx="16" cy="16" r="5"
      fill={active ? 'rgba(255,255,255,0.92)' : 'rgba(220,148,180,0.85)'}
    />
  </svg>
)

const SIDE_TABS_LEFT = [
  { id: 'whispers', label: 'Whispers', path: '/whispers', Icon: WhispersIcon },
  { id: 'screening', label: 'Screening', path: '/screening', Icon: ScreeningIcon },
]

const SIDE_TABS_RIGHT = [
  { id: 'journal', label: 'Journey', path: '/checkin', Icon: JournalIcon },
  { id: 'you', label: 'You', path: '/account', Icon: YouIcon },
]

const PATH_TAB_MAP = {
  '/home':      'today',
  '/nudge':     'today',
  '/whispers':  'whispers',
  '/screening': 'screening',
  '/bse':       'screening',
  '/mammogram': 'screening',
  '/checkin':   'journal',
  '/celebrate': 'journal',
  '/account':   'you',
}

function getActiveTab(pathname) {
  for (const [prefix, tab] of Object.entries(PATH_TAB_MAP)) {
    if (pathname.startsWith(prefix)) return tab
  }
  return 'today'
}

function SideTab({ id, label, path, Icon, active, navigate }) {
  return (
    <button
      className={`${styles.tab} ${active ? styles.tabActive : ''}`}
      onClick={() => navigate(path)}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
    >
      <Icon active={active} />
      <span className={styles.label}>{label}</span>
    </button>
  )
}

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const activeTab = getActiveTab(location.pathname)
  const lumiActive = activeTab === 'today'

  return (
    <nav className={styles.nav}>
      {SIDE_TABS_LEFT.map(t => (
        <SideTab key={t.id} {...t} active={activeTab === t.id} navigate={navigate} />
      ))}

      {/* Centre Lumi button */}
      <div className={styles.centerWrap}>
        <button
          className={`${styles.centerBtn} ${lumiActive ? styles.centerActive : ''}`}
          onClick={() => navigate('/home')}
          aria-label="Today's check-in"
        >
          <LumiMini active={lumiActive} />
        </button>
        <span className={`${styles.label} ${lumiActive ? styles.labelActive : ''}`}>
          Today
        </span>
      </div>

      {SIDE_TABS_RIGHT.map(t => (
        <SideTab key={t.id} {...t} active={activeTab === t.id} navigate={navigate} />
      ))}
    </nav>
  )
}

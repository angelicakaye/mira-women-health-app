import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'mira_state'
const STORAGE_PREFIX = 'mira_'
const RESET_ON_REFRESH_IN_DEV = true

const defaultState = {
  userName: null,
  installDate: null,
  userGoal: null,           // 'support' | 'screening'
  habitLogs: {},
  cardResponses: {},
  periodLogs: [],           // ISO date strings when period was logged
  cycleDetails: {},         // { [date]: { flow: string, symptoms: string[] } }
  bseLogs: [],              // ISO date strings when BSE was completed
  flowerType: 'rose',       // 'rose' | 'peony' | 'lily'
  flowerPicks: {},          // { [weekNum]: 'rose' | 'peony' | 'lily' }
  screeningCompleted: false,
  screeningType: null,
  bookingDetails: { clinicId: null, date: null, time: null, type: null },
  userDetails: { fullName: '', phone: '', email: '', nric: '', birthYear: '' },
  onboardingAgreements: { privacy: false, data: false, terms: false },
  lastPeriodDate: null,
  bookings: [],
  whispersContributed: [],
  whisperReactions: {},     // { [whisperId]: ['heart', 'spark', ...] }
  nudgeDismissedAt: null,
  checkinNudgeDone: false,  // Day 21 screening check-in nudge
  moodLog: {},              // { [date]: mood string }
  letterSeenDay7: false,
  bseReminderChoice: null,
  screeningNudgeResponse: null,  // 'ready' | 'later' | null
  weekCheckIns: {},  // { [weekNum]: { mood, focus, flower } }
}

function loadState() {
  try {
    if (import.meta.env.DEV && RESET_ON_REFRESH_IN_DEV) {
      Object.keys(localStorage)
        .filter(key => key === STORAGE_KEY || key.startsWith(STORAGE_PREFIX))
        .forEach(key => localStorage.removeItem(key))
      return defaultState
    }

    const raw = localStorage.getItem(STORAGE_KEY)
    const state = raw ? { ...defaultState, ...JSON.parse(raw) } : { ...defaultState }

    Object.keys(defaultState).forEach(key => {
      const stored = localStorage.getItem(`${STORAGE_PREFIX}${key}`)
      if (stored === null) return

      try {
        state[key] = JSON.parse(stored)
      } catch {
        state[key] = stored
      }
    })

    return state
  } catch {
    return defaultState
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    Object.entries(state).forEach(([key, value]) => {
      localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value))
    })
  } catch {}
}

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

function daysBetween(dateA, dateB) {
  const msPerDay = 86400000
  return Math.floor((new Date(dateB) - new Date(dateA)) / msPerDay)
}

export const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [state, setState] = useState(loadState)

  useEffect(() => {
    saveState(state)
  }, [state])

  const update = useCallback((patch) => {
    setState(prev => {
      const next = { ...prev, ...patch }
      saveState(next)
      return next
    })
  }, [])

  // Actions
  const setUserName = useCallback((name) => {
    setState(prev => {
      const next = { ...prev, userName: name, installDate: prev.installDate || todayISO() }
      saveState(next)
      return next
    })
  }, [])

  const completeOnboarding = useCallback(({ name, birthYear, mood, lastPeriodDate, currentlyOnPeriod, agreements }) => {
    setState(prev => {
      const today = todayISO()
      const trimmedName = name.trim()
      const nextPeriodLogs = currentlyOnPeriod && !(prev.periodLogs || []).includes(today)
        ? [...(prev.periodLogs || []), today]
        : (prev.periodLogs || [])

      const next = {
        ...prev,
        userName: trimmedName,
        installDate: prev.installDate || today,
        userDetails: {
          ...prev.userDetails,
          fullName: prev.userDetails.fullName || trimmedName,
          birthYear,
        },
        onboardingAgreements: agreements,
        lastPeriodDate: currentlyOnPeriod ? today : lastPeriodDate,
        periodLogs: nextPeriodLogs,
        cycleDetails: currentlyOnPeriod
          ? {
              ...prev.cycleDetails,
              [today]: { flow: 'unspecified', symptoms: [] },
            }
          : prev.cycleDetails,
        moodLog: {
          ...prev.moodLog,
          [today]: mood,
        },
      }
      saveState(next)
      return next
    })
  }, [])

  const setUserGoal = useCallback((goal) => {
    update({ userGoal: goal })
  }, [update])

  const setFlowerType = useCallback((type) => {
    update({ flowerType: type })
  }, [update])

  const setWeekFlower = useCallback((weekNum, type) => {
    setState(prev => {
      const next = {
        ...prev,
        flowerType: type,
        flowerPicks: { ...prev.flowerPicks, [weekNum]: type },
      }
      saveState(next)
      return next
    })
  }, [])

  const logHabit = useCallback((date, habit) => {
    setState(prev => {
      const dayLog = prev.habitLogs[date] || { water: false, sleep: false, movement: false, selfCare: false }
      const next = {
        ...prev,
        habitLogs: { ...prev.habitLogs, [date]: { ...dayLog, [habit]: true } }
      }
      saveState(next)
      return next
    })
  }, [])

  const respondToCard = useCallback((date, response) => {
    setState(prev => {
      const next = {
        ...prev,
        cardResponses: { ...prev.cardResponses, [date]: response }
      }
      saveState(next)
      return next
    })
  }, [])

  const completeScreening = useCallback((type) => {
    update({ screeningCompleted: true, screeningType: type })
  }, [update])

  const logCycleDay = useCallback((date, { flow, symptoms }) => {
    setState(prev => {
      const isPeriodDay = flow && flow !== 'none'
      const logs = prev.periodLogs || []
      const alreadyInLogs = logs.includes(date)
      const next = {
        ...prev,
        cycleDetails: {
          ...prev.cycleDetails,
          [date]: { flow, symptoms },
        },
        periodLogs: isPeriodDay
          ? (alreadyInLogs ? logs : [...logs, date])
          : logs.filter(d => d !== date),
      }
      saveState(next)
      return next
    })
  }, [])

  const logBse = useCallback(() => {
    setState(prev => {
      const next = {
        ...prev,
        screeningCompleted: true,
        screeningType: 'bse',
        bseLogs: [...(prev.bseLogs || []), todayISO()],
      }
      saveState(next)
      return next
    })
  }, [])

  const markCheckinNudgeDone = useCallback(() => {
    update({ checkinNudgeDone: true })
  }, [update])

  const toggleWhisperReaction = useCallback((whisperId, type) => {
    setState(prev => {
      const current = prev.whisperReactions?.[whisperId] || []
      const has = current.includes(type)
      const next = {
        ...prev,
        whisperReactions: {
          ...prev.whisperReactions,
          [whisperId]: has ? current.filter(t => t !== type) : [...current, type],
        },
      }
      saveState(next)
      return next
    })
  }, [])

  const setBookingDetails = useCallback((details) => {
    setState(prev => {
      const next = {
        ...prev,
        bookingDetails: { ...prev.bookingDetails, ...details }
      }
      saveState(next)
      return next
    })
  }, [])

  const setUserDetails = useCallback((details) => {
    setState(prev => {
      const next = {
        ...prev,
        userDetails: { ...prev.userDetails, ...details }
      }
      saveState(next)
      return next
    })
  }, [])

  const confirmBooking = useCallback((detailsOverride = null) => {
    setState(prev => {
      const bookingDetails = detailsOverride || prev.bookingDetails
      const booking = {
        id: `booking-${Date.now()}`,
        createdAt: new Date().toISOString(),
        ...bookingDetails,
        userDetails: prev.userDetails,
      }
      const next = {
        ...prev,
        screeningCompleted: true,
        screeningType: 'mammogram',
        bookingDetails,
        bookings: [booking, ...(prev.bookings || [])],
      }
      saveState(next)
      return next
    })
  }, [])

  const contributeWhisper = useCallback((whisper) => {
    setState(prev => {
      const next = {
        ...prev,
        whispersContributed: [...prev.whispersContributed, whisper]
      }
      saveState(next)
      return next
    })
  }, [])

  const dismissNudge = useCallback(() => {
    update({ nudgeDismissedAt: todayISO() })
  }, [update])

  const logMood = useCallback((date, mood) => {
    setState(prev => {
      const next = { ...prev, moodLog: { ...prev.moodLog, [date]: mood } }
      saveState(next)
      return next
    })
  }, [])

  const completeWeekCheckIn = useCallback((weekNum, data) => {
    setState(prev => {
      const next = { ...prev, weekCheckIns: { ...prev.weekCheckIns, [weekNum]: data } }
      saveState(next)
      return next
    })
  }, [])

  const setDevDay = useCallback((dayNum) => {
    setState(prev => {
      const d = new Date()
      d.setDate(d.getDate() - (dayNum - 1))
      const newInstallDate = d.toISOString().slice(0, 10)
      const weekNum = Math.floor((dayNum - 1) / 7) + 1
      const today = todayISO()
      const newMoodLog = { ...prev.moodLog }
      delete newMoodLog[today]
      const newWeekCheckIns = { ...prev.weekCheckIns }
      delete newWeekCheckIns[weekNum]
      const next = {
        ...prev,
        installDate: newInstallDate,
        moodLog: newMoodLog,
        weekCheckIns: newWeekCheckIns,
        letterSeenDay7: dayNum === 7 ? false : prev.letterSeenDay7,
        screeningNudgeResponse: dayNum < 21 ? null : prev.screeningNudgeResponse,
      }
      saveState(next)
      return next
    })
  }, [])

  const markLetterSeen = useCallback(() => {
    update({ letterSeenDay7: true })
  }, [update])

  const setBseReminderChoice = useCallback((choice) => {
    update({ bseReminderChoice: choice })
  }, [update])

  const respondToScreeningNudge = useCallback((response) => {
    update({ screeningNudgeResponse: response })
  }, [update])

  const logPeriod = useCallback((date) => {
    setState(prev => {
      const logs = prev.periodLogs || []
      const already = logs.includes(date)
      const next = {
        ...prev,
        periodLogs: already ? logs.filter(d => d !== date) : [...logs, date],
      }
      saveState(next)
      return next
    })
  }, [])

  // Derived values
  const today = todayISO()

  let dayCount = 1
  if (state.installDate) {
    const diff = daysBetween(state.installDate, today)
    dayCount = Math.max(1, diff + 1)
  }

  const todayHabits = state.habitLogs[today] || { water: false, sleep: false, movement: false, selfCare: false }

  // Weekly garden
  const daysSinceInstall = state.installDate ? daysBetween(state.installDate, today) : 0
  const currentWeekNum = Math.floor(daysSinceInstall / 7) + 1
  const currentWeekFlower = state.flowerPicks[currentWeekNum] || state.flowerType || 'rose'
  const showWeeklyPicker = !state.flowerPicks[currentWeekNum]
  const needsWeekCheckIn = !state.weekCheckIns[currentWeekNum]
  const todayCardResponse = state.cardResponses[today] || null
  const todayPeriod = (state.periodLogs || []).includes(today)

  const showWhisper = dayCount >= 7
  const showNudge = dayCount >= 21 && (
    state.nudgeDismissedAt === null ||
    daysBetween(state.nudgeDismissedAt, today) >= 7
  )
  const showCheckinNudge = dayCount >= 21 && !state.checkinNudgeDone

  const value = {
    // Raw state
    ...state,
    // Derived
    dayCount,
    today,
    todayHabits,
    todayCardResponse,
    todayPeriod,
    showWhisper,
    showNudge,
    showCheckinNudge,
    // Actions
    setUserName,
    completeOnboarding,
    currentWeekNum,
    currentWeekFlower,
    showWeeklyPicker,
    setUserGoal,
    setFlowerType,
    setWeekFlower,
    logHabit,
    logPeriod,
    respondToCard,
    completeScreening,
    logBse,
    setBookingDetails,
    setUserDetails,
    confirmBooking,
    contributeWhisper,
    dismissNudge,
    markCheckinNudgeDone,
    toggleWhisperReaction,
    logCycleDay,
    logMood,
    markLetterSeen,
    setBseReminderChoice,
    respondToScreeningNudge,
    completeWeekCheckIn,
    setDevDay,
    needsWeekCheckIn,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

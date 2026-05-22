import { Routes, Route, Navigate } from 'react-router-dom'
import { useApp } from './context/AppContext'

import NameEntry from './screens/onboarding/NameEntry'
import Home from './screens/home/Home'
import Nudge from './screens/nudge/Nudge'
import WhisperWall from './screens/whispers/WhisperWall'
import ScreeningChooser from './screens/screening/ScreeningChooser'

import BSEIntro from './screens/bse/BSEIntro'
import BSEStep1Look from './screens/bse/BSEStep1Look'
import BSEStep2Touch from './screens/bse/BSEStep2Touch'
import BSEStep3Check from './screens/bse/BSEStep3Check'
import BSEComplete from './screens/bse/BSEComplete'

import MammogramChooser from './screens/mammogram/MammogramChooser'
import ClinicList from './screens/mammogram/ClinicList'
import BusSchedule from './screens/mammogram/BusSchedule'
import BookingDetails from './screens/mammogram/BookingDetails'
import BookSlot from './screens/mammogram/BookSlot'
import BookingConfirm from './screens/mammogram/BookingConfirm'
import BookingConfirmed from './screens/mammogram/BookingConfirmed'

import CheckIn from './screens/checkin/CheckIn'
import Celebrate from './screens/celebrate/Celebrate'
import Account from './screens/account/Account'

function RequireUser({ children }) {
  const { userName } = useApp()
  if (!userName) return <Navigate to="/" replace />
  return children
}

function RootRedirect() {
  const { userName } = useApp()
  if (!userName) return <NameEntry />
  return <Navigate to="/home" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />

      <Route path="/home" element={<RequireUser><Home /></RequireUser>} />
      <Route path="/nudge" element={<RequireUser><Nudge /></RequireUser>} />
      <Route path="/whispers" element={<RequireUser><WhisperWall /></RequireUser>} />
      <Route path="/screening" element={<RequireUser><ScreeningChooser /></RequireUser>} />

      <Route path="/bse/intro" element={<RequireUser><BSEIntro /></RequireUser>} />
      <Route path="/bse/step1" element={<RequireUser><BSEStep1Look /></RequireUser>} />
      <Route path="/bse/step2" element={<RequireUser><BSEStep2Touch /></RequireUser>} />
      <Route path="/bse/step3" element={<RequireUser><BSEStep3Check /></RequireUser>} />
      <Route path="/bse/complete" element={<RequireUser><BSEComplete /></RequireUser>} />

      <Route path="/mammogram" element={<RequireUser><MammogramChooser /></RequireUser>} />
      <Route path="/mammogram/clinic-list" element={<RequireUser><ClinicList /></RequireUser>} />
      <Route path="/mammogram/bus-schedule" element={<RequireUser><BusSchedule /></RequireUser>} />
      <Route path="/mammogram/details" element={<RequireUser><BookingDetails /></RequireUser>} />
      <Route path="/mammogram/book" element={<RequireUser><BookSlot /></RequireUser>} />
      <Route path="/mammogram/confirm" element={<RequireUser><BookingConfirm /></RequireUser>} />
      <Route path="/mammogram/confirmed" element={<RequireUser><BookingConfirmed /></RequireUser>} />

      <Route path="/checkin" element={<RequireUser><CheckIn /></RequireUser>} />
      <Route path="/celebrate" element={<RequireUser><Celebrate /></RequireUser>} />
      <Route path="/account" element={<RequireUser><Account /></RequireUser>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

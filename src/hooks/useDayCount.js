import { useApp } from '../context/AppContext'

export function useDayCount() {
  const { dayCount } = useApp()
  return dayCount || 1
}

export default useDayCount

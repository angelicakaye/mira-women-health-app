import { useApp } from '../context/AppContext'

export function useAppState() {
  return useApp()
}

export default useAppState

import { useEffect } from 'react'
import { formatAuthError } from '../utils/authErrors'

const KEY = 'cw_google_auth_error'

/** Shows an error after returning from Google if the API exchange failed (e.g. invalid server Firebase key). */
export function useConsumeGoogleAuthSessionError(setError) {
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(KEY)
      if (raw) {
        sessionStorage.removeItem(KEY)
        const { code } = JSON.parse(raw)
        setError(formatAuthError(code))
      }
    } catch {
      /* ignore */
    }
  }, [setError])
}

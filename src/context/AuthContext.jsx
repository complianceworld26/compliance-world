/* eslint-disable react-refresh/only-export-components -- AuthProvider + useAuth */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { signInWithPopup, signInWithRedirect } from 'firebase/auth'
import { firebaseLogin, getMe, login, logout, signup } from '../lib/authApi'
import { auth, getGoogleRedirectResultOnce, googleProvider, isFirebaseConfigured } from '../lib/firebase'

const AuthContext = createContext(null)

/** Prefer popup (no fragile redirect sessionStorage). Fall back to redirect if popup is blocked / COOP. */
function shouldFallBackToGoogleRedirect(err) {
  const code = err?.code
  const msg = String(err?.message ?? '')
  if (code === 'auth/popup-blocked') return true
  if (code === 'auth/internal-error') return true
  if (code === 'auth/operation-not-supported-in-this-environment') return true
  if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') return false
  if (/Cross-Origin-Opener-Policy|window\.closed|window\.close|blocked.*popup/i.test(msg)) return true
  return false
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function init() {
      setLoading(true)
      try {
        if (auth) {
          const redirectResult = await getGoogleRedirectResultOnce(auth)
          if (!mounted) return
          if (redirectResult?.user) {
            const idToken = await redirectResult.user.getIdToken()
            const data = await firebaseLogin({ idToken })
            if (!mounted) return
            setUser(data?.user ?? null)
            if (mounted) setLoading(false)
            return
          }
        }
      } catch (err) {
        console.error('Google sign-in (redirect) could not complete:', err)
        try {
          const code = err?.code || 'server/error'
          sessionStorage.setItem('cw_google_auth_error', JSON.stringify({ code }))
        } catch {
          /* ignore */
        }
      }

      try {
        const data = await getMe()
        if (mounted) setUser(data?.user ?? null)
      } catch {
        if (mounted) setUser(null)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    init()
    return () => {
      mounted = false
    }
  }, [])

  const signInWithEmail = useCallback(async (email, password) => {
    const data = await login({ email, password })
    setUser(data?.user ?? null)
  }, [])

  const signUpWithEmail = useCallback(async (email, password, displayName) => {
    const data = await signup({
      name: displayName?.trim() || email.split('@')[0] || 'User',
      email,
      password,
    })
    setUser(data?.user ?? null)
  }, [])

  /**
   * Try popup first (works when COOP allows popups — see public/_headers + your CDN).
   * Redirect is a fallback when popups are blocked or storage-partitioned redirect flows fail.
   */
  const signInWithGoogle = useCallback(async () => {
    if (!auth || !googleProvider) {
      const err = new Error('Firebase client is not configured.')
      err.code = 'app/firebase-not-configured'
      throw err
    }
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const idToken = await result.user.getIdToken()
      const data = await firebaseLogin({ idToken })
      setUser(data?.user ?? null)
    } catch (err) {
      if (shouldFallBackToGoogleRedirect(err)) {
        await signInWithRedirect(auth, googleProvider)
        return
      }
      throw err
    }
  }, [])

  const signOut = useCallback(async () => {
    await logout()
    setUser(null)
  }, [])

  const resetPassword = useCallback(async () => {
    const err = new Error('Password reset endpoint is not set up yet.')
    err.code = 'auth/operation-not-allowed'
    throw err
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      isFirebaseConfigured,
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      signOut,
      resetPassword,
    }),
    [
      user,
      loading,
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      signOut,
      resetPassword,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}

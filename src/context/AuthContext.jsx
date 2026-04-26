/* eslint-disable react-refresh/only-export-components -- AuthProvider + useAuth */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getRedirectResult, signInWithRedirect } from 'firebase/auth'
import { firebaseLogin, getMe, login, logout, signup } from '../lib/authApi'
import { auth, googleProvider, isFirebaseConfigured } from '../lib/firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function init() {
      setLoading(true)
      try {
        if (auth) {
          const redirectResult = await getRedirectResult(auth)
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
   * Full-page redirect (not popup) — avoids Cross-Origin-Opener-Policy breaking signInWithPopup on some hosts.
   * After Google, the user returns to this app; init() runs getRedirectResult and exchanges the ID token with the API.
   */
  const signInWithGoogle = useCallback(async () => {
    if (!auth || !googleProvider) {
      const err = new Error('Firebase client is not configured.')
      err.code = 'app/firebase-not-configured'
      throw err
    }
    await signInWithRedirect(auth, googleProvider)
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

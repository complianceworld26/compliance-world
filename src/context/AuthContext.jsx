/* eslint-disable react-refresh/only-export-components -- AuthProvider + useAuth */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getMe, login, logout, signup } from '../lib/authApi'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function init() {
      setLoading(true)
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
      signInWithEmail,
      signUpWithEmail,
      signOut,
      resetPassword,
    }),
    [user, loading, signInWithEmail, signUpWithEmail, signOut, resetPassword],
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

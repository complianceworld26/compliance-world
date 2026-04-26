/* eslint-disable react-refresh/only-export-components -- AuthProvider + useAuth */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile,
} from 'firebase/auth'
import { auth, googleProvider, isFirebaseConfigured } from '../lib/firebase'

const AuthContext = createContext(null)

function assertAuth() {
  if (!auth || !googleProvider) {
    const err = new Error('Firebase is not configured.')
    err.code = 'app/firebase-not-configured'
    throw err
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(() => Boolean(auth))

  useEffect(() => {
    if (!auth) {
      return undefined
    }
    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser)
      setLoading(false)
    })
  }, [])

  const signInWithEmail = useCallback(async (email, password) => {
    assertAuth()
    await signInWithEmailAndPassword(auth, email, password)
  }, [])

  const signUpWithEmail = useCallback(async (email, password, displayName) => {
    assertAuth()
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    if (displayName?.trim()) {
      await updateProfile(credential.user, { displayName: displayName.trim() })
    }
  }, [])

  const signInWithGoogle = useCallback(async () => {
    assertAuth()
    await signInWithPopup(auth, googleProvider)
  }, [])

  const signOut = useCallback(async () => {
    if (!auth) return
    await firebaseSignOut(auth)
  }, [])

  const resetPassword = useCallback(async (email) => {
    assertAuth()
    await sendPasswordResetEmail(auth, email)
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

import { initializeApp, getApps } from 'firebase/app'
import { getAuth, getRedirectResult, GoogleAuthProvider } from 'firebase/auth'

/** Firebase redirect result can only be read once; React Strict Mode runs effects twice in dev — share one promise. */
let pendingRedirectResultPromise = null

export function getGoogleRedirectResultOnce(authInstance) {
  if (!authInstance) return Promise.resolve(null)
  if (!pendingRedirectResultPromise) {
    pendingRedirectResultPromise = getRedirectResult(authInstance).catch((err) => {
      pendingRedirectResultPromise = null
      throw err
    })
  }
  return pendingRedirectResultPromise
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId,
)

const app = isFirebaseConfigured
  ? getApps().length
    ? getApps()[0]
    : initializeApp(firebaseConfig)
  : null

export const auth = app ? getAuth(app) : null

export const googleProvider = app
  ? (() => {
      const p = new GoogleAuthProvider()
      p.setCustomParameters({ prompt: 'select_account' })
      return p
    })()
  : null

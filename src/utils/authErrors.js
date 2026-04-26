const MESSAGE_BY_CODE = {
  'app/firebase-not-configured':
    'Firebase is not set up. Add VITE_FIREBASE_* variables to a .env file in the project root.',
  'auth/invalid-email': 'Enter a valid email address.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password.',
  'auth/invalid-credential': 'Invalid email or password.',
  'auth/email-already-in-use': 'An account already exists with this email.',
  'auth/weak-password': 'Choose a stronger password (at least 6 characters).',
  'auth/popup-closed-by-user': 'Sign-in was cancelled.',
  'auth/popup-blocked': 'Popup was blocked. Allow popups for this site and try again.',
  'auth/network-request-failed': 'Network error. Check your connection.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
  'auth/operation-not-allowed':
    'This sign-in method is not enabled in Firebase (enable Email/Password and Google in the console).',
  'auth/account-exists-with-different-credential':
    'An account already exists with the same email using a different sign-in method.',
}

export function formatAuthError(code, fallback = 'Something went wrong. Please try again.') {
  if (!code) return fallback
  return MESSAGE_BY_CODE[code] ?? fallback
}

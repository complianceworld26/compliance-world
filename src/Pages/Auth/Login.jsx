import { useCallback, useEffect, useState } from 'react'
import { motion as motionNamespace } from 'framer-motion'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

const MotionButton = motionNamespace.button
const MotionDiv = motionNamespace.div
import AuthLayout from '../../components/AuthLayout'
import { GoogleSignInButton } from '../../components/GoogleSignInButton'
import { useAuth } from '../../context/AuthContext'
import { formatAuthError } from '../../utils/authErrors'

const inputClass =
  'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none'

const LoginForm = ({
  form,
  handleChange,
  handleSubmit,
  error,
  info,
  busy,
  onGoogle,
  isFirebaseConfigured,
}) => (
  <div className="space-y-4">
    {!isFirebaseConfigured ? (
      <p className="rounded-xl border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
        {formatAuthError('app/firebase-not-configured')}
      </p>
    ) : null}
    {error ? (
      <p className="rounded-xl border border-red-400/25 bg-red-500/10 px-3 py-2 text-xs text-red-100">{error}</p>
    ) : null}
    {info ? (
      <p className="rounded-xl border border-emerald-400/25 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-100">
        {info}
      </p>
    ) : null}
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="login-email" className="mb-1.5 block text-xs font-medium text-slate-400">
          Work email
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@company.com"
          className={inputClass}
          required
          disabled={busy}
        />
      </div>
      <div>
        <label htmlFor="login-password" className="mb-1.5 block text-xs font-medium text-slate-400">
          Password
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
          className={inputClass}
          required
          disabled={busy}
        />
      </div>
      <p className="text-xs leading-relaxed text-slate-500">
        By signing in you agree to our{' '}
        <a href="/" className="text-cyan-300/90 underline-offset-2 hover:underline">
          Terms
        </a>{' '}
        and{' '}
        <a href="/" className="text-cyan-300/90 underline-offset-2 hover:underline">
          Privacy Policy
        </a>
        .
      </p>
      <MotionButton
        type="submit"
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.99 }}
        disabled={busy || !isFirebaseConfigured}
        className="w-full rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:from-indigo-400 hover:to-violet-400 disabled:opacity-50"
      >
        {busy ? 'Signing in…' : 'Sign in'}
      </MotionButton>
    </form>

    <div className="relative py-2">
      <div className="absolute inset-0 flex items-center" aria-hidden>
        <span className="w-full border-t border-white/10" />
      </div>
      <div className="relative flex justify-center text-xs">
        <span className="bg-slate-950/90 px-3 text-slate-500">or</span>
      </div>
    </div>

    <GoogleSignInButton onClick={onGoogle} disabled={!isFirebaseConfigured} loading={busy} variant="dark" />
  </div>
)

const Login = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const background = location.state?.background
  const isModal = Boolean(background)

  const { user, loading: authLoading, signInWithEmail, signInWithGoogle, isFirebaseConfigured: firebaseReady } = useAuth()

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [busy, setBusy] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
    setInfo('')
  }

  const finishSuccess = useCallback(() => {
    if (isModal && background) {
      const { pathname, search, hash } = background
      navigate(`${pathname}${search ?? ''}${hash ?? ''}`, { replace: true })
    } else {
      navigate('/', { replace: true })
    }
  }, [background, isModal, navigate])

  useEffect(() => {
    if (authLoading) return
    if (user) {
      finishSuccess()
    }
  }, [user, authLoading, finishSuccess])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setInfo('')
    setBusy(true)
    try {
      await signInWithEmail(form.email.trim(), form.password)
      finishSuccess()
    } catch (err) {
      setError(formatAuthError(err?.code))
    } finally {
      setBusy(false)
    }
  }

  const handleGoogle = async () => {
    setError('')
    setInfo('')
    setBusy(true)
    try {
      await signInWithGoogle()
    } catch (err) {
      setError(formatAuthError(err?.code))
      setBusy(false)
    }
  }

  const closeModal = useCallback(() => {
    if (background) {
      const { pathname, search, hash } = background
      navigate(`${pathname}${search ?? ''}${hash ?? ''}`, { replace: true })
    } else {
      navigate(-1)
    }
  }, [background, navigate])

  useEffect(() => {
    if (!isModal) return undefined
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeModal()
    }
    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [isModal, closeModal])

  const formProps = {
    form,
    handleChange,
    handleSubmit,
    error,
    info,
    busy,
    onGoogle: handleGoogle,
    isFirebaseConfigured: firebaseReady,
  }

  if (isModal) {
    return (
      <div
        className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
      >
        <button
          type="button"
          className="absolute inset-0 bg-slate-950/65 backdrop-blur-md transition hover:bg-slate-950/75"
          aria-label="Close login"
          onClick={closeModal}
        />
        <MotionDiv
          initial={{ opacity: 0, scale: 0.97, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-white/10 bg-slate-950/90 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative mb-6 text-center">
            <button
              type="button"
              onClick={closeModal}
              className="absolute -right-1 -top-1 inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/90">Account</p>
            <h1 id="login-title" className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Welcome back
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-sm text-slate-400">
              Sign in to manage filings, orders, and messages in one place.
            </p>
          </div>

          <LoginForm {...formProps} />

          <p className="mt-6 text-center text-sm text-slate-400">
            <NavLink to="/signup" className="font-semibold text-cyan-300 transition hover:text-cyan-200">
              New here? Create an account
            </NavLink>
          </p>
        </MotionDiv>
      </div>
    )
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to manage filings, orders, and messages in one place."
      alternateLabel="New here? Create an account"
      alternateTo="/signup"
    >
      <LoginForm {...formProps} />
    </AuthLayout>
  )
}

export default Login

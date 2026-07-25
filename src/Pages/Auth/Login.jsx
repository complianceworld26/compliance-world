import { useCallback, useEffect, useState } from 'react'
import { motion as motionNamespace } from 'framer-motion'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

const MotionButton = motionNamespace.button
const MotionDiv = motionNamespace.div
import AuthLayout from '../../components/AuthLayout'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { formatAuthError } from '../../utils/authErrors'

const LoginForm = ({ form, handleChange, handleSubmit, error, info, busy, isLight }) => {
  const inputClass = isLight
    ? 'w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-[#1a3a78] focus:outline-none focus:ring-2 focus:ring-[#1a3a78]/15'
    : 'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-slate-400 focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/20'

  const labelClass = isLight
    ? 'mb-1.5 block text-xs font-semibold text-slate-600'
    : 'mb-1.5 block text-xs font-medium text-slate-400'

  const linkClass = isLight
    ? 'font-medium text-[#1a3a78] underline-offset-2 hover:underline'
    : 'text-cyan-300/90 underline-offset-2 hover:underline'

  const submitClass = isLight
    ? 'w-full rounded-xl bg-[#1a3a78] px-4 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#1a3a78]/25 transition hover:bg-[#1e40af] disabled:opacity-50'
    : 'w-full rounded-xl bg-white px-4 py-3.5 text-sm font-semibold text-slate-900 shadow-lg shadow-black/35 transition hover:bg-slate-100 disabled:opacity-50'

  return (
    <div className="space-y-5">
      {error ? (
        <p
          className={
            isLight
              ? 'rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700'
              : 'rounded-xl border border-red-400/25 bg-red-500/10 px-3 py-2.5 text-xs text-red-100'
          }
        >
          {error}
        </p>
      ) : null}
      {info ? (
        <p
          className={
            isLight
              ? 'rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-xs text-emerald-800'
              : 'rounded-xl border border-emerald-400/25 bg-emerald-500/10 px-3 py-2.5 text-xs text-emerald-100'
          }
        >
          {info}
        </p>
      ) : null}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="login-email" className={labelClass}>
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
          <label htmlFor="login-password" className={labelClass}>
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
        <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
          By signing in you agree to our{' '}
          <a href="/" className={linkClass}>
            Terms
          </a>{' '}
          and{' '}
          <a href="/" className={linkClass}>
            Privacy Policy
          </a>
          .
        </p>
        <MotionButton
          type="submit"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.99 }}
          disabled={busy}
          className={submitClass}
        >
          {busy ? 'Signing in…' : 'Sign in'}
        </MotionButton>
      </form>
    </div>
  )
}

const Login = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const background = location.state?.background
  const isModal = Boolean(background)
  const { isLight } = useTheme()

  const { user, loading: authLoading, signInWithEmail } = useAuth()

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
    isLight,
  }

  if (isModal) {
    const panelClass = isLight
      ? 'relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white p-7 shadow-2xl shadow-slate-900/15 sm:p-10'
      : 'relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-slate-950/95 p-7 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-10'

    const closeBtnClass = isLight
      ? 'absolute -right-1 -top-1 inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900'
      : 'absolute -right-1 -top-1 inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition hover:bg-white/10 hover:text-white'

    const eyebrowClass = isLight
      ? 'text-xs font-semibold uppercase tracking-[0.2em] text-[#1a3a78]'
      : 'text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/90'

    const titleClass = isLight
      ? 'mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl'
      : 'mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl'

    const subtitleClass = isLight
      ? 'mx-auto mt-3 max-w-sm text-sm text-slate-600'
      : 'mx-auto mt-3 max-w-sm text-sm text-slate-400'

    const altLinkClass = isLight
      ? 'font-semibold text-[#1a3a78] transition hover:text-[#1e40af]'
      : 'font-semibold text-cyan-300 transition hover:text-cyan-200'

    return (
      <div
        className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
      >
        <button
          type="button"
          className={
            isLight
              ? 'absolute inset-0 bg-slate-900/40 backdrop-blur-md transition hover:bg-slate-900/50'
              : 'absolute inset-0 bg-slate-950/65 backdrop-blur-md transition hover:bg-slate-950/75'
          }
          aria-label="Close login"
          onClick={closeModal}
        />
        <MotionDiv
          initial={{ opacity: 0, scale: 0.97, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className={panelClass}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative mb-7 text-center">
            <button type="button" onClick={closeModal} className={closeBtnClass} aria-label="Close">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
            <p className={eyebrowClass}>Account</p>
            <h1 id="login-title" className={titleClass}>
              Welcome back
            </h1>
            <p className={subtitleClass}>Sign in to manage filings, orders, and messages in one place.</p>
          </div>

          <LoginForm {...formProps} />

          <p className={`mt-7 text-center text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            <NavLink to="/signup" className={altLinkClass}>
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

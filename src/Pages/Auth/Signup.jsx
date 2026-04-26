import { useState } from 'react'
import { motion as motionNamespace } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'

const MotionButton = motionNamespace.button
import AuthLayout from '../../components/AuthLayout'
import { GoogleSignInButton } from '../../components/GoogleSignInButton'
import { useAuth } from '../../context/AuthContext'
import { formatAuthError } from '../../utils/authErrors'

const inputClass =
  'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none'

const Signup = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { signUpWithEmail, signInWithGoogle, isFirebaseConfigured: firebaseReady } = useAuth()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setBusy(true)
    try {
      await signUpWithEmail(form.email.trim(), form.password, form.name)
      navigate('/', { replace: true })
    } catch (err) {
      setError(formatAuthError(err?.code))
    } finally {
      setBusy(false)
    }
  }

  const handleGoogle = async () => {
    setError('')
    setBusy(true)
    try {
      await signInWithGoogle()
      navigate('/', { replace: true })
    } catch (err) {
      setError(formatAuthError(err?.code))
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Get compliance updates, filing status, and expert support in one workspace."
      alternateLabel="Already have an account? Sign in"
      alternateTo="/login"
      alternateState={{ background: location }}
    >
      <div className="space-y-4">
        {!firebaseReady ? (
          <p className="rounded-xl border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
            {formatAuthError('app/firebase-not-configured')}
          </p>
        ) : null}
        {error ? (
          <p className="rounded-xl border border-red-400/25 bg-red-500/10 px-3 py-2 text-xs text-red-100">{error}</p>
        ) : null}

        <GoogleSignInButton onClick={handleGoogle} disabled={!firebaseReady} loading={busy} variant="dark" />

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center" aria-hidden>
            <span className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white/[0.02] px-3 text-slate-500 backdrop-blur-sm">or sign up with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="signup-name" className="mb-1.5 block text-xs font-medium text-slate-400">
              Full name
            </label>
            <input
              id="signup-name"
              name="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className={inputClass}
              required
              disabled={busy}
            />
          </div>
          <div>
            <label htmlFor="signup-email" className="mb-1.5 block text-xs font-medium text-slate-400">
              Work email
            </label>
            <input
              id="signup-email"
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
            <label htmlFor="signup-password" className="mb-1.5 block text-xs font-medium text-slate-400">
              Password
            </label>
            <input
              id="signup-password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              placeholder="At least 8 characters"
              className={inputClass}
              minLength={8}
              required
              disabled={busy}
            />
          </div>
          <div>
            <label htmlFor="signup-confirm" className="mb-1.5 block text-xs font-medium text-slate-400">
              Confirm password
            </label>
            <input
              id="signup-confirm"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat password"
              className={inputClass}
              minLength={8}
              required
              disabled={busy}
            />
          </div>
          <p className="text-xs leading-relaxed text-slate-500">
            By signing up you agree to our{' '}
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
            disabled={busy || !firebaseReady}
            className="w-full rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:from-indigo-400 hover:to-violet-400 disabled:opacity-50"
          >
            {busy ? 'Creating account…' : 'Create account'}
          </MotionButton>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Signup

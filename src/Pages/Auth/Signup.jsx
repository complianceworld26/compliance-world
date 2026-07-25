import { useEffect, useState } from 'react'
import { motion as motionNamespace } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'

const MotionButton = motionNamespace.button
import AuthLayout from '../../components/AuthLayout'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { formatAuthError } from '../../utils/authErrors'

const Signup = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isLight } = useTheme()
  const { user, loading: authLoading, signUpWithEmail } = useAuth()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (authLoading) return
    if (user) {
      navigate('/', { replace: true })
    }
  }, [user, authLoading, navigate])

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
    <AuthLayout
      title="Create your account"
      subtitle="Get compliance updates, filing status, and expert support in one workspace."
      alternateLabel="Already have an account? Sign in"
      alternateTo="/login"
      alternateState={{ background: location }}
    >
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="signup-name" className={labelClass}>
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
            <label htmlFor="signup-email" className={labelClass}>
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
            <label htmlFor="signup-password" className={labelClass}>
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
            <label htmlFor="signup-confirm" className={labelClass}>
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
            {busy ? 'Creating account…' : 'Create account'}
          </MotionButton>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Signup

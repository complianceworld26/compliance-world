import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import AuthLayout from '../../components/AuthLayout'

const inputClass =
  'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none'

const Signup = () => {
  const location = useLocation()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Get compliance updates, filing status, and expert support in one workspace."
      alternateLabel="Already have an account? Sign in"
      alternateTo="/login"
      alternateState={{ background: location }}
    >
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
        <motion.button
          type="submit"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.99 }}
          className="w-full rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:from-indigo-400 hover:to-violet-400"
        >
          Create account
        </motion.button>
      </form>
    </AuthLayout>
  )
}

export default Signup

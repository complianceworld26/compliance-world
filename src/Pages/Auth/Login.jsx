import { useState } from 'react'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import AuthLayout from '../../components/AuthLayout'

const inputClass =
  'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to manage filings, orders, and messages in one place."
      alternateLabel="New here? Create an account"
      alternateTo="/signup"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="login-email" className="mb-1.5 block text-xs font-medium text-slate-400">
            Email
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
          />
        </div>
        <div className="flex justify-end">
          <NavLink
            to="/contact-us"
            className="text-xs font-medium text-cyan-300/90 transition hover:text-cyan-200"
          >
            Forgot password?
          </NavLink>
        </div>
        <motion.button
          type="submit"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.99 }}
          className="w-full rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:from-indigo-400 hover:to-violet-400"
        >
          Sign in
        </motion.button>
      </form>
    </AuthLayout>
  )
}

export default Login

import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const AuthLayout = ({ title, subtitle, children, alternateLabel, alternateTo, alternateState }) => {
  return (
    <>
      <Navbar />
      <div
        data-appearance="dark"
        className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 text-white"
      >
        <main className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-4 py-14 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-indigo-600/20 blur-[100px]" />
            <div className="absolute -right-20 bottom-32 h-56 w-56 rounded-full bg-cyan-500/15 blur-[90px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative w-full max-w-md"
          >
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/90">Account</p>
            <h1 className="mt-2 text-center text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
            {subtitle ? <p className="mx-auto mt-3 text-center text-sm text-slate-400">{subtitle}</p> : null}

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/25 backdrop-blur-sm sm:p-8">
              {children}
              <p className="mt-6 text-center text-sm text-slate-400">
                <NavLink
                  to={alternateTo}
                  state={alternateState}
                  className="font-semibold text-cyan-300 transition hover:text-cyan-200"
                >
                  {alternateLabel}
                </NavLink>
              </p>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default AuthLayout

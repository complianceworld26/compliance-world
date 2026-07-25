import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { useTheme } from '../context/ThemeContext'

const AuthLayout = ({ title, subtitle, children, alternateLabel, alternateTo, alternateState }) => {
  const { isLight } = useTheme()

  const pageClass = isLight
    ? 'min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 text-slate-900'
    : 'min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 text-white'

  const glowA = isLight ? 'absolute -left-24 top-20 h-64 w-64 rounded-full bg-[#1a3a78]/10 blur-[100px]' : 'absolute -left-24 top-20 h-64 w-64 rounded-full bg-indigo-600/20 blur-[100px]'
  const glowB = isLight ? 'absolute -right-20 bottom-32 h-56 w-56 rounded-full bg-slate-300/40 blur-[90px]' : 'absolute -right-20 bottom-32 h-56 w-56 rounded-full bg-cyan-500/15 blur-[90px]'

  const eyebrowClass = isLight
    ? 'text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#1a3a78]'
    : 'text-center text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/90'

  const titleClass = isLight
    ? 'mt-2 text-center text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl'
    : 'mt-2 text-center text-3xl font-semibold tracking-tight sm:text-4xl'

  const subtitleClass = isLight
    ? 'mx-auto mt-3 text-center text-sm text-slate-600'
    : 'mx-auto mt-3 text-center text-sm text-slate-400'

  const cardClass = isLight
    ? 'mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-900/8 sm:p-10'
    : 'mt-8 rounded-2xl border border-white/10 bg-white/5 p-7 shadow-2xl shadow-black/25 backdrop-blur-sm sm:p-10'

  const altClass = isLight
    ? 'mt-7 text-center text-sm text-slate-600'
    : 'mt-7 text-center text-sm text-slate-400'

  const altLinkClass = isLight
    ? 'font-semibold text-[#1a3a78] transition hover:text-[#1e40af]'
    : 'font-semibold text-cyan-300 transition hover:text-cyan-200'

  return (
    <>
      <Navbar />
      <div className={pageClass}>
        <main className="relative flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center overflow-hidden px-4 py-14 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0">
            <div className={glowA} />
            <div className={glowB} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative w-full min-w-0 max-w-lg"
          >
            <p className={eyebrowClass}>Account</p>
            <h1 className={titleClass}>{title}</h1>
            {subtitle ? <p className={subtitleClass}>{subtitle}</p> : null}

            <div className={cardClass}>
              {children}
              <p className={altClass}>
                <NavLink to={alternateTo} state={alternateState} className={altLinkClass}>
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

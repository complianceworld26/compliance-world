import { NavLink, useLocation } from 'react-router-dom'
import logo from '@/Assets/logo.png'
import { serviceCategories } from '../data/servicesData'
import { useTheme } from '../context/ThemeContext'

const SunIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
)

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

const Navbar = () => {
  const location = useLocation()
  const { isLight, toggleTheme } = useTheme()

  const headerClass = isLight
    ? 'sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md'
    : 'sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 shadow-sm shadow-black/20 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/75'

  const brandClass = isLight
    ? 'inline-flex shrink-0 items-center gap-2.5 text-base font-bold tracking-tight text-slate-900 transition-colors duration-200 hover:text-indigo-700 sm:text-lg'
    : 'inline-flex shrink-0 items-center gap-2.5 text-base font-bold tracking-tight text-white transition-colors duration-200 hover:text-cyan-200 sm:text-lg'

  const brandLogoClass = `h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10 ${isLight ? '' : 'brightness-0 invert'}`

  const pillWrapClass = isLight
    ? 'hidden items-center gap-2 rounded-full border border-slate-200 bg-white p-1 lg:flex'
    : 'hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] p-1 shadow-inner shadow-white/5 backdrop-blur-md lg:flex'

  const linkIdle = isLight
    ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    : 'text-slate-300 hover:bg-white/10 hover:text-cyan-100'

  const linkActive = isLight
    ? 'bg-slate-900 text-white shadow-sm'
    : 'bg-white/10 text-white shadow-sm ring-1 ring-cyan-400/25 ring-inset'

  const servicesBtnClass = isLight
    ? 'inline-flex items-center gap-1 rounded-full px-4 py-2 text-xs font-medium text-slate-600 transition-all duration-200 group-hover:bg-slate-100 group-hover:text-slate-900'
    : 'inline-flex items-center gap-1 rounded-full px-4 py-2 text-xs font-medium text-slate-300 transition-all duration-200 group-hover:bg-white/10 group-hover:text-cyan-100'

  const dropdownClass = isLight
    ? 'invisible absolute left-0 top-full z-50 mt-3 w-72 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-2xl shadow-slate-900/10 transition-all duration-200 group-hover:visible group-hover:opacity-100'
    : 'invisible absolute left-0 top-full z-50 mt-3 w-72 rounded-2xl border border-white/10 bg-slate-950/95 p-2 opacity-0 shadow-2xl shadow-black/50 backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:opacity-100'

  const dropdownLinkClass = isLight
    ? 'block rounded-xl px-3 py-2 text-xs font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900'
    : 'block rounded-xl px-3 py-2 text-xs font-medium text-slate-200 transition-colors duration-200 hover:bg-white/10 hover:text-white'

  const chevronClass = isLight
    ? 'text-[10px] text-slate-400 transition-transform duration-200 group-hover:rotate-180'
    : 'text-[10px] text-slate-500 transition-transform duration-200 group-hover:rotate-180'

  const seeMoreClass = isLight
    ? 'block rounded-xl bg-slate-900 px-3 py-2 text-center text-xs font-semibold text-white transition-colors duration-200 hover:bg-indigo-700'
    : 'block rounded-xl bg-white px-3 py-2 text-center text-xs font-semibold text-slate-900 transition-colors duration-200 hover:bg-cyan-100'

  const toggleBtnClass = isLight
    ? 'inline-flex size-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 transition-colors duration-200 hover:border-slate-400 hover:bg-slate-100'
    : 'inline-flex size-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-cyan-100 transition-colors duration-200 hover:border-cyan-400/35 hover:bg-white/10 hover:text-white'

  const loginClass = isLight
    ? 'rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-slate-900/15 transition-all duration-200 hover:bg-indigo-700 sm:px-5 sm:text-sm'
    : 'rounded-xl bg-white px-4 py-2 text-xs font-semibold text-slate-900 shadow-lg shadow-black/35 transition-all duration-200 hover:bg-slate-100 sm:px-5 sm:text-sm'

  return (
    <header className={headerClass}>
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <NavLink to="/" className={brandClass}>
          <img src={logo} alt="" width={40} height={40} className={brandLogoClass} aria-hidden />
          <span>Compliance World</span>
        </NavLink>

        <div className={pillWrapClass}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 ${isActive ? linkActive : linkIdle}`
            }
          >
            Home
          </NavLink>

          <div className="group relative">
            <button type="button" className={servicesBtnClass}>
              Services
              <span className={chevronClass}>▼</span>
            </button>

            <div className={dropdownClass}>
              <div className="max-h-88 overflow-y-auto pr-1">
                {serviceCategories.map((item) => (
                  <NavLink
                    key={item.label}
                    to={`/services?category=${encodeURIComponent(item.label)}`}
                    className={dropdownLinkClass}
                  >
                    {item.label}
                  </NavLink>
                ))}

                <div className={`mt-2 border-t pt-2 ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
                  <NavLink to="/services" className={seeMoreClass}>
                    See more services
                  </NavLink>
                </div>
              </div>
            </div>
          </div>

          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 ${isActive ? linkActive : linkIdle}`
            }
          >
            About Us
          </NavLink>

          <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 ${isActive ? linkActive : linkIdle}`
            }
          >
            Contact
          </NavLink>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className={toggleBtnClass}
            aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {isLight ? <MoonIcon /> : <SunIcon />}
          </button>
          <NavLink to="/login" state={{ background: location }} className={loginClass}>
            Log in
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar

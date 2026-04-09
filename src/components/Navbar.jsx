import { NavLink } from 'react-router-dom'
import { serviceCategories } from '../data/servicesData'
import { useTheme } from '../context/ThemeContext'

const Navbar = () => {
  const { isLight, toggleTheme } = useTheme()

  const headerClass = isLight
    ? 'sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md'
    : 'sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 shadow-sm shadow-slate-950/20 backdrop-blur-md'

  const brandClass = isLight
    ? 'shrink-0 text-base font-semibold tracking-tight text-slate-900 transition-colors duration-200 hover:text-indigo-700 sm:text-lg'
    : 'shrink-0 text-base font-semibold tracking-tight text-white transition-colors duration-200 hover:text-cyan-200 sm:text-lg'

  const pillWrapClass = isLight
    ? 'hidden items-center gap-2 rounded-full border border-slate-200 bg-white p-1 lg:flex'
    : 'hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 lg:flex'

  const linkIdle = isLight
    ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    : 'text-slate-300 hover:bg-white/10 hover:text-white'

  const linkActive = isLight ? 'bg-slate-900 text-white shadow-sm' : 'bg-white text-slate-900 shadow-sm'

  const servicesBtnClass = isLight
    ? 'inline-flex items-center gap-1 rounded-full px-4 py-2 text-xs font-medium text-slate-600 transition-all duration-200 group-hover:bg-slate-100 group-hover:text-slate-900'
    : 'inline-flex items-center gap-1 rounded-full px-4 py-2 text-xs font-medium text-slate-300 transition-all duration-200 group-hover:bg-white/10 group-hover:text-white'

  const dropdownClass = isLight
    ? 'invisible absolute left-0 top-full z-50 mt-3 w-72 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-2xl shadow-slate-900/10 transition-all duration-200 group-hover:visible group-hover:opacity-100'
    : 'invisible absolute left-0 top-full z-50 mt-3 w-72 rounded-2xl border border-white/10 bg-slate-900 p-2 opacity-0 shadow-2xl shadow-black/40 transition-all duration-200 group-hover:visible group-hover:opacity-100'

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
    ? 'inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors duration-200 hover:border-slate-400 hover:bg-slate-100'
    : 'inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition-colors duration-200 hover:border-white/30 hover:bg-white/10'

  const signupClass = isLight
    ? 'rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-all duration-200 hover:bg-indigo-700 sm:px-5 sm:text-sm'
    : 'rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900 transition-all duration-200 hover:bg-cyan-100 sm:px-5 sm:text-sm'

  const loginOutlineClass = isLight
    ? 'rounded-full border border-slate-300 bg-transparent px-4 py-2 text-xs font-semibold text-slate-800 transition-all duration-200 hover:border-slate-400 hover:bg-slate-100 sm:px-5 sm:text-sm'
    : 'rounded-full border border-white/25 bg-transparent px-4 py-2 text-xs font-semibold text-white transition-all duration-200 hover:border-white/40 hover:bg-white/10 sm:px-5 sm:text-sm'

  return (
    <header className={headerClass}>
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <NavLink to="/" className={brandClass}>
          Compliance World
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
            aria-label="Toggle light and dark mode"
          >
            {isLight ? 'Dark' : 'Light'}
          </button>
          <NavLink to="/login" className={loginOutlineClass}>
            Log in
          </NavLink>
          <NavLink to="/signup" className={signupClass}>
            Sign up
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar

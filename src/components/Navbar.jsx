import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, useLocation } from 'react-router-dom'
import logo from '@/Assets/logo.png'
import { serviceCategories } from '../data/servicesData'
import { getServiceDetailPath, slugify } from '../utils/serviceSlug'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

const CATEGORY_MENU_WIDTH_PX = 576
const CATEGORY_MENU_CLOSE_MS = 140

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
  const { user, loading: authLoading, signOut } = useAuth()

  const [openCategoryLabel, setOpenCategoryLabel] = useState(null)
  const [menuCoords, setMenuCoords] = useState({ top: 0, left: 0, width: CATEGORY_MENU_WIDTH_PX })
  const closeMenuTimerRef = useRef(null)

  const cancelCloseCategoryMenu = useCallback(() => {
    if (closeMenuTimerRef.current != null) {
      window.clearTimeout(closeMenuTimerRef.current)
      closeMenuTimerRef.current = null
    }
  }, [])

  const scheduleCloseCategoryMenu = useCallback(() => {
    cancelCloseCategoryMenu()
    closeMenuTimerRef.current = window.setTimeout(() => {
      setOpenCategoryLabel(null)
      closeMenuTimerRef.current = null
    }, CATEGORY_MENU_CLOSE_MS)
  }, [cancelCloseCategoryMenu])

  const openCategoryMenu = useCallback(
    (category, anchorEl) => {
      cancelCloseCategoryMenu()
      const r = anchorEl.getBoundingClientRect()
      const width = Math.min(CATEGORY_MENU_WIDTH_PX, window.innerWidth - 16)
      const left = Math.max(8, Math.min(r.left, window.innerWidth - width - 8))
      setMenuCoords({ top: r.bottom - 8, left, width })
      setOpenCategoryLabel(category.label)
    },
    [cancelCloseCategoryMenu],
  )

  useEffect(() => {
    setOpenCategoryLabel(null)
  }, [location.pathname, location.search])

  useEffect(() => {
    const close = () => setOpenCategoryLabel(null)
    window.addEventListener('scroll', close, true)
    window.addEventListener('resize', close)
    return () => {
      window.removeEventListener('scroll', close, true)
      window.removeEventListener('resize', close)
      cancelCloseCategoryMenu()
    }
  }, [cancelCloseCategoryMenu])

  const openCategory =
    openCategoryLabel != null
      ? serviceCategories.find((c) => c.label === openCategoryLabel)
      : null

  const headerClass = isLight
    ? 'sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md'
    : 'sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 shadow-sm shadow-black/20 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/75'

  const brandClass = isLight
    ? 'inline-flex shrink-0 items-center gap-2.5 text-base font-bold tracking-tight text-slate-900 transition-colors duration-200 hover:text-indigo-700 sm:text-lg'
    : 'inline-flex shrink-0 items-center gap-2.5 text-base font-bold tracking-tight text-white transition-colors duration-200 hover:text-cyan-200 sm:text-lg'

  const brandLogoClass = `h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10 ${isLight ? '' : 'brightness-0 invert'}`

  const navRailClass = 'hidden min-w-0 flex-1 justify-center self-center px-1 lg:flex'

  const navScrollPillClass = isLight
    ? 'flex w-full min-w-0 max-w-full flex-nowrap items-center gap-0.5 overflow-x-auto overflow-y-hidden overscroll-x-contain rounded-full border border-slate-200 bg-white p-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
    : 'flex w-full min-w-0 max-w-full flex-nowrap items-center gap-0.5 overflow-x-auto overflow-y-hidden overscroll-x-contain rounded-full border border-white/10 bg-white/[0.06] p-1 shadow-inner shadow-white/5 backdrop-blur-md [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'

  const linkIdle = isLight
    ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    : 'text-slate-300 hover:bg-white/10 hover:text-cyan-100'

  const linkActive = isLight
    ? 'bg-slate-900 text-white shadow-sm'
    : 'bg-white/10 text-white shadow-sm ring-1 ring-cyan-400/25 ring-inset'

  const flyoutInnerClass = isLight
    ? 'rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-900/10'
    : 'rounded-2xl border border-white/10 bg-slate-950/95 p-3 shadow-2xl shadow-black/50 backdrop-blur-xl'

  const flyoutGridClass = 'grid grid-cols-2 gap-1.5 sm:grid-cols-3'

  const dropdownLinkClass = isLight
    ? 'block rounded-lg px-2 py-1.5 text-left text-xs font-medium leading-snug text-slate-700 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900'
    : 'block rounded-lg px-2 py-1.5 text-left text-xs font-medium leading-snug text-slate-200 transition-colors duration-200 hover:bg-white/10 hover:text-white'

  const chevronToneClass = isLight ? 'text-slate-400' : 'text-slate-500'

  const seeMoreClass = isLight
    ? 'block rounded-xl bg-slate-900 px-3 py-2 text-center text-xs font-semibold text-white transition-colors duration-200 hover:bg-indigo-700'
    : 'block rounded-xl bg-white px-3 py-2 text-center text-xs font-semibold text-slate-900 transition-colors duration-200 hover:bg-cyan-100'

  const toggleBtnClass = isLight
    ? 'inline-flex size-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 transition-colors duration-200 hover:border-slate-400 hover:bg-slate-100'
    : 'inline-flex size-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-cyan-100 transition-colors duration-200 hover:border-cyan-400/35 hover:bg-white/10 hover:text-white'

  const loginClass = isLight
    ? 'rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-slate-900/15 transition-all duration-200 hover:bg-indigo-700 sm:px-5 sm:text-sm'
    : 'rounded-xl bg-white px-4 py-2 text-xs font-semibold text-slate-900 shadow-lg shadow-black/35 transition-all duration-200 hover:bg-slate-100 sm:px-5 sm:text-sm'

  const signOutClass = isLight
    ? 'rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 sm:px-4 sm:text-sm'
    : 'rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition-all duration-200 hover:border-cyan-400/35 hover:bg-white/10 sm:px-4 sm:text-sm'

  const userLabelClass = isLight
    ? 'hidden max-w-[100px] truncate text-xs font-medium text-slate-700 sm:inline sm:max-w-[150px] lg:max-w-[200px]'
    : 'hidden max-w-[100px] truncate text-xs font-medium text-slate-200 sm:inline sm:max-w-[150px] lg:max-w-[200px]'

  const searchCategory = new URLSearchParams(location.search).get('category')

  const isCategoryNavActive = (category) => {
    const slug = slugify(category.label)
    if (location.pathname.startsWith(`/services/${slug}/`)) return true
    if (location.pathname === '/services' && searchCategory === category.label) return true
    return false
  }

  return (
    <header className={headerClass}>
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:gap-4 lg:px-8">
        <NavLink to="/" className={`shrink-0 ${brandClass}`}>
          <img src={logo} alt="" width={40} height={40} className={brandLogoClass} aria-hidden />
          <span>Compliance World</span>
        </NavLink>

        <div className={navRailClass}>
          <div className={navScrollPillClass}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${isActive ? linkActive : linkIdle}`
              }
            >
              Home
            </NavLink>

            {serviceCategories.map((category) => {
              const menuOpen = openCategoryLabel === category.label
              return (
                <div
                  key={category.label}
                  className="relative shrink-0"
                  onMouseEnter={(e) => openCategoryMenu(category, e.currentTarget)}
                  onMouseLeave={scheduleCloseCategoryMenu}
                >
                  <NavLink
                    to={`/services?category=${encodeURIComponent(category.label)}`}
                    className={() =>
                      `inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${isCategoryNavActive(category) ? linkActive : linkIdle}`
                    }
                  >
                    {category.label}
                    <span
                      className={`inline-flex shrink-0 transition-transform duration-200 ${chevronToneClass} ${menuOpen ? '-rotate-180' : ''}`}
                      aria-hidden
                    >
                      <svg viewBox="0 0 12 12" className="size-2.5" fill="currentColor">
                        <path d="M6 8.2 1.8 4h8.4L6 8.2z" />
                      </svg>
                    </span>
                  </NavLink>
                </div>
              )
            })}

            <NavLink
              to="/services"
              className={() =>
                `shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                  location.pathname === '/services' && !searchCategory ? linkActive : linkIdle
                }`
              }
            >
              All services
            </NavLink>

            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                `shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${isActive ? linkActive : linkIdle}`
              }
            >
              About Us
            </NavLink>

            <NavLink
              to="/contact-us"
              className={({ isActive }) =>
                `shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${isActive ? linkActive : linkIdle}`
              }
            >
              Contact
            </NavLink>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
          {authLoading ? (
            <span
              className={`rounded-xl px-3 py-2 text-xs font-medium sm:text-sm ${isLight ? 'text-slate-500' : 'text-slate-500'}`}
              aria-hidden
            >
              …
            </span>
          ) : user ? (
            <div className="flex max-w-[min(100%,280px)] items-center gap-2 sm:gap-3">
              <span className={userLabelClass} title={user.email ?? ''}>
                {user.name || user.displayName || user.email?.split('@')[0] || 'Account'}
              </span>
              <button type="button" onClick={() => signOut()} className={signOutClass}>
                Sign out
              </button>
            </div>
          ) : (
            <NavLink to="/login" state={{ background: location }} className={loginClass}>
              Log in
            </NavLink>
          )}
          <button
            type="button"
            onClick={toggleTheme}
            className={toggleBtnClass}
            aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {isLight ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>
      </nav>

      {openCategory != null &&
        createPortal(
          <div
            className="fixed z-200"
            style={{
              top: menuCoords.top,
              left: menuCoords.left,
              width: menuCoords.width,
            }}
            onMouseEnter={cancelCloseCategoryMenu}
            onMouseLeave={scheduleCloseCategoryMenu}
          >
            <div className={flyoutInnerClass}>
              <div className={flyoutGridClass}>
                {openCategory.options.map((option) => (
                  <NavLink
                    key={option}
                    to={getServiceDetailPath(openCategory.label, option)}
                    className={dropdownLinkClass}
                  >
                    {option}
                  </NavLink>
                ))}
                <div
                  className={`col-span-full mt-1 border-t pt-2 ${isLight ? 'border-slate-200' : 'border-white/10'}`}
                >
                  <NavLink
                    to={`/services?category=${encodeURIComponent(openCategory.label)}`}
                    className={seeMoreClass}
                  >
                    View all {openCategory.label}
                  </NavLink>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </header>
  )
}

export default Navbar

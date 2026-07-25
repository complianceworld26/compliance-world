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

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
  </svg>
)

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
  </svg>
)

const Navbar = () => {
  const location = useLocation()
  const { isLight, toggleTheme } = useTheme()
  const { user, loading: authLoading, signOut } = useAuth()

  const [openCategoryLabel, setOpenCategoryLabel] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
    setMobileMenuOpen(false)
  }, [location.pathname, location.search])

  useEffect(() => {
    if (!mobileMenuOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [mobileMenuOpen])

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
    ? 'inline-flex shrink-0 items-center gap-2.5 text-base font-bold tracking-tight text-[#1a3a78] transition-colors duration-200 hover:text-[#1e40af] sm:gap-3 sm:text-lg'
    : 'inline-flex shrink-0 items-center gap-2.5 text-base font-bold tracking-tight text-white transition-colors duration-200 hover:text-cyan-200 sm:gap-3 sm:text-lg'

  const brandLogoClass = `h-10 w-10 shrink-0 object-contain sm:h-11 sm:w-11 ${isLight ? '' : 'brightness-0 invert'}`

  const pillClass = isLight
    ? 'inline-flex max-w-full flex-nowrap items-center gap-1 rounded-full border border-slate-200 bg-slate-50/80 p-1.5 shadow-sm'
    : 'inline-flex max-w-full flex-nowrap items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] p-1.5 shadow-inner shadow-white/5 backdrop-blur-md'

  const chipBase =
    'shrink-0 whitespace-nowrap rounded-full px-2.5 py-2 text-xs font-semibold leading-none transition-all duration-200 xl:px-3 xl:text-[13px] 2xl:px-3.5 2xl:text-sm'

  const linkIdle = isLight
    ? 'text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm'
    : 'text-slate-300 hover:bg-white/10 hover:text-cyan-100'

  const linkActive = isLight
    ? 'bg-[#1a3a78] text-white shadow-sm'
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
    ? 'block rounded-xl bg-[#1a3a78] px-3 py-2 text-center text-xs font-semibold text-white transition-colors duration-200 hover:bg-[#1e40af]'
    : 'block rounded-xl bg-white px-3 py-2 text-center text-xs font-semibold text-slate-900 transition-colors duration-200 hover:bg-cyan-100'

  const toggleBtnClass = isLight
    ? 'inline-flex size-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 transition-colors duration-200 hover:border-slate-400 hover:bg-slate-100 sm:size-11'
    : 'inline-flex size-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-cyan-100 transition-colors duration-200 hover:border-cyan-400/35 hover:bg-white/10 hover:text-white sm:size-11'

  const loginClass = isLight
    ? 'rounded-xl bg-[#1a3a78] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#1a3a78]/20 transition-all duration-200 hover:bg-[#1e40af] sm:px-5'
    : 'rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-lg shadow-black/35 transition-all duration-200 hover:bg-slate-100 sm:px-5'

  const signOutClass = isLight
    ? 'rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-800 transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 sm:px-4'
    : 'rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:border-cyan-400/35 hover:bg-white/10 sm:px-4'

  const userLabelClass = isLight
    ? 'hidden max-w-[100px] truncate text-xs font-medium text-slate-700 sm:inline sm:max-w-[140px]'
    : 'hidden max-w-[100px] truncate text-xs font-medium text-slate-200 sm:inline sm:max-w-[140px]'

  const mobileLinkClass = isLight
    ? 'block rounded-xl px-3 py-3 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-100'
    : 'block rounded-xl px-3 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10'

  const mobileNestedLinkClass = isLight
    ? 'block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50'
    : 'block rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/5'

  const mobileDetailsBorder = isLight ? 'border-slate-200' : 'border-white/10'

  const searchCategory = new URLSearchParams(location.search).get('category')

  const isCategoryNavActive = (category) => {
    const slug = slugify(category.label)
    if (location.pathname.startsWith(`/services/${slug}/`)) return true
    if (location.pathname === '/services' && searchCategory === category.label) return true
    return false
  }

  const isServicesHubActive =
    location.pathname === '/services' || location.pathname.startsWith('/services/')

  return (
    <header className={headerClass}>
      <nav className="mx-auto grid h-[4.5rem] w-full min-w-0 max-w-[96rem] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 px-4 sm:h-20 sm:gap-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <NavLink to="/" className={`justify-self-start ${brandClass}`}>
          <img src={logo} alt="" width={44} height={44} className={brandLogoClass} aria-hidden />
          <span className="hidden min-[380px]:inline">Compliance World</span>
        </NavLink>

        {/* Center: content-hugging pill */}
        <div className="hidden min-w-0 max-w-[min(100%,52rem)] justify-self-center overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] xl:flex 2xl:max-w-none [&::-webkit-scrollbar]:hidden">
          <div className={pillClass}>
            <NavLink
              to="/"
              className={({ isActive }) => `${chipBase} ${isActive ? linkActive : linkIdle}`}
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
                      `inline-flex items-center gap-1 ${chipBase} ${
                        isCategoryNavActive(category) ? linkActive : linkIdle
                      }`
                    }
                  >
                    {category.label}
                    <span
                      className={`inline-flex shrink-0 transition-transform duration-200 ${chevronToneClass} ${
                        menuOpen ? '-rotate-180' : ''
                      }`}
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
                `${chipBase} ${
                  location.pathname === '/services' && !searchCategory ? linkActive : linkIdle
                }`
              }
            >
              All services
            </NavLink>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center justify-end gap-2 sm:gap-2.5 justify-self-end">
          <NavLink
            to="/services"
            className={`hidden rounded-full px-4 py-2 text-sm font-semibold transition-colors lg:inline-flex xl:hidden ${
              isServicesHubActive
                ? isLight
                  ? 'bg-[#1a3a78] text-white shadow-sm'
                  : 'bg-white/10 text-white'
                : isLight
                  ? 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  : 'border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10'
            }`}
          >
            Services
          </NavLink>

          <button
            type="button"
            onClick={toggleTheme}
            className={toggleBtnClass}
            aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {isLight ? <MoonIcon /> : <SunIcon />}
          </button>

          <button
            type="button"
            className={`${toggleBtnClass} xl:hidden`}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="cw-mobile-nav"
          >
            <MenuIcon />
          </button>

          {authLoading ? (
            <span
              className={`rounded-xl px-3 py-2 text-xs font-medium ${isLight ? 'text-slate-500' : 'text-slate-500'}`}
              aria-hidden
            >
              …
            </span>
          ) : user ? (
            <div className="flex max-w-[min(100%,240px)] items-center gap-2">
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

      {mobileMenuOpen &&
        createPortal(
          <div className="fixed inset-0 z-200 xl:hidden" role="presentation">
            <button
              type="button"
              className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm"
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div
              id="cw-mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className={`absolute inset-y-0 right-0 flex w-[min(100vw-2rem,22rem)] max-w-full flex-col border-l shadow-2xl ${
                isLight ? 'border-slate-200 bg-white' : 'border-white/10 bg-slate-950'
              }`}
            >
              <div
                className={`flex items-center justify-between border-b px-4 py-3 ${
                  isLight ? 'border-slate-200' : 'border-white/10'
                }`}
              >
                <span className={`text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Menu
                </span>
                <button
                  type="button"
                  className={toggleBtnClass}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <CloseIcon />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto overscroll-y-contain px-2 py-3 pb-[max(1rem,env(safe-area-inset-bottom,0px))]">
                <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass}>
                  Home
                </NavLink>
                {serviceCategories.map((category) => (
                  <details key={category.label} className={`border-b ${mobileDetailsBorder}`}>
                    <summary
                      className={`flex cursor-pointer list-none items-center justify-between gap-2 px-2 py-3 text-sm font-semibold [&::-webkit-details-marker]:hidden ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {category.label}
                      <span className="text-[10px] opacity-70">▼</span>
                    </summary>
                    <div
                      className={`space-y-0.5 border-t px-1 pb-3 pt-1 ${
                        isLight ? 'border-slate-100' : 'border-white/10'
                      }`}
                    >
                      {category.options.map((option) => (
                        <NavLink
                          key={`${category.label}-${option}`}
                          to={getServiceDetailPath(category.label, option)}
                          onClick={() => setMobileMenuOpen(false)}
                          className={mobileNestedLinkClass}
                        >
                          {option}
                        </NavLink>
                      ))}
                      <NavLink
                        to={`/services?category=${encodeURIComponent(category.label)}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`mt-2 block px-3 py-2 text-xs font-semibold ${
                          isLight ? 'text-[#1a3a78]' : 'text-cyan-300'
                        }`}
                      >
                        View all {category.label}
                      </NavLink>
                    </div>
                  </details>
                ))}
                <NavLink
                  to="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className={mobileLinkClass}
                >
                  All services
                </NavLink>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </header>
  )
}

export default Navbar

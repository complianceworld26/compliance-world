import { NavLink } from 'react-router-dom'
import { serviceCategories } from '../data/servicesData'

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="shrink-0 text-base font-semibold tracking-tight text-slate-900 transition-colors duration-200 hover:text-indigo-700 sm:text-lg"
        >
          Compliance World
        </NavLink>

        <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white p-1 lg:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`
            }
          >
            Home
          </NavLink>

          <div className="group relative">
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-xs font-medium text-slate-600 transition-all duration-200 group-hover:bg-slate-100 group-hover:text-slate-900"
            >
              Services
              <span className="text-[10px] text-slate-400 transition-transform duration-200 group-hover:rotate-180">▼</span>
            </button>

            <div className="invisible absolute left-0 top-full z-50 mt-3 w-72 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-2xl shadow-slate-900/10 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="max-h-88 overflow-y-auto pr-1">
                {serviceCategories.map((item) => (
                  <NavLink
                    key={item.label}
                    to={`/services?category=${encodeURIComponent(item.label)}`}
                    className="block rounded-xl px-3 py-2 text-xs font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900"
                  >
                    {item.label}
                  </NavLink>
                ))}

                <div className="mt-2 border-t border-slate-200 pt-2">
                  <NavLink
                    to="/services"
                    className="block rounded-xl bg-slate-900 px-3 py-2 text-center text-xs font-semibold text-white transition-colors duration-200 hover:bg-indigo-700"
                  >
                    See more services
                  </NavLink>
                </div>
              </div>
            </div>
          </div>

          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`
            }
          >
            About Us
          </NavLink>

          <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`
            }
          >
            Contact
          </NavLink>

          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`
            }
          >
            Global
          </NavLink>
        </div>

        <NavLink
          to="/contact-us"
          className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-all duration-200 hover:bg-indigo-700 sm:px-5 sm:text-sm"
        >
          Login
        </NavLink>
      </nav>
    </header>
  )
}

export default Navbar
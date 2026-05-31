import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { NavLink, useSearchParams } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import CtaSection from '../../components/CtaSection'
import Footer from '../../components/Footer'
import { serviceCategories } from '../../data/servicesData'
import { getServiceDetailPath } from '../../utils/serviceSlug'

const CATEGORY_META = {
  Startup: {
    description: 'Choose how to structure and register your business in India.',
  },
  Registration: {
    description: 'Licenses, certifications, and statutory registrations for your operations.',
  },
  Trademark: {
    description: 'Protect brands, designs, copyrights, and patents.',
  },
  GST: {
    description: 'GST registration, returns, amendments, and related compliance.',
  },
  'Income Tax': {
    description: 'Income tax returns, TDS, notices, and business tax filing.',
  },
  MCA: {
    description: 'ROC filings, director changes, and company/LLP compliance.',
  },
  Compliance: {
    description: 'Recurring filings, payroll, bookkeeping, and ongoing support.',
  },
}

const ChevronIcon = () => (
  <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M7 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const SearchIcon = () => (
  <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-slate-500" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
    <circle cx="9" cy="9" r="6" />
    <path d="M14 14l3 3" strokeLinecap="round" />
  </svg>
)

const Services = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const categoryParam = searchParams.get('category')

  const [activeCategory, setActiveCategory] = useState(() => {
    const fromUrl = serviceCategories.find((item) => item.label === categoryParam)
    return fromUrl?.label ?? serviceCategories[0]?.label ?? 'Startup'
  })

  useEffect(() => {
    if (!categoryParam) return
    const match = serviceCategories.find((item) => item.label === categoryParam)
    if (match) setActiveCategory(match.label)
  }, [categoryParam])

  const normalizedSearch = search.trim().toLowerCase()
  const isSearching = normalizedSearch.length > 0

  const filteredCategories = useMemo(() => {
    if (!isSearching) return serviceCategories

    return serviceCategories
      .map((category) => {
        const matchesCategory = category.label.toLowerCase().includes(normalizedSearch)
        const matchingOptions = category.options.filter((option) =>
          option.toLowerCase().includes(normalizedSearch),
        )

        if (matchesCategory) return category

        return { ...category, options: matchingOptions }
      })
      .filter((category) => category.options.length > 0)
  }, [isSearching, normalizedSearch])

  const activeCategoryData =
    filteredCategories.find((item) => item.label === activeCategory) ??
    filteredCategories[0] ??
    null

  const selectCategory = (label) => {
    setActiveCategory(label)
    setSearchParams({ category: label }, { replace: true })
  }

  const totalServices = serviceCategories.reduce((sum, cat) => sum + cat.options.length, 0)

  return (
    <>
      <Navbar />
      <div data-appearance="dark" className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <main>
          <section className="relative overflow-hidden border-b border-white/10 bg-slate-950 py-14 sm:py-16">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-32 top-10 h-64 w-64 rounded-full bg-indigo-600/20 blur-[100px]" />
              <div className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-[90px]" />
            </div>

            <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/90">Services</p>
              <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Find the right compliance service
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
                Pick a category, then choose a service. {totalServices} offerings across{' '}
                {serviceCategories.length} categories.
              </p>

              <label className="relative mt-8 block max-w-lg">
                <span className="sr-only">Search services</span>
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
                  <SearchIcon />
                </span>
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by service or category…"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-10 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-400/40 focus:bg-white/[0.07]"
                />
                {search ? (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-medium text-slate-400 transition-colors hover:text-white"
                  >
                    Clear
                  </button>
                ) : null}
              </label>
            </div>
          </section>

          <section className="py-10 sm:py-14">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              {filteredCategories.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-12 text-center">
                  <p className="text-sm text-slate-400">
                    No services found for{' '}
                    <span className="font-semibold text-white">&ldquo;{search}&rdquo;</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="mt-4 text-sm font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
                  >
                    Clear search
                  </button>
                </div>
              ) : isSearching ? (
                <div className="space-y-10">
                  <p className="text-sm text-slate-400">
                    {filteredCategories.reduce((n, c) => n + c.options.length, 0)} results across{' '}
                    {filteredCategories.length}{' '}
                    {filteredCategories.length === 1 ? 'category' : 'categories'}
                  </p>
                  {filteredCategories.map((category) => (
                    <div key={category.label}>
                      <div className="mb-4 flex flex-wrap items-end justify-between gap-2 border-b border-white/10 pb-3">
                        <div>
                          <h2 className="text-lg font-semibold text-white">{category.label}</h2>
                          <p className="mt-1 text-sm text-slate-500">
                            {CATEGORY_META[category.label]?.description}
                          </p>
                        </div>
                        <span className="text-xs font-medium text-slate-500">
                          {category.options.length} services
                        </span>
                      </div>
                      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {category.options.map((option) => (
                          <li key={`${category.label}-${option}`}>
                            <NavLink
                              to={getServiceDetailPath(category.label, option)}
                              className="group flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3.5 text-sm text-slate-200 transition-colors hover:border-cyan-400/30 hover:bg-white/[0.06] hover:text-white"
                            >
                              <span className="min-w-0 leading-snug">{option}</span>
                              <span className="text-slate-500 transition-colors group-hover:text-cyan-300">
                                <ChevronIcon />
                              </span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="lg:grid lg:grid-cols-[minmax(0,15rem)_1fr] lg:gap-10 xl:grid-cols-[minmax(0,16.5rem)_1fr]">
                  <aside className="lg:sticky lg:top-24 lg:self-start">
                    <p className="mb-3 hidden text-xs font-semibold uppercase tracking-wider text-slate-500 lg:block">
                      Categories
                    </p>
                    <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
                      {serviceCategories.map((category) => {
                        const isActive = category.label === activeCategory
                        return (
                          <button
                            key={category.label}
                            type="button"
                            onClick={() => selectCategory(category.label)}
                            className={`flex shrink-0 items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors lg:w-full ${
                              isActive
                                ? 'border-cyan-400/35 bg-cyan-500/10 text-white'
                                : 'border-white/8 bg-white/[0.03] text-slate-300 hover:border-white/15 hover:bg-white/[0.06] hover:text-white'
                            }`}
                          >
                            <span>{category.label}</span>
                            <span
                              className={`rounded-full px-2 py-0.5 text-[11px] tabular-nums ${
                                isActive ? 'bg-cyan-400/15 text-cyan-200' : 'bg-white/5 text-slate-500'
                              }`}
                            >
                              {category.options.length}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </aside>

                  {activeCategoryData ? (
                    <motion.div
                      key={activeCategoryData.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
                          <div className="min-w-0">
                            <h2 className="text-2xl font-semibold tracking-tight text-white">
                              {activeCategoryData.label}
                            </h2>
                            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
                              {CATEGORY_META[activeCategoryData.label]?.description}
                            </p>
                          </div>
                          <p className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-400">
                            {activeCategoryData.options.length} services
                          </p>
                        </div>

                        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                          {activeCategoryData.options.map((option, index) => (
                            <li key={`${activeCategoryData.label}-${option}`}>
                              <NavLink
                                to={getServiceDetailPath(activeCategoryData.label, option)}
                                className="group flex items-center gap-3 rounded-xl border border-transparent px-3 py-3.5 transition-colors hover:border-white/10 hover:bg-white/[0.04]"
                              >
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-xs font-semibold tabular-nums text-slate-500 group-hover:bg-cyan-500/10 group-hover:text-cyan-300">
                                  {String(index + 1).padStart(2, '0')}
                                </span>
                                <span className="min-w-0 flex-1 text-sm font-medium leading-snug text-slate-200 group-hover:text-white">
                                  {option}
                                </span>
                                <span className="shrink-0 text-slate-600 transition-colors group-hover:text-cyan-300">
                                  <ChevronIcon />
                                </span>
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ) : null}
                </div>
              )}
            </div>
          </section>

          <CtaSection />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Services

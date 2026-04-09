import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import CtaSection from '../../components/CtaSection'
import Footer from '../../components/Footer'
import { serviceCategories } from '../../data/servicesData'
import { getServiceDetailPath } from '../../utils/serviceSlug'

const Services = () => {
  const [search, setSearch] = useState('')

  const filteredCategories = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    if (!normalizedSearch) {
      return serviceCategories
    }

    return serviceCategories
      .map((category) => {
        const matchesCategory = category.label.toLowerCase().includes(normalizedSearch)
        const matchingOptions = category.options.filter((option) =>
          option.toLowerCase().includes(normalizedSearch),
        )

        if (matchesCategory) {
          return category
        }

        return {
          ...category,
          options: matchingOptions,
        }
      })
      .filter((category) => category.options.length > 0)
  }, [search])

  return (
    <>
      <Navbar />
      <div data-appearance="dark" className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <main>
        <motion.section
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative overflow-hidden border-b border-white/10 bg-slate-950 py-20 sm:py-24"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-indigo-600/25 blur-[100px]" />
            <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-cyan-500/15 blur-[90px]" />
            <div
              className="cw-services-hero-grid cw-services-hero-grid-lines absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
                backgroundSize: '56px 56px',
              }}
            />
            <div className="absolute inset-0 bg-linear-to-b from-slate-950/40 via-transparent to-slate-950" />
          </div>

          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/90">Services</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              All compliance services in one place
            </h1>
            <p className="mt-4 max-w-3xl text-base text-slate-400 sm:text-lg">
              Browse every main service category and quickly discover related sub-services for your business.
            </p>
            <div className="mt-8 max-w-xl rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm">
              <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-1.5">
                <span className="mr-2 text-sm text-slate-500">Search</span>
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Type category or service name..."
                  className="w-full border-0 bg-transparent px-1 py-2 text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>
            </div>
          </div>
        </motion.section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            {filteredCategories.length > 0 ? (
              <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
                {filteredCategories.map((category, index) => (
                  <motion.article
                    key={category.label}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.28), ease: 'easeOut' }}
                    className="mb-6 break-inside-avoid rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-slate-950/20 transition duration-300 hover:border-white/20 hover:bg-white/10"
                  >
                    <div className="mb-4 flex items-start justify-between gap-3 border-b border-white/10 pb-4">
                      <NavLink
                        to={getServiceDetailPath(category.label, category.options[0] || category.label)}
                        className="text-lg font-semibold tracking-tight text-white transition-colors hover:text-cyan-200"
                      >
                        {category.label}
                      </NavLink>
                      <span className="rounded-full bg-cyan-400/15 px-2.5 py-1 text-[11px] font-semibold text-cyan-200">
                        Main
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">
                      {category.options.length} services available
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {category.options.map((option) => (
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} key={`${category.label}-${option}`}>
                          <NavLink
                            to={getServiceDetailPath(category.label, option)}
                            className="group relative overflow-hidden rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors duration-300 hover:border-indigo-400/40 hover:text-white"
                          >
                            <span className="absolute inset-0 z-0 origin-left scale-x-0 rounded-full bg-linear-to-r from-indigo-600 to-cyan-500 transition-transform duration-300 group-hover:scale-x-100" />
                            <span className="relative z-10">{option}</span>
                          </NavLink>
                        </motion.div>
                      ))}
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-sm text-slate-400 shadow-lg shadow-slate-950/20">
                No services found for <span className="font-semibold text-white">{search}</span>.
              </div>
            )}
          </div>
        </section>

        <section className="border-t border-white/10 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-3">
              {[
                'Dedicated compliance experts',
                'Paperless documentation process',
                'Deadline reminders and status tracking',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm font-medium text-slate-300 shadow-lg shadow-slate-950/10"
                >
                  {item}
                </div>
              ))}
            </div>
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

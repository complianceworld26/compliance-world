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
          option.toLowerCase().includes(normalizedSearch)
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
    <div className="bg-blue-50/40 text-slate-900">
      <Navbar />
      <main>
        <motion.section
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="border-b border-blue-200/40 bg-linear-to-br from-blue-950 via-blue-900 to-blue-800 py-20 text-white sm:py-24"
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">All Compliance Services in One Place</h1>
            <p className="mt-4 max-w-3xl text-base text-blue-100 sm:text-lg">
              Browse every main service category and quickly discover related sub-services for your business.
            </p>
            <div className="mt-8 max-w-xl rounded-2xl border border-white/25 bg-white/10 p-2 backdrop-blur">
              <div className="flex items-center rounded-xl bg-white px-3 py-1.5 shadow-lg shadow-slate-950/10">
                <span className="mr-2 text-sm text-slate-400">Search</span>
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Type category or service name..."
                  className="w-full border-0 bg-transparent px-1 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>
        </motion.section>

        <section className="py-16">
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
                    className="mb-6 break-inside-avoid rounded-2xl border border-blue-100 bg-white p-6 shadow-sm shadow-blue-900/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-900/10"
                  >
                    <div className="mb-4 flex items-start justify-between gap-3 border-b border-blue-50 pb-4">
                      <NavLink
                        to={getServiceDetailPath(category.label, category.options[0] || category.label)}
                        className="text-lg font-semibold tracking-tight text-slate-900 transition-colors hover:text-indigo-700"
                      >
                        {category.label}
                      </NavLink>
                      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
                        Main
                      </span>
                    </div>
                    <p className="text-sm text-slate-500">
                      {category.options.length} services available
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {category.options.map((option) => (
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} key={`${category.label}-${option}`}>
                          <NavLink
                            to={getServiceDetailPath(category.label, option)}
                            className="group relative overflow-hidden rounded-full border border-blue-100 bg-blue-50/60 px-3 py-1.5 text-xs font-medium text-blue-900 transition-colors duration-300 hover:border-blue-300 hover:text-white"
                          >
                            <span className="absolute inset-0 z-0 origin-left scale-x-0 rounded-full bg-linear-to-r from-blue-700 to-blue-500 transition-transform duration-300 group-hover:scale-x-100" />
                            <span className="relative z-10">{option}</span>
                          </NavLink>
                        </motion.div>
                      ))}
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600 shadow-sm">
                No services found for <span className="font-semibold text-slate-900">{search}</span>.
              </div>
            )}
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-3">
              {[
                'Dedicated compliance experts',
                'Paperless documentation process',
                'Deadline reminders and status tracking',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white p-6 text-sm font-medium text-slate-700 shadow-sm shadow-slate-900/5"
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
  )
}

export default Services

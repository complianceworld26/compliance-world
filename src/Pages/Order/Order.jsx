import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { serviceCategories } from '../../data/servicesData'

const Order = () => {
  const [searchParams] = useSearchParams()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const selectedCategory = searchParams.get('category') || 'Startup'
  const selectedService = searchParams.get('service') || ''

  const selectedCategoryData = useMemo(
    () => serviceCategories.find((item) => item.label === selectedCategory) ?? serviceCategories[0],
    [selectedCategory]
  )

  const selectedServiceText = selectedService || `${selectedCategoryData.label} Service`

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <>
      <Navbar />
      <div
        data-appearance="dark"
        className="cw-order-page min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 text-white"
      >
        <main className="px-4 py-12 sm:px-6 lg:px-8">
        <section className="mx-auto w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="text-center"
          >
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Get Your <span className="text-indigo-400">{selectedServiceText}</span> Today
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-sm text-slate-300 sm:text-base">
              Start your journey with expert support. Share your details and our team will contact you shortly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
            className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-8"
          >
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h2 className="text-2xl font-semibold text-white">Apply for {selectedServiceText} Now</h2>
                <p className="mt-3 text-sm text-slate-300">
                  One dedicated compliance expert will guide you from documentation to final filing.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    'Eligibility check and consultation',
                    'Document collection and review',
                    'Application preparation and filing',
                    'Government department follow-up',
                    'Final certificate and handover',
                  ].map((step, index) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.12 + index * 0.05 }}
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
                    >
                      {step}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-indigo-300/30 bg-indigo-500/10 p-4 text-xs text-indigo-100">
                  Category: <span className="font-semibold">{selectedCategoryData.label}</span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 sm:p-6">
                <form className="space-y-4">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Full name"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none"
                  />
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none"
                  />
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel"
                    placeholder="Phone number"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none"
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder={`Tell us a bit about your ${selectedServiceText.toLowerCase()} requirement...`}
                    className="w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none"
                  />

                  <motion.button
                    type="button"
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    Continue
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </section>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Order

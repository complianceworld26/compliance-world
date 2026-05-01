import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { serviceCategories } from '../../data/servicesData'
import { submitContact } from '../../lib/contactApi'

const Order = () => {
  const [searchParams] = useSearchParams()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSending, setIsSending] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', text: '' })

  const selectedCategory = searchParams.get('category') || 'Startup'
  const selectedService = searchParams.get('service') || ''

  const selectedCategoryData = useMemo(
    () => serviceCategories.find((item) => item.label === selectedCategory) ?? serviceCategories[0],
    [selectedCategory],
  )

  const selectedServiceText = selectedService || `${selectedCategoryData.label} Service`

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFeedback({ type: '', text: '' })

    const name = formData.name.trim()
    const email = formData.email.trim()
    const message = formData.message.trim()

    if (!name || !email || !message) {
      setFeedback({
        type: 'error',
        text: 'Please fill in your name, email, and a short message so we can reach you.',
      })
      return
    }

    setIsSending(true)
    try {
      const subject = `Order: ${selectedCategoryData.label} — ${selectedService || selectedServiceText}`
      const body = `${message}\n\n— Category: ${selectedCategoryData.label}\n— Service: ${selectedService || '(not specified)'}`

      await submitContact({
        name,
        email,
        phone: formData.phone.trim(),
        subject,
        message: body,
        source: 'order',
      })

      setFeedback({
        type: 'success',
        text: 'Request received. Our team will contact you shortly.',
      })
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      setFeedback({
        type: 'error',
        text:
          error?.message && error.message.length < 400
            ? error.message
            : 'Could not submit. Ensure the backend is running and EMAILJS is configured on the server.',
      })
      console.error('[Order] submit failed:', error)
    } finally {
      setIsSending(false)
    }
  }

  const inputClass =
    'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none'

  return (
    <>
      <Navbar />
      <div
        data-appearance="dark"
        className="cw-order-page relative z-0 min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 text-white"
      >
        <main className="relative z-0 px-4 py-12 sm:px-6 lg:px-8">
          <section className="mx-auto w-full max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="text-center"
            >
              <h1 className="break-words text-2xl font-semibold tracking-tight sm:text-5xl">
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
              className="relative z-0 mt-10 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-8"
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

                <div className="relative z-10 rounded-2xl border border-white/10 bg-slate-950/40 p-4 sm:p-6">
                  <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Full name"
                      className={inputClass}
                      required
                    />
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="Email address"
                      className={inputClass}
                      required
                    />
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="tel"
                      placeholder="Phone number"
                      className={inputClass}
                    />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder={`Tell us a bit about your ${selectedServiceText.toLowerCase()} requirement...`}
                      className={`${inputClass} resize-none`}
                      required
                    />

                    {feedback.text ? (
                      <p
                        className={`rounded-xl px-3 py-2 text-sm ${
                          feedback.type === 'success'
                            ? 'border border-emerald-400/30 bg-emerald-500/15 text-emerald-100'
                            : 'border border-rose-400/30 bg-rose-500/15 text-rose-100'
                        }`}
                      >
                        {feedback.text}
                      </p>
                    ) : null}

                    <motion.button
                      type="submit"
                      disabled={isSending}
                      whileHover={isSending ? undefined : { y: -2, scale: 1.01 }}
                      whileTap={isSending ? undefined : { scale: 0.98 }}
                      className="relative z-10 w-full cursor-pointer rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSending ? 'Sending…' : 'Continue'}
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

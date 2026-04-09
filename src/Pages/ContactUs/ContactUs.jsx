import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const inputClass =
  'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none'

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div
        data-appearance="dark"
        className="cw-contact-page min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 text-white"
      >
        <main>
          <section className="bg-linear-to-br from-blue-950 to-blue-800 py-20 text-white sm:py-24">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl font-bold sm:text-5xl">Contact Our Compliance Experts</h1>
              <p className="mt-4 max-w-3xl text-base text-blue-100 sm:text-lg">
                Tell us your requirement and we will guide you with the right compliance solution.
              </p>
            </div>
          </section>

          <section className="py-16 sm:py-20">
            <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
              <form className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-8">
                <h2 className="text-2xl font-semibold text-white">Get in touch</h2>
                <p className="mt-2 text-sm text-slate-300">
                  We typically respond within one business day.
                </p>
                <div className="mt-6 space-y-4">
                  <input type="text" placeholder="Full name" className={inputClass} />
                  <input type="email" placeholder="Business email" className={inputClass} />
                  <input type="text" placeholder="Phone number" className={inputClass} />
                  <textarea
                    rows={4}
                    placeholder="Tell us what you need"
                    className={`${inputClass} resize-none`}
                  />
                  <button
                    type="button"
                    className="w-full rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:from-indigo-400 hover:to-violet-400"
                  >
                    Submit Request
                  </button>
                </div>
              </form>

              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-6 backdrop-blur-sm sm:p-8">
                <h3 className="text-xl font-semibold text-white">Contact Information</h3>
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  <p>Email: support@complianceworld.com</p>
                  <p>Phone: +91 90000 00000</p>
                  <p>Office: Mumbai, India</p>
                  <p>Working Hours: Mon - Sat, 9:00 AM to 7:00 PM</p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default ContactUs

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useTheme } from '../../context/ThemeContext'

const trustPoints = [
  { label: 'Avg. response time', value: '< 24 hours' },
  { label: 'Compliance experts', value: '50+' },
  { label: 'Businesses served', value: '12,000+' },
]

const contactChannels = [
  {
    title: 'Email Support',
    value: 'support@complianceworld.com',
    note: 'Best for document-heavy queries and detailed requirements.',
  },
  {
    title: 'Call Support',
    value: '+91 90000 00000',
    note: 'Quick discussion for urgent registration and filing timelines.',
  },
  {
    title: 'Office',
    value: 'Mumbai, India',
    note: 'Mon - Sat, 9:00 AM to 7:00 PM',
  },
]

const ContactUs = () => {
  const { isLight } = useTheme()

  const pageClass = isLight
    ? 'cw-contact-page min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50 text-slate-900'
    : 'cw-contact-page min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 text-white'
  const heroClass = isLight
    ? 'relative overflow-hidden border-b border-slate-200 bg-linear-to-b from-indigo-50 via-sky-50 to-white py-20 text-slate-900 sm:py-24'
    : 'relative overflow-hidden border-b border-white/10 bg-linear-to-b from-blue-950/80 to-slate-950 py-20 text-white sm:py-24'
  const heroSubClass = isLight ? 'mt-4 max-w-3xl text-base text-slate-700 sm:text-lg' : 'mt-4 max-w-3xl text-base text-blue-100 sm:text-lg'
  const heroGlowClass = isLight
    ? 'pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.15),transparent_34%),radial-gradient(circle_at_top_left,rgba(99,102,241,0.12),transparent_38%)]'
    : 'pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.2),transparent_32%),radial-gradient(circle_at_top_left,rgba(99,102,241,0.15),transparent_36%)]'
  const trustPillClass = isLight
    ? 'rounded-full border border-indigo-200 bg-white/80 px-4 py-2 text-xs font-semibold text-indigo-700 shadow-sm shadow-indigo-100'
    : 'rounded-full border border-cyan-300/25 bg-white/10 px-4 py-2 text-xs font-semibold text-cyan-100'
  const formCardClass = isLight
    ? 'rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/10 sm:p-8'
    : 'rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-8'
  const formSubClass = isLight ? 'mt-2 text-sm text-slate-600' : 'mt-2 text-sm text-slate-300'
  const inputClass = isLight
    ? 'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 transition focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100'
    : 'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 transition focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20'
  const primaryBtnClass = isLight
    ? 'w-full rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:from-indigo-500 hover:to-violet-500'
    : 'w-full rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:from-indigo-400 hover:to-violet-400'
  const serviceTagClass = isLight
    ? 'rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700'
    : 'rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-medium text-slate-200'
  const infoCardClass = isLight
    ? 'rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/10 sm:p-8'
    : 'rounded-3xl border border-white/10 bg-slate-950/40 p-6 backdrop-blur-sm sm:p-8'
  const infoTextClass = isLight ? 'mt-4 space-y-3 text-sm text-slate-700' : 'mt-4 space-y-3 text-sm text-slate-300'
  const channelCardClass = isLight
    ? 'rounded-2xl border border-slate-200 bg-slate-50 p-4'
    : 'rounded-2xl border border-white/10 bg-white/5 p-4'
  const channelTitleClass = isLight ? 'text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700' : 'text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300'
  const channelValueClass = isLight ? 'mt-2 text-base font-semibold text-slate-900' : 'mt-2 text-base font-semibold text-white'
  const channelNoteClass = isLight ? 'mt-1 text-sm text-slate-600' : 'mt-1 text-sm text-slate-300'

  return (
    <>
      <Navbar />
      <div
        data-appearance={isLight ? 'light' : 'dark'}
        className={pageClass}
      >
        <main>
          <section className={heroClass}>
            <div className={heroGlowClass} />
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="max-w-4xl text-4xl font-bold sm:text-5xl">Get expert help for your business compliance journey</h1>
              <p className={heroSubClass}>
                Tell us your requirement and our team will recommend the right service path, pricing model, and timeline.
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {trustPoints.map((item) => (
                  <div key={item.label} className={trustPillClass}>
                    {item.label}: {item.value}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 sm:py-20">
            <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
              <form className={formCardClass}>
                <h2 className={`text-2xl font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>Get in touch</h2>
                <p className={formSubClass}>
                  We typically respond within one business day.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className={serviceTagClass}>Company Registration</span>
                  <span className={serviceTagClass}>GST</span>
                  <span className={serviceTagClass}>Income Tax</span>
                  <span className={serviceTagClass}>MCA Compliance</span>
                </div>
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
                    className={primaryBtnClass}
                  >
                    Submit Request
                  </button>
                </div>
              </form>

              <div className={infoCardClass}>
                <h3 className={`text-xl font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>Contact Information</h3>
                <p className={infoTextClass}>Choose your preferred channel and our compliance team will assist you quickly.</p>
                <div className="mt-5 space-y-3">
                  {contactChannels.map((item) => (
                    <div key={item.title} className={channelCardClass}>
                      <p className={channelTitleClass}>{item.title}</p>
                      <p className={channelValueClass}>{item.value}</p>
                      <p className={channelNoteClass}>{item.note}</p>
                    </div>
                  ))}
                </div>
                <div className={`mt-6 rounded-2xl border p-4 ${isLight ? 'border-emerald-200 bg-emerald-50' : 'border-emerald-300/20 bg-emerald-500/10'}`}>
                  <p className={`text-sm font-medium ${isLight ? 'text-emerald-700' : 'text-emerald-200'}`}>
                    Need urgent help?
                  </p>
                  <p className={`mt-1 text-sm ${isLight ? 'text-emerald-700/90' : 'text-emerald-100/90'}`}>
                    Mention "priority" in your message and we will fast-track the first response.
                  </p>
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

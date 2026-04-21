import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { useTheme } from '../../context/ThemeContext'

const stats = [
  { label: 'Businesses supported', value: '12,000+' },
  { label: 'Compliance filings completed', value: '50,000+' },
  { label: 'Average response time', value: '< 24 hours' },
  { label: 'Pan-India coverage', value: '28 states' },
]

const values = [
  {
    title: 'Clarity first',
    text: 'We turn legal and tax complexity into plain-language guidance so founders can make confident decisions.',
  },
  {
    title: 'Execution with accountability',
    text: 'Every filing is tracked, reviewed, and delivered with timelines you can trust.',
  },
  {
    title: 'Long-term partnership',
    text: 'From day-one registration to yearly compliance, we stay with you as your business scales.',
  },
]

const process = [
  {
    step: '01',
    title: 'Understand your requirement',
    text: 'We start with your business stage, category, and compliance goals.',
  },
  {
    step: '02',
    title: 'Prepare and file accurately',
    text: 'Our team handles documentation, drafting, and portal filings end-to-end.',
  },
  {
    step: '03',
    title: 'Track until completion',
    text: 'You get proactive updates until final approval, certificate, or closure.',
  },
]

const AboutUs = () => {
  const { isLight } = useTheme()

  const pageClass = isLight ? 'min-h-screen bg-slate-50 text-slate-900' : 'min-h-screen bg-slate-950 text-white'
  const heroClass = isLight
    ? 'relative overflow-hidden border-b border-slate-200 bg-linear-to-b from-indigo-50 via-sky-50 to-white py-20 sm:py-24'
    : 'relative overflow-hidden border-b border-white/10 bg-linear-to-b from-blue-950/80 to-slate-950 py-20 sm:py-24'
  const heroGlowClass = isLight
    ? 'pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.15),transparent_34%),radial-gradient(circle_at_top_left,rgba(99,102,241,0.12),transparent_38%)]'
    : 'pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.2),transparent_32%),radial-gradient(circle_at_top_left,rgba(99,102,241,0.15),transparent_36%)]'
  const eyebrowClass = isLight
    ? 'text-xs font-semibold uppercase tracking-[0.24em] text-indigo-700'
    : 'text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300'
  const heroTitleClass = isLight ? 'mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl' : 'mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl'
  const heroBodyClass = isLight ? 'mt-5 text-base text-slate-600 sm:text-lg' : 'mt-5 text-base text-blue-100/90 sm:text-lg'
  const statsCardClass = isLight
    ? 'rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5'
    : 'rounded-2xl border border-white/12 bg-linear-to-b from-white/8 to-white/4 p-5 shadow-xl shadow-black/20'
  const statsValueClass = isLight ? 'text-2xl font-bold text-slate-900' : 'text-2xl font-bold text-white'
  const statsLabelClass = isLight ? 'mt-2 text-sm text-slate-600' : 'mt-2 text-sm text-blue-100/80'
  const splitSectionClass = isLight ? 'border-y border-slate-200 py-16 sm:py-20' : 'border-y border-white/10 py-16 sm:py-20'
  const sectionTitleClass = isLight ? 'text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl' : 'text-3xl font-bold tracking-tight text-white sm:text-4xl'
  const bodyTextClass = isLight ? 'mt-4 text-sm leading-7 text-slate-600 sm:text-base' : 'mt-4 text-sm leading-7 text-blue-100/85 sm:text-base'
  const valueCardClass = isLight ? 'rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5' : 'rounded-2xl border border-white/12 bg-white/5 p-5'
  const valueTitleClass = isLight ? 'text-lg font-semibold text-slate-900' : 'text-lg font-semibold text-white'
  const valueTextClass = isLight ? 'mt-2 text-sm leading-6 text-slate-600' : 'mt-2 text-sm leading-6 text-blue-100/80'
  const processLeadClass = isLight ? 'mt-3 max-w-2xl text-sm text-slate-600 sm:text-base' : 'mt-3 max-w-2xl text-sm text-blue-100/85 sm:text-base'
  const processCardClass = isLight
    ? 'rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5'
    : 'rounded-2xl border border-white/12 bg-linear-to-b from-white/8 to-white/4 p-6 shadow-xl shadow-black/20'
  const processStepClass = isLight ? 'text-xs font-semibold tracking-[0.2em] text-indigo-700' : 'text-xs font-semibold tracking-[0.2em] text-cyan-300'
  const processTitleClass = isLight ? 'mt-3 text-xl font-semibold text-slate-900' : 'mt-3 text-xl font-semibold text-white'
  const processTextClass = isLight ? 'mt-3 text-sm leading-7 text-slate-600' : 'mt-3 text-sm leading-7 text-blue-100/80'
  const ctaWrapClass = isLight
    ? 'rounded-3xl border border-slate-200 bg-linear-to-r from-indigo-100/80 via-sky-100/70 to-cyan-100/70 p-8 shadow-xl shadow-slate-900/10 sm:p-10'
    : 'rounded-3xl border border-white/12 bg-linear-to-r from-indigo-900/40 via-blue-900/35 to-cyan-900/35 p-8 shadow-2xl shadow-black/30 sm:p-10'
  const ctaTitleClass = isLight ? 'text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl' : 'text-3xl font-bold tracking-tight text-white sm:text-4xl'
  const ctaBodyClass = isLight ? 'mt-3 max-w-2xl text-sm text-slate-700 sm:text-base' : 'mt-3 max-w-2xl text-sm text-blue-100/90 sm:text-base'
  const primaryBtnClass = isLight
    ? 'inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700'
    : 'inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-cyan-100'
  const secondaryBtnClass = isLight
    ? 'inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100'
    : 'inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15'

  return (
    <>
      <Navbar />
      <div data-appearance={isLight ? 'light' : 'dark'} className={pageClass}>
        <main>
          <section className={heroClass}>
            <div className={heroGlowClass} />
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="max-w-3xl"
              >
                <p className={eyebrowClass}>About Compliance World</p>
                <h1 className={heroTitleClass}>
                  Building confidence in every compliance decision
                </h1>
                <p className={heroBodyClass}>
                  Compliance World helps founders and growing businesses manage registrations, tax filings, MCA requirements, and
                  recurring compliance from one calm, expert-led workspace.
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-14 sm:py-16">
            <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className={statsCardClass}
                >
                  <p className={statsValueClass}>{item.value}</p>
                  <p className={statsLabelClass}>{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={splitSectionClass}>
            <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
              <div>
                <h2 className={sectionTitleClass}>Our mission</h2>
                <p className={bodyTextClass}>
                  We believe compliance should never slow down ambitious businesses. Our mission is to make critical legal and tax
                  obligations simple, timely, and transparent so entrepreneurs can focus on growth.
                </p>
                <p className={bodyTextClass}>
                  Instead of fragmented advisors and uncertain timelines, we provide one reliable team that combines domain expertise,
                  practical process management, and clear communication.
                </p>
              </div>

              <div className="grid gap-4">
                {values.map((item) => (
                  <div key={item.title} className={valueCardClass}>
                    <h3 className={valueTitleClass}>{item.title}</h3>
                    <p className={valueTextClass}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 sm:py-20">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className={sectionTitleClass}>How we work</h2>
              <p className={processLeadClass}>
                Our delivery model keeps every engagement structured, transparent, and deadline-focused.
              </p>

              <div className="mt-8 grid gap-5 lg:grid-cols-3">
                {process.map((item) => (
                  <div
                    key={item.step}
                    className={processCardClass}
                  >
                    <p className={processStepClass}>{item.step}</p>
                    <h3 className={processTitleClass}>{item.title}</h3>
                    <p className={processTextClass}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="pb-16 sm:pb-20">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className={ctaWrapClass}>
                <h2 className={ctaTitleClass}>Ready to simplify compliance?</h2>
                <p className={ctaBodyClass}>
                  Talk to our team and get a practical roadmap for registrations, filings, and ongoing compliance.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <NavLink
                    to="/contact-us"
                    className={primaryBtnClass}
                  >
                    Speak to an Expert
                  </NavLink>
                  <NavLink
                    to="/services"
                    className={secondaryBtnClass}
                  >
                    Explore Services
                  </NavLink>
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

export default AboutUs

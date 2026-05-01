import Footer from './Footer'
import Navbar from './Navbar'
import { useTheme } from '../context/ThemeContext'

export function useLegalProse() {
  const { isLight } = useTheme()
  return {
    h2: isLight
      ? 'mt-10 text-lg font-semibold text-slate-900 first:mt-0'
      : 'mt-10 text-lg font-semibold text-white first:mt-0',
    p: isLight ? 'mt-3 text-sm leading-7 text-slate-600 sm:text-base' : 'mt-3 text-sm leading-7 text-blue-100/85 sm:text-base',
    ul: isLight
      ? 'mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600 sm:text-base'
      : 'mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-blue-100/85 sm:text-base',
    li: isLight ? 'marker:text-slate-400' : 'marker:text-blue-300/50',
  }
}

const LegalPageLayout = ({ title, lastUpdated, children }) => {
  const { isLight } = useTheme()

  const pageClass = isLight
    ? 'min-h-screen bg-slate-50 text-slate-900'
    : 'min-h-screen bg-slate-950 text-white'
  const heroClass = isLight
    ? 'relative overflow-hidden border-b border-slate-200 bg-linear-to-b from-indigo-50 via-sky-50 to-white py-16 sm:py-20'
    : 'relative overflow-hidden border-b border-white/10 bg-linear-to-b from-blue-950/80 to-slate-950 py-16 sm:py-20'
  const heroGlowClass = isLight
    ? 'pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_34%),radial-gradient(circle_at_top_left,rgba(99,102,241,0.1),transparent_38%)]'
    : 'pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_32%),radial-gradient(circle_at_top_left,rgba(99,102,241,0.12),transparent_36%)]'
  const eyebrowClass = isLight
    ? 'text-xs font-semibold uppercase tracking-[0.24em] text-indigo-700'
    : 'text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300'
  const titleClass = isLight
    ? 'mt-3 break-words text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl'
    : 'mt-3 break-words text-3xl font-bold tracking-tight text-white sm:text-4xl'
  const metaClass = isLight ? 'mt-4 text-sm text-slate-600' : 'mt-4 text-sm text-blue-100/85'
  const articleClass = 'mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8'

  return (
    <>
      <Navbar />
      <div data-appearance={isLight ? 'light' : 'dark'} className={pageClass}>
        <header className={heroClass}>
          <div className={heroGlowClass} />
          <div className="relative mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
            <p className={eyebrowClass}>Legal</p>
            <h1 className={titleClass}>{title}</h1>
            {lastUpdated ? <p className={metaClass}>Last updated: {lastUpdated}</p> : null}
          </div>
        </header>
        <article className={articleClass}>{children}</article>
      </div>
      <Footer />
    </>
  )
}

export default LegalPageLayout

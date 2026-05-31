import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

const pillars = [
  {
    title: 'Single accountable team',
    body: 'One pod owns your filings end-to-end — no ticket roulette or handoffs that stall progress.',
  },
  {
    title: 'Deadline intelligence',
    body: 'Proactive nudges, calendars, and prep lists so statutory dates never land as surprises.',
  },
  {
    title: 'Secure document flow',
    body: 'Encrypted intake, versioned storage, and clear audit trails for every submission.',
  },
  {
    title: 'Transparent pricing',
    body: 'Scoped proposals and predictable renewals — you always know what ships in each cycle.',
  },
]

const FeaturesSection = () => {
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      gsap.from('.feat-head > *', {
        x: -24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.feat-head', start: 'top 80%' },
      })

      gsap.from('.feat-card', {
        y: 32,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.feat-grid', start: 'top 82%' },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="relative bg-slate-950 py-24 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
          <div className="feat-head lg:col-span-5">
            <p className="cw-home-eyebrow text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/90">Why teams stay</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Built for operators who cannot afford misses
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-slate-400">
              We combine process discipline with human judgment — so compliance feels like a capability, not a
              chore list.
            </p>
          </div>

          <div className="feat-grid grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {pillars.map((item) => (
              <article
                key={item.title}
                className="cw-home-card feat-card rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-indigo-300/40 hover:bg-white/10"
              >
                <div className="cw-home-badge flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/30 text-xs font-bold text-indigo-100">
                  ✓
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection

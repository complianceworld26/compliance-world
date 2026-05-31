import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

const steps = [
  {
    number: '01',
    title: 'Consultation & scope',
    description:
      'We review your requirement, confirm eligibility, and list the documents and filings involved before any work begins.',
  },
  {
    number: '02',
    title: 'Document preparation',
    description:
      'You share information through a structured checklist. Our team prepares forms, drafts, and supporting paperwork for review.',
  },
  {
    number: '03',
    title: 'Filing & follow-through',
    description:
      'We submit to the relevant authority, monitor status, and inform you at each milestone until the matter is closed.',
  },
]

const HowItWorksSection = () => {
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      gsap.from('.hiw-reveal', {
        y: 24,
        opacity: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: root, start: 'top 85%', once: true },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="cw-home-band border-t border-white/10 bg-slate-900/50 py-20 text-white sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="hiw-reveal mx-auto max-w-3xl text-center">
          <p className="cw-home-eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">How it works</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">A clear process from enquiry to completion</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
            Every engagement follows the same disciplined workflow — so you always know what happens next.
          </p>
        </div>

        <div className="hiw-reveal relative mt-14 lg:mt-16">
          <div
            className="cw-hiw-connector pointer-events-none absolute left-[16.666%] right-[16.666%] top-5 hidden h-px lg:block"
            aria-hidden
          />

          <ol className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
            {steps.map((step) => (
              <li key={step.number} className="relative text-center md:text-left">
                <div className="cw-home-step mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs font-bold tracking-wide text-cyan-300 md:mx-0">
                  {step.number}
                </div>

                <h3 className="mt-6 text-lg font-semibold text-white sm:text-xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-[15px]">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="cw-home-card hiw-reveal mx-auto mt-14 max-w-3xl rounded-xl border border-white/10 bg-white/5 px-6 py-5 text-center sm:px-8">
          <p className="text-sm leading-relaxed text-slate-400">
            <span className="font-medium text-slate-200">Typical turnaround:</span> most standard registrations and
            filings are initiated within 2–5 business days after documents are received.
          </p>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection

import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'

const faqs = [
  {
    q: 'How quickly can you start on a new engagement?',
    a: 'Most workflows begin within two business days after we receive your scope and core documents. Urgent filings are triaged the same day.',
  },
  {
    q: 'Do you support businesses outside India?',
    a: 'Our core filings are India-focused today. For global entities we coordinate with local counsel and keep a single project thread for you.',
  },
  {
    q: 'How do you handle document security?',
    a: 'Encrypted intake, role-based access, and retained audit logs. We only request what the filing requires — nothing extra in shared drives.',
  },
  {
    q: 'Can we move an existing compliance stack to you mid-year?',
    a: 'Yes. We run a structured handover: reconcile open items, map deadlines, and pick up filings without duplicating work you already completed.',
  },
  {
    q: 'What does pricing typically include?',
    a: 'Scoped deliverables per service — preparation, filing, acknowledgments, and a close-out summary. Renewals are quoted before each cycle.',
  },
]

const FaqSection = () => {
  const rootRef = useRef(null)
  const [open, setOpen] = useState(0)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      gsap.from('.faq-head > *', {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.faq-head', start: 'top 82%' },
      })

      gsap.from('.faq-item', {
        y: 20,
        opacity: 0,
        duration: 0.55,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.faq-list', start: 'top 85%' },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} id="faq" className="bg-slate-950 py-24 sm:py-28">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="faq-head text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/90">FAQ</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Answers before you ask
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Straightforward notes on how we work together. Reach out if you need something bespoke.
          </p>
        </div>

        <ul className="faq-list mt-14 space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <li key={item.q} className="faq-item overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-white/10 sm:px-6 sm:py-5"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span className="min-w-0 flex-1 pr-2 text-sm font-semibold text-white sm:text-base">{item.q}</span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-lg leading-none transition ${
                      isOpen
                        ? 'rotate-45 border-indigo-300/50 bg-indigo-500/20 text-indigo-200'
                        : 'border-white/20 bg-white/5 text-slate-400'
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid px-5 transition-[grid-template-rows,opacity] duration-300 ease-out sm:px-6 ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 text-sm leading-relaxed text-slate-400 sm:pb-6">{item.a}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default FaqSection

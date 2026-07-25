import { useLayoutEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { gsap } from '../lib/gsap'

const CtaSection = () => {
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      gsap.from('.cta-inner > *', {
        y: 16,
        opacity: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: 'power2.out',
        scrollTrigger: { trigger: root, start: 'top 88%', once: true },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="relative border-t border-white/8 bg-slate-950 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="cw-home-cta cta-inner flex flex-col gap-8 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-8 sm:px-8 sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-xl">
            <p className="cw-home-eyebrow text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-400/90">Get started</p>
            <h2 className="mt-3 text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl">
              Tell us what you need filed next
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-[15px]">
              Share your requirement and we&apos;ll outline the steps, documents, and timeline, with one team handling
              it through to completion.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <NavLink
              to="/contact-us"
              className="inline-flex items-center justify-center rounded-lg border border-cyan-400/35 bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan-400/50 hover:bg-cyan-500/15"
            >
              Contact us
            </NavLink>
            <NavLink
              to="/services"
              className="inline-flex items-center justify-center rounded-lg border border-white/12 bg-white/5 px-5 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              Browse services
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CtaSection

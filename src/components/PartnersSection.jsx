import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

const partners = ['Northwind Capital', 'Bloom Retail', 'FinEdge Labs', 'PixelMint', 'Aurora Health', 'BlueRoute']

const PartnersSection = () => {
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      gsap.from('.part-head > *', {
        y: 20,
        opacity: 0,
        duration: 0.55,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.part-head', start: 'top 88%' },
      })

      gsap.from('.part-logo', {
        y: 16,
        opacity: 0,
        duration: 0.5,
        stagger: { each: 0.06, from: 'random' },
        ease: 'power2.out',
        scrollTrigger: { trigger: '.part-row', start: 'top 90%' },
      })

      gsap.to('.part-marquee', {
        xPercent: -50,
        ease: 'none',
        duration: 22,
        repeat: -1,
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="bg-slate-950 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="part-head text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Trusted by teams at</p>
          <p className="mx-auto mt-3 max-w-lg text-sm text-slate-400">
            From funded startups to growing mid-market brands — one compliance rhythm across portfolios.
          </p>
        </div>

        <div className="part-row relative mt-10 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-slate-950 to-transparent sm:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-slate-950 to-transparent sm:w-20" />
          <div className="part-marquee flex w-max gap-4 pr-4 will-change-transform">
            {[...partners, ...partners].map((name, idx) => (
              <div
                key={`${name}-${idx}`}
                className="part-logo flex min-w-44 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-slate-200"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PartnersSection

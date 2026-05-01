import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

const stats = [
  { label: 'Businesses served', value: 1000, suffix: '+' },
  { label: 'GST filings', value: 500, suffix: '+' },
  { label: 'Registrations', value: 300, suffix: '+' },
]

const testimonials = [
  {
    name: 'Aarav Sharma',
    role: 'Founder, FinEdge Labs',
    quote:
      'Compliance World made our company registration and GST process completely stress-free and fast.',
  },
  {
    name: 'Naina Gupta',
    role: 'Director, Bloom Retail',
    quote: 'Proactive reminders and expert handling — we have not missed a filing window since.',
  },
  {
    name: 'Rahul Verma',
    role: 'Co-founder, PixelMint',
    quote: 'Excellent support and a clean process. We run compliance through one partner now.',
  },
]

const TrustSection = () => {
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      gsap.from('.trust-stat', {
        y: 28,
        opacity: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.trust-stats', start: 'top 82%' },
      })

      stats.forEach((stat, i) => {
        const el = root.querySelector(`[data-stat-value="${i}"]`)
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.value,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.val)}${stat.suffix}`
          },
        })
      })

      gsap.from('.trust-quote', {
        y: 32,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.trust-quotes', start: 'top 82%' },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="bg-slate-950 py-24 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="trust-stats grid gap-5 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="trust-stat rounded-2xl border border-white/10 bg-white/5 p-8 text-center"
            >
              <p
                className="text-4xl font-semibold tabular-nums tracking-tight text-white sm:text-5xl"
                data-stat-value={i}
              >
                0{stat.suffix}
              </p>
              <p className="mt-2 text-sm font-medium text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <h3 className="text-center text-2xl font-semibold text-white sm:text-3xl">What clients say</h3>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-slate-400 sm:text-base">
            Teams that need velocity with governance — without sacrificing sleep.
          </p>
          <div className="trust-quotes mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item) => (
              <article
                key={item.name}
                className="trust-quote rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/10"
              >
                <p className="text-sm leading-7 text-slate-300">"{item.quote}"</p>
                <p className="mt-6 text-base font-semibold text-white">{item.name}</p>
                <p className="text-sm text-slate-400">{item.role}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustSection

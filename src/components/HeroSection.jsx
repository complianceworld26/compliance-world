import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

const HeroSection = () => {
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.hero-eyebrow', { y: 24, opacity: 0, duration: 0.6 })
        .from('.hero-title .hero-line', { y: 48, opacity: 0, duration: 0.75, stagger: 0.12 }, '-=0.35')
        .from('.hero-sub', { y: 20, opacity: 0, duration: 0.55 }, '-=0.45')
        .from('.hero-cta', { y: 16, opacity: 0, duration: 0.5, stagger: 0.08 }, '-=0.35')
        .from('.hero-panel', { y: 40, opacity: 0, scale: 0.96, duration: 0.8, ease: 'power2.out' }, '-=0.65')
        .from('.hero-float', { y: 28, opacity: 0, duration: 0.55, stagger: 0.1 }, '-=0.5')

      gsap.to('.hero-orb-a', {
        y: -18,
        x: 10,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      gsap.to('.hero-orb-b', {
        y: 22,
        x: -12,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      gsap.to('.hero-grid-fade', {
        opacity: 0.45,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      id="home"
      className="relative overflow-hidden bg-slate-950 text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-orb-a absolute -left-32 top-20 h-[28rem] w-[28rem] rounded-full bg-indigo-600/35 blur-[100px]" />
        <div className="hero-orb-b absolute -right-24 bottom-10 h-[24rem] w-[24rem] rounded-full bg-cyan-500/25 blur-[90px]" />
        <div
          className="hero-grid-fade absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/20 via-transparent to-slate-950" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-20">
        <div className="max-w-2xl space-y-8">
          <p className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200/90">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
            Trusted compliance partner
          </p>

          <h1 className="hero-title text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.35rem]">
            <span className="hero-line block text-white">Compliance that moves</span>
            <span className="cw-hero-gradient-line hero-line mt-1 block bg-linear-to-r from-white via-cyan-100 to-indigo-200 bg-clip-text text-transparent">
              as fast as your business
            </span>
          </h1>

          <p className="hero-sub max-w-lg text-base leading-relaxed text-slate-400 sm:text-lg">
            Registration, GST, tax, ROC, and payroll — orchestrated in one calm workspace with experts who
            own the details.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="#contact"
              className="hero-cta inline-flex rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 shadow-lg shadow-indigo-950/40 transition hover:bg-slate-100"
            >
              Get started
            </a>
            <a
              href="#services"
              className="hero-cta inline-flex rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/25 hover:bg-white/10"
            >
              View services
            </a>
          </div>

          <div className="hero-float flex flex-wrap gap-6 border-t border-white/10 pt-8 text-sm text-slate-500">
            <div>
              <p className="text-2xl font-semibold tracking-tight text-white">4.9/5</p>
              <p className="mt-0.5 text-xs uppercase tracking-wider text-slate-500">Client satisfaction</p>
            </div>
            <div className="hidden h-10 w-px bg-white/10 sm:block" />
            <div>
              <p className="text-2xl font-semibold tracking-tight text-white">48h</p>
              <p className="mt-0.5 text-xs uppercase tracking-wider text-slate-500">Avg. first response</p>
            </div>
          </div>
        </div>

        <div className="hero-panel relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="absolute -inset-1 rounded-3xl bg-linear-to-br from-indigo-500/30 via-transparent to-cyan-500/20 blur-xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Workspace</p>
                <p className="mt-1 text-lg font-semibold text-white">Compliance overview</p>
              </div>
              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                On track
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="hero-float rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Health score</p>
                <p className="mt-2 text-3xl font-semibold tabular-nums text-white">98%</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[98%] rounded-full bg-linear-to-r from-cyan-400 to-indigo-400" />
                </div>
              </div>
              <div className="hero-float rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Automations</p>
                <p className="mt-2 text-3xl font-semibold tabular-nums text-white">1,200+</p>
                <p className="mt-3 text-xs text-slate-500">Tasks cleared this quarter</p>
              </div>
            </div>

            <div className="hero-float mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Upcoming</p>
              <ul className="mt-3 space-y-2.5">
                {['GST filing — Apr 20', 'TDS return — Apr 30', 'ROC update — May 10'].map((item) => (
                  <li
                    key={item}
                    className="flex items-center justify-between gap-3 rounded-xl bg-white/5 px-3 py-2.5 text-sm text-slate-200"
                  >
                    <span>{item}</span>
                    <span className="h-2 w-2 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

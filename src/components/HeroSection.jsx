import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

/** Royalty-free photos (Unsplash) — swap for your own assets in /public when ready */
const HERO_IMAGES = {
  team:
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=82',
  workspace:
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=82',
  finance:
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=82',
}

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

      <div className="relative mx-auto grid min-h-[calc(100dvh-4rem)] w-full min-w-0 max-w-7xl items-center gap-12 px-4 py-14 sm:gap-14 sm:px-6 sm:py-16 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[1.08fr_1fr] lg:gap-20 lg:px-8 lg:py-24">
        <div className="max-w-2xl min-w-0 space-y-6 sm:space-y-8 lg:py-2">
          <p className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200/90">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
            Trusted compliance partner
          </p>

          <h1 className="hero-title break-words text-3xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.35rem]">
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

        <div className="hero-panel relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="absolute -inset-1 rounded-[1.75rem] bg-linear-to-br from-indigo-500/35 via-transparent to-cyan-500/25 blur-xl" />
          <div className="relative grid gap-4 sm:gap-5">
            <div className="hero-float relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 shadow-2xl sm:aspect-[5/4] lg:aspect-[16/11]">
              <img
                src={HERO_IMAGES.team}
                alt="Business team collaborating on compliance and planning in a modern office"
                className="h-full w-full object-cover"
                width={1400}
                height={933}
                fetchPriority="high"
                decoding="async"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-cyan-200/90">
                      Your compliance desk
                    </p>
                    <p className="mt-1 max-w-[16rem] text-lg font-semibold leading-snug text-white sm:text-xl">
                      Experts and process, aligned with your filings
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-400/30">
                    On track
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              <div className="hero-float relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-lg sm:aspect-square">
                <img
                  src={HERO_IMAGES.workspace}
                  alt="Bright open workspace with desks and natural light"
                  className="h-full w-full object-cover"
                  width={900}
                  height={900}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-slate-950/15" />
              </div>
              <div className="hero-float flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-sm">
                <div className="relative aspect-[4/3] shrink-0 sm:aspect-[5/4]">
                  <img
                    src={HERO_IMAGES.finance}
                    alt="Financial documents and calculator on a desk"
                    className="h-full w-full object-cover"
                    width={900}
                    height={675}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />
                </div>
                <div className="flex flex-1 flex-col justify-center gap-3 p-4 sm:p-5">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Health score</p>
                    <p className="mt-1 text-2xl font-semibold tabular-nums text-white sm:text-3xl">98%</p>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[98%] rounded-full bg-linear-to-r from-cyan-400 to-indigo-400" />
                  </div>
                  <p className="text-xs text-slate-500">Filings and reviews staying ahead of deadlines</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

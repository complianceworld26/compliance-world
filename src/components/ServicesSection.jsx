import { useLayoutEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import {
  HiOutlineBuildingOffice2,
  HiOutlineClipboardDocumentCheck,
  HiOutlineDocumentText,
  HiOutlineScale,
} from 'react-icons/hi2'
import { gsap } from '../lib/gsap'

const mainServices = [
  {
    title: 'Company Registration',
    description:
      'Private limited, LLP, OPC, and proprietorship setup with documentation, filings, and post-incorporation guidance.',
    category: 'Startup',
    label: 'Business formation',
    Icon: HiOutlineBuildingOffice2,
  },
  {
    title: 'GST Filing',
    description:
      'Registration, monthly and quarterly returns, amendments, and notice support, maintained accurately for audit readiness.',
    category: 'GST',
    label: 'Indirect tax',
    Icon: HiOutlineDocumentText,
  },
  {
    title: 'Income Tax',
    description:
      'Business and professional ITR filing, TDS returns, revised returns, and representation for tax notices.',
    category: 'Income Tax',
    label: 'Direct tax',
    Icon: HiOutlineScale,
  },
  {
    title: 'ROC Compliance',
    description:
      'Annual filings, director changes, share transfers, and MCA updates delivered on statutory timelines.',
    category: 'MCA',
    label: 'Corporate law',
    Icon: HiOutlineClipboardDocumentCheck,
  },
]

const ServicesSection = () => {
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      gsap.from('.svc-reveal', {
        y: 24,
        opacity: 0,
        duration: 0.55,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: { trigger: root, start: 'top 85%', once: true },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={rootRef} className="border-t border-white/10 bg-slate-950 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="svc-reveal mx-auto max-w-3xl text-center">
          <p className="cw-home-eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Services</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Core compliance services
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
            Registration, tax, and corporate filings for Indian businesses, delivered by specialists who manage the
            process end to end.
          </p>
        </div>

        <div className="svc-reveal mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {mainServices.map((service) => {
            const Icon = service.Icon
            return (
              <NavLink
                key={service.title}
                to={`/services?category=${encodeURIComponent(service.category)}`}
                className="cw-home-card group flex h-full flex-col rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-200 hover:border-cyan-300/40 hover:bg-white/10 hover:shadow-lg hover:shadow-slate-950/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <Icon className="h-6 w-6 shrink-0 text-slate-500 transition-colors group-hover:text-cyan-300" strokeWidth={1.5} />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {service.label}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold leading-snug text-white">{service.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{service.description}</p>

                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 transition-colors group-hover:text-cyan-200">
                  View services
                  <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>
                    →
                  </span>
                </span>
              </NavLink>
            )
          })}
        </div>

        <div className="svc-reveal mt-10 flex justify-center">
          <NavLink
            to="/services"
            className="cw-home-btn-secondary inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white"
          >
            Browse all service categories
          </NavLink>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection

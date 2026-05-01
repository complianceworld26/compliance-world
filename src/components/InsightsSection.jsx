import { useLayoutEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { gsap } from '../lib/gsap'

const posts = [
  {
    title: 'GST calendar: what founders actually need on their desk',
    tag: 'GST',
    excerpt: 'A practical cut of due dates, reconciliations, and the few metrics that predict clean closes.',
  },
  {
    title: 'ROC hygiene for companies that raised in the last 18 months',
    tag: 'Governance',
    excerpt: 'Board cycles, disclosures, and the filings that slip when teams are shipping product fast.',
  },
  {
    title: 'Payroll compliance without drowning in spreadsheets',
    tag: 'Ops',
    excerpt: 'How to structure payroll, TDS, and benefits data so month-end does not become a rescue mission.',
  },
]

const InsightsSection = () => {
  const rootRef = useRef(null)
  const headRef = useRef(null)
  const gridRef = useRef(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    const head = headRef.current
    const grid = gridRef.current
    if (!root || !head || !grid) return

    const ctx = gsap.context(() => {
      const headEls = head.querySelectorAll(':scope > *')
      const cards = grid.querySelectorAll('.ins-card')

      gsap.fromTo(
        headEls,
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: root,
            start: 'top 88%',
            once: true,
          },
        },
      )

      gsap.fromTo(
        cards,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: grid,
            start: 'top 90%',
            once: true,
          },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="bg-slate-950 py-24 text-white sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={headRef}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/90">Insights</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Guides for sharp operators</h2>
            <p className="mt-3 text-sm text-slate-400 sm:text-base">
              Short reads on the compliance decisions that compound — not generic checklists.
            </p>
          </div>
          <NavLink
            to="/about-us"
            className="inline-flex w-fit items-center rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
          >
            View all
          </NavLink>
        </div>

        <div ref={gridRef} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.title}
              className="ins-card group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/10"
            >
              <span className="w-fit rounded-full bg-cyan-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-200">
                {post.tag}
              </span>
              <h3 className="mt-4 text-lg font-semibold leading-snug text-white group-hover:text-cyan-100">
                {post.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{post.excerpt}</p>
              <span className="mt-6 text-sm font-semibold text-cyan-300 transition group-hover:translate-x-0.5">
                Read more →
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default InsightsSection

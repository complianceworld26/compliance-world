import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { NavLink, useParams, useSearchParams } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { ServiceWhyCallout } from '../../components/ServiceWhyCallout'
import { getServiceContent } from '../../data/serviceContentData'
import { getServicePricing } from '../../data/servicePricingData'
import { serviceCategories } from '../../data/servicesData'
import { extractTocFromBlocks, parseFormattedBlocks } from '../../utils/formatServiceContent'
import { getServiceDetailPath, resolveServiceFromSlugs } from '../../utils/serviceSlug'

const serviceFaqGroupName = (service) =>
  `cw-faq-${service.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '') || 'service'}`

const ServiceFaqAccordion = ({ items, service }) => {
  if (!items?.length) return null

  const groupName = serviceFaqGroupName(service)

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.12 }}
      id="service-faq"
      className="rounded-2xl border border-white/12 bg-linear-to-b from-white/7 to-white/4 p-6 shadow-2xl shadow-black/25 backdrop-blur-sm sm:p-8 lg:p-10"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">FAQ</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">Frequently asked questions</h2>
      <p className="mt-2 text-sm text-blue-100/80">Expand a question to read the full answer.</p>
      <div className="mt-6 space-y-2">
        {items.map((item, index) => (
          <details
            key={`${item.question.slice(0, 56)}-${index}`}
            name={groupName}
            className="group overflow-hidden rounded-xl border border-white/12 bg-white/4 transition-colors hover:border-cyan-300/30 open:border-cyan-300/40 open:bg-white/6"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 text-left text-sm font-medium text-white sm:text-base [&::-webkit-details-marker]:hidden">
              <span className="min-w-0 flex-1 pr-2 leading-snug">{item.question}</span>
              <span className="shrink-0 text-xs font-semibold text-cyan-300 transition-transform duration-200 group-open:rotate-180">
                ▼
              </span>
            </summary>
            <div className="border-t border-white/10 px-4 pb-4">
              <p className="pt-4 text-sm leading-relaxed text-blue-100/90 sm:text-base">{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </motion.div>
  )
}

const FormattedBody = ({ blocks }) => {
  if (!blocks.length) {
    return (
      <p className="text-sm leading-7 text-blue-100/85 sm:text-base">
        Detailed service content for this item will be added shortly.
      </p>
    )
  }

  return (
    <div className="space-y-5">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`
        if (block.type === 'h3') {
          return (
            <h3
              key={key}
              id={block.id}
              className="scroll-mt-28 border-b border-white/10 pb-2 text-lg font-semibold tracking-tight text-white sm:text-xl"
            >
              {block.text}
            </h3>
          )
        }
        if (block.type === 'ol') {
          return (
            <ol
              key={key}
              className="list-decimal space-y-2.5 pl-5 text-sm leading-7 text-blue-100/90 marker:font-semibold marker:text-cyan-300 sm:text-base sm:pl-6"
            >
              {block.items.map((item, idx) => (
                <li key={`${item.num}-${idx}`} className="pl-1 text-blue-100/90">
                  {item.text}
                </li>
              ))}
            </ol>
          )
        }
        if (block.type === 'ul') {
          return (
            <ul key={key} className="list-disc space-y-2 pl-5 text-sm leading-7 text-blue-100/90 marker:text-cyan-300 sm:text-base sm:pl-6">
              {block.items.map((item) => (
                <li key={item.slice(0, 60)}>{item}</li>
              ))}
            </ul>
          )
        }
        const isNote = /^Note:/i.test(block.text)
        return (
          <p
            key={key}
            className={`text-sm leading-[1.75] text-blue-100/90 sm:text-base ${
              isNote ? 'rounded-lg border border-amber-300/35 bg-amber-500/10 px-4 py-3 text-amber-100' : ''
            }`}
          >
            {block.text}
          </p>
        )
      })}
    </div>
  )
}

const ServiceDetail = () => {
  const { categorySlug, serviceSlug } = useParams()
  const [searchParams] = useSearchParams()
  const hasSlugParams = Boolean(categorySlug && serviceSlug)
  const resolvedFromSlug = hasSlugParams
    ? resolveServiceFromSlugs(categorySlug, serviceSlug)
    : { category: null, service: null }

  const category = resolvedFromSlug.category || searchParams.get('category') || 'Startup'
  const service = resolvedFromSlug.service || searchParams.get('service') || 'Proprietorship'
  const content = getServiceContent(category, service)
  const paragraphs = content?.paragraphs || []

  const { blocks, toc } = useMemo(() => {
    const parsed = parseFormattedBlocks(paragraphs)
    return { blocks: parsed, toc: extractTocFromBlocks(parsed) }
  }, [paragraphs])

  const whyParagraphs = content?.whyParagraphs || []

  const categoryServices =
    serviceCategories.find((item) => item.label === category)?.options?.slice(0, 10) ?? []

  const relatedGuides =
    toc.length > 0
      ? toc.slice(0, 6).map((item) => ({ label: item.label, href: `#${item.id}` }))
      : categoryServices.slice(0, 6).map((item) => ({
          label: item,
          href: getServiceDetailPath(category, item),
        }))

  const orderHref = `/order?category=${encodeURIComponent(category)}&service=${encodeURIComponent(service)}`
  const activePackages = getServicePricing(category, service)

  return (
    <>
      <Navbar />
      <div data-appearance="dark" className="min-h-screen bg-slate-950 text-white">
        <main>
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="relative overflow-hidden border-b border-white/10 bg-linear-to-b from-blue-900/60 to-blue-950/75 py-16 sm:py-20"
        >
          <div className="cw-service-hero-radials pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_34%),radial-gradient(circle_at_top_left,rgba(99,102,241,0.14),transparent_40%)]" />
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="cw-breadcrumb mb-6 flex flex-wrap items-center gap-2 text-sm text-blue-100/90">
              <NavLink to="/" className="font-medium transition-colors hover:text-white">
                Compliance World
              </NavLink>
              <span className="text-blue-300/50">/</span>
              <NavLink to="/services" className="font-medium transition-colors hover:text-white">
                {category}
              </NavLink>
              <span className="text-blue-300/50">/</span>
              <span className="font-semibold text-cyan-300">{service}</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">{category}</p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
                  {content?.heroTitle || service}
                </h1>
                <p className="mt-4 max-w-3xl text-sm text-blue-100 sm:text-base">
                  {content?.heroSubtitle || 'Service details will be added from your document content.'}
                </p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-200/90">Starting package</p>
                <p className="mt-2 text-3xl font-bold text-white">{content?.priceText || 'Pricing available on request'}</p>
                <NavLink
                  to={orderHref}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:from-cyan-400 hover:to-blue-500"
                >
                  Get Started
                </NavLink>
              </div>
            </div>
          </div>
        </motion.section>
        

        {activePackages.length > 0 ? (
          <section className="border-b border-white/10 py-12 sm:py-14">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <h3 className="text-2xl font-bold tracking-tight text-white">Simple packages. Transparent pricing.</h3>
              <p className="mt-2 text-sm text-blue-100/80">
                Choose the package that fits your {service.toLowerCase()} requirements.
              </p>

              <div className="mt-6 grid gap-5 xl:grid-cols-3">
                {activePackages.map((pkg, index) => (
                  <motion.article
                    key={pkg.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.42, delay: Math.min(index * 0.06, 0.2), ease: 'easeOut' }}
                    className="group relative overflow-hidden rounded-2xl border border-white/12 bg-linear-to-b from-white/8 to-white/4 p-6 shadow-xl shadow-black/25 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/35"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-cyan-300 to-blue-500 opacity-90" />
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <h4 className="text-lg font-semibold text-white">{pkg.name}</h4>
                      {index === 1 ? (
                        <span className="rounded-full border border-cyan-300/50 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-semibold text-cyan-200">
                          Popular
                        </span>
                      ) : null}
                    </div>

                    <p className="text-sm leading-6 text-blue-100/80">{pkg.description}</p>

                    <div className="mt-5 rounded-xl border border-cyan-300/20 bg-linear-to-r from-cyan-500/10 to-blue-500/10 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-cyan-100/80">Starting at</p>
                      <p className="mt-1 text-3xl font-bold text-white">{pkg.price}</p>
                      <p className="mt-1 text-xs text-blue-100/65">+ GST | Govt. fee extra</p>
                    </div>

                    <p className="mt-5 text-sm font-semibold text-white">What's included</p>
                    <ul className="mt-3 space-y-2.5">
                      {pkg.includes.map((item) => (
                        <li key={`${pkg.name}-${item}`} className="flex items-start gap-2 text-sm text-blue-100/85">
                          <span className="mt-1 text-cyan-300">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
                      <NavLink
                        to={orderHref}
                        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:from-cyan-400 hover:to-blue-500"
                      >
                        Register Now
                      </NavLink>
                    </motion.div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="py-12 sm:py-16">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-start lg:gap-12 lg:px-8">
            <motion.article
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="order-1 flex min-w-0 flex-1 flex-col gap-8 lg:gap-10"
            >
              <ServiceWhyCallout title={content?.whyTitle} lines={whyParagraphs} />

              <div className="rounded-2xl border border-white/12 bg-linear-to-b from-white/7 to-white/4 p-6 shadow-2xl shadow-black/25 backdrop-blur-sm sm:p-8 lg:p-10">
                <h2 className="text-3xl font-bold tracking-tight text-white">{service}</h2>
                <div className="mt-8">
                  <FormattedBody blocks={blocks} />
                </div>
                <div className="mt-12 border-t border-white/10 pt-8">
                  <p className="text-sm text-blue-100/80">Ready to proceed? Open the order form from the sidebar or below.</p>
                  <NavLink
                    to={orderHref}
                    className="mt-4 inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan-300/60 hover:bg-white/15 lg:hidden"
                  >
                    Continue to Order
                  </NavLink>
                </div>
              </div>
              <ServiceFaqAccordion items={content?.faqItems} service={service} />
            </motion.article>

            <aside className="order-2 lg:sticky lg:top-28 lg:w-72 lg:shrink-0 lg:self-start">
              <div className="hide-scrollbar max-h-none space-y-4 lg:max-h-[calc(100vh-7.5rem)] lg:overflow-y-auto">
                <div className="rounded-2xl border border-white/12 bg-linear-to-b from-white/8 to-white/4 p-5 shadow-xl shadow-black/20 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-white">Need Expert Help?</p>
                  <p className="mt-2 text-sm text-blue-100/80">Get consultation and complete filing support from our team.</p>
                  <NavLink
                    to={orderHref}
                    className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:from-cyan-400 hover:to-blue-500"
                  >
                    Continue to Order
                  </NavLink>
                </div>

                <div className="rounded-2xl border border-white/12 bg-linear-to-b from-white/8 to-white/4 p-5 shadow-xl shadow-black/20 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-white">Related Guides</p>
                  <div className="mt-3 divide-y divide-white/10">
                    {relatedGuides.map((item) =>
                      item.href.startsWith('#') ? (
                        <a
                          key={item.href}
                          href={item.href}
                          className="flex items-center justify-between gap-3 py-3 text-sm text-blue-100/85 transition-colors hover:text-cyan-300"
                        >
                          <span>{item.label}</span>
                          <span className="text-slate-500">→</span>
                        </a>
                      ) : (
                        <NavLink
                          key={item.href}
                          to={item.href}
                          className="flex items-center justify-between gap-3 py-3 text-sm text-blue-100/85 transition-colors hover:text-cyan-300"
                        >
                          <span>{item.label}</span>
                          <span className="text-slate-500">→</span>
                        </NavLink>
                      )
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/12 bg-linear-to-b from-white/8 to-white/4 p-5 shadow-xl shadow-black/20 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-white">{category} Services</p>
                  <div className="hide-scrollbar mt-3 max-h-64 divide-y divide-white/10 overflow-y-auto">
                    {categoryServices.map((item) => (
                      <NavLink
                        key={item}
                        to={getServiceDetailPath(category, item)}
                        className="flex items-center justify-between gap-3 py-3 text-sm text-blue-100/85 transition-colors hover:text-cyan-300"
                      >
                        <span>{item}</span>
                        <span className="text-slate-500">→</span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default ServiceDetail

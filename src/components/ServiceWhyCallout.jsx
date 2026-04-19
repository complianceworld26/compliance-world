import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  HiOutlineArrowTrendingUp,
  HiOutlineBanknotes,
  HiOutlineBolt,
  HiOutlineBuildingOffice2,
  HiOutlineDocumentText,
  HiOutlineGlobeAlt,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
} from 'react-icons/hi2'

const ICON_FALLBACK = [
  HiOutlineSparkles,
  HiOutlineBanknotes,
  HiOutlineShieldCheck,
  HiOutlineArrowTrendingUp,
  HiOutlineGlobeAlt,
]

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80) || 'why-section'

/**
 * Subsection titles from markdown (#### …) become plain lines; parseFormattedBlocks
 * does not treat them as headings when the next line starts with a capital letter.
 * This parser pairs "short title line + long body line" for the Why callout grid.
 */
export const parseWhyCalloutFromLines = (lines) => {
  if (!lines?.length) return []

  const blocks = []
  const usedIds = new Set()
  const makeId = (text) => {
    let base = slugify(text)
    let id = base
    let n = 0
    while (usedIds.has(id)) {
      n += 1
      id = `${base}-${n}`
    }
    usedIds.add(id)
    return id
  }

  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    const next = lines[i + 1]

    const isList = /^[•\-–—*]\s/.test(line) || /^\d+\.\s/.test(line)
    const couldBeTitle =
      !isList &&
      line.length >= 10 &&
      line.length <= 130 &&
      next &&
      next.length >= 40 &&
      !/\.\s*$/.test(line)

    if (couldBeTitle) {
      blocks.push({ type: 'h3', text: line.replace(/:\s*$/, ''), id: makeId(line) })
      blocks.push({ type: 'p', text: next })
      i += 2
      continue
    }

    blocks.push({ type: 'p', text: line })
    i += 1
  }

  return blocks
}

const pickWhyIcon = (title, index) => {
  const t = (title || '').toLowerCase()
  if (/fund|scheme|government|grant|money|capital|subsidy|tender|benefit/i.test(t)) return HiOutlineBanknotes
  if (/tax|income|gst|duty|rebate|exemption|deduction|80g|12a/i.test(t)) return HiOutlineShieldCheck
  if (/growth|investor|visibility|scale|credibility|market|venture|funding/i.test(t))
    return HiOutlineArrowTrendingUp
  if (/national|ecosystem|recognition|partnership|network|reputation|global|dgft|custom/i.test(t))
    return HiOutlineGlobeAlt
  if (/compliance|filing|portal|digital|certificate|registration|mandatory|legal/i.test(t))
    return HiOutlineDocumentText
  if (/business|company|entity|trade|operat|establish|premises/i.test(t)) return HiOutlineBuildingOffice2
  if (/fast|speed|efficient|quick|24|online|e-/i.test(t)) return HiOutlineBolt
  return ICON_FALLBACK[index % ICON_FALLBACK.length]
}

const splitWhyBlocks = (blocks) => {
  if (!blocks?.length) return { intro: [], points: [], rest: [] }

  let i = 0
  const intro = []
  while (i < blocks.length && blocks[i].type === 'p') {
    intro.push(blocks[i])
    i += 1
  }

  const points = []
  const rest = []
  while (i < blocks.length) {
    const b = blocks[i]
    if (b.type === 'h3') {
      const next = blocks[i + 1]
      if (next?.type === 'p') {
        points.push({ title: b.text, body: next.text, id: b.id })
        i += 2
      } else {
        points.push({ title: b.text, body: '', id: b.id })
        i += 1
      }
    } else {
      rest.push(b)
      i += 1
    }
  }

  return { intro, points, rest }
}

const IntroParagraphs = ({ blocks }) => {
  if (!blocks.length) return null
  return (
    <div className="mt-4 space-y-3">
      {blocks.map((block, index) => (
        <p
          key={`why-intro-${index}`}
          className="text-sm leading-relaxed text-blue-100/90 sm:text-base"
        >
          {block.text}
        </p>
      ))}
    </div>
  )
}

const RestBlocks = ({ blocks }) => {
  if (!blocks.length) return null
  return (
    <div className="mt-8 space-y-4 border-t border-white/10 pt-8">
      {blocks.map((block, index) => {
        const key = `why-rest-${block.type}-${index}`
        if (block.type === 'ul') {
          return (
            <ul
              key={key}
              className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-blue-100/90 marker:text-cyan-300/90 sm:text-base sm:pl-6"
            >
              {block.items.map((item) => (
                <li key={item.slice(0, 72)}>{item}</li>
              ))}
            </ul>
          )
        }
        if (block.type === 'ol') {
          return (
            <ol
              key={key}
              className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-blue-100/90 marker:font-semibold marker:text-emerald-300 sm:text-base sm:pl-6"
            >
              {block.items.map((item, idx) => (
                <li key={`${item.num}-${idx}`} className="pl-1">
                  {item.text}
                </li>
              ))}
            </ol>
          )
        }
        return (
          <p key={key} className="text-sm leading-relaxed text-blue-100/90 sm:text-base">
            {block.text}
          </p>
        )
      })}
    </div>
  )
}

export const ServiceWhyCallout = ({ title, lines }) => {
  const blocks = useMemo(() => parseWhyCalloutFromLines(lines || []), [lines])

  if (!title && !blocks.length) return null

  const { intro, points, rest } = splitWhyBlocks(blocks)
  const useGrid = points.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
      id="service-why"
      className="rounded-2xl border border-white/12 border-l-[3px] border-l-cyan-400/50 bg-linear-to-b from-white/7 to-white/4 p-6 shadow-2xl shadow-black/25 backdrop-blur-sm sm:p-8 lg:p-10"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Why it matters</p>
      {title ? (
        <h2 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">{title}</h2>
      ) : null}

      {useGrid ? (
        <>
          <IntroParagraphs blocks={intro} />
          <ul className="mt-8 grid list-none gap-4 p-0 sm:grid-cols-2">
            {points.map((pt, index) => {
              const Icon = pickWhyIcon(pt.title, index)
              return (
                <li key={pt.id}>
                  <div className="group flex h-full gap-4 rounded-xl border border-white/10 bg-white/4 p-4 transition-colors hover:border-cyan-300/35 hover:bg-white/6 sm:p-5">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-400/25 transition-transform duration-200 group-hover:scale-[1.03]"
                      aria-hidden
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-semibold tracking-tight text-white sm:text-lg">{pt.title}</h3>
                      {pt.body ? (
                        <p className="mt-2 text-sm leading-relaxed text-blue-100/90 sm:text-base">{pt.body}</p>
                      ) : null}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
          <RestBlocks blocks={rest} />
        </>
      ) : blocks?.length ? (
        <div className={title ? 'mt-6' : 'mt-4'}>
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
                  <ul
                    key={key}
                    className="list-disc space-y-2 pl-5 text-sm leading-7 text-blue-100/90 marker:text-cyan-300 sm:text-base sm:pl-6"
                  >
                    {block.items.map((item) => (
                      <li key={item.slice(0, 60)}>{item}</li>
                    ))}
                  </ul>
                )
              }
              return (
                <p key={key} className="text-sm leading-[1.75] text-blue-100/90 sm:text-base">
                  {block.text}
                </p>
              )
            })}
          </div>
        </div>
      ) : null}
    </motion.div>
  )
}

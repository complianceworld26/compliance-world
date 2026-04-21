import gstChunks from './Txt content/GST.json'
import incomeTaxChunks from './Txt content/Incometax.json'
import mcaChunks from './Txt content/MCA.json'
import registrationChunks from './Txt content/Registration.json'
import startupChunks from './Txt content/startup.json'
import { serviceCategories } from './servicesData'

const startupServices = serviceCategories.find((item) => item.label === 'Startup')?.options ?? []
const registrationServices =
  serviceCategories.find((item) => item.label === 'Registration')?.options ?? []
const gstServices = serviceCategories.find((item) => item.label === 'GST')?.options ?? []
const incomeTaxServices = serviceCategories.find((item) => item.label === 'Income Tax')?.options ?? []
const mcaServices = serviceCategories.find((item) => item.label === 'MCA')?.options ?? []

/**
 * startup.json: intro, long article ("Simple packages…"), FAQ.
 * Duplicate OPC rows (indices 9–11) omitted.
 */
const STARTUP_JSON_INDICES = {
  Proprietorship: [0, 1, 2],
  Partnership: [3, 4, 5],
  'One Person Company': [6, 7, 8],
  'Limited Liability Partnership': [12, 13, 14],
  'Private Limited Company': [15, 16, 17],
  'Section 8 Company': [18, 19, 20],
  'Trust Registration': [21, 22, 23],
  'Public Limited Company': [24, 25, 26],
  'Producer Company': [27, 30, 31],
  'Indian Subsidiary': [32, 33, 34],
}

/**
 * Registration.json chunk indices per catalog name.
 * whyIndices: "Our Clients" / ### Why … blocks (shown in a separate callout).
 * bodyIndices: intro + main article + FAQ chunk (FAQ split out later).
 */
const REGISTRATION_SERVICE_CHUNKS = {
  'Startup India': { whyIndices: [1], bodyIndices: [0, 2, 3] },
  'Trade License': { bodyIndices: [4, 5, 6] },
  'FSSAI Registration': { bodyIndices: [7, 8, 9] },
  'FSSAI License': { bodyIndices: [10, 11, 12] },
  'Halal License & Certification': { bodyIndices: [13, 14, 15] },
  'ICEGATE Registration': { whyIndices: [17], bodyIndices: [16, 18, 19] },
  'Import Export Code': { whyIndices: [21], bodyIndices: [20, 22, 23] },
  'Legal Entity Identifier Code': { whyIndices: [25], bodyIndices: [24, 26, 27] },
  'ISO Registration': { bodyIndices: [28, 29, 30] },
  'PF Registration': { whyIndices: [32], bodyIndices: [31, 33, 34] },
  'ESI Registration': { whyIndices: [36], bodyIndices: [35, 37, 38] },
  'Professional Tax Registration': { whyIndices: [40], bodyIndices: [39, 41, 42] },
  'RCMC Registration': { bodyIndices: [43, 44, 45] },
  'TN RERA Registration for Agents': { bodyIndices: [46, 47, 48] },
  '12A and 80G Registration': { whyIndices: [50], bodyIndices: [49, 51, 52] },
  '12A Registration': { whyIndices: [54], bodyIndices: [53, 55, 56] },
  '80G Registration': { whyIndices: [58], bodyIndices: [57, 60, 61] },
  'Barcode Registration': { bodyIndices: [62, 63, 64] },
  'BIS Registration': { whyIndices: [66], bodyIndices: [65, 67, 68] },
  'Certificate of Incumbency': { bodyIndices: [69, 71, 72] },
  'Darpan Registration': { whyIndices: [74], bodyIndices: [73, 75, 76] },
  'Digital Signature': { bodyIndices: [77, 78, 79] },
  'Shop Act Registration': { bodyIndices: [80, 81, 82] },
  'Udyam Registration': { whyIndices: [84], bodyIndices: [83, 85, 86] },
  'Fire License': { whyIndices: [88], bodyIndices: [87, 89, 90] },
  'Legal Name Change': { bodyIndices: [91, 92, 93] },
}

/**
 * GST.json chunk indices per catalog name (duplicate foreigners block at 19–22 omitted).
 * "GST Registration" has no matching article in GST.json yet—only foreigner-specific and other services.
 */
const GST_SERVICE_CHUNKS = {
  'GST Registration': { whyIndices: [1], bodyIndices: [0, 2, 3] },
  'GST Return Filing by Accountant': { whyIndices: [5], bodyIndices: [4, 6, 7] },
  'GST LUT Form': { whyIndices: [9], bodyIndices: [8, 10, 11] },
  'GST Notice': { bodyIndices: [12, 13, 14] },
  'GST Annual Return Filing (GSTR-9)': { whyIndices: [16], bodyIndices: [15, 17, 18] },
  'GST Registration for Foreigners': { whyIndices: [1], bodyIndices: [0, 2, 3] },
  'GST Amendment': { whyIndices: [24], bodyIndices: [23, 25, 26] },
  'GST Revocation': { whyIndices: [28], bodyIndices: [27, 29, 30] },
  'GSTR-10': { whyIndices: [32], bodyIndices: [31, 33, 34] },
  'Virtual Office + GSTIN': { bodyIndices: [35, 36, 37] },
}

const hasLeadCta = (markdown = '') => /^(File Now|Apply Now)\b/i.test(markdown.trim())

const buildOrderedServiceChunkMap = (chunks, serviceNames) => {
  const startIndices = chunks.reduce((acc, chunk, idx) => {
    if (!chunk?.heading) acc.push(idx)
    return acc
  }, [])

  const mapping = {}
  serviceNames.forEach((serviceName, index) => {
    const start = startIndices[index]
    if (start == null) {
      return
    }

    const next = startIndices[index + 1] ?? chunks.length
    const sectionIndices = []
    for (let i = start; i < next; i += 1) {
      sectionIndices.push(i)
    }

    if (sectionIndices.length >= 4 && hasLeadCta(chunks[sectionIndices[1]]?.content)) {
      mapping[serviceName] = {
        whyIndices: [sectionIndices[1]],
        bodyIndices: [sectionIndices[0], ...sectionIndices.slice(2)],
      }
      return
    }

    mapping[serviceName] = { bodyIndices: sectionIndices }
  })

  return mapping
}

const INCOME_TAX_SERVICE_CHUNKS = buildOrderedServiceChunkMap(incomeTaxChunks, incomeTaxServices)
const MCA_SERVICE_CHUNKS = buildOrderedServiceChunkMap(mcaChunks, mcaServices)

const stripInlineBold = (text) => text.replace(/\*\*([^*]+)\*\*/g, '$1')

const normalizeMarkdownLine = (line) => {
  let s = line.trim()
  if (!s) return ''
  const hm = s.match(/^(#{1,6})\s+(.*)$/)
  if (hm) s = hm[2].trim()
  s = stripInlineBold(s)
  return s
}

const markdownToParagraphLines = (markdown) => {
  const raw = markdown.split('\n').map((line) => normalizeMarkdownLine(line))
  return raw.filter(Boolean)
}

const FAQ_HEADING = /^frequently asked questions$/i

const extractFaqFromParagraphs = (lines) => {
  const idx = lines.findIndex((line) => FAQ_HEADING.test(line.trim()))
  if (idx === -1) {
    return { bodyParagraphs: lines, faqItems: [] }
  }

  const bodyParagraphs = lines.slice(0, idx)
  const faqItems = []

  for (const line of lines.slice(idx + 1)) {
    const t = line.trim()
    if (!t || /^load more questions$/i.test(t)) continue
    const qMark = t.indexOf('?')
    if (qMark === -1) continue
    const question = t.slice(0, qMark + 1).trim()
    const answer = t.slice(qMark + 1).trim()
    if (question.length > 3 && answer.length > 5) {
      faqItems.push({ question, answer })
    }
  }

  return { bodyParagraphs, faqItems }
}

const stripLeadCta = (md) => md.replace(/^(File Now|Apply Now)(\s*\n+)*/i, '').trim()

const parseWhySection = (markdownParts) => {
  const merged = markdownParts.map((p) => stripLeadCta(p)).filter(Boolean).join('\n\n')
  if (!merged) {
    return { whyTitle: null, whyParagraphs: [] }
  }

  let lines = markdownToParagraphLines(merged)
  lines = lines.filter((l) => !/^(file now|apply now)$/i.test(l))
  if (!lines.length) {
    return { whyTitle: null, whyParagraphs: [] }
  }

  const first = lines[0]
  if (/^why\s/i.test(first)) {
    return { whyTitle: first, whyParagraphs: lines.slice(1) }
  }

  return { whyTitle: null, whyParagraphs: lines }
}

const pickHeroTitle = (lines, serviceName) => {
  const candidates = [lines[0], lines[1]].filter(Boolean)
  const pick = candidates.find(
    (t) => t.length >= 18 && t.length <= 100 && !/[.!?]$/.test(t),
  )
  return pick ?? `${serviceName} Services`
}

const pickHeroSubtitle = (lines) => {
  const shortTitle = (t) => t.length < 50 && !/[.!?]/.test(t)
  for (let i = 0; i < lines.length; i += 1) {
    const t = lines[i]
    if (i === 0 && shortTitle(t)) continue
    if (t.length >= 40) return t
  }
  return lines.find((t) => /[.!?]/.test(t)) || lines[lines.length - 1] || `${lines[0] || 'Service'}.`
}

const emptyEntry = (serviceName) => ({
  heroTitle: `${serviceName} Services`,
  heroSubtitle: `${serviceName} service details.`,
  fullText: '',
  paragraphs: [],
  faqItems: [],
  whyTitle: null,
  whyParagraphs: [],
})

const buildFromChunkIndices = (chunks, indices, serviceName) => {
  const parts = []
  for (const i of indices) {
    const chunk = chunks[i]
    if (!chunk?.content) continue
    parts.push(chunk.content.trim())
  }
  const fullMarkdown = parts.join('\n\n')
  const allLines = markdownToParagraphLines(fullMarkdown)
  const { bodyParagraphs, faqItems } = extractFaqFromParagraphs(allLines)

  return {
    heroTitle: pickHeroTitle(bodyParagraphs, serviceName),
    heroSubtitle: pickHeroSubtitle(bodyParagraphs),
    fullText: bodyParagraphs.join('\n'),
    paragraphs: bodyParagraphs,
    faqItems,
  }
}

const buildStartupEntry = (serviceName) => {
  const indices = STARTUP_JSON_INDICES[serviceName]
  if (!indices?.length) {
    return emptyEntry(serviceName)
  }
  return {
    ...buildFromChunkIndices(startupChunks, indices, serviceName),
    whyTitle: null,
    whyParagraphs: [],
  }
}

const buildRegistrationEntry = (serviceName) => {
  const spec = REGISTRATION_SERVICE_CHUNKS[serviceName]
  if (!spec?.bodyIndices?.length) {
    return emptyEntry(serviceName)
  }

  const whyParts = (spec.whyIndices ?? []).map((i) => registrationChunks[i]?.content || '')
  const { whyTitle, whyParagraphs } = parseWhySection(whyParts)

  const base = buildFromChunkIndices(registrationChunks, spec.bodyIndices, serviceName)
  return {
    ...base,
    whyTitle,
    whyParagraphs,
  }
}

const buildEntryFromSpec = (chunks, spec, serviceName) => {
  if (!spec?.bodyIndices?.length) {
    return emptyEntry(serviceName)
  }

  const whyParts = (spec.whyIndices ?? []).map((i) => chunks[i]?.content || '')
  const { whyTitle, whyParagraphs } = parseWhySection(whyParts)

  const base = buildFromChunkIndices(chunks, spec.bodyIndices, serviceName)
  return {
    ...base,
    whyTitle,
    whyParagraphs,
  }
}

const parseStartupSections = () => {
  const parsed = {}
  startupServices.forEach((serviceName) => {
    parsed[serviceName] = buildStartupEntry(serviceName)
  })
  return parsed
}

const parseRegistrationSections = () => {
  const parsed = {}
  registrationServices.forEach((serviceName) => {
    parsed[serviceName] = buildRegistrationEntry(serviceName)
  })
  return parsed
}

const buildGstEntry = (serviceName) => {
  const spec = GST_SERVICE_CHUNKS[serviceName]
  return buildEntryFromSpec(gstChunks, spec, serviceName)
}

const parseGstSections = () => {
  const parsed = {}
  gstServices.forEach((serviceName) => {
    parsed[serviceName] = buildGstEntry(serviceName)
  })
  return parsed
}

const buildIncomeTaxEntry = (serviceName) => {
  const spec = INCOME_TAX_SERVICE_CHUNKS[serviceName]
  return buildEntryFromSpec(incomeTaxChunks, spec, serviceName)
}

const parseIncomeTaxSections = () => {
  const parsed = {}
  incomeTaxServices.forEach((serviceName) => {
    parsed[serviceName] = buildIncomeTaxEntry(serviceName)
  })
  return parsed
}

const buildMcaEntry = (serviceName) => {
  const spec = MCA_SERVICE_CHUNKS[serviceName]
  return buildEntryFromSpec(mcaChunks, spec, serviceName)
}

const parseMcaSections = () => {
  const parsed = {}
  mcaServices.forEach((serviceName) => {
    parsed[serviceName] = buildMcaEntry(serviceName)
  })
  return parsed
}

export const serviceContentData = {
  Startup: parseStartupSections(),
  Registration: parseRegistrationSections(),
  GST: parseGstSections(),
  'Income Tax': parseIncomeTaxSections(),
  MCA: parseMcaSections(),
}

export const getServiceContent = (category, service) => {
  return serviceContentData?.[category]?.[service] ?? null
}

import startupDocRaw from './Txt content/startupDocRaw.txt?raw'
import { serviceCategories } from './servicesData'

const startupServices = serviceCategories.find((item) => item.label === 'Startup')?.options ?? []

const parseStartupSections = () => {
  const lines = startupDocRaw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  const sectionStartIndices = []
  for (let i = 0; i < lines.length; i += 1) {
    if (/^\d+\)\s*/.test(lines[i]) || /^\d+\s\)\s*/.test(lines[i])) {
      sectionStartIndices.push(i)
    }
  }

  const sections = []
  for (let i = 0; i < sectionStartIndices.length; i += 1) {
    const start = sectionStartIndices[i]
    const end = sectionStartIndices[i + 1] ?? lines.length
    const block = lines.slice(start, end)
    sections.push(block)
  }

  const parsed = {}
  startupServices.forEach((serviceName, index) => {
    const block = sections[index] ?? []
    const filteredBlock = block.filter((line) => !/^\d+\)\s*/.test(line) && !/^\d+\s\)\s*/.test(line))

    parsed[serviceName] = {
      heroTitle: `${serviceName} Services`,
      heroSubtitle: filteredBlock[0] || `${serviceName} service details.`,
      fullText: filteredBlock.join('\n'),
      paragraphs: filteredBlock,
    }
  })

  return parsed
}

export const serviceContentData = {
  Startup: parseStartupSections(),
}

export const getServiceContent = (category, service) => {
  return serviceContentData?.[category]?.[service] ?? null
}

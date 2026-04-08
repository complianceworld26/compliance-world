const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80) || 'section'

/**
 * Turn flat doc lines into structured blocks for readable layout.
 */
export const parseFormattedBlocks = (lines) => {
  if (!lines?.length) return []

  const blocks = []
  let i = 0

  const pushParagraph = (text) => {
    const t = text.trim()
    if (t) blocks.push({ type: 'p', text: t })
  }

  const isOrderedItem = (line) => /^\d+\.\s+/.test(line)
  const isUnorderedItem = (line) => /^[•\-–—*]\s+/.test(line)

  const looksLikeHeading = (line, prevLine, nextLine) => {
    if (!line || line.length > 140) return false
    if (/^\d+\)\s/.test(line) || /^\d+\s\)\s/.test(line)) return false
    if (isOrderedItem(line) || isUnorderedItem(line)) return false
    if (/^Note:/i.test(line)) return false
    if (line.endsWith(':') && line.length < 120) return true
    if (/^Step\s+\d+/i.test(line)) return true
    const noEndSentence = !/[.!?]$/.test(line)
    const wordCount = line.split(/\s+/).length
    if (noEndSentence && wordCount >= 2 && wordCount <= 18 && line.length < 100) {
      if (nextLine && /^[a-z(]/.test(nextLine.trim())) return true
    }
    return false
  }

  while (i < lines.length) {
    const line = lines[i]
    const prev = i > 0 ? lines[i - 1] : ''
    const next = i < lines.length - 1 ? lines[i + 1] : ''

    if (isOrderedItem(line)) {
      const items = []
      while (i < lines.length && isOrderedItem(lines[i])) {
        const m = lines[i].match(/^(\d+)\.\s+(.*)$/)
        items.push({ num: m[1], text: m[2].trim() })
        i += 1
      }
      blocks.push({ type: 'ol', items })
      continue
    }

    if (isUnorderedItem(line)) {
      const items = []
      while (i < lines.length && isUnorderedItem(lines[i])) {
        items.push(lines[i].replace(/^[•\-–—*]\s+/, '').trim())
        i += 1
      }
      blocks.push({ type: 'ul', items })
      continue
    }

    if (looksLikeHeading(line, prev, next)) {
      let base = slugify(line)
      let id = base
      let n = 0
      while (blocks.some((b) => b.type === 'h3' && b.id === id)) {
        n += 1
        id = `${base}-${n}`
      }
      blocks.push({ type: 'h3', text: line.replace(/:\s*$/, ''), id })
      i += 1
      continue
    }

    pushParagraph(line)
    i += 1
  }

  return blocks
}

export const extractTocFromBlocks = (blocks) =>
  blocks.filter((b) => b.type === 'h3').map((b) => ({ id: b.id, label: b.text }))

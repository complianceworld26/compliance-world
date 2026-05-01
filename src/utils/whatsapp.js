/** International format, digits only (e.g. 919876543210). Override with VITE_WHATSAPP_NUMBER in .env */
const FALLBACK_DIGITS = '919000000000'

function normalizeDigits(value) {
  if (value == null || value === '') return ''
  return String(value).replace(/\D/g, '')
}

export function getWhatsAppDigits() {
  const fromEnv = normalizeDigits(import.meta.env.VITE_WHATSAPP_NUMBER)
  if (fromEnv.length >= 10) return fromEnv
  return FALLBACK_DIGITS
}

/**
 * @param {string} [message] — optional pre-filled message; defaults to VITE_WHATSAPP_DEFAULT_MESSAGE if set
 */
export function getWhatsAppChatUrl(message) {
  const digits = getWhatsAppDigits()
  if (!digits) return '#'

  const url = new URL(`https://wa.me/${digits}`)
  const envDefault = import.meta.env.VITE_WHATSAPP_DEFAULT_MESSAGE
  const text = message ?? (typeof envDefault === 'string' && envDefault ? envDefault : '')
  if (text) url.searchParams.set('text', text)
  return url.toString()
}

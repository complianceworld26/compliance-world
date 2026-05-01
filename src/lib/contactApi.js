const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '')

function buildTemplateParams(payload) {
  const name = String(payload.name ?? '').trim()
  const email = String(payload.email ?? payload.from_email ?? '').trim()
  const phone = String(payload.phone ?? '').trim() || 'Not provided'
  const subjectRaw = String(payload.subject ?? '').trim()
  const message = String(payload.message ?? '').trim()
  const source = String(payload.source ?? 'contact').trim() || 'contact'
  const subject = subjectRaw || (source === 'order' ? 'Order form inquiry' : 'Contact form')

  return {
    name,
    from_name: name,
    user_name: name,
    email,
    from_email: email,
    user_email: email,
    reply_to: email,
    phone,
    phone_number: phone,
    subject,
    title: subject,
    message: source ? `[${source}] ${message}` : message,
    text: message,
  }
}

async function sendViaBrowserEmailJs(payload) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      'EmailJS blocked the server send. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY for browser fallback, or enable non-browser access in EmailJS (Account → Security).',
    )
  }

  const emailjs = (await import('@emailjs/browser')).default
  emailjs.init({ publicKey })
  await emailjs.send(serviceId, templateId, buildTemplateParams(payload), { publicKey })
}

function isEmailJsNonBrowserError(code, message) {
  if (code === 'contact/emailjs-non-browser') return true
  return /non-browser environments is currently disabled/i.test(message || '')
}

/**
 * Sends contact / order inquiries: tries the API first (server-side EmailJS).
 * If EmailJS rejects non-browser calls, falls back to the browser SDK (unless ad-blocked).
 */
export async function submitContact(payload) {
  const response = await fetch(`${API_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = await response.json().catch(() => ({}))

  if (response.ok) {
    return data
  }

  const message = data?.message || ''
  if (isEmailJsNonBrowserError(data?.code, message)) {
    await sendViaBrowserEmailJs(payload)
    return { ok: true, via: 'browser' }
  }

  const error = new Error(message || 'Request failed.')
  error.code = data?.code || 'server/error'
  if (data?.hint) error.hint = data.hint
  throw error
}

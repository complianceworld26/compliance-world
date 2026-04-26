const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '')

async function request(path, options = {}) {
  const { headers: optionHeaders, ...rest } = options
  const hasJsonBody = rest.body != null && rest.body !== ''
  const headers = {
    ...(hasJsonBody ? { 'Content-Type': 'application/json' } : {}),
    ...(optionHeaders ?? {}),
  }

  const response = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers,
    ...rest,
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    const error = new Error(data?.message || 'Request failed.')
    error.code = data?.code || 'server/error'
    throw error
  }
  return data
}

export function signup(payload) {
  return request('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function login(payload) {
  return request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function firebaseLogin(payload) {
  return request('/api/auth/firebase-login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function logout() {
  return request('/api/auth/logout', {
    method: 'POST',
  })
}

export function getMe() {
  return request('/api/auth/me')
}

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

/**
 * GA4 + React Router: the snippet in index.html only runs once. Send page_view on every client navigation.
 */
export function GtagRouteTracker() {
  const location = useLocation()

  useEffect(() => {
    if (!GA_ID || typeof window.gtag !== 'function') return

    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: `${location.pathname}${location.search}`,
    })
  }, [location.pathname, location.search])

  return null
}

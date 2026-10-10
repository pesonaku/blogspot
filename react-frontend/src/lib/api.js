/**
 * Klien untuk Laravel API (laravel-backend).
 *
 * Prioritas base URL:
 * 1. window.BloggerData.apiBaseUrl (diisi saat `npm run build:theme` dari env THEME_API_BASE_URL)
 * 2. VITE_API_BASE_URL (file .env di react-frontend)
 * 3. http://127.0.0.1:8000 (default `php artisan serve`, dev lokal saja)
 */
export function getApiBaseUrl() {
  const fromBlogger = window.BloggerData?.apiBaseUrl
  if (fromBlogger && !fromBlogger.startsWith('__')) {
    return fromBlogger.replace(/\/+$/, '')
  }
  const envUrl = import.meta.env.VITE_API_BASE_URL
  if (envUrl) {
    return envUrl.replace(/\/+$/, '')
  }
  // Bila diakses via HTTPS (misal https://*.blogspot.com), hindari Mixed Content ke http://127.0.0.1
  if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
    return ''
  }
  return 'http://127.0.0.1:8000'
}

export function isApiConfigured() {
  const base = getApiBaseUrl()
  if (!base) return false
  if (typeof window !== 'undefined' && window.location.protocol === 'https:' && base.startsWith('http://')) {
    return false
  }
  return true
}

export async function fetchApiStatus({ signal } = {}) {
  const base = getApiBaseUrl()
  if (!base || !isApiConfigured()) {
    throw new Error('API belum terhubung')
  }
  const res = await fetch(`${base}/api/status`, {
    signal,
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

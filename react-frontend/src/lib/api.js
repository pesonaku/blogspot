/**
 * Klien untuk Laravel API (laravel-backend).
 *
 * Prioritas base URL:
 * 1. window.BloggerData.apiBaseUrl (diisi saat `npm run build:theme` dari env THEME_API_BASE_URL)
 * 2. VITE_API_BASE_URL (file .env di react-frontend)
 * 3. http://127.0.0.1:8000 (default `php artisan serve`)
 */
export function getApiBaseUrl() {
  const fromBlogger = window.BloggerData?.apiBaseUrl
  const url =
    fromBlogger && !fromBlogger.startsWith('__')
      ? fromBlogger
      : import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'
  return url.replace(/\/+$/, '')
}

export async function fetchApiStatus({ signal } = {}) {
  const res = await fetch(`${getApiBaseUrl()}/api/status`, {
    signal,
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

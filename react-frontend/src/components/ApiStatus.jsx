import { useEffect, useState } from 'react'
import { fetchApiStatus } from '../lib/api.js'

const STYLES = {
  loading: { dot: 'bg-amber-300 animate-pulse', label: 'Menghubungkan API…' },
  online: { dot: 'bg-emerald-400', label: 'API online' },
  offline: { dot: 'bg-rose-400', label: 'API offline' },
}

/** Badge kecil yang memanggil Laravel GET /api/status. */
export default function ApiStatus() {
  const [state, setState] = useState({ status: 'loading', detail: '' })

  useEffect(() => {
    const controller = new AbortController()
    fetchApiStatus({ signal: controller.signal })
      .then((json) =>
        setState({ status: 'online', detail: `${json.status} · Laravel ${json.laravel ?? ''}`.trim() }),
      )
      .catch((err) => {
        if (err.name !== 'AbortError') setState({ status: 'offline', detail: err.message })
      })
    return () => controller.abort()
  }, [])

  const s = STYLES[state.status]
  return (
    <span
      id="api-status"
      data-status={state.status}
      title={state.detail}
      className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-slate-300"
    >
      <span className="relative flex h-2 w-2">
        {state.status === 'online' && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        )}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${s.dot}`} />
      </span>
      {s.label}
    </span>
  )
}

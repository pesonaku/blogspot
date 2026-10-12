import { useEffect, useState } from 'react'

/**
 * Switch tema Dark (default) dan Light
 * - Mode Dark: dominan warna hijau tua / deep emerald
 * - Mode Light: dominan warna hijau segar dan putih bersih
 */
export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pesona_theme')
      if (saved === 'light' || saved === 'dark') return saved
    }
    return 'dark' // Default dark sesuai permintaan
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
      root.style.colorScheme = 'dark'
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
      root.style.colorScheme = 'light'
    }
    try {
      localStorage.setItem('pesona_theme', theme)
    } catch {
      // ignore
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const isDark = theme === 'dark'

  return (
    <button
      id="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={`Ganti ke mode ${isDark ? 'Light' : 'Dark'}`}
      title={`Tema saat ini: ${isDark ? 'Dark (Default Hijau)' : 'Light (Hijau & Putih)'}. Klik untuk ganti.`}
      className={`group relative inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 ${
        isDark
          ? 'border-emerald-500/30 bg-emerald-950/80 text-emerald-200 hover:border-emerald-400 hover:bg-emerald-900/60 shadow-lg shadow-emerald-950/40'
          : 'border-emerald-300 bg-white text-emerald-900 hover:border-emerald-400 hover:bg-emerald-50/80 shadow-sm shadow-emerald-900/5'
      } ${className}`}
    >
      {/* Visual pill slider track */}
      <div
        className={`relative flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors duration-300 ${
          isDark ? 'bg-emerald-900/90' : 'bg-emerald-100'
        }`}
      >
        <span
          className={`grid h-4 w-4 place-items-center rounded-full text-[10px] shadow-sm transition-transform duration-300 ${
            isDark
              ? 'translate-x-4 bg-emerald-500 text-white shadow-emerald-500/50'
              : 'translate-x-0 bg-emerald-600 text-white shadow-emerald-600/30'
          }`}
        >
          {isDark ? '🌙' : '☀️'}
        </span>
      </div>

      {/* Label Text */}
      <span className="font-display tracking-tight text-[11px] font-bold">
        {isDark ? (
          <span className="text-emerald-300 group-hover:text-emerald-200">Mode Dark</span>
        ) : (
          <span className="text-emerald-800 group-hover:text-emerald-950">Mode Light</span>
        )}
      </span>
    </button>
  )
}

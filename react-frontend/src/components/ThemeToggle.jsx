import { useEffect, useState } from 'react'

/**
 * Switch tema Dark (default) dan Light
 * Menampilkan HANYA ikon (tanpa teks) dengan pill toggle slider yang halus
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
      title={`Tema saat ini: ${isDark ? 'Dark (Latar Dark Grey)' : 'Light (Latar Putih Bersih)'}. Klik untuk berganti.`}
      className={`group relative inline-flex h-8 w-14 shrink-0 items-center rounded-full border p-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 ${
        isDark
          ? 'border-white/15 bg-[#1b1f23] shadow-inner hover:border-emerald-500/50'
          : 'border-emerald-300 bg-emerald-50/90 shadow-sm hover:border-emerald-400'
      } ${className}`}
    >
      {/* Sliding Icon Circle */}
      <span
        className={`grid h-6 w-6 place-items-center rounded-full text-xs shadow-md transition-all duration-300 ease-out ${
          isDark
            ? 'translate-x-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-500/40'
            : 'translate-x-0 bg-white text-emerald-700 shadow-slate-300/80 border border-emerald-100'
        }`}
      >
        <span className="transition-transform duration-300 group-hover:rotate-12">
          {isDark ? '🌙' : '☀️'}
        </span>
      </span>
    </button>
  )
}

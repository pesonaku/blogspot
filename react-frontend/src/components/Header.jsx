import { useEffect, useState } from 'react'
import ApiStatus from './ApiStatus.jsx'

export default function Header({ blog }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? 'border-b border-white/10 bg-ink-950/70 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-4">
        <a id="site-logo" href={blog.homepageUrl} className="group flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 font-display text-lg font-bold text-white shadow-lg shadow-violet-500/30 transition group-hover:rotate-6">
            {blog.title.charAt(0).toUpperCase()}
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-white">{blog.title}</span>
        </a>

        <form id="search-form" action={blog.searchUrl} method="get" className="ml-auto hidden md:block">
          <label htmlFor="search-input" className="sr-only">Cari artikel</label>
          <input
            id="search-input"
            name="q"
            type="search"
            placeholder="Cari artikel…"
            className="glass w-56 rounded-full px-4 py-2 text-sm text-white placeholder:text-slate-500 outline-none transition focus:w-72 focus:border-violet-400/50"
          />
        </form>

        <div className="ml-auto md:ml-0">
          <ApiStatus />
        </div>
      </div>
    </header>
  )
}

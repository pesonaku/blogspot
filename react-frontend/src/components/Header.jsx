import { useEffect, useState } from 'react'
import ApiStatus from './ApiStatus.jsx'

export default function Header({ blog, sections = [] }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const allNavLinks = [
    { id: 'usp', label: 'Keunggulan', href: '#keunggulan' },
    { id: 'location', label: 'Lokasi', href: '#lokasi' },
    { id: 'units', label: 'Tipe Unit', href: '#tipe-unit' },
    { id: 'gallery', label: 'Galeri 360°', href: '#galeri' },
    { id: 'promo', label: 'Promo', href: '#promo' },
    { id: 'social-proof', label: 'Testimoni', href: '#testimoni' },
  ]

  const navLinks =
    sections && sections.length > 0
      ? allNavLinks.filter((link) => sections.some((s) => s.id === link.id))
      : allNavLinks

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? 'border-b border-white/10 bg-ink-950/85 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
        {/* Brand Logo */}
        <a id="site-logo" href={blog.homepageUrl} className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-emerald-400 font-display text-lg font-bold text-white shadow-lg shadow-violet-500/30 transition group-hover:rotate-6">
            🏡
          </span>
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold tracking-tight text-white leading-tight">
              {blog.title || 'Pesona Kahuripan'}
            </span>
            <span className="text-[10px] text-emerald-400 font-medium tracking-wide">
              Residence &amp; Cluster Modern
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white hover:text-emerald-300 transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#post-list"
            className="hover:text-white text-violet-300 transition-colors py-1"
          >
            Artikel &amp; Berita
          </a>
        </nav>

        {/* Right CTA & Controls */}
        <div className="flex items-center gap-3">
          <form id="search-form" action={blog.searchUrl} method="get" className="hidden xl:block">
            <label htmlFor="search-input" className="sr-only">Cari artikel</label>
            <input
              id="search-input"
              name="q"
              type="search"
              placeholder="Cari artikel…"
              className="glass w-36 rounded-full px-3.5 py-1.5 text-xs text-white placeholder:text-slate-500 outline-none transition focus:w-48 focus:border-violet-400/50"
            />
          </form>

          <a
            href="#lead-form"
            className="hidden sm:inline-flex btn-primary py-2 px-4 text-xs font-bold"
          >
            📅 Survey Lokasi
          </a>

          <div className="hidden sm:block">
            <ApiStatus />
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-ink-950/95 backdrop-blur-2xl px-5 py-4 space-y-3 animate-fade-up">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-200">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/10"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#post-list"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-400/20 text-violet-200"
            >
              Artikel &amp; Berita
            </a>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-white/5">
            <a
              href="#lead-form"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary w-full justify-center py-2.5 text-xs font-bold"
            >
              📅 Jadwalkan Survey Rumah Contoh
            </a>
          </div>

          <div className="pt-2 flex justify-center">
            <ApiStatus />
          </div>
        </div>
      )}
    </header>
  )
}

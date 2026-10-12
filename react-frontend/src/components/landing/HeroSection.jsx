import { propertyInfo } from './propertyData.js'

export function HeroSection({ blog, config = {}, onOpenVideo, onOpenBrosur, onOpenVirtualTour }) {
  const brandName = config.title || blog?.title || propertyInfo.name
  const headline = config.headline || propertyInfo.headline
  const subheadline = config.subheadline || propertyInfo.subheadline
  const whatsapp = config.whatsapp || propertyInfo.whatsapp
  const heroImage = config.hero_image || '/hero-cluster.jpg'

  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none -z-10" />

      <div className="mx-auto max-w-6xl px-5">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 animate-fade-up">
          <span className="chip border-emerald-400/30 bg-emerald-400/10 text-emerald-300 font-semibold shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping inline-block mr-1" />
            {config.badge || 'Cluster Baru Rilis Tahap 3'}
          </span>
          <span className="chip border-violet-400/30 bg-violet-400/10 text-violet-200">
            {config.badge_promo || '✦ Promo DP 0% & Subsidi Suku Bunga KPR'}
          </span>
          <span className="chip border-amber-400/30 bg-amber-400/10 text-amber-200">
            {config.badge_shm || '★ Legalitas 100% Sertifikat SHM Pecah'}
          </span>
        </div>

        {/* Main Headline & Subheadline */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1
            className="text-gradient font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] animate-fade-up"
            style={{ animationDelay: '80ms' }}
          >
            {brandName}
          </h1>

          <p
            className="mt-4 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-950 dark:text-white tracking-tight animate-fade-up"
            style={{ animationDelay: '120ms' }}
          >
            {headline}
          </p>

          <p
            className="mt-5 text-base sm:text-lg md:text-xl text-slate-600 dark:text-emerald-100/80 leading-relaxed max-w-3xl mx-auto animate-fade-up"
            style={{ animationDelay: '180ms' }}
          >
            {subheadline}
          </p>

          {/* Dual CTAs & Quick Micro Action */}
          <div
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
            style={{ animationDelay: '240ms' }}
          >
            <a
              id="cta-hero-survey"
              href="#lead-form"
              className="btn-primary w-full sm:w-auto px-8 py-3.5 text-base font-bold shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2"
            >
              <span>{config.cta_survey || '📅 Jadwalkan Survey Lokasi'}</span>
              <span className="text-xs bg-white/20 rounded-full px-2 py-0.5">Gratis</span>
            </a>

            <button
              id="cta-hero-brosur"
              type="button"
              onClick={onOpenBrosur}
              className="btn-ghost w-full sm:w-auto px-7 py-3.5 text-base font-semibold flex items-center justify-center gap-2"
            >
              <span>{config.cta_brosur || '📥 Unduh Brosur & Pricelist'}</span>
            </button>

            <a
              id="cta-hero-wa"
              href={`https://wa.me/${whatsapp}?text=Halo%20Marketing%20${encodeURIComponent(brandName)}%2C%20saya%20tertarik%20tanya%20info%20promo%20dan%20jadwal%20survey`}
              target="_blank"
              rel="noreferrer"
              className="glass hover:bg-emerald-500/20 hover:border-emerald-400/40 text-emerald-700 dark:text-emerald-300 rounded-full px-6 py-3.5 text-sm font-semibold flex items-center justify-center gap-2 transition shadow-sm"
            >
              <span className="text-base">💬</span>
              <span>{config.cta_wa || 'Chat Sales via WhatsApp'}</span>
            </a>
          </div>
        </div>

        {/* Hero Visual Card with High-Res Image & Overlays */}
        <div
          className="relative rounded-3xl overflow-hidden border border-white/15 bg-slate-950 shadow-2xl group animate-fade-up"
          style={{ animationDelay: '300ms' }}
        >
          {/* Main Visual */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
            <img
              src={heroImage}
              alt={brandName}
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-950/60 via-transparent to-ink-950/60" />
          </div>

          {/* Floating Pill Highlights on Hero Visual */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6 flex flex-wrap gap-2 pointer-events-none">
            <span className="glass rounded-xl px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md flex items-center gap-1.5 border-emerald-400/40">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              100% Real Architecture &amp; Ready Unit
            </span>
            <span className="glass rounded-xl px-3.5 py-1.5 text-xs font-semibold text-amber-200 shadow-lg backdrop-blur-md hidden sm:inline-flex items-center gap-1">
              🏷 Cicilan Mulai Rp 1,9 Juta/bln
            </span>
          </div>

          {/* Interactive Trigger Buttons on Hero Image */}
          <div className="absolute bottom-5 left-5 right-5 md:bottom-8 md:left-8 md:right-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="glass rounded-2xl p-4 md:px-5 md:py-3.5 max-w-lg backdrop-blur-xl border-white/20">
              <p className="font-display font-bold text-white text-base md:text-lg">
                Rumah Tropis Modern Plafon 3.8 Meter
              </p>
              <p className="text-xs md:text-sm text-slate-300 mt-0.5">
                Double dinding hebel • Granit 60x60 • One Gate System 24 Jam • Bebas Banjir
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => onOpenVirtualTour && onOpenVirtualTour(config.virtual_tour_url)}
                className="btn glass hover:bg-violet-600/30 text-violet-200 border-violet-400/40 rounded-2xl px-4 py-3 text-xs md:text-sm font-semibold flex items-center gap-2 backdrop-blur-md transition shadow-lg"
              >
                <span>🔄</span>
                <span>Tur Virtual 360°</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenVideo && onOpenVideo(config.video_url, brandName)}
                className="btn-primary rounded-2xl px-5 py-3 text-xs md:text-sm font-bold flex items-center gap-2 shadow-xl shadow-fuchsia-500/25 transition"
              >
                <span>▶</span>
                <span>Tonton Video Show Unit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

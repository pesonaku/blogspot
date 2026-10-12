export function Hero({ blog, postCount }) {
  return (
    <section className="relative mx-auto max-w-6xl px-5 pb-12 pt-16 text-center md:pt-24">
      <p className="glass mx-auto mb-6 inline-flex animate-fade-up items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-200">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        {postCount > 0 ? `${postCount} artikel terbaru` : 'Selamat datang'}
      </p>
      <h1
        className="text-gradient animate-fade-up animate-shimmer font-display text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl"
        style={{ animationDelay: '80ms' }}
      >
        {blog.title}
      </h1>
      <p
        className="mx-auto mt-6 max-w-xl animate-fade-up text-base text-slate-600 dark:text-emerald-100/70 md:text-lg"
        style={{ animationDelay: '160ms' }}
      >
        Hunian impian tropis modern, fasilitas lengkap, dan panduan properti terlengkap.
      </p>
    </section>
  )
}

export function PageHeading({ children }) {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-8 pt-12">
      <h1 className="animate-fade-up font-display text-3xl font-bold text-emerald-950 dark:text-white md:text-5xl">
        {children}
      </h1>
    </section>
  )
}

export function LabelCloud({ labels }) {
  if (!labels.length) return null
  return (
    <section aria-label="Label" className="mx-auto max-w-6xl px-5 pb-10">
      <div className="flex flex-wrap justify-center gap-2">
        {labels.map((l) => (
          <a key={l.name} href={l.url} className="chip">
            {l.name}
            {l.count != null && (
              <span className="text-emerald-600 dark:text-emerald-300/70 ml-1 font-semibold">{l.count}</span>
            )}
          </a>
        ))}
      </div>
    </section>
  )
}

export function Pager({ pager }) {
  if (!pager.newer && !pager.older) return null
  return (
    <nav aria-label="Navigasi halaman" className="mx-auto flex max-w-6xl justify-between gap-4 px-5 pb-16">
      {pager.newer ? (
        <a id="pager-newer" href={pager.newer} className="btn-ghost">← Lebih baru</a>
      ) : (
        <span />
      )}
      {pager.older && (
        <a id="pager-older" href={pager.older} className="btn-primary">Lebih lama →</a>
      )}
    </nav>
  )
}

export function EmptyState({ blog, title, message }) {
  return (
    <section className="mx-auto max-w-xl animate-fade-up px-5 py-24 text-center">
      <p className="text-gradient font-display text-7xl font-extrabold">{title}</p>
      <p className="mt-4 text-slate-600 dark:text-emerald-200/70">{message}</p>
      <a href={blog.homepageUrl} className="btn-primary mt-8">Ke beranda</a>
    </section>
  )
}

export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Dark mode ambiance - Dominan Hijau Deep Forest */}
      <div className="hidden dark:block">
        <div className="absolute -left-40 -top-40 h-[36rem] w-[36rem] animate-float rounded-full bg-emerald-600/25 blur-3xl" />
        <div
          className="absolute -right-40 top-1/3 h-[32rem] w-[32rem] animate-float rounded-full bg-teal-600/20 blur-3xl"
          style={{ animationDelay: '-5s' }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] animate-float rounded-full bg-lime-500/15 blur-3xl"
          style={{ animationDelay: '-9s' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,#021811_80%)]" />
      </div>

      {/* Light mode ambiance - Dominan Hijau dan Putih Bersih */}
      <div className="block dark:hidden">
        <div className="absolute -left-40 -top-40 h-[36rem] w-[36rem] animate-float rounded-full bg-emerald-200/50 blur-3xl" />
        <div
          className="absolute -right-40 top-1/3 h-[32rem] w-[32rem] animate-float rounded-full bg-teal-100/60 blur-3xl"
          style={{ animationDelay: '-5s' }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] animate-float rounded-full bg-emerald-100/40 blur-3xl"
          style={{ animationDelay: '-9s' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,#f7faf8_85%)]" />
      </div>
    </div>
  )
}

export function Footer({ blog }) {
  return (
    <footer className="border-t border-emerald-500/20 bg-white/95 dark:bg-ink-950/90 dark:border-emerald-500/20 backdrop-blur-xl pt-12 pb-8 transition-colors">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-8 md:grid-cols-12 pb-10 border-b border-emerald-500/10 dark:border-white/5 text-sm">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 text-base font-bold text-white shadow-lg">
                🏡
              </span>
              <span className="font-display text-xl font-bold text-emerald-950 dark:text-white">
                {blog.title || 'Pesona Kahuripan'}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-emerald-100/70 leading-relaxed max-w-sm">
              Kawasan perumahan bernuansa asri berkonsep tropis modern. Memberikan jaminan legalitas SHM pecah, bebas banjir, dan proses KPR mudah dengan bank rekanan terpercaya.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="chip border-emerald-400/30 bg-emerald-400/10 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold">
                ✓ Izin PBG / IMB Resmi
              </span>
              <span className="chip border-teal-400/30 bg-teal-400/10 text-teal-700 dark:text-teal-300 text-[11px] font-semibold">
                ✓ 100% Sertifikat SHM Pecah
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <p className="font-display font-bold text-emerald-950 dark:text-white uppercase tracking-wider text-[11px]">
              Navigasi Halaman
            </p>
            <ul className="space-y-1.5 text-slate-600 dark:text-emerald-100/70">
              <li><a href="#hero" className="hover:text-emerald-600 dark:hover:text-white transition">Beranda &amp; Ringkasan</a></li>
              <li><a href="#keunggulan" className="hover:text-emerald-600 dark:hover:text-white transition">Keunggulan &amp; Fasilitas</a></li>
              <li><a href="#lokasi" className="hover:text-emerald-600 dark:hover:text-white transition">Aksesibilitas &amp; Lokasi</a></li>
              <li><a href="#tipe-unit" className="hover:text-emerald-600 dark:hover:text-white transition">Tipe Unit &amp; Spesifikasi</a></li>
              <li><a href="#galeri" className="hover:text-emerald-600 dark:hover:text-white transition">Galeri &amp; Tur 360°</a></li>
              <li><a href="#promo" className="hover:text-emerald-600 dark:hover:text-white transition">Promo Spesial Bulan Ini</a></li>
            </ul>
          </div>

          {/* Office & Contact */}
          <div className="md:col-span-4 space-y-2 text-xs text-slate-600 dark:text-emerald-100/70">
            <p className="font-display font-bold text-emerald-950 dark:text-white uppercase tracking-wider text-[11px]">
              Kantor Pemasaran &amp; Show Unit
            </p>
            <p>
              Jl. Raya Pesona Asri No. 88, Cileungsi, Bogor Timur
            </p>
            <p className="text-emerald-700 dark:text-emerald-400 font-bold">
              Buka Setiap Hari: 08.00 - 18.00 WIB
            </p>
            <p>
              Hotline: <strong className="text-emerald-950 dark:text-white">+62 812-8899-7711</strong>
            </p>
            <p>
              Email: <strong className="text-emerald-950 dark:text-white">marketing@pesonakahuripan.co.id</strong>
            </p>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-emerald-200/50">
          <p>© {new Date().getFullYear()} {blog.title || 'Pesona Kahuripan'}. Seluruh Hak Cipta Dilindungi.</p>
          <p>Tema Nuansa Hijau &amp; Putih · Built with React &amp; Tailwind</p>
        </div>
      </div>
    </footer>
  )
}

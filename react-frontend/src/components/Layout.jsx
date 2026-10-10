export function Hero({ blog, postCount }) {
  return (
    <section className="relative mx-auto max-w-6xl px-5 pb-12 pt-16 text-center md:pt-24">
      <p className="glass mx-auto mb-6 inline-flex animate-fade-up items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-violet-200">
        <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
        {postCount > 0 ? `${postCount} artikel terbaru` : 'Selamat datang'}
      </p>
      <h1
        className="text-gradient animate-fade-up animate-shimmer font-display text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl"
        style={{ animationDelay: '80ms' }}
      >
        {blog.title}
      </h1>
      <p
        className="mx-auto mt-6 max-w-xl animate-fade-up text-base text-slate-400 md:text-lg"
        style={{ animationDelay: '160ms' }}
      >
        Cerita, catatan, dan ide — dirangkai dengan Blogger, React, Tailwind CSS, dan Laravel.
      </p>
    </section>
  )
}

export function PageHeading({ children }) {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-8 pt-12">
      <h1 className="animate-fade-up font-display text-3xl font-bold text-white md:text-5xl">{children}</h1>
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
            {l.count != null && <span className="text-violet-300/60">{l.count}</span>}
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
      <p className="mt-4 text-slate-400">{message}</p>
      <a href={blog.homepageUrl} className="btn-primary mt-8">Ke beranda</a>
    </section>
  )
}

export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-40 -top-40 h-[32rem] w-[32rem] animate-float rounded-full bg-violet-600/25 blur-3xl" />
      <div
        className="absolute -right-40 top-1/3 h-[28rem] w-[28rem] animate-float rounded-full bg-fuchsia-600/20 blur-3xl"
        style={{ animationDelay: '-5s' }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[24rem] w-[24rem] animate-float rounded-full bg-amber-500/10 blur-3xl"
        style={{ animationDelay: '-9s' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,#0b0b14_70%)]" />
    </div>
  )
}

export function Footer({ blog }) {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-xs text-slate-500 md:flex-row">
        <p>© {new Date().getFullYear()} {blog.title}</p>
        <p>Dibangun dengan Blogger · React · Tailwind CSS · Laravel</p>
      </div>
    </footer>
  )
}

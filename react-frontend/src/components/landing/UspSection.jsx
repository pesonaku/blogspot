import { uspFeatures } from './propertyData.js'

export function UspSection() {
  const getIcon = (type) => {
    switch (type) {
      case 'shield-check':
        return '🛡️'
      case 'brick-wall':
        return '🧱'
      case 'droplets':
        return '🌊'
      case 'sun':
        return '☀️'
      case 'sparkles':
        return '✨'
      case 'trending-up':
        return '📈'
      default:
        return '⭐'
    }
  }

  return (
    <section id="keunggulan" className="relative mx-auto max-w-6xl px-5 py-16 md:py-24">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="chip border-violet-400/30 bg-violet-400/10 text-violet-200 uppercase tracking-widest text-[11px] font-bold">
          Keunggulan Eksklusif
        </span>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
          Mengapa Pesona Kahuripan Pilihan Tepat Keluarga Anda?
        </h2>
        <p className="mt-4 text-base text-slate-300">
          Lebih dari sekadar bangunan, kami menghadirkan ekosistem hunian yang aman, nyaman, dan bernilai investasi tinggi untuk generasi mendatang.
        </p>
      </div>

      {/* Feature Grid Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {uspFeatures.map((usp) => (
          <div
            key={usp.id}
            className="group relative rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-violet-500/15"
          >
            {/* Top row: Icon and Badge */}
            <div className="flex items-center justify-between mb-5">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-white/10 text-2xl shadow-inner group-hover:scale-110 transition-transform">
                {getIcon(usp.icon)}
              </span>
              <span className="text-[11px] font-semibold tracking-wide uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10 text-violet-200">
                {usp.badge}
              </span>
            </div>

            {/* Title and Description */}
            <h3 className="font-display text-xl font-bold text-white group-hover:text-violet-200 transition-colors">
              {usp.title}
            </h3>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              {usp.desc}
            </p>

            {/* Subtle bottom accent line */}
            <div className="mt-5 h-1 w-10 rounded-full bg-violet-400/20 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-fuchsia-400 transition-all duration-500" />
          </div>
        ))}
      </div>
    </section>
  )
}

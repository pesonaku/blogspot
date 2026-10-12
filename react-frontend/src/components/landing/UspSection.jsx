import { uspFeatures } from './propertyData.js'

export function UspSection({ config = {} }) {
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
        <span className="chip uppercase tracking-widest text-[11px] font-bold">
          {config.badge || 'Keunggulan Eksklusif'}
        </span>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-950 dark:text-white">
          {config.title || 'Mengapa Pesona Kahuripan Pilihan Tepat Keluarga Anda?'}
        </h2>
        <p className="mt-4 text-base text-slate-600 dark:text-emerald-100/70">
          {config.desc || 'Lebih dari sekadar bangunan, kami menghadirkan ekosistem hunian yang aman, nyaman, dan bernilai investasi tinggi untuk generasi mendatang.'}
        </p>
      </div>

      {/* Feature Grid Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {uspFeatures.map((usp) => (
          <div
            key={usp.id}
            className="group glass relative rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-900/10"
          >
            {/* Top row: Icon and Badge */}
            <div className="flex items-center justify-between mb-5">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/20 text-2xl shadow-inner group-hover:scale-110 transition-transform">
                {getIcon(usp.icon)}
              </span>
              <span className="text-[11px] font-semibold tracking-wide uppercase px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                {usp.badge}
              </span>
            </div>

            {/* Title and Description */}
            <h3 className="font-display text-xl font-bold text-emerald-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
              {usp.title}
            </h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-emerald-100/70 leading-relaxed">
              {usp.desc}
            </p>

            {/* Subtle bottom accent line */}
            <div className="mt-5 h-1 w-10 rounded-full bg-emerald-400/20 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-teal-400 transition-all duration-500" />
          </div>
        ))}
      </div>
    </section>
  )
}

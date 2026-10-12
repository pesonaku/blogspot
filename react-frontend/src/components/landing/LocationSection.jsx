import { useState } from 'react'
import { locationPoints, propertyInfo } from './propertyData.js'

export function LocationSection({ config = {} }) {
  const [activeTab, setActiveTab] = useState('transportasi')

  const tabs = [
    { key: 'transportasi', label: config.tab_trans || '🚆 Transportasi & Tol' },
    { key: 'pendidikan', label: config.tab_edu || '🎓 Sekolah & Kampus' },
    { key: 'kesehatan', label: config.tab_health || '🏥 Rumah Sakit & Medis' },
    { key: 'belanja', label: config.tab_mall || '🛍️ Mall & Rekreasi' },
  ]

  const gmapsUrl = config.gmaps_url || propertyInfo.googleMapsUrl
  const gmapsEmbed = config.gmaps_embed || propertyInfo.googleMapsEmbed
  const displayAddress = config.address || propertyInfo.address

  // Dynamic override for location points
  const buildCategoryPoints = (categoryKey, prefix) => {
    const defaults = locationPoints[categoryKey] || []
    const points = []
    for (let idx = 0; idx < 4; idx++) {
      const n = idx + 1
      const defaultItem = defaults[idx] || {}
      const hasCustomTitle = config[`${prefix}${n}_title`] !== undefined
      const title = hasCustomTitle ? config[`${prefix}${n}_title`] : defaultItem.title
      const time = config[`${prefix}${n}_time`] !== undefined ? config[`${prefix}${n}_time`] : defaultItem.time
      const note = config[`${prefix}${n}_note`] !== undefined ? config[`${prefix}${n}_note`] : defaultItem.note

      // Hanya masukkan jika ada judul
      if (title && title.trim()) {
        points.push({
          title: title.trim(),
          time: (time || '').trim(),
          note: (note || '').trim(),
        })
      }
    }
    return points.length > 0 ? points : defaults
  }

  const pointsData = {
    transportasi: buildCategoryPoints('transportasi', 'trans'),
    pendidikan: buildCategoryPoints('pendidikan', 'edu'),
    kesehatan: buildCategoryPoints('kesehatan', 'health'),
    belanja: buildCategoryPoints('belanja', 'mall'),
  }

  const currentPoints = pointsData[activeTab] || locationPoints[activeTab]

  return (
    <section id="lokasi" className="relative mx-auto max-w-6xl px-5 py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="chip uppercase tracking-widest text-[11px] font-bold">
          {config.badge || 'Location Advantage'}
        </span>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-950 dark:text-white">
          {config.title || 'Aksesibilitas Tanpa Batas di Titik Paling Strategis'}
        </h2>
        <p className="mt-4 text-base text-slate-600 dark:text-emerald-100/70">
          {config.desc || 'Dekat dengan simpul gerbang tol, stasiun KRL, sentra niaga, dan fasilitas umum vital untuk mobilitas harian yang efisien.'}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-stretch">
        {/* Left: Quick Access Categories & List */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            {/* Category Tab Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-3 py-2.5 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    activeTab === tab.key
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/25'
                      : 'glass text-slate-700 dark:text-emerald-200 hover:text-emerald-900 dark:hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* List of points for the active category */}
            <div className="space-y-3.5">
              {currentPoints.map((point, index) => (
                <div
                  key={index}
                  className="glass rounded-2xl p-4 flex items-center justify-between gap-4 transition hover:border-emerald-400/50"
                >
                  <div>
                    <h4 className="font-display font-bold text-emerald-950 dark:text-white text-sm md:text-base">
                      {point.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-emerald-200/60 mt-0.5">
                      {point.note}
                    </p>
                  </div>
                  <span className="shrink-0 chip font-mono font-bold text-xs px-3 py-1.5 shadow-sm">
                    {point.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick address banner */}
          <div className="mt-6 p-4 rounded-2xl glass flex items-start gap-3">
            <span className="text-2xl">📍</span>
            <div>
              <p className="text-xs font-bold text-emerald-950 dark:text-white uppercase tracking-wider">
                {config.address_label || 'Alamat Kantor Pemasaran & Lokasi:'}
              </p>
              <p className="text-xs text-slate-600 dark:text-emerald-100/70 mt-0.5">
                {displayAddress}
              </p>
            </div>
          </div>

          {/* Masterplan / Siteplan Image jika diupload */}
          {config.siteplan_image && (
            <div className="mt-4 rounded-2xl overflow-hidden border border-emerald-500/30 glass group">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <img
                  src={config.siteplan_image}
                  alt="Siteplan Kawasan"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-2 left-2 glass px-3 py-1 rounded-lg text-[11px] text-emerald-700 dark:text-emerald-300 backdrop-blur-md">
                  {config.siteplan_badge || '🗺️ Masterplan & Siteplan Kawasan'}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Google Maps Embed Card */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="relative flex-1 min-h-[380px] rounded-3xl overflow-hidden border border-emerald-500/20 glass shadow-2xl flex flex-col">
            <iframe
              src={gmapsEmbed}
              title="Peta Lokasi Pesona Kahuripan"
              className="w-full flex-1 border-0 filter contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Bottom Maps Action Pill */}
            <div className="p-4 bg-white/95 dark:bg-ink-950/90 border-t border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-600 dark:text-emerald-100/70">
                {config.maps_caption || '🧭 Navigasikan perjalanan survey langsung ke lokasi kami'}
              </span>
              <a
                href={gmapsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary w-full sm:w-auto py-2 px-4 text-xs font-bold text-center justify-center shrink-0"
              >
                {config.maps_btn || 'Buka di Google Maps ↗'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { locationPoints, propertyInfo } from './propertyData.js'

export function LocationSection({ config = {} }) {
  const [activeTab, setActiveTab] = useState('transportasi')

  const tabs = [
    { key: 'transportasi', label: '🚆 Transportasi & Tol', icon: '🚆' },
    { key: 'pendidikan', label: '🎓 Sekolah & Kampus', icon: '🎓' },
    { key: 'kesehatan', label: '🏥 Rumah Sakit & Medis', icon: '🏥' },
    { key: 'belanja', label: '🛍️ Mall & Rekreasi', icon: '🛍️' },
  ]

  const gmapsUrl = config.gmaps_url || propertyInfo.googleMapsUrl
  const gmapsEmbed = config.gmaps_embed || propertyInfo.googleMapsEmbed

  return (
    <section id="lokasi" className="relative mx-auto max-w-6xl px-5 py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="chip border-emerald-400/30 bg-emerald-400/10 text-emerald-300 uppercase tracking-widest text-[11px] font-bold">
          {config.badge || 'Location Advantage'}
        </span>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
          {config.title || 'Aksesibilitas Tanpa Batas di Titik Paling Strategis'}
        </h2>
        <p className="mt-4 text-base text-slate-300">
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
                      ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25'
                      : 'glass text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* List of points for the active category */}
            <div className="space-y-3.5">
              {locationPoints[activeTab].map((point, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md flex items-center justify-between gap-4 transition hover:border-emerald-400/40 hover:bg-white/[0.06]"
                >
                  <div>
                    <h4 className="font-display font-bold text-white text-sm md:text-base">
                      {point.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {point.note}
                    </p>
                  </div>
                  <span className="shrink-0 chip border-emerald-400/40 bg-emerald-400/15 text-emerald-300 font-mono font-bold text-xs px-3 py-1.5 shadow-sm">
                    {point.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick address banner */}
          <div className="mt-6 p-4 rounded-2xl border border-white/10 bg-ink-900/80 flex items-start gap-3">
            <span className="text-2xl">📍</span>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">
                Alamat Kantor Pemasaran &amp; Lokasi:
              </p>
              <p className="text-xs text-slate-300 mt-0.5">
                {propertyInfo.address}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Google Maps Embed Card */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="relative flex-1 min-h-[380px] rounded-3xl overflow-hidden border border-white/15 bg-slate-900 shadow-2xl flex flex-col">
            <iframe
              src={gmapsEmbed}
              title="Peta Lokasi Pesona Kahuripan"
              className="w-full flex-1 border-0 filter contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Bottom Maps Action Pill */}
            <div className="p-4 bg-ink-950/90 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-300">
                🧭 Navigasikan perjalanan survey langsung ke lokasi kami
              </span>
              <a
                href={gmapsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary w-full sm:w-auto py-2 px-4 text-xs font-bold text-center justify-center shrink-0"
              >
                Buka di Google Maps ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

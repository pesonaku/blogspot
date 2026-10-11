import { useState } from 'react'
import { galleryItems } from './propertyData.js'

export function GalleryVirtualTour({ onOpenLightbox, onOpenVirtualTour, onOpenVideo }) {
  const [activeFilter, setActiveFilter] = useState('all')

  const filterTabs = [
    { key: 'all', label: 'Semua Sudut' },
    { key: 'fasad', label: 'Fasad & Lingkungan' },
    { key: 'living', label: 'Living Room' },
    { key: 'kamar', label: 'Kamar Tidur' },
    { key: 'dapur', label: 'Dapur & Dining' },
  ]

  const filteredItems =
    activeFilter === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter)

  return (
    <section id="galeri" className="relative mx-auto max-w-6xl px-5 py-16 md:py-24">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="chip border-violet-400/30 bg-violet-400/10 text-violet-200 uppercase tracking-widest text-[11px] font-bold">
          Galeri &amp; Tur Virtual
        </span>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
          Jelajahi Setiap Sudut Keindahan Rumah Impian
        </h2>
        <p className="mt-4 text-base text-slate-300">
          Kenyamanan nyata yang dapat Anda rasakan langsung melalui visual detail ruangan dan pengalaman tur 360 derajat interaktif.
        </p>
      </div>

      {/* Virtual Tour & Video Highlight Banner */}
      <div className="grid gap-6 md:grid-cols-2 mb-12">
        {/* Card 1: 360 Tour */}
        <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-slate-900 group shadow-2xl p-6 md:p-8 flex flex-col justify-between min-h-[220px]">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-950/80 via-slate-900/90 to-fuchsia-950/80" />
          <div className="relative z-10">
            <span className="chip border-fuchsia-400/40 bg-fuchsia-400/15 text-fuchsia-300 text-xs font-semibold">
              🔄 360° Interactive View
            </span>
            <h3 className="font-display text-2xl font-bold text-white mt-3">
              Tur Virtual 360 Derajat
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md">
              Jelajahi ruang tamu berplafon tinggi, kamar tidur utama, dan layout rumah contoh dari gadget Anda kapan saja.
            </p>
          </div>
          <div className="relative z-10 mt-6">
            <button
              type="button"
              onClick={onOpenVirtualTour}
              className="btn-primary py-2.5 px-5 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-violet-500/25"
            >
              <span>Mulai Tur Virtual 360°</span>
              <span>➔</span>
            </button>
          </div>
        </div>

        {/* Card 2: Drone & Show Unit Video */}
        <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-slate-900 group shadow-2xl p-6 md:p-8 flex flex-col justify-between min-h-[220px]">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/80 via-slate-900/90 to-indigo-950/80" />
          <div className="relative z-10">
            <span className="chip border-emerald-400/40 bg-emerald-400/15 text-emerald-300 text-xs font-semibold">
              🎬 Drone &amp; Video Walkthrough
            </span>
            <h3 className="font-display text-2xl font-bold text-white mt-3">
              Video Site Plan &amp; Kawasan
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md">
              Saksikan masterplan kawasan perumahan dari ketinggian dan suasana lingkungan warga yang ramah &amp; asri.
            </p>
          </div>
          <div className="relative z-10 mt-6">
            <button
              type="button"
              onClick={onOpenVideo}
              className="btn glass hover:bg-emerald-500/20 text-emerald-200 border-emerald-400/40 py-2.5 px-5 text-xs sm:text-sm font-bold flex items-center gap-2 transition"
            >
              <span>▶ Putar Video Kawasan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveFilter(tab.key)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
              activeFilter === tab.key
                ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-md'
                : 'glass text-slate-300 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Photo Gallery Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onOpenLightbox(item)}
            className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] shadow-xl cursor-zoom-in transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/50"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              <div className="absolute top-3 left-3">
                <span className="glass rounded-lg px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                  {item.categoryName}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h4 className="font-display font-bold text-base md:text-lg group-hover:text-violet-200 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
                  {item.subtitle}
                </p>
              </div>

              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white backdrop-blur text-xs">
                  🔍
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

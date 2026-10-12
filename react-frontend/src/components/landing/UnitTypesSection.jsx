import { useState } from 'react'
import { propertyInfo, unitTypes } from './propertyData.js'

export function UnitTypesSection({ onOpenFloorPlan, onSelectUnitForSurvey }) {
  const [selectedUnitId, setSelectedUnitId] = useState(unitTypes[0].id)
  const [showSpecsTable, setShowSpecsTable] = useState(false)

  const activeUnit = unitTypes.find((u) => u.id === selectedUnitId) || unitTypes[0]

  return (
    <section id="tipe-unit" className="relative mx-auto max-w-6xl px-5 py-16 md:py-24">
      {/* Section Heading */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="chip border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-300 uppercase tracking-widest text-[11px] font-bold">
          Pilihan Tipe Unit
        </span>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
          Koleksi Rumah Modern Sesuai Kebutuhan Anda
        </h2>
        <p className="mt-4 text-base text-slate-300">
          Setiap unit didesain dengan konsep tropis modern berplafon tinggi, pencahayaan alami optimal, dan material bangunan berkualitas standar SNI.
        </p>
      </div>

      {/* Unit Switcher Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {unitTypes.map((unit) => (
          <button
            key={unit.id}
            type="button"
            onClick={() => setSelectedUnitId(unit.id)}
            className={`px-5 py-3 rounded-2xl font-display text-sm md:text-base font-bold transition flex items-center gap-2 ${
              selectedUnitId === unit.id
                ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-xl shadow-violet-500/30 scale-105'
                : 'glass text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>{unit.name}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 font-sans">
              {unit.code}
            </span>
          </button>
        ))}
      </div>

      {/* Featured Unit Detail Card */}
      <div className="rounded-3xl border border-white/15 bg-ink-900/90 backdrop-blur-2xl p-6 md:p-10 shadow-2xl">
        <div className="grid gap-8 lg:grid-cols-12 items-center">
          {/* Unit Image / Render */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-slate-950 group shadow-lg">
              <img
                src={activeUnit.heroImage}
                alt={activeUnit.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Badges on image */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="chip border-emerald-400/40 bg-emerald-400/20 text-emerald-300 font-semibold text-xs shadow-md backdrop-blur-md">
                  {activeUnit.featuredBadge}
                </span>
                <span className="chip border-white/20 bg-black/40 text-white text-xs backdrop-blur-md">
                  Dimensi {activeUnit.dimensi}
                </span>
              </div>

              {/* Price and Installment Badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <p className="text-xs text-slate-300 font-medium">Estimasi Cicilan KPR</p>
                  <p className="font-display text-xl md:text-2xl font-bold text-emerald-400">
                    {activeUnit.cicilanEstimate}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenFloorPlan(activeUnit)}
                  className="glass text-xs font-semibold px-3 py-2 rounded-xl text-white hover:bg-white/20 flex items-center gap-1.5 transition"
                >
                  <span>📐</span>
                  <span>Lihat Denah Ruangan</span>
                </button>
              </div>
            </div>
          </div>

          {/* Unit Details & Specs */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white">
                  {activeUnit.name} ({activeUnit.code})
                </h3>
                <span className="chip text-xs border-violet-400/30 text-violet-300">
                  {activeUnit.priceEstimate}
                </span>
              </div>
              <p className="mt-1 text-xs text-fuchsia-300 font-medium">
                {activeUnit.tag}
              </p>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                {activeUnit.description}
              </p>

              {/* Quick Spec Matrix Badges */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <p className="text-[11px] text-slate-400">Luas Bangunan (LB)</p>
                  <p className="font-display text-lg font-bold text-white mt-0.5">{activeUnit.lb} m²</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <p className="text-[11px] text-slate-400">Luas Tanah (LT)</p>
                  <p className="font-display text-lg font-bold text-white mt-0.5">{activeUnit.lt} m²</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <p className="text-[11px] text-slate-400">Kamar Tidur (KT)</p>
                  <p className="font-display text-lg font-bold text-emerald-400 mt-0.5">{activeUnit.kt} Ruang</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <p className="text-[11px] text-slate-400">Kamar Mandi (KM)</p>
                  <p className="font-display text-lg font-bold text-emerald-400 mt-0.5">{activeUnit.km} Ruang</p>
                </div>
              </div>

              {/* Material Highlights Accordion Toggle */}
              <div className="mt-6 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => setShowSpecsTable(!showSpecsTable)}
                  className="flex items-center justify-between w-full text-xs font-semibold text-slate-300 hover:text-white transition"
                >
                  <span className="flex items-center gap-1.5">
                    <span>🔨</span>
                    <span>Spesifikasi Material Bangunan (Pondasi, Dinding, Atap, Sanitair)</span>
                  </span>
                  <span className="text-violet-400">{showSpecsTable ? '▲ Sembunyikan' : '▼ Lihat Rincian'}</span>
                </button>

                {showSpecsTable && (
                  <div className="mt-3 rounded-2xl border border-white/10 bg-black/40 p-4 space-y-2 text-xs animate-fade-up">
                    <div className="grid grid-cols-3 py-1 border-b border-white/5">
                      <span className="text-slate-400 font-medium">Pondasi</span>
                      <span className="col-span-2 text-slate-200">{activeUnit.specs.pondasi}</span>
                    </div>
                    <div className="grid grid-cols-3 py-1 border-b border-white/5">
                      <span className="text-slate-400 font-medium">Dinding</span>
                      <span className="col-span-2 text-slate-200">{activeUnit.specs.dinding}</span>
                    </div>
                    <div className="grid grid-cols-3 py-1 border-b border-white/5">
                      <span className="text-slate-400 font-medium">Lantai</span>
                      <span className="col-span-2 text-slate-200">{activeUnit.specs.lantai}</span>
                    </div>
                    <div className="grid grid-cols-3 py-1 border-b border-white/5">
                      <span className="text-slate-400 font-medium">Rangka & Atap</span>
                      <span className="col-span-2 text-slate-200">{activeUnit.specs.atap}</span>
                    </div>
                    <div className="grid grid-cols-3 py-1 border-b border-white/5">
                      <span className="text-slate-400 font-medium">Kusen & Jendela</span>
                      <span className="col-span-2 text-slate-200">{activeUnit.specs.kusen}</span>
                    </div>
                    <div className="grid grid-cols-3 py-1 border-b border-white/5">
                      <span className="text-slate-400 font-medium">Pintu Utama</span>
                      <span className="col-span-2 text-slate-200">{activeUnit.specs.pintu}</span>
                    </div>
                    <div className="grid grid-cols-3 py-1 border-b border-white/5">
                      <span className="text-slate-400 font-medium">Sanitair</span>
                      <span className="col-span-2 text-slate-200">{activeUnit.specs.sanitair}</span>
                    </div>
                    <div className="grid grid-cols-3 py-1">
                      <span className="text-slate-400 font-medium">Listrik & Air</span>
                      <span className="col-span-2 text-slate-200">{activeUnit.specs.listrik} • {activeUnit.specs.air}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                id={`cta-tanya-${activeUnit.id}`}
                href={`https://wa.me/${propertyInfo.whatsapp}?text=Halo%20Marketing%2C%20saya%20ingin%20tanya%20harga%20dan%20ketersediaan%20unit%20untuk%20${encodeURIComponent(activeUnit.name + ' (' + activeUnit.code + ')')}`}
                target="_blank"
                rel="noreferrer"
                className="btn-primary flex-1 justify-center py-3 text-sm font-bold shadow-lg shadow-violet-500/25"
              >
                💬 Tanya Harga &amp; Unit Ini
              </a>

              <button
                type="button"
                onClick={() => onSelectUnitForSurvey(activeUnit.name)}
                className="btn-ghost justify-center py-3 text-sm font-semibold border-white/20 hover:border-emerald-400/50"
              >
                📅 Jadwalkan Survey {activeUnit.name}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

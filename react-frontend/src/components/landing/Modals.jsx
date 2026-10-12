import { useState } from 'react'
import { formatEmbedVideoUrl } from '../../lib/widgetConfig.js'

export function FloorPlanModal({ unit, onClose, onSelectUnitForSurvey }) {
  if (!unit) return null

  const hasImage = Boolean(unit.floorPlanImage)
  const [viewMode, setViewMode] = useState(hasImage ? 'image' : 'blueprint')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-up">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-ink-950 p-6 md:p-8 shadow-2xl text-slate-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          aria-label="Tutup Denah"
        >
          ✕
        </button>

        <div className="flex flex-wrap items-center gap-3 pr-12">
          <span className="chip border-emerald-400/30 bg-emerald-400/10 text-emerald-300 font-semibold">
            {unit.code}
          </span>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
            Denah Tata Ruang — {unit.name}
          </h3>
        </div>

        <p className="mt-2 text-sm text-slate-400">
          Dimensi Kaveling: <span className="font-semibold text-white">{unit.dimensi}</span> • Luas Bangunan: <span className="font-semibold text-white">{unit.lb} m²</span> • Luas Tanah: <span className="font-semibold text-white">{unit.lt} m²</span>
        </p>

        {/* Tab Switcher: Gambar Denah Asli vs Skema Blueprint */}
        {hasImage && (
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setViewMode('image')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === 'image'
                  ? 'bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 shadow-md'
                  : 'glass text-slate-400 hover:text-white'
              }`}
            >
              <span>🖼️ Foto Denah Asli</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('blueprint')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === 'blueprint'
                  ? 'bg-indigo-500/20 border border-indigo-400/50 text-indigo-300 shadow-md'
                  : 'glass text-slate-400 hover:text-white'
              }`}
            >
              <span>📐 Skema Arsitektur (Bagan)</span>
            </button>
          </div>
        )}

        <div className="mt-6 grid gap-6 lg:grid-cols-12 items-start">
          {/* Visual Floor Plan Diagram / Uploaded Image */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-white/10 bg-ink-900 p-4">
            {viewMode === 'image' && hasImage ? (
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center group">
                <img
                  src={unit.floorPlanImage}
                  alt={`Denah Arsitektur ${unit.name}`}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-3 left-3 glass px-3 py-1 rounded-lg text-[11px] text-white backdrop-blur-md">
                  Denah Tata Ruang Resmi ({unit.code})
                </div>
              </div>
            ) : (
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
              {/* Floor Plan Graphic Simulation */}
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/40 to-slate-950/80 p-5 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono">BAGIAN DEPAN (JALAN 8M)</span>
                  <span className="font-mono text-emerald-400">UTARA ▲</span>
                </div>

                {/* SVG Blueprint Architecture Layout */}
                <div className="my-auto mx-auto w-full max-w-sm rounded-lg border-2 border-indigo-400/40 bg-indigo-950/30 p-3 shadow-inner">
                  <div className="text-center font-display text-xs font-semibold text-indigo-300 mb-2 border-b border-indigo-400/20 pb-1">
                    DENAH ARSITEKTUR {unit.name.toUpperCase()} ({unit.code})
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="rounded border border-indigo-400/30 bg-indigo-900/40 p-2 text-center">
                      <p className="font-bold text-white">Carport Mobil</p>
                      <p className="text-indigo-300">{unit.rooms.find(r => r.name.includes('Carport'))?.size || '3 x 4.5 m'}</p>
                    </div>
                    <div className="rounded border border-emerald-400/30 bg-emerald-950/40 p-2 text-center">
                      <p className="font-bold text-emerald-300">Taman Depan</p>
                      <p className="text-slate-300">Asri & Resapan</p>
                    </div>
                    <div className="col-span-2 rounded border border-indigo-400/30 bg-indigo-900/40 p-2.5 text-center">
                      <p className="font-bold text-white">Living & Dining Room (Plafon 3.8m)</p>
                      <p className="text-indigo-300">{unit.rooms.find(r => r.name.includes('Ruang') || r.name.includes('Living'))?.size || '3.5 x 4 m'}</p>
                    </div>
                    <div className="rounded border border-indigo-400/30 bg-indigo-900/30 p-2 text-center">
                      <p className="font-bold text-white">Kamar Tidur 1</p>
                      <p className="text-slate-300">{unit.rooms[0]?.size || '3 x 3 m'}</p>
                    </div>
                    <div className="rounded border border-indigo-400/30 bg-indigo-900/30 p-2 text-center">
                      <p className="font-bold text-white">Kamar Tidur 2</p>
                      <p className="text-slate-300">{unit.rooms[1]?.size || '2.8 x 2.7 m'}</p>
                    </div>
                    <div className="rounded border border-amber-400/30 bg-amber-950/30 p-2 text-center">
                      <p className="font-bold text-amber-200">Kamar Mandi</p>
                      <p className="text-slate-300">Shower & Kloset Duduk</p>
                    </div>
                    <div className="rounded border border-indigo-400/30 bg-indigo-900/30 p-2 text-center">
                      <p className="font-bold text-white">Dapur Bersih</p>
                      <p className="text-slate-300">Granite Sink Table</p>
                    </div>
                    <div className="col-span-2 rounded border border-emerald-400/30 bg-emerald-950/40 p-2 text-center">
                      <p className="font-bold text-emerald-300">Halaman Belakang (Pengembangan)</p>
                      <p className="text-slate-300">{unit.rooms.find(r => r.name.includes('Belakang'))?.size || 'Sisa Tanah Luas'}</p>
                    </div>
                  </div>
                </div>

                <div className="text-center text-[11px] text-slate-400">
                  Denah tata letak dapat disesuaikan (Custom Opsi Layout Tersedia)
                </div>
              </div>
            </div>
          )}
        </div>

          {/* Room breakdown table & CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <h4 className="font-display font-semibold text-lg text-white mb-3">
                Rincian Ukuran Setiap Ruangan:
              </h4>
              <ul className="space-y-2 text-sm">
                {unit.rooms.map((room, idx) => (
                  <li key={idx} className="flex items-center justify-between py-1.5 border-b border-white/5">
                    <span className="text-slate-300">{room.name}</span>
                    <span className="font-mono font-medium text-emerald-400">{room.size}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 p-3.5 rounded-xl border border-emerald-400/20 bg-emerald-400/5 text-xs text-emerald-200 leading-relaxed">
                ✦ <strong>Keunggulan Desain:</strong> Pencahayaan alami optimal pada setiap kamar tidur dengan bukaan jendela ventilasi silang (cross-ventilation) menghadap ruang terbuka.
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  onClose()
                  onSelectUnitForSurvey(unit.name)
                }}
                className="btn-primary w-full justify-center text-center py-3 text-sm"
              >
                Pilih Tipe Ini Untuk Survey Lokasi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function VirtualTourModal({ virtualTourUrl, onClose }) {
  const [activeRoom, setActiveRoom] = useState('living')

  const rooms360 = {
    living: {
      title: 'Living Room 360° — High Ceiling 3.8 Meter',
      image: '/living-room.jpg',
      desc: 'Bukaan jendela kaca geser lebar langsung menuju taman samping yang asri.',
    },
    cluster: {
      title: 'Lingkungan Cluster & Fasad Rumah',
      image: '/hero-cluster.jpg',
      desc: 'Jalan paving blok lebar 8 meter dan saluran air tertutup bebas banjir.',
    },
    master: {
      title: 'Master Bedroom Nyaman & Estetik',
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      desc: 'Kamar tidur utama dengan pencahayaan alami dan lantai granit anti noda.',
    },
  }

  const isEmbedTour =
    virtualTourUrl &&
    (virtualTourUrl.startsWith('http://') || virtualTourUrl.startsWith('https://'))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-up">
      <div className="relative w-full max-w-5xl rounded-3xl border border-white/10 bg-ink-950 p-6 md:p-8 shadow-2xl text-slate-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          aria-label="Tutup Virtual Tour"
        >
          ✕
        </button>

        <div className="flex flex-wrap items-center gap-3 pr-12 mb-4">
          <span className="chip border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-300 font-semibold">
            Tur Virtual 360° Interaktif
          </span>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
            Eksplorasi Rumah Contoh Tanpa Harus Keluar Rumah
          </h3>
        </div>

        {isEmbedTour ? (
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-slate-950">
            <iframe
              src={virtualTourUrl}
              title="Virtual Tour 360"
              className="w-full h-full border-0"
              allow="accelerometer; gyroscope; magnetometer; vr; xr-spatial-tracking; fullscreen"
              allowFullScreen
            />
          </div>
        ) : (
          <>
            {/* Room Switcher Tabs */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setActiveRoom('living')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                  activeRoom === 'living'
                    ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg'
                    : 'glass text-slate-300 hover:text-white'
                }`}
              >
                Ruang Keluarga & Tamu
              </button>
              <button
                onClick={() => setActiveRoom('cluster')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                  activeRoom === 'cluster'
                    ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg'
                    : 'glass text-slate-300 hover:text-white'
                }`}
              >
                Fasad Cluster & Jalan
              </button>
              <button
                onClick={() => setActiveRoom('master')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                  activeRoom === 'master'
                    ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg'
                    : 'glass text-slate-300 hover:text-white'
                }`}
              >
                Kamar Tidur Utama
              </button>
            </div>

            {/* Interactive Viewer Box */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-slate-950 group">
              <img
                src={rooms360[activeRoom].image}
                alt={rooms360[activeRoom].title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

              {/* 360 Compass Pill */}
              <div className="absolute top-4 left-4 glass px-3.5 py-1.5 rounded-full text-xs font-semibold text-white flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                360° Panoramic View Active
              </div>

              <div className="absolute bottom-5 left-5 right-5 flex flex-col md:flex-row md:items-end justify-between gap-3 text-white">
                <div>
                  <h4 className="font-display text-lg md:text-xl font-bold">{rooms360[activeRoom].title}</h4>
                  <p className="text-xs md:text-sm text-slate-300">{rooms360[activeRoom].desc}</p>
                </div>
                <a
                  href="#lead-form"
                  onClick={onClose}
                  className="btn-primary py-2 px-4 text-xs font-semibold self-start md:self-auto"
                >
                  Lihat Langsung Unit Ini
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export function VideoPlayerModal({ videoUrl, title, onClose }) {
  const embedSrc =
    formatEmbedVideoUrl(videoUrl) ||
    'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0&controls=1'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-up">
      <div className="relative w-full max-w-4xl rounded-3xl border border-white/10 bg-ink-950 p-6 md:p-8 shadow-2xl text-slate-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          aria-label="Tutup Video"
        >
          ✕
        </button>

        <h3 className="font-display text-2xl font-bold text-white mb-2 pr-12">
          {title || 'Video Tour Show Unit & Site Plan Kawasan Pesona Kahuripan'}
        </h3>
        <p className="text-xs text-slate-400 mb-5">
          Tinjauan lengkap dari udara (drone footage) dan walkthrough interior unit rumah contoh.
        </p>

        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-slate-950">
          <iframe
            className="w-full h-full"
            src={embedSrc}
            title={title || 'Video Show Unit Pesona Kahuripan'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}

export function BrosurModal({ brochureUrl, onClose }) {
  const [downloaded, setDownloaded] = useState(false)
  const [name, setName] = useState('')
  const [wa, setWa] = useState('')

  const handleDownload = (e) => {
    e.preventDefault()
    setDownloaded(true)
    if (brochureUrl) {
      window.open(brochureUrl, '_blank')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-up">
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-ink-950 p-6 md:p-8 shadow-2xl text-slate-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          aria-label="Tutup Modal"
        >
          ✕
        </button>

        <div className="text-center">
          <span className="grid mx-auto h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white text-2xl shadow-lg mb-3">
            📥
          </span>
          <h3 className="font-display text-2xl font-bold text-white">
            Unduh E-Brosur &amp; Pricelist 2026
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            Dapatkan katalog lengkap spesifikasi, denah arsitektur, dan pricelist resmi perumahan Pesona Kahuripan.
          </p>
        </div>

        {downloaded ? (
          <div className="mt-6 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-5 text-center text-emerald-300">
            <p className="font-semibold text-lg">Brosur Berhasil Diunduh!</p>
            <p className="text-xs text-slate-300 mt-1">
              File PDF e-brosur sedang dikirim juga ke nomor WhatsApp Anda {wa ? `(${wa})` : ''}.
            </p>
            <a
              href="https://wa.me/6281288997711?text=Halo%20Marketing%2C%20saya%20sudah%20unduh%20brosur%20Pesona%20Kahuripan%20dan%20ingin%20tanya%20pricelist%20terbaru"
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-4 w-full justify-center text-xs"
            >
              Lanjut Tanya Tim Sales di WhatsApp
            </a>
          </div>
        ) : (
          <form onSubmit={handleDownload} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Budi Santoso"
                className="w-full glass rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-violet-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Nomor WhatsApp
              </label>
              <input
                type="tel"
                required
                value={wa}
                onChange={(e) => setWa(e.target.value)}
                placeholder="0812xxxxxxx"
                className="w-full glass rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-violet-400"
              />
            </div>
            <button
              type="submit"
              className="btn-primary w-full justify-center py-3 text-sm font-semibold shadow-xl"
            >
              Unduh Brosur & Pricelist Sekarang (PDF)
            </button>
            <p className="text-[11px] text-center text-slate-500">
              Privasi Anda aman. Data hanya digunakan untuk pengiriman katalog resmi.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

export function LightboxModal({ image, title, subtitle, onClose }) {
  if (!image) return null

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-up cursor-zoom-out"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl border border-white/10 bg-ink-950 p-3 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/90"
          aria-label="Tutup Foto"
        >
          ✕
        </button>

        <img
          src={image}
          alt={title || 'Galeri Foto'}
          className="max-h-[75vh] w-auto mx-auto rounded-2xl object-contain"
        />

        {(title || subtitle) && (
          <div className="p-4 text-center">
            {title && <h4 className="font-display text-lg font-bold text-white">{title}</h4>}
            {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
          </div>
        )}
      </div>
    </div>
  )
}

import { useState, useRef, useEffect } from 'react'
import { serializeSectionConfig, isSectionDisabled } from '../../lib/widgetConfig.js'

/**
 * Komponen upload file premium untuk Gambar atau Video
 * Mendukung drag-and-drop, pemilihan file lokal (convert to base64 data URL),
 * serta opsi input URL langsung dengan live preview.
 */
function FileUploadField({
  label,
  value,
  onChange,
  accept = 'image/*',
  isVideo = false,
  helpText = '',
}) {
  const [isDragging, setIsDragging] = useState(false)
  const [mode, setMode] = useState(value && value.startsWith('data:') ? 'upload' : 'url')
  const fileInputRef = useRef(null)

  const handleFileProcess = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      onChange(e.target.result)
      setMode('upload')
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0])
    }
  }

  return (
    <div className="space-y-2 rounded-2xl border border-emerald-500/15 bg-white/50 dark:bg-ink-900/60 p-4 transition-all">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-emerald-950 dark:text-emerald-100 flex items-center gap-1.5">
          <span>{isVideo ? '🎬' : '🖼️'}</span>
          <span>{label}</span>
        </label>
        <div className="flex items-center rounded-lg bg-emerald-500/10 p-0.5 text-[11px] font-semibold">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`rounded-md px-2.5 py-1 transition ${
              mode === 'upload'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-emerald-300 hover:text-emerald-900 dark:hover:text-white'
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`rounded-md px-2.5 py-1 transition ${
              mode === 'url'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-emerald-300 hover:text-emerald-900 dark:hover:text-white'
            }`}
          >
            Link URL
          </button>
        </div>
      </div>

      {mode === 'upload' ? (
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`group relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-emerald-500 bg-emerald-500/10 scale-[1.01]'
              : 'border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500/5'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={(e) => e.target.files?.[0] && handleFileProcess(e.target.files[0])}
            className="hidden"
          />

          <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/15 text-xl text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
            {isVideo ? '📹' : '📤'}
          </div>

          <p className="mt-2 text-xs font-semibold text-slate-700 dark:text-emerald-100">
            Klik untuk pilih file atau seret &amp; lepas ke sini
          </p>
          <p className="text-[10px] text-slate-500 dark:text-emerald-300/60 mt-0.5">
            {isVideo ? 'Mendukung MP4, WebM (video akan otomatis dikonversi)' : 'Mendukung JPG, PNG, WebP (langsung tersemat otomatis)'}
          </p>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={isVideo ? 'https://www.youtube.com/watch?v=...' : 'https://... atau /nama-gambar.jpg'}
            className="w-full rounded-xl border border-emerald-500/25 bg-white dark:bg-ink-950 px-3.5 py-2 text-xs text-emerald-950 dark:text-white placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      )}

      {/* Media Preview Box */}
      {value && (
        <div className="relative mt-2 rounded-xl overflow-hidden border border-emerald-500/20 bg-slate-950/40 p-2 flex items-center gap-3">
          {isVideo ? (
            value.startsWith('data:') ? (
              <video src={value} controls className="h-20 w-32 rounded-lg object-cover" />
            ) : (
              <div className="h-16 w-28 rounded-lg bg-emerald-950 flex flex-col items-center justify-center text-xs text-emerald-300">
                <span>▶ Video URL</span>
                <span className="text-[9px] text-slate-400 line-clamp-1 max-w-[100px]">{value}</span>
              </div>
            )
          ) : (
            <img src={value} alt="Preview" className="h-16 w-24 rounded-lg object-cover border border-emerald-500/20" />
          )}

          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-emerald-950 dark:text-white truncate">
              {value.startsWith('data:') ? '✓ File Terupload (Base64 Disematkan)' : value}
            </p>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400">Siap ditampilkan di landing page</p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onChange('')
            }}
            className="rounded-lg p-1.5 text-xs text-rose-500 hover:bg-rose-500/10 transition"
            title="Hapus media"
          >
            ✕ Hapus
          </button>
        </div>
      )}

      {helpText && <p className="text-[10px] text-slate-500 dark:text-emerald-300/50">{helpText}</p>}
    </div>
  )
}

/**
 * Input Teks standar dengan label
 */
function TextInput({ label, value, onChange, placeholder = '', type = 'text', helpText = '' }) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-semibold text-slate-700 dark:text-emerald-200">
        {label}
      </label>
      <input
        type={type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-emerald-500/20 bg-white dark:bg-ink-900 px-3.5 py-2 text-xs text-emerald-950 dark:text-white placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
      />
      {helpText && <p className="text-[10px] text-slate-500 dark:text-emerald-300/50">{helpText}</p>}
    </div>
  )
}

/**
 * Textarea dengan label
 */
function TextAreaInput({ label, value, onChange, placeholder = '', rows = 2, helpText = '' }) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-semibold text-slate-700 dark:text-emerald-200">
        {label}
      </label>
      <textarea
        rows={rows}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-emerald-500/20 bg-white dark:bg-ink-900 px-3.5 py-2 text-xs text-emerald-950 dark:text-white placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition resize-none"
      />
      {helpText && <p className="text-[10px] text-slate-500 dark:text-emerald-300/50">{helpText}</p>}
    </div>
  )
}

export default function WidgetCustomizerModal({
  isOpen,
  onClose,
  currentSections = [],
  onApplyOverrides,
  isAdminMode,
  onHideAdminMode,
}) {
  const [activeTab, setActiveTab] = useState('hero')
  const [copiedNotification, setCopiedNotification] = useState(false)
  const [selectedUnitSubTab, setSelectedUnitSubTab] = useState(1)
  const [selectedLocationSubTab, setSelectedLocationSubTab] = useState('trans')

  // Inisialisasi state per-section dari props
  const [formData, setFormData] = useState(() => {
    const initial = {}
    currentSections.forEach((sec) => {
      initial[sec.id] = { ...(sec.config || {}) }
    })
    return initial
  })

  // Sinkronkan state formData secara otomatis setiap kali modal dibuka atau data section berubah
  useEffect(() => {
    if (isOpen && currentSections.length > 0) {
      setFormData((prev) => {
        const updated = { ...prev }
        currentSections.forEach((sec) => {
          updated[sec.id] = { ...(sec.config || {}), ...(prev[sec.id] || {}) }
        })
        return updated
      })
    }
  }, [isOpen, currentSections])

  if (!isOpen) return null

  const handleFieldChange = (secId, key, val) => {
    setFormData((prev) => ({
      ...prev,
      [secId]: {
        ...(prev[secId] || {}),
        [key]: val,
      },
    }))
  }

  const handleToggleDisable = (secId) => {
    setFormData((prev) => {
      const secCfg = prev[secId] || {}
      const currentlyDisabled = isSectionDisabled(secCfg)
      return {
        ...prev,
        [secId]: {
          ...secCfg,
          disable: currentlyDisabled ? 'false' : 'true',
        },
      }
    })
  }

  const activeConfig = formData[activeTab] || {}

  // Pemetaan 1-ke-1 dengan urutan dan nama Section di Tata Letak Blogger
  const sectionTabs = [
    {
      id: 'config',
      sectionName: '#CONFIG',
      name: 'Kode Lisensi & Sistem',
      widgetTitle: 'Kode Lisensi ( Premium )',
      widgetCode: 'HTML99',
      icon: '🔑',
    },
    {
      id: 'header',
      sectionName: '#HEADER-SECTION',
      name: 'Logo & Menu Header',
      widgetTitle: 'Pengaturan Tambahan Header & CTA',
      widgetCode: 'HTML10',
      icon: '🏷️',
    },
    {
      id: 'hero',
      sectionName: '#HERO-BANNER',
      name: 'Hero: Headline & CTA',
      widgetTitle: 'Wujudkan Rumah Impian Anda (Hero Banner Utama)',
      widgetCode: 'HTML1',
      icon: '🖼️',
    },
    {
      id: 'hero-media',
      sectionName: '#HERO-BANNER',
      name: 'Hero: Media, Video & 360°',
      widgetTitle: 'Rumah Subsidi - Pesona Kahuripan (Media & Video)',
      widgetCode: 'HTML12',
      icon: '🎬',
    },
    {
      id: 'stats',
      sectionName: '#SECTION-STATS',
      name: 'Quick Stats Kredibilitas',
      widgetTitle: 'Ringkasan Proyek & Angka Kunci (Quick Stats)',
      widgetCode: 'HTML2',
      icon: '📊',
    },
    {
      id: 'usp',
      sectionName: '#SECTION-USP',
      name: 'Keunggulan Kawasan (USP)',
      widgetTitle: 'Keunggulan Kawasan & Fasilitas (USP)',
      widgetCode: 'HTML3',
      icon: '⭐',
    },
    {
      id: 'location',
      sectionName: '#SECTION-LOKASI',
      name: 'Lokasi Strategis & Peta',
      widgetTitle: 'Aksesibilitas Lokasi & Peta Google Maps',
      widgetCode: 'HTML4',
      icon: '📍',
    },
    {
      id: 'units',
      sectionName: '#SECTION-TIPE-UNIT',
      name: 'Tipe Unit & Spesifikasi',
      widgetTitle: 'Katalog Tipe Unit & Spesifikasi Rumah',
      widgetCode: 'HTML5',
      icon: '🏡',
    },
    {
      id: 'gallery',
      sectionName: '#SECTION-GALERI',
      name: 'Galeri Foto & Tur 360°',
      widgetTitle: 'Galeri Foto Ruangan & Tur Virtual 360°',
      widgetCode: 'HTML6',
      icon: '📸',
    },
    {
      id: 'promo',
      sectionName: '#SECTION-PROMO',
      name: 'Promo & Countdown NUP',
      widgetTitle: 'Promo Spesial Bulan Ini & Countdown NUP',
      widgetCode: 'HTML7',
      icon: '🎁',
    },
    {
      id: 'social-proof',
      sectionName: '#SECTION-TESTIMONI',
      name: 'Testimoni Pembeli & BAST',
      widgetTitle: 'Testimoni Konsumen & Serah Terima Kunci (BAST)',
      widgetCode: 'HTML8',
      icon: '🤝',
    },
    {
      id: 'lead-form',
      sectionName: '#SECTION-SURVEY',
      name: 'Formulir Survey Sales',
      widgetTitle: 'Formulir Reservasi Survey & Kontak Sales',
      widgetCode: 'HTML9',
      icon: '📝',
    },
    {
      id: 'floating-cta',
      sectionName: '#FLOATING-CTA',
      name: 'Tombol Melayang WhatsApp',
      widgetTitle: 'Tombol Melayang WhatsApp Pojok Bawah',
      widgetCode: 'HTML11',
      icon: '💬',
    },
  ]

  const activeTabMeta = sectionTabs.find((t) => t.id === activeTab) || sectionTabs[0]

  const handleSaveAndApply = () => {
    onApplyOverrides(formData)
    localStorage.setItem('pesona_custom_widgets', JSON.stringify(formData))
    onClose()
  }

  const handleCopyBloggerCode = () => {
    const serialized = serializeSectionConfig(activeTab, activeConfig)
    navigator.clipboard.writeText(serialized)
    setCopiedNotification(true)
    setTimeout(() => setCopiedNotification(false), 2200)
  }

  const handleResetSection = () => {
    if (confirm(`Reset konfigurasi section "${activeTabMeta.name}" ke pengaturan bawaan?`)) {
      setFormData((prev) => ({
        ...prev,
        [activeTab]: {},
      }))
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-up">
      <div className="relative w-full max-w-5xl h-[92vh] max-h-[850px] rounded-3xl bg-white dark:bg-ink-950 border border-emerald-500/30 shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <div className="p-5 border-b border-emerald-500/20 bg-emerald-950/20 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 text-xl font-bold text-white shadow-lg shadow-emerald-600/30">
              ⚙️
            </span>
            <div>
              <h3 className="font-display text-lg sm:text-xl font-extrabold text-emerald-950 dark:text-white flex items-center gap-2">
                Custom Widget Studio
                <span className="chip text-[10px] border-emerald-400/40 text-emerald-700 dark:text-emerald-300">
                  Full Edit &amp; Media Upload
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-emerald-200/60">
                Formulir visual interaktif untuk mengedit konten, upload gambar &amp; video di seluruh section landing page.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveAndApply}
              className="btn-primary py-2 px-4 text-xs font-bold shadow-lg shadow-emerald-600/25 flex items-center gap-1.5"
            >
              <span>💾</span>
              <span>Terapkan Perubahan</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 hover:text-white hover:bg-white/10 transition"
              aria-label="Tutup"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Info Banner: Mode Admin Tersembunyi dari Publik */}
        <div className="px-5 py-2.5 bg-emerald-500/10 border-b border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-emerald-950 dark:text-emerald-200">
          <div className="flex items-center gap-2">
            <span className="text-base shrink-0">🔒</span>
            <span className="leading-tight">
              <strong>Studio Khusus Admin (Tersembunyi dari Publik):</strong> Pengunjung biasa tidak melihat studio/tombol ini. Buka kembali kapan saja via URL <code className="font-mono bg-emerald-500/20 px-1 py-0.5 rounded font-bold text-emerald-800 dark:text-emerald-300">?admin=1</code> atau shortcut <kbd className="font-mono bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded font-bold">Ctrl + Shift + E</kbd>.
            </span>
          </div>
          {onHideAdminMode && (
            <button
              type="button"
              onClick={onHideAdminMode}
              className="self-start sm:self-auto text-[11px] font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 px-2.5 py-1 rounded-lg border border-rose-500/30 hover:bg-rose-500/10 transition shrink-0"
              title="Keluar dari mode admin dan sembunyikan semua tombol agar halaman kembali ke tampilan publik murni"
            >
              ✕ Sembunyikan Akses Publik
            </button>
          )}
        </div>

        {/* Main Content Area (Sidebar Tabs + Form Pane) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Sidebar: Section Tabs */}
          <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-emerald-500/15 bg-slate-50/50 dark:bg-ink-900/40 p-3 overflow-x-auto md:overflow-y-auto shrink-0 flex md:flex-col gap-1.5">
            <p className="hidden md:block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-emerald-300/40 px-3 py-1">
              Tata Letak Blogger (13 Widget):
            </p>
            {sectionTabs.map((tab) => {
              const tabCfg = formData[tab.id] || {}
              const isTabDisabled = isSectionDisabled(tabCfg)
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold transition text-left shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20'
                      : isTabDisabled
                      ? 'opacity-60 text-slate-400 dark:text-slate-500 hover:opacity-100 hover:bg-rose-500/10'
                      : 'text-slate-700 dark:text-emerald-200 hover:bg-emerald-500/10'
                  }`}
                >
                  <div className="flex flex-col gap-0.5 min-w-0 pr-2">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="text-sm shrink-0">{tab.icon}</span>
                      <span className={`truncate text-xs ${isTabDisabled && activeTab !== tab.id ? 'line-through' : ''}`}>
                        {tab.name}
                      </span>
                    </div>
                    <span className={`text-[10px] font-mono pl-5 truncate ${
                      activeTab === tab.id ? 'text-emerald-100/80' : 'text-slate-400 dark:text-emerald-300/50'
                    }`}>
                      {tab.sectionName}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {isTabDisabled && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-rose-500/20 text-rose-500 font-mono">
                        OFF
                      </span>
                    )}
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold ${
                        activeTab === tab.id
                          ? 'bg-white/20 text-white'
                          : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      {tab.widgetCode}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Right Pane: Dynamic Form for the active section */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* Action Sub-header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-emerald-500/15">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="chip text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30">
                    Tata Letak: {activeTabMeta.sectionName}
                  </span>
                  <span className="chip text-[10px] font-mono font-bold bg-teal-500/20 text-teal-800 dark:text-teal-200 border-teal-500/30">
                    Widget: {activeTabMeta.widgetCode}
                  </span>
                </div>
                <h4 className="font-display text-lg font-extrabold text-emerald-950 dark:text-white">
                  {activeTabMeta.widgetTitle || activeTabMeta.name}
                </h4>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyBloggerCode}
                  className="rounded-xl border border-emerald-500/40 bg-emerald-600 text-white hover:bg-emerald-700 px-3.5 py-1.5 text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                  title={`Salin konfigurasi khusus widget ${activeTabMeta.widgetCode}`}
                >
                  <span>{copiedNotification ? '✔ Tersalin!' : `📋 Salin Kode ${activeTabMeta.widgetCode}`}</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetSection}
                  className="rounded-xl border border-rose-500/30 px-3 py-1.5 text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition"
                >
                  Reset Default
                </button>
              </div>
            </div>

            {/* Notification Toast jika kode disalin */}
            {copiedNotification && (
              <div className="rounded-xl bg-emerald-600 text-white px-4 py-2.5 text-xs font-semibold flex items-center justify-between shadow-lg animate-fade-up">
                <span>📋 Kode format konfigurasi berhasil disalin ke clipboard! Siap ditempel di widget {activeTabMeta.widgetCode} Blogger.</span>
                <span>✓</span>
              </div>
            )}

            {/* Status Section: Aktif / Nonaktif (Disable Content) */}
            {(() => {
              const isCurrentDisabled = isSectionDisabled(activeConfig)
              return (
                <div className="space-y-3">
                  <div
                    className={`rounded-2xl p-4 transition-all border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isCurrentDisabled
                        ? 'bg-rose-500/10 border-rose-500/30 dark:bg-rose-950/25'
                        : 'bg-emerald-500/10 border-emerald-500/30 dark:bg-emerald-950/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`grid h-9 w-9 place-items-center rounded-xl text-lg ${
                          isCurrentDisabled ? 'bg-rose-500/20 text-rose-500' : 'bg-emerald-500/20 text-emerald-500'
                        }`}
                      >
                        {isCurrentDisabled ? '🚫' : '👁️'}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-display font-bold text-sm text-emerald-950 dark:text-white">
                            Status Tampilan Section
                          </p>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                              isCurrentDisabled
                                ? 'bg-rose-500 text-white shadow-sm'
                                : 'bg-emerald-600 text-white shadow-sm'
                            }`}
                          >
                            {isCurrentDisabled ? 'Dinonaktifkan (Sembunyi)' : 'Aktif (Tampil)'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-emerald-200/60 mt-0.5">
                          {isCurrentDisabled
                            ? 'Section ini disembunyikan dan tidak akan muncul di halaman landing page website.'
                            : 'Section ini aktif dan ditampilkan secara normal di halaman landing page.'}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleDisable(activeTab)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm shrink-0 ${
                        isCurrentDisabled
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30'
                          : 'bg-white dark:bg-ink-900 border border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30'
                      }`}
                    >
                      <span>{isCurrentDisabled ? '✔ Aktifkan Kembali' : '🚫 Nonaktifkan / Sembunyikan Section'}</span>
                    </button>
                  </div>

                  {isCurrentDisabled && (
                    <div className="rounded-xl p-3 bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex items-center gap-2.5">
                      <span className="text-base shrink-0">⚠️</span>
                      <span>
                        <strong>Section Dinonaktifkan:</strong> Konten di bawah tetap tersimpan, namun tidak akan dimunculkan kepada pengunjung di landing page sampai Anda mengaktifkannya kembali.
                      </span>
                    </div>
                  )}
                </div>
              )
            })()}

            {/* SECTION 0A: KODE LISENSI TEMPLATE & SISTEM (HTML99) */}
            {activeTab === 'config' && (
              <div className="space-y-4">
                <div className="rounded-2xl p-4 bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-950 dark:text-emerald-200">
                  🔑 <strong>Konfigurasi Lisensi Blogger:</strong> Widget ini memvalidasi lisensi resmi tema Pesonaku dan status aktivasi sistem.
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextInput
                    label="Kode Lisensi Template"
                    value={activeConfig.license_key}
                    onChange={(val) => handleFieldChange('config', 'license_key', val)}
                    placeholder="PESONA-PREMIUM-2026-ACTIVE"
                  />
                  <TextInput
                    label="Status Lisensi"
                    value={activeConfig.status}
                    onChange={(val) => handleFieldChange('config', 'status', val)}
                    placeholder="verified"
                  />
                </div>
                <TextInput
                  label="Versi Tema"
                  value={activeConfig.theme_version}
                  onChange={(val) => handleFieldChange('config', 'theme_version', val)}
                  placeholder="2.5.0"
                />
              </div>
            )}

            {/* SECTION 0B: LOGO & MENU HEADER (HTML10) */}
            {activeTab === 'header' && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FileUploadField
                    label="Upload File Logo Brand (Gambar Transparan / PNG / SVG)"
                    value={activeConfig.logo_image}
                    onChange={(val) => handleFieldChange('header', 'logo_image', val)}
                    helpText="Unggah logo perumahan Anda. Jika tidak diunggah, akan memakai ikon & teks brand."
                  />
                  <div className="space-y-3 p-4 rounded-2xl glass border border-emerald-500/15">
                    <TextInput
                      label="Icon Logo (Jika Tanpa Gambar)"
                      value={activeConfig.logo_icon}
                      onChange={(val) => handleFieldChange('header', 'logo_icon', val)}
                      placeholder="🏡"
                    />
                    <TextInput
                      label="Nama Brand / Perumahan"
                      value={activeConfig.brand_name}
                      onChange={(val) => handleFieldChange('header', 'brand_name', val)}
                      placeholder="Pesona Kahuripan"
                    />
                    <TextInput
                      label="Tagline Brand"
                      value={activeConfig.brand_tagline}
                      onChange={(val) => handleFieldChange('header', 'brand_tagline', val)}
                      placeholder="Residence & Cluster Modern"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <TextInput
                    label="Teks Tombol CTA Header"
                    value={activeConfig.header_cta_text}
                    onChange={(val) => handleFieldChange('header', 'header_cta_text', val)}
                    placeholder="📅 Survey Lokasi"
                  />
                  <TextInput
                    label="Link Tujuan Tombol CTA Header"
                    value={activeConfig.header_cta_url}
                    onChange={(val) => handleFieldChange('header', 'header_cta_url', val)}
                    placeholder="#lead-form"
                  />
                </div>

                <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 pt-2">
                  Menu Navigasi Kustom (1 sampai 5) — Biarkan kosong untuk menggunakan menu default:
                </h5>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="p-3 rounded-2xl glass border border-emerald-500/15 grid grid-cols-2 gap-2">
                      <TextInput
                        label={`Nama Menu ${num}`}
                        value={activeConfig[`nav${num}_label`]}
                        onChange={(val) => handleFieldChange('header', `nav${num}_label`, val)}
                        placeholder={num === 1 ? 'Keunggulan' : num === 2 ? 'Lokasi' : num === 3 ? 'Tipe Unit' : 'Menu'}
                      />
                      <TextInput
                        label={`Link URL ${num}`}
                        value={activeConfig[`nav${num}_url`]}
                        onChange={(val) => handleFieldChange('header', `nav${num}_url`, val)}
                        placeholder={num === 1 ? '#keunggulan' : num === 2 ? '#lokasi' : num === 3 ? '#tipe-unit' : '#'}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 1A: HERO BANNER UTAMA - HEADLINE & TOMBOL (HTML1) */}
            {activeTab === 'hero' && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <TextInput
                    label="Badge Cluster Tahap"
                    value={activeConfig.badge}
                    onChange={(val) => handleFieldChange('hero', 'badge', val)}
                    placeholder="Cluster Baru Rilis Tahap 3"
                  />
                  <TextInput
                    label="Badge Promo DP"
                    value={activeConfig.badge_promo}
                    onChange={(val) => handleFieldChange('hero', 'badge_promo', val)}
                    placeholder="✦ Promo DP 0% & Subsidi Suku Bunga KPR"
                  />
                  <TextInput
                    label="Badge Legalitas SHM"
                    value={activeConfig.badge_shm}
                    onChange={(val) => handleFieldChange('hero', 'badge_shm', val)}
                    placeholder="★ Legalitas 100% Sertifikat SHM Pecah"
                  />
                </div>

                <TextInput
                  label="Headline Utama (Judul Besar)"
                  value={activeConfig.headline}
                  onChange={(val) => handleFieldChange('hero', 'headline', val)}
                  placeholder="Wujudkan Rumah Impian Masa Depan Keluarga Anda di Pesona Kahuripan"
                />

                <TextAreaInput
                  label="Subheadline / Deskripsi Ringkas"
                  value={activeConfig.subheadline}
                  onChange={(val) => handleFieldChange('hero', 'subheadline', val)}
                  placeholder="Hunian bernuansa asri berkonsep modern minimalis di lokasi sangat strategis. Nikmati kemudahan DP 0%..."
                  rows={2}
                />

                <div className="grid gap-4 sm:grid-cols-3">
                  <TextInput
                    label="Tombol Survey CTA"
                    value={activeConfig.cta_survey}
                    onChange={(val) => handleFieldChange('hero', 'cta_survey', val)}
                    placeholder="📅 Jadwalkan Survey Lokasi"
                  />
                  <TextInput
                    label="Tombol Brosur CTA"
                    value={activeConfig.cta_brosur}
                    onChange={(val) => handleFieldChange('hero', 'cta_brosur', val)}
                    placeholder="📥 Unduh Brosur & Pricelist"
                  />
                  <TextInput
                    label="Tombol Chat WhatsApp"
                    value={activeConfig.cta_wa}
                    onChange={(val) => handleFieldChange('hero', 'cta_wa', val)}
                    placeholder="💬 Chat Sales via WhatsApp"
                  />
                </div>

                <TextInput
                  label="Nomor WhatsApp Hotline (Format 628...)"
                  value={activeConfig.whatsapp}
                  onChange={(val) => handleFieldChange('hero', 'whatsapp', val)}
                  placeholder="6281288997711"
                />
              </div>
            )}

            {/* SECTION 1B: HERO MEDIA, VIDEO & TOUR 360 (HTML12) */}
            {activeTab === 'hero-media' && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FileUploadField
                    label="Foto Hero Kawasan (Upload / Link)"
                    value={activeConfig.hero_image}
                    onChange={(val) => handleFieldChange('hero-media', 'hero_image', val)}
                    helpText="Foto lanskap perumahan cluster tampak depan resolusi tinggi."
                  />
                  <FileUploadField
                    label="Video Kawasan / YouTube Embed"
                    value={activeConfig.video_url}
                    onChange={(val) => handleFieldChange('hero-media', 'video_url', val)}
                    isVideo={true}
                    accept="video/*"
                    helpText="Bisa paste link YouTube atau upload file MP4."
                  />
                </div>

                <TextInput
                  label="Link Tur Virtual 360° (Kuula / Matterport)"
                  value={activeConfig.virtual_tour_url}
                  onChange={(val) => handleFieldChange('hero-media', 'virtual_tour_url', val)}
                  placeholder="https://kuula.co/share/... atau https://my.matterport.com/show/..."
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <TextInput
                    label="Pill Tag 1"
                    value={activeConfig.pill1}
                    onChange={(val) => handleFieldChange('hero-media', 'pill1', val)}
                    placeholder="Ready Stock Tahap 3"
                  />
                  <TextInput
                    label="Pill Tag 2"
                    value={activeConfig.pill2}
                    onChange={(val) => handleFieldChange('hero-media', 'pill2', val)}
                    placeholder="Bebas Banjir 100%"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <TextInput
                    label="Judul Kartu Overlay Foto"
                    value={activeConfig.card_title}
                    onChange={(val) => handleFieldChange('hero-media', 'card_title', val)}
                    placeholder="Suasana Asri & Udara Sejuk Khas Perbukitan"
                  />
                  <TextInput
                    label="Deskripsi Kartu Overlay Foto"
                    value={activeConfig.card_desc}
                    onChange={(val) => handleFieldChange('hero-media', 'card_desc', val)}
                    placeholder="Konsep hunian hijau dengan row jalan lebar dan taman bermain..."
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <TextInput
                    label="Label Tombol Tur Virtual"
                    value={activeConfig.cta_tour}
                    onChange={(val) => handleFieldChange('hero-media', 'cta_tour', val)}
                    placeholder="🔄 Virtual Tour 360°"
                  />
                  <TextInput
                    label="Label Tombol Video Kawasan"
                    value={activeConfig.cta_video}
                    onChange={(val) => handleFieldChange('hero-media', 'cta_video', val)}
                    placeholder="▶ Putar Video Kawasan"
                  />
                </div>
              </div>
            )}

            {/* SECTION 2: QUICK STATS */}
            {activeTab === 'stats' && (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num} className="p-4 rounded-2xl glass border border-emerald-500/15 grid gap-3 sm:grid-cols-3 items-center">
                    <TextInput
                      label={`Angka Stat ${num}`}
                      value={activeConfig[`stat${num}_num`]}
                      onChange={(val) => handleFieldChange('stats', `stat${num}_num`, val)}
                      placeholder={num === 1 ? '1.250+' : num === 2 ? '100%' : '0 Rupiah'}
                    />
                    <TextInput
                      label={`Label Stat ${num}`}
                      value={activeConfig[`stat${num}_label`]}
                      onChange={(val) => handleFieldChange('stats', `stat${num}_label`, val)}
                      placeholder="Unit Terhuni & Serah Terima"
                    />
                    <TextInput
                      label={`Deskripsi Singkat ${num}`}
                      value={activeConfig[`stat${num}_desc`]}
                      onChange={(val) => handleFieldChange('stats', `stat${num}_desc`, val)}
                      placeholder="Komunitas warga sudah ramai"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* SECTION 3: KEUNGGULAN USP */}
            {activeTab === 'usp' && (
              <div className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextInput
                    label="Badge Header Section"
                    value={activeConfig.badge}
                    onChange={(val) => handleFieldChange('usp', 'badge', val)}
                    placeholder="Keunggulan Eksklusif"
                  />
                  <TextInput
                    label="Judul Section"
                    value={activeConfig.title}
                    onChange={(val) => handleFieldChange('usp', 'title', val)}
                    placeholder="Mengapa Pesona Kahuripan Pilihan Tepat?"
                  />
                </div>

                <TextAreaInput
                  label="Deskripsi Pengantar Section"
                  value={activeConfig.desc}
                  onChange={(val) => handleFieldChange('usp', 'desc', val)}
                  placeholder="Lebih dari sekadar bangunan, kami menghadirkan ekosistem..."
                  rows={2}
                />

                <div className="space-y-3 pt-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                    6 Item Keunggulan &amp; Fasilitas:
                  </h5>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <div key={num} className="p-4 rounded-2xl glass border border-emerald-500/15 grid gap-3 sm:grid-cols-12 items-center">
                      <div className="sm:col-span-1">
                        <TextInput
                          label="Icon"
                          value={activeConfig[`usp${num}_icon`]}
                          onChange={(val) => handleFieldChange('usp', `usp${num}_icon`, val)}
                          placeholder="🛡️"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <TextInput
                          label="Badge Pill"
                          value={activeConfig[`usp${num}_badge`]}
                          onChange={(val) => handleFieldChange('usp', `usp${num}_badge`, val)}
                          placeholder="Legalitas Pasti"
                        />
                      </div>
                      <div className="sm:col-span-4">
                        <TextInput
                          label="Judul Keunggulan"
                          value={activeConfig[`usp${num}_title`]}
                          onChange={(val) => handleFieldChange('usp', `usp${num}_title`, val)}
                          placeholder="Legalitas SHM 100% Aman"
                        />
                      </div>
                      <div className="sm:col-span-4">
                        <TextInput
                          label="Deskripsi Keunggulan"
                          value={activeConfig[`usp${num}_desc`]}
                          onChange={(val) => handleFieldChange('usp', `usp${num}_desc`, val)}
                          placeholder="Sertifikat sudah pecah per kaveling..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 4: LOKASI & MAPS */}
            {activeTab === 'location' && (
              <div className="space-y-6">
                {/* 1. Header Section & Alamat */}
                <div className="rounded-2xl p-4 bg-slate-50/50 dark:bg-ink-900/50 border border-emerald-500/15 space-y-4">
                  <h4 className="font-display text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                    Informasi Header &amp; Alamat
                  </h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <TextInput
                      label="Badge Section"
                      value={activeConfig.badge}
                      onChange={(val) => handleFieldChange('location', 'badge', val)}
                      placeholder="Location Advantage"
                    />
                    <TextInput
                      label="Judul Section"
                      value={activeConfig.title}
                      onChange={(val) => handleFieldChange('location', 'title', val)}
                      placeholder="Aksesibilitas Tanpa Batas di Titik Paling Strategis"
                    />
                  </div>

                  <TextAreaInput
                    label="Deskripsi / Sub-headline Lokasi"
                    value={activeConfig.desc}
                    onChange={(val) => handleFieldChange('location', 'desc', val)}
                    placeholder="Dekat dengan simpul gerbang tol, stasiun KRL, sentra niaga..."
                    rows={2}
                  />

                  <div className="grid gap-4 sm:grid-cols-3">
                    <TextInput
                      label="Label Alamat"
                      value={activeConfig.address_label}
                      onChange={(val) => handleFieldChange('location', 'address_label', val)}
                      placeholder="Alamat Kantor Pemasaran & Lokasi:"
                    />
                    <div className="sm:col-span-2">
                      <TextInput
                        label="Alamat Lengkap"
                        value={activeConfig.address}
                        onChange={(val) => handleFieldChange('location', 'address', val)}
                        placeholder="Jl. Raya Pesona Asri No. 88, Cileungsi - Klapanunggal, Bogor Timur"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Peta & Masterplan */}
                <div className="rounded-2xl p-4 bg-slate-50/50 dark:bg-ink-900/50 border border-emerald-500/15 space-y-4">
                  <h4 className="font-display text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                    Peta Google Maps &amp; Siteplan
                  </h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <TextInput
                      label="Link Google Maps Langsung (Navigasi)"
                      value={activeConfig.gmaps_url}
                      onChange={(val) => handleFieldChange('location', 'gmaps_url', val)}
                      placeholder="https://maps.google.com/?q=..."
                    />
                    <TextInput
                      label="Link Iframe Embed Google Maps"
                      value={activeConfig.gmaps_embed}
                      onChange={(val) => handleFieldChange('location', 'gmaps_embed', val)}
                      placeholder="https://www.google.com/maps/embed?pb=..."
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FileUploadField
                      label="Foto Masterplan / Siteplan Kawasan (Upload / Link)"
                      value={activeConfig.siteplan_image}
                      onChange={(val) => handleFieldChange('location', 'siteplan_image', val)}
                      helpText="Unggah gambar denah kaveling blok kawasan perumahan."
                    />
                    <TextInput
                      label="Badge / Keterangan Siteplan"
                      value={activeConfig.siteplan_badge}
                      onChange={(val) => handleFieldChange('location', 'siteplan_badge', val)}
                      placeholder="🗺️ Masterplan & Siteplan Kawasan"
                    />
                  </div>
                </div>

                {/* 3. Kategori Akses & Poin Lokasi */}
                <div className="rounded-2xl p-4 bg-slate-50/50 dark:bg-ink-900/50 border border-emerald-500/15 space-y-4">
                  <div className="border-b border-emerald-500/15 pb-3">
                    <h4 className="font-display text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                      Edit Kategori Akses &amp; Poin Lokasi
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-emerald-200/60 mt-0.5">
                      Pilih kategori di bawah untuk mengatur label nama tab serta daftar tempat penting dan waktu tempuh.
                    </p>
                  </div>

                  {/* Sub-tabs Kategori Lokasi */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { key: 'trans', name: 'Transportasi & Tol', icon: '🚆', tabKey: 'tab_trans', defaultLabel: '🚆 Transportasi & Tol', prefix: 'trans' },
                      { key: 'edu', name: 'Sekolah & Kampus', icon: '🎓', tabKey: 'tab_edu', defaultLabel: '🎓 Sekolah & Kampus', prefix: 'edu' },
                      { key: 'health', name: 'Rumah Sakit & Medis', icon: '🏥', tabKey: 'tab_health', defaultLabel: '🏥 Rumah Sakit & Medis', prefix: 'health' },
                      { key: 'mall', name: 'Mall & Rekreasi', icon: '🛍️', tabKey: 'tab_mall', defaultLabel: '🛍️ Mall & Rekreasi', prefix: 'mall' },
                    ].map((cat) => (
                      <button
                        key={cat.key}
                        type="button"
                        onClick={() => setSelectedLocationSubTab(cat.key)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                          selectedLocationSubTab === cat.key
                            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/25'
                            : 'glass text-slate-700 dark:text-emerald-200 hover:text-emerald-950 dark:hover:text-white'
                        }`}
                      >
                        <span>{cat.icon}</span>
                        <span className="truncate">{activeConfig[cat.tabKey] || cat.name}</span>
                      </button>
                    ))}
                  </div>

                  {/* Form Detail Kategori Aktif */}
                  {(() => {
                    const categoriesMap = {
                      trans: {
                        key: 'trans',
                        tabKey: 'tab_trans',
                        label: 'Nama Tab Kategori Transportasi',
                        defaultTabName: '🚆 Transportasi & Tol',
                        prefix: 'trans',
                        defaultPoints: [
                          { title: 'Gerbang Tol Jagorawi / Tol Nagrak JORR 2', time: '10 Menit', note: 'Akses cepat ke Jakarta, TB Simatupang & BSD' },
                          { title: 'Stasiun KRL Nambo & Cibinong', time: '15 Menit', note: 'Terhubung langsung jaringan Commuter Line Jabodetabek' },
                          { title: 'Terminal Transjabodetabek Cileungsi', time: '8 Menit', note: 'Bus AC rute Blok M, Grogol, Senayan & Tanjung Priok' },
                          { title: 'Stasiun LRT Harjamukti Cibubur', time: '20 Menit', note: 'Moda transportasi modern langsung ke pusat bisnis Jakarta' },
                        ],
                      },
                      edu: {
                        key: 'edu',
                        tabKey: 'tab_edu',
                        label: 'Nama Tab Kategori Pendidikan',
                        defaultTabName: '🎓 Sekolah & Kampus',
                        prefix: 'edu',
                        defaultPoints: [
                          { title: 'Sekolah Islam Terpadu & TK/SD/SMP Al-Azhar', time: '5 Menit', note: 'Pendidikan karakter unggulan dekat rumah' },
                          { title: 'SMAN 1 & SMKN Unggulan Negeri', time: '8 Menit', note: 'Sekolah negeri terakreditasi A' },
                          { title: 'Sekolah Kristen Penabur & Regina Caeli', time: '12 Menit', note: 'Fasilitas sekolah internasional & nasional plus' },
                          { title: 'Kampus & Politeknik Terkemuka', time: '20 Menit', note: 'Pusat riset dan pendidikan tinggi' },
                        ],
                      },
                      health: {
                        key: 'health',
                        tabKey: 'tab_health',
                        label: 'Nama Tab Kategori Kesehatan',
                        defaultTabName: '🏥 Rumah Sakit & Medis',
                        prefix: 'health',
                        defaultPoints: [
                          { title: 'RS Hermina Mekarsari', time: '7 Menit', note: 'RS rujukan utama dengan fasilitas IGD 24 Jam' },
                          { title: 'RSUD Cileungsi', time: '9 Menit', note: 'Fasilitas kesehatan lengkap melayani BPJS & asuransi' },
                          { title: 'RS Mitra Keluarga Cibubur', time: '15 Menit', note: 'Pusat spesialis dan perawatan modern' },
                          { title: 'Klinik Pratama & Apotek 24 Jam', time: '2 Menit', note: 'Tersedia tepat di gerbang perumahan' },
                        ],
                      },
                      mall: {
                        key: 'mall',
                        tabKey: 'tab_mall',
                        label: 'Nama Tab Kategori Belanja & Rekreasi',
                        defaultTabName: '🛍️ Mall & Rekreasi',
                        prefix: 'mall',
                        defaultPoints: [
                          { title: 'Metropolitan Mall Cibubur', time: '10 Menit', note: 'Bioskop XXI, Uniqlo, Matahari, & Gramedia' },
                          { title: 'Pasar Tradisional Modern Cileungsi', time: '6 Menit', note: 'Bahan pangan segar setiap hari dengan harga bersahabat' },
                          { title: 'Taman Wisata Mekarsari & Waterpark', time: '8 Menit', note: 'Wahana rekreasi hijau dan wisata keluarga akhir pekan' },
                          { title: 'Superindo, Indomaret Fresh, & Alfamidi', time: '3 Menit', note: 'Kebutuhan harian rumah tangga super praktis' },
                        ],
                      },
                    }

                    const cur = categoriesMap[selectedLocationSubTab] || categoriesMap.trans

                    return (
                      <div className="space-y-4 pt-2">
                        <TextInput
                          label={cur.label}
                          value={activeConfig[cur.tabKey]}
                          onChange={(val) => handleFieldChange('location', cur.tabKey, val)}
                          placeholder={cur.defaultTabName}
                        />

                        <div className="space-y-3">
                          <p className="text-[11px] font-bold text-slate-700 dark:text-emerald-300 uppercase tracking-wider">
                            Daftar Poin Akses Lokasi ({cur.defaultTabName}):
                          </p>

                          {[1, 2, 3, 4].map((idx) => {
                            const def = cur.defaultPoints[idx - 1] || {}
                            const titleKey = `${cur.prefix}${idx}_title`
                            const timeKey = `${cur.prefix}${idx}_time`
                            const noteKey = `${cur.prefix}${idx}_note`

                            return (
                              <div
                                key={idx}
                                className="rounded-xl p-3.5 bg-white/70 dark:bg-ink-950/70 border border-emerald-500/20 space-y-3"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="chip text-[10px] border-emerald-400/30 text-emerald-700 dark:text-emerald-300 font-bold">
                                    Poin #{idx}
                                  </span>
                                </div>
                                <div className="grid gap-3 sm:grid-cols-3">
                                  <div className="sm:col-span-2">
                                    <TextInput
                                      label={`Nama Tempat / Fasilitas #${idx}`}
                                      value={activeConfig[titleKey]}
                                      onChange={(val) => handleFieldChange('location', titleKey, val)}
                                      placeholder={def.title}
                                    />
                                  </div>
                                  <div>
                                    <TextInput
                                      label="Waktu Tempuh"
                                      value={activeConfig[timeKey]}
                                      onChange={(val) => handleFieldChange('location', timeKey, val)}
                                      placeholder={def.time}
                                    />
                                  </div>
                                </div>
                                <TextInput
                                  label="Catatan / Rute Akses"
                                  value={activeConfig[noteKey]}
                                  onChange={(val) => handleFieldChange('location', noteKey, val)}
                                  placeholder={def.note}
                                />
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })()}
                </div>
              </div>
            )}

            {/* SECTION 5: TIPE UNIT & SPESIFIKASI */}
            {activeTab === 'units' && (
              <div className="space-y-5">
                <div className="flex items-center gap-2 border-b border-emerald-500/15 pb-3">
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setSelectedUnitSubTab(num)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                        selectedUnitSubTab === num
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'glass text-slate-700 dark:text-emerald-200 hover:text-white'
                      }`}
                    >
                      Tipe {num} ({activeConfig[`unit${num}_name`] || `Unit ${num}`})
                    </button>
                  ))}
                </div>

                {(() => {
                  const n = selectedUnitSubTab
                  return (
                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-3">
                        <TextInput
                          label={`Nama Unit ${n}`}
                          value={activeConfig[`unit${n}_name`]}
                          onChange={(val) => handleFieldChange('units', `unit${n}_name`, val)}
                          placeholder="Tipe Melati"
                        />
                        <TextInput
                          label="Kode Tipe (LB/LT)"
                          value={activeConfig[`unit${n}_code`]}
                          onChange={(val) => handleFieldChange('units', `unit${n}_code`, val)}
                          placeholder="30/60"
                        />
                        <TextInput
                          label="Badge Sorotan"
                          value={activeConfig[`unit${n}_badge`]}
                          onChange={(val) => handleFieldChange('units', `unit${n}_badge`, val)}
                          placeholder="Best Seller DP 0%"
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <FileUploadField
                          label={`Foto Tampak Depan Tipe ${n} (Upload / Link)`}
                          value={activeConfig[`unit${n}_image`]}
                          onChange={(val) => handleFieldChange('units', `unit${n}_image`, val)}
                        />
                        <FileUploadField
                          label={`Foto Denah Ruangan Tipe ${n} (Upload / Link)`}
                          value={activeConfig[`unit${n}_floorplan`]}
                          onChange={(val) => handleFieldChange('units', `unit${n}_floorplan`, val)}
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-4">
                        <TextInput
                          label="Estimasi Harga"
                          value={activeConfig[`unit${n}_price`]}
                          onChange={(val) => handleFieldChange('units', `unit${n}_price`, val)}
                          placeholder="Mulai Rp 280 Jutaan"
                        />
                        <TextInput
                          label="Estimasi Cicilan KPR"
                          value={activeConfig[`unit${n}_cicilan`]}
                          onChange={(val) => handleFieldChange('units', `unit${n}_cicilan`, val)}
                          placeholder="Rp 1,9 Jt / bln"
                        />
                        <TextInput
                          label="Luas Bangunan (m²)"
                          value={activeConfig[`unit${n}_lb`]}
                          onChange={(val) => handleFieldChange('units', `unit${n}_lb`, val)}
                          placeholder="30"
                        />
                        <TextInput
                          label="Luas Tanah (m²)"
                          value={activeConfig[`unit${n}_lt`]}
                          onChange={(val) => handleFieldChange('units', `unit${n}_lt`, val)}
                          placeholder="60"
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-3">
                        <TextInput
                          label="Jumlah Kamar Tidur (KT)"
                          value={activeConfig[`unit${n}_kt`]}
                          onChange={(val) => handleFieldChange('units', `unit${n}_kt`, val)}
                          placeholder="2"
                        />
                        <TextInput
                          label="Jumlah Kamar Mandi (KM)"
                          value={activeConfig[`unit${n}_km`]}
                          onChange={(val) => handleFieldChange('units', `unit${n}_km`, val)}
                          placeholder="1"
                        />
                        <TextInput
                          label="Dimensi Kaveling"
                          value={activeConfig[`unit${n}_dimensi`]}
                          onChange={(val) => handleFieldChange('units', `unit${n}_dimensi`, val)}
                          placeholder="6 x 10 Meter"
                        />
                      </div>

                      <TextAreaInput
                        label="Deskripsi Unit"
                        value={activeConfig[`unit${n}_desc`]}
                        onChange={(val) => handleFieldChange('units', `unit${n}_desc`, val)}
                        placeholder="Rumah tapak fungsional 2 kamar tidur..."
                        rows={2}
                      />

                      <h6 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 pt-2">
                        Spesifikasi Material Bangunan:
                      </h6>
                      <div className="grid gap-3 sm:grid-cols-3 text-xs">
                        <TextInput
                          label="Pondasi"
                          value={activeConfig[`unit${n}_pondasi`]}
                          onChange={(val) => handleFieldChange('units', `unit${n}_pondasi`, val)}
                          placeholder="Batu kali + sloof beton"
                        />
                        <TextInput
                          label="Dinding"
                          value={activeConfig[`unit${n}_dinding`]}
                          onChange={(val) => handleFieldChange('units', `unit${n}_dinding`, val)}
                          placeholder="Bata ringan hebel aci"
                        />
                        <TextInput
                          label="Lantai"
                          value={activeConfig[`unit${n}_lantai`]}
                          onChange={(val) => handleFieldChange('units', `unit${n}_lantai`, val)}
                          placeholder="Granit tile 60x60"
                        />
                        <TextInput
                          label="Rangka & Atap"
                          value={activeConfig[`unit${n}_atap`]}
                          onChange={(val) => handleFieldChange('units', `unit${n}_atap`, val)}
                          placeholder="Baja ringan, genteng beton"
                        />
                        <TextInput
                          label="Kusen"
                          value={activeConfig[`unit${n}_kusen`]}
                          onChange={(val) => handleFieldChange('units', `unit${n}_kusen`, val)}
                          placeholder="Aluminium powder coating"
                        />
                        <TextInput
                          label="Sanitair"
                          value={activeConfig[`unit${n}_sanitair`]}
                          onChange={(val) => handleFieldChange('units', `unit${n}_sanitair`, val)}
                          placeholder="Kloset duduk + shower"
                        />
                      </div>
                    </div>
                  )
                })()}
              </div>
            )}

            {/* SECTION 6: GALERI & TUR 360 */}
            {activeTab === 'gallery' && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextInput
                    label="Link Virtual Tour 360° (Matterport / Kuula / Web)"
                    value={activeConfig.virtual_tour_url}
                    onChange={(val) => handleFieldChange('gallery', 'virtual_tour_url', val)}
                    placeholder="https://..."
                  />
                  <FileUploadField
                    label="Video Walkthrough / Drone Kawasan"
                    value={activeConfig.video_url}
                    onChange={(val) => handleFieldChange('gallery', 'video_url', val)}
                    isVideo={true}
                    accept="video/*"
                  />
                </div>

                <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 pt-2">
                  Foto Galeri Ruangan (1 sampai 6):
                </h5>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <div key={num} className="p-3 rounded-2xl glass border border-emerald-500/15 space-y-2">
                      <FileUploadField
                        label={`Foto Galeri ${num}`}
                        value={activeConfig[`gallery_image_${num}`]}
                        onChange={(val) => handleFieldChange('gallery', `gallery_image_${num}`, val)}
                      />
                      <TextInput
                        label="Judul Foto"
                        value={activeConfig[`gallery_title_${num}`]}
                        onChange={(val) => handleFieldChange('gallery', `gallery_title_${num}`, val)}
                        placeholder="Ruang Tamu High Ceiling"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 7: PROMO SPESIAL */}
            {activeTab === 'promo' && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <TextInput
                    label="Durasi Mundur (Hari)"
                    value={activeConfig.timer_days}
                    onChange={(val) => handleFieldChange('promo', 'timer_days', val)}
                    placeholder="4"
                    type="number"
                  />
                  <TextInput
                    label="Durasi Mundur (Jam)"
                    value={activeConfig.timer_hours}
                    onChange={(val) => handleFieldChange('promo', 'timer_hours', val)}
                    placeholder="18"
                    type="number"
                  />
                  <TextInput
                    label="Badge Promo"
                    value={activeConfig.badge}
                    onChange={(val) => handleFieldChange('promo', 'badge', val)}
                    placeholder="⚡ Promo Terbatas Bulan Ini"
                  />
                </div>

                <FileUploadField
                  label="Foto Poster / Flyer Promo (Upload / Link)"
                  value={activeConfig.promo_image}
                  onChange={(val) => handleFieldChange('promo', 'promo_image', val)}
                  helpText="Banner visual promo DP 0% atau subsidi biaya KPR."
                />

                <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 pt-2">
                  3 Paket Voucher Promo:
                </h5>
                {[1, 2, 3].map((num) => (
                  <div key={num} className="p-4 rounded-2xl glass border border-emerald-500/15 grid gap-3 sm:grid-cols-3">
                    <TextInput
                      label={`Judul Voucher ${num}`}
                      value={activeConfig[`offer${num}_title`]}
                      onChange={(val) => handleFieldChange('promo', `offer${num}_title`, val)}
                      placeholder="Bebas Semua Biaya KPR & Notaris"
                    />
                    <TextInput
                      label={`Highlight Diskon ${num}`}
                      value={activeConfig[`offer${num}_highlight`]}
                      onChange={(val) => handleFieldChange('promo', `offer${num}_highlight`, val)}
                      placeholder="Subsidi BPHTB & AJB 100%"
                    />
                    <TextInput
                      label={`Badge Voucher ${num}`}
                      value={activeConfig[`offer${num}_badge`]}
                      onChange={(val) => handleFieldChange('promo', `offer${num}_badge`, val)}
                      placeholder="Hemat Rp 35 Jt"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* SECTION 8: TESTIMONI & BAST */}
            {activeTab === 'social-proof' && (
              <div className="space-y-4">
                <FileUploadField
                  label="Foto Serah Terima Kunci (BAST) Konsumen"
                  value={activeConfig.handover_image}
                  onChange={(val) => handleFieldChange('social-proof', 'handover_image', val)}
                  helpText="Foto dokumentasi serah terima kunci fisik konsumen bahagia."
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <TextInput
                    label="Judul Banner BAST"
                    value={activeConfig.bast_title}
                    onChange={(val) => handleFieldChange('social-proof', 'bast_title', val)}
                    placeholder="Momen Serah Terima Unit Rumah Kepada Konsumen"
                  />
                  <TextInput
                    label="Skor Kepuasan Konsumen"
                    value={activeConfig.bast_score}
                    onChange={(val) => handleFieldChange('social-proof', 'bast_score', val)}
                    placeholder="4.9 / 5.0"
                  />
                </div>

                <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 pt-2">
                  Testimoni Konsumen (1 sampai 3):
                </h5>
                {[1, 2, 3].map((num) => (
                  <div key={num} className="p-4 rounded-2xl glass border border-emerald-500/15 space-y-3">
                    <div className="grid gap-3 sm:grid-cols-3">
                      <TextInput
                        label={`Nama Konsumen ${num}`}
                        value={activeConfig[`testi${num}_name`]}
                        onChange={(val) => handleFieldChange('social-proof', `testi${num}_name`, val)}
                        placeholder="Bpk Dimas & Ibu Rini"
                      />
                      <TextInput
                        label="Pekerjaan / Peran"
                        value={activeConfig[`testi${num}_role`]}
                        onChange={(val) => handleFieldChange('social-proof', `testi${num}_role`, val)}
                        placeholder="Karyawan BUMN"
                      />
                      <TextInput
                        label="Tipe Unit Dibeli"
                        value={activeConfig[`testi${num}_unit`]}
                        onChange={(val) => handleFieldChange('social-proof', `testi${num}_unit`, val)}
                        placeholder="Tipe Flamboyan 36/72"
                      />
                    </div>
                    <FileUploadField
                      label={`Foto Avatar Konsumen ${num}`}
                      value={activeConfig[`testi${num}_avatar`]}
                      onChange={(val) => handleFieldChange('social-proof', `testi${num}_avatar`, val)}
                    />
                    <TextAreaInput
                      label="Cerita Testimoni"
                      value={activeConfig[`testi${num}_text`]}
                      onChange={(val) => handleFieldChange('social-proof', `testi${num}_text`, val)}
                      placeholder="Proses KPR cepat dan DP 0% nyata tanpa tipu-tipu..."
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* SECTION 9: FORM SURVEY LEAD */}
            {activeTab === 'lead-form' && (
              <div className="space-y-4">
                {/* Section Badge & Headings */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextInput
                    label="Badge / Label Kecil Section"
                    value={activeConfig.badge}
                    onChange={(val) => handleFieldChange('lead-form', 'badge', val)}
                    placeholder="Jadwal Survey & Konsultasi Langsung"
                  />
                  <TextInput
                    label="Judul Utama Section"
                    value={activeConfig.title}
                    onChange={(val) => handleFieldChange('lead-form', 'title', val)}
                    placeholder="Kunjungi Rumah Contoh & Rasakan Langsung Suasananya"
                  />
                </div>

                <TextAreaInput
                  label="Deskripsi Pengantar Section"
                  value={activeConfig.desc}
                  onChange={(val) => handleFieldChange('lead-form', 'desc', val)}
                  placeholder="Tim sales profesional kami siap menyambut Anda setiap hari di lokasi, mendampingi keliling show unit, serta memberikan konsultasi properti gratis tanpa dipungut biaya."
                  rows={2}
                />

                {/* Kontak & Lokasi Kantor Pemasaran */}
                <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 pt-2">
                  📍 Informasi Kantor Pemasaran &amp; Show Unit:
                </h5>
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextInput
                    label="Label Alamat Kantor"
                    value={activeConfig.office_label}
                    onChange={(val) => handleFieldChange('lead-form', 'office_label', val)}
                    placeholder="Kantor Pemasaran & Show Unit:"
                  />
                  <TextInput
                    label="Alamat Lengkap Kantor / Show Unit"
                    value={activeConfig.address}
                    onChange={(val) => handleFieldChange('lead-form', 'address', val)}
                    placeholder="Jl. Raya Pesona Asri No. 88, Cileungsi - Klapanunggal, Bogor Timur"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <TextInput
                    label="Label Jam Operasional"
                    value={activeConfig.hours_label}
                    onChange={(val) => handleFieldChange('lead-form', 'hours_label', val)}
                    placeholder="Jam Operasional Show Unit:"
                  />
                  <TextInput
                    label="Jam Operasional Show Unit"
                    value={activeConfig.opening_hours}
                    onChange={(val) => handleFieldChange('lead-form', 'opening_hours', val)}
                    placeholder="Buka Setiap Hari: 08.00 - 18.00 WIB"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <TextInput
                    label="Label Hotline Resmi"
                    value={activeConfig.hotline_label}
                    onChange={(val) => handleFieldChange('lead-form', 'hotline_label', val)}
                    placeholder="Hotline Konsultasi Resmi:"
                  />
                  <TextInput
                    label="Nomor WhatsApp Hotline (Format 628...)"
                    value={activeConfig.whatsapp}
                    onChange={(val) => handleFieldChange('lead-form', 'whatsapp', val)}
                    placeholder="6281288997711"
                  />
                  <TextInput
                    label="Tampilan Nomor WhatsApp"
                    value={activeConfig.whatsapp_display}
                    onChange={(val) => handleFieldChange('lead-form', 'whatsapp_display', val)}
                    placeholder="0812-8899-7711"
                  />
                </div>

                {/* Media Foto Kantor & Brosur */}
                <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 pt-2">
                  📸 Foto Kantor Pemasaran &amp; File E-Brosur:
                </h5>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FileUploadField
                    label="Foto Kantor Pemasaran / Show Unit"
                    value={activeConfig.kantor_image}
                    onChange={(val) => handleFieldChange('lead-form', 'kantor_image', val)}
                    helpText="Unggah foto kantor pemasaran atau show unit yang representatif."
                  />
                  <div className="space-y-3 p-4 rounded-2xl glass border border-emerald-500/15">
                    <TextInput
                      label="Link Download E-Brosur PDF"
                      value={activeConfig.brochure_url}
                      onChange={(val) => handleFieldChange('lead-form', 'brochure_url', val)}
                      placeholder="https://drive.google.com/... atau link file PDF"
                    />
                    <TextInput
                      label="Judul Tips Berkunjung"
                      value={activeConfig.tips_title}
                      onChange={(val) => handleFieldChange('lead-form', 'tips_title', val)}
                      placeholder="Tips Berkunjung:"
                    />
                    <TextAreaInput
                      label="Teks Tips Berkunjung"
                      value={activeConfig.tips_text}
                      onChange={(val) => handleFieldChange('lead-form', 'tips_text', val)}
                      placeholder="Lebih baik menjadwalkan survey 1 hari sebelumnya agar tim sales dapat menyiapkan kunci..."
                      rows={2}
                    />
                  </div>
                </div>

                {/* Pengaturan Formulir & Tombol Submit */}
                <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 pt-2">
                  📝 Teks Formulir &amp; Tombol Aksi:
                </h5>
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextInput
                    label="Judul Box Formulir"
                    value={activeConfig.form_title}
                    onChange={(val) => handleFieldChange('lead-form', 'form_title', val)}
                    placeholder="Formulir Reservasi Survey & Konsultasi Sales"
                  />
                  <TextInput
                    label="Teks Tombol Kirim Form Survey"
                    value={activeConfig.submit_btn}
                    onChange={(val) => handleFieldChange('lead-form', 'submit_btn', val)}
                    placeholder="📅 Daftarkan Jadwal Survey Sekarang"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <TextInput
                    label="Catatan Privasi Pengunjung"
                    value={activeConfig.privacy_note}
                    onChange={(val) => handleFieldChange('lead-form', 'privacy_note', val)}
                    placeholder="🔒 Data Anda dijamin kerahasiaannya dan hanya digunakan untuk konfirmasi jadwal survey."
                  />
                  <TextInput
                    label="Judul Notifikasi Sukses"
                    value={activeConfig.success_title}
                    onChange={(val) => handleFieldChange('lead-form', 'success_title', val)}
                    placeholder="Permintaan Jadwal Survey Terkirim!"
                  />
                </div>
              </div>
            )}

            {/* SECTION 10: CTA POJOK KANAN BAWAH */}
            {activeTab === 'floating-cta' && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <TextInput
                    label="Nomor WhatsApp Hotline"
                    value={activeConfig.whatsapp}
                    onChange={(val) => handleFieldChange('floating-cta', 'whatsapp', val)}
                    placeholder="6281288997711"
                  />
                  <TextInput
                    label="Label Teks Tombol Melayang"
                    value={activeConfig.button_label}
                    onChange={(val) => handleFieldChange('floating-cta', 'button_label', val)}
                    placeholder="Konsultasi WhatsApp"
                  />
                  <TextInput
                    label="Icon Tombol Melayang"
                    value={activeConfig.button_icon}
                    onChange={(val) => handleFieldChange('floating-cta', 'button_icon', val)}
                    placeholder="💬"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FileUploadField
                    label="Foto Avatar Tim Sales / CS"
                    value={activeConfig.sales_avatar}
                    onChange={(val) => handleFieldChange('floating-cta', 'sales_avatar', val)}
                    helpText="Unggah foto profil konsultan / sales marketing yang ramah."
                  />
                  <div className="space-y-3 p-4 rounded-2xl glass border border-emerald-500/15">
                    <TextInput
                      label="Nama Petugas Sales / CS"
                      value={activeConfig.sales_name}
                      onChange={(val) => handleFieldChange('floating-cta', 'sales_name', val)}
                      placeholder="Marketing Pesonaku"
                    />
                    <TextInput
                      label="Status Online"
                      value={activeConfig.sales_status}
                      onChange={(val) => handleFieldChange('floating-cta', 'sales_status', val)}
                      placeholder="Online • Balas Cepat"
                    />
                    <TextInput
                      label="Teks Tombol Chat Langsung"
                      value={activeConfig.direct_cta_label}
                      onChange={(val) => handleFieldChange('floating-cta', 'direct_cta_label', val)}
                      placeholder="Buka Obrolan WhatsApp Langsung"
                    />
                  </div>
                </div>

                <TextAreaInput
                  label="Pesan Sambutan Pembuka (Greeting Bubble)"
                  value={activeConfig.greeting_text}
                  onChange={(val) => handleFieldChange('floating-cta', 'greeting_text', val)}
                  placeholder="👋 Halo! Ada yang bisa kami bantu seputar pilihan tipe rumah, promo spesial..."
                  rows={2}
                />

                <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 pt-2">
                  3 Pilihan Topik Cepat (Quick Option Buttons):
                </h5>
                <div className="space-y-3">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="p-3 rounded-2xl glass border border-emerald-500/15 grid gap-3 sm:grid-cols-2">
                      <TextInput
                        label={`Label Tombol Topik ${num}`}
                        value={activeConfig[`topic${num}_label`]}
                        onChange={(val) => handleFieldChange('floating-cta', `topic${num}_label`, val)}
                        placeholder={num === 1 ? 'Tanya Promo DP 0% & Free Biaya' : num === 2 ? 'Jadwal Survey Rumah Contoh' : 'Pricelist & Brosur Terbaru'}
                      />
                      <TextInput
                        label={`Template Pesan WhatsApp ${num}`}
                        value={activeConfig[`topic${num}_text`]}
                        onChange={(val) => handleFieldChange('floating-cta', `topic${num}_text`, val)}
                        placeholder="Halo Marketing, saya ingin tanya..."
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="p-4 border-t border-emerald-500/15 bg-slate-50/70 dark:bg-ink-950/80 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 text-xs">
          <div className="space-y-0.5 text-slate-600 dark:text-emerald-200/70 leading-relaxed max-w-2xl">
            <p>
              💡 <strong>Simpan Lokal:</strong> Tombol <em>&ldquo;Terapkan di Browser Ini&rdquo;</em> menyimpan preview langsung di browser ini.
            </p>
            <p className="text-[11px] text-amber-600 dark:text-amber-300">
              📱 <strong>Agar Berubah di HP &amp; Publik:</strong> Salin kode via tombol <span className="font-bold underline">📋 Salin Kode Widget Blogger</span> di atas lalu tempelkan ke menu <strong>Tata Letak Blogger ({activeTabMeta.widgetCode})</strong>. Pastikan juga di menu <em>Tema &gt; Setelan Seluler</em> memilih opsi <em>&ldquo;Desktop&rdquo;</em>.
            </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
            <button
              type="button"
              onClick={handleCopyBloggerCode}
              className="px-3.5 py-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-500/20 text-xs font-bold transition flex items-center gap-1.5"
              title="Salin kode widget yang siap ditempelkan di Blogger"
            >
              <span>📋</span>
              <span>Salin Kode {activeTabMeta.widgetCode}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost py-2 px-3 text-xs font-semibold"
            >
              Tutup
            </button>
            <button
              type="button"
              onClick={handleSaveAndApply}
              className="btn-primary py-2 px-4 text-xs font-bold shadow-lg shadow-emerald-600/30"
            >
              Terapkan di Browser Ini
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

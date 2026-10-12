import { useState } from 'react'
import { propertyInfo, unitTypes } from './propertyData.js'

export function LeadFormSection({ config = {}, prefilledUnit }) {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    unitType: prefilledUnit || 'Tipe Flamboyan (36/72)',
    surveyDate: '',
    surveyTime: 'Pagi (09.00 - 12.00 WIB)',
    notes: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const whatsappNumber = config.whatsapp || propertyInfo.whatsapp
  const whatsappDisplay = config.whatsapp_display || propertyInfo.whatsappDisplay
  const address = config.address || propertyInfo.address
  const openingHours = config.opening_hours || propertyInfo.openingHours

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate instant process
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 600)
  }

  const generateWhatsAppUrl = () => {
    const text = `Halo Tim Sales Pesona Kahuripan,\n\nSaya telah mendaftar jadwal survey lokasi dengan data berikut:\n- *Nama*: ${formData.name}\n- *No. WhatsApp*: ${formData.whatsapp}\n- *Email*: ${formData.email || '-'}\n- *Pilihan Unit*: ${formData.unitType}\n- *Rencana Tanggal Survey*: ${formData.surveyDate || 'Hari ini / Akhir Pekan'}\n- *Waktu*: ${formData.surveyTime}\n- *Catatan*: ${formData.notes || '-'}\n\nMohon konfirmasi kesiapan tim sales di lokasi. Terima kasih!`

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
  }

  return (
    <section id="lead-form" className="relative mx-auto max-w-6xl px-5 py-16 md:py-24">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none -z-10" />

      <div className="glass rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl">
        <div className="grid gap-10 lg:grid-cols-12 items-center">
          {/* Left Column: Reassurance & Contact Information */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="chip uppercase tracking-widest text-[11px] font-bold">
                {config.badge || 'Jadwal Survey & Konsultasi Langsung'}
              </span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-emerald-950 dark:text-white">
                {config.title || 'Kunjungi Rumah Contoh & Rasakan Langsung Suasananya'}
              </h2>
              <p className="mt-4 text-sm text-slate-600 dark:text-emerald-100/70 leading-relaxed">
                {config.desc || 'Tim sales profesional kami siap menyambut Anda setiap hari di lokasi, mendampingi keliling show unit, serta memberikan konsultasi properti gratis tanpa dipungut biaya.'}
              </p>

              <div className="mt-8 space-y-4 text-xs sm:text-sm text-slate-700 dark:text-emerald-100/80">
                <div className="flex items-start gap-3">
                  <span className="text-xl">📍</span>
                  <div>
                    <strong className="text-emerald-950 dark:text-white block">Kantor Pemasaran &amp; Show Unit:</strong>
                    <span>{address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl">⏰</span>
                  <div>
                    <strong className="text-emerald-950 dark:text-white block">Jam Operasional Show Unit:</strong>
                    <span>{openingHours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl">📞</span>
                  <div>
                    <strong className="text-emerald-950 dark:text-white block">Hotline Konsultasi Resmi:</strong>
                    <span className="font-mono">{whatsappDisplay}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Kantor Gallery Image jika diunggah */}
            {config.kantor_image && (
              <div className="mt-6 rounded-2xl overflow-hidden border border-emerald-500/20 shadow-lg group">
                <img
                  src={config.kantor_image}
                  alt="Kantor Pemasaran"
                  className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}

            <div className="mt-6 p-4 rounded-2xl glass text-xs text-emerald-900 dark:text-emerald-200">
              💡 <strong>Tips Berkunjung:</strong> Lebih baik menjadwalkan survey 1 hari sebelumnya agar tim sales dapat menyiapkan kunci rumah contoh dan berkas brosur lengkap untuk tipe yang Anda minati.
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-7">
            <div className="glass rounded-2xl p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-8 space-y-4 animate-fade-up">
                  <span className="grid mx-auto h-16 w-16 place-items-center rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-600 dark:text-emerald-400 text-3xl font-bold">
                    ✓
                  </span>
                  <h3 className="font-display text-2xl font-bold text-emerald-950 dark:text-white">
                    Permintaan Jadwal Survey Terkirim!
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-emerald-100/70 max-w-md mx-auto">
                    Terima kasih, <strong>{formData.name}</strong>. Tim konsultan kami akan segera menghubungi Anda melalui WhatsApp di nomor <strong>{formData.whatsapp}</strong> untuk konfirmasi kedatangan.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary py-3 px-6 text-sm font-bold shadow-xl shadow-emerald-600/30"
                    >
                      💬 Buka &amp; Kirim Sekarang ke WhatsApp Sales
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="btn-ghost py-3 px-5 text-sm"
                    >
                      Ubah Data Formulir
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-display text-xl font-bold text-emerald-950 dark:text-white mb-2">
                    Formulir Reservasi Survey &amp; Konsultasi Sales
                  </h3>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-emerald-200 mb-1">
                        Nama Lengkap *
                      </label>
                      <input
                        id="lead-input-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Contoh: Hendra Wijaya"
                        className="w-full glass rounded-xl px-4 py-2.5 text-sm text-emerald-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-emerald-300/40 outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-emerald-200 mb-1">
                        Nomor WhatsApp *
                      </label>
                      <input
                        id="lead-input-whatsapp"
                        type="tel"
                        required
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        placeholder="08xxxxxxxxxx"
                        className="w-full glass rounded-xl px-4 py-2.5 text-sm text-emerald-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-emerald-300/40 outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-emerald-200 mb-1">
                        Alamat Email (Opsional)
                      </label>
                      <input
                        id="lead-input-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nama@email.com"
                        className="w-full glass rounded-xl px-4 py-2.5 text-sm text-emerald-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-emerald-300/40 outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-emerald-200 mb-1">
                        Pilihan Tipe Rumah Minat
                      </label>
                      <select
                        id="lead-select-unit"
                        value={formData.unitType}
                        onChange={(e) => setFormData({ ...formData, unitType: e.target.value })}
                        className="w-full glass rounded-xl px-4 py-2.5 text-sm text-emerald-950 dark:text-white bg-white dark:bg-emerald-950 outline-none focus:border-emerald-500"
                      >
                        {unitTypes.map((unit) => (
                          <option key={unit.id} value={`${unit.name} (${unit.code})`} className="bg-white dark:bg-emerald-950 text-slate-900 dark:text-white">
                            {unit.name} ({unit.code}) — {unit.cicilanEstimate}
                          </option>
                        ))}
                        <option value="Belum Menentukan (Ingin Konsultasi Dulu)" className="bg-white dark:bg-emerald-950 text-slate-900 dark:text-white">
                          Belum Menentukan (Konsultasi Dulu)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-emerald-200 mb-1">
                        Rencana Tanggal Survey
                      </label>
                      <input
                        id="lead-input-date"
                        type="date"
                        value={formData.surveyDate}
                        onChange={(e) => setFormData({ ...formData, surveyDate: e.target.value })}
                        className="w-full glass rounded-xl px-4 py-2.5 text-sm text-emerald-950 dark:text-white outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-emerald-200 mb-1">
                        Pilihan Jam Kunjungan
                      </label>
                      <select
                        id="lead-select-time"
                        value={formData.surveyTime}
                        onChange={(e) => setFormData({ ...formData, surveyTime: e.target.value })}
                        className="w-full glass rounded-xl px-4 py-2.5 text-sm text-emerald-950 dark:text-white bg-white dark:bg-emerald-950 outline-none focus:border-emerald-500"
                      >
                        <option value="Pagi (09.00 - 12.00 WIB)" className="bg-white dark:bg-emerald-950 text-slate-900 dark:text-white">
                          Pagi (09.00 - 12.00 WIB)
                        </option>
                        <option value="Siang (13.00 - 15.00 WIB)" className="bg-white dark:bg-emerald-950 text-slate-900 dark:text-white">
                          Siang (13.00 - 15.00 WIB)
                        </option>
                        <option value="Sore (15.00 - 17.30 WIB)" className="bg-white dark:bg-emerald-950 text-slate-900 dark:text-white">
                          Sore (15.00 - 17.30 WIB)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-emerald-200 mb-1">
                      Catatan / Pertanyaan Tambahan
                    </label>
                    <textarea
                      id="lead-input-notes"
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Contoh: Ingin konsultasi KPR Bank BSI / cari unit posisi hoek..."
                      className="w-full glass rounded-xl px-4 py-2 text-sm text-emerald-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-emerald-300/40 outline-none focus:border-emerald-500 resize-none"
                    />
                  </div>

                  <button
                    id="lead-btn-submit"
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center py-3.5 text-sm font-bold shadow-xl shadow-emerald-600/30"
                  >
                    {loading ? 'Mengirim Jadwal...' : '📅 Daftarkan Jadwal Survey Sekarang'}
                  </button>

                  <p className="text-[11px] text-center text-slate-500 dark:text-slate-400">
                    🔒 Data Anda dijamin kerahasiaannya dan hanya digunakan untuk konfirmasi jadwal survey.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

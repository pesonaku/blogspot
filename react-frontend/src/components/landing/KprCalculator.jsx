import { useState } from 'react'
import { propertyInfo } from './propertyData.js'

export function KprCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(375000000)
  const [dpPercent, setDpPercent] = useState(0) // 0% DP promo
  const [tenorYears, setTenorYears] = useState(20)
  const [interestRate, setInterestRate] = useState(3.75) // Promo subsidi bunga

  const dpAmount = (propertyPrice * dpPercent) / 100
  const loanPrincipal = propertyPrice - dpAmount

  // Monthly installment formula
  const monthlyRate = interestRate / 100 / 12
  const totalMonths = tenorYears * 12

  let monthlyInstallment = 0
  if (monthlyRate > 0) {
    monthlyInstallment =
      (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  } else {
    monthlyInstallment = loanPrincipal / totalMonths
  }

  const formatRupiah = (val) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(Math.round(val))

  return (
    <section id="kpr" className="relative mx-auto max-w-6xl px-5 py-16 md:py-20">
      <div className="rounded-3xl border border-white/15 bg-ink-900/90 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="chip border-emerald-400/30 bg-emerald-400/10 text-emerald-300 uppercase tracking-widest text-[11px] font-bold">
            Simulasi KPR Interaktif
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-white">
            Hitung Estimasi Angsuran Rumah Impian Anda
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Sesuaikan plafon, jangka waktu, dan nikmati program subsidi suku bunga KPR spesial dari bank rekanan.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 items-center">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-6">
            {/* Preset Tipe Rumah */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Pilih Tipe Rumah (Preset Harga):
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPropertyPrice(280000000)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition ${
                    propertyPrice === 280000000
                      ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow'
                      : 'glass text-slate-300 hover:text-white'
                  }`}
                >
                  Tipe Melati (280 Jt)
                </button>
                <button
                  type="button"
                  onClick={() => setPropertyPrice(375000000)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition ${
                    propertyPrice === 375000000
                      ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow'
                      : 'glass text-slate-300 hover:text-white'
                  }`}
                >
                  Flamboyan (375 Jt)
                </button>
                <button
                  type="button"
                  onClick={() => setPropertyPrice(495000000)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition ${
                    propertyPrice === 495000000
                      ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow'
                      : 'glass text-slate-300 hover:text-white'
                  }`}
                >
                  Anggrek (495 Jt)
                </button>
              </div>
            </div>

            {/* Slider Harga Properti */}
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
                <span>Harga Properti</span>
                <span className="font-mono font-bold text-white text-sm">{formatRupiah(propertyPrice)}</span>
              </div>
              <input
                type="range"
                min="200000000"
                max="800000000"
                step="5000000"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full accent-fuchsia-500 cursor-pointer"
              />
            </div>

            {/* Down Payment Buttons */}
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
                <span>Uang Muka (DP Promo: 0%)</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  {dpPercent}% ({formatRupiah(dpAmount)})
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[0, 5, 10, 20].map((dp) => (
                  <button
                    key={dp}
                    type="button"
                    onClick={() => setDpPercent(dp)}
                    className={`py-2 rounded-xl text-xs font-bold transition ${
                      dpPercent === dp
                        ? 'bg-emerald-500 text-white shadow'
                        : 'glass text-slate-300 hover:text-white'
                    }`}
                  >
                    {dp === 0 ? 'DP 0% (Promo)' : `${dp}%`}
                  </button>
                ))}
              </div>
            </div>

            {/* Tenor Years */}
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
                <span>Jangka Waktu KPR (Tenor)</span>
                <span className="font-mono font-bold text-white text-sm">{tenorYears} Tahun</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[10, 15, 20, 25].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTenorYears(t)}
                    className={`py-2 rounded-xl text-xs font-bold transition ${
                      tenorYears === t
                        ? 'bg-violet-600 text-white shadow'
                        : 'glass text-slate-300 hover:text-white'
                    }`}
                  >
                    {t} Tahun
                  </button>
                ))}
              </div>
            </div>

            {/* Suku Bunga % */}
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
                <span>Suku Bunga KPR Efektif / Subsidi</span>
                <span className="font-mono font-bold text-amber-300 text-sm">{interestRate}% p.a.</span>
              </div>
              <input
                type="range"
                min="2.5"
                max="8.0"
                step="0.25"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-emerald-400/30 bg-gradient-to-b from-ink-950 to-emerald-950/40 p-6 md:p-8 shadow-2xl text-center">
              <span className="chip border-emerald-400/40 bg-emerald-400/10 text-emerald-300 text-xs font-semibold">
                Estimasi Angsuran Bulanan
              </span>

              <p className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200">
                {formatRupiah(monthlyInstallment)}
              </p>
              <p className="text-xs text-slate-400 mt-1">per bulan (fixed promo bank rekanan)</p>

              <div className="mt-6 pt-5 border-t border-white/10 space-y-2 text-xs text-left">
                <div className="flex justify-between text-slate-300">
                  <span>Plafon Pinjaman KPR:</span>
                  <span className="font-mono font-bold text-white">{formatRupiah(loanPrincipal)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>DP Dibayarkan:</span>
                  <span className="font-mono font-bold text-emerald-400">{formatRupiah(dpAmount)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Biaya Pajak &amp; Notaris:</span>
                  <span className="font-bold text-fuchsia-300">GRATIS Rp 0 (Promo)</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${propertyInfo.whatsapp}?text=Halo%20Marketing%2C%20saya%20sudah%20hitung%20simulasi%20KPR%20Pesona%20Kahuripan%20dengan%20harga%20${encodeURIComponent(formatRupiah(propertyPrice))}%20tenor%20${tenorYears}%20tahun%20(estimasi%20cicilan%20${encodeURIComponent(formatRupiah(monthlyInstallment))}%2Fbln).%20Bisa%20dibantu%20prosesnya%3F`}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-6 w-full justify-center py-3.5 text-xs sm:text-sm font-bold shadow-xl shadow-emerald-500/20"
              >
                💬 Konsultasikan Hasil Simulasi Ini via WhatsApp
              </a>

              <p className="text-[11px] text-slate-500 mt-3">
                *Simulasi bersifat indikatif. Besaran bunga &amp; persetujuan final bergantung pada analisis bank rekanan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

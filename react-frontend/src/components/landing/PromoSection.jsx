import { useEffect, useState } from 'react'
import { promoOffers, propertyInfo } from './propertyData.js'

export function PromoSection({ config = {}, onClaimPromo }) {
  // Real-time countdown timer to create urgency
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 18,
    minutes: 42,
    seconds: 30,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 }
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="promo" className="relative mx-auto max-w-6xl px-5 py-16 md:py-24">
      <div className="glass relative rounded-3xl border-2 border-emerald-500/30 p-6 sm:p-10 md:p-12 shadow-2xl overflow-hidden">
        {/* Glow backdrop behind promo container */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-80 w-80 rounded-full bg-teal-600/20 blur-3xl pointer-events-none" />

        {/* Section Heading & Urgency Timer */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-emerald-500/10 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="chip border-emerald-400/40 bg-emerald-400/20 text-emerald-700 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider">
                {config.badge || '⚡ Promo Terbatas Bulan Ini'}
              </span>
              <span className="chip border-amber-400/40 bg-amber-400/20 text-amber-800 dark:text-amber-300 font-bold text-xs">
                {config.subbadge || 'Sisa 5 Unit Terakhir'}
              </span>
            </div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-950 dark:text-white">
              {config.title || 'Paket Spesial Hunian Baru: All-In Bebas Biaya!'}
            </h2>
            <p className="mt-2 text-sm md:text-base text-slate-600 dark:text-emerald-100/70 max-w-xl">
              {config.desc || 'Dapatkan kemudahan kepemilikan rumah impian tanpa beban biaya administrasi tambahan. Penawaran berlaku terbatas sebelum harga naik!'}
            </p>
          </div>

          {/* Countdown Clock Box */}
          <div className="glass rounded-2xl border border-emerald-500/20 p-4 shrink-0 text-center shadow-lg">
            <p className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-widest mb-2">
              Promo Berakhir Dalam:
            </p>
            <div className="flex items-center gap-2 font-mono font-extrabold text-lg sm:text-xl text-emerald-950 dark:text-white">
              <div className="glass rounded-xl px-2.5 py-1.5 min-w-[44px]">
                <span>{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="block text-[9px] font-sans font-normal text-slate-500 dark:text-slate-400">Hari</span>
              </div>
              <span className="text-emerald-500">:</span>
              <div className="glass rounded-xl px-2.5 py-1.5 min-w-[44px]">
                <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="block text-[9px] font-sans font-normal text-slate-500 dark:text-slate-400">Jam</span>
              </div>
              <span className="text-emerald-500">:</span>
              <div className="glass rounded-xl px-2.5 py-1.5 min-w-[44px]">
                <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="block text-[9px] font-sans font-normal text-slate-500 dark:text-slate-400">Mnt</span>
              </div>
              <span className="text-emerald-500">:</span>
              <div className="glass rounded-xl px-2.5 py-1.5 min-w-[44px] text-emerald-600 dark:text-emerald-300">
                <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="block text-[9px] font-sans font-normal text-slate-500 dark:text-slate-400">Dtk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Banner Flyer Promo jika user mengupload gambar promo */}
        {config.promo_image && (
          <div className="relative z-10 mt-8 rounded-2xl overflow-hidden border border-emerald-400/40 shadow-xl max-h-80 group">
            <img
              src={config.promo_image}
              alt={config.title || 'Promo Hunian'}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        )}

        {/* 3 Main Promo Offer Benefit Cards */}
        <div className="relative z-10 mt-8 grid gap-6 md:grid-cols-3">
          {promoOffers.map((offer) => (
            <div
              key={offer.id}
              className="glass rounded-2xl p-6 transition hover:border-emerald-400/50"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 border border-emerald-400/30">
                  {offer.badge}
                </span>
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="font-display text-lg font-bold text-emerald-950 dark:text-white">
                {offer.title}
              </h3>
              <p className="mt-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {offer.highlight}
              </p>
              <p className="mt-2 text-xs text-slate-600 dark:text-emerald-100/70 leading-relaxed">
                {offer.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action for Promo */}
        <div className="relative z-10 mt-10 rounded-2xl glass border border-emerald-500/25 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-display font-bold text-emerald-950 dark:text-white text-base md:text-lg">
              Siap Mengamankan Voucher Promo &amp; Unit Pilihan Anda?
            </p>
            <p className="text-xs text-slate-600 dark:text-emerald-100/70 mt-0.5">
              Konsultasikan syarat KPR dan amankan nomor urut pemesanan (NUP) Anda hari ini.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
            <button
              id="cta-klaim-promo"
              type="button"
              onClick={onClaimPromo}
              className="btn-primary w-full sm:w-auto py-3 px-6 text-sm font-bold shadow-xl shadow-emerald-600/30 justify-center"
            >
              🎟 Klaim Voucher Promo Sekarang
            </button>
            <a
              href={`https://wa.me/${propertyInfo.whatsapp}?text=Halo%20Marketing%2C%20saya%20ingin%20klaim%20Voucher%20Promo%20Pesona%20Kahuripan%20(Free%20Biaya%20%2B%20Bonus%20AC%20Kanopi)`}
              target="_blank"
              rel="noreferrer"
              className="glass hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-400/40 rounded-full px-5 py-3 text-xs font-bold transition flex items-center gap-1.5"
            >
              <span>💬</span>
              <span>Klaim via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

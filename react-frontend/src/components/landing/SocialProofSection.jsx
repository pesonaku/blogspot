import { bankPartners, testimonials } from './propertyData.js'

export function SocialProofSection({ config = {} }) {
  const handoverImage =
    config.handover_image || config.foto_serah_terima || '/handover.jpg'

  const mergedTestimonials = testimonials.map((testi, idx) => {
    const num = idx + 1
    return {
      ...testi,
      name: config[`testi${num}_name`] || testi.name,
      role: config[`testi${num}_role`] || testi.role,
      title: config[`testi${num}_title`] || testi.title,
      text: config[`testi${num}_text`] || testi.text,
      avatar: config[`testi${num}_avatar`] || config[`testi${num}_foto`] || testi.avatar,
      typeUnit: config[`testi${num}_unit`] || testi.typeUnit,
    }
  })

  return (
    <section id="testimoni" className="relative mx-auto max-w-6xl px-5 py-16 md:py-24">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="chip uppercase tracking-widest text-[11px] font-bold">
          {config.badge || 'Bukti Sosial & Kepuasan Konsumen'}
        </span>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-950 dark:text-white">
          {config.title || 'Dipercaya Lebih dari 1.250+ Keluarga Bahagia'}
        </h2>
        <p className="mt-4 text-base text-slate-600 dark:text-emerald-100/70">
          {config.desc || 'Kisah nyata kepuasan para pembeli yang telah mewujudkan hunian idaman mereka bersama Pesona Kahuripan.'}
        </p>
      </div>

      {/* Featured Documentation Banner: Handover Ceremony & Akad Massal */}
      <div className="glass mb-14 rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="grid gap-8 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-emerald-500/20 bg-slate-950 shadow-xl group">
              <img
                src={handoverImage}
                alt="Dokumentasi Serah Terima Kunci Konsumen"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-4 left-4">
                <span className="chip border-emerald-400/40 bg-emerald-400/20 text-emerald-300 text-xs font-semibold backdrop-blur-md">
                  ✓ Serah Terima Kunci (BAST) Resmi
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="font-display font-bold text-sm md:text-base">
                  Momen Serah Terima Unit Rumah Kepada Konsumen Bahagia
                </p>
                <p className="text-xs text-slate-300 mt-0.5">
                  Legalitas lengkap, kunci diserahkan tepat waktu, siap huni dengan rasa bangga.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="chip border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-xs font-semibold">
                Komitmen Serah Terima
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold text-emerald-950 dark:text-white">
                Akad Kredit Lancar, Kunci Diterima Tanpa Kendala
              </h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-emerald-100/70 leading-relaxed">
                Setiap konsumen didampingi secara personal oleh tim legal dan konsultan KPR kami sejak tahap pemberkasan, wawancara bank, hingga prosesi tanda tangan akad kredit notaris dan serah terima kunci fisik.
              </p>

              <div className="mt-5 space-y-2 text-xs text-slate-700 dark:text-emerald-100/80">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✔</span>
                  <span>100% Sertifikat Pecah per Kaveling &amp; IMB/PBG Resmi</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✔</span>
                  <span>Pendampingan KPR di Bank Rekanan sampai disetujui</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✔</span>
                  <span>Garansi pemeliharaan bangunan pasca serah terima unit</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-500/10 dark:border-white/10 flex items-center justify-between">
              <div>
                <p className="font-display font-extrabold text-2xl text-emerald-700 dark:text-emerald-300">4.9 / 5.0</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Tingkat Kepuasan Konsumen</p>
              </div>
              <div className="text-right">
                <p className="font-display font-extrabold text-2xl text-emerald-600 dark:text-emerald-400">98.5%</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Approval Rate Pengajuan KPR</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Detailed Testimonial Cards */}
      <div className="grid gap-6 md:grid-cols-3 mb-16">
        {mergedTestimonials.map((testi) => (
          <div
            key={testi.id}
            className="glass rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/50"
          >
            <div>
              {/* Star Rating */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-amber-500 text-sm tracking-wider">
                  {'★'.repeat(testi.rating)}
                </div>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full chip font-medium">
                  {testi.typeUnit}
                </span>
              </div>

              <h4 className="font-display font-bold text-emerald-950 dark:text-white text-base">
                &ldquo;{testi.title}&rdquo;
              </h4>
              <p className="mt-3 text-xs md:text-sm text-slate-600 dark:text-emerald-100/70 leading-relaxed italic">
                {testi.text}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-500/10 dark:border-white/10 flex items-center gap-3">
              <img
                src={testi.avatar}
                alt={testi.name}
                className="h-11 w-11 rounded-full object-cover border-2 border-emerald-400/40"
              />
              <div>
                <p className="font-display font-bold text-sm text-emerald-950 dark:text-white">{testi.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{testi.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bank Partners Showcase */}
      <div className="glass rounded-3xl p-8 text-center">
        <p className="text-xs font-bold text-slate-500 dark:text-emerald-300/70 uppercase tracking-widest mb-6">
          Didukung Penuh oleh Bank Rekanan KPR Nasional &amp; Syariah Resmi:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
          {bankPartners.map((bank, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-4 flex flex-col items-center justify-center transition hover:border-emerald-400/50"
            >
              <span className="font-display font-black text-base text-emerald-950 dark:text-white tracking-wider">
                {bank.logoText}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-medium line-clamp-1">
                {bank.label}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-slate-500 dark:text-emerald-300/60">
          *Proses pengajuan KPR didampingi penuh oleh tim konsultan kredit kami secara cuma-cuma.
        </p>
      </div>
    </section>
  )
}

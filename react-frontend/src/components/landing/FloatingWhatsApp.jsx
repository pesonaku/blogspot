import { useState } from 'react'
import { propertyInfo } from './propertyData.js'

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false)

  const quickMessages = [
    { label: 'Tanya Promo DP 0% & Free Biaya', text: 'Halo Marketing, saya ingin tanya promo DP 0% dan gratis biaya BPHTB/Notaris di Pesona Kahuripan' },
    { label: 'Jadwal Survey Rumah Contoh', text: 'Halo, saya mau atur jadwal survey ke show unit Pesona Kahuripan besok' },
    { label: 'Simulasi Angsuran KPR Bank', text: 'Halo, saya ingin simulasi cicilan KPR dan pricelist terbaru Pesona Kahuripan' },
  ]

  const openWhatsApp = (customText) => {
    const defaultText =
      customText ||
      'Halo Marketing Pesona Kahuripan, saya ingin tanya info ketersediaan unit dan promo terbaru.'
    window.open(
      `https://wa.me/${propertyInfo.whatsapp}?text=${encodeURIComponent(defaultText)}`,
      '_blank',
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Quick Chat Popover Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-88 rounded-3xl border border-emerald-500/30 bg-ink-950 p-5 shadow-2xl backdrop-blur-2xl text-white animate-fade-up">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-500 text-xl font-bold text-white shadow-lg shadow-emerald-500/40">
                  💬
                </span>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 border-2 border-ink-950" />
              </div>
              <div>
                <p className="font-display font-bold text-sm">Marketing Pesonaku</p>
                <p className="text-[11px] text-emerald-400 font-medium">Online • Balas Cepat</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 text-sm"
              aria-label="Tutup Chat"
            >
              ✕
            </button>
          </div>

          {/* Chat Message Bubble */}
          <div className="my-3 rounded-2xl bg-white/[0.04] p-3 text-xs text-slate-300 leading-relaxed border border-white/5">
            👋 Halo! Ada yang bisa kami bantu seputar pilihan tipe rumah, simulasi KPR, atau jadwal survey ke lokasi hari ini?
          </div>

          {/* Quick Options */}
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Pilih Topik Pertanyaan:
            </p>
            {quickMessages.map((msg, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => openWhatsApp(msg.text)}
                className="w-full text-left text-xs p-2.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-emerald-500/20 hover:border-emerald-400/40 text-slate-200 hover:text-white transition flex items-center justify-between"
              >
                <span>{msg.label}</span>
                <span className="text-emerald-400 text-xs">➔</span>
              </button>
            ))}
          </div>

          {/* Direct Custom WhatsApp CTA */}
          <button
            type="button"
            onClick={() => openWhatsApp()}
            className="mt-4 w-full rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 text-xs text-center shadow-lg shadow-emerald-500/30 transition flex items-center justify-center gap-1.5"
          >
            <span>Buka Obrolan WhatsApp Langsung</span>
          </button>
        </div>
      )}

      {/* Floating Button */}
      <button
        id="floating-wa-button"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 p-3.5 sm:px-5 sm:py-3.5 text-white font-bold shadow-2xl shadow-emerald-500/40 transition hover:scale-105 active:scale-95"
        aria-label="Chat WhatsApp"
      >
        {/* Pulsing ring indicator */}
        <span className="absolute -inset-1 rounded-full bg-emerald-400/40 animate-ping opacity-75 pointer-events-none" />

        {/* WhatsApp Icon */}
        <span className="relative text-xl">💬</span>

        <span className="relative hidden sm:inline text-xs md:text-sm font-bold tracking-tight">
          Konsultasi WhatsApp
        </span>

        {/* Unread badge dot */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
        </span>
      </button>
    </div>
  )
}

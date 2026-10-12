import { useState, useEffect } from 'react'
import { HeroSection } from './HeroSection.jsx'
import { QuickStats } from './QuickStats.jsx'
import { UspSection } from './UspSection.jsx'
import { LocationSection } from './LocationSection.jsx'
import { UnitTypesSection } from './UnitTypesSection.jsx'
import { GalleryVirtualTour } from './GalleryVirtualTour.jsx'
import { PromoSection } from './PromoSection.jsx'
import { SocialProofSection } from './SocialProofSection.jsx'
import { LeadFormSection } from './LeadFormSection.jsx'
import { FloatingWhatsApp } from './FloatingWhatsApp.jsx'
import WidgetCustomizerModal from './WidgetCustomizerModal.jsx'
import { isSectionDisabled } from '../../lib/widgetConfig.js'
import {
  FloorPlanModal,
  VirtualTourModal,
  VideoPlayerModal,
  BrosurModal,
  LightboxModal,
} from './Modals.jsx'

export const DEFAULT_LANDING_SECTIONS = [
  { id: 'header' },
  { id: 'hero' },
  { id: 'stats' },
  { id: 'usp' },
  { id: 'location' },
  { id: 'units' },
  { id: 'gallery' },
  { id: 'promo' },
  { id: 'social-proof' },
  { id: 'lead-form' },
  { id: 'floating-cta' },
]

export default function PropertyLandingPage({ blog, sections = [] }) {
  const [selectedFloorPlanUnit, setSelectedFloorPlanUnit] = useState(null)
  const [showVirtualTour, setShowVirtualTour] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [showBrosurModal, setShowBrosurModal] = useState(false)
  const [showCustomizer, setShowCustomizer] = useState(false)
  const [lightboxData, setLightboxData] = useState(null)
  const [prefilledUnitForSurvey, setPrefilledUnitForSurvey] = useState('')
  const [activeVideo, setActiveVideo] = useState({ url: '', title: '' })
  const [activeVirtualTourUrl, setActiveVirtualTourUrl] = useState('')

  // Deteksi mode admin / studio kustomisasi rahasia (agar tersembunyi dari publik)
  const [isAdminMode, setIsAdminMode] = useState(() => {
    try {
      if (typeof window === 'undefined') return false
      const urlParams = new URLSearchParams(window.location.search)
      if (
        urlParams.get('admin') === '1' ||
        urlParams.get('admin') === 'true' ||
        urlParams.get('customize') === '1' ||
        urlParams.get('edit') === '1'
      ) {
        localStorage.setItem('pesona_customizer_admin', '1')
        return true
      }
      if (window.location.hash === '#admin' || window.location.hash === '#customize') {
        localStorage.setItem('pesona_customizer_admin', '1')
        return true
      }
      return localStorage.getItem('pesona_customizer_admin') === '1'
    } catch {
      return false
    }
  })

  // Keyboard shortcut listener (Ctrl + Shift + E atau Alt + E) & secret footer trigger
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey && e.shiftKey && (e.key === 'E' || e.key === 'e')) ||
        (e.altKey && (e.key === 'E' || e.key === 'e'))
      ) {
        e.preventDefault()
        setIsAdminMode(true)
        setShowCustomizer((prev) => !prev)
        try {
          localStorage.setItem('pesona_customizer_admin', '1')
        } catch {}
      }
    }

    const handleToggleAdmin = () => {
      setIsAdminMode(true)
      setShowCustomizer(true)
      try {
        localStorage.setItem('pesona_customizer_admin', '1')
      } catch {}
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('pesona:toggle-admin', handleToggleAdmin)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('pesona:toggle-admin', handleToggleAdmin)
    }
  }, [])

  const handleHideAdminMode = () => {
    setIsAdminMode(false)
    setShowCustomizer(false)
    try {
      localStorage.removeItem('pesona_customizer_admin')
      if (window.location.hash === '#admin' || window.location.hash === '#customize') {
        window.history.replaceState(null, '', window.location.pathname + window.location.search)
      }
      const url = new URL(window.location.href)
      let changed = false
      ;['admin', 'customize', 'edit'].forEach((p) => {
        if (url.searchParams.has(p)) {
          url.searchParams.delete(p)
          changed = true
        }
      })
      if (changed) {
        window.history.replaceState(null, '', url.pathname + (url.search ? url.search : ''))
      }
    } catch {}
  }

  const [savedOverrides, setSavedOverrides] = useState(() => {
    try {
      const s = localStorage.getItem('pesona_custom_widgets')
      return s ? JSON.parse(s) : {}
    } catch {
      return {}
    }
  })

  const handleSelectUnitForSurvey = (unitName) => {
    setPrefilledUnitForSurvey(unitName)
    const leadFormEl = document.getElementById('lead-form')
    if (leadFormEl) {
      leadFormEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleClaimPromo = () => {
    const leadFormEl = document.getElementById('lead-form')
    if (leadFormEl) {
      leadFormEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const activeSections = sections && sections.length > 0 ? sections : DEFAULT_LANDING_SECTIONS

  const renderSection = (sec) => {
    const config = { ...(sec.config || {}), ...(savedOverrides[sec.id] || {}) }
    if (isSectionDisabled(config)) {
      return null
    }
    switch (sec.id) {
      case 'hero':
        return (
          <div key="hero" id="sec-hero-wrapper">
            <HeroSection
              blog={blog}
              config={config}
              onOpenVideo={(url, title) => {
                setActiveVideo({
                  url: url || config.video_url || '',
                  title: title || config.headline || config.title || '',
                })
                setShowVideoModal(true)
              }}
              onOpenBrosur={() => setShowBrosurModal(true)}
              onOpenVirtualTour={(url) => {
                setActiveVirtualTourUrl(url || config.virtual_tour_url || '')
                setShowVirtualTour(true)
              }}
            />
            {sec.contentHtml && (
              <div
                className="mx-auto max-w-6xl px-5 my-4 overflow-hidden rounded-2xl glass p-4 text-sm text-slate-800 dark:text-emerald-100"
                dangerouslySetInnerHTML={{ __html: sec.contentHtml }}
              />
            )}
          </div>
        )
      case 'stats':
        return (
          <div key="stats" id="sec-stats-wrapper">
            <QuickStats config={config} />
            {sec.contentHtml && (
              <div
                className="mx-auto max-w-6xl px-5 my-4 overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-4 text-sm text-slate-200"
                dangerouslySetInnerHTML={{ __html: sec.contentHtml }}
              />
            )}
          </div>
        )
      case 'usp':
        return (
          <div key="usp" id="sec-usp-wrapper">
            <UspSection config={config} />
            {sec.contentHtml && (
              <div
                className="mx-auto max-w-6xl px-5 my-4 overflow-hidden rounded-2xl glass p-4 text-sm text-slate-800 dark:text-emerald-100"
                dangerouslySetInnerHTML={{ __html: sec.contentHtml }}
              />
            )}
          </div>
        )
      case 'location':
        return (
          <div key="location" id="sec-location-wrapper">
            <LocationSection config={config} />
            {sec.contentHtml && (
              <div
                className="mx-auto max-w-6xl px-5 my-4 overflow-hidden rounded-2xl glass p-4 text-sm text-slate-800 dark:text-emerald-100"
                dangerouslySetInnerHTML={{ __html: sec.contentHtml }}
              />
            )}
          </div>
        )
      case 'units':
        return (
          <div key="units" id="sec-units-wrapper">
            <UnitTypesSection
              config={config}
              onOpenFloorPlan={(unit) => setSelectedFloorPlanUnit(unit)}
              onSelectUnitForSurvey={handleSelectUnitForSurvey}
            />
            {sec.contentHtml && (
              <div
                className="mx-auto max-w-6xl px-5 my-4 overflow-hidden rounded-2xl glass p-4 text-sm text-slate-800 dark:text-emerald-100"
                dangerouslySetInnerHTML={{ __html: sec.contentHtml }}
              />
            )}
          </div>
        )
      case 'gallery':
        return (
          <div key="gallery" id="sec-gallery-wrapper">
            <GalleryVirtualTour
              config={config}
              onOpenLightbox={(item) =>
                setLightboxData({
                  image: item.image,
                  title: item.title,
                  subtitle: item.subtitle,
                })
              }
              onOpenVirtualTour={(url) => {
                setActiveVirtualTourUrl(url || config.virtual_tour_url || '')
                setShowVirtualTour(true)
              }}
              onOpenVideo={(url, title) => {
                setActiveVideo({
                  url: url || config.video_url || '',
                  title: title || config.video_title || config.title || '',
                })
                setShowVideoModal(true)
              }}
            />
            {sec.contentHtml && (
              <div
                className="mx-auto max-w-6xl px-5 my-4 overflow-hidden rounded-2xl glass p-4 text-sm text-slate-800 dark:text-emerald-100"
                dangerouslySetInnerHTML={{ __html: sec.contentHtml }}
              />
            )}
          </div>
        )
      case 'promo':
        return (
          <div key="promo" id="sec-promo-wrapper">
            <PromoSection config={config} onClaimPromo={handleClaimPromo} />
            {sec.contentHtml && (
              <div
                className="mx-auto max-w-6xl px-5 my-4 overflow-hidden rounded-2xl border border-amber-500/20 bg-amber-950/20 p-4 text-sm text-slate-200"
                dangerouslySetInnerHTML={{ __html: sec.contentHtml }}
              />
            )}
          </div>
        )
      case 'social-proof':
        return (
          <div key="social-proof" id="sec-social-proof-wrapper">
            <SocialProofSection config={config} />
            {sec.contentHtml && (
              <div
                className="mx-auto max-w-6xl px-5 my-4 overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-4 text-sm text-slate-200"
                dangerouslySetInnerHTML={{ __html: sec.contentHtml }}
              />
            )}
          </div>
        )
      case 'lead-form':
        return (
          <div key="lead-form" id="sec-lead-form-wrapper">
            <LeadFormSection config={config} prefilledUnit={prefilledUnitForSurvey} />
            {sec.contentHtml && (
              <div
                className="mx-auto max-w-6xl px-5 my-4 overflow-hidden rounded-2xl glass p-4 text-sm text-slate-800 dark:text-emerald-100"
                dangerouslySetInnerHTML={{ __html: sec.contentHtml }}
              />
            )}
          </div>
        )
      default:
        return sec.contentHtml ? (
          <section key={sec.id || Math.random()} className="relative mx-auto max-w-6xl px-5 py-8">
            {sec.title && (
              <h3 className="font-display text-xl font-bold text-white mb-4">{sec.title}</h3>
            )}
            <div
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-slate-300"
              dangerouslySetInnerHTML={{ __html: sec.contentHtml }}
            />
          </section>
        ) : null
    }
  }

  return (
    <div className="w-full">
      {activeSections.map((sec) => renderSection(sec))}

      {/* Tombol CTA Mengambang (Floating WhatsApp Button) */}
      {(() => {
        const floatingCtaConfig = {
          ...(sections.find((s) => s.id === 'floating-cta')?.config || {}),
          ...(savedOverrides['floating-cta'] || {}),
        }
        if (isSectionDisabled(floatingCtaConfig)) return null
        return <FloatingWhatsApp config={floatingCtaConfig} />
      })()}

      {/* Modals Interaktif */}
      {selectedFloorPlanUnit && (
        <FloorPlanModal
          unit={selectedFloorPlanUnit}
          onClose={() => setSelectedFloorPlanUnit(null)}
          onSelectUnitForSurvey={handleSelectUnitForSurvey}
        />
      )}

      {showVirtualTour && (
        <VirtualTourModal
          virtualTourUrl={activeVirtualTourUrl}
          onClose={() => setShowVirtualTour(false)}
        />
      )}

      {showVideoModal && (
        <VideoPlayerModal
          videoUrl={activeVideo.url}
          title={activeVideo.title}
          onClose={() => setShowVideoModal(false)}
        />
      )}

      {showBrosurModal && (
        <BrosurModal
          brochureUrl={
            sections.find((s) => s.id === 'lead-form')?.config?.brochure_url ||
            sections.find((s) => s.id === 'hero')?.config?.brochure_url ||
            ''
          }
          onClose={() => setShowBrosurModal(false)}
        />
      )}

      {/* Floating Trigger Tombol Form Customizer Studio (HANYA MUNCUL KETIKA ADMIN MODE AKTIF, 100% TERSEMBUNYI DARI PUBLIK) */}
      {isAdminMode && (
        <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2 animate-fade-up">
          <button
            type="button"
            onClick={() => setShowCustomizer(true)}
            className="glass group flex items-center gap-2.5 rounded-full border border-emerald-400/50 bg-white/95 dark:bg-ink-950/95 px-4 py-3 text-xs font-bold text-emerald-950 dark:text-white shadow-2xl backdrop-blur-xl hover:border-emerald-400 hover:scale-105 transition-all"
            title="Buka Form Customizer Widget (Mode Admin Aktif)"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-tr from-emerald-600 to-teal-600 text-sm text-white shadow-md">
              ⚙️
            </span>
            <span className="hidden sm:inline">Custom Widget Studio</span>
            <span className="chip border-emerald-400/30 text-[10px] text-emerald-700 dark:text-emerald-300">
              Admin
            </span>
          </button>

          <button
            type="button"
            onClick={handleHideAdminMode}
            className="h-8 w-8 rounded-full bg-slate-900/80 hover:bg-rose-600 text-white/70 hover:text-white flex items-center justify-center text-xs shadow-lg backdrop-blur transition"
            title="Sembunyikan tombol & keluar dari mode admin (tampilan publik murni)"
          >
            ✕
          </button>
        </div>
      )}

      {/* Modal Customizer Studio */}
      <WidgetCustomizerModal
        isOpen={showCustomizer}
        onClose={() => setShowCustomizer(false)}
        isAdminMode={isAdminMode}
        onHideAdminMode={handleHideAdminMode}
        currentSections={activeSections.map((s) => ({
          ...s,
          config: { ...(s.config || {}), ...(savedOverrides[s.id] || {}) },
        }))}
        onApplyOverrides={(newOverrides) => setSavedOverrides(newOverrides)}
      />
    </div>
  )
}

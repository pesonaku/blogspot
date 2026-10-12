import { useState } from 'react'
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
import {
  FloorPlanModal,
  VirtualTourModal,
  VideoPlayerModal,
  BrosurModal,
  LightboxModal,
} from './Modals.jsx'

export const DEFAULT_LANDING_SECTIONS = [
  { id: 'hero' },
  { id: 'stats' },
  { id: 'usp' },
  { id: 'location' },
  { id: 'units' },
  { id: 'gallery' },
  { id: 'promo' },
  { id: 'social-proof' },
  { id: 'lead-form' },
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
      <FloatingWhatsApp />

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

      {/* Floating Trigger Button: Custom Widget Studio */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          type="button"
          onClick={() => setShowCustomizer(true)}
          className="glass group flex items-center gap-2.5 rounded-full border border-emerald-400/40 bg-white/95 dark:bg-ink-950/95 px-4 py-3 text-xs font-bold text-emerald-950 dark:text-white shadow-2xl backdrop-blur-xl hover:border-emerald-400 hover:scale-105 transition-all"
          title="Buka Form Customizer Widget & Media Uploader"
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-tr from-emerald-600 to-teal-600 text-sm text-white shadow-md">
            ⚙️
          </span>
          <span className="hidden sm:inline">Form Custom Widget</span>
          <span className="chip border-emerald-400/30 text-[10px] text-emerald-700 dark:text-emerald-300">
            Full Edit
          </span>
        </button>
      </div>

      {/* Modal Customizer Studio */}
      <WidgetCustomizerModal
        isOpen={showCustomizer}
        onClose={() => setShowCustomizer(false)}
        currentSections={activeSections.map((s) => ({
          ...s,
          config: { ...(s.config || {}), ...(savedOverrides[s.id] || {}) },
        }))}
        onApplyOverrides={(newOverrides) => setSavedOverrides(newOverrides)}
      />
    </div>
  )
}

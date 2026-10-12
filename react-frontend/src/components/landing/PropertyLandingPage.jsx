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
import {
  FloorPlanModal,
  VirtualTourModal,
  VideoPlayerModal,
  BrosurModal,
  LightboxModal,
} from './Modals.jsx'

export default function PropertyLandingPage({ blog }) {
  const [selectedFloorPlanUnit, setSelectedFloorPlanUnit] = useState(null)
  const [showVirtualTour, setShowVirtualTour] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [showBrosurModal, setShowBrosurModal] = useState(false)
  const [lightboxData, setLightboxData] = useState(null)
  const [prefilledUnitForSurvey, setPrefilledUnitForSurvey] = useState('')

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

  return (
    <div className="w-full">
      {/* 1. Hero Section (Headline, Sub-headline, Hero Image / Video, CTA Utama) */}
      <HeroSection
        blog={blog}
        onOpenVideo={() => setShowVideoModal(true)}
        onOpenBrosur={() => setShowBrosurModal(true)}
        onOpenVirtualTour={() => setShowVirtualTour(true)}
      />

      {/* 2. Bar Kredibilitas / Quick Stats */}
      <QuickStats />

      {/* 3. Keunggulan & USP */}
      <UspSection />

      {/* 4. Lokasi Strategis (Location Advantage) */}
      <LocationSection />

      {/* 5. Tipe Unit & Spesifikasi (Listing) */}
      <UnitTypesSection
        onOpenFloorPlan={(unit) => setSelectedFloorPlanUnit(unit)}
        onSelectUnitForSurvey={handleSelectUnitForSurvey}
      />

      {/* 6. Galeri & Tur Virtual */}
      <GalleryVirtualTour
        onOpenLightbox={(item) =>
          setLightboxData({
            image: item.image,
            title: item.title,
            subtitle: item.subtitle,
          })
        }
        onOpenVirtualTour={() => setShowVirtualTour(true)}
        onOpenVideo={() => setShowVideoModal(true)}
      />

      {/* 7. Promo & Penawaran Spesial (Offer) */}
      <PromoSection onClaimPromo={handleClaimPromo} />


      {/* 8. Social Proof (Bukti Sosial) */}
      <SocialProofSection />

      {/* 9. Lead Form / Formulir Kontak & CTA Akhir */}
      <LeadFormSection prefilledUnit={prefilledUnitForSurvey} />

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
        <VirtualTourModal onClose={() => setShowVirtualTour(false)} />
      )}

      {showVideoModal && (
        <VideoPlayerModal onClose={() => setShowVideoModal(false)} />
      )}

      {showBrosurModal && (
        <BrosurModal onClose={() => setShowBrosurModal(false)} />
      )}

      {lightboxData && (
        <LightboxModal
          image={lightboxData.image}
          title={lightboxData.title}
          subtitle={lightboxData.subtitle}
          onClose={() => setLightboxData(null)}
        />
      )}
    </div>
  )
}

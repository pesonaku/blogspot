/**
 * Konversi berbagai format URL YouTube / Vimeo menjadi URL Embed yang aman dan siap diputar.
 * Mendukung format:
 * - https://www.youtube.com/watch?v=ID
 * - https://youtu.be/ID
 * - https://www.youtube.com/embed/ID
 * - https://www.youtube.com/shorts/ID
 * - https://vimeo.com/ID
 * - ID YouTube langsung (11 karakter)
 */
export function formatEmbedVideoUrl(url) {
  if (!url || typeof url !== 'string') return ''

  const trimmed = url.trim()
  if (!trimmed) return ''

  // 1. YouTube Shorts
  const shortsMatch = trimmed.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/)
  if (shortsMatch) {
    return `https://www.youtube-nocookie.com/embed/${shortsMatch[1]}?autoplay=1&mute=0&controls=1`
  }

  // 2. YouTube Watch
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/)
  if (watchMatch) {
    return `https://www.youtube-nocookie.com/embed/${watchMatch[1]}?autoplay=1&mute=0&controls=1`
  }

  // 3. YouTube Short URL (youtu.be)
  const youtuBeMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/)
  if (youtuBeMatch) {
    return `https://www.youtube-nocookie.com/embed/${youtuBeMatch[1]}?autoplay=1&mute=0&controls=1`
  }

  // 4. YouTube Embed yang sudah ada
  const embedMatch = trimmed.match(/youtube(?:-nocookie)?\.com\/embed\/([a-zA-Z0-9_-]{11})/)
  if (embedMatch) {
    const base = `https://www.youtube-nocookie.com/embed/${embedMatch[1]}`
    return trimmed.includes('autoplay') ? trimmed : `${base}?autoplay=1&mute=0&controls=1`
  }

  // 5. Hanya Video ID YouTube (11 karakter alphanumeric)
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return `https://www.youtube-nocookie.com/embed/${trimmed}?autoplay=1&mute=0&controls=1`
  }

  // 6. Vimeo
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/[^/]*\/videos\/|album\/(?:\d+\/)?video\/|video\/|)(\d+)/)
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`
  }

  // 7. URL umum lainnya (misal embed 3D/iframe yang valid)
  return trimmed
}

/**
 * Pembersih nilai URL gambar / video:
 * - Menghapus tanda kutip luar ("..." atau '...')
 * - Menangani jika user tak sengaja paste tag HTML <img src="..."> atau <a href="...">
 */
function cleanConfigValue(rawVal) {
  let val = rawVal.trim()
  if (!val) return ''

  // Hapus tanda kutip pembungkus
  val = val.replace(/^["']|["']$/g, '').trim()

  // Jika berupa tag HTML <img>, ambil src
  const imgMatch = val.match(/src=["']([^"']+)["']/i)
  if (imgMatch) return imgMatch[1].trim()

  // Jika berupa tag HTML <a>, ambil href
  const aMatch = val.match(/href=["']([^"']+)["']/i)
  if (aMatch) return aMatch[1].trim()

  return val
}

/**
 * Normalisasi alias key ramah bahasa Indonesia ke key standar yang dibaca React
 */
const ALIAS_MAP = {
  gambar_hero: 'hero_image',
  foto_hero: 'hero_image',
  banner_hero: 'hero_image',
  banner_image: 'hero_image',
  video: 'video_url',
  link_video: 'video_url',
  youtube: 'video_url',
  youtube_url: 'video_url',
  link_youtube: 'video_url',
  virtual_tour: 'virtual_tour_url',
  tur_virtual: 'virtual_tour_url',
  tur_360: 'virtual_tour_url',
  link_virtual_tour: 'virtual_tour_url',
  link_tur_virtual: 'virtual_tour_url',
  google_maps: 'gmaps_url',
  link_maps: 'gmaps_url',
  peta_url: 'gmaps_url',
  embed_peta: 'gmaps_embed',
  maps_embed: 'gmaps_embed',
  siteplan: 'siteplan_image',
  masterplan: 'siteplan_image',
  gambar_siteplan: 'siteplan_image',
  foto_siteplan: 'siteplan_image',
  banner_promo: 'promo_image',
  poster_promo: 'promo_image',
  gambar_promo: 'promo_image',
  foto_promo: 'promo_image',
  foto_serah_terima: 'handover_image',
  gambar_serah_terima: 'handover_image',
  brosur_url: 'brochure_url',
  link_brosur: 'brochure_url',
  file_brosur: 'brochure_url',
  download_brosur: 'brochure_url',
  office_image: 'kantor_image',
  foto_kantor: 'kantor_image',
  gambar_kantor: 'kantor_image',
  disabled: 'disable',
  is_disabled: 'disable',
  nonaktif: 'disable',
  nonaktifkan: 'disable',
  sembunyikan: 'disable',
  hide: 'disable',
  hide_section: 'disable',
}

/**
 * Mengecek apakah suatu section atau konten dinonaktifkan (disable: true)
 */
export function isSectionDisabled(cfg) {
  if (!cfg) return false
  const val = String(cfg.disable ?? cfg.disabled ?? cfg.sembunyikan ?? cfg.nonaktif ?? '').trim().toLowerCase()
  if (val === 'true' || val === '1' || val === 'yes' || val === 'ya') return true
  if (cfg.enabled === 'false' || cfg.enabled === false) return true
  if (cfg.show === 'false' || cfg.show === false) return true
  if (cfg.tampilkan === 'false' || cfg.tampilkan === false) return true
  if (cfg.status === 'disabled' || cfg.status === 'off') return true
  return false
}

/**
 * Parser konfigurasi konten widget Blogger.
 *
 * Format input yang didukung:
 * 1. Key: Value ramah pengguna (contoh: "headline: Rumah Modern DP 0%")
 *    - Baris komentar diawali '#' atau '//'
 *    - Mengabaikan case sensitif pada key (dikonversi ke lowercase)
 *    - Mendukung alias bahasa Indonesia untuk input gambar & video
 * 2. JSON standar (contoh: {"headline": "..."})
 * 3. Raw HTML custom (misal banner atau embed script)
 */
export function parseWidgetConfig(rawText, rawHtml = '') {
  if (!rawText || typeof rawText !== 'string') {
    return { config: {}, customHtml: rawHtml || '' }
  }

  const trimmed = rawText.trim()
  if (!trimmed) {
    return { config: {}, customHtml: '' }
  }

  // 1. Deteksi format JSON jika diawali {
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    try {
      const parsed = JSON.parse(trimmed)
      return { config: parsed, customHtml: '' }
    } catch {
      // Bukan JSON valid, lanjutkan ke parser key-value
    }
  }

  // 2. Deteksi format Key: Value ramah pengguna
  const lines = trimmed.split(/\r?\n/)
  const config = {}
  let hasKeyValue = false
  const unparsedLines = []

  for (const line of lines) {
    const l = line.trim()
    if (!l || l.startsWith('#') || l.startsWith('//')) {
      continue // lewati baris komentar & spasi kosong
    }

    const colonIdx = l.indexOf(':')
    if (colonIdx > 0) {
      const rawKey = l.slice(0, colonIdx).trim()
      // Pastikan key berupa string identifier yang valid (huruf, angka, _, -)
      if (/^[a-zA-Z0-9_-]+$/.test(rawKey)) {
        const normalizedKey = rawKey.toLowerCase()
        const rawVal = l.slice(colonIdx + 1).trim()
        const cleanVal = cleanConfigValue(rawVal)

        // Simpan key asli
        config[normalizedKey] = cleanVal

        // Petakan juga alias jika tersedia
        const mappedAlias = ALIAS_MAP[normalizedKey]
        if (mappedAlias && !config[mappedAlias]) {
          config[mappedAlias] = cleanVal
        }

        hasKeyValue = true
        continue
      }
    }
    unparsedLines.push(line)
  }

  if (hasKeyValue) {
    const leftoverHtml = unparsedLines.join('\n').trim()
    return { config, customHtml: leftoverHtml }
  }

  // 3. Fallback jika user memasukkan raw HTML murni
  return { config: {}, customHtml: rawHtml || trimmed }
}

/**
 * Serialisasi objek konfigurasi menjadi teks format key: value
 * yang rapi dan siap disalin ke widget Blogger (HTML1 - HTML9).
 */
export function serializeSectionConfig(sectionId, config = {}) {
  const lines = []
  lines.push(`# ========================================================`)
  lines.push(`# KONFIGURASI WIDGET [${(sectionId || '').toUpperCase()}]`)
  lines.push(`# Dihasilkan secara otomatis oleh Custom Widget Studio`)
  lines.push(`# Salin dan tempelkan teks ini ke widget HTML Blogger Anda.`)
  lines.push(`# ========================================================\n`)

  // Status tampilan (disable: true / false) di baris pertama
  if (config.disable !== undefined && config.disable !== '') {
    lines.push(`# STATUS TAMPILAN SECTION (true = sembunyikan, false = tampilkan)`)
    lines.push(`disable: ${config.disable}\n`)
  }

  for (const [key, value] of Object.entries(config)) {
    if (key === 'disable') continue
    if (value !== undefined && value !== null && value !== '') {
      lines.push(`${key}: ${value}`)
    }
  }

  return lines.join('\n')
}


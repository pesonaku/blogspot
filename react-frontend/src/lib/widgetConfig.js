/**
 * Parser konfigurasi konten widget Blogger.
 *
 * Format input yang didukung:
 * 1. Key: Value ramah pengguna (contoh: "headline: Rumah Modern DP 0%")
 *    - Baris komentar diawali '#' atau '//'
 *    - Mengabaikan case sensitif pada key (dikonversi ke lowercase)
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
        const key = rawKey.toLowerCase()
        const val = l.slice(colonIdx + 1).trim()
        config[key] = val
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

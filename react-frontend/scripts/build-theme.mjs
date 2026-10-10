/**
 * Menggabungkan hasil build React + Tailwind ke template Blogger.
 *
 *   blogger-theme/template.xml  +  dist/blogger-theme.{js,css}
 *        └──────────────► blogger-theme/index.xml  (siap upload ke Blogger)
 *
 * Env opsional:
 *   THEME_API_BASE_URL=https://api.domainku.com   -> URL Laravel API untuk produksi
 *
 * Dipanggil oleh `npm run build:theme` (setelah `vite build`).
 */
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { XMLValidator } from 'fast-xml-parser'

const here = (p) => fileURLToPath(new URL(p, import.meta.url))
const paths = {
  template: here('../../blogger-theme/template.xml'),
  output: here('../../blogger-theme/index.xml'),
  js: here('../dist/blogger-theme.js'),
  css: here('../dist/blogger-theme.css'),
}

function fail(message) {
  console.error(`\n✖ build-theme: ${message}\n`)
  process.exit(1)
}

async function read(path, hint) {
  try {
    return await readFile(path, 'utf8')
  } catch {
    return fail(`File tidak ditemukan: ${path}${hint ? `\n  ${hint}` : ''}`)
  }
}

/** Isi CDATA tidak boleh mengandung "]]>" karena akan menutup blok CDATA lebih awal. */
function assertCdataSafe(name, content) {
  if (content.includes(']]>')) fail(`${name} mengandung "]]>" sehingga tidak aman di dalam CDATA.`)
}

/** Ganti penanda secara literal (function replacer agar "$" di JS minified tidak diinterpretasi). */
function inject(source, marker, value) {
  if (!source.includes(marker)) fail(`Penanda ${marker} tidak ditemukan di template.xml`)
  return source.replace(marker, () => value)
}

const xmlEscape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '\\"')

const template = await read(paths.template)
const hint = 'Jalankan `npm run build:theme` (bukan hanya node scripts/build-theme.mjs).'
const css = (await read(paths.css, hint)).trim()
// "</script" di dalam string JS akan menutup tag <script> di HTML; escape agar aman.
const js = (await read(paths.js, hint)).trim().replace(/<\/script/gi, '<\\/script')

assertCdataSafe('CSS', css)
assertCdataSafe('JS', js)

const apiBaseUrl = (process.env.THEME_API_BASE_URL || '').trim().replace(/\/+$/, '')
const stamp = new Date().toISOString()

let xml = template.replace(
  /<!--\s*SOURCE TEMPLATE[\s\S]*?-->/,
  () =>
    `<!--\n  FILE HASIL GENERATE (${stamp}) - jangan edit manual.\n` +
    `  Edit blogger-theme/template.xml / react-frontend/src lalu jalankan \`npm run build:theme\`.\n` +
    `  Upload file ini di Blogger: Tema > tombol panah di samping "Sesuaikan" > Pulihkan.\n-->`,
)
xml = inject(xml, '/*__THEME_CSS__*/', css)
xml = inject(xml, '//__THEME_JS__', js)
xml = inject(xml, '__API_BASE_URL__', xmlEscape(apiBaseUrl))

const result = XMLValidator.validate(xml, { allowBooleanAttributes: false })
if (result !== true) {
  const { code, msg, line, col } = result.err
  fail(`XML tidak valid (${code}) baris ${line}:${col} - ${msg}`)
}

await writeFile(paths.output, xml, 'utf8')

const kb = (n) => `${(Buffer.byteLength(n, 'utf8') / 1024).toFixed(1)} KB`
console.log('\n✔ blogger-theme/index.xml berhasil dibuat & lolos validasi XML')
console.log(`  JS  : ${kb(js)}`)
console.log(`  CSS : ${kb(css)}`)
console.log(`  XML : ${kb(xml)}`)
console.log(`  API : ${apiBaseUrl || '(kosong → fallback VITE_API_BASE_URL / http://127.0.0.1:8000)'}`)
if (Buffer.byteLength(xml, 'utf8') > 1024 * 1024) {
  console.warn('  ⚠ Ukuran tema > 1 MB, Blogger bisa menolak. Pertimbangkan memuat JS lewat CDN.')
}

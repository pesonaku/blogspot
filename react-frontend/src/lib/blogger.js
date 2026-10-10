/**
 * Jembatan Blogger -> React.
 *
 * Sumber data:
 * 1. window.BloggerData  -> metadata global (judul blog, pageType, dll), ditulis
 *    oleh <script> di <head> template XML.
 * 2. Markup server-side di dalam #root -> daftar post, label, dan pager.
 *    Markup ini dirender Blogger (bagus untuk SEO & tanpa JS), lalu dibaca di sini
 *    sebelum React mengganti isi #root.
 * 3. Fallback Feed JSON Blogger (/feeds/posts/default?alt=json) -> jika SSR
 *    menghasilkan 0 artikel (misal saat widget Blogger belum aktif / cache template baru),
 *    React akan otomatis mengambil data via feed JSON Blogger.
 */

const text = (el) => (el ? el.textContent.trim() : '')

function readLinks(nodes) {
  return Array.from(nodes).map((a) => ({
    name: a.dataset.name || text(a),
    url: a.getAttribute('href') || '#',
    count: a.dataset.count ? Number(a.dataset.count) : null,
  }))
}

function readPost(el) {
  const body = el.querySelector('[data-bt="body"]')
  return {
    id: el.dataset.id || el.dataset.url || text(el.querySelector('h1, h2')),
    title: el.dataset.title || text(el.querySelector('h1, h2')),
    url: el.dataset.url || '#',
    author: el.dataset.author || '',
    date: el.dataset.date || '',
    image: el.querySelector('meta[data-bt="image"]')?.getAttribute('content') || null,
    labels: readLinks(el.querySelectorAll('[data-bt="labels"] a')),
    snippet: text(el.querySelector('[data-bt="snippet"]')),
    bodyHtml: body ? body.innerHTML : null,
  }
}

export function enhanceBloggerImageUrl(url) {
  if (!url) return null
  let src = url.trim()
  if (src.startsWith('//')) src = `https:${src}`
  // Ganti ukuran thumbnail kecil (/s72-c/, /w72-h72/) menjadi ukuran resolusi tinggi HD
  return src
    .replace(/\/s72(-[a-zA-Z0-9_-]+)?\//, '/s1200/')
    .replace(/\/w\d+-h\d+[^/]*\//, '/s1200/')
}

export function parseFeedEntry(entry, blog = {}) {
  const alternateLink = entry.link?.find((l) => l.rel === 'alternate')?.href || '#'
  const id = entry.id?.$t || alternateLink
  const title = entry.title?.$t || 'Tanpa Judul'
  const author = entry.author?.[0]?.name?.$t || ''
  const date = entry.published?.$t || ''
  const contentHtml = entry.content?.$t || entry.summary?.$t || ''

  let image = enhanceBloggerImageUrl(entry.media$thumbnail?.url)
  if (!image && contentHtml) {
    const match = contentHtml.match(/<img[^>]+src=["']([^"']+)["']/i)
    if (match) image = enhanceBloggerImageUrl(match[1])
  }

  const searchBase = blog.searchUrl || '/search'
  const labels = (entry.category || []).map((c) => ({
    name: c.term,
    url: `${searchBase}/label/${encodeURIComponent(c.term)}`,
    count: null,
  }))

  const rawSnippet = entry.summary?.$t || contentHtml.replace(/<[^>]+>/g, ' ').trim()
  const cleanSnippet = rawSnippet.replace(/\s+/g, ' ').slice(0, 160).trim()

  return {
    id,
    title,
    url: alternateLink,
    author,
    date,
    image,
    labels,
    snippet: cleanSnippet ? `${cleanSnippet}…` : '',
    bodyHtml: entry.content?.$t || null,
  }
}

export async function fetchBloggerFeed(blog = {}) {
  try {
    const origin = (blog.homepageUrl || (typeof window !== 'undefined' ? window.location.origin : '')).replace(/\/+$/, '')
    const feedUrl = `${origin}/feeds/posts/default?alt=json&max-results=50`
    const res = await fetch(feedUrl)
    if (!res.ok) return null
    const json = await res.json()
    const entries = json.feed?.entry || []
    const posts = entries.map((e) => parseFeedEntry(e, blog))

    const labelCounts = {}
    for (const post of posts) {
      for (const l of post.labels) {
        labelCounts[l.name] = (labelCounts[l.name] || 0) + 1
      }
    }
    const labels = Object.keys(labelCounts).map((name) => ({
      name,
      url: `${blog.searchUrl || '/search'}/label/${encodeURIComponent(name)}`,
      count: labelCounts[name],
    }))

    return { posts, labels }
  } catch (err) {
    console.warn('[BloggerFeed] Fetch fallback gagal:', err)
    return null
  }
}

export function readBloggerData(container, globalData = window.BloggerData || {}) {
  const pager = container.querySelector('[data-bt="pager"]')
  return {
    blog: {
      title: globalData.blogTitle || document.title,
      homepageUrl: globalData.homepageUrl || '/',
      searchUrl: globalData.searchUrl || '/search',
      pageType: globalData.pageType || 'index',
      pageTitle: globalData.pageTitle || '',
      isMobile: Boolean(globalData.isMobile),
      apiBaseUrl: globalData.apiBaseUrl,
    },
    heading: text(container.querySelector('[data-bt="heading"]')),
    posts: Array.from(container.querySelectorAll('[data-bt="post"]')).map(readPost),
    labels: readLinks(container.querySelectorAll('nav[data-bt="labels"] .bt-label')),
    pager: {
      newer: pager?.querySelector('[data-bt="newer"]')?.getAttribute('href') || null,
      older: pager?.querySelector('[data-bt="older"]')?.getAttribute('href') || null,
    },
  }
}

const dateFormatter = new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' })

export function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? '' : dateFormatter.format(d)
}

export function readingTime(html) {
  if (!html) return null
  const words = html.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

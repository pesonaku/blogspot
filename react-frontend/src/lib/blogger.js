/**
 * Jembatan Blogger -> React.
 *
 * Sumber data:
 * 1. window.BloggerData  -> metadata global (judul blog, pageType, dll), ditulis
 *    oleh <script> di <head> template XML.
 * 2. Markup server-side di dalam #root -> daftar post, label, dan pager.
 *    Markup ini dirender Blogger (bagus untuk SEO & tanpa JS), lalu dibaca di sini
 *    sebelum React mengganti isi #root.
 *
 * Kontrak atribut `data-bt` harus sama dengan blogger-theme/template.xml.
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

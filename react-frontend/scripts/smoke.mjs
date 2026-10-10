import { readFileSync } from 'node:fs'
import { JSDOM } from 'jsdom'

const root = 'd:/Project Sistem/Github-Blogspot/react-frontend'
const js = readFileSync(`${root}/dist/blogger-theme.js`, 'utf8')
const html = readFileSync(`${root}/index.html`, 'utf8')
  .replace(/<script type="module"[^>]*><\/script>/, '')

async function run(page, emptyPosts = false) {
  let pageHtml = html
  if (emptyPosts) {
    // Kosongkan section posts dan labels untuk mensimulasikan keadaan Blogger SSR kosong
    pageHtml = pageHtml
      .replace(/<main data-bt="posts">[\s\S]*?<\/main>/, '<main data-bt="posts"></main>')
      .replace(/<nav class="bt-hidden" data-bt="labels">[\s\S]*?<\/nav>/, '<nav class="bt-hidden" data-bt="labels"></nav>')
  }

  const dom = new JSDOM(pageHtml, {
    url: `http://localhost:5173/${page ? `?page=${page}` : ''}`,
    runScripts: 'dangerously',
    pretendToBeVisual: true,
  })
  const w = dom.window

  // Mock fetch: sediakan feed Blogger bila dipanggil /feeds/posts/default
  w.fetch = async (url) => {
    if (String(url).includes('/feeds/posts/default')) {
      return {
        ok: true,
        json: async () => ({
          feed: {
            title: { $t: 'Pesona Kahuripan 18' },
            entry: [
              {
                id: { $t: 'tag:blogger.com,1999:blog-1.post-1' },
                title: { $t: 'Latihan Membuat Theme Blogspot dengan Menggunakan AI' },
                published: { $t: '2026-10-10T05:22:16Z' },
                author: [{ name: { $t: 'Arif Saefudin' } }],
                link: [
                  { rel: 'alternate', href: 'http://localhost:5173/2026/10/latihan-membuat-theme.html' },
                ],
                category: [{ term: 'artikel' }, { term: 'belajarAI' }, { term: 'perumahan' }],
                media$thumbnail: {
                  url: 'https://blogger.googleusercontent.com/img/b/123/s72-c/Pesona.png',
                },
                content: { $t: '<p>Ini adalah isi artikel latihan yang berhasil dimuat!</p>' },
              },
            ],
          },
        }),
      }
    }
    return {
      ok: true,
      json: async () => ({ status: 'Laravel API is running', laravel: '13.35.0' }),
    }
  }

  const errors = []
  w.addEventListener('error', (e) => errors.push(e.message))
  w.console.error = (...a) => errors.push(a.join(' '))
  w.eval(js)

  // Tunggu async feed fetch dan re-render React
  await new Promise((r) => setTimeout(r, 600))
  const d = w.document
  return {
    page: page || 'index',
    emptyPosts,
    errors,
    h1: d.querySelector('h1')?.textContent,
    cards: d.querySelectorAll('#post-list article').length,
    firstCardTitle: d.querySelector('#post-list article h2')?.textContent,
    chips: [...d.querySelectorAll('section[aria-label="Label"] a')].map((a) => a.textContent.trim()),
    api: d.querySelector('#api-status')?.textContent + ' / ' + d.querySelector('#api-status')?.dataset.status,
  }
}

console.log('--- TEST NORMAL ---')
console.log(JSON.stringify(await run(null, false)))

console.log('--- TEST FEED FALLBACK (SSR EMPTY) ---')
console.log(JSON.stringify(await run(null, true)))

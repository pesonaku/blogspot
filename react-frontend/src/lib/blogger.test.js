// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { enhanceBloggerImageUrl, parseFeedEntry, readBloggerData } from './blogger.js'

const markup = `
  <nav data-bt="labels">
    <a class="bt-label" data-name="Travel" data-count="12" href="/search/label/Travel">Travel</a>
  </nav>
  <main data-bt="posts">
    <h1 data-bt="heading">Label: Travel</h1>
    <article data-bt="post" data-id="7" data-title="Judul &amp; &quot;Kutip&quot;" data-url="https://x.blogspot.com/p.html" data-author="Ana" data-date="2026-10-08T06:30:00+07:00">
      <meta data-bt="image" content="https://img/1.jpg" />
      <div data-bt="labels"><a data-name="Travel" href="/search/label/Travel">Travel</a></div>
      <p data-bt="snippet">  Ringkasan  </p>
      <div data-bt="body"><p>Isi <b>tebal</b></p></div>
    </article>
    <nav data-bt="pager"><a data-bt="older" href="/older">Lebih lama</a></nav>
  </main>`

describe('readBloggerData', () => {
  it('membaca markup server-side Blogger dan window.BloggerData', () => {
    const el = document.createElement('div')
    el.innerHTML = markup
    const data = readBloggerData(el, { blogTitle: 'Blogku', pageType: 'item', isMobile: true })

    expect(data.blog).toMatchObject({ title: 'Blogku', pageType: 'item', isMobile: true })
    expect(data.heading).toBe('Label: Travel')
    expect(data.labels).toEqual([{ name: 'Travel', url: '/search/label/Travel', count: 12 }])
    expect(data.pager).toEqual({ newer: null, older: '/older' })
    expect(data.posts).toHaveLength(1)
    expect(data.posts[0]).toMatchObject({
      id: '7',
      title: 'Judul & "Kutip"',
      url: 'https://x.blogspot.com/p.html',
      author: 'Ana',
      image: 'https://img/1.jpg',
      snippet: 'Ringkasan',
      bodyHtml: '<p>Isi <b>tebal</b></p>',
      labels: [{ name: 'Travel', url: '/search/label/Travel', count: null }],
    })
  })

  it('memberi default aman bila data kosong', () => {
    const data = readBloggerData(document.createElement('div'), {})
    expect(data.posts).toEqual([])
    expect(data.blog.pageType).toBe('index')
  })
})

describe('enhanceBloggerImageUrl', () => {
  it('meningkatkan resolusi thumbnail s72-c menjadi s1200 HD', () => {
    const thumb = 'https://blogger.googleusercontent.com/img/b/123/s72-c/photo.jpg'
    expect(enhanceBloggerImageUrl(thumb)).toBe('https://blogger.googleusercontent.com/img/b/123/s1200/photo.jpg')
  })

  it('menangani URL berawalan //', () => {
    const thumb = '//blogger.googleusercontent.com/img/b/123/s72-c/photo.jpg'
    expect(enhanceBloggerImageUrl(thumb)).toBe('https://blogger.googleusercontent.com/img/b/123/s1200/photo.jpg')
  })
})

describe('parseFeedEntry', () => {
  it('mem-parsing feed entry JSON Blogger dengan benar', () => {
    const entry = {
      id: { $t: 'tag:blogger.com,1999:blog-123.post-456' },
      title: { $t: 'Latihan Membuat Theme Blogspot' },
      published: { $t: '2026-10-10T12:00:00Z' },
      author: [{ name: { $t: 'Arif Saefudin' } }],
      link: [
        { rel: 'self', href: 'https://blog.com/feed/456' },
        { rel: 'alternate', href: 'https://blog.com/2026/10/latihan.html' },
      ],
      media$thumbnail: {
        url: 'https://blogger.googleusercontent.com/img/b/123/s72-c/hero.png',
      },
      category: [{ term: 'artikel' }, { term: 'belajarAI' }],
      content: { $t: '<p>Halo dunia ini isi artikel lengkap</p>' },
    }

    const post = parseFeedEntry(entry, { searchUrl: 'https://blog.com/search' })
    expect(post.title).toBe('Latihan Membuat Theme Blogspot')
    expect(post.url).toBe('https://blog.com/2026/10/latihan.html')
    expect(post.author).toBe('Arif Saefudin')
    expect(post.image).toBe('https://blogger.googleusercontent.com/img/b/123/s1200/hero.png')
    expect(post.labels).toEqual([
      { name: 'artikel', url: 'https://blog.com/search/label/artikel', count: null },
      { name: 'belajarAI', url: 'https://blog.com/search/label/belajarAI', count: null },
    ])
    expect(post.bodyHtml).toBe('<p>Halo dunia ini isi artikel lengkap</p>')
    expect(post.snippet).toContain('Halo dunia ini isi artikel lengkap')
  })
})

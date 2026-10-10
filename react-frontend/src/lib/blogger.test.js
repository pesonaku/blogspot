// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { readBloggerData } from './blogger.js'

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

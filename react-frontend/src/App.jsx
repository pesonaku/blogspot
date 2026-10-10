import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import PostCard from './components/PostCard.jsx'
import PostDetail from './components/PostDetail.jsx'
import {
  Background,
  EmptyState,
  Footer,
  Hero,
  LabelCloud,
  PageHeading,
  Pager,
} from './components/Layout.jsx'
import { fetchBloggerFeed } from './lib/blogger.js'

function PostSkeleton() {
  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-5 pb-12 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((n) => (
        <div key={n} className="glass animate-pulse rounded-3xl p-6">
          <div className="aspect-video w-full rounded-2xl bg-white/5" />
          <div className="mt-4 h-4 w-1/3 rounded bg-white/10" />
          <div className="mt-3 h-6 w-3/4 rounded bg-white/10" />
          <div className="mt-2 h-4 w-full rounded bg-white/5" />
        </div>
      ))}
    </div>
  )
}

/**
 * Routing tetap dikendalikan Blogger (server-side). React memilih
 * tampilan berdasarkan blog.pageType: index | archive | item | static_page | error_page.
 *
 * Bila SSR tidak menyediakan post (misal tema baru diterapkan dan Blogger belum
 * me-render widget), App secara otomatis mengambil data via feed JSON Blogger.
 */
export default function App({ data }) {
  const { blog, heading, pager } = data
  const isSingle = blog.pageType === 'item' || blog.pageType === 'static_page'

  const [posts, setPosts] = useState(data.posts || [])
  const [labels, setLabels] = useState(data.labels || [])
  const [loading, setLoading] = useState(
    (data.posts || []).length === 0 && blog.pageType !== 'error_page',
  )

  useEffect(() => {
    if (posts.length === 0 && blog.pageType !== 'error_page') {
      let isMounted = true
      fetchBloggerFeed(blog)
        .then((result) => {
          if (!isMounted || !result) return
          if (result.posts && result.posts.length > 0) {
            let activePosts = result.posts
            if (isSingle && typeof window !== 'undefined') {
              const currentPath = window.location.pathname
              const matched = result.posts.find((p) => {
                try {
                  return new URL(p.url).pathname === currentPath
                } catch {
                  return p.url.includes(currentPath)
                }
              })
              if (matched) activePosts = [matched]
            }
            setPosts(activePosts)
          }
          if (labels.length === 0 && result.labels && result.labels.length > 0) {
            setLabels(result.labels)
          }
        })
        .finally(() => {
          if (isMounted) setLoading(false)
        })
      return () => {
        isMounted = false
      }
    }
  }, [blog, isSingle, labels.length, posts.length])

  let content
  if (blog.pageType === 'error_page') {
    content = <EmptyState blog={blog} title="404" message="Halaman yang kamu cari tidak ditemukan." />
  } else if (loading) {
    content = (
      <>
        <Hero blog={blog} postCount={0} />
        <PostSkeleton />
      </>
    )
  } else if (isSingle && posts[0]) {
    content = <PostDetail post={posts[0]} blog={blog} isPage={blog.pageType === 'static_page'} />
  } else if (posts.length === 0) {
    content = <EmptyState blog={blog} title="Kosong" message="Belum ada artikel di sini." />
  } else {
    const isHome = blog.pageType === 'index' && !heading
    content = (
      <>
        {isHome ? (
          <Hero blog={blog} postCount={posts.length} />
        ) : (
          <PageHeading>{heading || blog.pageTitle || 'Arsip'}</PageHeading>
        )}
        {isHome && <LabelCloud labels={labels} />}
        <section id="post-list" className="mx-auto grid max-w-6xl gap-6 px-5 pb-12 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} featured={isHome && i === 0} />
          ))}
        </section>
        <Pager pager={pager} />
      </>
    )
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <Background />
      <Header blog={blog} />
      <main className="flex-1">{content}</main>
      <Footer blog={blog} />
    </div>
  )
}

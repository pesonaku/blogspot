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

/**
 * Routing tetap dikendalikan Blogger (server-side). React hanya memilih
 * tampilan berdasarkan blog.pageType: index | archive | item | static_page | error_page.
 */
export default function App({ data }) {
  const { blog, posts, labels, pager, heading } = data
  const isSingle = blog.pageType === 'item' || blog.pageType === 'static_page'

  let content
  if (blog.pageType === 'error_page') {
    content = <EmptyState blog={blog} title="404" message="Halaman yang kamu cari tidak ditemukan." />
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

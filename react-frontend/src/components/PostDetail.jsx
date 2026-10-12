import { readingTime } from '../lib/blogger.js'
import { Cover, PostMeta } from './PostCard.jsx'

/** Halaman post tunggal / static page. Body HTML berasal dari Blogger (konten pemilik blog). */
export default function PostDetail({ post, blog, isPage = false }) {
  const minutes = readingTime(post.bodyHtml)

  return (
    <article className="mx-auto max-w-3xl animate-fade-up px-5 pb-20 pt-6">
      <a href={blog.homepageUrl} id="back-home" className="btn-ghost mb-8 !px-4 !py-2 text-xs">
        ← Kembali ke beranda
      </a>

      {!isPage && post.labels.length > 0 && (
        <div className="mb-5 flex flex-wrap gap-2">
          {post.labels.map((l) => (
            <a key={l.name} href={l.url} className="chip">#{l.name}</a>
          ))}
        </div>
      )}

      <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-emerald-950 dark:text-white md:text-5xl">
        {post.title}
      </h1>

      {!isPage && (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <PostMeta post={post} />
          {minutes && <span className="text-xs text-slate-500 dark:text-emerald-300/60">· {minutes} menit baca</span>}
        </div>
      )}

      {post.image && (
        <div className="group mt-10 aspect-video overflow-hidden rounded-3xl border border-emerald-500/20 shadow-2xl shadow-emerald-950/40">
          <Cover post={post} />
        </div>
      )}

      <div
        id="post-body"
        className="prose dark:prose-invert prose-lg mt-10 max-w-none prose-headings:font-display prose-headings:text-emerald-950 dark:prose-headings:text-white prose-a:text-emerald-700 dark:prose-a:text-emerald-300 hover:prose-a:text-emerald-500 prose-img:rounded-2xl prose-pre:border prose-pre:border-emerald-500/20 prose-pre:bg-emerald-950"
        dangerouslySetInnerHTML={{ __html: post.bodyHtml || '' }}
      />
    </article>
  )
}

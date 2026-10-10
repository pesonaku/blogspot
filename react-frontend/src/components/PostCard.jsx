import { formatDate } from '../lib/blogger.js'

export function Cover({ post, className = '' }) {
  if (post.image) {
    return (
      <img
        src={post.image}
        alt={post.title}
        loading="lazy"
        className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${className}`}
      />
    )
  }
  // Fallback bila post tidak punya gambar: gradient + huruf awal judul.
  return (
    <div
      className={`grid h-full w-full place-items-center bg-gradient-to-br from-violet-600/40 via-fuchsia-600/30 to-amber-500/30 ${className}`}
    >
      <span className="font-display text-6xl font-bold text-white/70">{post.title.charAt(0)}</span>
    </div>
  )
}

export function PostMeta({ post }) {
  const date = formatDate(post.date)
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
      {post.author && <span className="font-medium text-slate-300">{post.author}</span>}
      {post.author && date && <span className="h-1 w-1 rounded-full bg-slate-600" />}
      {date && <time dateTime={post.date}>{date}</time>}
    </div>
  )
}

export default function PostCard({ post, index = 0, featured = false }) {
  return (
    <article
      className={`group glass relative flex animate-fade-up flex-col overflow-hidden rounded-3xl transition duration-500 hover:-translate-y-1 hover:border-violet-400/30 hover:shadow-2xl hover:shadow-violet-900/30 ${
        featured ? 'md:col-span-2 md:flex-row' : ''
      }`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <a
        href={post.url}
        className={`block overflow-hidden ${featured ? 'aspect-video md:aspect-auto md:w-3/5' : 'aspect-video'}`}
        tabIndex={-1}
        aria-hidden="true"
      >
        <Cover post={post} />
      </a>

      <div className={`flex flex-1 flex-col gap-3 p-6 ${featured ? 'md:justify-center md:p-10' : ''}`}>
        {post.labels.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.labels.slice(0, 3).map((l) => (
              <a key={l.name} href={l.url} className="chip relative z-10">#{l.name}</a>
            ))}
          </div>
        )}
        <h2
          className={`font-display font-semibold leading-tight text-white transition group-hover:text-violet-200 ${
            featured ? 'text-3xl md:text-4xl' : 'text-xl'
          }`}
        >
          <a href={post.url} className="after:absolute after:inset-0 after:content-['']">{post.title}</a>
        </h2>
        {post.snippet && (
          <p className={`text-sm leading-relaxed text-slate-400 ${featured ? 'line-clamp-4' : 'line-clamp-3'}`}>
            {post.snippet}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between pt-2">
          <PostMeta post={post} />
          <span className="text-sm font-semibold text-violet-300 transition group-hover:translate-x-1">Baca →</span>
        </div>
      </div>
    </article>
  )
}

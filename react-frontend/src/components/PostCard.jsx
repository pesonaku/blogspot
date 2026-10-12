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
  // Fallback bila post tidak punya gambar: gradient nuansa hijau tropis + huruf awal judul.
  return (
    <div
      className={`grid h-full w-full place-items-center bg-gradient-to-br from-emerald-700/50 via-teal-700/40 to-lime-600/30 ${className}`}
    >
      <span className="font-display text-6xl font-bold text-white/80">{post.title.charAt(0)}</span>
    </div>
  )
}

export function PostMeta({ post }) {
  const date = formatDate(post.date)
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-emerald-200/60">
      {post.author && <span className="font-medium text-emerald-950 dark:text-emerald-100">{post.author}</span>}
      {post.author && date && <span className="h-1 w-1 rounded-full bg-emerald-500/50" />}
      {date && <time dateTime={post.date}>{date}</time>}
    </div>
  )
}

export default function PostCard({ post, index = 0, featured = false }) {
  return (
    <article
      className={`group glass relative flex animate-fade-up flex-col overflow-hidden rounded-3xl transition duration-500 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-2xl hover:shadow-emerald-950/20 ${
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
          className={`font-display font-semibold leading-tight text-emerald-950 dark:text-white transition group-hover:text-emerald-600 dark:group-hover:text-emerald-300 ${
            featured ? 'text-3xl md:text-4xl' : 'text-xl'
          }`}
        >
          <a href={post.url} className="after:absolute after:inset-0 after:content-['']">{post.title}</a>
        </h2>
        {post.snippet && (
          <p className={`text-sm leading-relaxed text-slate-600 dark:text-emerald-100/70 ${featured ? 'line-clamp-4' : 'line-clamp-3'}`}>
            {post.snippet}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between pt-2">
          <PostMeta post={post} />
          <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 transition group-hover:translate-x-1">Baca →</span>
        </div>
      </div>
    </article>
  )
}

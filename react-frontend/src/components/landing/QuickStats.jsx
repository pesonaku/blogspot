import { quickStats } from './propertyData.js'

export function QuickStats({ config = {} }) {
  const stats = quickStats.map((item, index) => {
    const numKey = `stat${index + 1}_num`
    const labelKey = `stat${index + 1}_label`
    const descKey = `stat${index + 1}_desc`
    return {
      ...item,
      value: config[numKey] || item.value,
      label: config[labelKey] || item.label,
      description: config[descKey] || item.description,
    }
  })

  return (
    <section id="quick-stats" className="relative -mt-6 md:-mt-10 z-20 mx-auto max-w-6xl px-5 pb-16">
      <div className="glass rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-emerald-500/10 dark:divide-white/10">
          {stats.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-col items-center text-center px-3 ${index > 0 ? 'pt-4 lg:pt-0' : ''}`}
            >
              <span className="text-gradient font-display text-3xl md:text-4xl font-extrabold">
                {item.value}
              </span>
              <p className="mt-1 text-sm font-bold text-emerald-950 dark:text-white tracking-tight">
                {item.label}
              </p>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-emerald-300/60">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

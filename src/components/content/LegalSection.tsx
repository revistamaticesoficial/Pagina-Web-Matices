import type { ReactNode } from "react"

interface LegalSectionProps {
  id: string
  title: string
  description: ReactNode
  bullets?: { title: string; description: string }[]
  children?: ReactNode
}

export function LegalSection({ id, title, description, bullets, children }: LegalSectionProps) {
  return (
    <section
      id={id}
      className="rounded-3xl border border-slate-100 bg-white p-6 md:p-8 shadow-sm scroll-mt-24"
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        <p className="text-base text-slate-600 leading-relaxed">{description}</p>
        {bullets && (
          <div className="space-y-4">
            {bullets.map((item) => (
              <div key={item.title} className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900 mb-1">{item.title}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}


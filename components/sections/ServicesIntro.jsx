'use client'

// ServicesIntro — the Services page intro. Owns the shared hover state
// between the service list (left column) and the ServicesVisual (right
// column): hovering/focusing a service highlights its matching shape.
import { useState } from 'react'
import SplitIntro from '@/components/shared/SplitIntro'
import ServicesVisual from '@/components/visuals/ServicesVisual'
import { SERVICES } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function ServicesIntro() {
  const [active, setActive] = useState(null)

  return (
    <SplitIntro visual={<ServicesVisual active={active} />}>
      <span className="text-caption text-ice/70">Services & pricing</span>
      <h1 className="mt-4 text-offwhite">
        Your full growth engine, in one place.
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-ice/80">
        Web development, social media, and performance marketing — one
        integrated system, with reporting that ties every channel back to
        revenue.
      </p>

      <ul className="mt-9 space-y-1.5">
        {SERVICES.map((service, i) => {
          const isActive = active === service.id
          return (
            <li key={service.id}>
              <a
                href="#pricing"
                onMouseEnter={() => setActive(service.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(service.id)}
                onBlur={() => setActive(null)}
                className={cn(
                  'group inline-flex items-center gap-3 rounded-md py-1.5 pr-3 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
                  isActive ? 'text-white' : 'text-ice/70 hover:text-white'
                )}
              >
                <span className="text-caption text-brand">0{i + 1}</span>
                <span className="font-heading text-lg font-semibold tracking-tight">
                  {service.title}
                </span>
                <span
                  className={cn(
                    'text-caption transition-colors',
                    isActive ? 'text-ice/60' : 'text-ice/30'
                  )}
                >
                  View pricing
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </SplitIntro>
  )
}

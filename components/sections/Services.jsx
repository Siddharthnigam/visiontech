'use client'

// Services — asymmetric 40/60 split: sticky intro rail beside an editorial
// numbered list (01 / 02 / 03). Each row expands its deliverable preview on
// hover, on tap (click), and on keyboard (Enter/Space on the header button).
// Every service links onward via a "Learn more" link.
import { useState } from 'react'
import PropTypes from 'prop-types'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { SERVICES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import ScrollReveal, {
  StaggerGroup,
  StaggerItem,
} from '@/components/shared/ScrollReveal'

export default function Services() {
  return (
    <section id="services" className="bg-offwhite py-20 lg:py-28">
      <div className="container grid gap-14 lg:grid-cols-[2fr_3fr] lg:gap-24">
        {/* Sticky intro rail — 40% */}
        <div className="max-w-md lg:sticky lg:top-10 lg:self-start">
          <ScrollReveal>
            <span className="text-caption text-brand">What we do</span>
            <h2 className="mt-4 text-navy">Three disciplines. One system.</h2>
            <p className="mt-6 text-lg leading-relaxed text-navy/70">
              Your website, social channels, and paid growth work best when they
              reinforce each other. We run all three as one integrated system —
              with reporting that ties every channel back to revenue.
            </p>
            <p className="mt-10 hidden text-small text-navy/50 lg:block">
              Hover, tap, or press Enter on a service to preview what’s
              included.
            </p>
          </ScrollReveal>
        </div>

        {/* Editorial numbered list — 60% */}
        <StaggerGroup as="ol" className="border-t border-navy/10 lg:mt-2">
          {SERVICES.map((service, i) => (
            <ServiceRow key={service.id} service={service} index={i} />
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}

// ServiceRow — one editorial list item. Expands its preview when the row is
// hovered, when the header button is clicked/tapped, or when the header
// button is activated with Enter/Space (native button behavior).
function ServiceRow({ service, index }) {
  const [expanded, setExpanded] = useState(false)
  const [hovered, setHovered] = useState(false)
  const open = expanded || hovered
  const odd = index % 2 === 1

  return (
    <StaggerItem
      as="li"
      className={cn(
        'border-b border-navy/10 py-14 lg:py-16',
        odd && 'lg:pt-24'
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        {/* Text column — alternating alignment per row */}
        <div className={cn(odd && 'lg:order-2 lg:text-right')}>
          <h3 className="mt-3 text-3xl text-navy lg:text-4xl">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              aria-controls={`service-panel-${service.id}`}
              className={cn(
                'inline-flex max-w-full items-center gap-3 text-left transition-colors hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
                odd && 'lg:flex-row-reverse lg:text-right'
              )}
            >
              <span className="text-caption text-brand">0{index + 1}</span>
              <span>{service.title}</span>
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  'h-5 w-5 shrink-0 transition-transform duration-300',
                  expanded && 'rotate-180'
                )}
              />
            </button>
          </h3>

          <p
            className={cn(
              'mt-4 text-lg leading-relaxed text-navy/70',
              odd && 'lg:ml-auto'
            )}
          >
            {service.description}
          </p>

          <ul
            className={cn(
              'mt-6 space-y-2 text-small text-navy/60',
              odd && 'lg:ml-auto'
            )}
          >
            {service.features.map((feature) => (
              <li key={feature} className={cn(odd && 'lg:text-right')}>
                {feature}
              </li>
            ))}
          </ul>

          <Link
            href={`/contact?service=${service.id}`}
            className={cn(
              'mt-8 inline-flex items-center gap-2 text-small font-semibold text-brand transition-colors hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
              odd && 'lg:flex-row-reverse'
            )}
          >
            Learn more
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Preview panel — collapsed on mobile until opened, revealed on
            hover/tap on desktop via `open` */}
        <ServicePreview service={service} open={open} odd={odd} />
      </div>
    </StaggerItem>
  )
}

ServiceRow.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
}

// ServicePreview — placeholder deliverable graphic shown inside the
// expandable panel of each service row.
function ServicePreview({ service, open, odd }) {
  return (
    <div
      id={`service-panel-${service.id}`}
      className={cn(
        'overflow-hidden transition-[max-height,opacity] duration-300',
        open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        'lg:max-h-none',
        odd && 'lg:order-1'
      )}
    >
      <div className="relative h-48 overflow-hidden rounded-lg border border-dashed border-navy/25 bg-white lg:aspect-[4/3] lg:h-auto">
        <div className="absolute inset-0 grid place-items-center">
          <span className="text-caption text-navy/40">
            {service.title} — deliverable preview
          </span>
        </div>
        <span
          className="absolute right-3 top-3 h-2 w-2 rounded-full bg-brand"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

ServicePreview.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  odd: PropTypes.bool.isRequired,
}

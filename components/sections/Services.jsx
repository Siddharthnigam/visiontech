'use client'

// Services — responsive layout:
// DESKTOP (lg+): left sticky heading + right list, content ALWAYS visible.
//   No accordion, no chevron — description and features shown by default.
// MOBILE (<lg):  accordion — tap title to expand/collapse.
// Uses useWindowSize to detect breakpoint and skip inline max-height on desktop.

import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { SERVICES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import ScrollReveal, {
  StaggerGroup,
  StaggerItem,
} from '@/components/shared/ScrollReveal'

// Simple hook: returns true when viewport is lg (1024px) or wider.
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    setIsDesktop(mq.matches)
    const handler = (e) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return isDesktop
}

export default function Services() {
  return (
    <section id="services" className="bg-offwhite py-20 lg:py-28">
      <div className="container grid gap-14 lg:grid-cols-[2fr_3fr] lg:gap-24">

        {/* Left sticky heading — sticky only on desktop */}
        <div className="lg:sticky lg:top-10 lg:self-start">
          <ScrollReveal>
            <span className="text-caption text-brand">What we do</span>
            <h2 className="mt-4 text-navy">
              Three disciplines.
              <br />
              One system.
            </h2>
            <p className="mt-6 max-w-xs text-lg leading-relaxed text-navy/70">
              Your website, social channels, and growth campaigns work best
              when they reinforce each other. We run all three as one
              integrated system — with reporting that ties every channel back
              to revenue.
            </p>
            <div className="accent-rule mt-10" aria-hidden="true" />
          </ScrollReveal>
        </div>

        {/* Right service list */}
        <StaggerGroup as="ol" className="border-t border-navy/10">
          {SERVICES.map((service, i) => (
            <ServiceRow key={service.id} service={service} index={i} />
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}

function ServiceRow({ service, index }) {
  const [open, setOpen] = useState(false)
  const isDesktop = useIsDesktop()

  return (
    <StaggerItem as="li" className="border-b border-navy/10">

      {/* ── Mobile: accordion button (hidden on desktop) ── */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`svc-panel-${service.id}`}
        className="flex w-full items-center gap-4 py-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:hidden"
      >
        <span className="text-caption w-6 shrink-0 text-brand">
          0{index + 1}
        </span>
        <span
          className={cn(
            'flex-1 font-heading text-xl font-semibold tracking-tight transition-colors',
            open ? 'text-brand' : 'text-navy'
          )}
        >
          {service.title}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            'h-5 w-5 shrink-0 text-navy/40 transition-transform duration-300',
            open && 'rotate-180 text-brand'
          )}
        />
      </button>

      {/* ── Desktop: static title row (hidden on mobile) ── */}
      <div className="hidden flex-col gap-1 py-7 lg:flex">
        <div className="flex items-center gap-4">
          <span className="text-caption w-6 shrink-0 text-brand">
            0{index + 1}
          </span>
          <span className="font-heading text-2xl font-semibold tracking-tight text-navy">
            {service.title}
          </span>
        </div>
        {service.tagline && (
          <p className="pl-10 text-small font-medium text-navy/50">
            {service.tagline}
          </p>
        )}
      </div>

      {/* ── Content panel ──
          Desktop: always fully visible (no max-height constraint)
          Mobile:  controlled by accordion open state               ── */}
      <div
        id={`svc-panel-${service.id}`}
        role="region"
        style={
          isDesktop
            ? { maxHeight: 'none', overflow: 'visible' }
            : {
                maxHeight: open ? '600px' : '0px',
                overflow: 'hidden',
                transition: 'max-height 0.35s ease',
              }
        }
      >
        <div className="pb-8 pl-10 pr-2">
          <p className="text-base leading-relaxed text-navy/70 lg:text-lg">
            {service.description}
          </p>

          <ul className="mt-5 space-y-2.5">
            {service.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-3 text-small text-navy/60"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                  aria-hidden="true"
                />
                {f}
              </li>
            ))}
          </ul>

          <Link
            href={`/services/${service.id}`}
            className="mt-3 inline-flex items-center gap-2 rounded-md border border-brand/30 px-4 py-2 text-small font-semibold text-brand transition-all hover:bg-brand hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            View Details
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>

          <Link
            href={`/contact?service=${service.id}`}
            className="mt-7 inline-flex items-center gap-2 text-small font-semibold text-brand transition-colors hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Get started
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

    </StaggerItem>
  )
}

ServiceRow.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
}

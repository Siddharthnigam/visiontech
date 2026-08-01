import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ServicesIntro from '@/components/sections/ServicesIntro'
import TechMarquee from '@/components/sections/TechMarquee'
import PricingMatrix from '@/components/sections/PricingMatrix'
import Testimonials from '@/components/sections/Testimonials'
import Faq from '@/components/sections/Faq'
import CtaBand from '@/components/sections/CtaBand'
import { SERVICES, SITE_URL } from '@/lib/constants'

export const metadata = {
  title: 'Services — Vision Tech',
  description:
    'Web development, social media management, and performance marketing — one integrated system built to grow your business.',
  openGraph: {
    title: 'Services — Vision Tech',
    description:
      'Web development, social media management, and performance marketing — one integrated system built to grow your business.',
    url: `${SITE_URL}/services`,
    type: 'website',
  },
}

// ── Service card ──────────────────────────────────────────────────────────────
function ServiceCard({ service, index }) {
  return (
    <article className="group relative flex flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-soft transition-all hover:border-brand/30 hover:shadow-elevated">
      {/* Number badge */}
      <span className="text-caption text-brand">0{index + 1}</span>

      {/* Title */}
      <h3 className="mt-2 font-heading text-xl font-semibold tracking-tight text-navy group-hover:text-brand lg:text-2xl">
        {service.title}
      </h3>

      {/* Tagline */}
      {service.tagline && (
        <p className="mt-1.5 text-small font-medium italic text-brand/70">
          {service.tagline}
        </p>
      )}

      {/* Divider */}
      <div className="my-4 h-px w-10 bg-brand/20" aria-hidden="true" />

      {/* Description */}
      <p className="flex-1 text-sm leading-relaxed text-navy/65">
        {service.description}
      </p>

      {/* Features */}
      <ul className="mt-5 space-y-2">
        {service.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-small text-navy/60">
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
              aria-hidden="true"
            />
            {f}
          </li>
        ))}
      </ul>

      {/* Buttons */}
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`/services/${service.id}`}
          className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-small font-semibold text-white shadow-soft transition-all hover:bg-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          View Details
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
        <Link
          href={`/contact?service=${service.id}`}
          className="inline-flex items-center gap-2 rounded-md border border-navy/20 px-4 py-2 text-small font-semibold text-navy transition-all hover:border-brand hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Get Started
        </Link>
      </div>
    </article>
  )
}

export default function ServicesPage() {
  return (
    <main>
      {/* 1 — Hero intro */}
      <ServicesIntro />

      {/* 2 — Tech stack marquee */}
      <TechMarquee />

      {/* 3 — Three service cards */}
      <section id="services" className="bg-offwhite py-20 lg:py-28">
        <div className="container">
          {/* Section heading */}
          <div className="mb-12 max-w-2xl">
            <span className="text-caption text-brand">What we do</span>
            <h2 className="mt-3 text-navy">
              Three disciplines. One system.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-navy/65">
              Choose one service to get started, or run all three as a single
              integrated growth engine. Every engagement is scoped to your goals.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}

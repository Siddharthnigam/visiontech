import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { SERVICES, SITE_URL } from '@/lib/constants'

export function generateStaticParams() {
  return SERVICES.map((s) => ({ id: s.id }))
}
export const dynamicParams = false

export async function generateMetadata({ params }) {
  const { id } = await params
  const service = SERVICES.find((s) => s.id === id)
  if (!service) return {}
  return {
    title: `${service.title} — Vision Tech`,
    description: service.description,
    openGraph: {
      title: `${service.title} — Vision Tech`,
      description: service.description,
      url: `${SITE_URL}/services/${id}`,
      type: 'website',
    },
  }
}

export default async function ServiceDetailPage({ params }) {
  const { id } = await params
  const service = SERVICES.find((s) => s.id === id)
  if (!service) notFound()

  const idx = SERVICES.indexOf(service)
  const others = SERVICES.filter((s) => s.id !== id)
  const d = service.details

  return (
    <main>

      {/* ── 1. Hero ── */}
      <section className="noise-overlay relative overflow-hidden bg-navy text-offwhite">
        <div className="container py-14 lg:py-20">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-small font-semibold text-ice/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All Services
          </Link>

          <div className="mt-8 max-w-3xl">
            <span className="text-caption text-brand">0{idx + 1} — Vision Tech</span>
            <h1 className="mt-3 text-offwhite">{service.title}</h1>
            {service.tagline && (
              <p className="mt-3 text-lg font-medium italic text-ice/65">
                {service.tagline}
              </p>
            )}
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ice/75 lg:text-lg">
              {d.intro}
            </p>
            <Link
              href={`/contact?service=${service.id}`}
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3 font-heading text-sm font-semibold text-white transition-all hover:bg-white hover:text-brand"
            >
              Get Started
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. Stats strip ── */}
      <section className="bg-brand">
        <div className="container">
          <dl className="grid grid-cols-2 divide-x divide-white/10 lg:grid-cols-4">
            {d.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center px-6 py-8 text-center">
                <dt className="font-heading text-3xl font-semibold text-white lg:text-4xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-small text-white/65">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── 3. What we deliver ── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="container grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-20">
          {/* Left sticky */}
          <div className="lg:sticky lg:top-12 lg:self-start">
            <span className="text-caption text-brand">What we deliver</span>
            <h2 className="mt-3 text-navy">Everything included.</h2>
            <p className="mt-4 max-w-xs text-base leading-relaxed text-navy/60">
              Every step is managed in-house, with clear deliverables at each stage — no
              handoffs, no surprises.
            </p>
            <Link
              href={`/contact?service=${service.id}`}
              className="mt-7 inline-flex items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-small font-semibold text-white transition-colors hover:bg-navy"
            >
              Request a Quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Right: delivery cards */}
          <ol className="space-y-4">
            {d.whatWeDeliver.map((item, i) => (
              <li
                key={item.title}
                className="flex gap-5 rounded-xl border border-navy/8 bg-white p-6 shadow-soft"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 font-heading text-sm font-bold text-brand">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-heading text-base font-semibold text-navy lg:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy/60">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 4. Why it matters ── */}
      <section className="bg-ice py-14 lg:py-20">
        <div className="container max-w-3xl">
          <span className="text-caption text-brand">Why it matters</span>
          <h2 className="mt-3 text-navy">The real cost of getting this wrong.</h2>
          <p className="mt-5 text-lg leading-relaxed text-navy/70">{d.whyItMatters}</p>
        </div>
      </section>

      {/* ── 5. Included features ── */}
      <section className="bg-white py-14 lg:py-20">
        <div className="container">
          <span className="text-caption text-brand">Included as standard</span>
          <h2 className="mt-3 text-navy">What you get.</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {service.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 rounded-lg border border-navy/8 bg-offwhite px-5 py-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                <span className="text-sm font-medium text-navy">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 6. Our process ── */}
      <section className="bg-offwhite py-14 lg:py-20">
        <div className="container">
          <span className="text-caption text-brand">Our process</span>
          <h2 className="mt-3 text-navy">How we work.</h2>
          <ol className="mt-8 flex flex-col gap-0 lg:flex-row">
            {d.process.map((step, i) => (
              <li
                key={step}
                className="flex flex-1 items-start gap-4 lg:flex-col lg:gap-3"
              >
                {/* Connector line on desktop */}
                <div className="flex flex-col items-center lg:flex-row lg:w-full">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand font-heading text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  {i < d.process.length - 1 && (
                    <span className="ml-3.5 h-8 w-px bg-navy/10 lg:ml-0 lg:mt-0 lg:h-px lg:flex-1 lg:w-auto" aria-hidden="true" />
                  )}
                </div>
                <p className="pb-6 text-sm font-medium text-navy/70 lg:pb-0 lg:pr-4 lg:pt-2">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 7. Other services — smaller compact cards ── */}
      <section className="bg-navy py-12 lg:py-16">
        <div className="container">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="text-caption text-ice/40">More from Vision Tech</span>
              <h3 className="mt-2 font-heading text-xl font-semibold text-offwhite lg:text-2xl">
                Explore our other services.
              </h3>
            </div>
            <Link
              href="/services"
              className="shrink-0 text-small font-semibold text-brand transition-colors hover:text-ice"
            >
              View all
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {others.map((other) => (
              <Link
                key={other.id}
                href={`/services/${other.id}`}
                className="group flex items-center justify-between gap-4 rounded-xl border border-white/8 bg-white/5 px-5 py-4 transition-all hover:border-brand/40 hover:bg-white/8"
              >
                <div className="min-w-0">
                  <span className="text-caption text-brand">0{SERVICES.indexOf(other) + 1}</span>
                  <p className="mt-0.5 font-heading text-base font-semibold text-offwhite group-hover:text-brand">
                    {other.title}
                  </p>
                  <p className="mt-1 truncate text-small text-ice/45">
                    {other.tagline}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 shrink-0 text-ice/30 transition-transform group-hover:translate-x-1 group-hover:text-brand" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { CASE_STUDIES, SITE_URL } from '@/lib/constants'
import { categoryLabel, cn } from '@/lib/utils'

// Pre-render every case study slug from the constants file.
export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }))
}

// Do not generate unknown slugs on demand — unmatched URLs 404.
export const dynamicParams = false

export async function generateMetadata({ params }) {
  const { slug } = await params
  const study = CASE_STUDIES.find((s) => s.slug === slug)
  if (!study) return {}
  return {
    title: `${study.client} — ${study.result}`,
    description: `${study.title} for ${study.client}: ${study.result}. ${study.summary}`,
    openGraph: {
      title: `${study.client} — ${study.result}`,
      description: `${study.title} for ${study.client}. ${study.summary}`,
      url: `${SITE_URL}/case-studies/${study.slug}`,
      type: 'article',
    },
  }
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params
  const study = CASE_STUDIES.find((s) => s.slug === slug)
  if (!study) notFound()

  return (
    <>
      {/* Hero — headline result stat on navy */}
      <section className="noise-overlay relative overflow-hidden bg-navy text-offwhite">
        <div className="container py-16 lg:py-24">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-small font-semibold text-ice/80 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All work
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-caption text-ice/70">
                {categoryLabel(study.category)} · {study.client}
              </p>
              <h1 className="mt-4 max-w-2xl text-offwhite">{study.title}</h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ice/80">
                {study.summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {study.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-ice/25 px-3 py-1 text-caption text-ice/80"
                  >
                    {service}
                  </span>
                ))}
                <span className="rounded-full border border-ice/25 px-3 py-1 text-caption text-ice/80">
                  {study.duration}
                </span>
              </div>
            </div>

            <div className="lg:text-right">
              <p className="text-caption text-ice/70">Headline result</p>
              <p className="mt-2 font-heading text-5xl font-semibold tracking-tight text-offwhite lg:text-6xl">
                {study.result}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative — challenge → approach → result, then gallery */}
      <section className="bg-offwhite py-20 lg:py-28">
        <div className="container max-w-3xl">
          {/* Challenge */}
          <div>
            <span className="text-caption text-brand">The challenge</span>
            <h2 className="mt-3 text-2xl text-navy lg:text-3xl">
              Where they were stuck
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-navy/70">
              {study.challenge}
            </p>
          </div>

          {/* Approach */}
          <div className="mt-16">
            <span className="text-caption text-brand">The approach</span>
            <h2 className="mt-3 text-2xl text-navy lg:text-3xl">
              How we got there
            </h2>
            <ol className="mt-6 space-y-6">
              {study.approach.map((step, i) => (
                <li key={step} className="flex gap-5">
                  <span className="font-heading text-2xl font-semibold tracking-tight text-brand/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="pt-1 leading-relaxed text-navy/70">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Result */}
          <div className="mt-16 rounded-lg border border-brand/30 bg-white p-8 lg:p-10">
            <span className="text-caption text-brand">The result</span>
            <h2 className="mt-3 text-2xl text-navy lg:text-3xl">
              What changed
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-navy/70">
              {study.outcome}
            </p>
            <p className="mt-6 font-heading text-4xl font-semibold tracking-tight text-brand">
              {study.result}
            </p>
          </div>

          {/* Gallery */}
          <div className="mt-16">
            <span className="text-caption text-brand">Gallery</span>
            <h2 className="mt-3 text-2xl text-navy lg:text-3xl">
              Work in the wild
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {study.gallery.map((src, i) => (
                <div
                  key={src}
                  className={cn(
                    'relative aspect-[4/3] overflow-hidden rounded-lg border border-navy/10 bg-white',
                    i === 0 && 'sm:col-span-2'
                  )}
                >
                  <Image
                    src={src}
                    alt={`${study.client} case study visual ${i + 1}`}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

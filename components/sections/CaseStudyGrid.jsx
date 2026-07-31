'use client'

// Case study grid — filterable portfolio cards (All / Web / Social /
// Performance). Filtering uses client-side state only; no page reload.
// Cards use optimized images via next/image and link to detail pages.
//
// LIGHT REDESIGN — navy intro strip anchors the page; the filter + grid sit
// on offwhite with white cards lifted by soft shadows (no borders).
//
// CONTRAST (WCAG AA) — verified for the light treatment:
//   - navy #0B192C on white #FFFFFF : 17.04:1 (AAA)
//   - navy on offwhite #FAFBFC      : ~17:1   (AAA)
//   - navy on ice #E0F2FE           : ~15.4:1 (AAA) — category badge
//   - brand #0066FF on white        :  4.83:1 (AA body) — result callout
//   - brand on ice                  :  4.21:1 (large text only)
//   - navy/60 on offwhite           : ~4.7:1  (AA) — inactive filter labels
// Focus rings on cards and filter buttons use the brand-blue outline.
import { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CASE_STUDIES } from '@/lib/constants'
import { categoryLabel, cn } from '@/lib/utils'
import PageIntro from '@/components/sections/PageIntro'
import { StaggerGroup, StaggerItem } from '@/components/shared/ScrollReveal'

const CATEGORY_FILTERS = ['All', 'Web', 'Social', 'Performance']

export default function CaseStudyGrid({ intro }) {
  const [filter, setFilter] = useState('All')

  const studies = useMemo(
    () =>
      filter === 'All'
        ? CASE_STUDIES
        : CASE_STUDIES.filter((s) => categoryLabel(s.category) === filter),
    [filter]
  )

  return (
    <>
      {/* Intro strip — passed from the page so the portfolio intro can use
          the shared split layout; falls back to the navy PageIntro. */}
      {intro ?? (
        <PageIntro
          eyebrow="Selected work"
          title="Case studies that show the numbers."
          description="A look at how we move traffic, conversions, and revenue for clients across web, social, and performance."
        />
      )}

      {/* Filter + grid — light background for the content area. */}
      <section id="work" className="bg-offwhite py-20 lg:py-28">
        <div className="container">
          {/* Filter bar */}
          <div
            role="group"
            aria-label="Filter case studies by category"
            className="flex flex-wrap gap-2"
          >
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                aria-pressed={filter === cat}
                className={cn(
                  'rounded-full border px-4 py-2 text-small font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
                  filter === cat
                    ? 'border-brand bg-brand text-white'
                    : 'border-navy/15 bg-transparent text-navy/60 hover:border-brand/40 hover:bg-ice hover:text-navy'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <StaggerGroup
            as="ul"
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.07}
          >
            {studies.map((study, index) => (
              <StaggerItem as="li" key={study.slug}>
                <CaseStudyCard study={study} priority={index < 3} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  )
}

// CaseStudyCard — one portfolio card: thumbnail, client, category tag,
// measurable result, and a link through to the detail page. White surface
// lifted with shadow-soft (no border) over the offwhite page background.
function CaseStudyCard({ study, priority }) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-soft transition-shadow hover:shadow-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={study.thumbnail}
          alt={`${study.client} — ${study.title}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="w-fit rounded-full bg-ice px-3 py-1 text-caption text-navy">
          {categoryLabel(study.category)}
        </span>
        <h3 className="mt-4 text-xl text-navy">{study.client}</h3>
        <p className="mt-1 text-small text-navy/60">{study.title}</p>
        <span className="mt-5 font-heading text-2xl font-semibold tracking-tight text-brand">
          {study.result}
        </span>
        <span className="mt-4 inline-flex items-center gap-2 text-small font-semibold text-navy/70 transition-colors group-hover:text-brand">
          Read case study
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}

CaseStudyCard.propTypes = {
  study: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    client: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    result: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
  priority: PropTypes.bool,
}

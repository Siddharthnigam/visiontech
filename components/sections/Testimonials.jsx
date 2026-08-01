'use client'

// Testimonials — two CSS-driven infinite marquee rows.
// Row 1: scrolls left. Row 2: scrolls right.
// Hover on a ROW pauses only that row — seamless resume, no jump.
// Uses CSS animation-play-state (not JS transforms) so pause/resume
// is instant and never causes a position reset.

import { useState } from 'react'
import { Star } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/constants'
import { cn } from '@/lib/utils'

// ─── Card — compact, uniform size ────────────────────────────────────────────
function TestimonialCard({ item }) {
  return (
    <article className="flex h-40 w-64 shrink-0 flex-col justify-between rounded-2xl border border-navy/10 bg-white px-4 py-3.5 shadow-soft">
      {/* Top: stars + service tag */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-0.5" aria-label={`${item.rating} out of 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              aria-hidden="true"
              className={cn(
                'h-2.5 w-2.5',
                i < item.rating
                  ? 'fill-brand text-brand'
                  : 'fill-navy/10 text-navy/10'
              )}
            />
          ))}
        </div>
        <span className="shrink-0 rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand">
          {item.service}
        </span>
      </div>

      {/* Quote */}
      <blockquote className="flex-1 py-2">
        <p className="line-clamp-2 text-[12.5px] leading-relaxed text-navy/70">
          &ldquo;{item.quote}&rdquo;
        </p>
      </blockquote>

      {/* Author */}
      <footer className="flex items-center gap-2 border-t border-navy/8 pt-2.5">
        <div
          aria-hidden="true"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand/10 text-[10px] font-bold text-brand"
        >
          {item.initials}
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-navy leading-tight">{item.name}</p>
          <p className="truncate text-[10px] text-navy/45 leading-tight">
            {item.role} · {item.company}
          </p>
        </div>
      </footer>
    </article>
  )
}

// ─── Marquee row ──────────────────────────────────────────────────────────────
// Duplicates items so the loop is invisible.
// `reverse` flips animation direction.
// `paused` controls CSS animation-play-state.
function MarqueeRow({ items, reverse = false }) {
  const [paused, setPaused] = useState(false)
  // Triple the items for a seamless loop
  const track = [...items, ...items, ...items]
  const animClass = reverse ? 'testimonial-reverse' : 'testimonial-forward'

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <ul
        aria-hidden="true"
        className={`flex gap-6 ${animClass}`}
        style={{
          animationPlayState: paused ? 'paused' : 'running',
          willChange: 'transform',
        }}
      >
        {track.map((item, i) => (
          <li key={`${item.id}-${i}`} className="shrink-0">
            <TestimonialCard item={item} />
          </li>
        ))}
      </ul>
      {/* Accessible copy — hidden from visual, read by screen readers */}
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item.id}>
            {item.name}, {item.role} at {item.company}: {item.quote}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Testimonials() {
  const row1 = TESTIMONIALS
  const row2 = [...TESTIMONIALS].reverse()

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="overflow-hidden bg-offwhite py-20 lg:py-28"
    >
      {/* Heading */}
      <div className="mx-auto mb-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <span className="text-caption text-brand">Client results</span>
        <h2 id="testimonials-heading" className="mt-3 text-navy">
          Real words, real outcomes.
        </h2>
        <p className="mt-3 max-w-lg text-lg leading-relaxed text-navy/60">
          We measure success in results — here&apos;s what clients say after
          we&apos;ve delivered.
        </p>
      </div>

      {/* Marquee wrapper — max-w-7xl, edge blur masks */}
      <div className="relative mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Left fade + blur */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-4 z-10 w-12 sm:left-6 lg:left-8"
          style={{
            background: 'linear-gradient(to right, #FAFBFC 20%, rgba(250,251,252,0) 100%)',
            backdropFilter: 'blur(4px)',
            WebkitMaskImage: 'linear-gradient(to right, black 30%, transparent 100%)',
            maskImage: 'linear-gradient(to right, black 30%, transparent 100%)',
          }}
        />
        {/* Right fade + blur */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-4 z-10 w-12 sm:right-6 lg:right-8"
          style={{
            background: 'linear-gradient(to left, #FAFBFC 20%, rgba(250,251,252,0) 100%)',
            backdropFilter: 'blur(4px)',
            WebkitMaskImage: 'linear-gradient(to left, black 30%, transparent 100%)',
            maskImage: 'linear-gradient(to left, black 30%, transparent 100%)',
          }}
        />

        <div className="space-y-4">
          <MarqueeRow items={row1} reverse={false} />
          <MarqueeRow items={row2} reverse />
        </div>
      </div>

      
    </section>
  )
}

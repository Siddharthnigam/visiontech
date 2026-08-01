'use client'

// TechMarquee — pure CSS infinite marquee. No framer-motion, no opacity:0
// initial state — always visible. Two rows scroll in opposite directions.
import { TECH_STACK } from '@/lib/constants'

function MarqueeRow({ items, reverse = false }) {
  const track = [...items, ...items, ...items]
  return (
    <div className="relative flex overflow-hidden">
      {/* Left fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-navy to-transparent"
      />
      {/* Right fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-navy to-transparent"
      />

      {/* Animated track */}
      <ul
        aria-hidden="true"
        className={`flex shrink-0 items-center ${reverse ? 'marquee-reverse' : 'marquee-forward'}`}
      >
        {track.map((tech, i) => (
          <li
            key={`${tech.name}-${i}`}
            className="flex shrink-0 items-center gap-2.5 px-7 py-2.5"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-sm font-bold text-white/60">
              {tech.icon}
            </span>
            <span className="text-small font-semibold tracking-wide text-ice/50 whitespace-nowrap">
              {tech.name}
            </span>
          </li>
        ))}
      </ul>

      {/* Screen-reader accessible version */}
      <ul className="sr-only">
        {items.map((tech) => (
          <li key={tech.name}>{tech.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default function TechMarquee() {
  const half = Math.ceil(TECH_STACK.length / 2)
  const row1 = TECH_STACK.slice(0, half)
  const row2 = TECH_STACK.slice(half)

  return (
    <section aria-label="Technologies we build with" className="overflow-hidden bg-navy py-10">
      <p className="text-caption mb-6 text-center tracking-widest text-ice/30">
        Technologies we build with
      </p>
      <div className="space-y-2">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  )
}

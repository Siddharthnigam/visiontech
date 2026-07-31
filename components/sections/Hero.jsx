'use client'

// Hero — asymmetric split: conversion-focused headline on the left, abstract
// wireframe node composition (web / social / growth) on the right. The SVG
// animates in on load with staggered timing; the navy section carries the
// low-opacity noise texture.
import { motion, useReducedMotion } from 'framer-motion'
import Button from '@/components/ui/Button'
import ScrollReveal, {
  StaggerGroup,
  StaggerItem,
} from '@/components/shared/ScrollReveal'
import { EASE } from '@/lib/utils'

export default function Hero() {
  return (
    <section className="noise-overlay relative overflow-hidden bg-navy text-offwhite">
      <div className="container relative grid items-center gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-32">
        <StaggerGroup className="lg:pr-8">
          <StaggerItem>
            <div className="flex items-center gap-4">
              <span className="text-caption text-ice/70">
                Web · Social · Growth
              </span>
              <span className="accent-rule" aria-hidden="true" />
            </div>
          </StaggerItem>

          <StaggerItem>
            <h1 className="mt-6 text-offwhite">
              More traffic. More conversions. More growth.
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ice/80">
              One team for web development, social media, and performance
              marketing — engineered to move traffic, conversions, and revenue
              from first audit to scale.
            </p>
          </StaggerItem>

          <StaggerItem>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="/contact?intent=audit" magnetic>
                Book a Free Audit
              </Button>
              <Button href="/portfolio" variant="ghost">
                View Our Work
              </Button>
            </div>
          </StaggerItem>
        </StaggerGroup>

        <ScrollReveal
          className="relative lg:-mr-8 lg:translate-x-6"
          y={36}
          delay={0.1}
          amount={0.1}
        >
          <HeroNodes />
        </ScrollReveal>
      </div>
    </section>
  )
}

// Abstract geometric/wireframe composition — three service nodes connected
// to a central hub. Dashed construction grid, measurement ticks, no fills.
// Elements animate in on load: grid fades in, lines draw themselves, then
// the hub and nodes pop in. Disabled under prefers-reduced-motion.
function HeroNodes() {
  const reduce = useReducedMotion()

  const nodes = [
    { label: 'Web', x: 96, y: 118 },
    { label: 'Social', x: 352, y: 86 },
    { label: 'Growth', x: 302, y: 296 },
  ]

  const connections = [
    'M206 210 C 168 172, 130 150, 104 122',
    'M206 210 C 258 168, 310 130, 344 96',
    'M206 210 C 244 258, 278 284, 300 296',
  ]

  const gridLines = [
    ...Array.from({ length: 8 }, (_, i) => (
      <line
        key={`v${i}`}
        x1={i * 57.5}
        y1="0"
        x2={i * 57.5}
        y2="360"
        strokeDasharray="3 5"
      />
    )),
    ...Array.from({ length: 7 }, (_, i) => (
      <line
        key={`h${i}`}
        x1="0"
        y1={i * 55}
        x2="460"
        y2={i * 55}
        strokeDasharray="3 5"
      />
    )),
  ]

  const origin = { originX: 0.5, originY: 0.5 }

  return (
    <svg
      viewBox="0 0 460 360"
      className="h-auto w-full text-ice"
      fill="none"
      aria-hidden="true"
    >
      {/* construction grid */}
      <motion.g
        stroke="currentColor"
        strokeOpacity="0.14"
        strokeWidth="1"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        {gridLines}
      </motion.g>

      {/* orbital guides around the hub */}
      <motion.g
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="1"
        strokeDasharray="2 6"
        style={origin}
        initial={reduce ? false : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
      >
        <circle cx="206" cy="210" r="66" />
        <circle cx="206" cy="210" r="122" />
      </motion.g>

      {/* hub -> node connections, curved for asymmetry */}
      {connections.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="currentColor"
          strokeOpacity="0.55"
          strokeWidth="1.5"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.35 + i * 0.15 }}
        />
      ))}

      {/* measurement ticks */}
      <motion.g
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="1.5"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
      >
        <path d="M0 26 h26 M0 52 h18 M0 78 h26" />
        <path d="M434 284 h26 M434 310 h18 M434 336 h26" />
      </motion.g>

      {/* central hub */}
      <motion.g
        style={origin}
        initial={reduce ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.6 }}
      >
        <circle cx="206" cy="210" r="7" stroke="#E0F2FE" strokeWidth="2" />
        <circle cx="206" cy="210" r="2.5" fill="#0066FF" />
        <g stroke="#0066FF" strokeWidth="1.5">
          <line x1="206" y1="186" x2="206" y2="196" />
          <line x1="206" y1="224" x2="206" y2="234" />
          <line x1="182" y1="210" x2="192" y2="210" />
          <line x1="220" y1="210" x2="230" y2="210" />
        </g>
      </motion.g>

      {/* service nodes */}
      {nodes.map((n, i) => (
        <motion.g
          key={n.label}
          style={origin}
          initial={reduce ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.7 + i * 0.18 }}
        >
          <circle cx={n.x} cy={n.y} r="6" stroke="#E0F2FE" strokeWidth="2" />
          <circle cx={n.x} cy={n.y} r="1.75" fill="#E0F2FE" />
          <text
            x={n.x + 14}
            y={n.y - 10}
            className="text-[11px] font-semibold uppercase tracking-[0.18em]"
            fill="#E0F2FE"
            fillOpacity="0.8"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {n.label}
          </text>
        </motion.g>
      ))}
    </svg>
  )
}

'use client'

// WhyChooseUs — navy background section explaining Vision Tech's differentiators.
// Layout: full-width dark section (noise overlay) with a heading block at top,
// then a 2×3 grid of reason cards. Sits between Services and ProcessWorkflow
// on the homepage to answer the natural "why you?" question after seeing what we do.

import {
  Zap,
  BarChart3,
  Users,
  ShieldCheck,
  Layers,
  HeartHandshake,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import ScrollReveal, {
  StaggerGroup,
  StaggerItem,
} from '@/components/shared/ScrollReveal'

const REASONS = [
  {
    id: 'integrated',
    icon: Layers,
    title: 'One Integrated System',
    description:
      'Web, social, and paid growth built from the same strategy brief — so your message never breaks between channels and every rupee of spend pulls in the same direction.',
  },
  {
    id: 'speed',
    icon: Zap,
    title: 'Fast Execution',
    description:
      'Most websites launch in 3–5 weeks. Social calendars are live within 7 days. We move fast without cutting corners, because slow delivery is just a different kind of risk.',
  },
  {
    id: 'data',
    icon: BarChart3,
    title: 'Data Over Guesswork',
    description:
      'Every decision — from ad creative to page layout — starts with a number. ROAS, CAC, Core Web Vitals. If it can\'t be measured, it doesn\'t ship.',
  },
  {
    id: 'dedicated',
    icon: Users,
    title: 'Dedicated, Not Outsourced',
    description:
      'Your project is handled in-house by the same senior team from brief to scale. No handoffs to freelancers, no mystery third parties, no broken telephone.',
  },
  {
    id: 'transparent',
    icon: ShieldCheck,
    title: 'Fully Transparent',
    description:
      'No lock-in contracts. Pause or cancel with 14 days\' notice. You own all assets, accounts, and code from day one — we earn your business every single month.',
  },
  {
    id: 'longterm',
    icon: HeartHandshake,
    title: 'Built for the Long Game',
    description:
      'Launch is day one, not the finish line. We report, iterate, and compound results month after month — because short-term wins don\'t build sustainable businesses.',
  },
]

// ── Reason card ───────────────────────────────────────────────────────────────
function ReasonCard({ reason }) {
  const Icon = reason.icon
  return (
    <article className="group flex flex-col gap-4 rounded-lg border border-white/8 bg-white/5 p-6 transition-colors hover:border-brand/40 hover:bg-white/8">
      {/* Icon */}
      <div className="flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-brand/15 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>

      {/* Title */}
      <h3 className="font-heading text-lg font-semibold tracking-tight text-offwhite">
        {reason.title}
      </h3>

      {/* Description */}
      <p className="text-small leading-relaxed text-ice/60">
        {reason.description}
      </p>
    </article>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function WhyChooseUs() {
  return (
    <section
      id="why-us"
      aria-labelledby="why-us-heading"
      className="noise-overlay relative overflow-hidden bg-navy py-20 lg:py-28"
    >
      <div className="container">

        {/* Heading block */}
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="text-caption text-brand">Why Vision Tech</span>
          <h2 id="why-us-heading" className="mt-4 text-offwhite">
            Why businesses choose us over the rest.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ice/70">
            Plenty of agencies promise results. We build systems that
            consistently deliver them — and keep delivering, long after launch.
          </p>
        </ScrollReveal>

        {/* Reasons grid */}
        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason) => (
            <StaggerItem key={reason.id}>
              <ReasonCard reason={reason} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Bottom stat strip */}
        <ScrollReveal delay={0.1}>
          <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/8 lg:grid-cols-4">
            {[
              { value: '40+', label: 'Clients served' },
              { value: '3–5 wks', label: 'Avg. website delivery' },
              { value: '3×', label: 'Avg. ROAS improvement' },
              { value: '100%', label: 'Asset ownership — yours' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 bg-white/5 px-6 py-8 text-center"
              >
                <dt className="font-heading text-3xl font-semibold text-brand lg:text-4xl">
                  {stat.value}
                </dt>
                <dd className="text-small text-ice/50">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </ScrollReveal>

      </div>
    </section>
  )
}

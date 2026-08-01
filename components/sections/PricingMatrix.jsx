'use client'

// Pricing — three service cards from PRICING_TIERS. No published prices:
// every engagement is scoped to the client's goals, so each card invites a
// custom quote through the contact form.
import PropTypes from 'prop-types'
import { Check } from 'lucide-react'
import Button from '@/components/ui/Button'
import ScrollReveal, {
  StaggerGroup,
  StaggerItem,
} from '@/components/shared/ScrollReveal'
import { PRICING_TIERS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function PricingMatrix() {
  return (
    <section id="pricing" className="bg-offwhite py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <ScrollReveal>
            <span className="text-caption text-brand">Pricing</span>
            <h2 className="mt-4 text-navy">Packages that scale with you.</h2>
            <p className="mt-6 text-lg leading-relaxed text-navy/70">
              Start with one discipline, or run the full stack. Every engagement
              is scoped to your goals — tell us what you need and we’ll send a
              tailored quote, usually within one business day.
            </p>
          </ScrollReveal>
        </div>

        <StaggerGroup
          as="ul"
          className="mt-14 grid items-stretch gap-6 lg:grid-cols-3"
          stagger={0.12}
        >
          {PRICING_TIERS.map((tier) => (
            <StaggerItem as="li" key={tier.id}>
              <TierCard tier={tier} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}

// TierCard — one service card. The highlighted tier gets a subtle
// "Most Popular" badge and a stronger border/shadow instead of a color swap.
function TierCard({ tier }) {
  return (
    <article
      className={cn(
        'relative flex h-full flex-col rounded-lg border bg-white p-6 lg:p-8',
        tier.highlighted
          ? 'border-brand/40 shadow-elevated'
          : 'border-navy/10 shadow-soft'
      )}
    >
      {tier.highlighted && (
        <span className="absolute -top-3 left-6 rounded-full bg-brand px-3 py-1 text-caption text-white">
          Most Popular
        </span>
      )}

      <h3 className="text-xl text-navy">{tier.name}</h3>

      {tier.tagline && (
        <p className="mt-1.5 text-small font-medium italic text-brand/80">
          {tier.tagline}
        </p>
      )}

      <p className="mt-3 text-small leading-relaxed text-navy/60">
        {tier.description}
      </p>

      <p className="mt-6 text-caption font-semibold text-brand">Custom quote</p>

      <ul className="mt-6 flex-1 space-y-2.5 border-t border-navy/10 pt-6">
        {tier.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-small text-navy/70"
          >
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-brand"
              aria-hidden="true"
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        href={`/contact?plan=${tier.id}`}
        variant={tier.highlighted ? 'primary' : 'outline'}
        className="mt-8 w-full"
      >
        Get Started
      </Button>
    </article>
  )
}

TierCard.propTypes = {
  tier: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tagline: PropTypes.string,
    description: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    highlighted: PropTypes.bool.isRequired,
  }).isRequired,
}

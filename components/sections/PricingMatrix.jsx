'use client'

// Pricing — three tier cards from PRICING_TIERS. A local Monthly/Annual
// toggle re-renders every card at once (no reload); annual prices are
// derived from the monthly price via the shared `annualPrice` helper.
// "Complete Digital" is called out with a subtle badge, not a color swap.
import { useState } from 'react'
import PropTypes from 'prop-types'
import { Check } from 'lucide-react'
import Button from '@/components/ui/Button'
import ScrollReveal, {
  StaggerGroup,
  StaggerItem,
} from '@/components/shared/ScrollReveal'
import { PRICING_TIERS } from '@/lib/constants'
import { annualPrice, cn } from '@/lib/utils'

export default function PricingMatrix() {
  const [billing, setBilling] = useState('monthly')

  return (
    <section id="pricing" className="bg-offwhite py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <ScrollReveal>
            <span className="text-caption text-brand">Pricing</span>
            <h2 className="mt-4 text-navy">
              Simple plans that scale with you.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-navy/70">
              Start with one discipline, or run the full stack. No lock-in, no
              hidden fees — switch or pause your plan anytime.
            </p>
          </ScrollReveal>

          {/* Monthly / Annual toggle */}
          <ScrollReveal className="mt-8" delay={0.1}>
            <div
              role="group"
              aria-label="Billing period"
              className="inline-flex items-center rounded-md border border-navy/15 bg-white p-1"
            >
              <button
                type="button"
                onClick={() => setBilling('monthly')}
                aria-pressed={billing === 'monthly'}
                className={cn(
                  'rounded px-4 py-2 text-small font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
                  billing === 'monthly'
                    ? 'bg-brand text-white'
                    : 'text-navy/60 hover:text-navy'
                )}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBilling('annual')}
                aria-pressed={billing === 'annual'}
                className={cn(
                  'rounded px-4 py-2 text-small font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
                  billing === 'annual'
                    ? 'bg-brand text-white'
                    : 'text-navy/60 hover:text-navy'
                )}
              >
                Annual <span className="text-ice">–20%</span>
              </button>
            </div>
          </ScrollReveal>
        </div>

        <StaggerGroup
          as="ul"
          className="mt-14 grid items-stretch gap-6 lg:grid-cols-3"
          stagger={0.12}
        >
          {PRICING_TIERS.map((tier) => (
            <StaggerItem as="li" key={tier.id}>
              <TierCard tier={tier} billing={billing} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}

// TierCard — one pricing card. The highlighted tier gets a subtle
// "Recommended" badge and a stronger border/shadow instead of a color swap.
function TierCard({ tier, billing }) {
  const isMonthlyPlan = tier.billing === '/month'
  const isAnnual = billing === 'annual'
  const displayPrice =
    isAnnual && isMonthlyPlan ? annualPrice(tier.price) : tier.price
  const billingLabel = isAnnual && isMonthlyPlan ? '/month' : tier.billing

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
          Recommended
        </span>
      )}

      <h3 className="text-xl text-navy">{tier.name}</h3>
      <p className="mt-2 text-small leading-relaxed text-navy/60">
        {tier.description}
      </p>

      <div className="mt-6 flex items-baseline gap-2">
        <span className="font-heading text-4xl font-semibold tracking-tight text-navy">
          ${displayPrice}
        </span>
        <span className="text-small text-navy/50">{billingLabel}</span>
      </div>

      <p className="mt-1 h-4 text-caption text-brand" aria-live="polite">
        {isAnnual && isMonthlyPlan ? 'Billed annually — save 20%' : ''}
        {isAnnual && !isMonthlyPlan ? 'One-time project fee' : ''}
      </p>

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
        Get started
      </Button>
    </article>
  )
}

TierCard.propTypes = {
  tier: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    billing: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    highlighted: PropTypes.bool.isRequired,
  }).isRequired,
  billing: PropTypes.oneOf(['monthly', 'annual']).isRequired,
}

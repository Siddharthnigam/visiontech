import PricingMatrix from '@/components/sections/PricingMatrix'
import { SITE_URL } from '@/lib/constants'

export const metadata = {
  title: 'Pricing — Vision Tech',
  description:
    'Simple plans that scale with you. No lock-in, no hidden fees — switch or pause your plan anytime.',
  openGraph: {
    title: 'Pricing — Vision Tech',
    description:
      'Simple plans that scale with you. No lock-in, no hidden fees — switch or pause your plan anytime.',
    url: `${SITE_URL}/pricing`,
    type: 'website',
  },
}

// Pricing page — full pricing comparison of the three service tiers.
export default function PricingPage() {
  return (
    <main>
      <PricingMatrix />
    </main>
  )
}

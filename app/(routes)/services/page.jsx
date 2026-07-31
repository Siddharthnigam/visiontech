import PricingMatrix from '@/components/sections/PricingMatrix'
import ServicesIntro from '@/components/sections/ServicesIntro'
import { SITE_URL } from '@/lib/constants'

export const metadata = {
  title: 'Services & Pricing — Vision Tech',
  description:
    'Simple plans that scale with you. No lock-in, no hidden fees — switch or pause your plan anytime.',
  openGraph: {
    title: 'Services & Pricing — Vision Tech',
    description:
      'Simple plans that scale with you. No lock-in, no hidden fees — switch or pause your plan anytime.',
    url: `${SITE_URL}/services`,
    type: 'website',
  },
}

// Services page — split intro (service list + animated system visual) above
// the pricing grid.
export default function ServicesPage() {
  return (
    <main>
      <ServicesIntro />
      <PricingMatrix />
    </main>
  )
}

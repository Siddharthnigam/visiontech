import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import ProcessWorkflow from '@/components/sections/ProcessWorkflow'
import PricingMatrix from '@/components/sections/PricingMatrix'
import { SITE_URL } from '@/lib/constants'

// Homepage — assembles the landing sections. CaseStudies, TrustSignals,
// and LeadCapture ship in their own dedicated tasks.
export const metadata = {
  title: 'Vision Tech — Web, Social & Performance Marketing Agency',
  description:
    'Web development, social media management, and performance marketing — one team engineered to move traffic, conversions, and revenue from first audit to scale.',
  openGraph: {
    title: 'Vision Tech — Web, Social & Performance Marketing Agency',
    description:
      'Web development, social media management, and performance marketing — one team engineered to move traffic, conversions, and revenue from first audit to scale.',
    url: SITE_URL,
    type: 'website',
  },
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <ProcessWorkflow />
      <PricingMatrix />
    </main>
  )
}

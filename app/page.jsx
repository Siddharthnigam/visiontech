import Hero from '@/components/sections/Hero'
import TechMarquee from '@/components/sections/TechMarquee'
import Services from '@/components/sections/Services'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import ProcessWorkflow from '@/components/sections/ProcessWorkflow'
import Testimonials from '@/components/sections/Testimonials'
import Faq from '@/components/sections/Faq'
import CtaBand from '@/components/sections/CtaBand'
import { SITE_URL } from '@/lib/constants'

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
      {/* 1 — Hero */}
      <Hero />

      {/* 2 — Tech stack marquee */}
      <TechMarquee />

      {/* 3 — What we do */}
      <Services />

      {/* 4 — Why choose us */}
      <WhyChooseUs />

      {/* 5 — How we work */}
      <ProcessWorkflow />

      {/* 6 — Client testimonials */}
      <Testimonials />

      {/* 7 — FAQ */}
      <Faq />

      {/* 8 — Bottom CTA */}
      <CtaBand />
    </main>
  )
}

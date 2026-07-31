import LeadCaptureForm from '@/components/sections/LeadCaptureForm'
import SplitIntro from '@/components/shared/SplitIntro'
import ContactVisual from '@/components/visuals/ContactVisual'
import { SITE_URL } from '@/lib/constants'

export const metadata = {
  title: 'Contact — Vision Tech',
  description:
    'Tell us about your project. We reply within one business day — no obligation, no long sales call.',
  openGraph: {
    title: 'Contact — Vision Tech',
    description:
      'Tell us about your project. We reply within one business day — no obligation, no long sales call.',
    url: `${SITE_URL}/contact`,
    type: 'website',
  },
}

// Contact page — split intro (connection visual beside calm copy) above the
// lead capture form and agency contact details.
export default function ContactPage() {
  return (
    <main>
      <SplitIntro
        eyebrow="Contact"
        title="Tell us where you’re stuck — we’ll take it from there."
        description="Share a few details about your project and we’ll reply within one business day with next steps — no obligation, no long sales call."
        visual={<ContactVisual />}
      />
      <section className="bg-offwhite py-20 lg:py-28">
        <div className="container">
          <LeadCaptureForm />
        </div>
      </section>
    </main>
  )
}

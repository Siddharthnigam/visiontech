import LeadCaptureForm from '@/components/sections/LeadCaptureForm'
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

// Contact page — lead capture form plus agency contact details.
export default function ContactPage() {
  return (
    <main>
      <section className="bg-offwhite py-20 lg:py-28">
        <div className="container">
          <LeadCaptureForm />
        </div>
      </section>
    </main>
  )
}

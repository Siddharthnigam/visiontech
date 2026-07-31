import CaseStudyGrid from '@/components/sections/CaseStudyGrid'
import { SITE_URL } from '@/lib/constants'

export const metadata = {
  title: 'Our Work — Vision Tech',
  description:
    'Case studies across web development, social media, and performance marketing — with measurable results.',
  openGraph: {
    title: 'Our Work — Vision Tech',
    description:
      'Case studies across web development, social media, and performance marketing — with measurable results.',
    url: `${SITE_URL}/portfolio`,
    type: 'website',
  },
}

export default function PortfolioPage() {
  return (
    <main>
      <CaseStudyGrid />
    </main>
  )
}

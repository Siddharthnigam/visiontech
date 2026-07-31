import CaseStudyGrid from '@/components/sections/CaseStudyGrid'
import SplitIntro from '@/components/shared/SplitIntro'
import WorkVisual from '@/components/visuals/WorkVisual'
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
      <CaseStudyGrid
        intro={
          <SplitIntro
            eyebrow="Selected work"
            title="Case studies that show the numbers."
            description="A look at how we move traffic, conversions, and revenue for clients across web, social, and performance."
            visual={<WorkVisual />}
          />
        }
      />
    </main>
  )
}

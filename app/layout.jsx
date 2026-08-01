import { Space_Grotesk, Source_Sans_3 } from 'next/font/google'
import { MotionConfig } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollWidget from '@/components/layout/ScrollWidget'
import { SITE_URL } from '@/lib/constants'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Vision Tech — Web, Social & Performance Marketing Agency',
  description:
    'Web development, social media management, and performance marketing — one team engineered to move traffic, conversions, and revenue from first audit to scale.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Vision Tech',
    title: 'Vision Tech — Web, Social & Performance Marketing Agency',
    description:
      'Web development, social media management, and performance marketing — one team engineered to move traffic, conversions, and revenue from first audit to scale.',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${sourceSans.variable}`}
    >
      <body>
        <MotionConfig reducedMotion="user">
          <Navbar />
          {children}
          <Footer />
          <ScrollWidget />
        </MotionConfig>
      </body>
    </html>
  )
}

import { SITE_URL } from '@/lib/constants'

// Robots — allow all crawlers, point them at the sitemap.
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}

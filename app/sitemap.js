import { CASE_STUDIES, SITE_URL } from '@/lib/constants'

// Sitemap — one entry per static route plus every case study detail page.
export default function sitemap() {
  const now = new Date()

  const staticPages = [
    { path: '', changeFrequency: 'weekly', priority: 1 },
    { path: '/services', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/pricing', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/contact', changeFrequency: 'yearly', priority: 0.8 },
  ]

  return [
    ...staticPages.map((page) => ({
      url: `${SITE_URL}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...CASE_STUDIES.map((study) => ({
      url: `${SITE_URL}/case-studies/${study.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    })),
  ]
}

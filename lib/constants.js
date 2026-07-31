/**
 * @typedef {Object} NavLink
 * @property {string} label
 * @property {string} href
 */

/**
 * @typedef {Object} Service
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} icon - lucide-react icon name
 * @property {string[]} features
 */

/**
 * @typedef {Object} ProcessStep
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} deliverable - what the client receives at this stage
 * @property {string} icon - lucide-react icon name
 */

/**
 * @typedef {Object} PricingTier
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {string} billing - billing cadence (e.g. '/month', '/project')
 * @property {string} description
 * @property {string[]} features
 * @property {boolean} highlighted - recommended tier flag
 */

/**
 * @typedef {Object} CaseStudy
 * @property {string} title
 * @property {string} client
 * @property {string} category - category tag (Web / Social / Marketing)
 * @property {string} result - headline result metric
 * @property {string} summary - one-line overview for the detail hero
 * @property {string[]} services - services delivered on the engagement
 * @property {string} duration - engagement duration
 * @property {string} challenge - narrative paragraph
 * @property {string[]} approach - ordered narrative steps
 * @property {string} outcome - narrative result paragraph
 * @property {string} thumbnail - path under /public/images/case-studies
 * @property {string[]} gallery - detail page gallery images
 * @property {string} slug
 */

/** @type {NavLink[]} */
export const NAV_LINKS = [
  { label: 'Services', href: '/#services' },
  { label: 'Process', href: '/#process' },
  { label: 'Work', href: '/portfolio' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
]

/** Canonical site URL — used by metadata, sitemap, and robots. */
export const SITE_URL = 'https://visiontech.agency'

/** @type {Service[]} */
export const SERVICES = [
  {
    id: 'web',
    title: 'Custom Web Solutions',
    description:
      'High-performance websites and web apps built to turn visitors into enquiries — fast, findable, and conversion-focused.',
    icon: 'Code2',
    features: [
      'SEO-ready, Core Web Vitals-optimized builds (90+ scores)',
      'CMS or custom backend, tailored to your workflow',
      'Conversion-focused pages that turn visits into enquiries',
      'Reliable hosting, maintenance, and support included',
    ],
  },
  {
    id: 'social',
    title: 'Social Media Management',
    description:
      'A full-funnel social presence — strategy, content, and community that grow your audience and feed your pipeline.',
    icon: 'Share2',
    features: [
      'Content calendars across 3+ platforms, planned monthly',
      'On-brand graphic and short-form video production',
      'Community management with same-day engagement',
      'Reports tied to reach, engagement, and growth goals',
    ],
  },
  {
    id: 'marketing',
    title: 'Growth & Performance Marketing',
    description:
      'Data-driven paid and organic campaigns engineered around ROAS, CAC, and revenue — not vanity metrics.',
    icon: 'TrendingUp',
    features: [
      'Paid campaigns across Google, Meta, and LinkedIn',
      'Landing page CRO and funnel teardowns',
      'Attribution and audience analytics you can act on',
      'Weekly optimization sprints toward ROAS targets',
    ],
  },
]

/** @type {ProcessStep[]} */
export const PROCESS_STEPS = [
  {
    id: 'discovery',
    title: 'Discovery',
    deliverable: 'Audit + roadmap',
    description:
      'A kick-off call and deep audit of your market, funnel, and competitors. You walk away with a documented roadmap and agreed success metrics — nothing left to guesswork.',
    icon: 'Search',
  },
  {
    id: 'design',
    title: 'Design',
    deliverable: 'Wireframes + prototypes',
    description:
      'You review wireframes and brand-aligned prototypes in a simple approval flow. Sign off once and we lock the direction before production begins.',
    icon: 'PenTool',
  },
  {
    id: 'launch',
    title: 'Launch',
    deliverable: 'Live site + tracking',
    description:
      'You get a tested, accessible, SEO-ready experience with tracking and QA in place. We handle go-live, then walk you through what shipped and what happens next.',
    icon: 'Rocket',
  },
  {
    id: 'scale',
    title: 'Scale',
    deliverable: 'Growth plan',
    description:
      'A monthly performance review shows what worked, what didn’t, and the next experiment. We double down on winners and reinvest budget where it earns.',
    icon: 'LineChart',
  },
]

/** @type {PricingTier[]} */
export const PRICING_TIERS = [
  {
    id: 'starter-web',
    name: 'Starter Web',
    price: 999,
    billing: '/project',
    description:
      'A polished launch-ready website for businesses getting their first serious web presence.',
    features: [
      'Up to 5 custom-designed pages',
      'Mobile-first responsive build',
      'On-page SEO fundamentals',
      'Contact form + analytics setup',
      'Launched in 3–4 weeks',
      '30 days of post-launch support',
    ],
    highlighted: false,
  },
  {
    id: 'social-growth',
    name: 'Social Growth',
    price: 799,
    billing: '/month',
    description:
      'Managed social channels with a steady stream of on-brand content and engagement.',
    features: [
      '12 posts / month across 3 platforms',
      'Monthly content calendar & strategy',
      'On-brand graphics + short-form video',
      'Daily community management',
      'Monthly performance report',
      'Pause anytime, 14-day notice',
    ],
    highlighted: false,
  },
  {
    id: 'complete-digital',
    name: 'Complete Digital',
    price: 1999,
    billing: '/month',
    description:
      'Our full stack — web, social, and performance marketing working as one system.',
    features: [
      'Everything in Starter Web + updates included',
      'Full social media management (3 platforms)',
      'Paid ads on Google, Meta & LinkedIn',
      'Landing page CRO & funnel experiments',
      'Weekly optimization sprints',
      'Monthly strategy & reporting calls',
      'Dedicated growth strategist',
    ],
    highlighted: true,
  },
]

/*
  SAMPLE DATA — results and thumbnails below are realistic placeholders.
  Swap these with real client metrics and imagery before launch.
*/
/** @type {CaseStudy[]} */
export const CASE_STUDIES = [
  {
    title: 'SaaS landing page rebuild',
    client: 'Finlytics',
    category: 'Web',
    result: '+184% demo requests',
    summary:
      'Rebuilt a SaaS landing page around one metric — demo requests. In six weeks they rose 184% while ad spend stayed flat.',
    services: ['Web Design', 'Conversion Copywriting', 'CRO'],
    duration: '6 weeks',
    challenge:
      'Finlytics had strong paid traffic but a landing page that leaked visitors — a cluttered above-the-fold, slow LCP, and a request form buried below the fold. Demo requests had flatlined despite rising ad spend.',
    approach: [
      'Ran a five-minute session audit and heatmap review to find where visitors dropped off.',
      'Restructured the page around a single goal — book a demo — removing competing CTAs.',
      'Rebuilt the hero with a clear value prop, social proof, and an inline demo request form.',
      'Compressed images, reordered resources, and lifted Core Web Vitals above 90.',
    ],
    outcome:
      'Demo requests rose 184% in the first two months on the same ad budget, and LCP dropped from 4.2s to 1.6s. The new structure now serves as the template for Finlytics’ product pages.',
    thumbnail: '/images/case-studies/finlytics-1.png',
    gallery: [
      '/images/case-studies/finlytics-1.png',
      '/images/case-studies/finlytics-2.png',
      '/images/case-studies/finlytics-3.png',
    ],
    slug: 'finlytics-landing-rebuild',
  },
  {
    title: 'Meta ads growth engine',
    client: 'Bloom & Co.',
    category: 'Marketing',
    result: '3.2x ROAS in 90 days',
    summary:
      'Built a full-funnel Meta ads system that took Bloom & Co. from break-even to 3.2x ROAS in 90 days.',
    services: ['Paid Social', 'Funnel Strategy', 'CRO'],
    duration: '90 days',
    challenge:
      'Bloom & Co. had run the same two ad sets for months. Frequency was climbing, costs were rising, and the ads drove clicks to a generic homepage with no clear offer.',
    approach: [
      'Rebuilt the account into prospecting and retargeting layers with clear budgets.',
      'Designed 12 new ad concepts around three customer pain points, tested in rapid cycles.',
      'Built dedicated landing pages that matched each ad promise, with a single conversion action.',
      'Implemented daily spend rules and weekly creative refreshes to hold frequency down.',
    ],
    outcome:
      'ROAS moved from 1.1x to 3.2x within 90 days and cost per purchase fell 58%. Bloom & Co. now reinvests profit into a scaling phase with consistent returns.',
    thumbnail: '/images/case-studies/bloom-co-1.png',
    gallery: [
      '/images/case-studies/bloom-co-1.png',
      '/images/case-studies/bloom-co-2.png',
      '/images/case-studies/bloom-co-3.png',
    ],
    slug: 'bloom-co-meta-ads',
  },
  {
    title: 'Social-first brand launch',
    client: 'Nimbus Apparel',
    category: 'Social',
    result: '+212% audience growth',
    summary:
      'Launched Nimbus Apparel from zero followers to a +212% audience-growth year on a social-first strategy.',
    services: ['Social Media Management', 'Content Production', 'Community'],
    duration: 'Ongoing',
    challenge:
      'A direct-to-consumer apparel brand preparing to launch with no audience, no community, and a crowded feed. They needed presence and trust before scaling ad spend.',
    approach: [
      'Crafted a launch calendar mixing behind-the-scenes, lookbook, and user-generated content.',
      'Produced short-form video packages and on-brand graphics optimized per platform.',
      'Ran a seeding program with micro-influencers to build early social proof.',
      'Managed daily community engagement and turned comments into email signups.',
    ],
    outcome:
      'The account grew 212% in audience size in year one, with email signups from social covering the cost of the program. Engagement holds at 3x the platform average.',
    thumbnail: '/images/case-studies/nimbus-1.png',
    gallery: [
      '/images/case-studies/nimbus-1.png',
      '/images/case-studies/nimbus-2.png',
      '/images/case-studies/nimbus-3.png',
    ],
    slug: 'nimbus-apparel-social-launch',
  },
  {
    title: 'E-commerce CRO overhaul',
    client: 'Harbor Goods',
    category: 'Web',
    result: '+64% checkout conversion',
    summary:
      'Overhauled the Harbor Goods checkout and product pages, lifting checkout conversion 64% and AOV 11%.',
    services: ['Web Development', 'CRO', 'Analytics'],
    duration: '8 weeks',
    challenge:
      'Harbor Goods had solid traffic and cart adds, but abandoned carts were high — a four-step checkout, slow product images, and no trust signals near the buy button.',
    approach: [
      'Consolidated the four-step checkout into a single page with guest checkout first.',
      'Rebuilt product pages with faster image loading, a sticky add-to-cart, and review badges.',
      'Added urgency and guarantee messaging at the point of decision.',
      'Instrumented event tracking so every step in the funnel could be measured.',
    ],
    outcome:
      'Checkout conversion rose 64% and average order value grew 11% via a smarter cross-sell block. The same traffic now produces measurably more revenue per session.',
    thumbnail: '/images/case-studies/harbor-goods-1.png',
    gallery: [
      '/images/case-studies/harbor-goods-1.png',
      '/images/case-studies/harbor-goods-2.png',
      '/images/case-studies/harbor-goods-3.png',
    ],
    slug: 'harbor-goods-cro-overhaul',
  },
  {
    title: 'Lead gen funnel system',
    client: 'Vertex Legal',
    category: 'Marketing',
    result: '-47% cost per lead',
    summary:
      'Installed a lead-gen funnel across Google and Meta that cut cost per lead 47% while lifting qualified volume.',
    services: ['Paid Search', 'Paid Social', 'Landing Pages'],
    duration: '12 weeks',
    challenge:
      'Vertex Legal bought expensive clicks with no structured funnel. Leads came from a long contact form, so volume and quality were both unpredictable.',
    approach: [
      'Built dedicated landing pages per practice area with phone-call and short-form options.',
      'Restructured Google and Meta campaigns around high-intent keywords and audience tiers.',
      'Implemented call tracking and lead scoring so spend followed the highest-value cases.',
      'Ran weekly bid and creative experiments to keep cost per lead in check.',
    ],
    outcome:
      'Cost per lead fell 47% while case-qualified lead volume rose 31%. Vertex now forecasts spend from a predictable per-lead model.',
    thumbnail: '/images/case-studies/vertex-legal-1.png',
    gallery: [
      '/images/case-studies/vertex-legal-1.png',
      '/images/case-studies/vertex-legal-2.png',
      '/images/case-studies/vertex-legal-3.png',
    ],
    slug: 'vertex-legal-lead-funnel',
  },
  {
    title: 'Content ecosystem build',
    client: 'Pulse Fitness',
    category: 'Social',
    result: '1.2M monthly reach',
    summary:
      'Built a content ecosystem that grew Pulse Fitness to 1.2M monthly reach and 3x social-attributed memberships.',
    services: ['Content Strategy', 'Social Media', 'Video Production'],
    duration: 'Ongoing',
    challenge:
      'Pulse Fitness had good in-club content but no system — posting was sporadic and reach was flat. They wanted a content engine that built trust and drove membership enquiries.',
    approach: [
      'Audited the channel mix and built a pillar-cluster content model around coaching, results, and culture.',
      'Produced a repeatable short-form video pipeline with monthly themed series.',
      'Standardized thumbnails, hooks, and posting cadence across platforms.',
      'Linked social content to a membership enquiry flow and tracked attribution.',
    ],
    outcome:
      'Monthly reach grew to 1.2M, with memberships attributed to social up 3x year over year. The content system now runs on a two-week production cadence.',
    thumbnail: '/images/case-studies/pulse-fitness-1.png',
    gallery: [
      '/images/case-studies/pulse-fitness-1.png',
      '/images/case-studies/pulse-fitness-2.png',
      '/images/case-studies/pulse-fitness-3.png',
    ],
    slug: 'pulse-fitness-content-build',
  },
]

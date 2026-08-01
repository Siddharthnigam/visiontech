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

/**
 * @typedef {Object} AboutStat
 * @property {string} id
 * @property {string} value - displayed figure (e.g. '40+')
 * @property {string} label
 */

/**
 * @typedef {Object} Principle
 * @property {string} id
 * @property {string} title
 * @property {string} description
 */

/**
 * @typedef {Object} TeamMember
 * @property {string} id
 * @property {string} name
 * @property {string} role
 * @property {string} bio
 */

/** @type {NavLink[]} */
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

/** Canonical site URL — used by metadata, sitemap, and robots. */
export const SITE_URL = 'https://visiontech.agency'

/** @type {Service[]} */
export const SERVICES = [
  {
    id: 'web',
    title: 'Custom Web Solutions',
    tagline: 'High-performance websites built to turn traffic into qualified leads.',
    description:
      'A modern website is your 24/7 sales representative. We build ultra-fast, mobile-responsive, and conversion-focused websites that capture attention, rank high on search engines, and convert visitors into paying clients.',
    icon: 'Code2',
    features: [
      'SEO-ready & Core Web Vitals optimized builds (90+ PageSpeed scores)',
      'Custom UI/UX design tailored specifically to your brand identity',
      'High-converting landing pages built for max lead generation',
      'Full hosting, domain setup, ongoing maintenance, and security',
    ],
    details: {
      intro:
        'Your website is not a brochure — it is your top-performing salesperson, working around the clock. We design and engineer websites that load fast, rank high, and convert visitors into real business enquiries.',
      whatWeDeliver: [
        {
          title: 'Discovery & Strategy',
          body: 'We kick off with a deep audit of your market, competitors, and current digital presence. You receive a documented roadmap with agreed success metrics before a single pixel is designed.',
        },
        {
          title: 'UI/UX Design',
          body: 'Wireframes and brand-aligned prototypes are reviewed in a simple approval flow. We lock direction before production — so there are no costly surprises mid-build.',
        },
        {
          title: 'Development',
          body: 'Built with React / Next.js for speed and scalability, or WordPress for content-heavy sites. Every build is mobile-first, accessible, and SEO-structured from the ground up.',
        },
        {
          title: 'Conversion Optimisation',
          body: 'We engineer pages around a single goal — lead form, call, or purchase. Heatmap-informed layouts, clear CTAs, and trust signals placed at the right decision points.',
        },
        {
          title: 'Launch & Handover',
          body: 'Full QA, performance testing, and analytics setup before go-live. Post-launch, we walk you through everything shipped and provide 30 days of included support.',
        },
      ],
      whyItMatters:
        'A slow, outdated, or confusing website silently kills conversions every day. Studies show 53% of visitors leave a page that takes longer than 3 seconds to load. We build sites that load in under 1.5 seconds and are structured to convert — so your ad spend and SEO efforts actually pay off.',
      stats: [
        { value: '90+', label: 'PageSpeed score on every build' },
        { value: '3–5 wks', label: 'Average delivery timeline' },
        { value: '2×', label: 'Average lead increase post-launch' },
        { value: '30 days', label: 'Post-launch support included' },
      ],
      process: [
        'Discovery call & competitor audit',
        'Wireframes & design approval',
        'Full development & CMS setup',
        'QA, speed & SEO testing',
        'Go-live & analytics handover',
      ],
    },
  },
  {
    id: 'social',
    title: 'Social Media Management',
    tagline: 'A full-funnel social presence that turns followers into predictable pipeline.',
    description:
      'Stop posting aimlessly. We manage your end-to-end social channels — from strategy and high-quality reel creation to daily engagement — helping your business build trust, authority, and organic client inquiries.',
    icon: 'Share2',
    features: [
      'Monthly content strategy & multi-platform publishing calendars',
      'On-brand graphics and high-engagement short-form video production',
      'Active community engagement and rapid DM lead response handling',
      'Monthly performance reports focused on reach, growth, and conversion',
    ],
    details: {
      intro:
        'Social media done right is a compounding asset — every post, every reel, every reply builds authority and trust that turns cold audiences into warm leads. We run your channels end-to-end so you can focus on your business.',
      whatWeDeliver: [
        {
          title: 'Strategy & Planning',
          body: 'A monthly content calendar built around your business goals, audience pain points, and platform best practices — planned and approved before the month begins.',
        },
        {
          title: 'Content Creation',
          body: 'On-brand graphics, carousel posts, and high-retention short-form videos (Reels, Shorts, TikToks) produced by our in-house creative team. Everything matches your brand voice.',
        },
        {
          title: 'Community Management',
          body: 'We respond to comments and DMs within hours, turning engagement into conversations and conversations into enquiries. No auto-replies, no outsourced VAs.',
        },
        {
          title: 'Platform Publishing',
          body: 'Optimised posting times, platform-specific formatting, and hashtag strategy across Instagram, Facebook, LinkedIn, and TikTok — handled entirely by us.',
        },
        {
          title: 'Reporting & Insights',
          body: 'A monthly performance report tied to real metrics: reach, follower growth, engagement rate, and social-attributed enquiries. We tell you what worked and what we are doing next.',
        },
      ],
      whyItMatters:
        'Inconsistent posting, low-quality content, and zero engagement handling are the three things that kill social media ROI. Businesses that post consistently with on-brand content see 3–6x higher engagement than sporadic posters. We run the whole operation — so your feed always looks professional and your DMs are always answered.',
      stats: [
        { value: '3+', label: 'Platforms managed per client' },
        { value: '4×', label: 'Average engagement improvement' },
        { value: '7 days', label: 'To go live from sign-off' },
        { value: '14 days', label: 'Notice to pause or cancel' },
      ],
      process: [
        'Brand & audience onboarding',
        'Month 1 strategy & calendar approval',
        'Content production & scheduling',
        'Daily community management',
        'Monthly report & strategy refresh',
      ],
    },
  },
  {
    id: 'growth',
    title: 'Full-Stack Business Solutions',
    tagline: 'Complete digital transformation — Web, Social, and Performance Marketing working as one.',
    description:
      'For businesses ready to dominate their industry. We integrate custom web infrastructure, organic social media management, and targeted paid campaigns into a single revenue-generating system designed to scale your brand.',
    icon: 'TrendingUp',
    features: [
      'Complete digital presence overhaul (Website + Social Media + Ad Funnels)',
      'Multi-channel paid ad campaigns across Google, Meta, and LinkedIn',
      'Conversion Rate Optimization (CRO) and sales funnel architecture',
      'Dedicated growth strategy sprints focused on MAX ROI and business revenue',
    ],
    details: {
      intro:
        'Most businesses treat their website, social media, and ads as three separate things. We treat them as one revenue machine — designed together, measured together, and optimised together. This is the package for businesses serious about scaling.',
      whatWeDeliver: [
        {
          title: 'Full Digital Audit & Roadmap',
          body: 'We audit your entire digital presence — website speed, social channels, ad account structure, and competitor positioning — and deliver a 90-day growth roadmap with clear KPIs.',
        },
        {
          title: 'Website Overhaul',
          body: 'A conversion-focused website rebuild that serves as the hub for all your marketing. Fast, SEO-ready, and engineered to turn traffic from every channel into qualified leads.',
        },
        {
          title: 'Social Media Management',
          body: 'Full-service social management across your key platforms — strategy, content production, community management, and monthly reporting tied to lead generation goals.',
        },
        {
          title: 'Paid Ad Campaigns',
          body: 'Multi-channel paid campaigns across Google, Meta, and LinkedIn built around ROAS and CAC targets. Rapid creative testing, weekly optimisation, and transparent reporting.',
        },
        {
          title: 'CRO & Funnel Architecture',
          body: 'We design and test landing pages, lead magnets, and conversion funnels that turn paid and organic traffic into revenue — not just clicks.',
        },
        {
          title: 'Dedicated Strategy Sprints',
          body: 'Bi-weekly growth calls, monthly performance reviews, and quarterly strategy resets. One dedicated account manager owns your results end-to-end.',
        },
      ],
      whyItMatters:
        'Businesses that integrate web, social, and paid marketing into a single system consistently outperform those running siloed channels. When your website message matches your ads, and your social content reinforces both, every channel compounds the others — you get more from the same budget. This is how brands scale.',
      stats: [
        { value: '3.2×', label: 'Average ROAS improvement' },
        { value: '−47%', label: 'Average cost-per-lead reduction' },
        { value: '+212%', label: 'Average audience growth year 1' },
        { value: '1 team', label: 'One point of contact for everything' },
      ],
      process: [
        'Full digital audit & 90-day roadmap',
        'Website rebuild & launch',
        'Social media go-live',
        'Paid ad campaign launch',
        'Weekly optimisation & monthly reviews',
      ],
    },
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
    id: 'web-solutions',
    name: 'Custom Web Solutions',
    tagline: 'High-performance websites built to turn traffic into qualified leads.',
    description:
      'A custom, launch-ready website designed to represent your brand 24/7 and turn visitors into paying clients.',
    features: [
      'SEO-ready & Core Web Vitals optimized (90+ PageSpeed)',
      'Custom UI/UX design tailored to your brand identity',
      'High-converting landing pages for max lead generation',
      'Mobile-first responsive build across all devices',
      'Full hosting, domain setup & ongoing maintenance',
      'Launched in 3–5 weeks · 30 days post-launch support',
    ],
    highlighted: false,
  },
  {
    id: 'social-media',
    name: 'Social Media Management',
    tagline: 'A full-funnel social presence that turns followers into predictable pipeline.',
    description:
      'End-to-end social channel management — strategy, content creation, daily engagement, and reporting that drives real growth.',
    features: [
      'Monthly content strategy & multi-platform calendar',
      'On-brand graphics & short-form video / reel production',
      'Active community engagement & DM lead response',
      'Publishing across Instagram, Facebook, LinkedIn & more',
      'Monthly performance reports: reach, growth & conversions',
      'Pause anytime · 14-day notice',
    ],
    highlighted: false,
  },
  {
    id: 'full-stack-growth',
    name: 'Full-Stack Business Solutions',
    tagline: 'Complete digital transformation working as one revenue system.',
    description:
      'For businesses ready to dominate. Web infrastructure, social media, and paid campaigns integrated into a single scalable growth engine.',
    features: [
      'Complete digital presence overhaul (Web + Social + Ads)',
      'Multi-channel paid campaigns: Google, Meta & LinkedIn',
      'CRO & sales funnel architecture for maximum conversions',
      'Dedicated growth strategy sprints focused on MAX ROI',
      'Full analytics, attribution & revenue reporting',
      'Dedicated account manager · Priority support',
    ],
    highlighted: true,
  },
]

/*
  ABOUT PAGE DATA — stats, principles, and team are placeholder copy.
  TODO: Swap metrics, names, roles, and bios for the real team before launch.
*/
/** @type {AboutStat[]} */
export const ABOUT_STATS = [
  { id: 'clients', value: '40+', label: 'Clients served' },
  { id: 'traffic', value: '+120%', label: 'Avg. traffic lift in year one' },
  { id: 'campaigns', value: '180', label: 'Campaigns launched' },
]

/** @type {Principle[]} */
export const PRINCIPLES = [
  {
    id: 'one-team',
    title: 'One team, one strategy',
    description:
      'Your website, social presence, and ad spend are designed from the same brief — so the message never breaks between channels.',
  },
  {
    id: 'data-first',
    title: 'Data over guesswork',
    description:
      'Every decision starts with a number: ROAS, CAC, conversion rate. If it can’t be measured, it doesn’t ship.',
  },
  {
    id: 'built-to-scale',
    title: 'Built to scale, not just launch',
    description:
      'A site that can’t be updated and a campaign that can’t scale are both debt. We build assets that grow with your business.',
  },
  {
    id: 'run-it-right',
    title: 'Run it right, long after launch',
    description:
      'Launch is day one, not the finish line. We stay in it — reporting, iterating, and compounding the results.',
  },
]

/** @type {TeamMember[]} */
export const TEAM = [
  {
    id: 'founder',
    name: 'Founder',
    role: 'Strategy & Growth',
    bio: 'Sets the vision and owns client outcomes end to end. Bio is placeholder copy.',
  },
  {
    id: 'web-lead',
    name: 'Web Lead',
    role: 'Web Development',
    bio: 'Turns strategy into fast, conversion-ready websites. Bio is placeholder copy.',
  },
  {
    id: 'growth-lead',
    name: 'Growth Lead',
    role: 'Social & Performance',
    bio: 'Runs the channels and campaigns, then reports on what moved. Bio is placeholder copy.',
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


// ─────────────────────────────────────────────────────────────────────────────
// TECH STACK — displayed in TechMarquee on the services page.
// Icons are emoji for zero-dependency rendering; swap with SVG imports if
// you add react-icons or similar.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @typedef {Object} TechItem
 * @property {string} name
 * @property {string} icon - emoji or short symbol used as the logo placeholder
 */

/** @type {TechItem[]} */
export const TECH_STACK = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'TypeScript', icon: 'TS' },
  { name: 'Tailwind CSS', icon: '🎨' },
  { name: 'Django', icon: '🐍' },
  { name: 'Python', icon: '🐍' },
  { name: 'Node.js', icon: '🟩' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'MySQL', icon: '🐬' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'REST APIs', icon: '🔗' },
  { name: 'GraphQL', icon: '◈' },
  { name: 'Docker', icon: '🐳' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Vercel', icon: '▲' },
  { name: 'Figma', icon: '✏️' },
  { name: 'Google Ads', icon: '🎯' },
  { name: 'Meta Ads', icon: '📘' },
  { name: 'Shopify', icon: '🛍️' },
  { name: 'WordPress', icon: '📝' },
  { name: 'SEO', icon: '🔍' },
  { name: 'Analytics', icon: '📊' },
]

// ─────────────────────────────────────────────────────────────────────────────
// TESTIMONIALS — client reviews displayed on the services page.
// TODO: Replace with real client quotes before launch.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @typedef {Object} Testimonial
 * @property {string} id
 * @property {string} quote
 * @property {string} name
 * @property {string} role
 * @property {string} company
 * @property {string} initials - two-letter avatar fallback
 * @property {number} rating - 1–5
 * @property {string} service - which service was delivered
 */

/** @type {Testimonial[]} */
export const TESTIMONIALS = [
  {
    id: 'finlytics',
    quote:
      'Vision Tech completely transformed how our product is perceived online. Demo requests went up 184% — same ad budget, better page, better results. The whole process was fast, well-communicated, and genuinely impressive.',
    name: 'Arjun Mehta',
    role: 'Head of Growth',
    company: 'Finlytics',
    initials: 'AM',
    rating: 5,
    service: 'Web Development',
  },
  {
    id: 'bloom-co',
    quote:
      'We went from 1.1x to 3.2x ROAS in 90 days. I was skeptical at first, but Vision Tech backed every decision with data and the results speak for themselves.',
    name: 'Priya Sharma',
    role: 'Marketing Director',
    company: 'Bloom & Co.',
    initials: 'PS',
    rating: 5,
    service: 'Performance Marketing',
  },
  {
    id: 'nimbus',
    quote:
      'Launching a brand from zero is terrifying. Vision Tech made it feel methodical and achievable. The content strategy they built was so cohesive — our audience grew 212% in the first year.',
    name: 'Rohan Kapoor',
    role: 'Founder',
    company: 'Nimbus Apparel',
    initials: 'RK',
    rating: 5,
    service: 'Social Media',
  },
  {
    id: 'harbor',
    quote:
      'Our checkout conversion improved by 64%. The team was meticulous — they tested everything before going live. Highly recommend.',
    name: 'Sarah Lin',
    role: 'E-commerce Manager',
    company: 'Harbor Goods',
    initials: 'SL',
    rating: 5,
    service: 'Web Development',
  },
  {
    id: 'vertex',
    quote:
      'Cost per lead dropped 47% and our pipeline quality improved at the same time. Vision Tech doesn\'t just run ads — they think about the whole funnel.',
    name: 'Dev Patel',
    role: 'Managing Partner',
    company: 'Vertex Legal',
    initials: 'DP',
    rating: 5,
    service: 'Performance Marketing',
  },
  {
    id: 'pulse',
    quote:
      'From zero to 1.2M monthly reach — the content system they built runs like clockwork. Memberships from social tripled year over year.',
    name: 'Aisha Nair',
    role: 'Brand Manager',
    company: 'Pulse Fitness',
    initials: 'AN',
    rating: 5,
    service: 'Social Media',
  },
  {
    id: 'greenleaf',
    quote:
      'Vision Tech redesigned our entire e-commerce experience in 5 weeks. Bounce rate dropped and average session time doubled.',
    name: 'Marcus Webb',
    role: 'CEO',
    company: 'Greenleaf Co.',
    initials: 'MW',
    rating: 5,
    service: 'Web Development',
  },
  {
    id: 'orion',
    quote:
      'The SEO roadmap they delivered was the most actionable one we\'d seen. Organic traffic up 94% in six months — no tricks, just solid strategy.',
    name: 'Tanvi Rao',
    role: 'Head of Digital',
    company: 'Orion SaaS',
    initials: 'TR',
    rating: 5,
    service: 'SEO Services',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// FAQS — Frequently Asked Questions displayed on the services page.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @typedef {Object} Faq
 * @property {string} id
 * @property {string} question
 * @property {string} answer
 */

/** @type {Faq[]} */
export const FAQS = [
  {
    id: 'how-long',
    question: 'How long does a website project typically take?',
    answer:
      'Most websites take 3–5 weeks from kick-off to launch. A 5-page custom site is usually ready in 3–4 weeks; larger projects with a custom backend or CMS take 4–6 weeks. We give you a firm timeline in the proposal so there are no surprises.',
  },
  {
    id: 'pricing',
    question: 'How is your pricing structured?',
    answer:
      'Web development is priced per project — you get a fixed quote before we start and the price doesn\'t change unless the scope does. Social media and marketing retainers are monthly, and you can pause or cancel with 14 days\' notice. No hidden fees, no lock-in contracts.',
  },
  {
    id: 'stack',
    question: 'What technologies do you build with?',
    answer:
      'We primarily build with React / Next.js on the frontend, Django or Node.js on the backend, and PostgreSQL or MySQL for data. For e-commerce we work with Shopify. For simpler sites we use WordPress with a custom theme. We recommend the right stack for your use case — not the one we\'re most comfortable with.',
  },
  {
    id: 'social-included',
    question: 'What\'s included in social media management?',
    answer:
      'A monthly content calendar, on-brand graphics, short-form video production, daily community management, and a monthly performance report tied to real growth metrics. We manage up to 3 platforms (Instagram, Facebook, LinkedIn, or TikTok — your choice) and keep everything consistent with your brand voice.',
  },
  {
    id: 'seo',
    question: 'Do you handle SEO?',
    answer:
      'Yes. Every website we build includes on-page SEO fundamentals and Core Web Vitals optimization. We also offer standalone SEO retainers that cover technical audits, keyword research, content roadmaps, and monthly reporting. Ask us about bundling SEO with your web project for the best results.',
  },
  {
    id: 'revisions',
    question: 'How many revisions do I get?',
    answer:
      'We work in a structured review-and-approval flow, so you see the work at each stage before we move on. For design, you get two rounds of revisions per milestone. For content and copy, unlimited minor edits before sign-off. Our goal is that you\'re fully satisfied — we don\'t nickel-and-dime revision rounds.',
  },
  {
    id: 'support',
    question: 'What happens after the website goes live?',
    answer:
      'Every website project includes 30 days of post-launch support — bug fixes, small tweaks, and questions answered at no extra cost. After that, we offer ongoing maintenance plans that cover updates, uptime monitoring, and security patches. We\'re not a build-and-disappear agency.',
  },
  {
    id: 'start',
    question: 'How do I get started?',
    answer:
      'Book a free 30-minute discovery call via the Contact page. We\'ll ask about your goals, current situation, and timeline — and come back to you with a clear proposal within 2 business days. No sales pressure, no commitment required.',
  },
]

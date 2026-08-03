// Site footer — navy band with brand blurb, contact email, quick links,
// services, and social handles. Rendered once in the root layout.
import { Instagram, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'
import {
  NAV_LINKS,
  SERVICES,
  WHATSAPP_DISPLAY,
  WHATSAPP_LINK,
} from '@/lib/constants'
import { WhatsAppIcon } from '@/components/layout/WhatsAppButton'

// Sample contact details — swap in the live handles before launch.
const CONTACT_EMAIL = 'visionindtech@gmail.com'
const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/visiontech.io',
    Icon: Instagram,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/vision-tech-agency',
    Icon: Linkedin,
  },
  {
    label: 'X',
    href: 'https://x.com/visiontech',
    Icon: Twitter,
  },
]

const linkClass =
  'text-small text-ice/80 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'

export default function Footer() {
  return (
    <footer className="noise-overlay relative overflow-hidden bg-navy text-offwhite">
      <div className="container grid gap-12 py-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-8 lg:py-20">
        {/* Brand */}
        <div>
          <Link
            href="/"
            className="font-heading text-lg font-semibold tracking-tight text-offwhite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Vision<span className="text-brand">Tech</span>
          </Link>
          <p className="mt-4 max-w-xs leading-relaxed text-ice/70">
            Web development, social media management, and performance marketing
            — one team engineered to move traffic, conversions, and revenue from
            first audit to scale.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className={`mt-6 block font-semibold ${linkClass}`}
          >
            {CONTACT_EMAIL}
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className={`mt-2 flex items-center gap-2 font-semibold ${linkClass}`}
          >
            <WhatsAppIcon
              className="h-4 w-4 shrink-0 text-[#25D366]"
              aria-hidden="true"
            />
            {WHATSAPP_DISPLAY}
          </a>
        </div>

        {/* Company links */}
        <nav aria-label="Company">
          <h3 className="text-caption text-ice/50">Company</h3>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services links */}
        <nav aria-label="Services">
          <h3 className="text-caption text-ice/50">Services</h3>
          <ul className="mt-5 space-y-3">
            {SERVICES.map((service) => (
              <li key={service.id}>
                <Link
                  href={`/contact?service=${service.id}`}
                  className={linkClass}
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social handles */}
        <div>
          <h3 className="text-caption text-ice/50">Social</h3>
          <ul className="mt-5 space-y-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2.5 ${linkClass}`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-ice/10">
        <div className="container flex flex-col items-start justify-between gap-3 py-6 text-small text-ice/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Vision Tech. All rights reserved.</p>
          <p>Web · Social · Growth</p>
        </div>
      </div>
    </footer>
  )
}

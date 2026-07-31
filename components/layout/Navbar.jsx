'use client'

// Site navigation — sticky header, always solid off-white with dark links so
// nav items are legible from the first paint (no transparent state over the
// hero). Carries a slim brand scroll-progress bar along its bottom edge and
// swaps in the full-screen MobileMenu on small screens.
import { useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import MobileMenu from '@/components/layout/MobileMenu'
import { NAV_LINKS } from '@/lib/constants'

const linkClass =
  'text-small font-medium text-navy/70 transition-colors hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.4,
  })

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-offwhite/90 shadow-soft backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            className="font-heading text-lg font-semibold tracking-tight text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Vision<span className="text-brand">Tech</span>
          </Link>

          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Primary"
          >
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button href="/contact" size="sm" className="hidden md:inline-flex">
              Book a free audit
            </Button>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-md border border-navy/20 text-navy transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Slim scroll-progress bar */}
        <motion.div
          aria-hidden="true"
          className="h-0.5 origin-left bg-brand"
          style={{ scaleX: progress }}
        />
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  )
}

'use client'

// Site navigation — sticky header, always solid off-white with dark links.
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import MobileMenu from '@/components/layout/MobileMenu'
import { NAV_LINKS } from '@/lib/constants'

const linkClass =
  'text-small font-medium text-navy/70 transition-colors hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-offwhite/90 shadow-soft backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="Vision Tech — home"
            className="shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <Image
              src="/images/logo.png"
              alt="Vision Tech — home"
              width={784}
              height={234}
              priority
              className="h-9 w-auto"
            />
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
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  )
}

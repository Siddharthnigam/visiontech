'use client'

// Mobile menu — full-screen overlay for small screens. Nav links stagger in
// with framer-motion, focus is trapped inside while open, Escape or clicking
// a link closes it, and body scroll is locked while it is visible.
import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { NAV_LINKS } from '@/lib/constants'
import { EASE } from '@/lib/utils'

function containerVariants(reduce) {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.05 },
    },
  }
}

function itemVariants(reduce) {
  return {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  }
}

export default function MobileMenu({ open, onClose }) {
  const reduce = useReducedMotion()
  const menuRef = useRef(null)

  // While open: lock body scroll, focus the first nav link, trap Tab, and
  // close on Escape.
  useEffect(() => {
    if (!open) return
    const node = menuRef.current
    if (!node) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusables = () =>
      Array.from(node.querySelectorAll('a[href], button:not([disabled])'))
    const first = node.querySelector('nav a[href]')
    first?.focus()

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return
      const items = focusables()
      if (!items.length) return
      const firstEl = items[0]
      const lastEl = items[items.length - 1]
      if (event.shiftKey && document.activeElement === firstEl) {
        event.preventDefault()
        lastEl.focus()
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault()
        firstEl.focus()
      }
    }

    node.addEventListener('keydown', onKeyDown)
    return () => {
      node.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={menuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          variants={containerVariants(reduce)}
          className="noise-overlay fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-navy text-offwhite"
        >
          <motion.div
            variants={itemVariants(reduce)}
            className="container flex h-16 items-center justify-between"
          >
            <span className="font-heading text-lg font-semibold tracking-tight text-offwhite">
              Vision<span className="text-brand">Tech</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              className="grid h-10 w-10 place-items-center rounded-md border border-ice/30 text-ice transition-colors hover:border-ice hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </motion.div>

          <nav
            aria-label="Mobile"
            variants={containerVariants(reduce)}
            className="container flex flex-1 flex-col justify-center py-8"
          >
            {NAV_LINKS.map((link) => (
              <motion.div key={link.href} variants={itemVariants(reduce)}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="group flex items-center justify-between border-b border-ice/15 py-4 font-heading text-3xl font-semibold tracking-tight text-offwhite transition-colors hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  {link.label}
                  <ArrowUpRight
                    className="h-6 w-6 text-ice/50 transition-colors group-hover:text-brand"
                    aria-hidden="true"
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            variants={itemVariants(reduce)}
            className="container pb-10"
          >
            <Button href="/contact" onClick={onClose} className="w-full">
              Book a free audit
            </Button>
            <p className="mt-4 text-center text-small text-ice/60">
              hello@visiontech.agency
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

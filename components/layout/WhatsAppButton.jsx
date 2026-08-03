'use client'

// WhatsAppButton — fixed bottom-right floating chat button, rendered once
// in the root layout so it appears on every page. Opens a wa.me deep link
// with a pre-filled message; no backend involved.
//
// - Official WhatsApp glyph drawn inline (lucide has no brand icons).
// - Tooltip label appears on hover/focus; entrance + hover handled by
//   framer-motion, disabled under prefers-reduced-motion.

import { motion, useReducedMotion } from 'framer-motion'
import { WHATSAPP_LINK } from '@/lib/constants'

// Official WhatsApp logo mark (24x24 viewBox) — white glyph for use on the
// brand-green button.
export function WhatsAppIcon({ className, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.668-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  )
}

export default function WhatsAppButton() {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className="fixed bottom-5 right-5 z-50 md:bottom-6 md:right-6"
      initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Vision Tech on WhatsApp"
        className="group flex items-center gap-0 rounded-full bg-[#25D366] p-3.5 text-white shadow-elevated transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:p-4"
      >
        <WhatsAppIcon className="h-6 w-6 md:h-7 md:w-7" />
        {/* Expanding label on hover (desktop only) */}
        <span
          aria-hidden="true"
          className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-200 group-hover:ml-2.5 group-hover:max-w-40 group-hover:opacity-100 md:inline-block"
        >
          Chat with us
        </span>
      </a>
    </motion.div>
  )
}

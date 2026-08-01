'use client'

// Faq — always-visible FAQ section. No framer-motion initial hidden state.
// Layout: left sticky heading (2fr) | right accordion list (3fr).
import { useState } from 'react'
import PropTypes from 'prop-types'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { FAQS } from '@/lib/constants'
import { cn } from '@/lib/utils'

function FaqItem({ item, index }) {
  const [open, setOpen] = useState(false)

  return (
    <li className="border-b border-navy/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`faq-${item.id}`}
        className="flex w-full items-start gap-4 py-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <span className="text-caption mt-0.5 w-6 shrink-0 text-brand">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span
          className={cn(
            'flex-1 font-heading text-base font-semibold leading-snug tracking-tight transition-colors lg:text-lg',
            open ? 'text-brand' : 'text-navy'
          )}
        >
          {item.question}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            'mt-0.5 h-5 w-5 shrink-0 text-navy/30 transition-transform duration-300',
            open && 'rotate-180 text-brand'
          )}
        />
      </button>

      <div
        id={`faq-${item.id}`}
        role="region"
        style={{
          maxHeight: open ? '400px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.35s ease',
        }}
      >
        <div className="pb-6 pl-10 pr-2">
          <p className="text-base leading-relaxed text-navy/70">
            {item.answer}
          </p>
        </div>
      </div>
    </li>
  )
}

FaqItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
}

export default function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-white py-20 lg:py-28"
    >
      <div className="container grid gap-14 lg:grid-cols-[2fr_3fr] lg:gap-24">

        {/* Left sticky heading — plain div, always visible */}
        <div className="lg:sticky lg:top-10 lg:self-start">
          <span className="text-caption text-brand">FAQ</span>
          <h2 id="faq-heading" className="mt-4 text-navy">
            Frequently asked questions.
          </h2>
          <p className="mt-5 max-w-xs text-lg leading-relaxed text-navy/60">
            Can&apos;t find what you&apos;re looking for?
            <br />
            We&apos;re happy to chat.
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-small font-semibold text-white shadow-soft transition-colors hover:bg-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Ask us anything
          </Link>
        </div>

        {/* Right accordion — plain ol, always visible */}
        <ol className="border-t border-navy/10">
          {FAQS.map((item, i) => (
            <FaqItem key={item.id} item={item} index={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}

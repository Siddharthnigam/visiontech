'use client'

// ScrollReveal — shared framer-motion reveal primitives.
//
// KEY FIX: We use `initial={false}` on the server (SSR) so elements are
// never rendered with opacity:0 in the HTML. After the client mounts, we
// switch to `initial="hidden"` only for elements that haven't animated yet.
// This prevents the "stuck invisible" bug where whileInView never fires for
// elements that are already in the viewport on page load.
//
// All animations respect prefers-reduced-motion.

import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '@/lib/utils'

const VIEWPORT = { once: true, amount: 0 }

function revealVariants(reduce, y, delay) {
  if (reduce)
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
  return {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE, delay },
    },
  }
}

// Reveal — fades/slides a single block into view on scroll.
export default function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 20,
  amount,
  ...props
}) {
  const reduce = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <motion.div
      className={className}
      // Before mount: render fully visible (no animation)
      // After mount: animate from hidden on scroll
      initial={mounted ? 'hidden' : false}
      whileInView="show"
      viewport={{ ...VIEWPORT, amount: amount ?? 0 }}
      variants={revealVariants(reduce, y, delay)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// StaggerGroup — parent that staggers its StaggerItem children into view.
export function StaggerGroup({
  as = 'div',
  children,
  className,
  stagger = 0.08,
  amount,
  ...props
}) {
  const reduce = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      initial={mounted ? 'hidden' : false}
      whileInView="show"
      viewport={{ ...VIEWPORT, amount: amount ?? 0 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : stagger } },
      }}
      {...props}
    >
      {children}
    </MotionTag>
  )
}

// StaggerItem — child of StaggerGroup; single reveal unit in the sequence.
export function StaggerItem({
  as = 'div',
  children,
  className,
  y = 20,
  ...props
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      variants={revealVariants(reduce, y)}
      {...props}
    >
      {children}
    </MotionTag>
  )
}

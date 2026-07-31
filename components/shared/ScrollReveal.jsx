// ScrollReveal — shared framer-motion reveal primitives. All animations
// respect prefers-reduced-motion: when set, content renders fully visible
// (no transform/opacity animation, instant state change).
'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { EASE, VIEWPORT } from '@/lib/utils'

function revealVariants(reduce, y, delay) {
  if (reduce)
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
  return {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE, delay },
    },
  }
}

// Reveal — fades/slides a single block into view on scroll.
export default function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 28,
  amount = VIEWPORT.amount,
  ...props
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
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
  stagger = 0.09,
  amount = VIEWPORT.amount,
  ...props
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
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
  y = 28,
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

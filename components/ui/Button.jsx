'use client'

// Button — reusable button/link with variants, sizes, hover micro-scale,
// and an optional magnetic (cursor-follow) effect reserved for primary CTAs.
import { useRef } from 'react'
import { motion, useReducedMotion, useSpring } from 'framer-motion'
import { cn, EASE } from '@/lib/utils'

const baseClasses =
  'inline-flex items-center justify-center rounded-md text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'

const variantClasses = {
  primary:
    'border border-transparent bg-brand text-white shadow-soft hover:bg-navy hover:shadow-elevated',
  outline:
    'border border-navy/20 bg-transparent text-navy hover:border-brand hover:text-brand',
  ghost:
    'border border-ice/30 bg-transparent text-ice hover:border-ice hover:text-white',
}

const sizeClasses = {
  sm: 'px-4 py-2',
  md: 'px-6 py-3.5',
  lg: 'px-8 py-4',
}

// Magnetic — cursor-follow wrapper. Only used on primary CTA buttons.
// Disabled entirely under prefers-reduced-motion.
function Magnetic({ children, strength = 0.18, className }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const x = useSpring(0, { stiffness: 220, damping: 18 })
  const y = useSpring(0, { stiffness: 220, damping: 18 })

  function handleMove(event) {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * @param {object} props
 * @param {string} [props.as] - override element ('a' | 'button' | ...)
 * @param {string} [props.href] - renders an anchor when provided
 * @param {'primary'|'outline'|'ghost'} [props.variant]
 * @param {'sm'|'md'|'lg'} [props.size]
 * @param {boolean} [props.magnetic] - magnetic cursor-follow (primary CTAs only)
 */
export default function Button({
  as,
  href,
  variant = 'primary',
  size = 'md',
  magnetic = false,
  className,
  children,
  ...props
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as ?? (href ? 'a' : 'button')]
  const motionProps = {
    whileHover: reduce ? undefined : { scale: 1.04 },
    whileTap: reduce ? undefined : { scale: 0.97 },
    transition: { duration: 0.25, ease: EASE },
    className: cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className
    ),
    ...props,
  }

  const element =
    href !== undefined ? (
      <MotionTag href={href} {...motionProps}>
        {children}
      </MotionTag>
    ) : (
      <MotionTag {...motionProps}>{children}</MotionTag>
    )

  if (magnetic) {
    return <Magnetic className="inline-flex">{element}</Magnetic>
  }
  return element
}

'use client'

// WorkVisual — floating result cards (mini metric callouts echoing the case
// study card stat styling) arranged with slight overlap and depth over a
// faint dashed growth arc. Cards fade in staggered on scroll, then drift on
// a slow continuous float loop. The third card drops out on mobile.
import { motion, useReducedMotion } from 'framer-motion'
import { cn, EASE } from '@/lib/utils'

const CARDS = [
  {
    id: 1,
    value: '+142%',
    label: 'Avg. conversion lift',
    pos: 'left-[6%] top-[8%] w-[52%]',
    rotate: -3,
    floatDuration: 5.2,
    delay: 0.1,
  },
  {
    id: 2,
    value: '3.2x',
    label: 'Return on ad spend',
    pos: 'right-[5%] top-[36%] w-[56%] z-10',
    rotate: 2,
    floatDuration: 6.4,
    delay: 0.3,
  },
  {
    id: 3,
    value: '+58k',
    label: 'Monthly organic reach',
    pos: 'left-[16%] bottom-[6%] w-[50%] hidden sm:block',
    rotate: -1.5,
    floatDuration: 5.8,
    delay: 0.5,
  },
]

export default function WorkVisual() {
  const reduce = useReducedMotion()

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-md sm:max-w-none">
      <Backdrop />

      {CARDS.map((card) => (
        <motion.div
          key={card.id}
          className={cn('absolute', card.pos)}
          initial={reduce ? false : { opacity: 0, x: 26, y: 22 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE, delay: card.delay }}
        >
          <motion.div
            style={{ rotate: card.rotate }}
            animate={reduce ? undefined : { y: [0, -7, 0] }}
            transition={{
              duration: card.floatDuration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: card.delay,
            }}
            className="rounded-lg bg-white p-5 shadow-elevated lg:p-6"
          >
            <span className="block font-heading text-3xl font-semibold tracking-tight text-brand lg:text-4xl">
              {card.value}
            </span>
            <span className="mt-1 block text-small text-navy/60">
              {card.label}
            </span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

// Backdrop — faint dashed growth arcs + measurement ticks behind the cards,
// echoing the "results on a chart" theme without competing with them.
function Backdrop() {
  return (
    <svg
      viewBox="0 0 460 345"
      className="absolute inset-0 h-full w-full"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M 30 312 A 195 195 0 0 1 430 312"
        stroke="#E0F2FE"
        strokeOpacity="0.18"
        strokeWidth="1.5"
        strokeDasharray="3 7"
        strokeLinecap="round"
      />
      <path
        d="M 38 334 A 236 236 0 0 1 442 262"
        stroke="#E0F2FE"
        strokeOpacity="0.12"
        strokeWidth="1.5"
        strokeDasharray="2 8"
        strokeLinecap="round"
      />
      {[70, 200, 330].map((x) => (
        <line
          key={x}
          x1={x}
          y1="14"
          x2={x}
          y2="24"
          stroke="#E0F2FE"
          strokeOpacity="0.2"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  )
}

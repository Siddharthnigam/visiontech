'use client'

// ContactVisual — deliberately calm: two nodes ("You" and "Vision Tech")
// joined by a single dashed line with a soft brand pulse traveling along it
// on a slow loop. No scroll-triggered reveal — just a gentle fade-in on load,
// because this page's job is the form, not the show.
import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '@/lib/utils'

const ORIGIN = { originX: 0.5, originY: 0.5 }

const YOU = { x: 96, y: 180 }
const VT = { x: 364, y: 180 }

export default function ContactVisual() {
  const reduce = useReducedMotion()

  return (
    <svg
      viewBox="0 0 460 360"
      className="h-auto w-full text-ice"
      fill="none"
      aria-hidden="true"
    >
      <motion.g
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.15 }}
      >
        <line
          x1={YOU.x}
          y1={YOU.y}
          x2={VT.x}
          y2={VT.y}
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          strokeLinecap="round"
        />

        {reduce ? (
          <circle cx={(YOU.x + VT.x) / 2} cy={YOU.y} r="3.5" fill="#0066FF" />
        ) : (
          <motion.circle
            r="4"
            fill="#0066FF"
            initial={{ cx: YOU.x, cy: YOU.y, opacity: 0 }}
            animate={{
              cx: [YOU.x, VT.x, YOU.x],
              cy: YOU.y,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              times: [0, 0.35, 1],
            }}
          />
        )}

        <circle cx={VT.x} cy={VT.y} r="26" fill="#0066FF" fillOpacity="0.08" />
        <circle cx={VT.x} cy={VT.y} r="42" fill="#0066FF" fillOpacity="0.05" />

        <Node {...YOU} label="You" />
        <Node {...VT} label="Vision Tech" brand />
      </motion.g>
    </svg>
  )
}

function Node({ x, y, label, brand }) {
  const reduce = useReducedMotion()

  return (
    <g>
      <motion.g
        style={ORIGIN}
        animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <circle
          cx={x}
          cy={y}
          r="14"
          stroke={brand ? '#0066FF' : 'currentColor'}
          strokeOpacity={brand ? undefined : 0.7}
          strokeWidth="2"
        />
        {brand ? (
          <text
            x={x}
            y={y + 5}
            textAnchor="middle"
            className="text-[13px] font-semibold"
            fill="#0066FF"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            VT
          </text>
        ) : (
          <circle cx={x} cy={y} r="3" fill="currentColor" />
        )}
      </motion.g>
      <text
        x={x}
        y={y + 38}
        textAnchor="middle"
        className="text-[11px] font-semibold uppercase tracking-[0.18em]"
        fill="currentColor"
        fillOpacity="0.8"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {label}
      </text>
    </g>
  )
}

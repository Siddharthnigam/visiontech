'use client'

// AboutVisual — editorial "growth trajectory" composition: a hand-drawn-
// feeling arc that dips from the left to the bottom, then rises to the right,
// with milestone markers that pulse once the line has drawn in. Sits on a
// subtle ice-blue blob so the section reads organic, not diagrammatic.
import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '@/lib/utils'

const ORIGIN = { originX: 0.5, originY: 0.5 }

const LINE = 'M 64 116 C 88 176, 110 252, 156 278 C 200 302, 240 280, 280 252 C 320 224, 356 182, 400 112'
const LINE_SKETCH = 'M 67 120 C 91 180, 113 256, 159 282 C 203 306, 243 284, 283 256 C 323 228, 359 186, 403 116'
const BLOB =
  'M 230 32 C 322 26, 416 88, 418 182 C 420 276, 348 332, 244 332 C 140 332, 44 276, 42 182 C 40 88, 138 38, 230 32 Z'

const MARKERS = [
  { x: 156, y: 278, delay: 1.0, pulse: 0.4 },
  { x: 280, y: 252, delay: 1.15, pulse: 1.0 },
  { x: 400, y: 112, delay: 1.3, pulse: 1.6 },
]

export default function AboutVisual() {
  const reduce = useReducedMotion()

  return (
    <svg
      viewBox="0 0 460 360"
      className="h-auto w-full text-ice"
      fill="none"
      aria-hidden="true"
    >
      <motion.path
        d={BLOB}
        fill="#E0F2FE"
        fillOpacity="0.22"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE }}
      />

      <motion.path
        d={LINE_SKETCH}
        stroke="currentColor"
        strokeOpacity="0.14"
        strokeWidth="6"
        strokeLinecap="round"
        initial={reduce ? false : { strokeDashoffset: 900, opacity: 0 }}
        whileInView={{ strokeDashoffset: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease: EASE }}
      />

      <motion.path
        d={LINE}
        stroke="currentColor"
        strokeOpacity="0.85"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={reduce ? false : { strokeDashoffset: 900, opacity: 0 }}
        whileInView={{ strokeDashoffset: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease: EASE }}
      />

      <g className="hidden sm:block">
        {[
          { x: 118, y: 96, r: 2 },
          { x: 330, y: 252, r: 2.5 },
          { x: 214, y: 304, r: 2 },
          { x: 388, y: 58, r: 2 },
        ].map((dot) => (
          <circle
            key={`${dot.x}-${dot.y}`}
            cx={dot.x}
            cy={dot.y}
            r={dot.r}
            stroke="currentColor"
            strokeOpacity="0.3"
            strokeWidth="1.5"
          />
        ))}
      </g>

      {MARKERS.map((marker) => (
        <g key={`${marker.x}-${marker.y}`}>
          <motion.g
            style={ORIGIN}
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: EASE, delay: marker.delay }}
          >
            <circle cx={marker.x} cy={marker.y} r="3.5" fill="#0066FF" />
            <circle
              cx={marker.x}
              cy={marker.y}
              r="7"
              stroke="#0066FF"
              strokeOpacity="0.5"
              strokeWidth="1.5"
            />
          </motion.g>
          {!reduce && (
            <motion.circle
              cx={marker.x}
              cy={marker.y}
              r={7}
              stroke="#0066FF"
              strokeWidth="1.5"
              initial={{ opacity: 0.5 }}
              animate={{ r: [7, 18], opacity: [0.5, 0] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeOut',
                delay: marker.delay + marker.pulse,
              }}
            />
          )}
        </g>
      ))}
    </svg>
  )
}

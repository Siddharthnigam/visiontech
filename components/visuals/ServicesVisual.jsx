'use client'

// ServicesVisual — three service icons (browser / social feed / growth
// chart) arranged as a loose diagonal system connected by dashed lines that
// draw in on scroll. Hovering a service in the intro list drives the `active`
// prop, which scales the matching shape and adds a brand-blue glow.
import PropTypes from 'prop-types'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '@/lib/utils'

const ORIGIN = { originX: 0.5, originY: 0.5 }
const GLOW = { filter: 'drop-shadow(0 0 10px rgba(0, 102, 255, 0.55))' }

const CONNECTORS = [
  'M162 74 C 202 78, 232 118, 272 130',
  'M286 186 C 250 208, 220 214, 186 232',
  'M52 118 C 58 162, 64 190, 76 224',
]

export default function ServicesVisual({ active = null }) {
  const reduce = useReducedMotion()

  return (
    <svg
      viewBox="0 0 460 360"
      className="h-auto w-full text-ice"
      fill="none"
      aria-hidden="true"
    >
      {CONNECTORS.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="currentColor"
          strokeOpacity="0.45"
          strokeWidth="1.5"
          strokeDasharray="5 7"
          strokeLinecap="round"
          initial={reduce ? false : { strokeDashoffset: 500, opacity: 0 }}
          whileInView={{ strokeDashoffset: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: EASE, delay: 0.25 + i * 0.15 }}
        />
      ))}

      <ShapeWrap
        id="web"
        active={active}
        delay={0.55}
        floatDelay={0}
      >
        <g transform="translate(34 24)">
          <rect
            x="0"
            y="0"
            width="128"
            height="96"
            rx="12"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="14" cy="14" r="2.5" fill="#0066FF" />
          <circle cx="24" cy="14" r="2.5" fill="#0066FF" />
          <circle cx="34" cy="14" r="2.5" fill="#0066FF" />
          <path
            d="M 0 22 H 128"
            stroke="currentColor"
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />
          <path
            d="M 18 42 H 96 M 18 56 H 84 M 18 70 H 102"
            stroke="currentColor"
            strokeOpacity="0.5"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <rect x="18" y="74" width="30" height="12" rx="6" fill="#0066FF" />
          <ShapeLabel x={64} y={122}>
            Web
          </ShapeLabel>
        </g>
      </ShapeWrap>

      <ShapeWrap
        id="social"
        active={active}
        delay={0.7}
        floatDelay={1.4}
      >
        <g transform="translate(272 76)">
          <rect
            x="0"
            y="0"
            width="132"
            height="112"
            rx="14"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            cx="26"
            cy="28"
            r="9"
            stroke="currentColor"
            strokeOpacity="0.6"
            strokeWidth="1.5"
          />
          <path
            d="M 44 23 H 104 M 44 33 H 92"
            stroke="currentColor"
            strokeOpacity="0.5"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M 66 82 C 60 73, 49 68, 45 60 C 42 54, 47 49, 53 49 C 57 49, 61 51, 66 56 C 71 51, 75 49, 79 49 C 85 49, 90 54, 87 60 C 83 68, 72 73, 66 82 Z"
            fill="#0066FF"
          />
          <circle
            cx="116"
            cy="10"
            r="6"
            stroke="currentColor"
            strokeOpacity="0.7"
            strokeWidth="1.5"
          />
          <circle
            cx="128"
            cy="20"
            r="5"
            stroke="currentColor"
            strokeOpacity="0.7"
            strokeWidth="1.5"
          />
          <circle
            cx="120"
            cy="30"
            r="4"
            stroke="currentColor"
            strokeOpacity="0.7"
            strokeWidth="1.5"
          />
          <circle cx="24" cy="96" r="2.5" fill="#0066FF" />
          <circle cx="34" cy="96" r="2.5" fill="currentColor" fillOpacity="0.4" />
          <circle cx="44" cy="96" r="2.5" fill="currentColor" fillOpacity="0.4" />
          <ShapeLabel x={66} y={140}>
            Social
          </ShapeLabel>
        </g>
      </ShapeWrap>

      <ShapeWrap
        id="marketing"
        active={active}
        delay={0.85}
        floatDelay={2.8}
      >
        <g transform="translate(56 218)">
          <path
            d="M 0 92 H 128"
            stroke="currentColor"
            strokeOpacity="0.5"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <rect x="8" y="64" width="18" height="28" rx="3" fill="#0066FF" fillOpacity="0.85" />
          <rect x="42" y="46" width="18" height="46" rx="3" fill="#0066FF" fillOpacity="0.55" />
          <rect x="76" y="30" width="18" height="62" rx="3" fill="#0066FF" fillOpacity="0.85" />
          <path
            d="M 8 70 L 40 54 L 68 40 L 116 20"
            stroke="#0066FF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 108 14 L 120 20 L 108 26"
            stroke="#0066FF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <ShapeLabel x={64} y={118}>
            Marketing
          </ShapeLabel>
        </g>
      </ShapeWrap>
    </svg>
  )
}

ServicesVisual.propTypes = {
  active: PropTypes.oneOf(['web', 'social', 'marketing', null]),
}

// ShapeLabel — small tracked uppercase caption under each icon. Hidden on
// mobile where the intro list already names the services.
function ShapeLabel({ x, y, children }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      className="hidden text-[11px] font-semibold uppercase tracking-[0.18em] sm:block"
      fill="currentColor"
      fillOpacity="0.85"
      style={{ fontFamily: 'var(--font-heading)' }}
    >
      {children}
    </text>
  )
}

// ShapeWrap — shared reveal + idle float + hover-highlight wrapper. The outer
// group handles the scroll reveal; the inner group runs the slow float loop
// and the active-state scale + brand glow, so the two never fight.
function ShapeWrap({ id, active, delay, floatDelay, children }) {
  const reduce = useReducedMotion()
  const isActive = active === id

  return (
    <motion.g
      style={ORIGIN}
      initial={reduce ? false : { opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      <motion.g
        style={{ ...ORIGIN, color: isActive ? '#0066FF' : undefined }}
        animate={{
          y: reduce ? 0 : [0, -5, 0],
          scale: isActive ? 1.06 : 1,
        }}
        transition={
          reduce
            ? { scale: { duration: 0.35, ease: EASE } }
            : {
                y: {
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: floatDelay,
                },
                scale: { duration: 0.35, ease: EASE },
              }
        }
      >
        <g style={isActive ? GLOW : undefined}>{children}</g>
      </motion.g>
    </motion.g>
  )
}

ShapeWrap.propTypes = {
  id: PropTypes.string.isRequired,
  active: PropTypes.string,
  delay: PropTypes.number.isRequired,
  floatDelay: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
}

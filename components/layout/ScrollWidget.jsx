'use client'

// ScrollWidget — fixed right-side floating widget with two parts:
// 1. Vertical progress bar (thin pill, fills from top as user scrolls)
// 2. Scroll-to-top button (arrow up icon, appears after scrolling 300px)
// Both hidden on mobile to avoid cluttering small screens.

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function ScrollWidget() {
  const [visible, setVisible] = useState(false)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.4,
  })

  // Show scroll-to-top button after 300px
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    // Hidden on mobile, visible on md+
    <div className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex">

      {/* ── Vertical progress track + fill ── */}
      <div
        aria-hidden="true"
        className="relative h-32 w-1 overflow-hidden rounded-full bg-navy/10"
      >
        {/* Filled portion — scales from bottom using scaleY on origin-top */}
        <motion.div
          className="absolute inset-x-0 top-0 rounded-full bg-brand"
          style={{
            scaleY: progress,
            originY: 0,
            height: '100%',
          }}
        />
      </div>

      {/* ── Percentage label — tiny, reads current scroll % ── */}
      <ProgressLabel progress={progress} />

      {/* ── Scroll-to-top button — fades in after 300px scroll ── */}
      <motion.button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-navy/15 bg-white shadow-soft transition-colors hover:border-brand hover:bg-brand hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        style={{ pointerEvents: visible ? 'auto' : 'none' }}
      >
        <ArrowUp className="h-4 w-4 text-navy group-hover:text-white" aria-hidden="true" />
      </motion.button>
    </div>
  )
}

// Small label that shows scroll percentage — updates live via motion value
function ProgressLabel({ progress }) {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    return progress.on('change', (v) => setPct(Math.round(v * 100)))
  }, [progress])

  return (
    <span
      aria-hidden="true"
      className="font-heading text-[10px] font-semibold tabular-nums text-navy/40"
    >
      {pct}%
    </span>
  )
}

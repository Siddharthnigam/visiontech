'use client'

// Process — desktop horizontal scroll-snap timeline (4 steps) with a
// stacked-vertical fallback on mobile. A brand-colored fill line tracks
// scroll progress through the section (the indicator deferred from 2B).
// Scroll-progress is transform-only, so it never shifts layout.
import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { PROCESS_STEPS } from '@/lib/constants'
import ScrollReveal, {
  StaggerGroup,
  StaggerItem,
} from '@/components/shared/ScrollReveal'

export default function ProcessWorkflow() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'end 0.55'],
  })
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.3,
  })

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative bg-ice py-20 lg:py-28"
    >
      <div className="container">
        <ScrollReveal className="max-w-md">
          <span className="text-caption text-navy">How we work</span>
          <h2 className="mt-4 text-navy">From brief to breakthrough.</h2>
          <p className="mt-6 text-lg leading-relaxed text-navy/70">
            A four-stage pipeline built around what you get at every step — from
            the first audit to the growth phase, you always know where things
            stand.
          </p>
        </ScrollReveal>

        {/* Desktop: horizontal scroll-snap timeline */}
        <div className="mt-16 hidden lg:block">
          <div className="overflow-x-auto pb-6">
            <div className="relative w-max min-w-full">
              {/* static timeline line + scroll-progress fill */}
              <span
                className="absolute right-0 left-0 top-[8px] h-px bg-navy/20"
                aria-hidden="true"
              />
              <motion.span
                aria-hidden="true"
                className="absolute left-0 top-[8px] h-0.5 w-full origin-left bg-brand"
                style={{ scaleX: progress }}
              />
              <StaggerGroup
                as="ol"
                className="relative z-10 flex w-max min-w-full snap-x snap-mandatory"
              >
                {PROCESS_STEPS.map((step, i) => (
                  <StaggerItem
                    as="li"
                    key={step.id}
                    className="relative w-[300px] shrink-0 snap-center px-7"
                  >
                    <div className="relative mb-10 flex items-center justify-between">
                      <span className="block h-4 w-4 rounded-full border-2 border-navy bg-ice" />
                      <span className="text-caption text-navy/50">
                        0{i + 1} / 04
                      </span>
                    </div>
                    <h3 className="text-2xl text-navy">{step.title}</h3>
                    <span className="mt-3 inline-block rounded-full border border-navy/20 px-3 py-1 text-caption text-navy/70">
                      {step.deliverable}
                    </span>
                    <p className="mt-3 leading-relaxed text-navy/70">
                      {step.description}
                    </p>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </div>

        {/* Mobile: stacked vertical fallback */}
        <div className="relative mt-14 lg:hidden">
          {/* static rail + scroll-progress fill (grows downward) */}
          <span
            className="absolute bottom-2 left-[8px] top-2 w-px bg-navy/20"
            aria-hidden="true"
          />
          <motion.span
            aria-hidden="true"
            className="absolute bottom-2 left-[8px] top-2 w-px origin-top bg-brand"
            style={{ scaleY: progress }}
          />
          <StaggerGroup as="ol" className="relative z-10 space-y-12 pl-8">
            {PROCESS_STEPS.map((step, i) => (
              <StaggerItem as="li" key={step.id} className="relative">
                <span
                  className="absolute -left-8 top-1.5 block h-4 w-4 rounded-full border-2 border-navy bg-ice"
                  aria-hidden="true"
                />
                <span className="text-caption text-navy/50">0{i + 1} / 04</span>
                <h3 className="mt-2 text-2xl text-navy">{step.title}</h3>
                <span className="mt-3 inline-block rounded-full border border-navy/20 px-3 py-1 text-caption text-navy/70">
                  {step.deliverable}
                </span>
                <p className="mt-3 leading-relaxed text-navy/70">
                  {step.description}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  )
}

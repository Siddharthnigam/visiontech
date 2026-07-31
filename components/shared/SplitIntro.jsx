// SplitIntro — shared intro header for interior pages. Mirrors the Hero's
// asymmetric layout: conversion content on the left, an animated SVG visual
// on the right. Stacks to a single column on mobile with the visual after
// the text (never pushing headline copy below the fold).
import ScrollReveal from '@/components/shared/ScrollReveal'

/**
 * @param {object} props
 * @param {string} [props.eyebrow] - small tracked uppercase label above title
 * @param {string} [props.title] - page h1
 * @param {string} [props.description] - optional supporting paragraph
 * @param {import('react').ReactNode} props.visual - right-side animated graphic
 * @param {import('react').ReactNode} [props.children] - overrides the default
 *   left column content (used when a page needs extra intro content)
 */
export default function SplitIntro({
  eyebrow,
  title,
  description,
  visual,
  children,
}) {
  return (
    <section className="noise-overlay relative overflow-hidden bg-navy text-offwhite">
      <div className="container grid items-center gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-32">
        <div className="lg:pr-8">
          <ScrollReveal className="max-w-md">
            {children ?? (
              <>
                <span className="text-caption text-ice/70">{eyebrow}</span>
                <h1 className="mt-4 text-offwhite">{title}</h1>
                {description && (
                  <p className="mt-6 text-lg leading-relaxed text-ice/80">
                    {description}
                  </p>
                )}
              </>
            )}
          </ScrollReveal>
        </div>
        <div className="relative">{visual}</div>
      </div>
    </section>
  )
}

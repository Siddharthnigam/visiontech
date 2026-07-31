// PageIntro — navy header strip shared by interior pages. Matches the
// portfolio intro exactly: same navy + grain background, fixed at 70% of the
// viewport height with content vertically centered. Minimal professional
// content only — eyebrow, title, and optional supporting paragraph.
import ScrollReveal from '@/components/shared/ScrollReveal'

/**
 * @param {object} props
 * @param {string} props.eyebrow - small tracked uppercase label above title
 * @param {string} props.title - page h1
 * @param {string} [props.description] - optional supporting paragraph
 */
export default function PageIntro({ eyebrow, title, description }) {
  return (
    <section className="noise-overlay relative flex min-h-[70vh] items-center overflow-hidden bg-navy text-offwhite">
      <div className="container py-12 lg:py-14">
        <ScrollReveal className="max-w-md">
          <span className="text-caption text-ice/70">{eyebrow}</span>
          <h1 className="mt-4 text-offwhite">{title}</h1>
          {description && (
            <p className="mt-6 text-lg leading-relaxed text-ice/80">
              {description}
            </p>
          )}
        </ScrollReveal>
      </div>
    </section>
  )
}

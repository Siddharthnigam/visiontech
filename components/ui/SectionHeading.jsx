// SectionHeading — consistent eyebrow, title, and description for sections.
import ScrollReveal from '@/components/shared/ScrollReveal'
import { cn } from '@/lib/utils'

/**
 * @param {object} props
 * @param {string} [props.eyebrow] - small tracked uppercase label above title
 * @param {string} props.title - section heading
 * @param {string} [props.description] - optional supporting paragraph
 * @param {'left'|'center'} [props.align]
 * @param {string} [props.className]
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}) {
  return (
    <ScrollReveal
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto flex flex-col items-center text-center',
        className
      )}
    >
      {eyebrow && <span className="text-caption text-brand">{eyebrow}</span>}
      <h2 className="mt-4 text-navy">{title}</h2>
      {description && (
        <p className="mt-6 text-lg leading-relaxed text-navy/70">
          {description}
        </p>
      )}
    </ScrollReveal>
  )
}

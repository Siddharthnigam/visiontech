// CtaBand — final navy conversion band with the grain texture. Reused at the
// bottom of marketing pages to drive a single primary action.
import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/shared/ScrollReveal'

export default function CtaBand() {
  return (
    <section className="noise-overlay relative overflow-hidden bg-navy text-offwhite">
      <div className="container flex flex-col items-center py-20 text-center lg:py-28">
        <ScrollReveal className="max-w-2xl">
          <span className="text-caption text-ice/70">Get started</span>
          <h2 className="mt-4 text-offwhite">
            Ready to see what Vision Tech can build for you?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ice/80">
            Book a free audit and we’ll map where your web, social, and
            performance channels stand today — no strings attached.
          </p>
        </ScrollReveal>
        <ScrollReveal
          delay={0.1}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="/contact?intent=audit" magnetic>
            Book a Free Audit
          </Button>
          <Button href="/portfolio" variant="ghost">
            View Our Work
          </Button>
        </ScrollReveal>
      </div>
    </section>
  )
}

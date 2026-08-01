// CtaBand — ice background conversion band, matching the ProcessWorkflow section.
import ScrollReveal from '@/components/shared/ScrollReveal'

export default function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-ice">
      <div className="container relative flex flex-col items-center py-20 text-center lg:py-28">
        <ScrollReveal className="max-w-2xl">
          <span className="text-caption text-brand">Get started</span>
          <h2 className="mt-4 text-navy">
            Ready to see what Vision Tech can build for you?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-navy/70">
            Book a free audit and we&apos;ll map where your web, social, and
            performance channels stand today — no strings attached.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-9">
          <a
            href="/contact?intent=audit"
            className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 font-heading text-sm font-semibold tracking-tight text-white shadow-soft transition-all hover:bg-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Book a Free Audit
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}

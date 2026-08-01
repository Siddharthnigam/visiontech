import SectionHeading from '@/components/ui/SectionHeading'
import TeamGrid from '@/components/sections/TeamGrid'
import CtaBand from '@/components/sections/CtaBand'
import SplitIntro from '@/components/shared/SplitIntro'
import AboutVisual from '@/components/visuals/AboutVisual'
import { StaggerGroup, StaggerItem } from '@/components/shared/ScrollReveal'
import { ABOUT_STATS, PRINCIPLES, SITE_URL } from '@/lib/constants'
import { cn } from '@/lib/utils'

export const metadata = {
  title: 'About Vision Tech — Web, Social & Growth Partner',
  description:
    'Vision Tech is the web development, social media, and performance marketing partner that builds one integrated system — so ambitious businesses are easy to find, easy to trust, and easy to grow with.',
  openGraph: {
    title: 'About Vision Tech — Web, Social & Growth Partner',
    description:
      'Vision Tech is the web development, social media, and performance marketing partner that builds one integrated system — so ambitious businesses are easy to find, easy to trust, and easy to grow with.',
    url: `${SITE_URL}/about`,
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <main>
      {/* Intro — split header with animated growth-trajectory visual. */}
      <SplitIntro
        eyebrow="About Vision Tech"
        title="Easy to find. Easy to trust. Easy to grow with."
        description="Fast websites, consistent social presence, and performance-driven marketing — built once, run right, and scaled with you."
        visual={<AboutVisual />}
      />

      {/* Origin — editorial narrative with a pull quote. */}
      <section className="bg-offwhite py-20 lg:py-28">
        <div className="container">
          {/* Stats */}
          <StaggerGroup className="mb-16 grid gap-8 border-y border-navy/10 py-10 sm:grid-cols-3">
            {ABOUT_STATS.map((stat) => (
              <StaggerItem key={stat.id}>
                <span className="block font-heading text-3xl font-semibold tracking-tight text-navy lg:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-1 block text-small text-navy/60">
                  {stat.label}
                </span>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="grid gap-14 lg:grid-cols-[2fr_3fr] lg:gap-24">
            <div className="max-w-md lg:sticky lg:top-10 lg:self-start">
              <SectionHeading
                eyebrow="Why we exist"
                title="The gap we saw."
                description="Most growing businesses don't need five vendors — they need one team that owns the outcome."
              />
            </div>

            <StaggerGroup className="space-y-6 text-lg leading-relaxed text-navy/70">
              <StaggerItem as="p">
                The common setup is a web developer here, a social freelancer
                there, and an ad agency somewhere else. Each one does its job
                well, but nobody owns the outcome — so strategy, message, and
                measurement drift apart the moment they're handed off.
              </StaggerItem>
              <StaggerItem as="p">
                When the website is built by people who never talk to the team
                running the ads, and the social feed never echoes the site's
                message, you end up paying for marketing that doesn't compound.
                Every channel is optimized in isolation, and the revenue effect
                gets lost.
              </StaggerItem>
              <StaggerItem as="p">
                Vision Tech exists to close that loop. Web, social, and
                performance marketing under one roof means the strategy, the
                message, and the reporting are designed together — every asset
                built to feed the same revenue goal.
              </StaggerItem>
              <StaggerItem as="blockquote" className="mt-12 lg:mt-16">
                <span className="accent-rule" aria-hidden="true" />
                <p className="mt-6 max-w-xl font-heading text-2xl font-semibold leading-snug text-navy lg:text-3xl">
                  "The whole point of digital is that it compounds. Ours does
                  too — because it's one system, not four."
                </p>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </div>
      </section>

      {/* Principles — two columns on desktop. Items 1,3 left. Items 2,4 right.
          Same Y position — CSS grid rows align them automatically. Zero gap. */}
      <section className="bg-ice py-20 lg:py-28">
        <div className="container">
          <SectionHeading
            eyebrow="How we're different"
            title="Principles we build on."
            description="Not values on a poster — the operating rules behind every engagement."
          />
          <StaggerGroup
            as="ol"
            className="mt-16 lg:grid lg:grid-cols-2 lg:gap-x-0 lg:gap-y-0 border-t border-navy/10"
          >
            {PRINCIPLES.map((principle, i) => {
              const odd = i % 2 === 1
              return (
                <StaggerItem
                  as="li"
                  key={principle.id}
                  className={cn(
                    // Mobile: full width stacked list
                    'border-b border-navy/10 py-12',
                    // Desktop: left or right column, no extra padding, no y gap
                    odd
                      ? 'lg:col-start-2 lg:border-l lg:border-navy/10 lg:pl-10 lg:py-12'
                      : 'lg:col-start-1 lg:pr-10 lg:py-12'
                  )}
                >
                  <div className="grid gap-4 lg:grid-cols-[auto_1fr] lg:gap-8">
                    <span className="text-caption text-brand">0{i + 1}</span>
                    <div>
                      <h3 className="text-2xl text-navy lg:text-3xl">
                        {principle.title}
                      </h3>
                      <p className="mt-3 max-w-xl leading-relaxed text-navy/70">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* Team */}
      <section className="bg-offwhite py-20 lg:py-28">
        <div className="container">
          <SectionHeading
            eyebrow="The team"
            title="The people behind the work."
            description="A small senior team with one owner per engagement — so there's always someone accountable for the outcome."
          />
          <TeamGrid />
        </div>
      </section>

      <CtaBand />
    </main>
  )
}

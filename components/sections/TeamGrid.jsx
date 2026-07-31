// TeamGrid — team member cards. SAMPLE DATA: entries in `TEAM` (constants)
// are placeholders and must be swapped for the real team before launch
// (names, roles, bios, and photos). Photo slots render as dashed placeholders
// with initials until real headshots are added.
import { TEAM } from '@/lib/constants'
import { StaggerGroup, StaggerItem } from '@/components/shared/ScrollReveal'

function initials(name) {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function TeamGrid() {
  return (
    <StaggerGroup
      as="ul"
      className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {TEAM.map((member) => (
        <StaggerItem as="li" key={member.id}>
          <article className="flex h-full flex-col rounded-lg border border-navy/10 bg-white p-6 shadow-soft">
            <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-md border border-dashed border-navy/25 bg-offwhite">
              <span
                className="font-heading text-3xl font-semibold tracking-tight text-navy/30"
                aria-hidden="true"
              >
                {initials(member.name)}
              </span>
              <span
                className="absolute right-3 top-3 h-2 w-2 rounded-full bg-brand"
                aria-hidden="true"
              />
            </div>
            <h3 className="mt-5 text-xl text-navy">{member.name}</h3>
            <p className="mt-1 text-caption text-brand">{member.role}</p>
            <p className="mt-3 flex-1 text-small leading-relaxed text-navy/70">
              {member.bio}
            </p>
          </article>
        </StaggerItem>
      ))}
    </StaggerGroup>
  )
}

import { ArrowUpRight, CalendarClock, Globe, Link2, Mail } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'

const CHANNELS = [
  {
    icon: Mail,
    label: 'DIRECT_LINE',
    value: 'jp.castilla@dinaut.com',
    href: 'mailto:jp.castilla@dinaut.com',
  },
  {
    icon: Globe,
    label: 'CORP_NODE',
    value: 'www.dinaut.com',
    href: 'https://www.dinaut.com',
  },
  {
    icon: Link2,
    label: 'NETWORK',
    value: 'in/juanpablocastilla',
    href: 'https://www.linkedin.com',
  },
]

export function Contact() {
  return (
    <section id="contact" className="hud-grid">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          index="05"
          title="Establish Connection"
          subtitle="Open a channel to scope your plant's digital transformation. Response window: < 24h."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          {/* CTA panel */}
          <div className="clip-panel relative flex flex-col justify-between border border-primary/40 bg-card p-8 box-glow overflow-hidden sweep">
            <div>
              <p className="font-mono text-xs tracking-widest text-primary">
                {'>'} SCHEDULE_UPLINK
              </p>
              <h3 className="mt-4 text-2xl font-bold uppercase tracking-tight text-foreground text-balance">
                Request a 30-Minute Technical Briefing
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                Bring your line data and operational bottlenecks. Leave with a
                concrete IIoT + analytics deployment roadmap tailored to your
                facility.
              </p>
            </div>
            <a
              href="mailto:jp.castilla@dinaut.com?subject=30-Min%20Briefing%20Request"
              className="clip-btn mt-8 inline-flex w-fit items-center gap-2 bg-primary px-6 py-3 font-mono text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/85"
            >
              <CalendarClock className="size-4" aria-hidden="true" />
              Initialize Meeting
            </a>
          </div>

          {/* Channels */}
          <div className="grid gap-px bg-border">
            {CHANNELS.map((c) => {
              const Icon = c.icon
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-4 bg-card p-6 transition-colors hover:bg-secondary"
                >
                  <span
                    className="flex size-11 items-center justify-center border border-border text-primary transition-colors group-hover:border-primary"
                    aria-hidden="true"
                  >
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] tracking-widest text-muted-foreground">
                      {c.label}
                    </div>
                    <div className="truncate font-mono text-sm text-foreground group-hover:text-primary">
                      {c.value}
                    </div>
                  </div>
                  <ArrowUpRight
                    className="ml-auto size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                    aria-hidden="true"
                  />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

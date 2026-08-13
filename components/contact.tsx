import { ArrowUpRight, CalendarClock, Globe, Link2, Mail, MessageCircle } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'

const CALENDAR_URL = 'https://calendar.app.google/SKn31ZM3iLUhgxQ77'

const CHANNELS = [
  {
    icon: Mail,
    label: 'DIRECT_LINE',
    value: 'jcastilla@dinaut.com',
    href: 'mailto:jcastilla@dinaut.com',
  },
  {
    icon: MessageCircle,
    label: 'WHATSAPP',
    value: '+51 980 583 725',
    href: 'https://wa.me/51980583725',
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
    value: 'in/juan-pablo-castilla-yturbe-222143228',
    href: 'https://www.linkedin.com/in/juan-pablo-castilla-yturbe-222143228',
  },
]

export function Contact() {
  return (
    <section id="contact" className="hud-grid">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionHeading
          index="05"
          title="Establish Connection"
          subtitle="Aperture un canal para dimensionar la transformación digital de su planta. Respuesta promedio: < 24h."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          {/* CTA panel */}
          <div className="clip-panel relative flex flex-col justify-between border border-primary/40 bg-card p-6 box-glow overflow-hidden sweep sm:p-8">
            <div>
              <p className="font-mono text-xs tracking-widest text-primary">
                {'>'} SCHEDULE_UPLINK
              </p>
              <h3 className="mt-4 text-2xl font-bold uppercase tracking-tight text-foreground text-balance">
                Solicitar una reunión de 15 minutos.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                Traiga los datos de sus líneas y cuellos de botella operativos.
                Llévese una hoja de ruta concreta para el despliegue de IIoT y
                analítica, adaptada a su planta.
              </p>
            </div>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="clip-btn mt-8 inline-flex w-fit items-center gap-2 bg-primary px-6 py-3 font-mono text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/85"
            >
              <CalendarClock className="size-4" aria-hidden="true" />
              Agendar Reunión
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
                  className="group flex min-w-0 items-center gap-4 bg-card p-5 transition-colors hover:bg-secondary sm:p-6"
                >
                  <span
                    className="flex size-11 shrink-0 items-center justify-center border border-border text-primary transition-colors group-hover:border-primary"
                    aria-hidden="true"
                  >
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="font-mono text-[10px] tracking-widest text-muted-foreground">
                      {c.label}
                    </div>
                    <div className="font-mono text-sm text-foreground group-hover:text-primary [overflow-wrap:anywhere]">
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

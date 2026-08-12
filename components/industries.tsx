import { Factory, Mountain, Wheat } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'

const INDUSTRIES = [
  {
    id: 'IND-01',
    icon: Wheat,
    name: 'Agro Industrias',
    desc: 'Monitoreo OnPrem & Cloud, Control potenciado con IA, Análisis predictivo y prescriptivo, etc.',
    metric: 'OEE +18%',
  },
  {
    id: 'IND-02',
    icon: Factory,
    name: 'Manufactura',
    desc: 'Monitoreo de proceso, Modelos de mantenimiento predictivo, Análisis de anomalías, etc.',
    metric: 'DOWNTIME -32%',
  },
  {
    id: 'IND-03',
    icon: Mountain,
    name: 'Minería',
    desc: 'Monitoreo de flota y activos, Analítica predictiva y prescriptiva, Análisis de anomalías, etc',
    metric: 'SAFETY +100%',
  },
]

export function Industries() {
  return (
    <section id="industries" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          index="02"
          title="Sectores Desplegados"
          subtitle="Soluciones comprobadas en entornos donde la seguridad y calidad no son negociables"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon
            return (
              <article
                key={ind.id}
                className="clip-panel relative border border-border bg-card p-6"
              >
                <div className="flex items-start justify-between">
                  <Icon
                    className="size-8 text-primary"
                    aria-hidden="true"
                  />
                  <span className="clip-tag bg-accent/10 px-2 py-1 font-mono text-[10px] tracking-widest text-accent">
                    {ind.metric}
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold uppercase tracking-tight text-foreground">
                  {ind.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                  {ind.desc}
                </p>
                <div className="mt-5 font-mono text-[11px] tracking-widest text-muted-foreground">
                  {ind.id}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

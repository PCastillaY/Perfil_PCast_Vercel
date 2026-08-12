import { Cpu, Eye, LineChart, Cloud } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'

const SOLUTIONS = [
  {
    id: 'S-01',
    icon: Cpu,
    title: 'Industrial IoT',
    desc: 'Edge-to-cloud sensor networks, integración PLC/SCADA, telemetría en tiempo real a través de planta.',
    tags: ['MQTT', 'OPC-UA', 'EDGE', 'MODBUS'],
  },
  {
    id: 'S-02',
    icon: Eye,
    title: 'Visión Artificial',
    desc: 'Interferencia On-site para control de calidad, cumplimiento de EPPs, detección de defectos y supervisión de procesos en linea de producción.',
    tags: ['YOLO', 'ONNX', 'JETSON', 'RTSP'],
  },
  {
    id: 'S-03',
    icon: LineChart,
    title: 'Analítica Avanzada',
    desc: 'Mantenimiento Predictivo, detección de anomalías, optimización de OEE potenciados por modelos ML basados en time-series.',
    tags: ['ML', 'FORECAST', 'OEE', 'ANOMALY'],
  },
  {
    id: 'S-04',
    icon: Cloud,
    title: 'Cloud Monitoring',
    desc: 'Dashboards Unified, Alertas, centros de operación remotos con seguridad de acceso multi-tenant.',
    tags: ['INSIGHTS HUB', 'GRAFANA', 'DATAMOSAIX', 'THINGWORX'],
  },
]

export function Solutions() {
  return (
    <section id="solutions" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionHeading
          index="01"
          title="Digital Solutions Stack"
          subtitle="Capacidades modulares desplegadas como un sistema industrial interconectado- desde los sensores hasta gerencia."
        />

        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {SOLUTIONS.map((s) => {
            const Icon = s.icon
            return (
              <article
                key={s.id}
                className="group relative flex flex-col bg-card p-6 transition-colors hover:bg-secondary"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="flex size-11 items-center justify-center border border-primary/30 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                    aria-hidden="true"
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className="font-mono text-[11px] tracking-widest text-muted-foreground">
                    {s.id}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-semibold uppercase tracking-tight text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground text-pretty">
                  {s.desc}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="border border-border px-2 py-0.5 font-mono text-[10px] tracking-widest text-accent"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { Cpu, Eye, LineChart, Cloud } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'

const SOLUTIONS = [
  {
    id: 'S-01',
    icon: Cpu,
    title: 'Industrial IoT',
    desc: 'Edge-to-cloud sensor networks, PLC/SCADA integration, and real-time telemetry pipelines across the plant floor.',
    tags: ['MQTT', 'OPC-UA', 'EDGE', 'MODBUS'],
  },
  {
    id: 'S-02',
    icon: Eye,
    title: 'Computer Vision',
    desc: 'On-site inference for quality control, PPE compliance, defect detection, and process monitoring at the line.',
    tags: ['YOLO', 'ONNX', 'JETSON', 'RTSP'],
  },
  {
    id: 'S-03',
    icon: LineChart,
    title: 'Advanced Analytics',
    desc: 'Predictive maintenance, anomaly detection, and OEE optimization powered by time-series ML models.',
    tags: ['ML', 'FORECAST', 'OEE', 'ANOMALY'],
  },
  {
    id: 'S-04',
    icon: Cloud,
    title: 'Cloud Monitoring',
    desc: 'Unified dashboards, alerting, and remote operations centers with secure multi-tenant access.',
    tags: ['GRAFANA', 'ALERTS', 'API', 'RBAC'],
  },
]

export function Solutions() {
  return (
    <section id="solutions" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          index="01"
          title="Digital Solutions Stack"
          subtitle="Modular capabilities deployed as a connected industrial ecosystem — from the sensor to the boardroom."
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

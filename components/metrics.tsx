const CAPABILITIES = [
  { label: 'IIoT / Edge Computing', value: 94 },
  { label: 'Visión Artificial', value: 96 },
  { label: 'Analítica avanzada & ML', value: 88 },
  { label: 'Monitoreo onPrem & Cloud', value: 98 },
  { label: 'Soluciones Multi-Agente', value: 88 },
]

const STACK = [
  'Python',
  'TensorFlow',
  'OPC-UA',
  'MQTT',
  'Docker',
  'Node-Red',
  'AWS',
  'Javascript',
  'Grafana',
  'PostgreSQL',
  'InsightsHub',
  'N8N',
]

export function Metrics() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
        {/* Capability meters */}
        <div>
          <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-primary">
            <span className="text-glow">03</span>
            <span className="h-px w-10 bg-primary/50" aria-hidden="true" />
            <span className="text-muted-foreground">// CAPABILITY_INDEX</span>
          </div>
          <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
            Competencias Core
          </h2>

          <div className="mt-8 space-y-5">
            {CAPABILITIES.map((c) => (
              <div key={c.label}>
                <div className="flex items-center justify-between font-mono text-xs tracking-wider">
                  <span className="text-foreground">{c.label}</span>
                  <span className="text-primary">{c.value}%</span>
                </div>
                <div className="mt-2 h-2 w-full border border-border bg-background">
                  <div
                    className="h-full bg-primary box-glow"
                    style={{ width: `${c.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack grid */}
        <div>
          <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-accent">
            <span className="text-glow-cyan">04</span>
            <span className="h-px w-10 bg-accent/50" aria-hidden="true" />
            <span className="text-muted-foreground">// TECH_MATRIX</span>
          </div>
          <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
            Toolkit para Desarrollo
          </h2>

          <div className="mt-8 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3">
            {STACK.map((tech, i) => (
              <div
                key={tech}
                className="flex items-center gap-2 bg-card px-4 py-4 font-mono text-sm text-foreground transition-colors hover:bg-secondary hover:text-primary"
              >
                <span className="text-[10px] text-muted-foreground">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import { ArrowRight, CalendarClock, FileDown, MapPin } from 'lucide-react'

const STATS = [
  { label: 'YEARS_IN_FIELD', value: '12+' },
  { label: 'PLANTS_DEPLOYED', value: '40+' },
  { label: 'IIOT_NODES', value: '1.2K+' },
  { label: 'DATA_UPTIME', value: '99.9%' },
]

export function Hero() {
  return (
    <section className="relative border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
          {/* Left: identity */}
          <div>
            <div
              className="clip-tag inline-flex items-center gap-2 bg-primary/10 px-3 py-1 font-mono text-[11px] tracking-widest text-primary reveal"
              style={{ animationDelay: '0.05s' }}
            >
              <MapPin className="size-3" aria-hidden="true" />
              DINAUT // DIGITAL INDUSTRIAL ECOSYSTEMS
            </div>

            <h1
              className="mt-6 text-4xl font-bold uppercase leading-[0.95] tracking-tight text-foreground sm:text-6xl reveal text-balance"
              style={{ animationDelay: '0.12s' }}
            >
              Juan Pablo
              <br />
              <span className="text-primary text-glow">Castilla Yturbe</span>
            </h1>

            <p
              className="mt-5 font-mono text-sm uppercase tracking-widest text-accent text-glow-cyan reveal"
              style={{ animationDelay: '0.18s' }}
            >
              Industry 4.0 &amp; Digital Solutions Specialist
            </p>

            <p
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground reveal text-pretty"
              style={{ animationDelay: '0.24s' }}
            >
              Architecting and deploying state-of-the-art digital ecosystems for
              heavy industries — sugar mills, manufacturing plants, and mining.
              Specialized in IIoT, Computer Vision, Advanced Analytics, and
              Cloud Monitoring.
            </p>

            <div
              className="mt-8 flex flex-wrap items-center gap-4 reveal"
              style={{ animationDelay: '0.3s' }}
            >
              <a
                href="#contact"
                className="clip-btn group inline-flex items-center gap-2 bg-primary px-6 py-3 font-mono text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/85 box-glow"
              >
                <CalendarClock className="size-4" aria-hidden="true" />
                Request 30-Min Briefing
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#solutions"
                className="clip-btn inline-flex items-center gap-2 border border-primary/40 px-6 py-3 font-mono text-sm font-semibold uppercase tracking-wider text-primary transition-colors hover:bg-primary/10"
              >
                <FileDown className="size-4" aria-hidden="true" />
                View Solutions
              </a>
            </div>
          </div>

          {/* Right: terminal card */}
          <div
            className="clip-panel relative border border-border bg-card/70 p-5 reveal sweep overflow-hidden"
            style={{ animationDelay: '0.36s' }}
          >
            <div className="flex items-center justify-between border-b border-border pb-3 font-mono text-[11px] tracking-widest text-muted-foreground">
              <span>~/dinaut/profile.sh</span>
              <span className="flex items-center gap-1 text-primary">
                <span className="size-1.5 rounded-full bg-primary led-blink" />
                LIVE
              </span>
            </div>

            <pre className="mt-4 whitespace-pre-wrap font-mono text-[12px] leading-relaxed text-foreground">
              <span className="text-primary">$</span> init_node --profile
              {'\n'}
              <span className="text-muted-foreground">
                {'>'} authenticating operator...
              </span>
              {'\n'}
              <span className="text-accent">{'>'} ACCESS GRANTED</span>
              {'\n\n'}
              <span className="text-muted-foreground">operator</span> ={' '}
              <span className="text-primary">"J.P. CASTILLA"</span>
              {'\n'}
              <span className="text-muted-foreground">role</span> ={' '}
              <span className="text-primary">"INDUSTRY_4.0_LEAD"</span>
              {'\n'}
              <span className="text-muted-foreground">org</span> ={' '}
              <span className="text-primary">"DINAUT"</span>
              {'\n'}
              <span className="text-muted-foreground">stack</span> = [IIoT, CV,
              ANALYTICS, CLOUD]
              {'\n'}
              <span className="text-primary">$</span> _
              <span className="caret-blink text-primary">█</span>
            </pre>

            <div className="mt-5 grid grid-cols-2 gap-px border border-border bg-border">
              {STATS.map((s) => (
                <div key={s.label} className="bg-card p-3">
                  <div className="font-mono text-2xl font-bold text-primary">
                    {s.value}
                  </div>
                  <div className="mt-1 font-mono text-[10px] tracking-widest text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

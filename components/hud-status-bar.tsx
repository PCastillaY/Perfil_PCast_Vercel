'use client'

import { useEffect, useState } from 'react'

const STATUS_ITEMS = [
  'STATUS: ONLINE',
  'IIOT_NODES_ACTIVE: 1,284',
  'UPTIME: 99.98%',
  'LATENCY: 12ms',
  'EDGE_GATEWAYS: SYNCED',
  'CV_PIPELINES: RUNNING',
  'CLOUD_MONITORING: NOMINAL',
]

function useClock() {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

export function HudStatusBar() {
  const now = useClock()

  const stamp = now
    ? now.toLocaleTimeString('en-GB', { hour12: false })
    : '--:--:--'
  const utc = now
    ? now.toLocaleTimeString('en-GB', { hour12: false, timeZone: 'UTC' })
    : '--:--:--'

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex h-11 max-w-7xl items-center gap-4 px-4 font-mono text-[11px] tracking-wider text-muted-foreground sm:px-6">
        <div className="flex shrink-0 items-center gap-2 text-foreground">
          <span
            className="inline-block size-2 rounded-full bg-primary led-blink"
            aria-hidden="true"
          />
          <span className="font-semibold text-primary">
            J. P. CASTILLA
          </span>
          <span className="hidden text-muted-foreground sm:inline">
            // DINAUT_SYS_v4.0
          </span>
        </div>

        {/* Marquee status feed */}
        <div className="relative hidden flex-1 overflow-hidden md:block">
          <div className="marquee-track flex w-max gap-8 whitespace-nowrap">
            {[...STATUS_ITEMS, ...STATUS_ITEMS].map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="text-primary">▸</span>
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-3 md:ml-0">
          <span className="hidden text-accent sm:inline text-glow-cyan">
            UTC {utc}
          </span>
          <span className="text-foreground">LOC {stamp}</span>
        </div>
      </div>
    </header>
  )
}

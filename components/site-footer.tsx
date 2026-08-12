export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-8 font-mono text-[11px] tracking-widest text-muted-foreground sm:flex-row sm:items-center sm:px-6">
        <div className="flex items-center gap-2">
          <span
            className="inline-block size-2 rounded-full bg-primary led-blink"
            aria-hidden="true"
          />
          <span className="text-foreground">DINAUT_SYS_v4.0</span>
          <span>// NODE_SECURE</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span>J. P. CASTILLA YTURBE</span>
          <span className="text-accent">INDUSTRY 4.0</span>
          <span>© {year} DINAUT</span>
        </div>
      </div>
    </footer>
  )
}

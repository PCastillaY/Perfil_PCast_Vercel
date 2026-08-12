import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  index: string
  title: string
  subtitle?: string
  className?: string
}

export function SectionHeading({
  index,
  title,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-10', className)}>
      <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-primary">
        <span className="text-glow">{index}</span>
        <span className="h-px w-10 bg-primary/50" aria-hidden="true" />
        <span className="text-muted-foreground">// SECTION</span>
      </div>
      <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl text-balance">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground text-pretty">
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}

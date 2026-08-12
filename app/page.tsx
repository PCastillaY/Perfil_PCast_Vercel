import { HudStatusBar } from '@/components/hud-status-bar'
import { Hero } from '@/components/hero'
import { Solutions } from '@/components/solutions'
import { Industries } from '@/components/industries'
import { Metrics } from '@/components/metrics'
import { Contact } from '@/components/contact'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <div className="relative min-h-screen bg-background hud-grid">
      <HudStatusBar />
      <main>
        <Hero />
        <Solutions />
        <Industries />
        <Metrics />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  )
}

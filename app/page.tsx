import { HudStatusBar } from '@/components/hud-status-bar'
import { Hero } from '@/components/hero'
import { Solutions } from '@/components/solutions'
import { Industries } from '@/components/industries'
import { ProjectDeployments } from '@/components/galery'
import { Metrics } from '@/components/metrics'
import { Contact } from '@/components/contact'
import { TerminalCLI } from '@/components/terminal-cli'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <div className="relative min-h-screen bg-background hud-grid">
      <HudStatusBar />
      <main>
        <Hero />
        <Solutions />
        <Industries />
        <ProjectDeployments />
        <Metrics />
        <Contact />
        <TerminalCLI />
      </main>
      <SiteFooter />
    </div>
  )
}

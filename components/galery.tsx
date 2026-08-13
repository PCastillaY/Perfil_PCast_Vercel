'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'

interface Project {
  code: string
  name: string
  category: string
  description: string
  problem: string
  solution: string
  role: string
  architecture: string
  technologies: string[]
  sector: string
  result: string
  image: string
}

const PROJECTS: Project[] = [
  {
    code: 'CV-001',
    name: 'DINSync ID',
    category: 'COMPUTER VISION // OCR // SCADA',
    description:
      'Sistema de identificación visual para reconocer vagones y contrastar su identidad con la lógica de proceso.',
    problem:
      'La identificación manual de vagones introduce dependencia del operador y dificulta validar en tiempo real que el material llegue al destino de proceso correcto.',
    solution:
      'Pipeline de visión artificial y OCR para detectar la placa del vagón, extraer su identificador y sincronizarlo con las variables del SCADA para validar la operación.',
    role:
      'Diseño de la solución de visión, preparación del dataset, definición del pipeline de inferencia y planteamiento de la integración con el sistema de control.',
    architecture:
      'Camera → Computer Vision → OCR → Application Logic → SCADA / Process Validation',
    technologies: ['YOLO', 'OCR', 'Python', 'OpenCV', 'SCADA'],
    sector: 'Heavy Industry',
    result:
      'Automatización de la identificación y habilitación de una capa de trazabilidad entre la visión del proceso y la lógica de control.',
    image: '/projects/dinsync-id/hero.webp',
  },
  {
    code: 'IIOT-001',
    name: 'Industrial Monitoring',
    category: 'IIoT // GRAFANA // CLOUD',
    description:
      'Plataforma de monitoreo industrial para convertir señales de planta en indicadores operativos y visualizaciones en tiempo real.',
    problem:
      'Los datos de campo permanecen dispersos entre dispositivos y sistemas de control, dificultando obtener una vista operacional consolidada.',
    solution:
      'Integración de variables industriales con una capa de datos y dashboards orientados a operación, desempeño y disponibilidad.',
    role:
      'Diseño de dashboards, modelado de variables, definición de KPIs y construcción de flujos para transportar y preparar datos industriales.',
    architecture:
      'PLC / Industrial Devices → Edge / Data Pipeline → Cloud Data → Grafana → Operational Insights',
    technologies: ['Grafana', 'IIoT', 'Node-RED', 'SCADA', 'Cloud'],
    sector: 'Industrial Operations',
    result:
      'Visibilidad centralizada de variables, estados y KPIs para apoyar la supervisión y el análisis operativo.',
    image: '/projects/industrial-monitoring/hero.webp',
  },
  {
    code: 'AR-001',
    name: 'Industrial AR',
    category: 'VUFORIA // UNITY // MAGIC LEAP',
    description:
      'Experiencias de realidad aumentada orientadas a asistencia, visualización contextual y acceso a información industrial.',
    problem:
      'La información técnica de los activos no siempre está disponible de forma contextual durante las tareas de inspección, operación o mantenimiento.',
    solution:
      'Aplicaciones de realidad aumentada que superponen información digital sobre activos físicos para reducir la distancia entre el operador y los datos del sistema.',
    role:
      'Desarrollo de experiencias AR, integración de modelos 3D, interacción espacial y conexión con información contextual de los activos.',
    architecture:
      'Industrial Asset → Spatial Tracking → Unity / Vuforia → 3D / Context Layer → Operator Experience',
    technologies: ['Unity', 'Vuforia', 'Magic Leap 2', '3D', 'WebGL'],
    sector: 'Industrial Training & Maintenance',
    result:
      'Acceso contextual a información digital directamente sobre el activo, con una interfaz orientada a operación industrial.',
    image: '/projects/industrial-ar/hero.webp',
  },
  {
    code: 'ANA-001',
    name: 'Predictive Analytics',
    category: 'ML // INDUSTRIAL ANALYTICS',
    description:
      'Modelos analíticos aplicados a datos industriales para detectar patrones, anomalías y oportunidades de optimización.',
    problem:
      'El análisis reactivo de variables de proceso limita la capacidad de detectar desviaciones antes de que se conviertan en problemas operativos.',
    solution:
      'Procesamiento de series temporales industriales y aplicación de modelos analíticos para transformar históricos y señales de proceso en indicadores accionables.',
    role:
      'Preparación de datasets, selección de variables, experimentación con modelos y diseño de la integración de resultados con plataformas industriales.',
    architecture:
      'Industrial Data → Time Series Processing → ML / Analytics → Model Output → Monitoring / Decision Support',
    technologies: ['Python', 'Machine Learning', 'Time Series', 'ThingWorx', 'Analytics'],
    sector: 'Process Industry',
    result:
      'Capa analítica preparada para identificar comportamiento anómalo y soportar decisiones basadas en datos de proceso.',
    image: '/projects/predictive-analytics/hero.webp',
  },
  {
    code: 'EDGE-001',
    name: 'Industrial Edge Gateway',
    category: 'SIEMENS // IoT2050 // NODE-RED',
    description:
      'Gateway industrial para adquirir, transformar y transportar datos entre equipos de planta y servicios digitales.',
    problem:
      'La conectividad entre dispositivos industriales y plataformas superiores requiere una capa intermedia capaz de manejar protocolos, transformación de datos y comunicación segura.',
    solution:
      'Implementación de una arquitectura Edge basada en Siemens IoT2050 y Node-RED para adquirir datos, procesarlos localmente y enviarlos hacia servicios superiores.',
    role:
      'Configuración del gateway, desarrollo de flujos Node-RED, integración con equipos industriales y diagnóstico de conectividad de la infraestructura Edge.',
    architecture:
      'PLC / Industrial Network → Siemens IoT2050 → Node-RED → Data / Cloud Services',
    technologies: ['Siemens IoT2050', 'Node-RED', 'S7', 'Edge Computing', 'IIoT'],
    sector: 'Industrial Automation',
    result:
      'Capa Edge reutilizable para desacoplar la adquisición de datos de planta de las aplicaciones y servicios de digitalización.',
    image: '/projects/industrial-edge-gateway/hero.webp',
  },
]

function ProjectImage({
  project,
  large = false,
}: {
  project: Project
  large?: boolean
}) {
  const [failed, setFailed] = useState(false)

  return (
    <div
      className={`relative overflow-hidden bg-secondary/30 ${
        large ? 'aspect-video' : 'aspect-[3/2]'
      }`}
    >
      {!failed ? (
        <img
          src={project.image}
          alt={`${project.name} project preview`}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          onError={() => setFailed(true)}
        />
      ) : null}

      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,0.82)_100%)]" />

      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(77,240,34,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(77,240,34,0.08)_1px,transparent_1px)] [background-size:32px_32px]" />

      {failed ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center font-mono">
            <div className="text-4xl font-bold tracking-widest text-primary/70">
              {project.code}
            </div>
            <div className="mt-2 text-[10px] tracking-[0.3em] text-muted-foreground">
              IMAGE_PLACEHOLDER
            </div>
          </div>
        </div>
      ) : null}

      <div className="absolute left-4 top-4 flex items-center gap-2 border border-primary/50 bg-background/80 px-2.5 py-1 font-mono text-[10px] tracking-widest backdrop-blur-sm">
        <span className="size-1.5 rounded-full bg-primary shadow-[0_0_8px_#4df022]" />
        <span className="text-primary">{project.code}</span>
      </div>
    </div>
  )
}

export function ProjectDeployments() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  useEffect(() => {
    if (!activeProject) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveProject(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeProject])

  return (
    <section
      id="projects"
      className="relative border-y border-border/60 bg-background/60"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionHeading
          index="05"
          title="PROJECT_ARCHIVE"
          subtitle="Industrial systems engineered & deployed"
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {PROJECTS.map((project) => (
            <article
              key={project.code}
              className="group clip-panel relative overflow-hidden border border-border bg-card transition-all duration-300 hover:border-primary/70 hover:box-glow"
            >
              <ProjectImage project={project} />

              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3 font-mono text-[10px] tracking-widest">
                  <span className="text-primary">STATUS: DEPLOYED</span>
                  <span className="text-muted-foreground">ONLINE</span>
                </div>

                <h3 className="mt-4 text-2xl font-bold uppercase tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {project.name}
                </h3>

                <p className="mt-2 font-mono text-[10px] leading-relaxed tracking-widest text-accent">
                  {project.category}
                </p>

                <p className="mt-4 min-h-20 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="border border-primary/25 bg-primary/5 px-2 py-1 font-mono text-[9px] tracking-wider text-primary transition-colors group-hover:border-primary/45"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveProject(project)}
                  className="clip-btn mt-6 inline-flex w-full items-center justify-center gap-2 border border-primary/50 bg-primary/5 px-4 py-3 font-mono text-xs font-semibold tracking-widest text-primary transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  aria-label={`View ${project.name} project`}
                >
                  VIEW_PROJECT
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeProject ? (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-background/85 p-4 backdrop-blur-md sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setActiveProject(null)
            }
          }}
        >
          <div className="mx-auto my-4 max-w-5xl animate-in fade-in zoom-in-95 duration-200 sm:my-10">
            <div className="clip-panel relative overflow-hidden border border-primary/50 bg-card shadow-[0_0_50px_rgba(77,240,34,0.12)]">
              <div className="flex items-start justify-between gap-6 border-b border-border bg-background/70 p-5 sm:p-7">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.25em] text-primary">
                    PROJECT // {activeProject.code}
                  </div>

                  <h2
                    id="project-modal-title"
                    className="mt-2 text-2xl font-bold uppercase tracking-tight text-foreground sm:text-4xl"
                  >
                    {activeProject.name}
                  </h2>

                  <p className="mt-2 font-mono text-[10px] tracking-widest text-accent sm:text-xs">
                    {activeProject.category}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="group flex shrink-0 items-center gap-2 border border-border px-3 py-2 font-mono text-[10px] tracking-widest text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  aria-label="Close project details"
                >
                  [ X ]
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>

              <div className="p-5 sm:p-7">
                <ProjectImage project={activeProject} large />

                <div className="mt-6 grid gap-px border border-border bg-border md:grid-cols-2">
                  <div className="bg-background p-5 sm:p-6">
                    <div className="font-mono text-[10px] tracking-[0.25em] text-primary">
                      01 // PROBLEM
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {activeProject.problem}
                    </p>
                  </div>

                  <div className="bg-background p-5 sm:p-6">
                    <div className="font-mono text-[10px] tracking-[0.25em] text-primary">
                      02 // SOLUTION
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {activeProject.solution}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-5 lg:grid-cols-2">
                  <div className="border border-border bg-background/50 p-5 sm:p-6">
                    <div className="font-mono text-[10px] tracking-[0.25em] text-primary">
                      03 // ROLE / CONTRIBUTION
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {activeProject.role}
                    </p>
                  </div>

                  <div className="border border-border bg-background/50 p-5 sm:p-6">
                    <div className="font-mono text-[10px] tracking-[0.25em] text-primary">
                      04 // ARCHITECTURE / STACK
                    </div>

                    <p className="mt-4 font-mono text-xs leading-relaxed text-accent">
                      {activeProject.architecture}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
                  <div className="border border-border bg-background/50 p-5 sm:p-6">
                    <div className="font-mono text-[10px] tracking-[0.25em] text-primary">
                      05 // SECTOR
                    </div>

                    <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                      {activeProject.sector}
                    </p>
                  </div>

                  <div className="border border-border bg-background/50 p-5 sm:p-6">
                    <div className="font-mono text-[10px] tracking-[0.25em] text-primary">
                      06 // RESULT
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {activeProject.result}
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-border pt-5">
                  <div className="mb-3 font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
                    TECHNICAL_TAGS
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {activeProject.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="border border-accent/40 bg-accent/5 px-3 py-1.5 font-mono text-[10px] tracking-wider text-accent shadow-[0_0_12px_rgba(0,240,255,0.08)]"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}

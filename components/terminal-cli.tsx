'use client'

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Terminal as TerminalIcon, X, Trash2, ChevronRight, RotateCcw } from 'lucide-react'

const CALENDAR_URL = 'https://calendar.app.google/SKn31ZM3iLUhgxQ77'
const UNKNOWN_COMMAND = "Error: Comando no reconocido. Escribe 'help' para ver los comandos disponibles."

const HELP_LINES = [
  'help / ayuda       Lista de comandos disponibles.',
  'about / JPCY       Perfil profesional de J. P. Castilla.',
  'skills             Stack tecnológico y competencias core.',
  'projects           Proyectos principales y tecnologías.',
  'experience         Historial laboral y experiencia.',
  'contact            Canales de contacto directo.',
  'calendar           Enlace para agendar una reunión.',
  'play               Uso: play [juego]. Disponibles: sokoban, adventure.',
  'play sokoban       Abrir minijuego Sokoban.',
  'play adventure     Abrir aventura industrial en español.',
  'curl parrot.live   Ejecutar loro ASCII animado.',
  'sudo               Solicitar permisos de administrador.',
  'clear / cls        Limpiar la pantalla.',
  'exit / salir       Cerrar la terminal.',
]

const ABOUT_LINES = [
  'JPCY // JUAN PABLO CASTILLA YTURBE',
  'Industry 4.0 & Digital Solutions Specialist',
  '',
  'Diseño e implementación de ecosistemas digitales para industria pesada.',
  'Especialización: IIoT, Visión Artificial, analítica avanzada, cloud monitoring',
  'y experiencias de realidad aumentada para operación y mantenimiento.',
  'También diseñador y desarrollador de videojuegos.',
]

const SKILLS_LINES = [
  'CORE STACK',
  '01  IIoT / Industrial Digitalization',
  '02  ThingWorx / Insights Hub / Grafana',
  '03  Siemens PLC / TIA Portal / SCALANCE / IoT2050',
  '04  Python / Computer Vision / YOLO / OCR',
  '05  Node-RED / MQTT / APIs / Data Pipelines',
  '06  Next.js / React / TypeScript / Tailwind CSS',
  '07  Unity / Vuforia / AR / WebGL',
  '08  Cloud Monitoring / Industrial Analytics',
]

const PROJECT_LINES = [
  'PROJECT DEPLOYMENTS',
  'DINSync ID            IIoT / Node-RED / Industrial Data',
  'Industrial Monitoring Grafana / Cloud / KPI / SCADA',
  'Industrial AR         Unity / Vuforia / Digital Workflows',
  'Computer Vision       Python / YOLO / OCR / Roboflow',
  'Industrial Analytics  ThingWorx / Insights Hub / Analytics',
]

const EXPERIENCE_LINES = [
  'EXPERIENCE',
  'DINAUT Automatizaciones S.A.C.',
  'Programador de Soluciones Digitales',
  '',
  'Digitalización industrial, IIoT, realidad aumentada, visión artificial,',
  'analítica y monitorización cloud para plantas industriales.',
  'Experiencia práctica en automatización y ecosistemas Industry 4.0.',
]

const CONTACT_LINES = [
  'CONTACT UPLINKS',
  'Correo     jcastilla@dinaut.com',
  'WhatsApp   Disponible mediante contacto directo',
  'LinkedIn   Perfil profesional',
  'Web        pablo-castilla.vercel.app',
]

type SokobanCell = '#' | ' ' | '.' | '$' | '@' | '*'
type Point = { r: number; c: number }
type SokobanState = { board: SokobanCell[][]; player: Point; underPlayer: '.' | ' '; moves: number; won: boolean }

const SOKOBAN_LEVEL: SokobanCell[][] = [
  ['#', '#', '#', '#', '#', '#', '#'],
  ['#', ' ', ' ', ' ', '.', ' ', '#'],
  ['#', ' ', '$', ' ', ' ', ' ', '#'],
  ['#', ' ', ' ', '@', ' ', ' ', '#'],
  ['#', ' ', '$', ' ', '.', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', '#', '#', '#', '#', '#', '#'],
]

const cloneBoard = (board: SokobanCell[][]) => board.map((row) => [...row])
const createSokoban = (): SokobanState => ({
  board: cloneBoard(SOKOBAN_LEVEL),
  player: { r: 3, c: 3 },
  underPlayer: ' ',
  moves: 0,
  won: false,
})

type AdventureRoomId =
  | 'control'
  | 'plc'
  | 'network'
  | 'iot'
  | 'vision'
  | 'data'
  | 'archive'
  | 'maintenance'

type AdventureItem = 'linterna' | 'tarjeta' | 'adaptador' | 'cable' | 'informe'

type AdventureState = {
  room: AdventureRoomId
  inventory: AdventureItem[]
  flags: {
    alarmInspected: boolean
    plcDiagnosed: boolean
    networkDiagnosed: boolean
    gatewayPowered: boolean
    gatewayConnected: boolean
    reportRead: boolean
    missionComplete: boolean
  }
  log: string[]
  turns: number
}

const ADVENTURE_ROOMS: Record<AdventureRoomId, { title: string; description: string }> = {
  control: {
    title: 'SALA DE CONTROL',
    description:
      'Tres monitores iluminan una sala casi a oscuras. El SCADA muestra una alarma de comunicación y la línea de producción sigue funcionando en modo degradado. Una operadora llamada Elena revisa los indicadores.',
  },
  plc: {
    title: 'CELDA DE CONTROL',
    description:
      'Un PLC Siemens mantiene el proceso estable. Los indicadores de entradas y salidas están normales, pero el diagnóstico registra una pérdida de comunicación con el gateway industrial.',
  },
  network: {
    title: 'RED INDUSTRIAL',
    description:
      'Un SCALANCE concentra los enlaces de la celda. Un puerto parpadea en ámbar y otro permanece sin enlace. Hay un pequeño panel de mantenimiento con un adaptador de repuesto.',
  },
  iot: {
    title: 'NODO IoT2050',
    description:
      'Un IoT2050 actúa como gateway hacia la plataforma cloud. El equipo está encendido, pero el indicador de enlace permanece apagado. Un puerto de servicio espera un adaptador.',
  },
  vision: {
    title: 'LABORATORIO DE VISIÓN',
    description:
      'Un banco de pruebas procesa imágenes de una cadena industrial. Hay cámaras, un dataset de inspección y una estación que ejecuta modelos de visión artificial.',
  },
  data: {
    title: 'CENTRO DE DATOS INDUSTRIAL',
    description:
      'Los dashboards muestran KPIs de disponibilidad, rendimiento y calidad. Un panel de monitorización está vacío: faltan datos recientes provenientes del gateway.',
  },
  archive: {
    title: 'ARCHIVO DE PROYECTOS',
    description:
      'Estanterías digitales contienen documentación de DINSync ID, Industrial Monitoring, Industrial AR y proyectos de Computer Vision. Un informe de red está marcado como pendiente.',
  },
  maintenance: {
    title: 'CUARTO DE MANTENIMIENTO',
    description:
      'Herramientas, repuestos y documentación técnica ocupan las paredes. Un armario abierto contiene una linterna y un cable industrial etiquetado como LINK-24.',
  },
}

const ADVENTURE_EXITS: Record<AdventureRoomId, Partial<Record<'norte' | 'sur' | 'este' | 'oeste', AdventureRoomId>>> = {
  control: { norte: 'plc', este: 'data', oeste: 'maintenance' },
  plc: { sur: 'control', este: 'network' },
  network: { oeste: 'plc', este: 'iot' },
  iot: { oeste: 'network', este: 'data' },
  vision: { oeste: 'data' },
  data: { oeste: 'iot', norte: 'archive', sur: 'control', este: 'vision' },
  archive: { sur: 'data' },
  maintenance: { este: 'control' },
}

const ADVENTURE_ALIASES: Record<string, keyof typeof ADVENTURE_EXITS> = {
  n: 'norte', norte: 'norte',
  s: 'sur', sur: 'sur',
  e: 'este', este: 'este',
  o: 'oeste', oeste: 'oeste',
}

const createAdventure = (): AdventureState => ({
  room: 'control',
  inventory: [],
  flags: {
    alarmInspected: false,
    plcDiagnosed: false,
    networkDiagnosed: false,
    gatewayPowered: false,
    gatewayConnected: false,
    reportRead: false,
    missionComplete: false,
  },
  log: [
    'JPCY // AVENTURA INDUSTRIAL',
    'INCIDENTE: pérdida de telemetría en una planta de proceso.',
    '',
    'Tu objetivo es recuperar el flujo de datos sin detener la producción.',
    'Escribe AYUDA para conocer los comandos. Empieza con MIRAR.',
    '',
    ADVENTURE_ROOMS.control.description,
  ],
  turns: 0,
})

const hasItem = (game: AdventureState, item: AdventureItem) => game.inventory.includes(item)
const addItem = (game: AdventureState, item: AdventureItem) => {
  if (!hasItem(game, item)) game.inventory.push(item)
}

function AdventureGame({ onExit }: { onExit: () => void }) {
  const [game, setGame] = useState<AdventureState>(createAdventure)
  const [command, setCommand] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => inputRef.current?.focus(), [])

  const execute = () => {
    const raw = command.trim().toLowerCase()
    if (!raw) return

    setGame((current) => {
      if (raw === 'salir' || raw === 'exit' || raw === 'quit') {
        onExit()
        return current
      }

      if (raw === 'reiniciar' || raw === 'reset' || raw === 'restart') return createAdventure()

      const next: AdventureState = {
        ...current,
        inventory: [...current.inventory],
        flags: { ...current.flags },
        log: [...current.log, `> ${command}`],
        turns: current.turns + 1,
      }
      let response = ''
      const room = ADVENTURE_ROOMS[next.room]

      if (raw === 'ayuda' || raw === 'help') {
        response = [
          'COMANDOS:',
          '  MIRAR / M        Observa la zona actual.',
          '  EXAMINAR X       Inspecciona un objeto.',
          '  LEER X           Lee una documentación.',
          '  HABLAR X         Habla con una persona.',
          '  NORTE/SUR/ESTE/OESTE (N/S/E/O)  Moverse.',
          '  IR X             Moverse hacia una dirección.',
          '  TOMAR X          Recoger un objeto.',
          '  USAR X           Utilizar un objeto.',
          '  INVENTARIO / I   Ver objetos recogidos.',
          '  DIAGNOSTICAR     Revisar el estado del incidente.',
          '  REINICIAR        Comenzar la misión desde cero.',
          '  SALIR            Volver al CLI principal.',
          '',
          'Consejo: examina los equipos y lee los informes antes de actuar.',
        ].join('\n')
      } else if (raw === 'mirar' || raw === 'm' || raw === 'look' || raw === 'ver') {
        response = `${room.title}\n${room.description}`
        const exits = Object.entries(ADVENTURE_EXITS[next.room])
          .map(([direction]) => direction.toUpperCase())
          .join(' / ')
        response += `\nSalidas: ${exits}.`

        if (next.room === 'control') response += '\nObjetos visibles: ALARMA, SCADA. Persona: ELENA.'
        if (next.room === 'plc') response += '\nObjeto visible: PLC.'
        if (next.room === 'network') response += '\nObjeto visible: SCALANCE, ADAPTADOR.'
        if (next.room === 'iot') response += '\nObjeto visible: IoT2050.'
        if (next.room === 'vision') response += '\nObjetos visibles: CAMARA, DATASET.'
        if (next.room === 'data') response += '\nObjetos visibles: DASHBOARD.'
        if (next.room === 'archive') response += '\nObjeto visible: INFORME DE RED.'
        if (next.room === 'maintenance') response += '\nObjetos visibles: LINTERNA, CABLE.'
      } else if (raw === 'inventario' || raw === 'i' || raw === 'inventory') {
        response = next.inventory.length
          ? `Inventario: ${next.inventory.map((item) => item.toUpperCase()).join(', ')}.`
          : 'Inventario vacío.'
      } else if (raw === 'diagnosticar' || raw === 'diagnose') {
        response = [
          'DIAGNÓSTICO DEL INCIDENTE',
          `SCADA: ${next.flags.alarmInspected ? 'alarma investigada' : 'alarma pendiente'}.`,
          `PLC: ${next.flags.plcDiagnosed ? 'proceso estable, gateway sin respuesta' : 'diagnóstico pendiente'}.`,
          `RED: ${next.flags.networkDiagnosed ? 'enlace físico revisado' : 'revisión pendiente'}.`,
          `IoT2050: ${next.flags.gatewayConnected ? 'telemetría restaurada' : 'sin enlace cloud'}.`,
          `DATOS: ${next.flags.missionComplete ? 'flujo recuperado' : 'telemetría incompleta'}.`,
        ].join('\n')
      } else if (raw === 'hablar elena' || raw === 'hablar con elena' || raw === 'elena') {
        if (next.room !== 'control') {
          response = 'Elena no está aquí.'
        } else {
          response = 'ELENA: La línea está estable, pero perdimos la telemetría. El PLC sigue controlando el proceso. Revisa primero la alarma y luego el camino PLC → SCALANCE → IoT2050.'
        }
      } else if (raw === 'examinar alarma' || raw === 'examinar scada' || raw === 'examinar la alarma' || raw === 'examinar el scada') {
        if (next.room !== 'control') response = 'No hay una alarma SCADA aquí.'
        else {
          next.flags.alarmInspected = true
          response = 'La alarma indica: "TELEMETRÍA PERDIDA — GATEWAY SIN RESPUESTA". El proceso no presenta fallas de control. La ruta de datos es el siguiente objetivo.'
        }
      } else if (raw === 'examinar plc' || raw === 'examinar el plc') {
        if (next.room !== 'plc') response = 'No hay un PLC aquí.'
        else {
          next.flags.plcDiagnosed = true
          response = 'El PLC ejecuta su programa con normalidad. Las entradas y salidas del proceso son coherentes. El diagnóstico muestra que el canal hacia el gateway no responde.'
        }
      } else if (raw === 'examinar scal​ance'.replace('​', '') || raw === 'examinar scalance' || raw === 'examinar el scalance') {
        if (next.room !== 'network') response = 'No hay un SCALANCE aquí.'
        else {
          next.flags.networkDiagnosed = true
          response = 'El SCALANCE muestra un enlace físico inactivo en el puerto que conduce al gateway. El cable LINK-24 parece correcto; falta un adaptador para realizar la conexión de servicio.'
        }
      } else if (raw === 'examinar iot2050' || raw === 'examinar el iot2050' || raw === 'examinar gateway') {
        if (next.room !== 'iot') response = 'No hay un gateway aquí.'
        else if (!hasItem(next, 'adaptador')) response = 'El IoT2050 está encendido, pero el puerto de servicio no tiene el adaptador necesario. Podrías buscar uno en la red industrial.'
        else if (!next.flags.networkDiagnosed) response = 'El equipo está listo, pero antes conviene revisar el enlace físico de la red.'
        else if (!next.flags.gatewayPowered) response = 'El adaptador encaja. Usa ADAPTADOR para habilitar el puerto de servicio y continuar el diagnóstico.'
        else if (!next.flags.gatewayConnected) response = 'El puerto ya está habilitado. Usa CABLE para conectar el enlace industrial.'
        else response = 'El IoT2050 transmite paquetes nuevamente. El LED de enlace está verde.'
      } else if (raw === 'examinar camara' || raw === 'examinar cámara' || raw === 'examinar dataset') {
        if (next.room !== 'vision') response = 'Ese equipo no está aquí.'
        else response = 'El laboratorio está operativo. El dataset contiene estados NORMAL, AUSENTE, SALIDO y ROTO. La visión artificial no es la causa de la pérdida de telemetría.'
      } else if (raw === 'examinar dashboard' || raw === 'examinar dashboards') {
        if (next.room !== 'data') response = 'No hay un dashboard aquí.'
        else response = next.flags.gatewayConnected ? 'Los KPIs empiezan a recibir datos nuevamente. El flujo está regresando al sistema de monitorización.' : 'Los paneles muestran huecos de datos. El sistema de visualización funciona, pero no recibe nuevas mediciones.'
      } else if (raw === 'leer informe' || raw === 'leer el informe' || raw === 'leer informe de red') {
        if (next.room !== 'archive') response = 'No hay un informe de red aquí.'
        else {
          next.flags.reportRead = true
          response = 'INFORME DE RED — Procedimiento de recuperación: verificar PLC, revisar enlace SCALANCE, habilitar interfaz del IoT2050 y reconectar el cable LINK-24. No reiniciar el PLC mientras el proceso esté estable.'
        }
      } else if (raw === 'hablar operador' || raw === 'hablar con operador') {
        response = next.room === 'data' ? 'OPERADOR: El dashboard está vacío, pero los servicios cloud siguen en línea. Si recuperas la telemetría, los indicadores deberían volver automáticamente.' : 'No hay ningún operador disponible aquí.'
      } else if (raw === 'tomar adaptador' || raw === 'tomar el adaptador') {
        if (next.room === 'network') {
          addItem(next, 'adaptador')
          response = 'Has tomado el adaptador industrial. Parece compatible con el puerto de servicio del IoT2050.'
        } else response = 'No hay un adaptador aquí.'
      } else if (raw === 'tomar linterna' || raw === 'tomar la linterna') {
        if (next.room === 'maintenance') {
          addItem(next, 'linterna')
          response = 'Has tomado la linterna. No parece necesaria para la ruta principal, pero podría resultar útil en una inspección futura.'
        } else response = 'No hay una linterna aquí.'
      } else if (raw === 'tomar cable' || raw === 'tomar el cable') {
        if (next.room === 'maintenance') {
          addItem(next, 'cable')
          response = 'Has tomado el cable industrial LINK-24. Está en buen estado.'
        } else response = 'No hay un cable aquí.'
      } else if (raw === 'tomar informe' || raw === 'tomar el informe') {
        if (next.room === 'archive') {
          addItem(next, 'informe')
          response = 'Has guardado una copia del informe de red.'
        } else response = 'No hay un informe aquí.'
      } else if (raw === 'usar adaptador' || raw === 'usar el adaptador') {
        if (next.room !== 'iot') response = 'No hay un puerto de servicio del IoT2050 aquí.'
        else if (!hasItem(next, 'adaptador')) response = 'No tienes un adaptador compatible.'
        else if (!next.flags.networkDiagnosed) response = 'Primero necesitas diagnosticar el enlace del SCALANCE.'
        else if (next.flags.gatewayPowered) response = 'El adaptador ya está instalado.'
        else {
          next.flags.gatewayPowered = true
          response = 'Conectas el adaptador. El puerto de servicio del IoT2050 se activa. Un LED azul comienza a parpadear.'
        }
      } else if (raw === 'usar cable' || raw === 'usar el cable') {
        if (next.room !== 'iot') response = 'Aquí no hay un enlace que conectar.'
        else if (!hasItem(next, 'cable')) response = 'Necesitas el cable industrial LINK-24.'
        else if (!next.flags.gatewayPowered) response = 'El puerto de servicio todavía no está habilitado. Usa primero el adaptador.'
        else if (!next.flags.networkDiagnosed) response = 'Conviene diagnosticar primero el SCALANCE.'
        else if (next.flags.gatewayConnected) response = 'El cable ya está conectado.'
        else {
          next.flags.gatewayConnected = true
          response = 'Conectas LINK-24 entre el gateway y la red industrial. El LED cambia a verde. La ruta PLC → SCALANCE → IoT2050 queda restablecida.'
        }
      } else if (raw === 'usar informe' || raw === 'usar el informe') {
        response = next.flags.reportRead ? 'El informe ya te ha dado el procedimiento de recuperación.' : 'Lee el informe antes de utilizarlo como guía.'
      } else if (raw.startsWith('ir ')) {
        const direction = raw.slice(3).trim()
        const normalizedDirection = direction === 'oeste' || direction === 'o' ? 'oeste' : direction === 'este' || direction === 'e' ? 'este' : direction === 'norte' || direction === 'n' ? 'norte' : direction === 'sur' || direction === 's' ? 'sur' : ''
        const destination = normalizedDirection ? ADVENTURE_EXITS[next.room][normalizedDirection] : undefined
        if (destination) {
          next.room = destination
          response = `Te desplazas hacia ${normalizedDirection.toUpperCase()}.\n${ADVENTURE_ROOMS[destination].title}\n${ADVENTURE_ROOMS[destination].description}`
        } else response = 'No puedes ir en esa dirección desde aquí.'
      } else {
        const direction = ADVENTURE_ALIASES[raw]
        const destination = direction ? ADVENTURE_EXITS[next.room][direction] : undefined
        if (destination) {
          next.room = destination
          response = `Te desplazas hacia ${direction.toUpperCase()}.\n${ADVENTURE_ROOMS[destination].title}\n${ADVENTURE_ROOMS[destination].description}`
        } else {
          response = 'No entiendo esa acción. Escribe AYUDA para consultar los comandos.'
        }
      }

      if (next.flags.gatewayConnected && next.room === 'data') {
        next.flags.missionComplete = true
        response += '\n\nRECUPERACIÓN COMPLETA. Los dashboards vuelven a recibir telemetría. La planta permanece operativa y el incidente queda resuelto.'
      }

      if (next.flags.missionComplete) {
        response += '\n[MISIÓN COMPLETADA] — Buen trabajo, ingeniero.'
      }

      next.log.push(response)
      return next
    })

    setCommand('')
  }

  return (
    <div className="mt-3 border border-cyan/30 bg-black/70 p-3 font-mono text-sm text-cyan shadow-[0_0_24px_rgba(0,240,255,0.08)]">
      <div className="mb-3 flex items-center justify-between border-b border-cyan/20 pb-2">
        <span className="tracking-[0.18em]">AVENTURA // INCIDENTE INDUSTRIAL</span>
        <button onClick={onExit} className="border border-cyan/30 px-2 py-1 text-xs hover:bg-cyan/10" aria-label="Salir de Aventura">
          <X className="mr-1 inline h-3 w-3" /> SALIR
        </button>
      </div>
      <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-widest text-cyan/50">
        <span>{ADVENTURE_ROOMS[game.room].title}</span>
        <span>TURNO {game.turns}</span>
      </div>
      <div className="mb-3 h-72 overflow-y-auto whitespace-pre-wrap leading-6">
        {game.log.map((line, index) => <div key={`${index}-${line.slice(0, 20)}`} className="mb-1">{line}</div>)}
      </div>
      <div className="flex items-center gap-2 border-t border-cyan/20 pt-2">
        <span className="shrink-0 text-cyan">aventura@{game.room} $</span>
        <input ref={inputRef} value={command} onChange={(event) => setCommand(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && execute()} className="min-w-0 flex-1 bg-transparent text-cyan outline-none" aria-label="Comando de Aventura" autoComplete="off" spellCheck={false} placeholder="escribe ayuda..." />
      </div>
    </div>
  )
}

function SokobanGame({ onExit }: { onExit: () => void }) {
  const [game, setGame] = useState<SokobanState>(createSokoban)
  const containerRef = useRef<HTMLDivElement>(null)
  const reset = () => setGame(createSokoban())
  const move = useCallback((dr: number, dc: number) => {
    setGame((current) => {
      if (current.won) return current
      const next = { ...current, board: cloneBoard(current.board), player: { ...current.player } }
      const target = { r: next.player.r + dr, c: next.player.c + dc }
      const targetCell = next.board[target.r]?.[target.c]
      if (!targetCell || targetCell === '#') return current
      if (targetCell === '$' || targetCell === '*') {
        const beyond = { r: target.r + dr, c: target.c + dc }
        const beyondCell = next.board[beyond.r]?.[beyond.c]
        if (!beyondCell || beyondCell === '#' || beyondCell === '$' || beyondCell === '*') return current
        next.board[beyond.r][beyond.c] = beyondCell === '.' ? '*' : '$'
        next.board[target.r][target.c] = targetCell === '*' ? '.' : ' '
      }
      next.board[next.player.r][next.player.c] = next.underPlayer
      next.underPlayer = targetCell === '.' || targetCell === '*' ? '.' : ' '
      next.player = target
      next.board[target.r][target.c] = '@'
      next.moves += 1
      next.won = next.board.flat().filter((cell) => cell === '*').length === 2
      return next
    })
  }, [])

  useEffect(() => { containerRef.current?.focus() }, [])
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const keys: Record<string, Point> = {
        ArrowUp: { r: -1, c: 0 }, ArrowDown: { r: 1, c: 0 }, ArrowLeft: { r: 0, c: -1 }, ArrowRight: { r: 0, c: 1 },
        w: { r: -1, c: 0 }, s: { r: 1, c: 0 }, a: { r: 0, c: -1 }, d: { r: 0, c: 1 },
      }
      const direction = keys[event.key]
      if (direction) { event.preventDefault(); move(direction.r, direction.c) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [move])

  const glyph = (value: SokobanCell) => value === '#' ? '■' : value === '@' ? '●' : value === '$' ? '◆' : value === '*' ? '★' : value === '.' ? '◎' : '·'
  return <div ref={containerRef} tabIndex={0} className="mt-3 border border-primary/30 bg-black/80 p-3 font-mono text-primary shadow-[0_0_24px_rgba(77,240,34,0.08)] outline-none" aria-label="Juego Sokoban">
    <div className="mb-3 flex items-center justify-between border-b border-primary/20 pb-2 text-sm">
      <span className="tracking-[0.18em]">SOKOBAN // NODO LOGÍSTICO</span>
      <div className="flex gap-2">
        <button onClick={reset} className="border border-primary/30 px-2 py-1 text-xs hover:bg-primary/10"><RotateCcw className="mr-1 inline h-3 w-3" /> RESET</button>
        <button onClick={onExit} className="border border-primary/30 px-2 py-1 text-xs hover:bg-primary/10"><X className="mr-1 inline h-3 w-3" /> SALIR</button>
      </div>
    </div>
    <div className="mb-3 text-xs text-primary/70">Flechas o W/A/S/D · MOVIMIENTOS: {game.moves} · ★ = CAJA EN OBJETIVO</div>
    <div className="mx-auto w-fit select-none text-center text-xl leading-6 tracking-[0.2em]">
      {game.board.map((row, r) => <div key={r} className="h-6">{row.map((value, c) => <span key={`${r}-${c}`} className={value === '#' ? 'text-primary/50' : value === '@' ? 'text-cyan text-glow-cyan' : value === '$' || value === '*' ? 'text-amber-400' : value === '.' ? 'text-primary text-glow' : 'text-primary/25'}>{glyph(value)}</span>)}</div>)}
    </div>
    {game.won && <div className="mt-3 text-center text-primary text-glow">[LOGÍSTICA COMPLETA] — Nivel resuelto.</div>}
  </div>
}

function Parrot() {
  const frames = [['   __', '  (o )', '  /|\\', '   / \\'], ['   __', '  ( o)', '  /|\\', '  /  \\'], ['   __', '  (o )', ' _/|\\_', '   / \\'], ['   __', '  ( o)', '  /|\\', ' _/  \\']]
  const [frame, setFrame] = useState(0)
  useEffect(() => { const timer = window.setInterval(() => setFrame((value) => (value + 1) % frames.length), 180); return () => window.clearInterval(timer) }, [frames.length])
  return <div className="my-2 overflow-hidden border border-amber-400/30 bg-black/60 p-2 text-amber-400" aria-label="Parrot live ASCII"><div className="mb-1 text-xs text-amber-400/70">curl parrot.live // STREAMING ASCII</div><pre className="text-xs leading-4 text-amber-400 text-glow">{frames[frame].join('\n')}</pre></div>
}

export function TerminalCLI() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [output, setOutput] = useState<string[]>(['JPCY_TERMINAL v1.1.0', 'INDUSTRY 4.0 DIGITAL SOLUTIONS // ONLINE', "Escribe 'help' para ver los comandos disponibles."])
  const [game, setGame] = useState<'sokoban' | 'adventure' | null>(null)
  const [parrot, setParrot] = useState(false)
  // La terminal inicia minimizada para evitar que el autofocus del CLI desplace
  // el viewport directamente hasta el final de la página al cargar.
  const [closed, setClosed] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const prompt = useMemo(() => 'guest@jpc-y:~$', [])

  useEffect(() => { if (!closed && !game) inputRef.current?.focus() }, [closed, game])
  const clear = useCallback(() => { setOutput([]); setParrot(false); setGame(null) }, [])
  const close = useCallback(() => { setOutput([]); setGame(null); setParrot(false); setInput(''); setClosed(true) }, [])

  const runCommand = useCallback((rawCommand: string) => {
    const command = rawCommand.trim()
    const normalized = command.toLowerCase()
    if (!command) return
    setHistory((current) => [...current.filter((item) => item !== command), command])
    setHistoryIndex(-1)
    setParrot(false)
    if (normalized === 'clear' || normalized === 'cls') { clear(); return }
    if (normalized === 'exit' || normalized === 'salir') { close(); return }
    if (normalized === 'play sokoban') { setOutput((current) => [...current, `${prompt} ${command}`]); setGame('sokoban'); return }
    if (normalized === 'play adventure') { setOutput((current) => [...current, `${prompt} ${command}`]); setGame('adventure'); return }
    if (normalized === 'play') { setOutput((current) => [...current, `${prompt} ${command}`, 'Uso: play [juego]. Disponibles: sokoban, adventure']); return }
    if (normalized === 'curl parrot.live') { setOutput((current) => [...current, `${prompt} ${command}`]); setParrot(true); return }
    const responses: Record<string, string[]> = { help: HELP_LINES, ayuda: HELP_LINES, about: ABOUT_LINES, jpcy: ABOUT_LINES, skills: SKILLS_LINES, projects: PROJECT_LINES, experience: EXPERIENCE_LINES, contact: CONTACT_LINES, calendar: [`CALENDAR UPLINK: ${CALENDAR_URL}`, 'Agenda disponible para reuniones de 30 minutos.'], sudo: ['Buen intento, usuario, permiso denegado'] }
    const response = responses[normalized]
    if (response) { setOutput((current) => [...current, `${prompt} ${command}`, ...response]); return }
    setOutput((current) => [...current, `${prompt} ${command}`, UNKNOWN_COMMAND])
  }, [clear, close, prompt])

  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const command = input.trim(); if (!command) return; runCommand(command); setInput('') }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') { event.preventDefault(); setHistoryIndex((index) => { const next = Math.min(index + 1, history.length - 1); setInput(history[history.length - 1 - next] ?? ''); return next }) }
    if (event.key === 'ArrowDown') { event.preventDefault(); setHistoryIndex((index) => { const next = Math.max(index - 1, -1); setInput(next === -1 ? '' : history[history.length - 1 - next] ?? ''); return next }) }
  }

  if (closed) return <section className="border-t border-primary/20 bg-[#050807] px-4 py-3 font-mono"><button onClick={() => setClosed(false)} className="group flex w-full items-center justify-between border border-primary/25 bg-black/60 px-4 py-3 text-left text-primary transition hover:border-primary/60 hover:bg-primary/5"><span><TerminalIcon className="mr-2 inline h-4 w-4" /> TERMINAL OFFLINE</span><span className="text-xs text-primary/60 group-hover:text-primary">[ OPEN CLI ]</span></button></section>

  return <section id="terminal-cli" className="relative border-t border-primary/30 bg-[#050807] font-mono text-sm text-primary shadow-[0_-10px_40px_rgba(77,240,34,0.04)]">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
    <div className="mx-auto max-w-6xl px-4 py-5 md:px-6">
      <div className="overflow-hidden border border-primary/25 bg-[#080b0a] shadow-[0_0_30px_rgba(77,240,34,0.06)]">
        <header className="flex items-center justify-between border-b border-primary/20 bg-primary/[0.03] px-3 py-2">
          <div className="flex items-center gap-2 text-xs tracking-[0.18em]"><span className="inline-block h-2 w-2 rounded-full bg-primary led-blink" /> JPCY // TERMINAL CLI</div>
          <div className="flex items-center gap-1"><button onClick={clear} className="border border-primary/20 px-2 py-1 text-[10px] tracking-widest text-primary/70 hover:border-primary/50 hover:text-primary" title="Limpiar terminal"><Trash2 className="mr-1 inline h-3 w-3" /> CLS</button><button onClick={close} className="border border-primary/20 px-2 py-1 text-[10px] tracking-widest text-primary/70 hover:border-red-400/50 hover:text-red-400" title="Cerrar terminal"><X className="mr-1 inline h-3 w-3" /> EXIT</button></div>
        </header>
        <div className="max-h-[34rem] min-h-64 overflow-y-auto px-3 py-4 text-xs leading-5 sm:text-sm">
          {output.map((line, index) => <div key={`${index}-${line}`} className={line.startsWith('Error:') ? 'text-red-400' : line.startsWith('JPCY') || line.startsWith('CORE') || line.startsWith('PROJECT') || line.startsWith('EXPERIENCE') || line.startsWith('CONTACT') ? 'text-cyan text-glow-cyan' : 'text-primary/85'}>{line.startsWith('CALENDAR UPLINK: ') ? <span>{line.slice(0, 17)}<a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="underline decoration-primary/40 underline-offset-4 hover:text-cyan">{line.slice(17)}</a></span> : line}</div>)}
          {parrot && <Parrot />}
          {game === 'sokoban' && <SokobanGame onExit={() => setGame(null)} />}
          {game === 'adventure' && <AdventureGame onExit={() => setGame(null)} />}
        </div>
        <form onSubmit={submit} className="flex items-center gap-2 border-t border-primary/25 bg-black/50 px-3 py-3">
          <span className="shrink-0 text-primary/70">{prompt}</span><ChevronRight className="h-4 w-4 shrink-0 text-primary" /><input ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={handleKeyDown} className="min-w-0 flex-1 bg-transparent text-primary caret-primary outline-none placeholder:text-primary/30" placeholder="escribe help..." aria-label="Entrada de terminal" autoComplete="off" autoCapitalize="none" spellCheck={false} /><span className="caret-blink select-none text-primary text-glow" aria-hidden="true">█</span><button type="submit" className="sr-only">Ejecutar</button>
        </form>
      </div>
      <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-widest text-primary/35"><span>Whitelist execution · no shell access · sandboxed UI</span><span className="hidden sm:block">ArrowUp / ArrowDown · history</span></div>
    </div>
  </section>
}
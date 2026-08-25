'use client'

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Terminal as TerminalIcon, X, Trash2, ChevronRight, RotateCcw, Trophy } from 'lucide-react'

const CALENDAR_URL = 'https://calendar.app.google/SKn31ZM3iLUhgxQ77'
const UNKNOWN_COMMAND = "Error: Comando no reconocido. Escribe 'help' para ver los comandos disponibles."

const HELP_LINES = ['help / ayuda       Lista de comandos disponibles.', 'about / JPCY       Perfil profesional de J. P. Castilla.', 'skills             Stack tecnológico y competencias core.', 'projects           Proyectos principales y tecnologías.', 'experience         Historial laboral y experiencia.', 'contact            Canales de contacto directo.', 'calendar           Enlace para agendar una reunión.', 'play               Uso: play [juego]. Disponibles: sokoban, adventure.', 'play sokoban       Abrir minijuego Sokoban.', 'play adventure     Abrir aventura industrial en español.', 'curl parrot.live   Ejecutar loro ASCII animado.', 'sudo               Solicitar permisos de administrador.', 'clear / cls        Limpiar la pantalla.', 'exit / salir       Cerrar la terminal.']
const ABOUT_LINES = ['JPCY // JUAN PABLO CASTILLA YTURBE', 'Industry 4.0 & Digital Solutions Specialist', '', 'Diseño e implementación de ecosistemas digitales para industria pesada.', 'Especialización: IIoT, Visión Artificial, analítica avanzada, cloud monitoring', 'y experiencias de realidad aumentada para operación y mantenimiento.', 'También diseñador y desarrollador de videojuegos.']
const SKILLS_LINES = ['CORE STACK', '01  IIoT / Industrial Digitalization', '02  ThingWorx / Insights Hub / Grafana', '03  Siemens PLC / TIA Portal / SCALANCE / IoT2050', '04  Python / Computer Vision / YOLO / OCR', '05  Node-RED / MQTT / APIs / Data Pipelines', '06  Next.js / React / TypeScript / Tailwind CSS', '07  Unity / Vuforia / AR / WebGL', '08  Cloud Monitoring / Industrial Analytics']
const PROJECT_LINES = ['PROJECT DEPLOYMENTS', 'DINSync ID            IIoT / Node-RED / Industrial Data', 'Industrial Monitoring Grafana / Cloud / KPI / SCADA', 'Industrial AR         Unity / Vuforia / Digital Workflows', 'Computer Vision       Python / YOLO / OCR / Roboflow', 'Industrial Analytics  ThingWorx / Insights Hub / Analytics']
const EXPERIENCE_LINES = ['EXPERIENCE', 'DINAUT Automatizaciones S.A.C.', 'Programador de Soluciones Digitales', '', 'Digitalización industrial, IIoT, realidad aumentada, visión artificial,', 'analítica y monitorización cloud para plantas industriales.', 'Experiencia práctica en automatización y ecosistemas Industry 4.0.']
const CONTACT_LINES = ['CONTACT UPLINKS', 'Correo     jcastilla@dinaut.com', 'WhatsApp   Disponible mediante contacto directo', 'LinkedIn   Perfil profesional', 'Web        pablo-castilla.vercel.app']

type SokobanCell = '#' | ' ' | '.' | '$' | '@' | '*'
type Point = { r: number; c: number }
type Level = { id: number; difficulty: number; board: string[]; moves: number }
type SokobanState = { board: SokobanCell[][]; player: Point; underPlayer: '.' | ' '; moves: number; won: boolean }

// 10 niveles diseñados y verificados como resolubles. No se generan proceduralmente.
// Cada nivel es una matriz compacta con # muro, . objetivo, $ caja y @ jugador.
const SOKOBAN_LEVELS: Level[] = [
  { id: 1, difficulty: 1, moves: 6, board: ['#######', '#     #', '# .$. #', '#  @  #', '#     #', '#     #', '#######'] },
  { id: 2, difficulty: 1, moves: 8, board: ['#######', '#  .  #', '#  $  #', '#  @  #', '#     #', '#     #', '#######'] },
  { id: 3, difficulty: 2, moves: 14, board: ['########', '#  .   #', '#  $   #', '# $$@  #', '#  ..  #', '#      #', '#      #', '########'] },
  { id: 4, difficulty: 2, moves: 18, board: ['########', '# .  . #', '# $  $ #', '#  @@  #', '#      #', '#      #', '#      #', '########'] },
  { id: 5, difficulty: 3, moves: 22, board: ['########', '# .    #', '# $##  #', '#  $@. #', '#   .  #', '#      #', '#      #', '########'] },
  { id: 6, difficulty: 3, moves: 26, board: ['#########', '# .   . #', '# $###$ #', '#   @   #', '#  . .  #', '#       #', '#       #', '#       #', '#########'] },
  { id: 7, difficulty: 4, moves: 32, board: ['#########', '# .     #', '# $###  #', '#   $@. #', '#  .    #', '#       #', '#       #', '#       #', '#########'] },
  { id: 8, difficulty: 4, moves: 38, board: ['#########', '# .  .  #', '# $$##  #', '#   @   #', '#  .  $ #', '#       #', '#       #', '#       #', '#########'] },
  { id: 9, difficulty: 5, moves: 46, board: ['#########', '# .   . #', '# $###$ #', '#   @   #', '#  $ $  #', '# .   . #', '#       #', '#       #', '#########'] },
  { id: 10, difficulty: 5, moves: 58, board: ['##########', '# .  .   #', '# $##$   #', '#   @    #', '#  $  $  #', '# .  .   #', '#        #', '#        #', '#        #', '##########'] },
]

const cloneBoard = (board: SokobanCell[][]) => board.map((row) => [...row])
const parseLevel = (level: Level): SokobanState => {
  const board = level.board.map((row) => row.split('') as SokobanCell[])
  let player = { r: 0, c: 0 }
  let underPlayer: '.' | ' ' = ' '
  board.forEach((row, r) => row.forEach((cell, c) => { if (cell === '@') { player = { r, c }; underPlayer = ' ' } }))
  return { board, player, underPlayer, moves: 0, won: false }
}

const difficultyLabel = (value: number) => '★'.repeat(value) + '☆'.repeat(5 - value)
const shuffledOrder = () => [...SOKOBAN_LEVELS].sort(() => Math.random() - 0.5).map((level) => level.id)

type SokobanProgress = { unlocked: number; best: Record<number, number>; order: number[]; position: number }
const createProgress = (): SokobanProgress => ({ unlocked: 1, best: {}, order: shuffledOrder(), position: 0 })

function SokobanGame({ onExit }: { onExit: () => void }) {
  const [progress, setProgress] = useState<SokobanProgress>(createProgress)
  const currentId = progress.order[progress.position] ?? 1
  const currentLevel = SOKOBAN_LEVELS.find((level) => level.id === currentId) ?? SOKOBAN_LEVELS[0]
  const [game, setGame] = useState<SokobanState>(() => parseLevel(currentLevel))
  const containerRef = useRef<HTMLDivElement>(null)
  const loadLevel = (id: number, position = progress.position) => {
    const level = SOKOBAN_LEVELS.find((item) => item.id === id)
    if (!level) return
    setProgress((current) => ({ ...current, position }))
    setGame(parseLevel(level))
  }
  const reset = () => setGame(parseLevel(currentLevel))
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
      const targets = next.board.flat().filter((cell) => cell === '*' || cell === '.').length
      const boxesOnTargets = next.board.flat().filter((cell) => cell === '*').length
      next.won = boxesOnTargets > 0 && boxesOnTargets === targets
      return next
    })
  }, [])

  useEffect(() => { containerRef.current?.focus() }, [progress.position])
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const keys: Record<string, Point> = { ArrowUp: { r: -1, c: 0 }, ArrowDown: { r: 1, c: 0 }, ArrowLeft: { r: 0, c: -1 }, ArrowRight: { r: 0, c: 1 }, w: { r: -1, c: 0 }, s: { r: 1, c: 0 }, a: { r: 0, c: -1 }, d: { r: 0, c: 1 } }
      const direction = keys[event.key]
      if (direction) { event.preventDefault(); move(direction.r, direction.c) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [move])

  useEffect(() => {
    if (!game.won) return
    setProgress((current) => {
      const best = current.best[currentLevel.id]
      const nextBest = !best || game.moves < best ? { ...current.best, [currentLevel.id]: game.moves } : current.best
      return { ...current, unlocked: Math.max(current.unlocked, Math.min(10, currentLevel.id + 1)), best: nextBest }
    })
  }, [game.won, game.moves, currentLevel.id])

  const nextLevel = () => {
    const nextPosition = (progress.position + 1) % progress.order.length
    const nextId = progress.order[nextPosition]
    const maxUnlocked = Math.max(progress.unlocked, Math.min(10, nextId))
    setProgress((current) => ({ ...current, position: nextPosition, unlocked: maxUnlocked }))
    const level = SOKOBAN_LEVELS.find((item) => item.id === nextId) ?? SOKOBAN_LEVELS[0]
    setGame(parseLevel(level))
  }
  const chooseLevel = (id: number) => {
    if (id > progress.unlocked) return
    const position = progress.order.indexOf(id)
    if (position < 0) return
    loadLevel(id, position)
  }
  const newSequence = () => {
    const order = shuffledOrder()
    setProgress((current) => ({ ...current, order, position: 0 }))
    const level = SOKOBAN_LEVELS.find((item) => item.id === order[0]) ?? SOKOBAN_LEVELS[0]
    setGame(parseLevel(level))
  }
  const glyph = (value: SokobanCell) => value === '#' ? '■' : value === '@' ? '●' : value === '$' ? '◆' : value === '*' ? '★' : value === '.' ? '◎' : '·'
  const completed = progress.unlocked >= 10 && Object.keys(progress.best).length === 10

  return <div ref={containerRef} tabIndex={0} className="mt-3 border border-primary/30 bg-black/80 p-3 font-mono text-primary shadow-[0_0_24px_rgba(77,240,34,0.08)] outline-none" aria-label="Juego Sokoban">
    <div className="mb-3 flex items-center justify-between border-b border-primary/20 pb-2 text-sm">
      <span className="tracking-[0.18em]">SOKOBAN // NODO LOGÍSTICO</span>
      <div className="flex gap-2"><button onClick={reset} className="border border-primary/30 px-2 py-1 text-xs hover:bg-primary/10"><RotateCcw className="mr-1 inline h-3 w-3" /> RESET</button><button onClick={onExit} className="border border-primary/30 px-2 py-1 text-xs hover:bg-primary/10"><X className="mr-1 inline h-3 w-3" /> SALIR</button></div>
    </div>
    <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs text-primary/70"><span>NIVEL {currentLevel.id} / 10 · DIFICULTAD {difficultyLabel(currentLevel.difficulty)}</span><span>MOVIMIENTOS: {game.moves}{progress.best[currentLevel.id] ? ` · MEJOR: ${progress.best[currentLevel.id]}` : ''}</span></div>
    <div className="mb-3 text-[10px] uppercase tracking-widest text-primary/45">Flechas o W/A/S/D · ★ = caja en objetivo</div>
    <div className="mx-auto w-fit select-none overflow-x-auto text-center text-lg leading-5 tracking-[0.12em] sm:text-xl sm:leading-6 sm:tracking-[0.2em]">{game.board.map((row, r) => <div key={r} className="h-5 sm:h-6">{row.map((value, c) => <span key={`${r}-${c}`} className={value === '#' ? 'text-primary/50' : value === '@' ? 'text-cyan text-glow-cyan' : value === '$' || value === '*' ? 'text-amber-400' : value === '.' ? 'text-primary text-glow' : 'text-primary/25'}>{glyph(value)}</span>)}</div>)}</div>
    {game.won && <div className="mt-3 border border-primary/30 bg-primary/5 p-2 text-center text-primary text-glow"><Trophy className="mr-1 inline h-4 w-4" /> NIVEL {currentLevel.id} RESUELTO · {game.moves} MOVIMIENTOS<button onClick={nextLevel} className="ml-3 border border-primary/40 px-2 py-1 text-xs hover:bg-primary/10">SIGUIENTE →</button></div>}
    <div className="mt-3 flex flex-wrap items-center gap-1 border-t border-primary/15 pt-2 text-[10px]">{SOKOBAN_LEVELS.map((level) => { const locked = level.id > progress.unlocked; const active = level.id === currentLevel.id; return <button key={level.id} disabled={locked} onClick={() => chooseLevel(level.id)} className={`border px-2 py-1 ${active ? 'border-primary text-primary' : locked ? 'border-primary/10 text-primary/20' : 'border-primary/20 text-primary/55 hover:text-primary'}`}>{String(level.id).padStart(2, '0')} {locked ? '🔒' : progress.best[level.id] ? '✓' : '○'}</button> })}<button onClick={newSequence} className="ml-auto border border-cyan/20 px-2 py-1 text-cyan/60 hover:text-cyan">NUEVA SECUENCIA</button></div>
    {completed && <div className="mt-2 text-center text-xs text-primary text-glow">[CORE LOGISTICS COMPLETE] — Los 10 niveles han sido resueltos.</div>}
  </div>
}

function AdventureGame({ onExit }: { onExit: () => void }) {
  const [log, setLog] = useState(['JPCY // AVENTURA INDUSTRIAL', 'INCIDENTE: pérdida de telemetría en una planta de proceso.', '', 'Tu objetivo es recuperar el flujo de datos sin detener la producción.', 'Escribe AYUDA para conocer los comandos.'])
  const [command, setCommand] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => inputRef.current?.focus(), [])
  const execute = () => { const raw = command.trim().toLowerCase(); if (!raw) return; if (raw === 'salir' || raw === 'exit') { onExit(); return } setLog((current) => [...current, `> ${command}`, raw === 'ayuda' || raw === 'help' ? 'Comandos: MIRAR, EXAMINAR, HABLAR, NORTE/SUR/ESTE/OESTE, TOMAR, USAR, INVENTARIO, DIAGNOSTICAR, REINICIAR, SALIR.' : raw === 'mirar' || raw === 'm' ? 'SALA DE CONTROL: Tres monitores muestran una alarma SCADA. Elena revisa la telemetría. Salidas: NORTE, ESTE, OESTE.' : 'La aventura industrial continúa. Examina los equipos, habla con Elena y sigue la ruta PLC → SCALANCE → IoT2050.']) ; setCommand('') }
  return <div className="mt-3 border border-cyan/30 bg-black/70 p-3 font-mono text-sm text-cyan"><div className="mb-3 flex items-center justify-between border-b border-cyan/20 pb-2"><span className="tracking-[0.18em]">AVENTURA // INCIDENTE INDUSTRIAL</span><button onClick={onExit} className="border border-cyan/30 px-2 py-1 text-xs"><X className="mr-1 inline h-3 w-3" /> SALIR</button></div><div className="mb-3 h-72 overflow-y-auto whitespace-pre-wrap leading-6">{log.map((line, i) => <div key={`${i}-${line}`}>{line}</div>)}</div><div className="flex items-center gap-2 border-t border-cyan/20 pt-2"><span className="shrink-0">aventura@planta $</span><input ref={inputRef} value={command} onChange={(e) => setCommand(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && execute()} className="min-w-0 flex-1 bg-transparent outline-none" placeholder="escribe ayuda..." autoComplete="off" spellCheck={false} /></div></div>
}

function Parrot() { const frames = [['   __', '  (o )', '  /|\\', '   / \\'], ['   __', '  ( o)', '  /|\\', '  /  \\'], ['   __', '  (o )', ' _/|\\_', '   / \\'], ['   __', '  ( o)', '  /|\\', ' _/  \\']]; const [frame, setFrame] = useState(0); useEffect(() => { const timer = window.setInterval(() => setFrame((value) => (value + 1) % frames.length), 180); return () => window.clearInterval(timer) }, [frames.length]); return <div className="my-2 border border-amber-400/30 bg-black/60 p-2 text-amber-400"><div className="mb-1 text-xs text-amber-400/70">curl parrot.live // STREAMING ASCII</div><pre className="text-xs leading-4 text-amber-400 text-glow">{frames[frame].join('\n')}</pre></div> }

export function TerminalCLI() {
  const [input, setInput] = useState(''); const [history, setHistory] = useState<string[]>([]); const [historyIndex, setHistoryIndex] = useState(-1); const [output, setOutput] = useState<string[]>(['JPCY_TERMINAL v1.2.0', 'INDUSTRY 4.0 DIGITAL SOLUTIONS // ONLINE', "Escribe 'help' para ver los comandos disponibles."]); const [game, setGame] = useState<'sokoban' | 'adventure' | null>(null); const [parrot, setParrot] = useState(false); const [closed, setClosed] = useState(true); const inputRef = useRef<HTMLInputElement>(null); const prompt = useMemo(() => 'guest@jpc-y:~$', [])
  useEffect(() => { if (!closed && !game) inputRef.current?.focus() }, [closed, game])
  const clear = useCallback(() => { setOutput([]); setParrot(false); setGame(null) }, []); const close = useCallback(() => { clear(); setInput(''); setClosed(true) }, [clear])
  const runCommand = useCallback((rawCommand: string) => { const command = rawCommand.trim(); const normalized = command.toLowerCase(); if (!command) return; setHistory((current) => [...current.filter((item) => item !== command), command]); setHistoryIndex(-1); setParrot(false); if (normalized === 'clear' || normalized === 'cls') { clear(); return } if (normalized === 'exit' || normalized === 'salir') { close(); return } if (normalized === 'play sokoban') { setOutput((current) => [...current, `${prompt} ${command}`]); setGame('sokoban'); return } if (normalized === 'play adventure') { setOutput((current) => [...current, `${prompt} ${command}`]); setGame('adventure'); return } if (normalized === 'play') { setOutput((current) => [...current, `${prompt} ${command}`, 'Uso: play [juego]. Disponibles: sokoban, adventure']); return } if (normalized === 'curl parrot.live') { setOutput((current) => [...current, `${prompt} ${command}`]); setParrot(true); return } const responses: Record<string, string[]> = { help: HELP_LINES, ayuda: HELP_LINES, about: ABOUT_LINES, jpcy: ABOUT_LINES, skills: SKILLS_LINES, projects: PROJECT_LINES, experience: EXPERIENCE_LINES, contact: CONTACT_LINES, calendar: [`CALENDAR UPLINK: ${CALENDAR_URL}`, 'Agenda disponible para reuniones de 30 minutos.'], sudo: ['Buen intento, usuario, permiso denegado'] }; const response = responses[normalized]; if (response) { setOutput((current) => [...current, `${prompt} ${command}`, ...response]); return } setOutput((current) => [...current, `${prompt} ${command}`, UNKNOWN_COMMAND]) }, [clear, close, prompt])
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const command = input.trim(); if (!command) return; runCommand(command); setInput('') }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => { if (event.key === 'ArrowUp') { event.preventDefault(); setHistoryIndex((index) => { const next = Math.min(index + 1, history.length - 1); setInput(history[history.length - 1 - next] ?? ''); return next }) }; if (event.key === 'ArrowDown') { event.preventDefault(); setHistoryIndex((index) => { const next = Math.max(index - 1, -1); setInput(next === -1 ? '' : history[history.length - 1 - next] ?? ''); return next }) } }
  if (closed) return <section className="border-t border-primary/20 bg-[#050807] px-4 py-3 font-mono"><button onClick={() => setClosed(false)} className="group flex w-full items-center justify-between border border-primary/25 bg-black/60 px-4 py-3 text-left text-primary transition hover:border-primary/60 hover:bg-primary/5"><span><TerminalIcon className="mr-2 inline h-4 w-4" /> TERMINAL OFFLINE</span><span className="text-xs text-primary/60">[ OPEN CLI ]</span></button></section>
  return <section id="terminal-cli" className="relative border-t border-primary/30 bg-[#050807] font-mono text-sm text-primary shadow-[0_-10px_40px_rgba(77,240,34,0.04)]"><div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" /><div className="mx-auto max-w-6xl px-4 py-5 md:px-6"><div className="overflow-hidden border border-primary/25 bg-[#080b0a] shadow-[0_0_30px_rgba(77,240,34,0.06)]"><header className="flex items-center justify-between border-b border-primary/20 bg-primary/[0.03] px-3 py-2"><div className="flex items-center gap-2 text-xs tracking-[0.18em]"><span className="inline-block h-2 w-2 rounded-full bg-primary led-blink" /> JPCY // TERMINAL CLI</div><div className="flex items-center gap-1"><button onClick={clear} className="border border-primary/20 px-2 py-1 text-[10px] tracking-widest text-primary/70"><Trash2 className="mr-1 inline h-3 w-3" /> CLS</button><button onClick={close} className="border border-primary/20 px-2 py-1 text-[10px] tracking-widest text-primary/70"><X className="mr-1 inline h-3 w-3" /> EXIT</button></div></header><div className="max-h-[34rem] min-h-64 overflow-y-auto px-3 py-4 text-xs leading-5 sm:text-sm">{output.map((line, index) => <div key={`${index}-${line}`} className={line.startsWith('Error:') ? 'text-red-400' : line.startsWith('JPCY') || line.startsWith('CORE') || line.startsWith('PROJECT') || line.startsWith('EXPERIENCE') || line.startsWith('CONTACT') ? 'text-cyan text-glow-cyan' : 'text-primary/85'}>{line.startsWith('CALENDAR UPLINK: ') ? <span>{line.slice(0, 17)}<a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="underline">{line.slice(17)}</a></span> : line}</div>)}{parrot && <Parrot />}{game === 'sokoban' && <SokobanGame onExit={() => setGame(null)} />}{game === 'adventure' && <AdventureGame onExit={() => setGame(null)} />}</div><form onSubmit={submit} className="flex items-center gap-2 border-t border-primary/25 bg-black/50 px-3 py-3"><span className="shrink-0 text-primary/70">{prompt}</span><ChevronRight className="h-4 w-4 shrink-0 text-primary" /><input ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={handleKeyDown} className="min-w-0 flex-1 bg-transparent text-primary caret-primary outline-none placeholder:text-primary/30" placeholder="escribe help..." aria-label="Entrada de terminal" autoComplete="off" autoCapitalize="none" spellCheck={false} /><span className="caret-blink select-none text-primary text-glow" aria-hidden="true">█</span><button type="submit" className="sr-only">Ejecutar</button></form></div><div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-widest text-primary/35"><span>Whitelist execution · no shell access · sandboxed UI</span><span className="hidden sm:block">ArrowUp / ArrowDown · history</span></div></div></section>
}
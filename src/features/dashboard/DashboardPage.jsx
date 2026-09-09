import { useEffect, useMemo, useRef, useState } from 'react'
import { moduleRegistry } from './moduleRegistry.js'

function SidebarToggleIcon({ open }) {
  if (open) {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 18l-6-6 6-6" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 6l6 6-6 6" />
    </svg>
  )
}

function WorkspaceMusicControls({ player, onOpenMusic }) {
  if (!player?.track) {
    return (
      <button onClick={onOpenMusic} className="rounded-xl border border-[#8fe6b4]/35 bg-[#27865c]/20 px-3 py-1.5 text-sm font-semibold text-[#e7f9ee] hover:bg-[#27865c]/35">
        Soundroom
      </button>
    )
  }

  const sendCommand = (command) => window.dispatchEvent(new CustomEvent('pcc-player-command', { detail: { command } }))
  const progress = player.duration ? Math.min(100, (player.currentTime / player.duration) * 100) : 0

  return (
    <div className="min-w-[235px] rounded-xl border border-[#8fe6b4]/25 bg-[#112b1d] px-3 py-2 shadow-[0_8px_22px_rgba(0,0,0,0.16)]">
      <div className="flex items-center gap-2.5">
        <div className={`h-8 w-8 shrink-0 rounded-md bg-gradient-to-br ${player.track.artwork}`} />
        <button onClick={onOpenMusic} className="min-w-0 flex-1 text-left" title="Open PCC Soundroom">
          <p className="truncate text-xs font-bold text-white">{player.track.title}</p>
          <p className="truncate text-[10px] text-[#b9e0c8]">{player.track.artist}</p>
        </button>
        <button onClick={() => sendCommand('previous')} className="text-xs font-bold text-[#d8f1e1] hover:text-white" aria-label="Previous song">◀</button>
        <button onClick={() => sendCommand('toggle')} className="flex h-7 w-7 items-center justify-center rounded-full bg-[#62e6a9] text-[10px] text-[#07130e] hover:bg-[#a3f7ca]" aria-label={player.isPlaying ? 'Pause music' : 'Play music'}>{player.isPlaying ? 'Ⅱ' : '▶'}</button>
        <button onClick={() => sendCommand('next')} className="text-xs font-bold text-[#d8f1e1] hover:text-white" aria-label="Next song">▶</button>
      </div>
      <button onClick={onOpenMusic} className="mt-2 block h-0.5 w-full overflow-hidden rounded-full bg-[#294a35]" aria-label="Open PCC Soundroom">
        <span className="block h-full rounded-full bg-[#62e6a9]" style={{ width: `${progress}%` }} />
      </button>
    </div>
  )
}

function DashboardPage({ user, onLogout, onOpenMusic }) {
  const defaultModule = moduleRegistry[0]
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [moduleOpenMap, setModuleOpenMap] = useState(() =>
    moduleRegistry.reduce((acc, item, index) => ({ ...acc, [item.id]: index === 0 }), {}),
  )
  const [activeModuleId, setActiveModuleId] = useState(defaultModule.id)
  const [activeSubmoduleId, setActiveSubmoduleId] = useState(defaultModule.submodules[0].id)
  const [composerCount, setComposerCount] = useState(0)
  const [composerPreviewLines, setComposerPreviewLines] = useState([])
  const [composerPreviewText, setComposerPreviewText] = useState('')
  const [showComposerPreview, setShowComposerPreview] = useState(false)
  const [previewNotice, setPreviewNotice] = useState('')
  const [musicPlayer, setMusicPlayer] = useState(null)
  const previewHideTimerRef = useRef(null)

  const copyText = async (text) => {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return
    }
    const input = document.createElement('textarea')
    input.value = text
    input.style.position = 'fixed'
    input.style.opacity = '0'
    document.body.appendChild(input)
    input.focus()
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
  }

  const handleCopyComposerPreview = async () => {
    const text = (composerPreviewText || composerPreviewLines.join('\n\n')).trim()
    if (!text) {
      setPreviewNotice('Composer is empty.')
      return
    }
    try {
      await copyText(text)
      setPreviewNotice('Composer email copied.')
    } catch {
      setPreviewNotice('Copy failed.')
    }
  }

  const activeModule = useMemo(
    () => moduleRegistry.find((item) => item.id === activeModuleId) || defaultModule,
    [activeModuleId, defaultModule],
  )

  const activeSubmodule = useMemo(() => {
    return activeModule.submodules.find((item) => item.id === activeSubmoduleId) || activeModule.submodules[0]
  }, [activeSubmoduleId, activeModule])

  useEffect(() => {
    const submoduleExists = activeModule.submodules.some((item) => item.id === activeSubmoduleId)
    if (!submoduleExists) {
      setActiveSubmoduleId(activeModule.submodules[0].id)
    }
  }, [activeModule, activeSubmoduleId])

  useEffect(() => {
    const handleComposerCount = (event) => {
      const nextCount = Number(event?.detail?.count ?? 0)
      setComposerCount(Number.isFinite(nextCount) ? nextCount : 0)
    }
    window.addEventListener('pcc-composer-count', handleComposerCount)
    return () => window.removeEventListener('pcc-composer-count', handleComposerCount)
  }, [])

  useEffect(() => {
    const handlePlayerState = (event) => setMusicPlayer(event?.detail || null)
    window.addEventListener('pcc-player-state', handlePlayerState)
    return () => window.removeEventListener('pcc-player-state', handlePlayerState)
  }, [])

  useEffect(() => {
    const handleComposerPreview = (event) => {
      const nextLines = Array.isArray(event?.detail?.lines) ? event.detail.lines : []
      const nextRenderedText = typeof event?.detail?.renderedText === 'string' ? event.detail.renderedText : ''
      setComposerPreviewLines(nextLines)
      setComposerPreviewText(nextRenderedText)
    }
    window.addEventListener('pcc-composer-preview', handleComposerPreview)
    return () => window.removeEventListener('pcc-composer-preview', handleComposerPreview)
  }, [])

  useEffect(() => {
    const handleComposerNavigate = (event) => {
      const moduleId = event?.detail?.moduleId
      const submoduleId = event?.detail?.submoduleId
      if (!moduleId || !submoduleId) {
        return
      }
      const targetModule = moduleRegistry.find((item) => item.id === moduleId)
      if (!targetModule) {
        return
      }
      const targetSubmodule = targetModule.submodules.find((item) => item.id === submoduleId)
      if (!targetSubmodule) {
        return
      }
      setActiveModuleId(moduleId)
      setActiveSubmoduleId(submoduleId)
      setModuleOpenMap((current) => ({ ...current, [moduleId]: true }))
    }
    window.addEventListener('pcc-navigate-submodule', handleComposerNavigate)
    return () => window.removeEventListener('pcc-navigate-submodule', handleComposerNavigate)
  }, [])

  useEffect(() => {
    return () => {
      if (previewHideTimerRef.current) {
        clearTimeout(previewHideTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!previewNotice) {
      return undefined
    }
    const timer = setTimeout(() => setPreviewNotice(''), 1400)
    return () => clearTimeout(timer)
  }, [previewNotice])

  const handleComposerPreviewEnter = () => {
    if (previewHideTimerRef.current) {
      clearTimeout(previewHideTimerRef.current)
      previewHideTimerRef.current = null
    }
    setShowComposerPreview(true)
  }

  const handleComposerPreviewLeave = () => {
    if (previewHideTimerRef.current) {
      clearTimeout(previewHideTimerRef.current)
    }
    previewHideTimerRef.current = setTimeout(() => {
      setShowComposerPreview(false)
      previewHideTimerRef.current = null
    }, 140)
  }

  return (
    <main className="pcc-workspace min-h-screen bg-[#090910] text-slate-100">
      <div className="flex min-h-screen">
        <aside
          className={`border-r border-[#b990f5]/20 bg-[#0f1022] transition-all duration-300 ${
            isSidebarOpen ? 'w-[296px]' : 'w-[78px]'
          }`}
        >
          <div className="border-b border-[#b990f5]/20 px-3 py-4">
            {isSidebarOpen ? (
              <div className="flex items-center justify-between gap-2 rounded-xl border border-[#b990f5]/20 bg-[#15172e] px-3 py-2.5">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#6f2ad4] to-[#4b1d91] text-sm font-extrabold">
                    PCC
                  </div>
                  <div className="min-w-0 leading-tight">
                    <p className="text-[17px] font-bold text-white">
                      <span className="block">Premier Customer</span>
                      <span className="block">Care</span>
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.08em] text-[#caa5ff]/90">
                      Jose Miguel Santiago
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#b990f5]/25 bg-[#1b1d39]/70 text-[#f5edff] hover:bg-[#26294a]"
                  title="Collapse sidebar"
                >
                  <SidebarToggleIcon open />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#6f2ad4] to-[#4b1d91] text-sm font-extrabold">
                  PCC
                </div>
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#b990f5]/30 bg-[#1b1d39] text-[#f5edff] hover:bg-[#26294a]"
                  title="Expand sidebar"
                >
                  <SidebarToggleIcon open={false} />
                </button>
              </div>
            )}
          </div>

          <nav className="px-3 py-4">
            {isSidebarOpen ? (
              <div className="space-y-2 rounded-xl border border-[#b990f5]/20 bg-[#13152a] p-2">
                {moduleRegistry.map((moduleItem) => {
                  const isModuleOpen = !!moduleOpenMap[moduleItem.id]
                  const isModuleActive = activeModule.id === moduleItem.id

                  return (
                    <div key={moduleItem.id} className="space-y-1">
                      <button
                        onClick={() => {
                          setActiveModuleId(moduleItem.id)
                          setModuleOpenMap((current) => ({
                            ...current,
                            [moduleItem.id]: !current[moduleItem.id],
                          }))
                        }}
                        className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-left text-sm font-semibold transition ${
                          isModuleActive
                            ? 'border-[#b990f5]/45 bg-[#232547] text-white'
                            : 'border-[#b990f5]/25 bg-[#1b1d39] hover:bg-[#26294a]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-[#b990f5]" />
                          <span>{moduleItem.label}</span>
                        </span>
                        <span className="text-[#caa5ff]/90">
                          {isModuleOpen ? (
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                            </svg>
                          ) : (
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
                            </svg>
                          )}
                        </span>
                      </button>

                      {isModuleOpen ? (
                        <div className="space-y-1 border-l border-[#b990f5]/30 pl-2">
                          {moduleItem.submodules.map((submodule) => {
                            const isActive = activeSubmodule.id === submodule.id
                            return (
                              <button
                                key={submodule.id}
                                onClick={() => {
                                  setActiveModuleId(moduleItem.id)
                                  setActiveSubmoduleId(submodule.id)
                                }}
                                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                                  isActive
                                    ? 'bg-[#6f2ad4] text-[#ffffff] shadow-[inset_0_0_0_1px_rgba(202,165,255,0.65)]'
                                    : 'text-[#ede1fb] hover:bg-[#26294a]'
                                }`}
                              >
                                <span className="flex items-center gap-2">
                                  <span className="h-1.5 w-1.5 rounded-full bg-[#b990f5]" />
                                  <span>{submodule.label}</span>
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsSidebarOpen(true)
                  setModuleOpenMap((current) => ({ ...current, [activeModule.id]: true }))
                }}
                className="mx-auto mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-[#6f2ad4] to-[#4b1d91]"
                title="Open Modules"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" />
                  <rect x="14" y="14" width="7" height="7" rx="1.5" />
                </svg>
              </button>
            )}
          </nav>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-[#b990f5]/20 bg-[#111328]/90 px-4 py-3 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-slate-200">Premier Customer Care</span>
                <span className="rounded-full border border-[#b990f5]/25 bg-[#1b1d39] px-2 py-0.5 text-xs text-[#e7d8f8]">
                  {activeModule.label}
                </span>
                <span className="rounded-full border border-[#b990f5]/25 bg-[#1f2142] px-2 py-0.5 text-xs text-[#f2eafb]">
                  {activeSubmodule.label}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <WorkspaceMusicControls player={musicPlayer} onOpenMusic={onOpenMusic} />
                <div
                  className="relative"
                  onMouseEnter={handleComposerPreviewEnter}
                  onMouseLeave={handleComposerPreviewLeave}
                >
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('pcc-open-composer'))}
                    className="rounded-xl border border-[#b990f5]/25 bg-[#1b1d39] px-3 py-1.5 text-sm hover:bg-[#26294a]"
                  >
                    Composer{composerCount > 0 ? ` (${composerCount})` : ''}
                  </button>
                  {showComposerPreview ? (
                    <div
                      className="absolute right-0 top-11 z-50 w-80 rounded-xl border border-[#b990f5]/30 bg-[#171830] p-3 text-xs shadow-2xl"
                      onMouseEnter={handleComposerPreviewEnter}
                      onMouseLeave={handleComposerPreviewLeave}
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#caa5ff]">Composer Preview</p>
                      <div className="mt-2 flex justify-end gap-2">
                        <button
                          onClick={handleCopyComposerPreview}
                          className="rounded-md border border-[#b990f5]/25 bg-[#6f2ad4]/30 px-2 py-1 text-[10px] font-semibold text-[#f2eafb] hover:bg-[#6f2ad4]/45"
                        >
                          Copy
                        </button>
                        <button
                          onClick={() => {
                            window.dispatchEvent(new CustomEvent('pcc-clear-composer'))
                            setComposerPreviewLines([])
                            setComposerPreviewText('')
                            setComposerCount(0)
                            setPreviewNotice('Composer cleared.')
                          }}
                          className="rounded-md border border-[#b990f5]/25 bg-[#1d1f3d] px-2 py-1 text-[10px] font-semibold text-[#f2eafb] hover:bg-[#2a2d50]"
                        >
                          Clear
                        </button>
                      </div>
                      {previewNotice ? <p className="mt-2 text-[11px] text-[#caa5ff]">{previewNotice}</p> : null}
                      {composerPreviewLines.length > 0 ? (
                        <div className="mt-2 max-h-56 overflow-auto overscroll-contain rounded border border-[#b990f5]/20 bg-[#1d1f3d] px-3 py-2 text-[#f2eafb] whitespace-pre-wrap leading-relaxed">
                          {composerPreviewText || composerPreviewLines.join('\n\n')}
                        </div>
                      ) : (
                        <p className="mt-2 text-[#d4c2ea]">No lines in composer.</p>
                      )}
                    </div>
                  ) : null}
                </div>
                <div className="rounded-2xl border border-[#b990f5]/25 bg-[#1b1d39] px-3 py-1.5 text-sm">
                  {user.name}
                </div>
                <button
                  onClick={onLogout}
                  className="rounded-xl border border-[#b990f5]/25 bg-[#1b1d39] px-3 py-1.5 text-sm hover:bg-[#26294a]"
                >
                  Logout
                </button>
              </div>
            </div>
          </header>

          <div className="flex-1 space-y-5 p-4 sm:p-6">
            <section className="space-y-4">
              <activeSubmodule.Component />
            </section>
          </div>
        </section>
      </div>
    </main>
  )
}

export default DashboardPage

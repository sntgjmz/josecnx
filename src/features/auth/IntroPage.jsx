import { useEffect, useState } from 'react'

function IntroPage({ onContinue }) {
  const [showButton, setShowButton] = useState(false)
  const [wipeActive, setWipeActive] = useState(true)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const wipeTimer = setTimeout(() => setWipeActive(false), 1200)
    const buttonTimer = setTimeout(() => setShowButton(true), 1750)
    return () => {
      clearTimeout(wipeTimer)
      clearTimeout(buttonTimer)
    }
  }, [])

  const handleMouseMove = (event) => {
    const { innerWidth, innerHeight } = window
    const x = ((event.clientX / innerWidth) * 2 - 1) * 14
    const y = ((event.clientY / innerHeight) * 2 - 1) * 10
    setParallax({ x, y })
  }

  return (
    <main
      onMouseMove={handleMouseMove}
      className="relative flex h-[100dvh] items-center justify-center overflow-hidden px-4 text-slate-100"
    >
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#7a3fd4]/30 blur-3xl intro-orb-slow"
        style={{ transform: `translate3d(${parallax.x * 0.9}px, ${parallax.y * 0.7}px, 0)` }}
      />
      <div
        className="pointer-events-none absolute -bottom-28 -right-24 h-[28rem] w-[28rem] rounded-full bg-[#5d21b6]/20 blur-3xl intro-orb-fast"
        style={{ transform: `translate3d(${-parallax.x * 0.65}px, ${-parallax.y * 0.55}px, 0)` }}
      />
      <div className="pointer-events-none absolute inset-0">
        <div className="intro-line absolute top-[18%] h-px w-1/2 bg-gradient-to-r from-transparent via-[#b990f5]/40 to-transparent" />
        <div className="intro-line absolute top-[68%] h-px w-2/3 bg-gradient-to-r from-transparent via-[#9c64f3]/30 to-transparent [animation-delay:2.2s]" />
      </div>
      {wipeActive ? (
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
          <div className="intro-cinematic-wipe h-full w-1/2 bg-gradient-to-r from-transparent via-[#d3b7ff]/30 to-transparent blur-xl" />
        </div>
      ) : null}

      <section
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-[#b990f5]/25 bg-[#0f1022]/90 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12"
        style={{ transform: `translate3d(${parallax.x * 0.28}px, ${parallax.y * 0.24}px, 0)` }}
      >
        <div className="relative intro-fade-up mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7a3fd4] to-[#4b1d91] text-xl font-extrabold shadow-[0_0_35px_rgba(111,42,212,0.5)] intro-logo-pulse">
          <span className="absolute inset-0 -z-10 rounded-2xl border border-[#caa5ff]/45 intro-logo-ring" />
          <span className="absolute inset-0 -z-10 rounded-2xl border border-[#caa5ff]/25 intro-logo-ring [animation-delay:1.4s]" />
          PCC
        </div>
        <p className="intro-fade-up intro-fade-up-delay-1 mt-6 text-xs uppercase tracking-[0.34em] text-[#caa5ff]/90">
          Premier Customer Care
        </p>
        <h1 className="intro-fade-up intro-fade-up-delay-2 mt-3 text-3xl font-bold text-white sm:text-5xl">
          Email Workflow Portal
        </h1>
        <p className="intro-fade-up intro-fade-up-delay-3 mx-auto mt-4 max-w-xl text-sm text-[#ddd0ef] sm:text-base">
          Professional response library and fast compose tools for high-speed customer support.
        </p>

        <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-[#b990f5]/35 to-transparent" />

        <div className="mt-8">
          {showButton ? (
            <button
              onClick={onContinue}
              className="rounded-xl border border-[#9c64f3]/45 bg-gradient-to-r from-[#6f2ad4]/75 to-[#7a3fd4]/70 px-8 py-3 text-sm font-semibold tracking-[0.08em] text-[#f5edff] transition hover:from-[#6f2ad4]/90 hover:to-[#7a3fd4]/85"
            >
              Continue
            </button>
          ) : (
            <div className="mx-auto h-11 w-40 animate-pulse rounded-xl border border-[#b990f5]/20 bg-[#1a1c36]" />
          )}
        </div>
      </section>
    </main>
  )
}

export default IntroPage

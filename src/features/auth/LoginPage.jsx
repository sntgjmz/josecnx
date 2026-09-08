import { useEffect, useRef, useState } from 'react'

const musicTracks = [
  { src: '/maki-k-m.mp3', title: 'Maki K. M.' },
  { src: '/multo.mp3', title: 'Multo' },
]

function LoginPage() {
  const audioRef = useRef(null)
  const shouldResumeRef = useRef(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) return

    audio.load()
    setCurrentTime(0)
    setDuration(0)
    if (shouldResumeRef.current) audio.play().catch(() => setIsPlaying(false))
  }, [currentTrack])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) audio.play().catch(() => setIsPlaying(false))
    else audio.pause()
  }, [isPlaying])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  const toggleMusic = () => {
    setIsPlaying((playing) => {
      shouldResumeRef.current = !playing
      return !playing
    })
  }

  const playNextTrack = () => {
    setCurrentTrack((track) => (track + 1) % musicTracks.length)
  }

  const playPreviousTrack = () => {
    setCurrentTrack((track) => (track - 1 + musicTracks.length) % musicTracks.length)
  }

  const seekTo = (event) => {
    const time = Number(event.target.value)
    if (audioRef.current) audioRef.current.currentTime = time
    setCurrentTime(time)
  }

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return '0:00'
    return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`
  }

  return (
    <main className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-4 py-8 text-slate-100 sm:px-6">
      <audio
        ref={audioRef}
        src={musicTracks[currentTrack].src}
        preload="metadata"
        onEnded={playNextTrack}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
      />
      <div className="pointer-events-none absolute -left-28 -top-28 h-96 w-96 rounded-full bg-[#7a3fd4]/25 blur-3xl float-slow" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-[26rem] w-[26rem] rounded-full bg-[#5d21b6]/20 blur-3xl float-fast" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(191,151,255,0.12),transparent_45%)]" />

      <section className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-[#b990f5]/25 bg-[#0f1022]/90 p-7 text-center shadow-2xl backdrop-blur-xl sm:p-10">
        <button
          type="button"
          onClick={toggleMusic}
          className="hidden"
          aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        >
          <span aria-hidden="true">{isPlaying ? '❚❚' : '♫'}</span>
          {isPlaying ? 'Pause music' : 'Play music'}
        </button>

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7a3fd4] to-[#4b1d91] text-lg font-extrabold shadow-[0_0_32px_rgba(111,42,212,0.45)]">
          PCC
        </div>

        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.32em] text-[#caa5ff]/90">Premier Customer Care</p>
        <h1 className="font-display mt-3 text-3xl leading-tight text-white sm:text-4xl">Revision in progress</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#ddd0ef] sm:text-base">
          We are currently revising the spiel workspace to improve the experience and make it more reliable.
        </p>

        <section className="mt-7 overflow-hidden rounded-2xl border border-white/10 bg-[#17172b]/90 text-left shadow-[0_18px_40px_rgba(0,0,0,0.25)]" aria-label="Music player">
          <div className="flex items-center gap-4 p-4 sm:p-5">
            <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${currentTrack === 0 ? 'from-fuchsia-500 to-violet-700' : 'from-sky-500 to-indigo-700'} text-2xl shadow-lg`} aria-hidden="true">MUSIC</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-bold text-white">{musicTracks[currentTrack].title}</p>
              <p className="mt-0.5 text-sm text-slate-400">PCC playlist</p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#62e6a9]">PCC listening room</p>
            </div>
            <button type="button" onClick={toggleMusic} className="flex h-11 min-w-11 shrink-0 items-center justify-center rounded-full bg-[#62e6a9] px-3 text-xs font-black text-[#101c19] transition hover:scale-105 hover:bg-[#86f4bd] focus:outline-none focus:ring-2 focus:ring-[#86f4bd] focus:ring-offset-2 focus:ring-offset-[#17172b]" aria-label={isPlaying ? 'Pause music' : 'Play music'}>
              {isPlaying ? 'PAUSE' : 'PLAY'}
            </button>
          </div>

          <div className="px-4 pb-4 sm:px-5 sm:pb-5">
            <input className="h-1 w-full cursor-pointer accent-[#62e6a9]" type="range" min="0" max={duration || 0} step="0.1" value={Math.min(currentTime, duration || 0)} onChange={seekTo} aria-label="Song progress" />
            <div className="mt-1 flex justify-between text-[11px] tabular-nums text-slate-500"><span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span></div>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
              <button type="button" onClick={playPreviousTrack} className="text-xs font-bold text-slate-300 transition hover:text-white">PREV</button>
              <button type="button" onClick={toggleMusic} className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-bold text-white transition hover:border-[#62e6a9] hover:text-[#62e6a9]">{isPlaying ? 'PAUSE' : 'PLAY'}</button>
              <button type="button" onClick={playNextTrack} className="text-xs font-bold text-slate-300 transition hover:text-white">NEXT</button>
              <label className="flex items-center gap-2 text-xs text-slate-400">VOL
                <input className="h-1 w-16 cursor-pointer accent-[#62e6a9]" type="range" min="0" max="1" step="0.05" value={volume} onChange={(event) => setVolume(Number(event.target.value))} aria-label="Music volume" />
              </label>
            </div>
          </div>

          <div className="border-t border-white/10 px-4 py-3 sm:px-5">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Up next</p>
            <div className="flex gap-2">
              {musicTracks.map((track, index) => (
                <button key={track.src} type="button" onClick={() => setCurrentTrack(index)} className={`min-w-0 flex-1 rounded-lg px-3 py-2 text-left text-xs transition ${index === currentTrack ? 'bg-white/10 text-[#86f4bd]' : 'bg-[#10101d] text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                  <span className="block truncate font-semibold">{track.title}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-8 rounded-2xl border border-amber-300/30 bg-amber-400/10 p-5 text-left text-amber-50">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-200/50 bg-amber-200/10 text-base font-bold">
              !
            </span>
            <p className="font-semibold text-amber-100">Login is temporarily unavailable</p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-amber-100/85">
            You will not be able to sign in at this time, even with the correct username and password.
          </p>
        </div>

        <div className="mt-5 rounded-xl border border-[#b990f5]/20 bg-[#15172e]/80 px-5 py-4 text-left">
          <p className="text-sm font-semibold text-white">What to use for now</p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
            Please continue using the original spiel for all customer responses until the updated workspace is ready.
          </p>
        </div>

        <p className="mt-7 text-xs text-[#cdb2f4]">Thank you for your patience while we complete this revision.</p>
      </section>
    </main>
  )
}

export default LoginPage

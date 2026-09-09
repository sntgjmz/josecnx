function SoundwaveMark() {
  return (
    <div className="flex h-11 items-center justify-center gap-1" aria-hidden="true">
      {[18, 31, 43, 27, 49, 35, 22].map((height, index) => (
        <span
          key={height}
          className="soundroom-bar w-1.5 rounded-full bg-[#62e6a9]"
          style={{ height: `${height}px`, animationDelay: `${index * 0.11}s` }}
        />
      ))}
    </div>
  )
}

import { useState } from 'react'

function LoginPage({ onLogin, error, isAuthenticating, onOpenMusic }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    await onLogin(username.trim(), password)
  }

  return (
    <main className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#070908] px-4 py-8 text-slate-100 sm:px-6">
      <div className="pointer-events-none absolute -left-36 top-[-8rem] h-[30rem] w-[30rem] rounded-full bg-[#35d88a]/20 blur-3xl float-slow" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-[32rem] w-[32rem] rounded-full bg-[#7854e9]/25 blur-3xl float-fast" />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:42px_42px]" />

      <section className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#101312]/85 shadow-[0_32px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative flex min-h-[500px] flex-col justify-between overflow-hidden bg-[linear-gradient(145deg,#1d5541_0%,#133329_42%,#101312_100%)] p-7 sm:p-10">
          <div className="pointer-events-none absolute -right-20 top-14 h-72 w-72 rounded-full border-[35px] border-[#62e6a9]/15" />
          <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full border-[45px] border-white/5" />
          <div className="relative flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#62e6a9] text-[#07130e] shadow-[0_0_30px_rgba(98,230,169,0.38)]">
              <SoundwaveMark />
            </span>
            <div>
              <p className="font-display text-lg leading-none tracking-tight text-white">PCC Soundroom</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#a6f6cb]">Premier Customer Care</p>
            </div>
          </div>

          <div className="relative mt-14 max-w-md">
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#9cf3c2]">Your personal listening space</p>
            <h1 className="mt-4 text-4xl font-black leading-[0.98] tracking-tight text-white sm:text-6xl">
              Press play.<br />
              Stay in flow.
            </h1>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#d2e9dd] sm:text-base">
              A focused music space for your workday—your songs, your playlists, and controls that keep everything moving.
            </p>
            <button
              type="button"
              onClick={onOpenMusic}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#62e6a9] px-6 py-3.5 text-sm font-black text-[#07130e] shadow-[0_10px_30px_rgba(98,230,169,0.3)] transition hover:scale-[1.03] hover:bg-[#96f9c4] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#133329]"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#07130e] text-[9px] text-[#62e6a9]">▶</span>
              Open PCC Soundroom
            </button>
          </div>

          <div className="relative mt-10 flex items-center gap-4 text-xs font-semibold text-[#b9d9c8]">
            <SoundwaveMark />
            <span>Local playlists · Queue controls · Liked songs</span>
          </div>
        </div>

        <div className="flex flex-col justify-center p-7 sm:p-10">
          <div className="mx-auto w-full max-w-sm">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#62e6a9]">PCC Workspace</p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">Sign in to your spiel.</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#aebbb4]">Access the PCC email response workspace and composer tools.</p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4" noValidate>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#cfe6d8]">Username</span>
                <input
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                  disabled={isAuthenticating}
                  className="mt-2 w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#739080] focus:border-[#62e6a9] focus:ring-2 focus:ring-[#62e6a9]/20 disabled:cursor-not-allowed disabled:opacity-60"
                  placeholder="Enter your username"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#cfe6d8]">Password</span>
                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  disabled={isAuthenticating}
                  className="mt-2 w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#739080] focus:border-[#62e6a9] focus:ring-2 focus:ring-[#62e6a9]/20 disabled:cursor-not-allowed disabled:opacity-60"
                  placeholder="Enter your password"
                />
              </label>
              {error ? <p role="alert" className="rounded-lg border border-red-300/25 bg-red-400/10 px-3 py-2.5 text-sm text-red-100">{error}</p> : null}
              <button
                type="submit"
                disabled={isAuthenticating || !username.trim() || !password}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-black text-[#0b1711] transition hover:scale-[1.01] hover:bg-[#dfffea] focus:outline-none focus:ring-2 focus:ring-[#62e6a9] disabled:cursor-not-allowed disabled:opacity-55"
              >
                {isAuthenticating ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-[#1b5b3b] border-t-transparent" /> Signing in…</> : 'Enter PCC Workspace'}
              </button>
            </form>

            <div className="mt-7 border-t border-white/10 pt-5">
              <p className="text-xs leading-relaxed text-[#9fbcaa]">Need access? Contact the PCC workspace administrator to receive your login credentials.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default LoginPage

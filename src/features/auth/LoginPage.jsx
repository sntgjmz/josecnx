import { useState } from 'react'

function LoginPage({ onLogin, error, isAuthenticating, onOpenMusic }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onLogin(username.trim(), password)
  }

  return (
    <main className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-4 py-8 text-slate-100 sm:px-6">
      <div className="pointer-events-none absolute -left-28 -top-28 h-96 w-96 rounded-full bg-[#c5b3d3]/30 blur-3xl float-slow" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-[26rem] w-[26rem] rounded-full bg-[#f5cbcb]/25 blur-3xl float-fast" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,226,226,0.14),transparent_45%)]" />

      <section className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-[#ffe2e2]/25 bg-[#2b2537]/90 p-7 text-center shadow-2xl backdrop-blur-xl sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f5cbcb] to-[#c5b3d3] text-lg font-extrabold text-[#2b2537] shadow-[0_0_32px_rgba(245,203,203,0.35)]">PCC</div>
        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.32em] text-[#f5cbcb]">Premier Customer Care</p>
        <h1 className="font-display mt-3 text-3xl leading-tight text-white sm:text-4xl">Find your focus.</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#ffe2e2] sm:text-base">Jose Spotify is your personal music space for the workday.</p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-[#ffe2e2]/45 bg-[linear-gradient(135deg,rgba(197,179,211,0.5),rgba(63,52,73,0.96))] p-5 text-left shadow-[0_15px_40px_rgba(0,0,0,0.2)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#f5cbcb]">Jose Spotify</p>
          <p className="mt-2 text-base font-semibold text-white">Your soundtrack for focus, calm, and momentum.</p>
          <p className="mt-1 text-sm text-[#ffe2e2]">Browse artists and albums, keep your music playing, and return to work when you are ready.</p>
          <button type="button" onClick={onOpenMusic} className="mt-5 w-full rounded-xl bg-[#f5cbcb] px-5 py-3.5 text-sm font-extrabold text-[#2b2537] shadow-[0_8px_24px_rgba(245,203,203,0.25)] transition hover:scale-[1.01] hover:bg-[#ffe2e2]">Open Jose Spotify</button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 border-t border-[#ffe2e2]/20 pt-5 text-left">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c5b3d3]">Workspace sign in</p>
          <div className="mt-3 space-y-3">
            <label className="block text-sm font-semibold text-[#ffe2e2]" htmlFor="username">Username<input id="username" value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" required className="mt-1.5 w-full rounded-xl border border-[#ffe2e2]/20 bg-[#372e42] px-4 py-2.5 text-white outline-none transition focus:border-[#f5cbcb]" /></label>
            <label className="block text-sm font-semibold text-[#ffe2e2]" htmlFor="password">Password<input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required className="mt-1.5 w-full rounded-xl border border-[#ffe2e2]/20 bg-[#372e42] px-4 py-2.5 text-white outline-none transition focus:border-[#f5cbcb]" /></label>
          </div>
          {error ? <p className="mt-3 rounded-lg border border-red-300/30 bg-red-400/10 px-3 py-2 text-sm text-red-100">{error}</p> : null}
          <button type="submit" disabled={isAuthenticating} className="mt-4 w-full rounded-xl border border-[#ffe2e2]/35 bg-[#4a3e56] px-5 py-3 text-sm font-bold text-[#fbefef] transition hover:bg-[#5a495f] disabled:cursor-wait disabled:opacity-60">{isAuthenticating ? 'Signing in...' : 'Sign in to workspace'}</button>
        </form>
      </section>
    </main>
  )
}

export default LoginPage

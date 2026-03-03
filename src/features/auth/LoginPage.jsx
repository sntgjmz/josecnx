import { useState } from 'react'

function LoginPage({ onLogin, error, isAuthenticating = false }) {
  const [username, setUsername] = useState('Jose')
  const [password, setPassword] = useState('')
  const [variant, setVariant] = useState('premium')
  const [showPassword, setShowPassword] = useState(false)
  const [capsLockOn, setCapsLockOn] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    try {
      await onLogin(username.trim(), password)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePasswordKeyEvent = (event) => {
    const isCapsLock = typeof event.getModifierState === 'function' && event.getModifierState('CapsLock')
    setCapsLockOn(Boolean(isCapsLock))
  }

  const EyeIcon = ({ open }) =>
    open ? (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ) : (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.58 10.58A2 2 0 0012 14a2 2 0 001.42-.58" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.9 5.26A10.94 10.94 0 0112 5c6.5 0 10 7 10 7a13.17 13.17 0 01-4.23 4.86" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.1 6.1C3.93 7.35 2.5 9.5 2 12c0 0 3.5 7 10 7 1.76 0 3.3-.43 4.62-1.08" />
      </svg>
    )

  if (variant === 'minimal') {
    return (
      <main className="relative flex h-[100dvh] items-center justify-center overflow-hidden px-4 text-slate-100 sm:px-6">
        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#7a3fd4]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#5d21b6]/15 blur-3xl" />

        <section className="w-full max-w-md rounded-2xl border border-[#b990f5]/25 bg-[#101123]/92 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <h1 className="font-display text-2xl text-white">Sign In</h1>
            <button
              onClick={() => setVariant('premium')}
              className="rounded-md border border-[#b990f5]/25 bg-[#1d1f3d] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#e9ddf8] hover:bg-[#2a2d50]"
            >
              Premium View
            </button>
          </div>
          <p className="mt-2 text-sm text-slate-300">Access Premier Customer Care.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="username" className="text-sm text-slate-200">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#b990f5]/30 bg-[#181932] px-3.5 py-2.5 text-white outline-none ring-[#b990f5]/55 placeholder:text-[#c4b0e6] focus:ring-2"
                placeholder="Your username"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm text-slate-200">
                Password
              </label>
              <div className="relative mt-1.5">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  onKeyUp={handlePasswordKeyEvent}
                  onKeyDown={handlePasswordKeyEvent}
                  className="w-full rounded-xl border border-[#b990f5]/30 bg-[#181932] px-3.5 py-2.5 pr-11 text-white outline-none ring-[#b990f5]/55 placeholder:text-[#c4b0e6] focus:ring-2"
                  placeholder="••••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md border border-[#b990f5]/25 bg-[#1d1f3d] text-[#e9ddf8] hover:bg-[#2a2d50]"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
              {capsLockOn ? <p className="mt-2 text-[11px] font-semibold text-amber-300">Caps Lock is ON</p> : null}
              <p className="mt-2 text-[11px] text-[#cdb2f4]">Hint for password: Who is the other half of Jose? Here in production?</p>
            </div>
            {error ? (
              <p className="rounded-lg border border-red-400/35 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>
            ) : null}
            <button
              type="submit"
              disabled={isSubmitting || isAuthenticating}
              className="w-full rounded-xl border border-[#9c64f3]/45 bg-[#6f2ad4]/60 px-4 py-2.5 font-semibold tracking-wide text-[#f5edff] transition hover:bg-[#6f2ad4]/75"
            >
              {isSubmitting || isAuthenticating ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </section>
        {isAuthenticating ? (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#090910]/75 backdrop-blur-sm">
            <div className="rounded-2xl border border-[#b990f5]/35 bg-[#13152a] px-6 py-5 text-center shadow-2xl">
              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-[#b990f5]/40 border-t-[#caa5ff]" />
              <p className="mt-3 text-sm font-semibold text-[#f2eafb]">Preparing your workspace...</p>
            </div>
          </div>
        ) : null}
      </main>
    )
  }

  return (
    <main className="relative flex h-[100dvh] items-center justify-center overflow-hidden px-4 text-slate-100 sm:px-6">
      <div className="pointer-events-none absolute -left-28 -top-28 h-96 w-96 rounded-full bg-[#7a3fd4]/25 blur-3xl float-slow" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-[26rem] w-[26rem] rounded-full bg-[#5d21b6]/20 blur-3xl float-fast" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(191,151,255,0.12),transparent_45%)]" />

      <section className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-[#b990f5]/25 bg-[#0f1022]/90 shadow-2xl backdrop-blur-xl">
        <div className="grid md:grid-cols-[1.05fr_1fr]">
          <div className="relative hidden border-r border-[#b990f5]/20 bg-[linear-gradient(150deg,rgba(111,42,212,0.28),rgba(15,16,34,0.96)_60%)] p-8 md:block lg:p-10">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#7a3fd4] to-[#4b1d91] text-lg font-extrabold shadow-[0_0_32px_rgba(111,42,212,0.45)]">
              PCC
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.32em] text-[#d9c2f7]/90">Secure Workspace</p>
            <h1 className="font-display mt-3 text-4xl leading-tight text-white">Premier Customer Care</h1>
            <p className="mt-4 max-w-sm text-sm text-[#ddd0ef]">
              Built for fast, consistent customer responses with your curated spiel library and copy workflow.
            </p>

            <div className="mt-8 space-y-3 text-sm">
              <div className="rounded-xl border border-[#b990f5]/20 bg-[#15172e]/80 px-4 py-3">
                Fast copy actions for every line
              </div>
              <div className="rounded-xl border border-[#b990f5]/20 bg-[#15172e]/80 px-4 py-3">
                Composer preview in top navigation
              </div>
              <div className="rounded-xl border border-[#b990f5]/20 bg-[#15172e]/80 px-4 py-3">
                Category filters for quick scanning
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex items-center justify-between gap-3">
              <p className="font-display text-xs uppercase tracking-[0.32em] text-[#caa5ff]/90">Sign In</p>
              <button
                onClick={() => setVariant('minimal')}
                className="rounded-md border border-[#b990f5]/25 bg-[#1d1f3d] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#e9ddf8] hover:bg-[#2a2d50]"
              >
                Minimal View
              </button>
            </div>
            <h2 className="font-display mt-3 text-3xl text-white sm:text-4xl">Welcome Back</h2>
            <p className="mt-3 text-sm text-slate-300">Enter your credentials to continue.</p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <div>
                <label htmlFor="username" className="text-sm text-slate-200">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#b990f5]/30 bg-[#181932] px-3.5 py-2.5 text-white outline-none ring-[#b990f5]/55 placeholder:text-[#c4b0e6] focus:ring-2"
                  placeholder="Your username"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm text-slate-200">
                  Password
                </label>
                <div className="relative mt-1.5">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    onKeyUp={handlePasswordKeyEvent}
                    onKeyDown={handlePasswordKeyEvent}
                    className="w-full rounded-xl border border-[#b990f5]/30 bg-[#181932] px-3.5 py-2.5 pr-11 text-white outline-none ring-[#b990f5]/55 placeholder:text-[#c4b0e6] focus:ring-2"
                    placeholder="••••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md border border-[#b990f5]/25 bg-[#1d1f3d] text-[#e9ddf8] hover:bg-[#2a2d50]"
                    title={showPassword ? 'Hide password' : 'Show password'}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
                {capsLockOn ? <p className="mt-2 text-[11px] font-semibold text-amber-300">Caps Lock is ON</p> : null}
                <p className="mt-2 text-[11px] text-[#cdb2f4]">Hint for password: Who is the other half of Jose? Here in production?</p>
              </div>
              {error ? (
                <p className="rounded-lg border border-red-400/35 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>
              ) : null}
              <button
                type="submit"
                disabled={isSubmitting || isAuthenticating}
                className="w-full rounded-xl border border-[#9c64f3]/45 bg-gradient-to-r from-[#6f2ad4]/70 to-[#7a3fd4]/60 px-4 py-2.5 font-semibold tracking-wide text-[#f5edff] transition hover:from-[#6f2ad4]/85 hover:to-[#7a3fd4]/75"
              >
                {isSubmitting || isAuthenticating ? 'Signing in...' : 'Sign in to Dashboard'}
              </button>
            </form>
          </div>
        </div>
      </section>
      {isAuthenticating ? (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#090910]/70 backdrop-blur-sm">
          <div className="rounded-2xl border border-[#b990f5]/35 bg-[#13152a] px-7 py-6 text-center shadow-2xl">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#b990f5]/40 border-t-[#caa5ff]" />
            <p className="mt-3 text-sm font-semibold text-[#f2eafb]">Preparing your workspace...</p>
          </div>
        </div>
      ) : null}
    </main>
  )
}

export default LoginPage

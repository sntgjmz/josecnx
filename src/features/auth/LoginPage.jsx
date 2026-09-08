function LoginPage() {
  return (
    <main className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-4 py-8 text-slate-100 sm:px-6">
      <div className="pointer-events-none absolute -left-28 -top-28 h-96 w-96 rounded-full bg-[#7a3fd4]/25 blur-3xl float-slow" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-[26rem] w-[26rem] rounded-full bg-[#5d21b6]/20 blur-3xl float-fast" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(191,151,255,0.12),transparent_45%)]" />

      <section className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-[#b990f5]/25 bg-[#0f1022]/90 p-7 text-center shadow-2xl backdrop-blur-xl sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7a3fd4] to-[#4b1d91] text-lg font-extrabold shadow-[0_0_32px_rgba(111,42,212,0.45)]">
          PCC
        </div>

        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.32em] text-[#caa5ff]/90">Premier Customer Care</p>
        <h1 className="font-display mt-3 text-3xl leading-tight text-white sm:text-4xl">Revision in progress</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#ddd0ef] sm:text-base">
          We are currently revising the spiel workspace to improve the experience and make it more reliable.
        </p>

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

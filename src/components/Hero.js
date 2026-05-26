export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-between px-6 pb-10 pt-24 lg:px-10"
      style={{ zIndex: 1 }}
    >
      {/* Top area */}
      <div>
        {/* Eyebrow label */}
        <p
          className="hero-animate mb-12 text-[10px] font-medium uppercase tracking-[0.3em] text-neutral-500 lg:mb-16"
          style={{ opacity: 0 }}
        >
          Sviluppatore &amp; Music Producer
        </p>

        {/* Metadata row */}
        <div
          className="hero-animate mb-8 flex items-center justify-between"
          style={{ opacity: 0 }}
        >
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-600">
              Index
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500">
              01 / Apertura
            </span>
          </div>
          <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-600 sm:block">
            Selected Work · 2020 — 2026
          </span>
        </div>

        {/* Name — massive editorial typography */}
        <h1
          className="hero-animate mb-10 text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.9] tracking-tighter text-white lg:mb-12"
          style={{ opacity: 0 }}
        >
          Alessio
          <br />
          Cavallaro
        </h1>

        {/* Intro paragraph */}
        <div
          className="hero-animate max-w-xl"
          style={{ opacity: 0 }}
        >
          <p className="text-base leading-[1.8] text-neutral-400 lg:text-lg">
            Costruisco soluzioni web per problemi reali e progetto strumenti
            digitali per l&apos;industria musicale.
            <span className="text-white">
              {" "}Il codice è il mio strumento, il suono la mia tela.
            </span>
          </p>
        </div>
      </div>

      {/* Bottom info bar */}
      <div
        className="hero-animate"
        style={{ opacity: 0 }}
      >
        <div className="divider mb-6" />
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div>
            <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-600">
              Studio
            </p>
            <p className="text-sm font-medium text-neutral-300">
              Ing. Informatica
            </p>
          </div>
          <div>
            <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-600">
              UniCT
            </p>
            <p className="text-sm font-medium text-neutral-300">
              Ateneo
            </p>
          </div>
          <div>
            <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-600">
              Catania
            </p>
            <p className="text-sm font-medium text-neutral-300">
              Sicilia, IT
            </p>
          </div>
          <div>
            <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-600">
              Aperto
            </p>
            <p className="text-sm font-medium text-neutral-300">
              a opportunità
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

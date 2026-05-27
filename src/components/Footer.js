export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contatti"
      className="relative px-6 py-32 lg:py-40"
      style={{ zIndex: 1 }}
    >
      <div className="mx-auto max-w-3xl">
        {/* Section label */}
        <div className="section-animate mb-16 flex items-center gap-4">
          <span className="section-number">04</span>
          <div className="divider flex-1" />
          <span className="section-number">Contatti</span>
        </div>

        <div className="section-animate text-center">
          <h2 className="mb-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Parliamone.
          </h2>
          <p className="mx-auto mb-12 max-w-md text-base leading-relaxed text-neutral-400">
            Hai un progetto in mente, una collaborazione o semplicemente vuoi
            fare due chiacchiere? Scrivimi.
          </p>

          {/* Contact links */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <a
              href="mailto:alessiocava2407@gmail.com"
              className="btn-secondary inline-flex items-center gap-3 rounded-full px-8 py-3.5 text-sm font-medium text-neutral-300"
            >
              <svg
                className="h-4 w-4 text-neutral-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              Email Personale
            </a>

            <a
              href="mailto:prod.ale21@gmail.com"
              className="btn-secondary inline-flex items-center gap-3 rounded-full px-8 py-3.5 text-sm font-medium text-neutral-300"
            >
              <svg
                className="h-4 w-4 text-violet-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
                />
              </svg>
              Email Produzioni
            </a>

            <a
              href="https://www.linkedin.com/in/alessio-cavallaro"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-3 rounded-full px-8 py-3.5 text-sm font-medium text-neutral-300"
            >
              <svg
                className="h-4 w-4 text-neutral-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-24">
          <div className="divider mb-8" />
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-neutral-600">
              © {currentYear} Alessio Cavallaro
            </p>
            <p className="text-xs text-neutral-700">
              Progettato e sviluppato con cura.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

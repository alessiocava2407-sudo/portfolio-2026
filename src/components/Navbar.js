export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-5 lg:px-10"
      style={{ zIndex: 50, height: "var(--nav-height)" }}
    >
      {/* Logo */}
      <a
        href="#top"
        className="text-sm font-medium tracking-wide text-white"
      >
        A. Cavallaro
      </a>

      {/* Center links — hidden on mobile */}
      <div className="hidden items-center gap-8 md:flex">
        <a
          href="#studio"
          className="link-hover text-xs font-medium uppercase tracking-[0.15em] text-neutral-300 transition-colors hover:text-white"
        >
          Studio
        </a>
        <a
          href="#lavori"
          className="link-hover text-xs font-medium uppercase tracking-[0.15em] text-neutral-300 transition-colors hover:text-white"
        >
          Lavori
        </a>
        <a
          href="#competenze"
          className="link-hover text-xs font-medium uppercase tracking-[0.15em] text-neutral-300 transition-colors hover:text-white"
        >
          Competenze
        </a>
      </div>

      {/* CTA */}
      <a
        href="#contatti"
        className="btn-secondary rounded-full px-5 py-2 text-xs font-medium text-neutral-300"
      >
        Contattami
      </a>
    </nav>
  );
}

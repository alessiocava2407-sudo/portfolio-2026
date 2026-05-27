"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";

export default function FooterSection() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.from("[data-ft]", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
    { scope: container }
  );

  return (
    <footer
      ref={container}
      id="contatti"
      className="relative z-10 px-6 md:px-12 lg:px-20 pt-32 pb-12 md:pt-44 md:pb-16"
    >
      <div className="max-w-5xl mx-auto">
        <div className="divider mb-20" />

        <div data-ft className="mb-6">
          <span className="label">Contatti</span>
        </div>

        <h2
          data-ft
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-white leading-tight mb-6"
        >
          Costruiamo qualcosa
          <br />
          insieme.
        </h2>

        <p
          data-ft
          className="text-neutral-400 text-base mb-14 max-w-md leading-relaxed"
        >
          Hai un&apos;idea, un progetto, o semplicemente vuoi fare due
          chiacchiere? Scrivimi.
        </p>

        <div data-ft className="flex flex-wrap gap-4 mb-24 md:mb-32">
          <a href="mailto:alessiocava2407@gmail.com" className="footer-link">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/alessio-cavallaro"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </div>

        {/* Bottom */}
        <div data-ft className="flex flex-col sm:flex-row justify-between gap-4 text-xs text-neutral-600">
          <span>&copy; {new Date().getFullYear()} Alessio Cavallaro</span>
          <span className="text-neutral-700">Catania, Italia</span>
        </div>
      </div>
    </footer>
  );
}
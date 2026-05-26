"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapConfig";

export default function HeroSection() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.set("[data-anim]", { opacity: 0, y: 50 });

      gsap.to("[data-anim]", {
        opacity: 1,
        y: 0,
        duration: 1.3,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.2,
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="hero"
      className="relative z-10 flex items-center justify-center min-h-screen px-6 md:px-12 lg:px-20 py-32"
    >
      <div className="w-full max-w-5xl">
        {/* Label */}
        <div data-anim className="mb-10">
          <span className="label">Portfolio</span>
        </div>

        {/* Name */}
        <h1
          data-anim
          className="font-display text-[clamp(3rem,8vw,7.5rem)] font-extrabold tracking-[-0.035em] leading-[0.9] mb-8"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-blue-400 to-indigo-400">
            Alessio
          </span>
          <br />
          <span className="text-white">Cavallaro</span>
        </h1>

        {/* Subtitle */}
        <h2
          data-anim
          className="text-lg md:text-xl font-normal text-neutral-400 max-w-2xl mb-8 leading-relaxed"
        >
          Sviluppatore Autodidatta &amp; Studente di Ingegneria Informatica
          <span className="inline-block mx-2 text-neutral-600">|</span>
          Music Producer &amp; Polistrumentista
        </h2>

        {/* Intro */}
        <p
          data-anim
          className="text-base text-neutral-500 max-w-xl mb-14 leading-[1.8]"
        >
          Costruisco soluzioni web per problemi reali e progetto strumenti
          digitali per l&apos;industria musicale. Il codice è il mio strumento,
          il suono la mia tela.
        </p>

        {/* CTAs */}
        <div data-anim className="flex flex-wrap gap-4">
          <a href="#progetti" className="btn-primary">
            <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            Esplora i Progetti
          </a>
          <a href="#contatti" className="btn-ghost">
            Contattami
          </a>
        </div>
      </div>
    </section>
  );
}
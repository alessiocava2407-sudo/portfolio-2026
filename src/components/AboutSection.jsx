"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";

export default function AboutSection() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.from("[data-about]", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          end: "top 25%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="chi-sono"
      className="relative z-10 px-6 md:px-12 lg:px-20 py-32 md:py-44"
    >
      <div className="max-w-5xl mx-auto">
        <div data-about className="mb-10">
          <span className="label">Chi Sono</span>
        </div>

        <h2
          data-about
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-white leading-tight mb-12"
        >
          Dove il codice
          <br className="hidden md:block" />
          incontra il suono.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <p data-about className="text-base text-neutral-300 leading-[1.85]">
            Studio{" "}
            <span className="text-neutral-200">Ingegneria Informatica</span>{" "}
            all&apos;Università di Catania, ma non ho aspettato un&apos;aula per
            iniziare a costruire. Da autodidatta ho abbracciato il{" "}
            <span className="text-neutral-200">learning by doing</span>:
            ogni concetto diventa un progetto, ogni problema un pretesto per
            sperimentare, sbagliare e iterare.
          </p>

          <p data-about className="text-base text-neutral-300 leading-[1.85]">
            Il mio percorso intreccia{" "}
            <span className="text-neutral-200">
              sviluppo web e software
            </span>{" "}
            con la{" "}
            <span className="text-neutral-200">
              produzione musicale e il sound design
            </span>
            . Suono più strumenti, produco in FL Studio e Ableton, e modifico
            hardware per ottenere suoni che le macchine non prevedevano. Per me
            ingegneria e musica sono lo stesso linguaggio creativo.
          </p>
        </div>
      </div>
    </section>
  );
}
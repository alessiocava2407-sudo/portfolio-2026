"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";

const PROJECTS = [
  {
    id: "midi",
    label: "Il Ponte",
    title: "Controller MIDI Gestuale",
    text: "Un sistema che traduce i movimenti della mano in segnali MIDI in tempo reale. Utilizzo la webcam come interfaccia, MediaPipe per il tracking dei gesti e un bridge Python che converte dati spaziali in note, velocity e control change. Il punto d'incontro perfetto tra hardware, codice e musica.",
    tech: ["Python", "MediaPipe", "MIDI", "Computer Vision"],
  },
  {
    id: "web",
    label: "Sviluppo Complesso",
    title: "New Garden & CAI",
    text: "Piattaforma e-commerce B2B/B2C completa per New Garden e sito istituzionale per il CAI. Due progetti con architetture diverse — dal catalogo prodotti con logiche di prezzo differenziate per tipologia di cliente, alla comunicazione istituzionale con gestione eventi e contenuti dinamici.",
    tech: ["PHP", "WordPress", "LocalWP", "CSS"],
  },
  {
    id: "tools",
    label: "Audio & Code",
    title: "Producer Tools",
    text: "Una suite web completa di utility pensate per producer e musicisti. Calcolatori di BPM e delay time, generatori di scale e accordi, tool per la conversione di frequenze e analisi armonica. Tutto nel browser, zero installazioni, interfaccia immediata.",
    tech: ["HTML", "CSS", "JavaScript", "Web Audio"],
  },
  {
    id: "band",
    label: "Gestionale",
    title: "Gestionale Band",
    text: "Piattaforma gestionale interna per l'organizzazione logistica della band. Calendario prove, gestione scaletta, assegnazione ruoli per ogni esibizione, tracker dell'equipaggiamento e comunicazione centralizzata. Nato da un bisogno reale, risolto con codice.",
    tech: ["HTML", "JavaScript", "CSS", "UX Design"],
  },
  {
    id: "arrustuta",
    label: "Problem Solving",
    title: "Arrustuta",
    text: "Web app per la gestione in tempo reale di logistica e spese condivise durante eventi di gruppo. Ogni partecipante vede cosa deve portare, quanto ha speso e i saldi con gli altri. Pensata per il caos organizzativo delle grigliate siciliane — ma applicabile a qualsiasi evento.",
    tech: ["PHP", "SQL", "UX", "Real-time"],
  },
];

function ProjectCard({ project, index }) {
  const isReversed = index % 2 !== 0;

  return (
    <div
      data-project-card
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        index > 0 ? "mt-16 md:mt-24" : ""
      }`}
    >
      {/* Number side */}
      <div
        className={`flex items-center justify-center ${
          isReversed ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <span className="font-display text-[8rem] md:text-[11rem] font-black text-white/[0.025] leading-none select-none">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Card side */}
      <div className={isReversed ? "lg:order-1" : "lg:order-2"}>
        <div className="glass glass-hover rounded-2xl md:rounded-3xl p-8 md:p-10">
          {/* Label */}
          <span className="label mb-6 block">{project.label}</span>

          {/* Title */}
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight mb-5">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm md:text-base text-neutral-400 leading-[1.8] mb-8">
            {project.text}
          </p>

          {/* Tech */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="tech-tag">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const container = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray("[data-project-card]");

      cards.forEach((card) => {
        // Reveal: fade in + slide up + scale
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            end: "top 45%",
            toggleActions: "play none none reverse",
          },
          y: 100,
          opacity: 0,
          scale: 0.95,
          duration: 1.3,
          ease: "power3.out",
        });

        // Subtle parallax on scroll
        gsap.fromTo(
          card,
          { yPercent: 4 },
          {
            yPercent: -4,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="progetti"
      className="relative z-10 px-6 md:px-12 lg:px-20 py-32 md:py-44"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20 md:mb-28">
          <span className="label mb-6 block">Progetti</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-white">
            Quello che ho costruito.
          </h2>
          <p className="text-neutral-500 text-base mt-5 max-w-lg leading-relaxed">
            Ogni progetto nasce da un problema reale — ogni soluzione
            unisce codice, design e un pizzico di ossessione.
          </p>
        </div>

        {/* Project cards — zig-zag */}
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
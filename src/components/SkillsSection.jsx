"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";

const SKILL_GROUPS = [
  {
    title: "Web & Software",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    skills: ["Front-end", "Back-end", "JavaScript", "PHP", "SQL", "Python", "WordPress", "LocalWP", "Responsive Design", "REST API"],
  },
  {
    title: "Audio & Hardware",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
      </svg>
    ),
    skills: ["Polistrumentista", "FL Studio", "Ableton Live", "Sound Design", "Mixing & Mastering", "Modding Hardware", "MIDI Programming", "Sintesi Audio"],
  },
];

export default function SkillsSection() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.from("[data-skill-card]", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        y: 80,
        opacity: 0,
        scale: 0.96,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from("[data-pill]", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
        y: 15,
        opacity: 0,
        duration: 0.5,
        stagger: 0.035,
        ease: "power2.out",
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="competenze"
      className="relative z-10 px-6 md:px-12 lg:px-20 py-32 md:py-44"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 md:mb-24">
          <span className="label mb-6 block">Competenze</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-white">
            I miei strumenti.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.title}
              data-skill-card
              className="glass rounded-2xl md:rounded-3xl p-8 md:p-10"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.072] border border-white/[0.08] text-neutral-300">
                  {group.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-white tracking-tight">
                  {group.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span key={skill} data-pill className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
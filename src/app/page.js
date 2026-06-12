"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
} from "framer-motion";
import ProjectsSection from "../components/ProjectsSection";
import ScrollRevealText from "../components/ScrollRevealText";
import FloatingDock from "../components/FloatingDock";
import CustomCursor from "../components/CustomCursor";
import ThemeToggle from "../components/ThemeToggle";

/* ═══════════════════════════════════════════════════════
   CONSTANTS & EASING
   ═══════════════════════════════════════════════════════ */
const easeApple = [0.16, 1, 0.3, 1];
const mono = "#ffffff"; // monochromatic accent

const heroNameFirst = Array.from("Alessio");
const heroNameLast = Array.from("Cavallaro");

const nameContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.45,
    },
  },
};

const nameLetter = {
  hidden: { opacity: 0, y: 80, filter: "blur(20px)", rotate: -4 },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    rotate: 0,
    transition: { duration: 1.4, ease: easeApple },
  },
};

const reveal = {
  initial: { opacity: 0, y: 60, filter: "blur(8px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 1.4, ease: easeApple },
};

const revealDeep = {
  initial: { opacity: 0, y: 100, scale: 0.96, filter: "blur(12px)" },
  whileInView: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  viewport: { once: true, margin: "-15%" },
  transition: { duration: 1.6, ease: easeApple },
};

const revealText = {
  initial: { opacity: 0, y: 45, skewY: 4, filter: "blur(10px)" },
  whileInView: { opacity: 1, y: 0, skewY: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 1.4, ease: easeApple },
};

const revealTextStrong = {
  initial: { opacity: 0, x: -40, y: 30, filter: "blur(10px)" },
  whileInView: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 1.5, ease: easeApple },
};

const revealLabel = {
  initial: { opacity: 0, y: 45, skewY: 4, filter: "blur(10px)" },
  whileInView: { opacity: 1, y: 0, skewY: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 1.4, ease: easeApple },
};

/* Pre-computed values for spectrum analyzer (avoids Math.random hydration errors) */
const spectrumBars = [
  { h: 30, dur: 1.4, del: 0.10 }, { h: 55, dur: 1.7, del: 0.30 },
  { h: 85, dur: 1.3, del: 0.05 }, { h: 95, dur: 1.8, del: 0.40 },
  { h: 70, dur: 1.5, del: 0.20 }, { h: 80, dur: 1.6, del: 0.35 },
  { h: 60, dur: 1.2, del: 0.15 }, { h: 45, dur: 1.9, del: 0.25 },
  { h: 75, dur: 1.4, del: 0.08 }, { h: 90, dur: 1.7, del: 0.32 },
  { h: 65, dur: 1.3, del: 0.18 }, { h: 50, dur: 1.8, del: 0.38 },
  { h: 40, dur: 1.5, del: 0.12 }, { h: 55, dur: 1.6, del: 0.28 },
  { h: 35, dur: 1.2, del: 0.22 }, { h: 45, dur: 1.9, del: 0.42 },
  { h: 25, dur: 1.4, del: 0.07 }, { h: 35, dur: 1.7, del: 0.33 },
  { h: 20, dur: 1.3, del: 0.16 }, { h: 15, dur: 1.8, del: 0.36 },
  { h: 25, dur: 1.5, del: 0.11 }, { h: 18, dur: 1.6, del: 0.26 },
  { h: 12, dur: 1.2, del: 0.19 }, { h: 10, dur: 1.9, del: 0.41 },
];

/* ═══════════════════════════════════════════════════════
   PROJECT DATA — Monochromatic palette
   ═══════════════════════════════════════════════════════ */
const projectsData = [
  {
    id: "01",
    title: "Piattaforma B2B/B2C New Garden",
    description: "Sviluppo di una piattaforma complessa per la logistica e il commercio florovivaistico. Catalogo dinamico, gestione ordini, dashboard admin.",
    tags: ["PHP", "SQL", "E-COMMERCE", "B2B/B2C"],
    category: "WEB DEV",
    accent: mono,
    gradient: "radial-gradient(ellipse at 30% 70%, rgba(255,255,255,0.09) 0%, transparent 50%)",
  },
  {
    id: "02",
    title: "Sito Istituzionale CAI Acireale",
    description: "Portale web per la gestione associativa del Club Alpino Italiano. Area soci, calendario escursioni, comunicazione centralizzata.",
    tags: ["WORDPRESS", "PHP", "CMS"],
    category: "ISTITUZIONALE",
    accent: mono,
    gradient: "radial-gradient(ellipse at 50% 80%, rgba(255,255,255,0.09) 0%, transparent 50%)",
    link: "https://www.caiacireale.it/",
  },
  {
    id: "03",
    title: "Controller MIDI Gestuale",
    description: "In Python con MediaPipe. Traduce i movimenti della mano tramite webcam in input MIDI in tempo reale. Il ponte fra codice e musica.",
    tags: ["PYTHON", "MEDIAPIPE", "MIDI", "CV"],
    category: "AUDIO & CODE",
    accent: mono,
    gradient: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.072) 0%, transparent 45%)",
    link: "https://github.com/alessiocava2407-sudo/Gesture-MIDI-Controller",
  },
  {
    id: "04",
    title: "Arrustuta",
    description: "Web app sviluppata in PHP e SQL (MariaDB) per risolvere problemi di logistica, trasporti e spese per eventi.",
    tags: ["PHP", "MARIADB", "REALTIME"],
    category: "WEB APP",
    accent: mono,
    gradient: "radial-gradient(ellipse at 70% 60%, rgba(255,255,255,0.09) 0%, transparent 50%)",
  },
  {
    id: "05",
    title: "Producer Tools",
    description: "Suite web in HTML/JS che include utility come calcolatori BPM e Timecalc per produttori musicali.",
    tags: ["HTML", "JAVASCRIPT", "WEB AUDIO"],
    category: "UTILITY",
    accent: mono,
    gradient: "radial-gradient(ellipse at 40% 40%, rgba(255,255,255,0.09) 0%, transparent 50%)",
    link: "https://producer-tools-ale.netlify.app/",
  },
  {
    id: "06",
    title: "Band Hub",
    description: "Sistema gestionale logistico per la band, con database centralizzato, cache e sistema di privilegi e ruoli utente.",
    tags: ["NEXT.JS", "AUTH", "DATABASE"],
    category: "GESTIONALE",
    accent: mono,
    gradient: "radial-gradient(ellipse at 60% 70%, rgba(255,255,255,0.09) 0%, transparent 50%)",
  },
  {
    id: "07",
    title: "Tappezzeria Madaudo",
    description: "Sviluppo del portale web per digitalizzare la presenza e mostrare l'artigianato della storica bottega.",
    tags: ["FRONT-END", "UI/UX", "VETRINA"],
    category: "ARTIGIANATO",
    accent: mono,
    gradient: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.072) 0%, transparent 50%)",
    link: "https://tappezzeria-madaudo.free.nf/",
  },
  {
    id: "08",
    title: "Dimora Akis",
    description: "Piattaforma vetrina e gestione prenotazioni per il B&B di famiglia. Focus su esperienza utente e conversione.",
    tags: ["FRONT-END", "UX", "BOOKING"],
    category: "HOSPITALITY",
    accent: mono,
    gradient: "radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.09) 0%, transparent 50%)",
    link: "https://dimora-akis.free.nf/",
  },
];

/* ═══════════════════════════════════════════════════════ */
const SKILLS_WEB = [
  ["Front-end", "React · Next.js · Tailwind"],
  ["Back-end", "Python · PHP · Node"],
  ["Database", "MySQL · MariaDB"],
  ["CMS & Dev", "WordPress · LocalWP"],
];

const SKILLS_AUDIO = [
  ["Polistrumentista", "Chitarra · Basso · Synth"],
  ["FL Studio", "Mixing · Mastering"],
  ["Sound Design", "Sintesi · Sampling · Foley"],
  ["Modding Artigianale", "Circuiti · Saldatura · MIDI"],
];

const marqueeItems = [
  { text: "SVILUPPO WEB", style: "sans" },
  { text: "Sound Design", style: "serif" },
  { text: "INGEGNERIA INFORMATICA", style: "sans" },
  { text: "Produzione Musicale", style: "serif" },
  { text: "HARDWARE MODDING", style: "sans" },
  { text: "MIDI & Computer Vision", style: "serif" },
];

/* ═══════════════════════════════════════════════════════
   CUSTOM VISUAL RENDERERS PER PROJECT
   ═══════════════════════════════════════════════════════ */
const glass = "border border-white/10 bg-white/[0.054] backdrop-blur-sm rounded-lg";
const glassSm = "border border-white/[0.06] bg-white/[0.036] backdrop-blur-sm rounded-md";

function renderProjectVisual(id, accent) {
  switch (id) {
    /* ── 01 — New Garden: B2B Dashboard ── */
    case "01":
      return (
        <div className="h-full w-full flex flex-col p-5 gap-3">
          <div className={`${glassSm} px-4 py-2.5 flex items-center justify-between`}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white/30" />
              <span className="text-[9px] font-sans uppercase tracking-[0.15em] text-white/90">New Garden</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[8px] font-sans uppercase tracking-wider text-white/45">Catalogo</span>
              <span className="text-[8px] font-sans uppercase tracking-wider text-white/45">Ordini</span>
              <span className="text-[8px] font-sans uppercase tracking-wider text-white/100">Dashboard</span>
            </div>
          </div>
          <div className="flex gap-2">
            {[{ label: "Ordini oggi", val: "34" }, { label: "Fatturato", val: "€ 12.4k" }, { label: "Prodotti", val: "1,280" }].map((s) => (
              <div key={s.label} className={`${glassSm} flex-1 p-3`}>
                <span className="block text-[7px] font-sans uppercase tracking-wider text-white/45 mb-1">{s.label}</span>
                <span className="block text-[16px] font-sans font-medium text-white/100 tabular-nums">{s.val}</span>
              </div>
            ))}
          </div>
          <div className={`${glassSm} flex-1 p-4 flex flex-col`}>
            <span className="text-[8px] font-sans uppercase tracking-wider text-white/45 mb-3">Vendite settimanali</span>
            <div className="flex-1 flex items-end gap-1.5">
              {[45, 72, 58, 90, 65, 82, 48].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{ background: i === 3 ? "rgba(255,255,255,0.63)" : "rgba(255,255,255,0.144)" }}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: easeApple, delay: i * 0.06 }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {["L", "Ma", "Me", "G", "V", "S", "D"].map((d) => (
                <span key={d} className="flex-1 text-center text-[7px] text-white/36 font-sans">{d}</span>
              ))}
            </div>
          </div>
          <div className={`${glassSm} p-3`}>
            {["Rosa Rossa x120", "Orchidea Phalaenopsis x45", "Bonsai Ficus x18"].map((item, i) => (
              <div key={i} className={`flex items-center justify-between py-1.5 ${i < 2 ? "border-b border-white/[0.04]" : ""}`}>
                <span className="text-[9px] text-white/72 font-sans">{item}</span>
                <div className="w-12 h-1 rounded-full bg-white/[0.108] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-white/25"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${[85, 55, 30][i]}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    /* ── 02 — CAI Acireale: Portal ── */
    case "02":
      return (
        <div className="h-full w-full flex flex-col p-5 gap-3">
          <div className={`${glassSm} px-4 py-2.5 flex items-center justify-between`}>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-serif italic text-white/100">CAI</span>
              <span className="text-[8px] font-sans uppercase tracking-wider text-white/54">Acireale</span>
            </div>
            <div className="flex gap-2">
              {["Soci", "Escursioni", "Contatti"].map((l) => (
                <span key={l} className="text-[7px] font-sans uppercase tracking-wider text-white/45">{l}</span>
              ))}
            </div>
          </div>
          <div className={`${glassSm} flex-1 relative overflow-hidden`}>
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center">
              <div className="w-0 h-0 border-l-[60px] border-r-[60px] border-b-[80px] border-l-transparent border-r-transparent border-b-white/[0.06]" />
              <div className="w-0 h-0 border-l-[90px] border-r-[90px] border-b-[120px] border-l-transparent border-r-transparent border-b-white/[0.09] -ml-8" />
              <div className="w-0 h-0 border-l-[50px] border-r-[50px] border-b-[70px] border-l-transparent border-r-transparent border-b-white/[0.04] -ml-6" />
            </div>
            <div className="absolute top-4 left-4 text-[8px] font-sans uppercase tracking-wider text-white/36">Etna Nord · 2,800m</div>
            <div className="absolute top-4 right-4 text-[8px] font-sans uppercase tracking-wider text-white/72">LIVE</div>
          </div>
          <div className={`${glassSm} p-3`}>
            <span className="text-[8px] font-sans uppercase tracking-wider text-white/45 block mb-2">Prossime escursioni</span>
            {[
              { date: "15 Giu", name: "Monte Zoccolaro", diff: "T2" },
              { date: "22 Giu", name: "Serracozzo - Grotta del Gelo", diff: "EE" },
              { date: "06 Lug", name: "Piano dei Dammusi", diff: "T1" },
            ].map((ev, i) => (
              <div key={i} className={`flex items-center gap-3 py-1.5 ${i < 2 ? "border-b border-white/[0.04]" : ""}`}>
                <span className="text-[9px] font-sans tabular-nums text-white/54 w-10 shrink-0">{ev.date}</span>
                <span className="text-[9px] font-sans text-white/90 flex-1">{ev.name}</span>
                <span className="text-[8px] font-sans px-1.5 py-0.5 rounded bg-white/[0.108] text-white/90">{ev.diff}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <div className={`${glassSm} flex-1 p-2.5 text-center`}>
              <span className="block text-[18px] font-sans font-medium text-white/100 tabular-nums">247</span>
              <span className="block text-[7px] font-sans uppercase tracking-wider text-white/45">Soci attivi</span>
            </div>
            <div className={`${glassSm} flex-1 p-2.5 text-center`}>
              <span className="block text-[18px] font-sans font-medium text-white/90 tabular-nums">12</span>
              <span className="block text-[7px] font-sans uppercase tracking-wider text-white/45">Escursioni 2026</span>
            </div>
          </div>
        </div>
      );

    /* ── 03 — Controller MIDI: CV Debug Screen ── */
    case "03":
      return (
        <div className="h-full w-full flex flex-col p-5 gap-3 font-mono">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
              <span className="text-[9px] uppercase tracking-wider text-white/90">MediaPipe Hands · LIVE</span>
            </div>
            <span className="text-[8px] text-white/45 tabular-nums">30 FPS · 640×480</span>
          </div>
          <div className={`${glass} flex-1 relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.54) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.54) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }} />
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" fill="none">
              {[
                { d: "M100,170 L100,130 L100,100 L100,75", w: "1", dl: 0.3 },
                { d: "M100,75 L85,50 L80,30 L78,15", w: "0.8", dl: 0.6 },
                { d: "M100,75 L100,45 L100,25 L100,10", w: "0.8", dl: 0.7 },
                { d: "M100,75 L115,48 L120,28 L122,14", w: "0.8", dl: 0.8 },
                { d: "M100,80 L130,60 L140,42 L145,30", w: "0.8", dl: 0.9 },
                { d: "M100,100 L70,105 L50,95 L38,80", w: "0.8", dl: 0.5 },
              ].map((p, i) => (
                <motion.path key={i} d={p.d} stroke="rgba(255,255,255,0.45)" strokeWidth={p.w}
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: p.dl }} />
              ))}
              {[
                [100,170],[100,130],[100,100],[100,75],[85,50],[80,30],[78,15],
                [100,45],[100,25],[100,10],[115,48],[120,28],[122,14],
                [130,60],[140,42],[145,30],[70,105],[50,95],[38,80],
              ].map(([cx, cy], i) => (
                <motion.circle key={i} cx={cx} cy={cy} r="2.5" fill="white" opacity={0}
                  animate={{ opacity: [0, 0.6, 0.3] }}
                  transition={{ duration: 1.5, delay: 0.3 + i * 0.05, repeat: Infinity, repeatType: "reverse" }} />
              ))}
            </svg>
            <div className="absolute top-3 left-3 text-[8px] text-white/54 leading-relaxed">
              <div>x: <span className="tabular-nums text-white/90">0.482</span></div>
              <div>y: <span className="tabular-nums text-white/90">0.315</span></div>
            </div>
            <div className="absolute top-3 right-3 text-[8px] text-white/54 text-right leading-relaxed">
              <div>Confidence</div>
              <div className="tabular-nums text-white/100">0.97</div>
            </div>
            <div className="absolute bottom-3 left-3 text-[8px] text-white/54">
              Landmarks: <span className="tabular-nums text-white/90">21</span>
            </div>
          </div>
          <div className={`${glassSm} p-3 flex gap-4`}>
            {[
              { cc: "CC #01", label: "Mod Wheel", val: "87" },
              { cc: "CC #74", label: "Cutoff", val: "112" },
              { cc: "CC #11", label: "Expression", val: "64" },
            ].map((m) => (
              <div key={m.cc} className="flex-1">
                <span className="block text-[7px] uppercase tracking-wider text-white/63">{m.cc}</span>
                <span className="block text-[8px] text-white/45">{m.label}</span>
                <span className="block text-[14px] font-medium text-white/100 tabular-nums">{m.val}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[8px] text-white/36">
            <span>MIDI Ch: <span className="tabular-nums text-white/72">1</span></span>
            <span>Port: <span className="text-white/72">loopMIDI</span></span>
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-white/60 animate-pulse" />Sending
            </span>
          </div>
        </div>
      );

    /* ── 04 — Arrustuta: Dark Receipt ── */
    case "04":
      return (
        <div className="h-full w-full flex flex-col p-5 gap-3 font-mono">
          <div className="text-center py-2">
            <span className="text-[13px] font-serif italic text-white/100 block">Arrustuta</span>
            <span className="text-[7px] uppercase tracking-[0.3em] text-white/36 block mt-1">Resoconto Spese · Evento</span>
            <div className="w-full h-px mt-3" style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.108) 0px, rgba(255,255,255,0.108) 4px, transparent 4px, transparent 8px)" }} />
          </div>
          <div className="flex-1 flex flex-col gap-0">
            {[
              { item: "Carne mista (5kg)", price: "€ 47,50", qty: "x1" },
              { item: "Birra artigianale", price: "€ 36,00", qty: "x24" },
              { item: "Pane e condimenti", price: "€ 12,80", qty: "—" },
              { item: "Carbonella premium", price: "€ 18,90", qty: "x2" },
              { item: "Logistica furgone", price: "€ 45,00", qty: "—" },
              { item: "Ghiaccio + bibite", price: "€ 15,20", qty: "—" },
              { item: "Affitto location", price: "€ 12,00", qty: "÷8" },
            ].map((row, i) => (
              <div key={i} className="flex items-baseline justify-between py-2 border-b border-white/[0.04]">
                <div className="flex items-baseline gap-2 flex-1">
                  <span className="text-[9px] text-white/81">{row.item}</span>
                  <span className="text-[8px] text-white/27">{row.qty}</span>
                </div>
                <span className="text-[10px] text-white/90 tabular-nums">{row.price}</span>
              </div>
            ))}
            <div className="my-3" style={{ height: "1px", backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.18) 0px, rgba(255,255,255,0.18) 4px, transparent 4px, transparent 8px)" }} />
            <div className="flex justify-between py-1">
              <span className="text-[8px] text-white/45 uppercase tracking-wider">Subtotale</span>
              <span className="text-[10px] text-white/72 tabular-nums">€ 187,40</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[8px] text-white/45 uppercase tracking-wider">÷ 8 persone</span>
              <span className="text-[10px] text-white/72 tabular-nums">€ 23,43</span>
            </div>
            <div className="mt-2 p-3 rounded-lg bg-white/[0.072] border border-white/[0.08]">
              <div className="flex justify-between items-baseline">
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/90">Totale</span>
                <span className="text-[22px] font-medium tabular-nums text-white/100">€ 187,40</span>
              </div>
            </div>
          </div>
          <div className="text-center pt-2">
            <span className="text-[7px] text-white/27 uppercase tracking-wider">Generato da Arrustuta · 2025</span>
          </div>
        </div>
      );

    /* ── 05 — Producer Tools: Audio Plugin ── */
    case "05":
      return (
        <div className="h-full w-full flex flex-col p-5 gap-3">
          <div className={`${glassSm} px-4 py-2 flex items-center justify-between`}>
            <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-white/90">Producer Tools</span>
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-white/15" />
              <div className="w-2 h-2 rounded-full bg-white/25" />
              <div className="w-2 h-2 rounded-full bg-white/40" />
            </div>
          </div>
          <div className={`${glass} flex-1 flex flex-col items-center justify-center relative`}>
            <span className="text-[8px] font-sans uppercase tracking-[0.3em] text-white/36 mb-2">Tempo</span>
            <div className="flex items-baseline gap-1">
              <span className="text-[72px] font-sans font-light leading-none tabular-nums text-white/100">128</span>
              <span className="text-[14px] text-white/45 font-sans">.00</span>
            </div>
            <span className="text-[10px] font-sans text-white/36 mt-1 uppercase tracking-wider">BPM</span>
            <div className="mt-4 px-4 py-1.5 rounded-full bg-white/[0.09] border border-white/[0.1]">
              <span className="text-[11px] font-sans text-white/100">F# minor</span>
            </div>
            <div className="absolute bottom-4 flex gap-2">
              {[0, 1, 2, 3].map((i) => (
                <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-white/60"
                  animate={{ opacity: [0.15, 0.8, 0.15] }}
                  transition={{ duration: 0.46875, delay: i * 0.46875, repeat: Infinity }} />
              ))}
            </div>
          </div>
          <div className={`${glassSm} p-3 flex gap-3`}>
            {[
              { label: "1/4 note", val: "468.75 ms" },
              { label: "1/8 note", val: "234.38 ms" },
              { label: "1/16 note", val: "117.19 ms" },
            ].map((n, i) => (
              <div key={n.label} className="flex-1">
                <span className="block text-[7px] font-sans uppercase tracking-wider text-white/45 mb-1">{n.label}</span>
                <span className="block text-[13px] font-sans text-white/100 tabular-nums">{n.val}</span>
                {i < 2 && <div className="absolute right-0 top-0 bottom-0 w-px bg-white/[0.108]" />}
              </div>
            ))}
          </div>
          <div className={`${glassSm} p-3`}>
            <span className="block text-[7px] font-sans uppercase tracking-wider text-white/45 mb-2">Spectrum</span>
            <div className="flex items-end gap-[3px] h-12">
              {spectrumBars.map((bar, i) => (
                <motion.div key={i} className="flex-1 rounded-[1px]"
                  style={{ background: i < 8 ? "rgba(255,255,255,0.63)" : i < 16 ? "rgba(255,255,255,0.36)" : "rgba(255,255,255,0.18)" }}
                  animate={{ height: [`${bar.h * 0.4}%`, `${bar.h}%`, `${bar.h * 0.6}%`] }}
                  transition={{ duration: bar.dur, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: bar.del }} />
              ))}
            </div>
          </div>
        </div>
      );

    /* ── 06 — Band Hub: Management Dashboard ── */
    case "06":
      return (
        <div className="h-full w-full flex flex-col p-5 gap-3">
          <div className={`${glassSm} px-4 py-2.5 flex items-center justify-between`}>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-sans font-medium text-white/100">Band Hub</span>
              <span className="text-[7px] px-1.5 py-0.5 rounded text-white/54 bg-white/[0.09]">v2.1</span>
            </div>
            <span className="text-[8px] font-sans uppercase tracking-wider text-white/45">Membri</span>
          </div>

          {/* Team list */}
          <div className={`${glassSm} p-3 flex-1`}>
            <span className="text-[8px] font-sans uppercase tracking-wider text-white/45 block mb-3">Team</span>
            {[
              { name: "Alessio C.", role: "Admin", initials: "AC" },
              { name: "Marco R.", role: "Basso", initials: "MR" },
              { name: "Salvo M.", role: "Chitarra", initials: "SM" },
              { name: "Andrea P.", role: "Batteria", initials: "AP" },
              { name: "Giulia F.", role: "Voce", initials: "GF" },
            ].map((m, i) => (
              <div key={i} className={`flex items-center gap-3 py-2.5 ${i < 4 ? "border-b border-white/[0.04]" : ""}`}>
                <div className="w-7 h-7 rounded-full bg-white/[0.108] flex items-center justify-center shrink-0">
                  <span className="text-[8px] font-sans font-medium text-white/72">{m.initials}</span>
                </div>
                <span className="text-[10px] font-sans text-white/90 flex-1">{m.name}</span>
                <span className={`text-[7px] px-2 py-0.5 rounded-full font-sans ${i === 0 ? "bg-white/[0.18] text-white/100" : "bg-white/[0.072] text-white/54"}`}>
                  {m.role}
                </span>
              </div>
            ))}
          </div>

          {/* Next event */}
          <div className={`${glassSm} p-3`}>
            <span className="text-[8px] font-sans uppercase tracking-wider text-white/45 block mb-2">Prossimo evento</span>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-sans text-white/100 block">Live @ Monk — Catania</span>
                <span className="text-[8px] font-sans text-white/45">Sab 12 Lug · 22:00</span>
              </div>
              <span className="text-[8px] px-2 py-1 rounded-full bg-white/[0.108] text-white/72 font-sans">Confermato</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-2">
            <div className={`${glassSm} flex-1 p-2 text-center`}>
              <span className="block text-[14px] font-sans font-medium text-white/100 tabular-nums">12</span>
              <span className="block text-[7px] font-sans uppercase tracking-wider text-white/36">Prossimi live</span>
            </div>
            <div className={`${glassSm} flex-1 p-2 text-center`}>
              <span className="block text-[14px] font-sans font-medium text-white/90 tabular-nums">€ 2,340</span>
              <span className="block text-[7px] font-sans uppercase tracking-wider text-white/36">Cachet totale</span>
            </div>
          </div>
        </div>
      );

    /* ── 07 — Tappezzeria Madaudo: Artisan Portfolio ── */
    case "07":
      return (
        <div className="h-full w-full flex flex-col p-5 gap-3">
          <div className="text-center py-3">
            <span className="text-[7px] font-sans uppercase tracking-[0.4em] text-white/36 block">Dal 1964</span>
            <span className="text-[16px] font-serif italic text-white/100 block mt-1">Tappezzeria Madaudo</span>
            <span className="text-[7px] font-sans uppercase tracking-[0.2em] text-white/27 block mt-1">Acireale · Tradizione artigianale</span>
          </div>
          <div className="grid grid-cols-2 gap-2 flex-1">
            {[
              { label: "Divani", h: "row-span-2", angle: "45" },
              { label: "Tendaggi", h: "", angle: "135" },
              { label: "Restauro", h: "", angle: "90" },
            ].map((item, i) => (
              <div key={i} className={`${glassSm} relative overflow-hidden flex items-end p-3 ${item.h}`} style={{ minHeight: i === 0 ? undefined : "70px" }}>
                <div className="absolute inset-0 opacity-[0.03]" style={{
                  backgroundImage: `repeating-linear-gradient(${item.angle}deg, white 0px, white 1px, transparent 1px, transparent ${i === 0 ? "8" : "6"}px)`,
                }} />
                <span className="text-[9px] font-sans text-white/72 relative z-10">{item.label}</span>
              </div>
            ))}
            <div className={`${glassSm} col-span-2 p-3 flex items-center justify-between`}>
              <span className="text-[9px] font-sans text-white/72">Materiali e Tessuti</span>
              <div className="flex gap-1.5">
                {["rgba(255,255,255,0.27)", "rgba(255,255,255,0.144)", "rgba(255,255,255,0.45)", "rgba(255,255,255,0.072)"].map((c, i) => (
                  <div key={i} className="w-4 h-4 rounded-full border border-white/10" style={{ background: c }} />
                ))}
              </div>
            </div>
          </div>
          <div className={`${glassSm} px-4 py-2.5 flex items-center justify-between`}>
            <span className="text-[8px] font-sans text-white/54">Via Fabio, 16 · Acireale</span>
            <span className="text-[8px] font-sans px-2 py-1 rounded-full bg-white/[0.108] text-white/90">Preventivo</span>
          </div>
        </div>
      );

    /* ── 08 — Dimora Akis: Booking Module ── */
    case "08":
      return (
        <div className="h-full w-full flex flex-col p-5 gap-3">
          <div className={`${glassSm} px-4 py-2.5 flex items-center justify-between`}>
            <div>
              <span className="text-[12px] font-serif italic text-white/100">Dimora Akis</span>
              <span className="text-[7px] font-sans text-white/36 block">B&amp;B · Acireale</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[7px] font-sans uppercase tracking-wider text-white/45">Camere</span>
              <span className="text-[7px] font-sans uppercase tracking-wider text-white/90">Prenota</span>
            </div>
          </div>
          <div className={`${glass} p-4`}>
            <span className="text-[8px] font-sans uppercase tracking-wider text-white/45 block mb-3">Seleziona date</span>
            <div className="flex gap-3 mb-3">
              <div className="flex-1 p-2 rounded-md border border-white/[0.06] bg-white/[0.036]">
                <span className="block text-[7px] font-sans text-white/36 uppercase">Check-in</span>
                <span className="block text-[12px] font-sans text-white/100 tabular-nums">15 Lug 2026</span>
              </div>
              <div className="flex items-center text-white/27 text-[12px]">→</div>
              <div className="flex-1 p-2 rounded-md border border-white/[0.06] bg-white/[0.036]">
                <span className="block text-[7px] font-sans text-white/36 uppercase">Check-out</span>
                <span className="block text-[12px] font-sans text-white/100 tabular-nums">18 Lug 2026</span>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {["L", "Ma", "Me", "G", "V", "S", "D"].map((d) => (
                <span key={d} className="text-[7px] text-white/27 font-sans py-0.5">{d}</span>
              ))}
              {Array.from({ length: 31 }, (_, i) => {
                const day = i + 1;
                const isSel = day >= 15 && day <= 18;
                const isEdge = day === 15 || day === 18;
                return (
                  <span key={day}
                    className={`text-[8px] font-sans tabular-nums py-1 ${isSel ? "text-white/100" : day < 15 ? "text-white/27" : "text-white/63"}`}
                    style={isSel ? {
                      background: isEdge ? "rgba(255,255,255,0.27)" : "rgba(255,255,255,0.108)",
                      borderRadius: day === 15 ? "6px 0 0 6px" : day === 18 ? "0 6px 6px 0" : "0",
                    } : undefined}
                  >{day}</span>
                );
              })}
            </div>
          </div>
          <div className={`${glassSm} p-3 flex items-center gap-3`}>
            <div className="w-14 h-14 rounded-lg shrink-0 flex items-center justify-center bg-white/[0.072]">
              <span className="text-[11px] font-serif italic text-white/54">Aci</span>
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-sans font-medium text-white/100">Camera Aci</span>
              <span className="block text-[8px] font-sans text-white/45">2 ospiti · Vista mare · Colazione</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-[14px] font-sans font-medium tabular-nums text-white/100">€ 89</span>
                <span className="text-[8px] text-white/45">/ notte</span>
              </div>
            </div>
            <div className="text-[8px] px-2.5 py-1.5 rounded-full font-sans bg-white/[0.108] text-white/90">Disponibile</div>
          </div>
          <div className="p-3 rounded-xl text-center bg-white/[0.108] border border-white/[0.1]">
            <span className="text-[11px] font-sans font-medium text-white/100">Prenota · 3 notti · € 267</span>
          </div>
        </div>
      );

    default:
      return (
        <div className="h-full w-full flex items-center justify-center">
          <span className="font-serif italic text-[8rem] text-white/[0.27] select-none">{id}</span>
        </div>
      );
  }
}

/* ═══════════════════════════════════════════════════════
   PROJECT CARD COMPONENT
   ═══════════════════════════════════════════════════════ */
function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "100px" });
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // tilt + shine refs and motion values
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  // softer springs for smoother tilt
  const tiltXSpring = useSpring(tiltX, { stiffness: 140, damping: 22, mass: 0.9 });
  const tiltYSpring = useSpring(tiltY, { stiffness: 140, damping: 22, mass: 0.9 });
  const shineRef = useRef(null);

  return (
    <motion.article
      ref={cardRef}
      className={`shrink-0 flex ${isMobile ? "flex-col" : "flex-row"} items-stretch gap-0 rounded-2xl overflow-hidden border border-white/[0.04] card-glow ${isMobile ? "w-full" : "w-[85vw] md:w-[75vw]"}`}
      style={{
        "--card-glow-shadow": "0 0 80px -20px rgba(255,255,255,0.108)",
        borderColor: hovered ? "rgba(255,255,255,0.18)" : undefined,
        transformStyle: "preserve-3d",
        rotateX: tiltXSpring,
        rotateY: tiltYSpring,
      }}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      whileHover={{ scale: 1.008, y: -2 }}
      transition={{ duration: 1.2, ease: easeApple, delay: index * 0.08 }}
      onMouseEnter={() => {
        const inv = typeof document !== 'undefined' && document.documentElement.classList.contains('inverted');
        if (inv) {
          setHovered(false);
          if (shineRef.current) shineRef.current.style.opacity = '0';
          tiltX.set(0);
          tiltY.set(0);
          return;
        }
        setHovered(true);
        if (shineRef.current) shineRef.current.style.opacity = '0.75';
      }}
      onMouseMove={(e) => {
        const inv = typeof document !== 'undefined' && document.documentElement.classList.contains('inverted');
        if (inv) return;
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        // gentler tilt multipliers for subtler effect
        const rx = (py - 0.5) * 6;
        const ry = (px - 0.5) * -6;
        tiltX.set(rx);
        tiltY.set(ry);
        if (shineRef.current) {
          shineRef.current.style.left = `${px * 100}%`;
          shineRef.current.style.top = `${py * 100}%`;
        }
      }}
      onMouseLeave={() => {
        setHovered(false);
        tiltX.set(0);
        tiltY.set(0);
        if (shineRef.current) {
          shineRef.current.style.left = `50%`;
          shineRef.current.style.top = `50%`;
          shineRef.current.style.opacity = '0';
        }
      }}
    >
      <div className={`${isMobile ? "w-full" : "w-1/2"} shrink-0 relative overflow-hidden`} style={{ background: project.gradient, minHeight: isMobile ? "280px" : "420px" }}>
        <motion.div className="absolute inset-0 pointer-events-none z-0"
          style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.072) 0%, transparent 60%)" }}
          animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.7 }} />
        <div ref={shineRef} className="card-shine absolute left-1/2 top-1/2 w-44 h-44 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 h-full">
          {renderProjectVisual(project.id, project.accent)}
        </div>
      </div>
      <div className={`${isMobile ? "w-full" : "w-1/2"} flex flex-col justify-center p-6 md:p-10 lg:p-14 surface`} style={{background: 'var(--card-surface)'}}>
        <span className="block text-[9px] md:text-[10px] font-sans uppercase tracking-[0.3em] mb-2 tabular-nums text-white/54">
          {project.id} / 08
        </span>
        <span className="block text-[9px] md:text-[10px] font-sans uppercase tracking-[0.25em] text-white/36 mb-5">
          {project.category}
        </span>
        <div className="flex items-center justify-between gap-4 mb-5">
          <h3 className="font-serif text-[20px] sm:text-[24px] md:text-[28px] lg:text-[34px] leading-[1.1] tracking-[-0.015em] text-white/100">
            {project.title}<span className="text-white/36">.</span>
          </h3>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="shrink-0 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/[0.06] hover:bg-white/[0.144] hover:border-white/[0.15] hover:scale-105 transition-all duration-300 group">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/72 group-hover:text-white transition-colors">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          )}
        </div>
        <p className="text-white/63 text-[13px] sm:text-[14px] leading-[1.75] mb-8 font-light">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag}
              className="px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-sans uppercase tracking-wider border transition-colors duration-500"
              style={{
                color: hovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.36)",
                borderColor: hovered ? "rgba(255,255,255,0.216)" : "rgba(255,255,255,0.09)",
              }}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════ */
export default function Page() {
  const { scrollYProgress: globalProgress } = useScroll();
  const smoothProgress = useSpring(globalProgress, { stiffness: 100, damping: 30 });

  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsDesktop(!mobile);
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  /* ── Hero multi-layer parallax ── */
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const layer1Y = useTransform(scrollY, [0, 800], [0, -50]);
  const layer2Y = useTransform(scrollY, [0, 800], [0, -120]);
  const layer3Y = useTransform(scrollY, [0, 800], [0, -180]);
  const layerBgY = useTransform(scrollY, [0, 800], [0, 80]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 0.95]);
  const heroPulse = useTransform(scrollY, [0, 700], [1, 1.028]);
  const heroNameY = useTransform(scrollY, [0, 700], [0, -82]);
  const heroNameGlow = useTransform(scrollY, [0, 1000], [0.14, 0.55]);
  const heroNameShadow = useTransform(heroNameGlow, (value) => `0 0 ${value}px rgba(135, 169, 255, 0.22)`);
  const heroTaglineY = useTransform(scrollY, [0, 1000], [0, -42]);
  const heroTaglineX = useTransform(scrollY, [0, 1000], [0, 12]);
  const heroTaglineOpacity = useTransform(scrollY, [0, 1000], [1, 0.82]);
  const heroCtaY = useTransform(scrollY, [0, 1000], [0, 18]);
  const heroCtaOpacity = useTransform(scrollY, [0, 1000], [1, 0.74]);
  const heroCtaScale = useTransform(scrollY, [0, 1000], [1, 0.96]);

  /* ── Sticky horizontal scroll ── */
  const targetRef = useRef(null);
  const containerRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setScrollRange(containerRef.current.scrollWidth - window.innerWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);
  const xSpring = useSpring(x, { stiffness: 300, damping: 50, mass: 0.8 });

  return (
    <>
      <CustomCursor />
      <FloatingDock />
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-[100] scroll-progress" style={{ scaleX: smoothProgress }} />

      <header className="fixed top-0 inset-x-0 z-50 mix-blend-difference pointer-events-none">
        <div className="flex items-center justify-between px-6 md:px-12 py-5">
          <a href="#top" className="pointer-events-auto text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-white">Alessio C.</a>
          <nav className="hidden md:flex items-center gap-1 text-[11px] font-sans uppercase tracking-[0.2em] text-white/90 pointer-events-auto">
            <a href="#studio" aria-label="Vai a Studio" className="px-3 py-1 hover:text-white transition-colors duration-500">Studio</a>
            <span className="text-white/27">·</span>
            <a href="#lavori" aria-label="Vai a Lavori" className="px-3 py-1 hover:text-white transition-colors duration-500">Lavori</a>
            <span className="text-white/27">·</span>
            <a href="#competenze" aria-label="Vai a Competenze" className="px-3 py-1 hover:text-white transition-colors duration-500">Competenze</a>
            <span className="text-white/27 mx-2">|</span>
            <span className="text-white/45 tabular-nums">Selected Work · 2020 — 2026</span>
          </nav>
          <div className="pointer-events-auto flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>
        <div className="pixel-bg" aria-hidden="true" />
        {/* ═══════════════ HERO — Multi-layer parallax ═══════════════ */}
        <section id="top" className="min-h-[85svh] md:min-h-screen flex flex-col justify-start md:justify-end px-4 sm:px-6 md:px-12 lg:px-24 pb-12 sm:pb-16 md:pb-24 pt-32 sm:pt-32 relative overflow-hidden">
          {/* Decorative arc */}
          <motion.svg
            className="absolute top-[20%] right-[10%] w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] pointer-events-none hidden md:block"
            viewBox="0 0 200 200"
            style={{ y: layerBgY }}
          >
            <motion.circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.045)" strokeWidth="0.5"
              initial={{ pathLength: 0, rotate: -90 }} animate={{ pathLength: 0.75 }}
              transition={{ duration: 3, ease: easeApple, delay: 1.2 }}
              style={{ transformOrigin: "center" }} />
            <motion.circle cx="100" cy="100" r="60" fill="none" stroke="rgba(255,255,255,0.027)" strokeWidth="0.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 0.5 }}
              transition={{ duration: 2.5, ease: easeApple, delay: 1.6 }} />
          </motion.svg>

          <motion.div className="max-w-[1400px] mx-auto w-full relative z-10 flex flex-col flex-1" style={{ opacity: heroOpacity }}>
            {/* Corner coordinates */}
            <motion.div
              className="absolute top-0 right-0 text-[9px] font-sans text-white/27 text-right hidden md:block"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.8 }}
              style={{ y: layer1Y }}
            >
              <div className="tabular-nums">37.5079° N, 15.0830° E</div>
              <div className="mt-1">Catania, Sicilia</div>
            </motion.div>

            {/* Subtitle — slowest layer */}
            <motion.div style={{ y: layer1Y }}>
              <motion.div
                initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.2, ease: easeApple, delay: 0.2 }}
              >
                <span className="block text-[9px] sm:text-[10px] md:text-[11px] font-sans uppercase tracking-[0.35em] text-white/45 mb-6 sm:mb-8 md:mb-12">
                  Sviluppatore &amp; Music Producer
                </span>
              </motion.div>
            </motion.div>

            {/* Name — medium layer with stagger + blur */}
            <motion.div style={{ y: layer2Y, scale: heroScale }}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={nameContainer}
              >
                <motion.div
                  className="absolute inset-x-0 top-[40%] h-36 rounded-full bg-gradient-to-r from-violet-400/20 via-blue-400/10 to-indigo-400/15 blur-3xl pointer-events-none"
                  style={{ y: layer2Y, opacity: heroNameGlow }}
                />
                <motion.h1
                  className="font-serif text-[clamp(3rem,10vw,8rem)] leading-[0.9] tracking-[-0.04em] overflow-hidden"
                  style={{ y: heroNameY, scale: heroPulse, textShadow: heroNameShadow }}
                >
                  {heroNameFirst.map((letter, index) => (
                    <motion.span key={`first-${index}`} variants={nameLetter} className="inline-block">
                      {letter}
                    </motion.span>
                  ))}
                </motion.h1>
                <motion.h1
                  className="font-serif italic text-[clamp(3rem,10vw,8rem)] leading-[0.9] tracking-[-0.04em] text-white/100 overflow-hidden"
                  style={{ y: heroNameY, scale: heroPulse, textShadow: heroNameShadow }}
                >
                  {heroNameLast.map((letter, index) => (
                    <motion.span key={`last-${index}`} variants={nameLetter} className="inline-block">
                      {letter}
                    </motion.span>
                  ))}
                </motion.h1>
              </motion.div>
            </motion.div>

            {/* Animated horizontal rule */}
            <motion.div
              className="h-px max-w-[180px] my-8 md:my-12"
              style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.27), transparent)", transformOrigin: "left" }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease: easeApple, delay: 0.9 }}
            />

            {/* Tagline — fastest layer (closest to viewer) */}
            <motion.div style={{ y: layer3Y }}>
              <motion.p
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                style={{ x: heroTaglineX, y: heroTaglineY, opacity: heroTaglineOpacity }}
                className="font-sans text-[15px] md:text-[20px] leading-[1.7] text-white/81 max-w-full sm:max-w-[600px] font-light"
              >
                Costruisco soluzioni web per problemi reali e progetto strumenti
                digitali per l&apos;industria musicale.{" "}
                <span className="font-serif italic text-white/100">
                  Il codice è il mio strumento, il suono la mia tela.
                </span>
              </motion.p>
            </motion.div>

            {/* Status + scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: easeApple, delay: 1.4 }}
              className="mt-auto pt-16 md:pt-24 flex items-center justify-between"
              style={{ y: heroCtaY, opacity: heroCtaOpacity, scale: heroCtaScale }}
            >
              <div className="flex items-center gap-4 text-[10px] font-sans uppercase tracking-[0.3em] text-white/36">
                <span>Scorri</span>
                <motion.span className="block w-16 h-px bg-white/15 origin-left"
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ duration: 2, ease: easeApple, delay: 1.8 }} />
              </div>
              <motion.div
                className="hidden md:flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.2em] text-white/36"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 2 }}
              >
                <motion.div className="w-1.5 h-1.5 rounded-full bg-white/40"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }} />
                <span>Disponibile per progetti</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════ MARQUEE ═══════════════ */}
        <div className="border-y border-white/[0.04] overflow-hidden py-7">
          <motion.div className="flex gap-10 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 45, ease: "linear", repeat: Infinity }}>
            {[0, 1].map((copy) => (
              <span key={copy} className="flex items-center gap-10 text-[12px] font-sans uppercase tracking-[0.3em] text-white/36">
                {marqueeItems.map((item, idx) => (
                  <span key={`${copy}-${idx}`} className="flex items-center gap-10">
                    {item.style === "serif" ? (
                      <span className="font-serif italic normal-case text-white/72 text-[16px] tracking-normal">{item.text}</span>
                    ) : (
                      <span>{item.text}</span>
                    )}
                    <span className="text-white/14">◇</span>
                  </span>
                ))}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ═══════════════ SCROLL REVEAL ═══════════════ */}
        <ScrollRevealText />

        {/* ═══════════════ STUDIO ═══════════════ */}
        <section id="studio" className="px-6 md:px-12 py-32 md:py-48">
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...reveal}>
              <span className="block text-[11px] font-sans uppercase tracking-[0.3em] text-white/36 mb-6">01 — Studio</span>
            </motion.div>
            <motion.div {...revealDeep}>
              <motion.h2 variants={revealTextStrong} initial="initial" whileInView="whileInView" viewport={revealTextStrong.viewport} className="font-serif text-[clamp(2.8rem,7vw,6rem)] leading-[1.05] tracking-[-0.025em] mb-20 md:mb-28">
                Lo <span className="italic text-white/100">studio</span> &amp; il metodo.
              </motion.h2>
            </motion.div>
            <div className="grid md:grid-cols-12 gap-12 md:gap-24">
              <motion.div className="md:col-span-4" {...reveal}>
                <div className="aspect-[4/5] rounded-2xl border border-white/[0.05] bg-white/[0.036] backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute inset-0 flex flex-col justify-between p-6">
                    <div className="flex justify-between text-[9px] font-sans uppercase tracking-[0.3em] text-white/36">
                      <span>Plate · AC</span><span>MMXXVI</span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="font-serif italic text-[min(24vw,220px)] leading-none text-white/[0.27] select-none">A</div>
                    </div>
                    <div className="flex justify-between text-[9px] font-sans uppercase tracking-[0.3em] text-white/36">
                      <span>Catania</span><span className="tabular-nums">37.5079° N</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              <div className="md:col-span-7 md:col-start-6 space-y-16">
                {[
                  { num: "i.", text: <>Sono studente di <strong className="text-white/100 font-semibold">Ingegneria Informatica all&apos;Università di Catania</strong>. Quello che so fare davvero, però, l&apos;ho imparato costruendo: un approccio da autodidatta, fatto di tentativi e iterazione lucida.</> },
                  { num: "ii.", text: <>Da una parte progetto soluzioni web — front-end, back-end, gestionali — pensate per <strong className="text-white/100 font-semibold">risolvere problemi reali</strong>. Dall&apos;altra produco musica, suono più strumenti e studio l&apos;hardware audio dal suo lato circuitale.</> },
                  { num: "iii.", text: <>Il filo conduttore è uno solo: <em className="font-serif italic text-white/100">capire come funzionano le cose dentro</em>. Un&apos;API, un compressore, una catena di segnale. Tutto è un sistema che si può smontare, capire e rimettere insieme meglio.</> },
                ].map((p, i) => (
                  <motion.div key={p.num}
                    initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 1.2, ease: easeApple, delay: i * 0.12 }}>
                    <span className="block text-[11px] font-sans uppercase tracking-[0.3em] text-white/27 mb-3">{p.num}</span>
                    <p className="text-[18px] md:text-[22px] leading-[1.55] text-white/72 font-light">{p.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="hairline max-w-5xl mx-auto" />

        {/* ═══════════════ LAVORI — STICKY SCROLL ═══════════════ */}
        <section id="lavori" ref={targetRef} className={`relative ${isMobile ? "bg-black py-20" : "h-[400vh] bg-black"}`}>
          <div className={`${isMobile ? "relative" : "sticky top-0"} flex ${isMobile ? "flex-col" : "h-screen"} flex-col justify-center overflow-hidden`}>
            <div className="px-4 sm:px-6 md:px-12 pt-12 md:pt-20 pb-8 shrink-0">
              <div className="max-w-[1400px] mx-auto flex items-end justify-between">
                <div>
                  <motion.span className="block text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.3em] text-white/36 mb-3 md:mb-4"
                variants={revealLabel}
                initial="initial"
                whileInView="whileInView"
                viewport={revealLabel.viewport}
              >02 — Lavori selezionati</motion.span>
                  <motion.h2 className="font-serif text-[2rem] sm:text-[2.5rem] md:text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-[-0.025em]" {...revealDeep}>
                    Otto progetti, <span className="italic text-white/100">due discipline</span>.
                  </motion.h2>
                </div>
                <span className="hidden md:block text-[10px] font-sans uppercase tracking-[0.28em] text-white/36 tabular-nums">01 — 08</span>
              </div>
            </div>
            <div className={`${isMobile ? "flex flex-col gap-8 px-4 sm:px-6 md:px-12 py-12" : "flex-1 flex items-center overflow-hidden"}`}>
              <motion.div ref={containerRef} style={isDesktop ? { x: xSpring } : {}} className={`${isMobile ? "flex flex-col gap-8 w-full" : "flex gap-10 pl-6 md:pl-12 pr-[20vw] will-change-transform"}"}`}>
                {projectsData.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <div className="hairline max-w-5xl mx-auto" />

        {/* ═══════════════ COMPETENZE ═══════════════ */}
        <section id="competenze" className="px-4 sm:px-6 md:px-12 lg:px-24 py-16 sm:py-24 md:py-32 lg:py-48">
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...revealText}>
              <span className="block text-[9px] sm:text-[10px] md:text-[11px] font-sans uppercase tracking-[0.3em] text-white/36 mb-6">03 — Competenze</span>
            </motion.div>
            <motion.div {...revealDeep} className="mb-20">
              <motion.h2 variants={revealTextStrong} initial="initial" whileInView="whileInView" viewport={revealTextStrong.viewport} className="font-serif text-[2rem] sm:text-[2.8rem] md:text-[clamp(2.8rem,7vw,6rem)] leading-[1.05] tracking-[-0.025em]">
                Strumenti che uso <span className="italic text-white/100">tutti i giorni</span>.
              </motion.h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-16 md:gap-28">
              <div>
                <motion.div {...revealText}>
                  <div className="flex justify-between mb-8 text-[10px] font-sans uppercase tracking-[0.3em] text-white/36">
                    <span>Web &amp; Software</span><span className="tabular-nums">A — 04</span>
                  </div>
                </motion.div>
                {SKILLS_WEB.map(([name, detail], i) => (
                  <motion.div key={name}
                    initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.9, ease: easeApple, delay: i * 0.1 }}>
                    <div className="group flex items-baseline justify-between py-5 border-b border-white/[0.04] text-[14px] sm:text-[15px] md:text-[17px] hover:border-white/[0.1] transition-colors duration-500">
                      <span className="text-white/100 font-medium group-hover:text-white transition-colors duration-500">{name}</span>
                      <span className="text-[11px] sm:text-[12px] text-white/36 font-sans group-hover:text-white/72 transition-colors duration-500">{detail}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div>
                <motion.div {...reveal}>
                  <div className="flex justify-between mb-8 text-[10px] font-sans uppercase tracking-[0.3em] text-white/36">
                    <span>Audio &amp; Hardware</span><span className="tabular-nums">B — 04</span>
                  </div>
                </motion.div>
                {SKILLS_AUDIO.map(([name, detail], i) => (
                  <motion.div key={name}
                    initial={{ opacity: 0, x: 30, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.9, ease: easeApple, delay: i * 0.1 }}>
                    <div className="group flex items-baseline justify-between py-5 border-b border-white/[0.04] text-[14px] sm:text-[15px] md:text-[17px] hover:border-white/[0.1] transition-colors duration-500">
                      <span className="text-white/100 font-medium group-hover:text-white transition-colors duration-500">{name}</span>
                      <span className="text-[11px] sm:text-[12px] text-white/36 font-sans group-hover:text-white/72 transition-colors duration-500">{detail}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="hairline max-w-5xl mx-auto" />

        {/* ═══════════════ FOOTER ═══════════════ */}
        <footer className="px-4 sm:px-6 md:px-12 lg:px-24 pt-16 sm:pt-24 md:pt-32 lg:pt-48 pb-12 sm:pb-16 md:pb-20">
          <div className="max-w-[1400px] mx-auto">
            <motion.div {...reveal}>
              <span className="block text-[9px] sm:text-[10px] md:text-[11px] font-sans uppercase tracking-[0.3em] text-white/36 mb-6">04 — Contatti</span>
            </motion.div>
            <motion.div {...revealDeep}>
              <motion.h2 variants={revealTextStrong} initial="initial" whileInView="whileInView" viewport={revealTextStrong.viewport} className="font-serif text-[1.5rem] sm:text-[1.875rem] md:text-[clamp(2rem,6vw,4rem)] leading-[1.05] tracking-[-0.025em] mb-10">
                Hai un&apos;idea che <span className="italic text-white/100">vuole prendere forma?</span>
              </motion.h2>
            </motion.div>
            <motion.div {...reveal}>
              <motion.p variants={revealText} initial="initial" whileInView="whileInView" viewport={revealText.viewport} className="text-white/54 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[17px] max-w-full sm:max-w-[520px] leading-[1.8] font-light mb-14">
                Codice, suono, hardware — o tutto insieme. Scrivimi due righe, troviamo il modo migliore di partire.
              </motion.p>
            </motion.div>
            <motion.div {...reveal}>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                <motion.a href="mailto:alessiocava2407@gmail.com"
                  className="inline-flex items-center justify-center gap-3 bg-white text-black rounded-full px-8 py-4 text-[14px] font-semibold font-sans w-full sm:w-auto"
                  whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.4, ease: easeApple }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" />
                  </svg>Email
                </motion.a>
                <motion.a href="https://linktr.ee/prodd.ale" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-white/[0.072] text-white border border-white/[0.08] hover:bg-white/[0.144] hover:border-white/[0.15] rounded-full px-8 py-4 text-[14px] font-semibold font-sans w-full sm:w-auto transition-colors duration-500"
                  whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.4, ease: easeApple }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>Linktree
                </motion.a>
              </div>
            </motion.div>
            <div className="hairline mt-28 mb-10" />
            <motion.div {...reveal}>
              <div className="flex flex-col md:flex-row justify-between gap-4 text-[11px] font-sans text-white/27">
                <div className="flex items-center gap-3">
                  <span className="font-serif italic text-[17px] text-white/63">Alessio Cavallaro</span>
                  <span className="hidden md:inline">·</span>
                  <span className="uppercase tracking-[0.2em]">Catania, IT · 2026</span>
                </div>
                <a href="#top" className="uppercase tracking-[0.2em] hover:text-white/72 transition-colors duration-500">Torna su ↑</a>
              </div>
            </motion.div>
          </div>
        </footer>
      </main>
      <a href="#top" aria-label="Torna su" className="fixed bottom-6 right-6 z-50 icon-button pointer-events-auto">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 15l7-7 7 7" />
          <path d="M12 8v12" />
        </svg>
      </a>
    </>
  );
}

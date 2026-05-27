import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Controller MIDI Gestuale",
    subtitle: "Computer Vision × Musica",
    description:
      "Un controller che traduce i movimenti della mano, catturati tramite webcam, in segnali MIDI in tempo reale. Sviluppato in Python con MediaPipe e progettato per portare la gestualità fisica nel mondo della produzione musicale digitale.",
    tags: ["Python", "MediaPipe", "MIDI", "Computer Vision", "Real-time"],
    category: "bridge",
  },
  {
    title: "Piattaforme Web Professionali",
    subtitle: "New Garden B2B/B2C · CAI Sito Istituzionale",
    description:
      "Sviluppo completo di piattaforme web professionali: dalla piattaforma e-commerce B2B/B2C New Garden al sito istituzionale del CAI. Progetti che hanno richiesto architetture scalabili, UI curate e gestione di flussi complessi.",
    tags: ["HTML/CSS", "JavaScript", "PHP", "SQL", "LocalWP", "UI/UX"],
    category: "dev",
  },
  {
    title: "Producer Tools",
    subtitle: "Suite di Utility per Producer",
    description:
      "Una suite web completa di strumenti per la produzione musicale: calcolatori BPM, convertitori di tonalità, generatori di progressioni armoniche e utility per il mixing. Progettata da un producer per i producer.",
    tags: ["HTML", "JavaScript", "Web Audio API", "Teoria Musicale"],
    category: "audio",
  },
  {
    title: "Band Manager",
    subtitle: "Gestionale per Band",
    description:
      "Sito gestionale interno per l'organizzazione logistica della band: scalette, date, gestione brani, assegnazione strumenti e coordinamento prove. Un problema reale risolto con codice.",
    tags: ["HTML/CSS", "JavaScript", "PHP", "SQL", "CRUD"],
    category: "management",
  },
  {
    title: "Arrustuta",
    subtitle: "Logistica per Eventi di Gruppo",
    description:
      "Web app per la gestione in tempo reale di logistica e spese condivise per eventi di gruppo. Dalla lista della spesa al calcolo automatico dei debiti, tutto sincronizzato e accessibile da mobile.",
    tags: ["PHP", "SQL", "JavaScript", "Real-time", "Mobile-first"],
    category: "problem-solving",
  },
];

export default function Projects() {
  return (
    <section
      id="progetti"
      className="relative px-6 py-32 lg:py-40"
      style={{ zIndex: 1 }}
    >
      <div className="mx-auto max-w-5xl">
        {/* Section label */}
        <div className="section-animate mb-20 flex items-center gap-4">
          <span className="section-number">02</span>
          <div className="divider flex-1" />
          <span className="section-number">Progetti</span>
        </div>

        {/* Section intro */}
        <div className="section-animate mb-24 max-w-2xl">
          <h2 className="mb-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Selezione lavori
          </h2>
          <p className="text-base leading-relaxed text-neutral-400">
            Ogni progetto nasce da un&apos;esigenza reale — che sia un
            problema da automatizzare, un&apos;idea da prototipare o un ponte
            tra due discipline.
          </p>
        </div>

        {/* Projects grid — zigzag */}
        <div className="space-y-24 lg:space-y-32">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

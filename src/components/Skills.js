const skillCategories = [
  {
    title: "Web & Software",
    icon: "◆",
    accentClass: "text-cyan-400",
    dotClass: "bg-cyan-400",
    skills: [
      { name: "HTML / CSS", detail: "Semantico, responsive" },
      { name: "JavaScript", detail: "Vanilla, ES6+" },
      { name: "PHP", detail: "Back-end, API" },
      { name: "SQL", detail: "Database design" },
      { name: "Python", detail: "Scripting, CV" },
      { name: "LocalWP", detail: "WordPress dev" },
      { name: "UI/UX Design", detail: "Prototipazione" },
      { name: "Git", detail: "Version control" },
    ],
  },
  {
    title: "Audio & Hardware",
    icon: "♪",
    accentClass: "text-violet-400",
    dotClass: "bg-violet-400",
    skills: [
      { name: "Polistrumentista", detail: "Multi-strumento" },
      { name: "FL Studio", detail: "Produzione avanzata" },
      { name: "Ableton Live", detail: "Live performance" },
      { name: "Sound Design", detail: "Sintesi, campionamento" },
      { name: "Mixing", detail: "Bilanciamento, EQ" },
      { name: "Hardware Modding", detail: "Circuiti, saldatura" },
      { name: "Teoria Musicale", detail: "Armonia, arrangiamento" },
      { name: "MIDI", detail: "Protocollo, mapping" },
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="competenze"
      className="relative px-6 py-32 lg:py-40"
      style={{ zIndex: 1 }}
    >
      <div className="mx-auto max-w-5xl">
        {/* Section label */}
        <div className="section-animate mb-20 flex items-center gap-4">
          <span className="section-number">03</span>
          <div className="divider flex-1" />
          <span className="section-number">Competenze</span>
        </div>

        {/* Two columns */}
        <div className="grid gap-16 md:grid-cols-2 lg:gap-20">
          {skillCategories.map((category) => (
            <div key={category.title} className="section-animate">
              {/* Category header */}
              <div className="mb-8 flex items-center gap-3">
                <span className={`text-lg ${category.accentClass}`}>
                  {category.icon}
                </span>
                <h3 className="text-xl font-semibold tracking-tight text-white">
                  {category.title}
                </h3>
              </div>

              {/* Skills list */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="skill-item skill-pill rounded-xl px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-1 w-1 rounded-full ${category.dotClass} flex-shrink-0`}
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-neutral-200">
                          {skill.name}
                        </p>
                        <p className="text-xs text-neutral-400">
                          {skill.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

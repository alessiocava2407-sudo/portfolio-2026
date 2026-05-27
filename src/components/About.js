export default function About() {
  return (
    <section
      id="chi-sono"
      className="relative px-6 py-32 lg:py-40"
      style={{ zIndex: 1 }}
    >
      <div className="mx-auto max-w-3xl">
        {/* Section label */}
        <div className="section-animate mb-16 flex items-center gap-4">
          <span className="section-number">01</span>
          <div className="divider flex-1" />
          <span className="section-number">Chi Sono</span>
        </div>

        {/* Content */}
        <div className="section-animate space-y-8">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
            Dove il codice incontra
            <br />
            <span className="text-neutral-400">il suono.</span>
          </h2>

          <div className="space-y-6 text-base leading-[1.8] text-neutral-300 sm:text-lg">
            <p>
              Sono uno{" "}
              <span className="text-white">
                studente di Ingegneria Informatica
              </span>{" "}
              all&apos;Università di Catania con un approccio{" "}
              <span className="text-white">learning by doing</span>: ogni
              concetto teorico diventa un progetto concreto, ogni problema
              un&apos;occasione per costruire qualcosa di reale.
            </p>

            <p>
              Ho sviluppato il mio percorso da{" "}
              <span className="text-white">autodidatta</span> nello sviluppo
              web, partendo dalla curiosità per il funzionamento delle cose —
              dai circuiti elettronici alle architetture software — e arrivando
              a costruire piattaforme web complete, gestionali e strumenti
              digitali per risolvere problemi quotidiani.
            </p>

            <p>
              Parallelamente, la{" "}
              <span className="text-white">produzione musicale</span> è il mio
              secondo linguaggio. Polistrumentista e producer, lavoro con{" "}
              <span className="text-white">FL Studio</span> e{" "}
              <span className="text-white">Ableton</span>, progettando suoni e
              sperimentando con l&apos;hardware. Due mondi apparentemente
              distanti che condividono la stessa logica:{" "}
              <span className="text-neutral-300">
                analizzare, progettare, creare
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

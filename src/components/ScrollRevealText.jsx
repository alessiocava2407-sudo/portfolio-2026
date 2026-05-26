"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity }} className="text-white">
      {children}
    </motion.span>
  );
};

export default function ScrollRevealText() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 60%"]
  });

  const text =
    "Capire come funziona qualcosa dentro è la mia forma di rispetto verso quello che faccio. Smonto un circuito, una libreria, un compressore analogico, un'API. Li rimetto insieme meglio, o almeno con più lucidità. Codice e suono, per me, sono lo stesso gesto: dare forma a un'intenzione.";
  const words = text.split(" ");

  return (
    <section ref={containerRef} className="relative min-h-[200vh] bg-transparent">
      <div className="sticky top-0 h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="max-w-[900px] mx-auto w-full">
          <p className="text-[1.3rem] sm:text-[1.8rem] md:text-[2.2rem] lg:text-[2.5rem] font-light leading-[1.6] font-sans text-white/10 tracking-tight">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return (
                <span key={i}>
                  <Word progress={scrollYProgress} range={[start, end]}>
                    {word}
                  </Word>
                  {" "}
                </span>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
}

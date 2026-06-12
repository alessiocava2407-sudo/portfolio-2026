"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

import { Home, Zap, Briefcase, Wrench } from "lucide-react";

// Dati per i link
const links = [
  { title: "Home", href: "#top", icon: Home },
  { title: "Studio", href: "#studio", icon: Zap },
  { title: "Lavori", href: "#lavori", icon: Briefcase },
  { title: "Competenze", href: "#competenze", icon: Wrench },
];

function DockIcon({ mouseX, title, href, icon: Icon }) {
  const ref = useRef(null);

  // Distanza dall'icona al cursore
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Scale basata sulla distanza (bell curve)
  const widthTransform = useTransform(distance, [-150, 0, 150], [45, 90, 45]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [45, 90, 45]);

  // Molle fisiche per fluidità
  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  const [hovered, setHovered] = useState(false);

  return (
    <a href={href} className="relative group">
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="aspect-square rounded-full bg-white/[0.08] flex items-center justify-center relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
      >
        <Icon size={20} className="text-white/80" />
      </motion.div>

      {/* Tooltip */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 10, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 2, x: "-50%" }}
          className="absolute left-1/2 -translate-x-1/2 -top-10 px-3 py-1.5 whitespace-pre rounded-md bg-white border border-gray-200 text-neutral-900 text-xs shadow-xl"
        >
          {title}
        </motion.div>
      )}
    </a>
  );
}

export default function FloatingDock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-4 md:bottom-8 inset-x-0 z-[100] flex justify-center pointer-events-none">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto"
      >
        <div
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="flex items-end gap-2 md:gap-3 h-[70px] md:h-[90px] px-3 md:px-4 pb-2 md:pb-3 rounded-[32px] bg-gradient-to-b from-white/[0.05] to-black/80 backdrop-blur-[40px] border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_20px_40px_rgba(0,0,0,0.8)] ring-1 ring-white/[0.05]"
        >
          {links.map((link) => (
            <DockIcon key={link.title} mouseX={mouseX} {...link} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

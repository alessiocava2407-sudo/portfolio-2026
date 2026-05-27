"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorScale = useMotionValue(1);
  const cursorOpacity = useMotionValue(1);

  const x = useSpring(cursorX, { stiffness: 380, damping: 28 });
  const y = useSpring(cursorY, { stiffness: 380, damping: 28 });
  const scale = useSpring(cursorScale, { stiffness: 250, damping: 18 });
  const opacity = useSpring(cursorOpacity, { stiffness: 250, damping: 18 });

  useEffect(() => {
    const onMove = (event) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      cursorOpacity.set(1);
    };

    const onPointerOver = (event) => {
      if (event.target.closest("a, button, .card-glow, .btn-secondary, .btn-ghost, .footer-link, .link-hover")) {
        cursorScale.set(1.8);
      }
    };

    const onPointerOut = (event) => {
      if (event.target.closest("a, button, .card-glow, .btn-secondary, .btn-ghost, .footer-link, .link-hover")) {
        cursorScale.set(1);
      }
    };

    const onLeave = () => {
      cursorOpacity.set(0);
    };

    const onEnter = () => {
      cursorOpacity.set(1);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("pointerover", onPointerOver);
    window.addEventListener("pointerout", onPointerOut);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
    };
  }, [cursorScale, cursorX, cursorY, cursorOpacity]);

  return (
    <motion.div
      className="custom-cursor"
      style={{ x, y, scale, opacity }}
      aria-hidden="true"
    />
  );
}

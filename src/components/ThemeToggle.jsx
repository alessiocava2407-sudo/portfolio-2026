"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [inverted, setInverted] = useState(false);

  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("inverted");
    const isInv = saved === "true";
    setInverted(isInv);
    if (typeof document !== "undefined") document.documentElement.classList.toggle("inverted", isInv);
  }, []);

  function toggle() {
    const next = !inverted;
    setInverted(next);
    if (typeof window !== "undefined") localStorage.setItem("inverted", next ? "true" : "false");
    if (typeof document !== "undefined") document.documentElement.classList.toggle("inverted", next);
  }

  return (
    <button
      onClick={toggle}
      aria-pressed={inverted}
      aria-label="Toggle tema invertito"
       className="ml-4 icon-button"
    >
      {inverted ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
      )}
    </button>
  );
}

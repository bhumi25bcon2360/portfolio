"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme";

function subscribeToHtmlClass(update: () => void) {
  const observer = new MutationObserver(update);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

/**
 * THEME TOGGLE ("paper" ↔ "chalkboard")
 * Toggles the `dark` class on <html>, which swaps the colour variables in
 * globals.css, then saves the choice in localStorage for the next visit.
 */
export function ChalkSwitch() {
  const chalkboard = useSyncExternalStore(
    subscribeToHtmlClass,
    () => document.documentElement.classList.contains("dark"),
    () => true,
  );

  const flip = () => {
    const next = !chalkboard;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={flip}
      aria-label={chalkboard ? "Switch to paper (light) theme" : "Switch to chalkboard (dark) theme"}
      className="shrink-0 -rotate-3 rounded-md border-2 border-dashed border-pencil/50 bg-card px-2 py-1 sm:px-3 font-hand text-lg leading-none transition-transform hover:rotate-0"
    >
      {chalkboard ? "☀" : "☾"}
      {/* The word is hidden on phones so all five tabs fit */}
      <span className="hidden sm:inline">{chalkboard ? " paper" : " chalk"}</span>
    </button>
  );
}

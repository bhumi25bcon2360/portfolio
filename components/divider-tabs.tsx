"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { bhumi, tabs } from "@/lib/notebook";
import { ChalkSwitch } from "@/components/chalk-switch";

const TAB_COLORS = ["bg-note-yellow", "bg-note-pink", "bg-note-mint", "bg-note-blue", "bg-note-yellow"];

/** Navigation styled as coloured notebook divider tabs; the current section's tab drops down. */
export function DividerTabs() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const watcher = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    tabs.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) watcher.observe(el);
    });
    return () => watcher.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-start justify-between gap-3 px-3 sm:px-6">
        <a href="#home" className="hidden self-center font-hand text-3xl font-bold sm:block">
          {bhumi.first}&apos;s notebook
        </a>
        <nav aria-label="Sections" className="flex min-w-0 gap-1 overflow-x-auto sm:gap-1.5">
          {tabs.map((t, i) => {
            const on = active === t.id;
            return (
              <motion.a
                key={t.id}
                href={`#${t.id}`}
                animate={{ height: on ? 46 : 36 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                aria-current={on ? "true" : undefined}
                className={`flex shrink-0 items-end rounded-b-lg px-2.5 pb-1.5 text-xs font-bold shadow-sm sm:px-4 sm:text-sm ${
                  TAB_COLORS[i]
                } ${on ? "text-ink" : "text-pencil"}`}
              >
                {t.label}
              </motion.a>
            );
          })}
        </nav>
        <div className="self-center">
          <ChalkSwitch />
        </div>
      </div>
    </header>
  );
}

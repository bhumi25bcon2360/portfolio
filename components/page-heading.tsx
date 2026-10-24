"use client";

import { motion } from "motion/react";

/** Handwritten page number + heading with a wavy underline that draws in. */
export function PageHeading({ page, children }: { page: number; children: React.ReactNode }) {
  return (
    <div className="mb-14">
      <p className="font-hand text-2xl text-rose">page {page}</p>
      <h2 className="chalk relative inline-block text-4xl font-black tracking-tight sm:text-5xl">
        {children}
        <svg
          viewBox="0 0 300 16"
          preserveAspectRatio="none"
          className="absolute -bottom-4 left-0 h-4 w-full text-blue"
          aria-hidden
        >
          <motion.path
            d="M2 9 C 30 2, 50 15, 80 8 S 130 2, 160 9 S 220 15, 250 7 S 285 4, 298 9"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
        </svg>
      </h2>
    </div>
  );
}

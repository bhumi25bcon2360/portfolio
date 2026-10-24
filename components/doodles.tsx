"use client";

import { motion, type MotionValue } from "motion/react";

type DoodleProps = { className?: string; draw?: MotionValue<number> | number; delay?: number };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Wraps a pencil path so it "draws" itself: on load (delay) or tied to a scroll value. */
function DrawnPath({
  d,
  draw,
  delay = 0,
}: {
  d: string;
  draw?: MotionValue<number> | number;
  delay?: number;
}) {
  if (draw !== undefined) return <motion.path d={d} {...stroke} style={{ pathLength: draw }} />;
  return (
    <motion.path
      d={d}
      {...stroke}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.2, delay, ease: "easeInOut" }}
    />
  );
}

export function DoodleStar({ className, draw, delay }: DoodleProps) {
  return (
    <svg viewBox="0 0 50 50" className={className} aria-hidden>
      <DrawnPath
        d="M25 4 L31 19 L47 20 L34 30 L39 46 L25 37 L11 46 L16 30 L3 20 L19 19 Z"
        draw={draw}
        delay={delay}
      />
    </svg>
  );
}

export function DoodleSpiral({ className, draw, delay }: DoodleProps) {
  return (
    <svg viewBox="0 0 50 50" className={className} aria-hidden>
      <DrawnPath
        d="M25 25 m0 -2 a2 2 0 1 1 -2 2 a5 5 0 1 1 5 5 a9 9 0 1 1 -9 -9 a13 13 0 1 1 13 13 a17 17 0 1 1 -17 -17"
        draw={draw}
        delay={delay}
      />
    </svg>
  );
}

export function DoodleBulb({ className, draw, delay }: DoodleProps) {
  return (
    <svg viewBox="0 0 50 60" className={className} aria-hidden>
      <DrawnPath
        d="M18 40 C 8 32, 8 12, 25 8 C 42 12, 42 32, 32 40 L 32 46 L 18 46 Z M19 51 L31 51 M21 56 L29 56 M25 2 L25 -2 M8 12 L4 9 M42 12 L46 9"
        draw={draw}
        delay={delay}
      />
    </svg>
  );
}

export function DoodleArrow({ className, draw, delay }: DoodleProps) {
  return (
    <svg viewBox="0 0 80 60" className={className} aria-hidden>
      <DrawnPath d="M5 8 C 30 0, 60 15, 58 48 M46 38 L58 50 L68 36" draw={draw} delay={delay} />
    </svg>
  );
}

/** A loose hand-drawn oval, used to circle a word. */
export function DoodleCircle({ className, draw, delay }: DoodleProps) {
  return (
    <svg viewBox="0 0 220 90" preserveAspectRatio="none" className={className} aria-hidden>
      <DrawnPath
        d="M200 22 C 170 2, 40 0, 14 30 C -6 58, 60 88, 130 84 C 200 80, 226 46, 196 22 C 180 12, 150 8, 120 9"
        draw={draw}
        delay={delay}
      />
    </svg>
  );
}

/** Tick inside a checkbox. */
export function DoodleTick({ className, draw }: DoodleProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <DrawnPath d="M4 13 L10 19 L21 5" draw={draw} />
    </svg>
  );
}

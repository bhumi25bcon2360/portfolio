"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * The red margin line of the notebook, plus a pencil squiggle beside it that
 * draws itself as you scroll down the page (desktop only).
 */
export function MarginScribble() {
  const { scrollYProgress } = useScroll();
  const drawn = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <div aria-hidden className="pointer-events-none fixed inset-y-0 left-10 z-0 hidden xl:block">
      <div className="absolute inset-y-0 left-0 w-0.5 bg-margin" />
      <svg
        className="absolute top-20 -left-7 h-[calc(100%-6rem)] w-6"
        viewBox="0 0 24 1000"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M12 0 C 2 40, 22 80, 12 120 S 2 200, 12 240 S 22 320, 12 360 S 2 440, 12 480 S 22 560, 12 600 S 2 680, 12 720 S 22 800, 12 840 S 2 920, 12 1000"
          fill="none"
          stroke="var(--blue)"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: drawn }}
        />
      </svg>
    </div>
  );
}

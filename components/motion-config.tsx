"use client";

import { MotionConfig } from "motion/react";

// Animations honour the visitor's "reduce motion" system setting.
export function ReducedMotion({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { bhumi } from "@/lib/notebook";
import { DoodleArrow, DoodleBulb, DoodleCircle, DoodleSpiral, DoodleStar } from "@/components/doodles";

/**
 * Cover page. Scrolling tips the "page" back in 3D and lifts it away (like turning
 * a notebook page), while the doodles around it drift at different speeds.
 */
export function CoverPage() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const tipBack = useTransform(scrollYProgress, [0, 1], [0, 35]);
  const lift = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const fade = useTransform(scrollYProgress, [0.4, 1], [1, 0]);
  const fast = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const slow = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-svh items-center justify-center px-4 pt-24 pb-16"
    >
      <motion.div style={{ y: fast }} className="absolute top-28 left-[8%] text-rose">
        <DoodleStar className="size-12 sm:size-16" delay={1.4} />
      </motion.div>
      <motion.div style={{ y: slow }} className="absolute right-[7%] bottom-24 text-blue">
        <DoodleSpiral className="size-14 sm:size-20" delay={1.6} />
      </motion.div>
      <motion.div style={{ y: fast }} className="absolute top-32 right-[12%] hidden text-pencil sm:block">
        <DoodleBulb className="size-16" delay={1.8} />
      </motion.div>

      <div style={{ perspective: 1200 }} className="w-full max-w-3xl">
        <motion.div
          style={{ rotateX: tipBack, y: lift, opacity: fade, transformOrigin: "top center" }}
          className="relative rounded-sm bg-card px-6 py-12 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.35)] sm:px-14 sm:py-16"
        >
          <span className="tape -top-3 left-8 -rotate-6" />
          <span className="tape -top-3 right-8 rotate-6" />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="chalk font-hand text-3xl text-pencil sm:text-4xl"
          >
            Hi! My name is…
          </motion.p>

          <h1 className="chalk mt-3 text-6xl leading-none font-black tracking-tight sm:text-8xl">
            <span className="relative inline-block">
              {bhumi.first}
              <DoodleCircle
                className="absolute -inset-x-6 -inset-y-4 h-[calc(100%+2rem)] w-[calc(100%+3rem)] text-rose"
                delay={0.6}
              />
            </span>{" "}
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-block"
            >
              {bhumi.name.split(" ")[1]}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-8 max-w-xl text-lg text-pencil sm:text-xl"
          >
            {bhumi.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="rounded-md bg-blue px-6 py-3 font-bold text-white shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5 dark:text-paper"
            >
              Flip to my projects
            </a>
            <a
              href="#contact"
              className="font-hand text-2xl underline decoration-rose decoration-wavy underline-offset-4"
            >
              or pass me a note
            </a>
          </motion.div>

          <div className="mt-10 flex items-end gap-2 text-pencil">
            <DoodleArrow className="h-12 w-16 text-rose" delay={1.5} />
            <span className="font-hand text-xl">keep scrolling, there&apos;s more!</span>
          </div>

          <p className="mt-6 text-right font-hand text-lg text-pencil">
            {bhumi.uni} · {bhumi.batch}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

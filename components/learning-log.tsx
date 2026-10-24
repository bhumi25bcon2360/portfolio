"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { learningLog } from "@/lib/notebook";
import { PageHeading } from "@/components/page-heading";

/** Learning log: a dashed pencil trail is drawn down the page as you scroll through it. */
export function LearningLog() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 20 });

  return (
    <section aria-label="Learning log" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-3xl px-5 xl:pl-20">
        <PageHeading page={4}>Learning log</PageHeading>

        <div ref={ref} className="relative pl-14">
          <svg
            className="absolute top-0 left-2 h-full w-8 text-rose"
            viewBox="0 0 32 600"
            preserveAspectRatio="none"
            aria-hidden
          >
            <motion.path
              d="M16 0 C 4 60, 28 120, 16 180 S 4 300, 16 360 S 28 480, 16 600"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="1 0"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: draw }}
            />
          </svg>

          <ol className="space-y-12">
            {learningLog.map((item, i) => (
              <motion.li
                key={item.entry}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <span className="absolute top-1 -left-[2.85rem] grid size-6 place-items-center rounded-full border-2 border-rose bg-paper font-hand text-sm font-bold">
                  {i + 1}
                </span>
                <p className="font-hand text-2xl text-blue">{item.date}</p>
                <p className="chalk text-lg">{item.entry}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

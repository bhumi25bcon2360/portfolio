"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { checklists } from "@/lib/notebook";
import { PageHeading } from "@/components/page-heading";
import { DoodleTick } from "@/components/doodles";

/** A checklist row; its tick is drawn by the scroll position (later rows tick later). */
function Row({
  label,
  order,
  total,
  progress,
}: {
  label: string;
  order: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = (order / total) * 0.75;
  const draw = useTransform(progress, [start, start + 0.12], [0, 1]);
  return (
    <li className="flex items-center gap-3 py-1">
      <span className="relative grid size-6 shrink-0 place-items-center rounded-sm border-2 border-ink/70">
        <DoodleTick className="absolute -top-1.5 -right-1.5 size-7 text-rose" draw={draw} />
      </span>
      <span className="text-base leading-8">{label}</span>
    </li>
  );
}

export function Checklist() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const total = checklists.reduce((sum, c) => sum + c.items.length, 0);
  let order = 0;

  return (
    <section id="skills" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-5xl px-5 xl:pl-20">
        <PageHeading page={2}>Skills checklist</PageHeading>

        <div ref={ref} className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {checklists.map((list, i) => (
            <motion.div
              key={list.heading}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08 }}
            >
              <h3 className="chalk font-hand text-3xl font-bold text-blue">{list.heading}</h3>
              <ul className="mt-2">
                {list.items.map((item) => (
                  <Row key={item} label={item} order={order++} total={total} progress={scrollYProgress} />
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

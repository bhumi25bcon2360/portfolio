"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { bhumi } from "@/lib/notebook";
import { PageHeading } from "@/components/page-heading";

/** A phrase that gets swiped with a highlighter when it scrolls into view. */
function Highlight({ children }: { children: string }) {
  return (
    <motion.mark
      initial={{ backgroundSize: "0% 100%" }}
      whileInView={{ backgroundSize: "100% 100%" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="rounded-sm bg-no-repeat px-0.5 text-inherit"
      style={{ backgroundImage: "linear-gradient(var(--hl), var(--hl))", backgroundColor: "transparent" }}
    >
      {children}
    </motion.mark>
  );
}

export function DearDiary() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // The clipped photo card swings slightly and drifts slower than the page.
  const swing = useTransform(scrollYProgress, [0, 1], [6, -4]);
  const drift = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const facts = [
    ["Course", "B.Tech CSE"],
    ["Batch", bhumi.batch],
    ["Roll no.", bhumi.roll],
    ["City", "Jaipur"],
  ];

  return (
    <section ref={ref} id="about" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-5xl px-5 xl:pl-20">
        <PageHeading page={1}>Dear diary, about me</PageHeading>

        <div className="grid items-start gap-14 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          {/* Photo / initials card held by a paper clip */}
          <motion.div style={{ rotate: swing, y: drift }} className="relative mx-auto w-full max-w-[16rem]">
            <svg viewBox="0 0 30 70" className="absolute -top-8 left-8 z-10 h-16 w-7 text-pencil" aria-hidden>
              <path
                d="M10 60 V 12 a6 6 0 0 1 12 0 V 55 a9 9 0 0 1 -18 0 V 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <div className="bg-card p-3 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.4)]">
              <div className="relative aspect-[4/5] overflow-hidden bg-note-blue">
                {bhumi.photo ? (
                  <Image
                    src={bhumi.photo}
                    alt={`Photo of ${bhumi.name}`}
                    fill
                    sizes="256px"
                    className="object-cover"
                  />
                ) : (
                  <div className="grid h-full place-items-center">
                    <span className="font-hand text-8xl font-bold text-blue" aria-hidden>
                      {bhumi.initials}
                    </span>
                  </div>
                )}
              </div>
              <p className="mt-2 text-center font-hand text-2xl">{bhumi.name}</p>
            </div>
          </motion.div>

          <div>
            <p className="chalk text-xl leading-[2rem] sm:text-2xl sm:leading-[2.5rem]">
              {bhumi.intro.map((part, i) =>
                part.mark ? <Highlight key={i}>{part.text}</Highlight> : <span key={i}>{part.text}</span>,
              )}
            </p>

            <dl className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {facts.map(([k, v], i) => (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, y: 16, rotate: 0 }}
                  whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 2 : -2 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="border-2 border-dashed border-pencil/40 bg-card p-3"
                >
                  <dt className="font-hand text-lg text-pencil">{k}</dt>
                  <dd className="font-bold">{v}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

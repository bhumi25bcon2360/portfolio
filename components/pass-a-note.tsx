"use client";

import { motion } from "motion/react";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { bhumi } from "@/lib/notebook";
import { PageHeading } from "@/components/page-heading";

/** Contact details written on an index card that unfolds into view. */
export function PassANote() {
  const rows = [
    { Icon: Mail, label: "email", value: bhumi.email, href: `mailto:${bhumi.email}` },
    { Icon: Github, label: "github", value: bhumi.github.replace("https://", ""), href: bhumi.github },
    { Icon: Linkedin, label: "linkedin", value: "say hi on LinkedIn", href: bhumi.linkedin },
  ].filter((r) => r.href);

  return (
    <section id="contact" className="relative pt-28 pb-14 sm:pt-36">
      <div className="mx-auto max-w-3xl px-5 xl:pl-20">
        <PageHeading page={5}>Pass me a note</PageHeading>

        <div style={{ perspective: 1000 }}>
          <motion.div
            initial={{ rotateX: -80, opacity: 0 }}
            whileInView={{ rotateX: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 70, damping: 14 }}
            style={{ transformOrigin: "top center" }}
            className="relative rotate-1 bg-card shadow-[0_20px_40px_-20px_rgb(0_0_0/0.45)]"
          >
            <div className="border-b-2 border-rose/70 px-6 pt-6 pb-3 sm:px-8">
              <p className="font-hand text-3xl">To: you · From: {bhumi.first}</p>
            </div>
            <div className="px-6 py-4 sm:px-8">
              <p className="leading-8 text-pencil">
                Want to talk about a project, a study group or an idea? Pick any line below. I read
                everything.
              </p>
              <ul className="mt-2">
                {rows.map(({ Icon, label, value, href }) => (
                  <li key={label} className="border-b border-rule">
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="group flex items-center gap-3 py-3"
                    >
                      <Icon size={18} className="shrink-0 text-blue" />
                      <span className="w-20 shrink-0 font-hand text-xl text-pencil">{label}</span>
                      <span className="min-w-0 font-bold break-all group-hover:underline">{value}</span>
                    </a>
                  </li>
                ))}
                <li className="flex items-center gap-3 py-3">
                  <MapPin size={18} className="shrink-0 text-blue" />
                  <span className="w-20 shrink-0 font-hand text-xl text-pencil">city</span>
                  <span className="font-bold">{bhumi.city}</span>
                </li>
              </ul>
              <p className="mt-4 text-right font-hand text-3xl text-rose">– {bhumi.first} ✎</p>
            </div>
          </motion.div>
        </div>

        <p className="mt-16 text-center font-hand text-xl text-pencil">
          {bhumi.name} · {bhumi.uni} · roll {bhumi.roll}
        </p>
      </div>
    </section>
  );
}

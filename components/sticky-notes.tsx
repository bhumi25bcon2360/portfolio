"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { allTech, notes, type Note } from "@/lib/notebook";
import { PageHeading } from "@/components/page-heading";

const NOTE_COLORS = ["bg-note-yellow", "bg-note-pink", "bg-note-mint", "bg-note-blue", "bg-note-yellow"];
const TILTS = [-2.5, 1.8, -1.2, 2.4, -1.8];

function StickyNote({ note }: { note: Note }) {
  const i = notes.indexOf(note);
  return (
    <motion.li
      layout
      // Each note drops onto the page with a little wobble
      initial={{ opacity: 0, y: -50, rotate: TILTS[i] * 3 }}
      animate={{ opacity: 1, y: 0, rotate: TILTS[i] }}
      exit={{ opacity: 0, scale: 0.85, rotate: 0 }}
      whileHover={{ rotate: 0, y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 160, damping: 14 }}
      className={`relative flex flex-col p-6 pt-8 shadow-[0_14px_30px_-16px_rgb(0_0_0/0.45)] ${NOTE_COLORS[i]}`}
    >
      <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2" />
      <p className="font-hand text-xl text-pencil">note #{i + 1}</p>
      <h3 className="chalk text-xl leading-snug font-extrabold">{note.title}</h3>
      <p className="mt-2 text-sm">{note.gist}</p>
      <ul className="mt-3 space-y-1 font-hand text-xl leading-6">
        {note.notes.map((n) => (
          <li key={n}>– {n}</li>
        ))}
      </ul>
      <p className="mt-4 text-xs font-bold tracking-wide text-pencil uppercase">{note.stack.join(" · ")}</p>
      {(note.repo || note.live) && (
        <div className="mt-auto flex gap-4 pt-5 text-sm font-bold">
          {note.repo && (
            <a
              href={note.repo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 underline decoration-2 underline-offset-4 hover:text-blue"
            >
              <Github size={15} /> Code
            </a>
          )}
          {note.live && (
            <a
              href={note.live}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 underline decoration-2 underline-offset-4 hover:text-blue"
            >
              <ExternalLink size={15} /> Live app
            </a>
          )}
        </div>
      )}
    </motion.li>
  );
}

export function StickyNotes() {
  const [search, setSearch] = useState("");
  const [tech, setTech] = useState<string | null>(null);

  /*
   * SEARCH + FILTER, step by step:
   * 1. `search` and `tech` live in React state (useState).
   * 2. Typing or clicking a tag updates the state, so React re-renders.
   * 3. notes.filter() keeps a note when its title OR one of its technologies
   *    contains the search text, AND (if a tag is picked) it uses that technology.
   */
  const term = search.trim().toLowerCase();
  const visible = notes.filter((n) => {
    const matchesSearch =
      term === "" ||
      n.title.toLowerCase().includes(term) ||
      n.stack.some((s) => s.toLowerCase().includes(term));
    const matchesTag = tech === null || n.stack.includes(tech);
    return matchesSearch && matchesTag;
  });

  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 xl:pl-20">
        <PageHeading page={3}>Project sticky notes</PageHeading>

        <div className="max-w-2xl">
          <label className="block">
            <span className="font-hand text-2xl text-pencil">Looking for something? Write it here:</span>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Python, Quiz, Book…"
              aria-label="Search projects by name or technology"
              className="chalk mt-1 w-full border-b-2 border-dashed border-ink/40 bg-transparent py-2 font-hand text-3xl outline-none placeholder:text-pencil/50 focus:border-blue"
            />
          </label>

          <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter by technology">
            {[null, ...allTech].map((t) => {
              const on = tech === t;
              return (
                <button
                  key={t ?? "all"}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setTech(t)}
                  className={`rounded-full border-2 px-3 py-1 text-sm font-bold transition-colors ${
                    on
                      ? "border-blue bg-blue text-white dark:text-paper"
                      : "border-ink/25 bg-card hover:border-blue"
                  }`}
                >
                  {t ?? "All notes"}
                </button>
              );
            })}
          </div>
          <p className="mt-3 font-hand text-xl text-pencil" aria-live="polite">
            showing {visible.length} of {notes.length} notes
          </p>
        </div>

        <motion.ul layout className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((n) => (
              <StickyNote key={n.id} note={n} />
            ))}
          </AnimatePresence>
        </motion.ul>

        {visible.length === 0 && (
          <div className="mt-4 max-w-md -rotate-1 border-2 border-dashed border-rose/60 bg-card p-8">
            <p className="font-hand text-3xl">Hmm, no projects match that.</p>
            <p className="mt-1 text-sm text-pencil">Try “Python”, “Quiz” or “Book”, or clear the search.</p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setTech(null);
              }}
              className="mt-4 font-hand text-2xl text-blue underline decoration-wavy underline-offset-4"
            >
              erase &amp; show all
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

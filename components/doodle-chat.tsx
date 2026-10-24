"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PencilLine, SendHorizontal, X } from "lucide-react";
import { bhumi, doodleBot, doodleQuestions } from "@/lib/notebook";

type Line = { who: "visitor" | "doodle"; says: string; error?: boolean };

const ERROR_TEXT = "Sorry, I couldn't reach the AI right now. Please try again in a moment.";

export function DoodleChat() {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState<Line[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [chat, busy]);

  /**
   * CHATBOT (browser side): post the conversation to /api/chat.
   * Our server route holds the Gemini key and returns { answer }.
   * If the request fails for any reason we show a friendly error line instead.
   */
  async function send(text: string) {
    const says = text.trim();
    if (!says || busy) return;
    const updated: Line[] = [...chat, { who: "visitor", says }];
    setChat(updated);
    setDraft("");
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat: updated.filter((l) => !l.error) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || typeof data.answer !== "string") throw new Error(data.error);
      setChat([...updated, { who: "doodle", says: data.answer }]);
    } catch {
      setChat([...updated, { who: "doodle", says: ERROR_TEXT, error: true }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : `Chat with ${doodleBot.name}`}
        whileHover={{ rotate: -6 }}
        className="fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-md border-2 border-ink bg-note-yellow px-4 py-3 font-hand text-2xl leading-none shadow-[4px_4px_0_var(--ink)] sm:right-6 sm:bottom-6"
      >
        {open ? <X size={20} /> : <PencilLine size={20} />}
        {open ? "close" : `ask ${doodleBot.name}`}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={`${doodleBot.name} chat`}
            initial={{ opacity: 0, y: 30, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: 30, rotate: 3 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="fixed inset-x-3 bottom-22 z-50 flex h-[min(34rem,calc(100svh-10rem))] flex-col border-2 border-ink bg-paper shadow-[6px_6px_0_var(--ink)] sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-[23rem]"
            style={{
              backgroundImage:
                "linear-gradient(transparent calc(1.75rem - 1px), var(--rule) calc(1.75rem - 1px))",
              backgroundSize: "100% 1.75rem",
            }}
          >
            <div className="flex items-center justify-between border-b-2 border-ink bg-card px-4 py-3">
              <div>
                <p className="font-hand text-3xl leading-none font-bold">{doodleBot.name} ✎</p>
                <p className="text-xs text-pencil">{doodleBot.note} · Gemini</p>
              </div>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {chat.length === 0 && (
                <div>
                  <p className="font-hand text-2xl leading-7">
                    Hi! I&apos;m {doodleBot.name}. Ask me anything about {bhumi.first}&apos;s projects and
                    skills.
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {doodleQuestions.map((q) => (
                      <li key={q}>
                        <button
                          type="button"
                          onClick={() => send(q)}
                          className="text-left text-sm font-bold text-blue underline decoration-dotted underline-offset-4 hover:decoration-solid"
                        >
                          ✎ {q}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {chat.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={line.who === "visitor" ? "flex justify-end" : "flex"}
                >
                  <p
                    className={`max-w-[85%] px-3 py-2 text-sm whitespace-pre-wrap shadow-sm ${
                      line.who === "visitor"
                        ? "-rotate-1 bg-note-blue"
                        : line.error
                          ? "rotate-1 border-2 border-dashed border-rose bg-note-pink"
                          : "rotate-1 bg-note-yellow"
                    }`}
                  >
                    {line.says}
                  </p>
                </motion.div>
              ))}

              {busy && <p className="font-hand text-xl text-pencil">{doodleBot.name} is scribbling…</p>}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(draft);
              }}
              className="flex items-center gap-2 border-t-2 border-ink bg-card p-3"
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Write your question…"
                aria-label="Your question"
                maxLength={500}
                className="min-w-0 flex-1 border-b-2 border-dashed border-ink/40 bg-transparent px-1 py-1.5 text-base outline-none placeholder:text-pencil/60 focus:border-blue sm:text-sm"
              />
              <button
                type="submit"
                disabled={busy || !draft.trim()}
                aria-label="Send"
                className="grid size-10 shrink-0 place-items-center rounded-md bg-blue text-white disabled:opacity-40 dark:text-paper"
              >
                <SendHorizontal size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

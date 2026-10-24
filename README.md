# Bhumi Shah: Portfolio

Personal portfolio of **Bhumi Shah**, B.Tech CSE student at JECRC University, Jaipur (batch 2025, roll 25BCON2360).
Built for the internal assessment: Home, About Me, Skills, Projects, Contact and an AI chatbot.

**Live site:** _add the Vercel link here after deploying_

## Design

**Notebook**: ruled notebook paper in light mode and a green chalkboard in dark mode, with handwritten notes, doodles, washi tape and sticky notes.
Fonts: Nunito + Caveat. Dark-first with a light theme, fully responsive, and it respects *Reduce motion*.

## Technologies

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Motion (`motion/react`) for scroll-driven animation (`useScroll`, `useTransform`, `useSpring`)
- Google Gemini API (`@google/genai`) for the chatbot, called server-side only
- lucide-react icons
- Deployed on Vercel

## Features

- **Divider-tab navigation**: coloured notebook tabs; the tab for the section you're reading drops down.
- **Margin scribble**: a pencil squiggle beside the red margin line that draws itself as you scroll (desktop).
- **Cover page**: the name gets circled by a hand-drawn line; scrolling tips the page back in 3D like turning it, while doodles drift.
- **Dear diary (About)**: a clipped photo card that sways on scroll, and key phrases swiped with a highlighter as they appear.
- **Skills checklist**: every skill has a checkbox whose tick is drawn by your scroll position.
- **Sticky-note projects**: notes drop in with a wobble; live search, tech tags and an empty state.
- **Learning log**: a pencil trail that draws down the page as you scroll.
- **Contact**: an index card that unfolds into view.
- **Light / dark toggle**: saved in `localStorage`; on first visit it follows the device's `prefers-color-scheme`.
- **AI chatbot (Doodle)**: floating button → chat panel on every section, with suggested questions, a typing indicator and friendly error messages.

All text lives in one file, **`lib/notebook.ts`**. The page and the chatbot both read from it.

## How the key parts work

| Feature | Where | How |
| --- | --- | --- |
| Project search + filter | `components/sticky-notes.tsx` | The search text and selected chips are React state. Each render runs `.filter()` on the projects: a project stays if its **name or any technology** contains the text **and** it matches the chip filter. Try "Python", "Quiz" or "Book". |
| Theme toggle | `components/chalk-switch.tsx` + `lib/theme.ts` | A small script in `<head>` applies the saved theme (or the system one) before the page paints. The button toggles the `dark` class on `<html>` and saves the choice to `localStorage`. |
| Chatbot | `components/doodle-chat.tsx` → `app/api/chat/route.ts` | Browser → `POST /api/chat` with the conversation → the server route calls **Gemini (`gemini-2.5-flash`, falling back to `gemini-2.5-flash-lite` on quota errors)** with a system prompt built from `lib/notebook.ts` and `GEMINI_API_KEY` from the environment → the reply is shown in the panel. Any failure shows: *"Sorry, I couldn't reach the AI right now. Please try again in a moment."* |

The API key is **never** sent to the browser: it has no `NEXT_PUBLIC_` prefix and `.env*` files are git-ignored.

## Run it locally

```bash
npm install
cp .env.example .env.local   # then paste your key after GEMINI_API_KEY=
npm run dev
```

Open http://localhost:3000. Get a free key at https://aistudio.google.com/apikey.

## Deploy on Vercel

1. Push this folder to a new GitHub repo.
2. Import it in Vercel → **Settings → Environment Variables** → add `GEMINI_API_KEY`.
3. Deploy, then paste the live URL at the top of this README.

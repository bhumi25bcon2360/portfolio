import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { doodlePrompt } from "@/lib/notebook";

/*
 * Chatbot endpoint.
 * 1. The browser POSTs { chat: [{ who, says }] } here.
 * 2. We read GEMINI_API_KEY from the server environment (.env.local / Vercel), never the browser.
 * 3. Gemini answers using Bhumi's notebook data as its instructions; we return { answer }.
 */

const MODEL_ORDER = ["gemini-2.5-flash", "gemini-2.5-flash-lite"];

type ChatLine = { who: "visitor" | "doodle"; says: string };

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Gemini key missing" }, { status: 500 });

  const body = await request.json().catch(() => null);
  const chat: ChatLine[] = Array.isArray(body?.chat) ? body.chat : [];
  const contents = chat
    .filter((line) => typeof line?.says === "string" && line.says.trim() !== "")
    .slice(-12)
    .map((line) => ({
      role: line.who === "doodle" ? "model" : "user",
      parts: [{ text: line.says.slice(0, 1000) }],
    }));

  if (contents.length === 0 || contents.at(-1)?.role !== "user") {
    return NextResponse.json({ error: "No question" }, { status: 400 });
  }

  const gemini = new GoogleGenAI({ apiKey });
  for (const model of MODEL_ORDER) {
    try {
      const result = await gemini.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction: doodlePrompt(),
          temperature: 0.45,
          maxOutputTokens: 500,
          thinkingConfig: { thinkingBudget: 0 },
        },
      });
      const answer = result.text?.trim();
      if (answer) return NextResponse.json({ answer });
    } catch (error) {
      const status = (error as { status?: number }).status;
      console.error(`[doodle] ${model}:`, status ?? error);
      // Only move on to the backup model for quota (429) or overload (503) errors.
      if (status !== 429 && status !== 503) break;
    }
  }
  return NextResponse.json({ error: "AI unavailable" }, { status: 503 });
}

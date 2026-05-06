import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const FASIRI_BASE    = process.env.FASIRI_BASE_URL    ?? "https://fasiri-bu9u.onrender.com";
const FASIRI_KEY     = process.env.FASIRI_API_KEY     ?? "";
const ANTHROPIC_KEY  = process.env.ANTHROPIC_API_KEY  ?? "";

const anthropic = new Anthropic({ apiKey: ANTHROPIC_KEY });

const SYSTEM_PROMPT = `You are Fasiri Assistant, a helpful AI that specialises in African culture, languages, history, and anything else users need help with. You are knowledgeable, warm, and concise. Keep responses clear and under 150 words unless the user asks for detail. Do not mention that you are Claude or that you are made by Anthropic - you are the Fasiri Assistant.`;

type HistoryMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  if (!ANTHROPIC_KEY || !FASIRI_KEY) {
    return NextResponse.json({ error: "Chat service not configured." }, { status: 503 });
  }

  const { message, history, target_lang, lang_name } = await req.json();

  // 1. Get response from Claude
  const messages: HistoryMessage[] = [
    ...(history ?? []),
    { role: "user", content: message },
  ];

  let englishReply = "";

  try {
    const completion = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages,
    });

    englishReply = completion.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { type: "text"; text: string }).text)
      .join("");
  } catch (err) {
    console.error("Claude error:", err);
    return NextResponse.json({ error: "AI service temporarily unavailable." }, { status: 503 });
  }

  // 2. Translate the reply via Fasiri
  let translatedReply: string | null = null;
  let provider: string | null = null;
  let qualityScore: number | null = null;
  let latencyMs: number | null = null;

  if (target_lang && target_lang !== "en") {
    try {
      const tRes = await fetch(`${FASIRI_BASE}/api/v1/translate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${FASIRI_KEY}`,
        },
        body: JSON.stringify({
          text: englishReply,
          target_lang,
          source_lang: "en",
          provider: "auto",
        }),
      });

      if (tRes.ok) {
        const tData = await tRes.json();
        translatedReply = tData.translated_text;
        provider        = tData.provider;
        qualityScore    = tData.quality_score;
        latencyMs       = tData.latency_ms;
      }
    } catch (err) {
      console.error("Translation error:", err);
    }
  }

  return NextResponse.json({
    english_reply:    englishReply,
    translated_reply: translatedReply,
    lang_name,
    provider,
    quality_score:  qualityScore,
    latency_ms:     latencyMs,
  });
}

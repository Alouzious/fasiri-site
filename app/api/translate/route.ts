import { NextRequest, NextResponse } from "next/server";

const FASIRI_BASE = process.env.FASIRI_BASE_URL ?? "https://fasiri-bu9u.onrender.com";
const FASIRI_KEY  = process.env.FASIRI_API_KEY  ?? "";

export async function POST(req: NextRequest) {
  if (!FASIRI_KEY) {
    return NextResponse.json({ error: "Translation service not configured." }, { status: 503 });
  }

  const { text, target_lang, source_lang = "en" } = await req.json();

  if (!text?.trim() || !target_lang) {
    return NextResponse.json({ error: "text and target_lang are required." }, { status: 400 });
  }

  const res = await fetch(`${FASIRI_BASE}/api/v1/translate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${FASIRI_KEY}`,
    },
    body: JSON.stringify({ text: text.trim(), target_lang, source_lang, provider: "auto" }),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { error: data?.detail?.message ?? "Translation failed. Please try again." },
      { status: res.status }
    );
  }

  return NextResponse.json(data);
}

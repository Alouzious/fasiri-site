import { NextRequest, NextResponse } from "next/server";

const FASIRI_BASE = process.env.FASIRI_BASE_URL ?? "https://fasiri-bu9u.onrender.com";
const FASIRI_KEY  = process.env.FASIRI_API_KEY  ?? "";

export async function POST(req: NextRequest) {
  if (!FASIRI_KEY) {
    return NextResponse.json({ error: "TTS service not configured." }, { status: 503 });
  }

  const { text, language } = await req.json();

  const res = await fetch(`${FASIRI_BASE}/api/v1/speech/tts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${FASIRI_KEY}`,
    },
    body: JSON.stringify({ text, language }),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { error: data?.detail?.message ?? "TTS failed." },
      { status: res.status }
    );
  }

  return NextResponse.json(data);
}

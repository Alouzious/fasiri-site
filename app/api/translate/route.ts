import { NextRequest, NextResponse } from "next/server";

const FASIRI_BASE = "https://fasiri-bu9u.onrender.com";
const FASIRI_KEY  = process.env.FASIRI_API_KEY ?? "";

export async function POST(req: NextRequest) {
  if (!FASIRI_KEY) {
    return NextResponse.json(
      { error: "FASIRI_API_KEY is not configured." },
      { status: 500 }
    );
  }

  const body = await req.json();
  const { text, target_lang, source_lang = "en" } = body;

  if (!text?.trim() || !target_lang) {
    return NextResponse.json(
      { error: "text and target_lang are required." },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(`${FASIRI_BASE}/api/v1/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${FASIRI_KEY}`,
      },
      body: JSON.stringify({ text, target_lang, source_lang, provider: "auto" }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.detail?.message ?? "Translation failed." },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Could not reach Fasiri API. Please try again." },
      { status: 503 }
    );
  }
}

"use client";

import {
  useState, useRef, useEffect, useCallback, type KeyboardEvent,
} from "react";
import {
  Send, Volume2, Copy, Check, Globe, ChevronDown,
  ExternalLink, Loader2, RotateCcw, Languages, MessageSquare,
  Sparkles, Share2, BookOpen,
} from "lucide-react";

// ── Language data ──────────────────────────────────────────────────────────

type Lang = {
  code: string; name: string; native: string;
  region: string; tts: boolean; provider: string;
};

const LANGS: Lang[] = [
  { code:"lug", name:"Luganda",    native:"Luganda",    region:"Uganda",        tts:true,  provider:"Sunbird"     },
  { code:"ach", name:"Acholi",     native:"Acholi",     region:"Uganda",        tts:true,  provider:"Sunbird"     },
  { code:"teo", name:"Ateso",      native:"Ateso",      region:"Uganda",        tts:true,  provider:"Sunbird"     },
  { code:"nyn", name:"Runyankore", native:"Runyankore", region:"Uganda",        tts:true,  provider:"Sunbird"     },
  { code:"lgg", name:"Lugbara",    native:"Lugbara",    region:"Uganda",        tts:true,  provider:"Sunbird"     },
  { code:"yo",  name:"Yoruba",     native:"Yoruba",     region:"Nigeria",       tts:false, provider:"Khaya"       },
  { code:"tw",  name:"Twi",        native:"Twi",        region:"Ghana",         tts:false, provider:"Khaya"       },
  { code:"ee",  name:"Ewe",        native:"Ewe",        region:"Ghana/Togo",    tts:false, provider:"Khaya"       },
  { code:"gaa", name:"Ga",         native:"Ga",         region:"Ghana",         tts:false, provider:"Khaya"       },
  { code:"dag", name:"Dagbani",    native:"Dagbani",    region:"Ghana",         tts:false, provider:"Khaya"       },
  { code:"ki",  name:"Kikuyu",     native:"Gikuyu",     region:"Kenya",         tts:false, provider:"Khaya"       },
  { code:"luo", name:"Luo",        native:"Dholuo",     region:"Kenya",         tts:false, provider:"Khaya"       },
  { code:"mer", name:"Kimeru",     native:"Kimeru",     region:"Kenya",         tts:false, provider:"Khaya"       },
  { code:"kus", name:"Kusaal",     native:"Kusaal",     region:"Ghana",         tts:false, provider:"Khaya"       },
  { code:"sw",  name:"Swahili",    native:"Kiswahili",  region:"East Africa",   tts:false, provider:"HuggingFace" },
  { code:"fr",  name:"French",     native:"Francais",   region:"Francophone",   tts:false, provider:"HuggingFace" },
  { code:"ar",  name:"Arabic",     native:"العربية",    region:"North Africa",  tts:false, provider:"HuggingFace" },
  { code:"af",  name:"Afrikaans",  native:"Afrikaans",  region:"South Africa",  tts:false, provider:"HuggingFace" },
];

const CHIP: Record<string, string> = {
  Sunbird:     "chip-sunbird",
  Khaya:       "chip-khaya",
  HuggingFace: "chip-huggingface",
};

// ── Types ──────────────────────────────────────────────────────────────────

type Mode = "translate" | "chat";

type TranslateMsg = {
  id: string; kind: "translate";
  input: string;
  translation?: string; error?: string;
  provider?: string; quality?: number; latency?: number;
  lang: Lang;
};

type ChatMsg = {
  id: string; kind: "chat"; role: "user" | "assistant";
  english: string;
  translated?: string;
  provider?: string; quality?: number; latency?: number;
  lang: Lang;
  loading?: boolean;
};

type Msg = TranslateMsg | ChatMsg;

function uid() { return Math.random().toString(36).slice(2, 10); }

// ── Kente mark ─────────────────────────────────────────────────────────────

function KenteMark({ size = 28 }: { size?: number }) {
  const b = Math.round(size * 0.26);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <rect x={0}   y={0}   width={b}        height={size}    rx={2} fill="#2D7D46" />
      <rect x={0}   y={0}   width={size}     height={b}       rx={2} fill="#E8A020" />
      <rect x={0}   y={size*0.5} width={size*0.78} height={b} rx={2} fill="#C0392B" />
      <rect x={b}   y={b}   width={b}        height={size*0.5-b} rx={0} fill="#2D7D46" />
    </svg>
  );
}

// ── Language selector ───────────────────────────────────────────────────────

function LangSelector({ value, onChange }: { value: Lang; onChange: (l: Lang) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const grouped = LANGS.reduce<Record<string, Lang[]>>((acc, l) => {
    (acc[l.region] ??= []).push(l); return acc;
  }, {});

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-medium hover:border-[#2D7D46] transition-all shadow-sm"
      >
        <Globe size={13} className="text-[#2D7D46]" />
        <span className="text-gray-800 dark:text-gray-100">{value.name}</span>
        <span className="text-gray-400 text-xs hidden sm:inline">({value.native})</span>
        <ChevronDown size={12} className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute bottom-full mb-2 left-0 w-72 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl z-50 overflow-hidden">
          <div className="p-2 max-h-72 overflow-y-auto">
            {Object.entries(grouped).map(([region, langs]) => (
              <div key={region}>
                <p className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">{region}</p>
                {langs.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { onChange(l); setOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors ${
                      l.code === value.code
                        ? "bg-green-50 dark:bg-green-900/20 text-[#2D7D46] font-semibold"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{l.name}</span>
                      <span className="text-xs text-gray-400">{l.native}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {l.tts && <span title="Text-to-Speech available"><Volume2 size={11} className="text-[#2D7D46]" /></span>}
                      <span className={`lang-chip ${CHIP[l.provider]}`}>{l.provider}</span>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Quality bar ─────────────────────────────────────────────────────────────

function QBar({ score }: { score: number }) {
  const pct  = Math.round(score * 100);
  const color = score >= 0.85 ? "#2D7D46" : score >= 0.70 ? "#E8A020" : "#C0392B";
  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="q-bar-track flex-1">
        <div style={{ width: `${pct}%`, background: color, height: "100%", borderRadius: 9999 }} />
      </div>
      <span className="text-xs text-gray-400">{pct}% quality</span>
    </div>
  );
}

// ── CopyBtn ──────────────────────────────────────────────────────────────────

function CopyBtn({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 2000); }}
      className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      {done ? <Check size={12} className="text-[#2D7D46]" /> : <Copy size={12} />}
      {done ? "Copied" : "Copy"}
    </button>
  );
}

// ── TTS button ────────────────────────────────────────────────────────────────

function TTSBtn({ text, lang }: { text: string; lang: string }) {
  const [loading, setLoading] = useState(false);
  const play = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language: lang }),
      });
      const data = await res.json();
      if (data.audio_url) {
        new Audio(data.audio_url).play();
      } else if (data.audio_base64) {
        const buf = Uint8Array.from(atob(data.audio_base64), (c) => c.charCodeAt(0));
        const url = URL.createObjectURL(new Blob([buf], { type: "audio/mpeg" }));
        const a = new Audio(url);
        a.play();
        a.onended = () => URL.revokeObjectURL(url);
      }
    } finally { setLoading(false); }
  };
  return (
    <button
      onClick={play} disabled={loading}
      className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#2D7D46] px-2 py-1 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors disabled:opacity-50"
    >
      {loading ? <Loader2 size={12} className="animate-spin" /> : <Volume2 size={12} />}
      Listen
    </button>
  );
}

// ── Share btn ─────────────────────────────────────────────────────────────────

function ShareBtn({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  const share = async () => {
    if (navigator.share) {
      await navigator.share({ text, title: "Translated by Fasiri" });
    } else {
      navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    }
  };
  return (
    <button
      onClick={share}
      className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      {done ? <Check size={12} className="text-[#2D7D46]" /> : <Share2 size={12} />}
      Share
    </button>
  );
}

// ── Translate message card ─────────────────────────────────────────────────────

function TranslateCard({ msg }: { msg: TranslateMsg }) {
  return (
    <div className="fade-up space-y-2 max-w-2xl mx-auto">
      {/* Input pill */}
      <div className="flex justify-end">
        <div className="bubble-user px-4 py-3 max-w-[85%] text-sm leading-relaxed shadow-sm">
          {msg.input}
        </div>
      </div>

      {/* Result card */}
      <div className="bubble-assistant px-5 py-4 max-w-[90%]">
        {msg.error ? (
          <p className="text-sm text-red-500">{msg.error}</p>
        ) : msg.translation ? (
          <>
            <p className="text-lg font-medium leading-relaxed text-gray-900 dark:text-gray-100 tracking-wide">
              {msg.translation}
            </p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {msg.provider && (
                <span className={`lang-chip ${CHIP[msg.provider] ?? ""}`}>{msg.provider}</span>
              )}
              <span className="text-xs text-gray-400">{msg.lang.name}</span>
              {msg.latency && <span className="text-xs text-gray-400">{msg.latency}ms</span>}
            </div>
            {msg.quality !== undefined && <QBar score={msg.quality} />}
            <div className="flex items-center gap-0.5 mt-3 border-t border-gray-100 dark:border-gray-700 pt-2">
              <CopyBtn text={msg.translation} />
              {msg.lang.tts && <TTSBtn text={msg.translation} lang={msg.lang.code} />}
              <ShareBtn text={msg.translation} />
            </div>
          </>
        ) : (
          <p className="shimmer-text text-sm">Translating...</p>
        )}
      </div>
    </div>
  );
}

// ── Chat message ──────────────────────────────────────────────────────────────

function ChatBubble({ msg }: { msg: ChatMsg }) {
  if (msg.role === "user") {
    return (
      <div className="fade-up flex justify-end max-w-2xl mx-auto">
        <div className="bubble-user px-4 py-3 max-w-[80%] text-sm leading-relaxed shadow-sm">
          {msg.english}
        </div>
      </div>
    );
  }

  return (
    <div className="fade-up max-w-2xl mx-auto">
      <div className="bubble-assistant px-5 py-4 max-w-[90%]">
        {msg.loading ? (
          <p className="shimmer-text text-sm">Thinking and translating...</p>
        ) : (
          <>
            {/* Translated reply - prominent */}
            {msg.translated && (
              <p className="text-base leading-relaxed text-gray-900 dark:text-gray-100 mb-3">
                {msg.translated}
              </p>
            )}

            {/* English original - subtle */}
            {msg.translated && (
              <details className="group">
                <summary className="flex items-center gap-1.5 text-xs text-gray-400 cursor-pointer hover:text-gray-600 select-none list-none">
                  <BookOpen size={11} />
                  View in English
                  <ChevronDown size={11} className="group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                  {msg.english}
                </p>
              </details>
            )}

            {/* If no translation available, show English */}
            {!msg.translated && (
              <p className="text-sm leading-relaxed text-gray-900 dark:text-gray-100">
                {msg.english}
              </p>
            )}

            {/* Meta */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {msg.provider && (
                <span className={`lang-chip ${CHIP[msg.provider] ?? ""}`}>{msg.provider}</span>
              )}
              {msg.latency && <span className="text-xs text-gray-400">{msg.latency}ms</span>}
            </div>

            {msg.quality !== undefined && msg.translated && (
              <QBar score={msg.quality} />
            )}

            {/* Actions */}
            <div className="flex items-center gap-0.5 mt-3 border-t border-gray-100 dark:border-gray-700 pt-2">
              <CopyBtn text={msg.translated ?? msg.english} />
              {msg.lang.tts && msg.translated && (
                <TTSBtn text={msg.translated} lang={msg.lang.code} />
              )}
              <ShareBtn text={msg.translated ?? msg.english} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Suggested phrases ─────────────────────────────────────────────────────────

const TRANSLATE_SUGGESTIONS = [
  "Good morning", "How are you?", "Thank you very much",
  "Welcome to Uganda", "Where is the hospital?", "My name is David",
];

const CHAT_SUGGESTIONS = [
  "Tell me about Uganda",
  "What is the history of the Luganda language?",
  "Teach me a greeting in Yoruba",
  "What crops are grown in West Africa?",
  "Tell me about African traditional medicine",
];

// ── Main ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const [mode, setMode]           = useState<Mode>("translate");
  const [lang, setLang]           = useState<Lang>(LANGS[0]);
  const [input, setInput]         = useState("");
  const [msgs, setMsgs]           = useState<Msg[]>([]);
  const [loading, setLoading]     = useState(false);
  const bottomRef                 = useRef<HTMLDivElement>(null);
  const inputRef                  = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const chatHistory = msgs
    .filter((m): m is ChatMsg => m.kind === "chat" && !m.loading)
    .map((m) => ({ role: m.role, content: m.english }));

  // ── Translate ──────────────────────────────────────────────────────────────

  const doTranslate = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;
    setInput("");
    setLoading(true);

    const placeholder: TranslateMsg = {
      id: uid(), kind: "translate", input: text, lang,
    };
    setMsgs((p) => [...p, placeholder]);

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, target_lang: lang.code }),
      });
      const data = await res.json();

      setMsgs((p) =>
        p.map((m) =>
          m.id === placeholder.id
            ? {
                ...m,
                translation: data.translated_text,
                provider:    data.provider,
                quality:     data.quality_score,
                latency:     data.latency_ms,
                error:       data.error,
              }
            : m
        )
      );
    } catch {
      setMsgs((p) =>
        p.map((m) =>
          m.id === placeholder.id
            ? { ...m, error: "Network error. Please try again." }
            : m
        )
      );
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }, [loading, lang]);

  // ── Chat ───────────────────────────────────────────────────────────────────

  const doChat = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;
    setInput("");
    setLoading(true);

    const userMsg: ChatMsg = {
      id: uid(), kind: "chat", role: "user", english: text, lang,
    };
    const assistantPlaceholder: ChatMsg = {
      id: uid(), kind: "chat", role: "assistant",
      english: "", lang, loading: true,
    };

    setMsgs((p) => [...p, userMsg, assistantPlaceholder]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message:     text,
          history:     chatHistory,
          target_lang: lang.code,
          lang_name:   lang.name,
        }),
      });
      const data = await res.json();

      setMsgs((p) =>
        p.map((m) =>
          m.id === assistantPlaceholder.id
            ? {
                ...m,
                loading:    false,
                english:    data.english_reply   ?? "",
                translated: data.translated_reply ?? undefined,
                provider:   data.provider        ?? undefined,
                quality:    data.quality_score   ?? undefined,
                latency:    data.latency_ms      ?? undefined,
              }
            : m
        )
      );
    } catch {
      setMsgs((p) =>
        p.map((m) =>
          m.id === assistantPlaceholder.id
            ? { ...m, loading: false, english: "Something went wrong. Please try again." }
            : m
        )
      );
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }, [loading, lang, chatHistory]);

  const submit = useCallback(
    (text: string) => mode === "translate" ? doTranslate(text) : doChat(text),
    [mode, doTranslate, doChat]
  );

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(input); }
  };

  const suggestions = mode === "translate" ? TRANSLATE_SUGGESTIONS : CHAT_SUGGESTIONS;
  const isEmpty = msgs.length === 0;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">

      {/* Kente stripe */}
      <div className="kente-stripe" />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          {/* Brand */}
          <div className="flex items-center gap-2.5 shrink-0">
            <KenteMark size={30} />
            <div className="leading-tight">
              <span className="text-base font-bold tracking-tight">fasiri</span>
              <span className="hidden sm:inline text-xs text-gray-400 ml-2">African Language AI</span>
            </div>
          </div>

          {/* Mode toggle */}
          <div className="mode-pill">
            <button
              onClick={() => { setMode("translate"); setMsgs([]); }}
              className={mode === "translate" ? "active" : ""}
            >
              <span className="flex items-center gap-1.5">
                <Languages size={13} />
                Translate
              </span>
            </button>
            <button
              onClick={() => { setMode("chat"); setMsgs([]); }}
              className={mode === "chat" ? "active" : ""}
            >
              <span className="flex items-center gap-1.5">
                <MessageSquare size={13} />
                Chat AI
              </span>
            </button>
          </div>

          {/* Links */}
          <div className="flex items-center gap-1 shrink-0">
            <a
              href="https://fasiri-bu9u.onrender.com/docs"
              target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-xs text-gray-500 hover:text-[#2D7D46] px-2.5 py-1.5 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
            >
              <ExternalLink size={11} />
              API
            </a>
            <a
              href="https://pypi.org/project/fasiri/"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs bg-[#2D7D46] hover:bg-[#1f5c32] text-white px-3 py-1.5 rounded-lg transition-colors shadow-sm"
            >
              <Sparkles size={11} />
              <span className="hidden sm:inline">pip install fasiri</span>
              <span className="sm:hidden">Install</span>
            </a>
          </div>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-4 min-h-[calc(100vh-200px)]">

          {isEmpty ? (
            /* Welcome */
            <div className="flex flex-col items-center justify-center min-h-[55vh] text-center space-y-8">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 shadow-md border border-gray-100 dark:border-gray-800">
                    <KenteMark size={48} />
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {mode === "translate" ? "Translate to African Languages" : "Chat in African Languages"}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 max-w-md mx-auto leading-relaxed">
                    {mode === "translate"
                      ? "Type anything in English and get an instant translation powered by Sunbird AI, Khaya AI, and HuggingFace."
                      : "Chat with an AI assistant. Every response is translated into your chosen African language in real time."}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-center gap-8">
                  {[
                    { v: "19+", l: "Languages" },
                    { v: "3",   l: "Providers"  },
                    { v: "1",   l: "API"         },
                  ].map((s) => (
                    <div key={s.l} className="text-center">
                      <div className="text-2xl font-bold text-[#2D7D46]">{s.v}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggestions */}
              <div className="w-full max-w-xl space-y-3">
                <p className="text-xs text-gray-400 uppercase tracking-wider">Try one of these</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => submit(s)}
                      className="px-3.5 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full hover:border-[#2D7D46] hover:text-[#2D7D46] transition-all shadow-sm hover:shadow-md"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            msgs.map((m) =>
              m.kind === "translate"
                ? <TranslateCard key={m.id} msg={m} />
                : <ChatBubble   key={m.id} msg={m} />
            )
          )}

          <div ref={bottomRef} />
        </div>
      </main>

      {/* Input area */}
      <div className="sticky bottom-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 px-4 py-3">
        <div className="max-w-3xl mx-auto space-y-2.5">

          {/* Toolbar */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 hidden sm:block">Language</span>
              <LangSelector value={lang} onChange={setLang} />
            </div>
            {!isEmpty && (
              <button
                onClick={() => setMsgs([])}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <RotateCcw size={12} />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
          </div>

          {/* Textarea + send */}
          <div className="flex items-end gap-2">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={
                  mode === "translate"
                    ? `Type English text to translate to ${lang.name}...`
                    : `Ask anything - reply will appear in ${lang.name}...`
                }
                rows={1}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#2D7D46] focus:border-transparent transition-all placeholder-gray-400"
                style={{ minHeight: 48, maxHeight: 140 }}
                onInput={(e) => {
                  const t = e.target as HTMLTextAreaElement;
                  t.style.height = "auto";
                  t.style.height = Math.min(t.scrollHeight, 140) + "px";
                }}
              />
            </div>
            <button
              onClick={() => submit(input)}
              disabled={!input.trim() || loading}
              className="shrink-0 w-12 h-12 rounded-2xl bg-[#2D7D46] hover:bg-[#1f5c32] text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow-md"
            >
              {loading
                ? <Loader2 size={18} className="animate-spin" />
                : <Send size={18} />}
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400">
            Powered by{" "}
            <a href="https://umarkhemis.github.io/fasiri" target="_blank" rel="noopener noreferrer"
              className="text-[#2D7D46] font-medium hover:underline">
              Fasiri API
            </a>
            {" "} - African language intelligence for developers
          </p>
        </div>
      </div>
    </div>
  );
}

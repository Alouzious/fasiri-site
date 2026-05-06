"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Send,
  Volume2,
  Copy,
  Check,
  Globe,
  Zap,
  ChevronDown,
  ExternalLink,
  Loader2,
  RotateCcw,
} from "lucide-react";

// ── Language registry ──────────────────────────────────────────────────────

type Language = {
  code: string;
  name: string;
  native: string;
  region: string;
  tts: boolean;
  provider: string;
};

const LANGUAGES: Language[] = [
  { code: "lug", name: "Luganda",    native: "Luganda",   region: "Uganda",      tts: true,  provider: "Sunbird" },
  { code: "ach", name: "Acholi",     native: "Acholi",    region: "Uganda",      tts: true,  provider: "Sunbird" },
  { code: "teo", name: "Ateso",      native: "Ateso",     region: "Uganda",      tts: true,  provider: "Sunbird" },
  { code: "nyn", name: "Runyankore", native: "Runyankore",region: "Uganda",      tts: true,  provider: "Sunbird" },
  { code: "lgg", name: "Lugbara",    native: "Lugbara",   region: "Uganda",      tts: true,  provider: "Sunbird" },
  { code: "yo",  name: "Yoruba",     native: "Yoruba",    region: "Nigeria",     tts: false, provider: "Khaya"   },
  { code: "tw",  name: "Twi",        native: "Twi",       region: "Ghana",       tts: false, provider: "Khaya"   },
  { code: "ee",  name: "Ewe",        native: "Ewe",       region: "Ghana/Togo",  tts: false, provider: "Khaya"   },
  { code: "gaa", name: "Ga",         native: "Ga",        region: "Ghana",       tts: false, provider: "Khaya"   },
  { code: "dag", name: "Dagbani",    native: "Dagbani",   region: "Ghana",       tts: false, provider: "Khaya"   },
  { code: "ki",  name: "Kikuyu",     native: "Gikuyu",    region: "Kenya",       tts: false, provider: "Khaya"   },
  { code: "luo", name: "Luo",        native: "Dholuo",    region: "Kenya",       tts: false, provider: "Khaya"   },
  { code: "mer", name: "Kimeru",     native: "Kimeru",    region: "Kenya",       tts: false, provider: "Khaya"   },
  { code: "kus", name: "Kusaal",     native: "Kusaal",    region: "Ghana",       tts: false, provider: "Khaya"   },
  { code: "sw",  name: "Swahili",    native: "Kiswahili", region: "East Africa", tts: false, provider: "HuggingFace" },
  { code: "fr",  name: "French",     native: "Français",  region: "Francophone", tts: false, provider: "HuggingFace" },
  { code: "ar",  name: "Arabic",     native: "العربية",   region: "North Africa",tts: false, provider: "HuggingFace" },
  { code: "af",  name: "Afrikaans",  native: "Afrikaans", region: "South Africa",tts: false, provider: "HuggingFace" },
];

const PROVIDER_COLORS: Record<string, string> = {
  Sunbird:     "bg-emerald-100 text-emerald-700",
  Khaya:       "bg-amber-100 text-amber-700",
  HuggingFace: "bg-blue-100 text-blue-700",
};

// ── Types ─────────────────────────────────────────────────────────────────

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  translation?: string;
  targetLang?: string;
  provider?: string;
  qualityScore?: number;
  latencyMs?: number;
  error?: string;
  audioUrl?: string;
};

// ── Helpers ───────────────────────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

// ── Sub-components ────────────────────────────────────────────────────────

function KenteMark({ size = 32 }: { size?: number }) {
  const s = size;
  const bar = Math.round(s * 0.25);
  const mid = Math.round(s * 0.5);
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} aria-hidden>
      <rect x={0}   y={0}   width={bar} height={s}      rx={2} fill="#2D7D46" />
      <rect x={0}   y={0}   width={s}   height={bar}    rx={2} fill="#E8A020" />
      <rect x={0}   y={mid} width={s * 0.75} height={bar} rx={2} fill="#C0392B" />
      <rect x={bar} y={bar} width={bar} height={mid - bar} rx={0} fill="#2D7D46" />
    </svg>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-sm w-fit">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="typing-dot w-2 h-2 rounded-full bg-gray-400"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
}

function QualityBar({ score }: { score: number }) {
  const pct = Math.round(score * 100);
  const color = score >= 0.85 ? "#2D7D46" : score >= 0.70 ? "#E8A020" : "#C0392B";
  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className="text-xs text-gray-400">{pct}%</span>
    </div>
  );
}

function MessageBubble({
  msg,
  lang,
  onPlayAudio,
  audioLoading,
}: {
  msg: Message;
  lang: Language | undefined;
  onPlayAudio: (msg: Message) => void;
  audioLoading: string | null;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (msg.translation) {
      navigator.clipboard.writeText(msg.translation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (msg.role === "user") {
    return (
      <div className="message-bubble flex justify-end">
        <div className="max-w-[80%] px-4 py-3 bg-[#2D7D46] text-white rounded-2xl rounded-tr-sm shadow-sm">
          <p className="text-sm leading-relaxed">{msg.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="message-bubble flex justify-start">
      <div className="max-w-[85%] space-y-1">
        {/* Translation card */}
        <div className="px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-tl-sm shadow-sm">
          {msg.error ? (
            <p className="text-sm text-red-500">{msg.error}</p>
          ) : (
            <>
              <p className="text-base font-medium leading-relaxed text-gray-900 dark:text-gray-100">
                {msg.translation}
              </p>

              {/* Meta row */}
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                {msg.provider && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PROVIDER_COLORS[msg.provider] ?? "bg-gray-100 text-gray-600"}`}>
                    {msg.provider}
                  </span>
                )}
                {msg.latencyMs && (
                  <span className="text-xs text-gray-400">{msg.latencyMs}ms</span>
                )}
              </div>

              {/* Quality bar */}
              {msg.qualityScore !== undefined && (
                <QualityBar score={msg.qualityScore} />
              )}
            </>
          )}
        </div>

        {/* Action buttons */}
        {!msg.error && (
          <div className="flex items-center gap-1 px-1">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? "Copied" : "Copy"}
            </button>

            {lang?.tts && (
              <button
                onClick={() => onPlayAudio(msg)}
                disabled={audioLoading === msg.id}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#2D7D46] px-2 py-1 rounded-lg hover:bg-green-50 transition-colors disabled:opacity-50"
              >
                {audioLoading === msg.id ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <Volume2 size={12} />
                )}
                Listen
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Language selector ─────────────────────────────────────────────────────

function LanguageSelector({
  selected,
  onChange,
}: {
  selected: Language;
  onChange: (lang: Language) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const grouped = LANGUAGES.reduce<Record<string, Language[]>>((acc, l) => {
    const r = l.region;
    if (!acc[r]) acc[r] = [];
    acc[r].push(l);
    return acc;
  }, {});

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium hover:border-[#2D7D46] transition-colors shadow-sm"
      >
        <Globe size={14} className="text-[#2D7D46]" />
        <span>{selected.name}</span>
        <span className="text-xs text-gray-400">({selected.native})</span>
        <ChevronDown size={12} className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full mt-2 left-0 w-72 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl z-50 overflow-hidden">
          <div className="p-2 max-h-80 overflow-y-auto">
            {Object.entries(grouped).map(([region, langs]) => (
              <div key={region}>
                <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {region}
                </div>
                {langs.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { onChange(l); setOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors ${
                      l.code === selected.code
                        ? "bg-green-50 text-[#2D7D46] font-medium"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{l.name}</span>
                      <span className="text-xs text-gray-400">{l.native}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {l.tts && (
                        <span title="Text-to-Speech available">
                          <Volume2 size={11} className="text-[#2D7D46]" />
                        </span>
                      )}
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${PROVIDER_COLORS[l.provider]}`}>
                        {l.provider}
                      </span>
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

// ── Code snippet ──────────────────────────────────────────────────────────

function CodeSnippet({ lang }: { lang: Language }) {
  const [copied, setCopied] = useState(false);
  const code = `from fasiri import Fasiri

client = Fasiri(api_key="fsri_...")
result = client.translate(
    "Good morning",
    target="${lang.code}",
)
print(result)  # Try it!`;

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 text-xs">
      <div className="flex items-center justify-between px-3 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <span className="text-gray-500 font-mono">Python SDK</span>
        <button
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="flex items-center gap-1 text-gray-400 hover:text-gray-600"
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
        </button>
      </div>
      <pre className="p-3 bg-gray-950 text-green-400 font-mono leading-relaxed overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────

const EXAMPLE_PHRASES = [
  "Good morning",
  "How are you?",
  "Thank you very much",
  "Welcome to Uganda",
  "My name is David",
  "Where is the hospital?",
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedLang, setSelectedLang] = useState<Language>(LANGUAGES[0]);
  const [loading, setLoading] = useState(false);
  const [audioLoading, setAudioLoading] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;

      const userMsg: Message = { id: uid(), role: "user", text };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, target_lang: selectedLang.code }),
        });

        const data = await res.json();

        const assistantMsg: Message = {
          id: uid(),
          role: "assistant",
          text,
          translation: data.translated_text ?? undefined,
          targetLang: selectedLang.code,
          provider: data.provider,
          qualityScore: data.quality_score,
          latencyMs: data.latency_ms,
          error: data.error ?? undefined,
        };

        setMessages((prev) => [...prev, assistantMsg]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: "assistant",
            text,
            error: "Network error. Please check your connection.",
          },
        ]);
      } finally {
        setLoading(false);
        inputRef.current?.focus();
      }
    },
    [loading, selectedLang]
  );

  const handlePlayAudio = useCallback(async (msg: Message) => {
    if (!msg.translation || audioLoading) return;
    setAudioLoading(msg.id);

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: msg.translation, language: msg.targetLang }),
      });

      const data = await res.json();

      if (data.audio_url) {
        const audio = new Audio(data.audio_url);
        audio.play();
      } else if (data.audio_base64) {
        const bytes = atob(data.audio_base64);
        const buf = new Uint8Array(bytes.length);
        for (let i = 0; i < bytes.length; i++) buf[i] = bytes.charCodeAt(i);
        const blob = new Blob([buf], { type: "audio/mpeg" });
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.play();
        audio.onended = () => URL.revokeObjectURL(url);
      }
    } catch {
      console.error("TTS failed");
    } finally {
      setAudioLoading(null);
    }
  }, [audioLoading]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">

      {/* Kente top bar */}
      <div className="kente-bar w-full" />

      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <KenteMark size={32} />
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white leading-none">fasiri</h1>
              <p className="text-xs text-gray-400">African Language Translator</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://fasiri-bu9u.onrender.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#2D7D46] px-3 py-1.5 rounded-lg hover:bg-green-50 transition-colors"
            >
              <ExternalLink size={12} />
              API Docs
            </a>
            <a
              href="https://umarkhemis.github.io/fasiri"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs bg-[#2D7D46] text-white px-3 py-1.5 rounded-lg hover:bg-[#1f5c32] transition-colors"
            >
              Get API Key
            </a>
          </div>
        </div>
      </header>

      {/* Chat area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6">

          {isEmpty ? (
            /* Welcome screen */
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-8">
              <div className="space-y-3">
                <div className="flex justify-center">
                  <KenteMark size={56} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Translate to African Languages
                </h2>
                <p className="text-gray-500 max-w-md text-sm leading-relaxed">
                  Type anything in English and get an instant translation powered by
                  Sunbird AI, Khaya AI, and HuggingFace - all through one API.
                </p>
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-6 text-center">
                {[
                  { value: "19+", label: "Languages" },
                  { value: "3",   label: "Providers" },
                  { value: "1",   label: "API" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-bold text-[#2D7D46]">{s.value}</div>
                    <div className="text-xs text-gray-400">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Example phrases */}
              <div className="w-full max-w-lg space-y-2">
                <p className="text-xs text-gray-400 uppercase tracking-wider">Try these</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {EXAMPLE_PHRASES.map((phrase) => (
                    <button
                      key={phrase}
                      onClick={() => sendMessage(phrase)}
                      className="px-3 py-1.5 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full hover:border-[#2D7D46] hover:text-[#2D7D46] transition-colors shadow-sm"
                    >
                      {phrase}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Messages */
            <div className="space-y-4">
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  msg={msg}
                  lang={LANGUAGES.find((l) => l.code === msg.targetLang)}
                  onPlayAudio={handlePlayAudio}
                  audioLoading={audioLoading}
                />
              ))}
              {loading && (
                <div className="flex justify-start">
                  <TypingIndicator />
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>
      </main>

      {/* Code snippet panel */}
      {showCode && (
        <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3">
          <div className="max-w-3xl mx-auto">
            <CodeSnippet lang={selectedLang} />
          </div>
        </div>
      )}

      {/* Bottom toolbar + input */}
      <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 py-3">
        <div className="max-w-3xl mx-auto space-y-3">

          {/* Toolbar */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 hidden sm:block">Translate to</span>
              <LanguageSelector selected={selectedLang} onChange={setSelectedLang} />
            </div>

            <div className="flex items-center gap-2">
              {!isEmpty && (
                <button
                  onClick={() => setMessages([])}
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <RotateCcw size={12} />
                  <span className="hidden sm:inline">Clear</span>
                </button>
              )}
              <button
                onClick={() => setShowCode(!showCode)}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors ${
                  showCode
                    ? "bg-[#2D7D46] text-white"
                    : "text-gray-500 border border-gray-200 hover:border-[#2D7D46] hover:text-[#2D7D46]"
                }`}
              >
                <Zap size={12} />
                Code
              </button>
            </div>
          </div>

          {/* Input */}
          <div className="flex items-end gap-2">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Type in English, translate to ${selectedLang.name}...`}
                rows={1}
                className="w-full px-4 py-3 pr-12 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#2D7D46] focus:border-transparent transition-all"
                style={{ minHeight: 48, maxHeight: 120 }}
                onInput={(e) => {
                  const t = e.target as HTMLTextAreaElement;
                  t.style.height = "auto";
                  t.style.height = Math.min(t.scrollHeight, 120) + "px";
                }}
              />
            </div>
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#2D7D46] text-white flex items-center justify-center hover:bg-[#1f5c32] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400">
            Powered by{" "}
            <a
              href="https://umarkhemis.github.io/fasiri"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2D7D46] font-medium hover:underline"
            >
              Fasiri API
            </a>
            {" "}- African language intelligence for developers
          </p>
        </div>
      </div>
    </div>
  );
}

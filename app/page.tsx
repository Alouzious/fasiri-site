"use client";

import {
  useState, useRef, useEffect, useCallback,
  type KeyboardEvent, type ChangeEvent,
} from "react";
import {
  Send, Volume2, Copy, Check, Globe, ChevronDown,
  ArrowUpRight, RotateCcw, Languages, MessageSquare,
  Share2, BookOpen, Loader,
} from "lucide-react";

// ── Language data ─────────────────────────────────────────────────────────

type Lang = {
  code: string; name: string; native: string;
  region: string; tts: boolean; provider: string;
};

const LANGS: Lang[] = [
  { code:"lug", name:"Luganda",    native:"Luganda",    region:"Uganda",       tts:true,  provider:"Sunbird"     },
  { code:"ach", name:"Acholi",     native:"Acholi",     region:"Uganda",       tts:true,  provider:"Sunbird"     },
  { code:"teo", name:"Ateso",      native:"Ateso",      region:"Uganda",       tts:true,  provider:"Sunbird"     },
  { code:"nyn", name:"Runyankore", native:"Runyankore", region:"Uganda",       tts:true,  provider:"Sunbird"     },
  { code:"lgg", name:"Lugbara",    native:"Lugbara",    region:"Uganda",       tts:true,  provider:"Sunbird"     },
  { code:"yo",  name:"Yoruba",     native:"Yoruba",     region:"Nigeria",      tts:false, provider:"Khaya"       },
  { code:"tw",  name:"Twi",        native:"Twi",        region:"Ghana",        tts:false, provider:"Khaya"       },
  { code:"ee",  name:"Ewe",        native:"Ewe",        region:"Ghana/Togo",   tts:false, provider:"Khaya"       },
  { code:"gaa", name:"Ga",         native:"Ga",         region:"Ghana",        tts:false, provider:"Khaya"       },
  { code:"dag", name:"Dagbani",    native:"Dagbani",    region:"Ghana",        tts:false, provider:"Khaya"       },
  { code:"ki",  name:"Kikuyu",     native:"Gikuyu",     region:"Kenya",        tts:false, provider:"Khaya"       },
  { code:"luo", name:"Luo",        native:"Dholuo",     region:"Kenya",        tts:false, provider:"Khaya"       },
  { code:"mer", name:"Kimeru",     native:"Kimeru",     region:"Kenya",        tts:false, provider:"Khaya"       },
  { code:"kus", name:"Kusaal",     native:"Kusaal",     region:"Ghana",        tts:false, provider:"Khaya"       },
  { code:"sw",  name:"Swahili",    native:"Kiswahili",  region:"East Africa",  tts:false, provider:"HuggingFace" },
  { code:"fr",  name:"French",     native:"Francais",   region:"Francophone",  tts:false, provider:"HuggingFace" },
  { code:"ar",  name:"Arabic",     native:"العربية",    region:"North Africa", tts:false, provider:"HuggingFace" },
  { code:"af",  name:"Afrikaans",  native:"Afrikaans",  region:"South Africa", tts:false, provider:"HuggingFace" },
];

const BADGE: Record<string, string> = {
  Sunbird:     "badge-sunbird",
  Khaya:       "badge-khaya",
  HuggingFace: "badge-huggingface",
};

// ── Types ─────────────────────────────────────────────────────────────────

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
  translated?: string; error?: string;
  provider?: string; quality?: number; latency?: number;
  lang: Lang;
  loading?: boolean;
};

type Msg = TranslateMsg | ChatMsg;

function uid() { return Math.random().toString(36).slice(2, 10); }

// ── Kente mark ────────────────────────────────────────────────────────────

function KenteMark({ size = 26 }: { size?: number }) {
  const b = Math.round(size * 0.27);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <rect x={0} y={0}        width={b}          height={size}      rx={2} fill="#2D7D46" />
      <rect x={0} y={0}        width={size}       height={b}         rx={2} fill="#C8860A" />
      <rect x={0} y={size*0.5} width={size*0.78}  height={b}         rx={2} fill="#B91C1C" />
      <rect x={b} y={b}        width={b}           height={size*0.5-b} rx={0} fill="#2D7D46" />
    </svg>
  );
}

// ── Language selector ─────────────────────────────────────────────────────

function LangSelector({ value, onChange }: { value: Lang; onChange: (l: Lang) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const grouped = LANGS.reduce<Record<string, Lang[]>>((acc, l) => {
    (acc[l.region] ??= []).push(l); return acc;
  }, {});

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button className="lang-btn" onClick={() => setOpen(!open)}>
        <Globe size={13} color="var(--green)" />
        <span>{value.name}</span>
        <span style={{ color: "var(--text-3)", fontSize: 12 }} className="hidden-mobile">
          {value.native}
        </span>
        <ChevronDown
          size={12}
          color="var(--text-3)"
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s" }}
        />
      </button>

      {open && (
        <div className="lang-dropdown">
          <div className="lang-dropdown-inner">
            {Object.entries(grouped).map(([region, langs]) => (
              <div key={region}>
                <p className="lang-region">{region}</p>
                {langs.map((l) => (
                  <button
                    key={l.code}
                    className={`lang-option ${l.code === value.code ? "active" : ""}`}
                    onClick={() => { onChange(l); setOpen(false); }}
                  >
                    <span className="lang-option-left">
                      <span>{l.name}</span>
                      <span className="lang-native">{l.native}</span>
                    </span>
                    <span className="lang-option-right">
                      {l.tts && <Volume2 size={11} color="var(--green)" />}
                      <span className={`provider-badge ${BADGE[l.provider]}`}>{l.provider}</span>
                    </span>
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

// ── Quality bar ───────────────────────────────────────────────────────────

function QBar({ score }: { score: number }) {
  const pct   = Math.round(score * 100);
  const color = score >= 0.85 ? "#2D7D46" : score >= 0.70 ? "#C8860A" : "#B91C1C";
  return (
    <div className="qbar-wrap">
      <div className="qbar-track">
        <div className="qbar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="qbar-label">{pct}% quality</span>
    </div>
  );
}

// ── Action buttons ────────────────────────────────────────────────────────

function CopyBtn({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      className="action-btn"
      onClick={() => { navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 2000); }}
    >
      {done ? <Check size={12} color="var(--green)" /> : <Copy size={12} />}
      {done ? "Copied" : "Copy"}
    </button>
  );
}

function TTSBtn({ text, lang }: { text: string; lang: string }) {
  const [busy, setBusy] = useState(false);
  const play = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const res  = await fetch("/api/tts", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ text, language: lang }) });
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
    } finally { setBusy(false); }
  };
  return (
    <button className="action-btn tts" onClick={play} disabled={busy}>
      {busy ? <Loader size={12} className="spin" /> : <Volume2 size={12} />}
      Listen
    </button>
  );
}

function ShareBtn({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  const share = async () => {
    if (navigator.share) {
      await navigator.share({ text, title: "Translated by Fasiri" }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    }
  };
  return (
    <button className="action-btn" onClick={share}>
      {done ? <Check size={12} color="var(--green)" /> : <Share2 size={12} />}
      Share
    </button>
  );
}

// ── Translate bubble ──────────────────────────────────────────────────────

function TranslateCard({ msg }: { msg: TranslateMsg }) {
  return (
    <div className="fade-up" style={{ display:"flex", flexDirection:"column", gap:8 }}>
      <div className="msg-row user">
        <div className="bubble bubble-user">{msg.input}</div>
      </div>
      <div className="msg-row assistant">
        <div className="bubble bubble-ai">
          {msg.error ? (
            <p style={{ color:"#B91C1C", fontSize:14, margin:0 }}>{msg.error}</p>
          ) : !msg.translation ? (
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              <div className="shimmer-line" style={{ width:"80%" }} />
              <div className="shimmer-line" style={{ width:"55%" }} />
            </div>
          ) : (
            <>
              <p className="bubble-main-text">{msg.translation}</p>
              <div className="meta-row">
                {msg.provider && (
                  <span className={`provider-badge ${BADGE[msg.provider] ?? ""}`}>
                    {msg.provider}
                  </span>
                )}
                <span className="latency">{msg.lang.name}</span>
                {msg.latency && <span className="latency">{msg.latency}ms</span>}
              </div>
              {msg.quality !== undefined && <QBar score={msg.quality} />}
              <div className="action-bar">
                <CopyBtn text={msg.translation} />
                {msg.lang.tts && <TTSBtn text={msg.translation} lang={msg.lang.code} />}
                <ShareBtn text={msg.translation} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Chat bubble ───────────────────────────────────────────────────────────

function ChatBubble({ msg }: { msg: ChatMsg }) {
  const [enOpen, setEnOpen] = useState(false);

  if (msg.role === "user") {
    return (
      <div className="msg-row user fade-up">
        <div className="bubble bubble-user">{msg.english}</div>
      </div>
    );
  }

  return (
    <div className="msg-row assistant fade-up">
      <div className="bubble bubble-ai">
        {msg.loading ? (
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            <div className="shimmer-line" style={{ width:"90%" }} />
            <div className="shimmer-line" style={{ width:"70%" }} />
            <div className="shimmer-line" style={{ width:"50%" }} />
          </div>
        ) : msg.error ? (
          <p style={{ color:"#B91C1C", fontSize:14, margin:0 }}>{msg.error}</p>
        ) : (
          <>
            <p className="bubble-main-text">
              {msg.translated ?? msg.english}
            </p>

            {msg.translated && (
              <div style={{ marginTop: 10 }}>
                <button
                  className="bubble-en-toggle"
                  onClick={() => setEnOpen(!enOpen)}
                >
                  <BookOpen size={11} color="var(--text-3)" />
                  <span>{enOpen ? "Hide" : "View in English"}</span>
                  <ChevronDown
                    size={11}
                    color="var(--text-3)"
                    style={{ transform: enOpen ? "rotate(180deg)" : "none", transition:"transform 0.15s" }}
                  />
                </button>
                {enOpen && <p className="bubble-en-text">{msg.english}</p>}
              </div>
            )}

            <div className="meta-row">
              {msg.provider && (
                <span className={`provider-badge ${BADGE[msg.provider] ?? ""}`}>
                  {msg.provider}
                </span>
              )}
              {msg.latency && <span className="latency">{msg.latency}ms</span>}
            </div>

            {msg.quality !== undefined && msg.translated && <QBar score={msg.quality} />}

            <div className="action-bar">
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

// ── Suggestions ───────────────────────────────────────────────────────────

const TRANSLATE_SUGG = [
  "Good morning", "How are you?", "Thank you",
  "Welcome home", "Where is the hospital?", "My name is David",
];
const CHAT_SUGG = [
  "Tell me about Uganda",
  "What is Luganda?",
  "Teach me a greeting",
  "African history",
  "What crops grow in West Africa?",
];

// ── Main page ─────────────────────────────────────────────────────────────

export default function Home() {
  const [mode, setMode]       = useState<Mode>("translate");
  const [lang, setLang]       = useState<Lang>(LANGS[0]);
  const [msgs, setMsgs]       = useState<Msg[]>([]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef             = useRef<HTMLDivElement>(null);
  const inputRef              = useRef<HTMLTextAreaElement>(null);
  const msgsRef               = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const chatHistory = msgs
    .filter((m): m is ChatMsg => m.kind === "chat" && !m.loading && m.role !== undefined)
    .map((m) => ({ role: m.role, content: m.english }));

  // ── Translate ─────────────────────────────────────────────────────────

  const doTranslate = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;
    setInput("");
    setLoading(true);

    const ph: TranslateMsg = { id: uid(), kind: "translate", input: text, lang };
    setMsgs((p) => [...p, ph]);

    try {
      const res  = await fetch("/api/translate", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ text, target_lang: lang.code }) });
      const data = await res.json();
      setMsgs((p) => p.map((m) => m.id === ph.id ? { ...m, translation: data.translated_text, provider: data.provider, quality: data.quality_score, latency: data.latency_ms, error: data.error } : m));
    } catch {
      setMsgs((p) => p.map((m) => m.id === ph.id ? { ...m, error: "Network error. Please try again." } : m));
    } finally { setLoading(false); inputRef.current?.focus(); }
  }, [loading, lang]);

  // ── Chat ──────────────────────────────────────────────────────────────

  const doChat = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;
    setInput("");
    setLoading(true);

    const userMsg: ChatMsg    = { id: uid(), kind:"chat", role:"user",      english: text, lang };
    const asstPh:  ChatMsg    = { id: uid(), kind:"chat", role:"assistant",  english: "",   lang, loading: true };
    setMsgs((p) => [...p, userMsg, asstPh]);

    try {
      const res  = await fetch("/api/chat", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ message: text, history: chatHistory, target_lang: lang.code, lang_name: lang.name }) });
      const data = await res.json();
      setMsgs((p) => p.map((m) => m.id === asstPh.id ? { ...m, loading:false, english: data.english_reply ?? "", translated: data.translated_reply ?? undefined, provider: data.provider ?? undefined, quality: data.quality_score ?? undefined, latency: data.latency_ms ?? undefined, error: data.error ?? undefined } : m));
    } catch {
      setMsgs((p) => p.map((m) => m.id === asstPh.id ? { ...m, loading:false, error:"Network error. Please try again." } : m));
    } finally { setLoading(false); inputRef.current?.focus(); }
  }, [loading, lang, chatHistory]);

  const submit = useCallback(
    (text: string) => { if (mode === "translate") doTranslate(text); else doChat(text); },
    [mode, doTranslate, doChat]
  );

  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(input); }
  };

  const switchMode = (m: Mode) => { setMode(m); setMsgs([]); setInput(""); };

  const sugg = mode === "translate" ? TRANSLATE_SUGG : CHAT_SUGG;
  const empty = msgs.length === 0;

  return (
    <div className="app-shell">
      <div className="kente" />

      {/* ── Header ── */}
      <header className="app-header">
        <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
          <KenteMark size={28} />
          <div style={{ lineHeight:1.2 }}>
            <div style={{ fontWeight:700, fontSize:15, letterSpacing:"-0.3px" }}>fasiri</div>
            <div style={{ fontSize:11, color:"var(--text-3)" }} className="hidden-mobile">African Language AI</div>
          </div>
        </div>

        <div className="mode-toggle">
          <button className={`mode-btn ${mode === "translate" ? "active" : ""}`} onClick={() => switchMode("translate")}>
            <Languages size={13} />
            <span className="label">Translate</span>
          </button>
          <button className={`mode-btn ${mode === "chat" ? "active" : ""}`} onClick={() => switchMode("chat")}>
            <MessageSquare size={13} />
            <span className="label">Chat AI</span>
          </button>
        </div>

        <div style={{ display:"flex", gap:6, alignItems:"center", flexShrink:0 }}>
          <a
            href="https://fasiri-bu9u.onrender.com/docs"
            target="_blank" rel="noopener noreferrer"
            style={{ display:"flex", alignItems:"center", gap:4, fontSize:12, color:"var(--text-3)", textDecoration:"none", padding:"5px 8px", borderRadius:7, transition:"color 0.15s" }}
          >
            <ArrowUpRight size={13} />
            <span className="hidden-mobile">API</span>
          </a>
          <a
            href="https://pypi.org/project/fasiri/"
            target="_blank" rel="noopener noreferrer"
            style={{ display:"flex", alignItems:"center", gap:5, fontSize:12, fontWeight:600, background:"var(--green)", color:"white", padding:"6px 12px", borderRadius:8, textDecoration:"none" }}
          >
            Install SDK
          </a>
        </div>
      </header>

      {/* ── Messages ── */}
      <div className="messages" ref={msgsRef}>
        {empty ? (
          <div className="welcome">
            <div>
              <div className="welcome-icon" style={{ margin:"0 auto 14px" }}>
                <KenteMark size={30} />
              </div>
              <h2>
                {mode === "translate"
                  ? "Translate to African Languages"
                  : "Chat in African Languages"}
              </h2>
              <p>
                {mode === "translate"
                  ? "Type English text and get an instant translation via Sunbird AI, Khaya AI, or HuggingFace."
                  : "Chat with an AI. Every response is translated into your chosen African language in real time."}
              </p>
            </div>

            <div className="stats">
              {[["19+","Languages"],["3","Providers"],["1","API"]].map(([v,l]) => (
                <div key={l} style={{ textAlign:"center" }}>
                  <div className="stat-value">{v}</div>
                  <div className="stat-label">{l}</div>
                </div>
              ))}
            </div>

            <div>
              <p style={{ fontSize:11, color:"var(--text-3)", textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:10, textAlign:"center" }}>
                Try one of these
              </p>
              <div className="suggestions">
                {sugg.map((s) => (
                  <button key={s} className="suggestion-chip" onClick={() => submit(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {msgs.map((m) =>
              m.kind === "translate"
                ? <TranslateCard key={m.id} msg={m} />
                : <ChatBubble   key={m.id} msg={m} />
            )}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* ── Input area ── */}
      <div className="input-area">
        <div className="input-toolbar">
          <LangSelector value={lang} onChange={setLang} />
          {!empty && (
            <button className="clear-btn" onClick={() => { setMsgs([]); setInput(""); }}>
              <RotateCcw size={12} />
              Clear
            </button>
          )}
        </div>

        <div className="input-row">
          <textarea
            ref={inputRef}
            className="input-box"
            value={input}
            placeholder={
              mode === "translate"
                ? `Translate to ${lang.name}...`
                : `Ask anything - reply in ${lang.name}...`
            }
            rows={1}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setInput(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
            }}
            onKeyDown={onKey}
          />
          <button
            className="send-btn"
            onClick={() => submit(input)}
            disabled={!input.trim() || loading}
          >
            {loading
              ? <Loader size={17} className="spin" />
              : <Send size={17} />}
          </button>
        </div>

        <div className="input-footer">
          <span className="input-hint">
            {mode === "translate" ? "Enter to translate" : "Enter to send - Shift+Enter for new line"}
          </span>
          <div className="footer-links">
            <a href="https://umarkhemis.github.io/fasiri" target="_blank" rel="noopener noreferrer" className="footer-link">
              Docs
            </a>
            <a href="https://github.com/umarkhemis/fasiri" target="_blank" rel="noopener noreferrer" className="footer-link">
              GitHub
            </a>
            <a href="https://pypi.org/project/fasiri/" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ color:"var(--green)" }}>
              pip install fasiri
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

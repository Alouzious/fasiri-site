"use client";

import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from "react";
import type { Lang, Mode, Msg, TranslateMsg, ChatMsg } from "../types";
import { uid } from "../types";
import { LANGS } from "../data/languages";
import { Header } from "../components/Header";
import { WelcomeScreen } from "../components/WelcomeScreen";
import { TranslateCard } from "../components/TranslateCard";
import { ChatBubble } from "../components/ChatBubble";
import { InputArea } from "../components/InputArea";

export default function DemoPage() {
  const [mode, setMode] = useState<Mode>("translate");
  const [lang, setLang] = useState<Lang>(LANGS[0]);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const chatHistory = msgs
    .filter((m): m is ChatMsg => m.kind === "chat" && !m.loading && m.role !== undefined)
    .map((m) => ({ role: m.role, content: m.english }));

  // ── Translate ─────────────────────────────────────────────────────────

  const doTranslate = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;
      setInput("");
      setLoading(true);

      const ph: TranslateMsg = { id: uid(), kind: "translate", input: text, lang };
      setMsgs((p) => [...p, ph]);

      try {
        const res = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, target_lang: lang.code }),
        });
        const data = await res.json();
        setMsgs((p) =>
          p.map((m) =>
            m.id === ph.id
              ? { ...m, translation: data.translated_text, provider: data.provider, quality: data.quality_score, latency: data.latency_ms, error: data.error }
              : m
          )
        );
      } catch {
        setMsgs((p) => p.map((m) => (m.id === ph.id ? { ...m, error: "Network error. Please try again." } : m)));
      } finally {
        setLoading(false);
        inputRef.current?.focus();
      }
    },
    [loading, lang]
  );

  // ── Chat ──────────────────────────────────────────────────────────────

  const doChat = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;
      setInput("");
      setLoading(true);

      const userMsg: ChatMsg = { id: uid(), kind: "chat", role: "user", english: text, lang };
      const asstPh: ChatMsg = { id: uid(), kind: "chat", role: "assistant", english: "", lang, loading: true };
      setMsgs((p) => [...p, userMsg, asstPh]);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, history: chatHistory, target_lang: lang.code, lang_name: lang.name }),
        });
        const data = await res.json();
        setMsgs((p) =>
          p.map((m) =>
            m.id === asstPh.id
              ? {
                  ...m,
                  loading: false,
                  english: data.english_reply ?? "",
                  translated: data.translated_reply ?? undefined,
                  provider: data.provider ?? undefined,
                  quality: data.quality_score ?? undefined,
                  latency: data.latency_ms ?? undefined,
                  error: data.error ?? undefined,
                }
              : m
          )
        );
      } catch {
        setMsgs((p) => p.map((m) => (m.id === asstPh.id ? { ...m, loading: false, error: "Network error. Please try again." } : m)));
      } finally {
        setLoading(false);
        inputRef.current?.focus();
      }
    },
    [loading, lang, chatHistory]
  );

  const submit = useCallback(
    (text: string) => {
      if (mode === "translate") doTranslate(text);
      else doChat(text);
    },
    [mode, doTranslate, doChat]
  );

  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit(input);
    }
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    setMsgs([]);
    setInput("");
  };

  const empty = msgs.length === 0;

  return (
    <div className="flex flex-col h-dvh max-w-[720px] mx-auto bg-surface border-x border-line max-[720px]:border-none">
      <div className="h-[3px] w-full bg-[linear-gradient(to_right,#2D7D46_0%_33.33%,#C8860A_33.33%_66.66%,#B91C1C_66.66%_100%)]" />

      <Header mode={mode} onSwitchMode={switchMode} />

      <div className="flex-1 overflow-y-auto p-4 max-[500px]:p-3 flex flex-col gap-3 scroll-smooth">
        {empty ? (
          <WelcomeScreen mode={mode} onSubmit={submit} />
        ) : (
          <div className="flex flex-col gap-3">
            {msgs.map((m) =>
              m.kind === "translate" ? <TranslateCard key={m.id} msg={m} /> : <ChatBubble key={m.id} msg={m} />
            )}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <InputArea
        mode={mode}
        lang={lang}
        onChangeLang={setLang}
        input={input}
        onChangeInput={setInput}
        onKeyDown={onKey}
        onSubmit={() => submit(input)}
        loading={loading}
        empty={empty}
        onClear={() => {
          setMsgs([]);
          setInput("");
        }}
        inputRef={inputRef}
      />
    </div>
  );
}

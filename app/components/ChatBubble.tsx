"use client";

import { useState } from "react";
import { BookOpen, ChevronDown } from "lucide-react";
import type { ChatMsg } from "../types";
import { BADGE } from "../data/languages";
import { QBar } from "./QBar";
import { CopyBtn, TTSBtn, ShareBtn } from "./ActionButtons";

export function ChatBubble({ msg }: { msg: ChatMsg }) {
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

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
      <div className="flex gap-2 justify-end animate-fade-up">
        <div className="max-w-[85%] sm:max-w-[520px] max-[500px]:max-w-[92%] rounded-2xl rounded-br-[4px] bg-brand-green text-white px-4 py-[11px] text-sm leading-relaxed break-words">
          {msg.english}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 justify-start animate-fade-up">
      <div className="max-w-[85%] sm:max-w-[520px] max-[500px]:max-w-[92%] rounded-2xl rounded-bl-[4px] bg-surface border border-line px-4 py-3.5 text-sm leading-relaxed break-words shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        {msg.loading ? (
          <div className="flex flex-col gap-2.5">
            <div className="shimmer-bg animate-shimmer h-3.5 rounded w-[90%]" />
            <div className="shimmer-bg animate-shimmer h-3.5 rounded w-[70%]" />
            <div className="shimmer-bg animate-shimmer h-3.5 rounded w-1/2" />
          </div>
        ) : msg.error ? (
          <p className="text-brand-red text-sm m-0">{msg.error}</p>
        ) : (
          <>
            <p className="text-[15px] font-normal text-ink-1 leading-relaxed m-0">{msg.translated ?? msg.english}</p>

            {msg.translated && (
              <div className="mt-2.5">
                <button
                  className="flex items-center gap-1 text-xs text-ink-3 cursor-pointer mt-0 select-none list-none"
                  onClick={() => setEnOpen(!enOpen)}
                >
                  <BookOpen size={11} className="text-ink-3" />
                  <span>{enOpen ? "Hide" : "View in English"}</span>
                  <ChevronDown
                    size={11}
                    className={`text-ink-3 transition-transform duration-150 ${enOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {enOpen && (
                  <p className="text-[13px] text-ink-2 leading-snug mt-2 pl-2.5 border-l-2 border-line">
                    {msg.english}
                  </p>
                )}
              </div>
            )}

            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              {msg.provider && (
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide ${
                    BADGE[msg.provider] ?? ""
                  }`}
                >
                  {msg.provider}
                </span>
              )}
              {msg.latency && <span className="text-[11px] text-ink-3">{msg.latency}ms</span>}
            </div>

            {msg.quality !== undefined && msg.translated && <QBar score={msg.quality} />}

            <div className="flex items-center gap-0.5 mt-2.5 pt-2.5 border-t border-line">
              <CopyBtn text={msg.translated ?? msg.english} />
              {msg.lang.tts && msg.translated && <TTSBtn text={msg.translated} lang={msg.lang.code} />}
              <ShareBtn text={msg.translated ?? msg.english} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

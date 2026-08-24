import type { TranslateMsg } from "../types";
import { BADGE } from "../data/languages";
import { QBar } from "./QBar";
import { CopyBtn, TTSBtn, ShareBtn } from "./ActionButtons";

export function TranslateCard({ msg }: { msg: TranslateMsg }) {
  return (
    <div className="flex flex-col gap-2 animate-fade-up">
      <div className="flex justify-end">
        <div className="max-w-[85%] sm:max-w-[520px] max-[500px]:max-w-[92%] rounded-2xl rounded-br-[4px] bg-brand-green text-white px-4 py-[11px] text-sm leading-relaxed break-words">
          {msg.input}
        </div>
      </div>
      <div className="flex justify-start">
        <div className="max-w-[85%] sm:max-w-[520px] max-[500px]:max-w-[92%] rounded-2xl rounded-bl-[4px] bg-surface border border-line px-4 py-3.5 text-sm leading-relaxed break-words shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          {msg.error ? (
            <p className="text-brand-red text-sm m-0">{msg.error}</p>
          ) : !msg.translation ? (
            <div className="flex flex-col gap-2">
              <div className="shimmer-bg animate-shimmer h-3.5 rounded w-4/5" />
              <div className="shimmer-bg animate-shimmer h-3.5 rounded w-[55%]" />
            </div>
          ) : (
            <>
              <p className="text-[15px] font-normal text-ink-1 leading-relaxed m-0">{msg.translation}</p>
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
                <span className="text-[11px] text-ink-3">{msg.lang.name}</span>
                {msg.latency && <span className="text-[11px] text-ink-3">{msg.latency}ms</span>}
              </div>
              {msg.quality !== undefined && <QBar score={msg.quality} />}
              <div className="flex items-center gap-0.5 mt-2.5 pt-2.5 border-t border-line">
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

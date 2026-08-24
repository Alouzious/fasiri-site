import type { Mode } from "../types";
import { KenteMark } from "./KenteMark";
import { TRANSLATE_SUGG, CHAT_SUGG } from "../data/languages";

export function WelcomeScreen({ mode, onSubmit }: { mode: Mode; onSubmit: (text: string) => void }) {
  const sugg = mode === "translate" ? TRANSLATE_SUGG : CHAT_SUGG;

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-7 px-4 py-6 text-center">
      <div>
        <div className="w-14 h-14 mx-auto mb-3.5 bg-surface2 border border-line rounded-2xl flex items-center justify-center">
          <KenteMark size={30} />
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-ink-1 mb-1.5 tracking-tight">
          {mode === "translate" ? "Translate to African Languages" : "Chat in African Languages"}
        </h2>
        <p className="text-sm text-ink-2 leading-relaxed max-w-[320px] mx-auto">
          {mode === "translate"
            ? "Type English text and get an instant translation via Sunbird AI, Khaya AI, or HuggingFace."
            : "Chat with an AI. Every response is translated into your chosen African language in real time."}
        </p>
      </div>

      <div className="flex gap-8">
        {[["19+", "Languages"], ["3", "Providers"], ["1", "API"]].map(([v, l]) => (
          <div key={l} className="text-center">
            <div className="text-[22px] font-extrabold text-brand-green leading-none">{v}</div>
            <div className="text-[11px] text-ink-3 mt-1 tracking-wide">{l}</div>
          </div>
        ))}
      </div>

      <div>
        <p className="text-[11px] text-ink-3 uppercase tracking-wide mb-2.5 text-center">Try one of these</p>
        <div className="flex flex-wrap gap-2 justify-center max-w-[400px] max-[500px]:gap-1.5">
          {sugg.map((s) => (
            <button
              key={s}
              className="px-3.5 py-1.5 max-[500px]:px-3 rounded-full border border-line bg-surface text-[13px] max-[500px]:text-xs text-ink-1 cursor-pointer whitespace-nowrap transition-colors duration-150 hover:border-brand-green hover:text-brand-green hover:bg-brand-green-light"
              onClick={() => onSubmit(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

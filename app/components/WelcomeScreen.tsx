import type { Mode } from "../types";
import { KenteMark } from "./KenteMark";
import { TRANSLATE_SUGG, CHAT_SUGG } from "../data/languages";

export function WelcomeScreen({ mode, onSubmit }: { mode: Mode; onSubmit: (text: string) => void }) {
  const sugg = mode === "translate" ? TRANSLATE_SUGG : CHAT_SUGG;

  return (
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
            <button key={s} className="suggestion-chip" onClick={() => onSubmit(s)}>
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Languages, MessageSquare, ArrowUpRight } from "lucide-react";
import type { Mode } from "../types";
import { KenteMark } from "./KenteMark";

export function Header({ mode, onSwitchMode }: { mode: Mode; onSwitchMode: (m: Mode) => void }) {
  const modeBtn = (active: boolean) =>
    `flex items-center gap-1.5 px-3.5 py-1.5 max-[420px]:px-2.5 rounded-lg text-[13px] max-[420px]:text-xs font-medium whitespace-nowrap border-none cursor-pointer transition-all duration-150 ${
      active ? "bg-surface text-ink-1 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.05)]" : "bg-transparent text-ink-2"
    }`;

  return (
    <header className="flex items-center justify-between gap-3 px-4 py-3 bg-surface border-b border-line shrink-0 sticky top-0 z-30">
      <div className="flex items-center gap-2.5 shrink-0">
        <KenteMark size={28} />
        <div className="leading-tight">
          <div className="font-bold text-[15px] tracking-tight">fasiri</div>
          <div className="hidden sm:block text-[11px] text-ink-3">African Language AI</div>
        </div>
      </div>

      <div className="flex bg-surface2 border border-line rounded-[10px] p-[3px] gap-0.5">
        <button className={modeBtn(mode === "translate")} onClick={() => onSwitchMode("translate")}>
          <Languages size={13} />
          <span className="max-[420px]:hidden">Translate</span>
        </button>
        <button className={modeBtn(mode === "chat")} onClick={() => onSwitchMode("chat")}>
          <MessageSquare size={13} />
          <span className="max-[420px]:hidden">Chat AI</span>
        </button>
      </div>

      <div className="flex gap-1.5 items-center shrink-0">
        <a
          href="https://fasiri-bu9u.onrender.com/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-ink-3 no-underline px-2 py-1.5 rounded-md transition-colors duration-150 hover:text-ink-2"
        >
          <ArrowUpRight size={13} />
          <span className="hidden sm:inline">API</span>
        </a>
        <a
          href="https://pypi.org/project/fasiri/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-semibold bg-brand-green text-white px-3 py-1.5 rounded-lg no-underline"
        >
          Install SDK
        </a>
      </div>
    </header>
  );
}

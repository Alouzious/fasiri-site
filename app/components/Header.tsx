import { Languages, MessageSquare, ArrowUpRight } from "lucide-react";
import type { Mode } from "../types";
import { KenteMark } from "./KenteMark";

export function Header({ mode, onSwitchMode }: { mode: Mode; onSwitchMode: (m: Mode) => void }) {
  return (
    <header className="app-header">
      <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
        <KenteMark size={28} />
        <div style={{ lineHeight:1.2 }}>
          <div style={{ fontWeight:700, fontSize:15, letterSpacing:"-0.3px" }}>fasiri</div>
          <div style={{ fontSize:11, color:"var(--text-3)" }} className="hidden-mobile">African Language AI</div>
        </div>
      </div>

      <div className="mode-toggle">
        <button className={`mode-btn ${mode === "translate" ? "active" : ""}`} onClick={() => onSwitchMode("translate")}>
          <Languages size={13} />
          <span className="label">Translate</span>
        </button>
        <button className={`mode-btn ${mode === "chat" ? "active" : ""}`} onClick={() => onSwitchMode("chat")}>
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
  );
}

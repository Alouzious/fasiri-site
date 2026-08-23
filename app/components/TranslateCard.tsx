import type { TranslateMsg } from "../types";
import { BADGE } from "../data/languages";
import { QBar } from "./QBar";
import { CopyBtn, TTSBtn, ShareBtn } from "./ActionButtons";

export function TranslateCard({ msg }: { msg: TranslateMsg }) {
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

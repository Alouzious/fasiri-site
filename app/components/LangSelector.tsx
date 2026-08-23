"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Volume2 } from "lucide-react";
import type { Lang } from "../types";
import { LANGS, BADGE } from "../data/languages";

export function LangSelector({ value, onChange }: { value: Lang; onChange: (l: Lang) => void }) {
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

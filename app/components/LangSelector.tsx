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
    (acc[l.region] ??= []).push(l);
    return acc;
  }, {});

  return (
    <div ref={ref} className="relative">
      <button
        className="flex items-center gap-1.5 px-3 py-1.5 border border-line rounded-lg bg-surface text-[13px] font-medium text-ink-1 cursor-pointer transition-colors duration-150 hover:border-brand-green"
        onClick={() => setOpen(!open)}
      >
        <Globe size={13} className="text-brand-green" />
        <span>{value.name}</span>
        <span className="hidden sm:inline text-ink-3 text-xs">{value.native}</span>
        <ChevronDown
          size={12}
          className={`text-ink-3 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute bottom-[calc(100%+8px)] left-0 w-[280px] bg-surface border border-line rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] z-50 overflow-hidden">
          <div className="max-h-[280px] overflow-y-auto p-1.5">
            {Object.entries(grouped).map(([region, langs]) => (
              <div key={region}>
                <p className="px-2.5 pt-1.5 pb-0.5 text-[10px] font-bold text-ink-3 uppercase tracking-wide">
                  {region}
                </p>
                {langs.map((l) => (
                  <button
                    key={l.code}
                    className={`flex items-center justify-between w-full px-2.5 py-2 rounded-lg border-none bg-transparent cursor-pointer text-[13px] text-left transition-colors duration-100 hover:bg-surface2 ${
                      l.code === value.code
                        ? "bg-brand-green-light text-brand-green font-semibold"
                        : "text-ink-1"
                    }`}
                    onClick={() => {
                      onChange(l);
                      setOpen(false);
                    }}
                  >
                    <span className="flex items-center gap-1.5">
                      <span>{l.name}</span>
                      <span className="text-[11px] text-ink-3">{l.native}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      {l.tts && <Volume2 size={11} className="text-brand-green" />}
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide ${
                          BADGE[l.provider]
                        }`}
                      >
                        {l.provider}
                      </span>
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

"use client";

import { type RefObject, type KeyboardEvent, type ChangeEvent } from "react";
import { RotateCcw, Send, Loader } from "lucide-react";
import type { Lang, Mode } from "../types";
import { LangSelector } from "./LangSelector";

type Props = {
  mode: Mode;
  lang: Lang;
  onChangeLang: (l: Lang) => void;
  input: string;
  onChangeInput: (v: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  loading: boolean;
  empty: boolean;
  onClear: () => void;
  inputRef: RefObject<HTMLTextAreaElement | null>;
};

export function InputArea({
  mode,
  lang,
  onChangeLang,
  input,
  onChangeInput,
  onKeyDown,
  onSubmit,
  loading,
  empty,
  onClear,
  inputRef,
}: Props) {
  return (
    <div className="shrink-0 px-4 pt-3 pb-4 max-[500px]:px-3 max-[500px]:pt-2.5 max-[500px]:pb-3.5 bg-surface border-t border-line">
      <div className="flex items-center justify-between mb-2.5">
        <LangSelector value={lang} onChange={onChangeLang} />
        {!empty && (
          <button
            className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-line bg-transparent text-xs text-ink-3 cursor-pointer transition-colors duration-150 hover:text-ink-2 hover:border-ink-3"
            onClick={onClear}
          >
            <RotateCcw size={12} />
            Clear
          </button>
        )}
      </div>

      <div className="flex items-end gap-2">
        <textarea
          ref={inputRef}
          className="flex-1 min-h-[44px] max-h-[120px] px-3.5 py-[11px] border border-line rounded-xl text-sm font-sans resize-none outline-none bg-surface2 text-ink-1 leading-normal overflow-y-auto transition-[border-color,box-shadow] duration-150 placeholder:text-ink-3 focus:border-brand-green focus:shadow-[0_0_0_3px_rgba(45,125,70,0.08)] focus:bg-surface"
          value={input}
          placeholder={mode === "translate" ? `Translate to ${lang.name}...` : `Ask anything - reply in ${lang.name}...`}
          rows={1}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            onChangeInput(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
          }}
          onKeyDown={onKeyDown}
        />
        <button
          className="w-11 h-11 rounded-[10px] bg-brand-green text-white border-none cursor-pointer flex items-center justify-center shrink-0 transition-[background-color,transform] duration-150 enabled:hover:bg-brand-green-dark enabled:active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={onSubmit}
          disabled={!input.trim() || loading}
        >
          {loading ? <Loader size={17} className="animate-spin-fast" /> : <Send size={17} />}
        </button>
      </div>

      <div className="flex items-center justify-between mt-2">
        <span className="text-[11px] text-ink-3">
          {mode === "translate" ? "Enter to translate" : "Enter to send - Shift+Enter for new line"}
        </span>
        <div className="flex items-center gap-3">
          <a
            href="https://umarkhemis.github.io/fasiri"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-ink-3 no-underline transition-colors duration-150 hover:text-brand-green"
          >
            Docs
          </a>
          <a
            href="https://github.com/umarkhemis/fasiri"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-ink-3 no-underline transition-colors duration-150 hover:text-brand-green"
          >
            GitHub
          </a>
          <a
            href="https://pypi.org/project/fasiri/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-brand-green no-underline transition-colors duration-150 hover:text-brand-green"
          >
            pip install fasiri
          </a>
        </div>
      </div>
    </div>
  );
}

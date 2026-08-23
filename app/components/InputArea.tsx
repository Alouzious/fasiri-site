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
  mode, lang, onChangeLang,
  input, onChangeInput, onKeyDown, onSubmit,
  loading, empty, onClear, inputRef,
}: Props) {
  return (
    <div className="input-area">
      <div className="input-toolbar">
        <LangSelector value={lang} onChange={onChangeLang} />
        {!empty && (
          <button className="clear-btn" onClick={onClear}>
            <RotateCcw size={12} />
            Clear
          </button>
        )}
      </div>

      <div className="input-row">
        <textarea
          ref={inputRef}
          className="input-box"
          value={input}
          placeholder={
            mode === "translate"
              ? `Translate to ${lang.name}...`
              : `Ask anything - reply in ${lang.name}...`
          }
          rows={1}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            onChangeInput(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
          }}
          onKeyDown={onKeyDown}
        />
        <button
          className="send-btn"
          onClick={onSubmit}
          disabled={!input.trim() || loading}
        >
          {loading
            ? <Loader size={17} className="spin" />
            : <Send size={17} />}
        </button>
      </div>

      <div className="input-footer">
        <span className="input-hint">
          {mode === "translate" ? "Enter to translate" : "Enter to send - Shift+Enter for new line"}
        </span>
        <div className="footer-links">
          <a href="https://umarkhemis.github.io/fasiri" target="_blank" rel="noopener noreferrer" className="footer-link">
            Docs
          </a>
          <a href="https://github.com/umarkhemis/fasiri" target="_blank" rel="noopener noreferrer" className="footer-link">
            GitHub
          </a>
          <a href="https://pypi.org/project/fasiri/" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ color:"var(--green)" }}>
            pip install fasiri
          </a>
        </div>
      </div>
    </div>
  );
}

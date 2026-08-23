"use client";
import { useState } from "react";
import { Copy, Check, Zap, Globe, Volume2 } from "lucide-react";

const SNIPPET = `# 1 · Install
$ pip install fasiri

# 2 · Import
from fasiri import Fasiri

# 3 · Translate
client = Fasiri(api_key="fsri_...")
result = client.translate(
    "Good morning",
    target="lug",
)
print(result)
# → Wasuze otya`;

export function Hero() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-left">
          <a className="pill-badge" href="https://pypi.org/project/fasiri/" target="_blank" rel="noopener noreferrer">
            <Zap size={12} /> Now Available on PyPI — pip install fasiri
          </a>

          <h1>African language<br />AI, <em>one API away.</em></h1>

          <p className="hero-sub">
            Translate, transcribe, and synthesise speech across 19+ African languages.
            Sunbird AI, Khaya AI, and HuggingFace — unified behind a single, consistent interface.
          </p>

          <div className="hero-pills">
            <span><Globe size={12} /> Translation</span>
            <span>🎙 Speech-to-Text</span>
            <span><Volume2 size={12} /> Text-to-Speech</span>
          </div>

          <div className="hero-cta">
            <a className="btn-primary" href="https://fasiri-bu9u.onrender.com/docs" target="_blank" rel="noopener noreferrer">
              <Zap size={14} /> Generate Free Key
            </a>
            <a className="btn-text" href="https://umarkhemis.github.io/fasiri" target="_blank" rel="noopener noreferrer">
              Read the docs
            </a>
          </div>

          <div className="hero-stats">
            <div><div className="stat-value">19+</div><div className="stat-label">African languages</div></div>
            <div><div className="stat-value">3</div><div className="stat-label">AI providers, 1 API</div></div>
            <div><div className="stat-value">Free</div><div className="stat-label">to start, no card</div></div>
          </div>
        </div>

        <div className="hero-right">
          <div className="code-card">
            <div className="code-card-head">
              <div className="traffic-dots"><span className="dot red" /><span className="dot yellow" /><span className="dot green" /></div>
              <span className="code-card-title">Quick start</span>
              <button onClick={copy} className="code-copy-btn">
                {copied ? <Check size={13} /> : <Copy size={13} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="code-card-body">{SNIPPET}</pre>
          </div>
          <div className="hero-float-badges">
            <span className="float-badge">🌻 Sunbird AI</span>
            <span className="float-badge">🌍 Khaya AI</span>
            <span className="float-badge">🤗 HuggingFace</span>
          </div>
        </div>
      </div>
    </section>
  );
}

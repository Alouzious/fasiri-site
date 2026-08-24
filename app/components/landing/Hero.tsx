"use client";
import { Zap, Globe, Volume2 } from "lucide-react";
import { HeroCanvas } from "./HeroCanvas";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-left hero-fade-in" style={{ animationDelay: "0ms" }}>
          <h1 className="hero-fade-in" style={{ animationDelay: "60ms" }}>
            African language<br />AI, <em>one API away.</em>
          </h1>

          <p className="hero-sub hero-fade-in" style={{ animationDelay: "140ms" }}>
            Translate, transcribe, and synthesise speech across 19+ African languages.
            Sunbird AI, Khaya AI, and HuggingFace — unified behind a single, consistent interface.
          </p>

          <div className="hero-pills hero-fade-in" style={{ animationDelay: "220ms" }}>
            <span><Globe size={12} /> Translation</span>
            <span>🎙 Speech-to-Text</span>
            <span><Volume2 size={12} /> Text-to-Speech</span>
          </div>

          <div className="hero-cta hero-fade-in" style={{ animationDelay: "300ms" }}>
            <a className="btn-primary" href="https://fasiri-bu9u.onrender.com/docs" target="_blank" rel="noopener noreferrer">
              <Zap size={14} /> Generate Free Key
            </a>
            <a className="btn-text" href="https://umarkhemis.github.io/fasiri" target="_blank" rel="noopener noreferrer">
              Read the docs
            </a>
          </div>

          <div className="hero-stats hero-fade-in" style={{ animationDelay: "380ms" }}>
            <div><div className="stat-value">19+</div><div className="stat-label">African languages</div></div>
            <div><div className="stat-value">3</div><div className="stat-label">AI providers, 1 API</div></div>
            <div><div className="stat-value">Free</div><div className="stat-label">to start, no card</div></div>
          </div>
        </div>

        <div className="hero-right hero-fade-in" style={{ animationDelay: "180ms" }}>
          <HeroCanvas />
        </div>
      </div>
    </section>
  );
}

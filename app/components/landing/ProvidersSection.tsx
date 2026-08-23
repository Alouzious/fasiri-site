import { PROVIDERS } from "../../data/providers";

const AVATAR_BG: Record<string, string> = {
  sunbird: "#e8f6ec",
  khaya: "#e8f1fc",
  huggingface: "#fef6e0",
};

export function ProvidersSection() {
  return (
    <section id="providers" className="section section-white">
      <p className="section-eyebrow">Providers</p>
      <h2>Best-in-class providers, unified</h2>
      <p className="section-sub">
        Fasiri routes each request to the provider with the deepest expertise for that language. If one fails, the next takes over.
      </p>
      <div className="providers-grid">
        {PROVIDERS.map((p) => (
          <div key={p.id} className="provider-card">
            <div className="provider-emoji" style={{ background: AVATAR_BG[p.id] }}>{p.emoji}</div>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <div className="provider-caps">
              {p.capabilities.map((c) => <span key={c}>{c}</span>)}
            </div>
            <div className="provider-langs">
              {p.langs.map((code) => <span key={code}>{code}</span>)}
            </div>
            <a href={p.learnMore} target="_blank" rel="noopener noreferrer">Learn more →</a>
          </div>
        ))}
      </div>
    </section>
  );
}

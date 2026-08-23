import { Zap, Terminal, Globe, ChevronRight } from "lucide-react";

const STEPS = [
  { n: "01", icon: Zap, title: "Generate a key", body: "Click the button above. Your API key is ready instantly — no account, no credit card, no waitlist." },
  { n: "02", icon: Terminal, title: "Install the SDK", body: "Run pip install fasiri. Full type hints, sync/async support, and comprehensive error handling included." },
  { n: "03", icon: Globe, title: "Translate anything", body: "Pass your text and target language. Fasiri picks the best provider and falls back automatically if anything fails." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section section-white">
      <p className="section-eyebrow">How it works</p>
      <h2>Three steps to African language AI</h2>
      <p className="section-sub">
        Fasiri handles provider selection, fallback routing, and error recovery automatically. You just write the code.
      </p>
      <div className="steps-grid">
        {STEPS.map((s, i) => (
          <div key={s.n} className="step-card-wrap">
            <div className="step-card">
              <div className="step-num">{s.n}</div>
              <s.icon size={18} color="var(--green)" />
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
            {i < STEPS.length - 1 && <ChevronRight className="step-chevron" size={20} />}
          </div>
        ))}
      </div>
    </section>
  );
}

import { Zap, Terminal, Globe, ChevronRight } from "lucide-react";

const STEPS = [
  { n: "01", icon: Zap, title: "Generate a key", body: "Click the button above. Your API key is ready instantly — no account, no credit card, no waitlist." },
  { n: "02", icon: Terminal, title: "Install the SDK", body: "Run pip install fasiri. Full type hints, sync/async support, and comprehensive error handling included." },
  { n: "03", icon: Globe, title: "Translate anything", body: "Pass your text and target language. Fasiri picks the best provider and falls back automatically if anything fails." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-14 px-6 text-center border-t border-line bg-white">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-brand-gold font-bold text-xs uppercase tracking-wide mb-2">How it works</p>
        <h2 className="font-display text-[28px] font-extrabold mb-3 tracking-tight">Three steps to African language AI</h2>
        <p className="text-ink-2 max-w-[560px] mx-auto mb-8 leading-relaxed text-sm">
          Fasiri handles provider selection, fallback routing, and error recovery automatically. You just write the code.
        </p>
        <div className="flex items-stretch gap-0 max-[860px]:flex-col">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex items-center flex-1">
              <div className="flex-1 text-left border border-line rounded-2xl p-5">
                <div className="font-display italic text-line text-xl mb-2">{s.n}</div>
                <s.icon size={18} className="text-brand-green" />
                <h3 className="mt-2 mb-2 text-base">{s.title}</h3>
                <p className="m-0 text-ink-2 text-[13px] leading-relaxed">{s.body}</p>
              </div>
              {i < STEPS.length - 1 && (
                <ChevronRight className="text-line shrink-0 mx-1 max-[860px]:rotate-90 max-[860px]:my-2" size={20} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

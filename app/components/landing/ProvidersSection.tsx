import { PROVIDERS } from "../../data/providers";

const AVATAR_BG: Record<string, string> = {
  sunbird: "#e8f6ec",
  khaya: "#e8f1fc",
  huggingface: "#fef6e0",
};

export function ProvidersSection() {
  return (
    <section id="providers" className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-xs font-semibold tracking-wide uppercase text-brand-green mb-2">
          Providers
        </p>
        <h2 className="text-3xl font-bold text-ink-1 mb-3">
          Best-in-class providers, unified
        </h2>
        <p className="text-ink-2 max-w-2xl mx-auto mb-12">
          Fasiri routes each request to the provider with the deepest expertise for that language. If one fails, the next takes over.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
          {PROVIDERS.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl border border-line bg-surface2 p-6 flex flex-col"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-4"
                style={{ background: AVATAR_BG[p.id] }}
              >
                {p.emoji}
              </div>

              <h3 className="text-lg font-semibold text-ink-1 mb-2">
                {p.name}
              </h3>

              <p className="text-sm text-ink-2 mb-4 flex-grow">
                {p.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-3">
                {p.capabilities.map((c) => (
                  <span
                    key={c}
                    className="text-xs font-medium px-2 py-1 rounded-full bg-brand-green-light text-brand-green-dark"
                  >
                    {c}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.langs.map((code) => (
                  <span
                    key={code}
                    className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white border border-line text-ink-3"
                  >
                    {code}
                  </span>
                ))}
              </div>

              <a
                href={p.learnMore}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-brand-green hover:underline mt-auto"
              >
                Learn more →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
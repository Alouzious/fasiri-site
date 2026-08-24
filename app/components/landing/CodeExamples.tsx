"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

const SNIPPETS: Record<string, string> = {
  Python: `from fasiri import Fasiri

client = Fasiri(api_key="fsri_...")

# Translate English → Luganda
result = client.translate(
    "Good morning, how are you?",
    target="lug",
)
print(result.translated_text)
# "Wasuze otya, oli otya?"
print(result.provider)       # "sunbird"
print(result.quality_score)  # 0.92

# Batch translate
batch = client.translate_batch([
    {"id":"1", "text":"Thank you", "target":"yo"},
    {"id":"2", "text":"Welcome",   "target":"sw"},
    {"id":"3", "text":"Hello",     "target":"tw"},
])
for item in batch.successful():
    print(item.translated_text)`,
  cURL: `curl -X POST https://fasiri-bu9u.onrender.com/translate \\
  -H "Authorization: Bearer fsri_..." \\
  -H "Content-Type: application/json" \\
  -d '{"text": "Good morning", "target_lang": "lug"}'`,
  JavaScript: `const res = await fetch("https://fasiri-bu9u.onrender.com/translate", {
  method: "POST",
  headers: {
    "Authorization": "Bearer fsri_...",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ text: "Good morning", target_lang: "lug" }),
});
const data = await res.json();
console.log(data.translated_text);`,
};

export function CodeExamples() {
  const [tab, setTab] = useState<keyof typeof SNIPPETS>("Python");
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(SNIPPETS[tab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-14 px-6 text-center border-t border-line bg-white">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-brand-gold font-bold text-xs uppercase tracking-wide mb-2">Code examples</p>
        <h2 className="font-display text-[28px] font-extrabold mb-3 tracking-tight">Works with every stack</h2>
        <p className="text-ink-2 max-w-[560px] mx-auto mb-8 leading-relaxed text-sm">
          Use the Python SDK for the best experience, or call the REST API directly from any language.
        </p>
        <div className="bg-[#0f172a] rounded-2xl overflow-hidden max-w-[720px] mx-auto text-left">
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#1e293b]">
            <div className="flex gap-1">
              {Object.keys(SNIPPETS).map((k) => (
                <button
                  key={k}
                  className={`border-none rounded-md text-xs px-2.5 py-1 cursor-pointer ${
                    tab === k ? "bg-[#334155] text-white" : "bg-transparent text-[#94a3b8]"
                  }`}
                  onClick={() => setTab(k as keyof typeof SNIPPETS)}
                >
                  {k}
                </button>
              ))}
            </div>
            <button onClick={copy} className="flex items-center gap-1 bg-transparent border-none text-[#94a3b8] text-xs cursor-pointer">
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="m-0 p-4 text-[#e2e8f0] text-[13px] leading-relaxed overflow-x-auto whitespace-pre">{SNIPPETS[tab]}</pre>
        </div>
        <div className="flex justify-center gap-5 mt-3.5 text-sm">
          <a href="https://fasiri-bu9u.onrender.com/docs" target="_blank" rel="noopener noreferrer" className="text-brand-green no-underline">
            Full API reference
          </a>
          <a href="https://pypi.org/project/fasiri/" target="_blank" rel="noopener noreferrer" className="text-brand-green no-underline">
            PyPI package
          </a>
        </div>
      </div>
    </section>
  );
}

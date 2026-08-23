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
    <section className="section">
      <p className="section-eyebrow">Code examples</p>
      <h2>Works with every stack</h2>
      <p className="section-sub">
        Use the Python SDK for the best experience, or call the REST API directly from any language.
      </p>
      <div className="code-card code-card-wide">
        <div className="code-card-head">
          <div className="code-tabs">
            {Object.keys(SNIPPETS).map((k) => (
              <button
                key={k}
                className={`code-tab ${tab === k ? "active" : ""}`}
                onClick={() => setTab(k as keyof typeof SNIPPETS)}
              >
                {k}
              </button>
            ))}
          </div>
          <button onClick={copy} className="code-copy-btn">
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="code-card-body">{SNIPPETS[tab]}</pre>
      </div>
      <div className="code-links">
        <a href="https://fasiri-bu9u.onrender.com/docs" target="_blank" rel="noopener noreferrer">Full API reference</a>
        <a href="https://pypi.org/project/fasiri/" target="_blank" rel="noopener noreferrer">PyPI package</a>
      </div>
    </section>
  );
}

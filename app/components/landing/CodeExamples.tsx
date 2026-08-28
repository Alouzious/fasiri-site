"use client";

import { useState } from "react";
import { Copy, Check, ChevronDown } from "lucide-react";
import { KenteMark } from "../KenteMark";

const SNIPPETS: Record<string, { install: string; code: string }> = {
  Python: {
    install: "pip install fasiri",
    code: `import { Fasiri } from 'fasiri';

const client = new Fasiri({ apiKey: 'fsri_...' });

// Translate English -> Luganda
const result = await client.translate({
  text: 'Good morning, how are you?',
  target: 'lug'
});

console.log(result.translatedText);
// "Wasuze otya, oli otya?"`,
  },
  JavaScript: {
    install: "npm install @fasiri/sdk",
    code: `const res = await fetch("https://fasiri-bu9u.onrender.com/translate", {
  method: "POST",
  headers: {
    "Authorization": "Bearer fsri_...",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ text: "Good morning", target_lang: "lug" }),
});

const data = await res.json();
console.log(data.translated_text);`,
  },
  cURL: {
    install: "curl -V",
    code: `curl -X POST https://fasiri-bu9u.onrender.com/translate \\
  -H "Authorization: Bearer fsri_..." \\
  -H "Content-Type: application/json" \\
  -d '{"text": "Good morning", "target_lang": "lug"}'`,
  },
};

export function CodeExamples() {
  const [tab, setTab] = useState<keyof typeof SNIPPETS>("Python");
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(SNIPPETS[tab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-[#fbf9f5] py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Heading & Info */}
        <div className="lg:col-span-5 text-left">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-1 font-bold text-xl text-black">
              <KenteMark size={24} />
              <span className="font-display italic -ml-0.5">fasiri</span>
            </div>
            <span className="bg-[#e9e3d5] text-black text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded tracking-wider">
              API
            </span>
          </div>

          <h2 className="font-mono text-4xl md:text-5xl font-extrabold text-black leading-tight tracking-tight mb-6">
            Works with every stack.
          </h2>

          <p className="text-[#555] text-base leading-relaxed mb-8">
            Power your applications with unified African language AI capabilities.
            From single API translation calls to full Python SDK integrations, all in one consistent interface.
          </p>

          <a
            href="https://fasiri-demo.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-black text-white font-mono text-xs uppercase tracking-wider font-semibold px-6 py-3.5 rounded-lg hover:bg-gray-800 transition-colors no-underline"
          >
            See how it works →
          </a>
        </div>

        {/* Right Column: Code Window & Floating Cards */}
        <div className="lg:col-span-7 relative">
          {/* Top Language Selector Bar */}
          <div className="flex justify-end mb-4">
            <div className="bg-[#efeadc] p-1 rounded-xl flex items-center gap-1 shadow-inner border border-[#e2dccb]">
              {Object.keys(SNIPPETS).map((k) => (
                <button
                  key={k}
                  onClick={() => setTab(k as keyof typeof SNIPPETS)}
                  className={`font-mono text-xs font-semibold px-4 py-1.5 rounded-lg transition-all ${
                    tab === k
                      ? "bg-white text-black shadow-sm"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          {/* Main Dark Code Card */}
          <div className="bg-[#0a0a0c] rounded-2xl p-5 shadow-2xl border border-gray-800 relative z-10 text-left font-mono">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800/80 mb-4 text-xs text-gray-400">
              <div className="flex items-center gap-1 cursor-pointer hover:text-white">
                <span>API REQUEST</span>
                <ChevronDown size={14} />
              </div>
            </div>

            {/* Terminal Command Prompt */}
            <div className="bg-[#14161d] text-[#4ade80] px-3.5 py-2 rounded-lg text-xs mb-4 flex items-center gap-2 overflow-x-auto">
              <span className="text-gray-500">$</span>
              <span>{SNIPPETS[tab].install}</span>
            </div>

            {/* Code Block */}
            <pre className="text-gray-200 text-xs leading-relaxed overflow-x-auto whitespace-pre font-mono p-1">
              {SNIPPETS[tab].code}
            </pre>

            {/* Copy Button */}
            <div className="mt-4 pt-3 border-t border-gray-800/80 flex justify-end">
              <button
                onClick={copy}
                className="flex items-center gap-1.5 text-gray-400 hover:text-white text-xs font-mono bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-md transition-colors"
              >
                {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                <span>{copied ? "Copied" : "Copy code"}</span>
              </button>
            </div>
          </div>

          {/* Floating Status Card Accent */}
          <div className="absolute -bottom-6 -right-2 z-20 bg-[#eae4d5] border border-[#d8d0bd] p-3.5 rounded-xl shadow-xl font-mono text-left hidden sm:block">
            <div className="text-[10px] text-gray-600 mb-2">
              Translate Request (EN → LUG)
            </div>
            <div className="flex items-center gap-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
              <span className="text-xs font-bold text-black">200 OK</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
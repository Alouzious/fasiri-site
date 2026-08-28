"use client";

import { useState } from "react";
import { Zap, Terminal, Globe, ChevronRight, Copy, Check } from "lucide-react";

export function HowItWorksSection() {
  const [copied, setCopied] = useState(false);

  const copyInstall = () => {
    navigator.clipboard.writeText("pip install fasiri");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="how-it-works"
      className="py-24 px-6 bg-[#fafafa] text-center border-t border-gray-200/80 font-sans relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section Heading */}
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Three steps to African language AI
        </h2>
        <p className="text-slate-600 max-w-[620px] mx-auto mb-16 leading-relaxed text-base font-normal">
          Fasiri handles provider selection, fallback routing, and error recovery automatically. You just write the code.
        </p>

        {/* Developer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left relative">
          
          {/* STEP 1 */}
          <div className="group relative bg-white border border-gray-200 rounded-2xl p-7 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/40 hover:-translate-y-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                  <Zap size={20} />
                </div>
                <span className="font-mono italic font-bold text-4xl text-gray-200 group-hover:text-emerald-500/20 transition-colors">
                  01
                </span>
              </div>

              <h3 className="font-bold text-lg text-slate-900 mb-2">
                Generate API Key
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Instant access to unified model endpoints no account verification, no credit card required.
              </p>
            </div>

            <a
              href="https://fasiri-bu9u.onrender.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold text-slate-800 transition-colors no-underline"
            >
              <span>Get Your Free Key</span>
              <span className="text-emerald-600 font-bold">↗</span>
            </a>
          </div>

          {/* Connector Arrow 1 */}
          <div className="hidden md:flex absolute top-1/2 left-[32.5%] -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-gray-200 items-center justify-center text-slate-400 shadow-sm">
            <ChevronRight size={16} />
          </div>

          {/* STEP 2 */}
          <div className="group relative bg-white border border-gray-200 rounded-2xl p-7 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/40 hover:-translate-y-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                  <Terminal size={18} />
                </div>
                <span className="font-mono italic font-bold text-4xl text-gray-200 group-hover:text-emerald-500/20 transition-colors">
                  02
                </span>
              </div>

              <h3 className="font-bold text-lg text-slate-900 mb-2">
                Install the SDK
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Full TypeScript/Python typing, async streaming support and built-in error handling.
              </p>
            </div>

            {/* Interactive Terminal Snippet */}
            <div className="bg-slate-950 rounded-xl p-3 flex items-center justify-between border border-slate-800 font-mono text-xs text-slate-200">
              <span className="text-emerald-400 font-semibold">$ pip install fasiri</span>
              <button
                onClick={copyInstall}
                className="text-slate-400 hover:text-white transition-colors p-1"
                title="Copy Command"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>
            </div>
          </div>

          {/* Connector Arrow 2 */}
          <div className="hidden md:flex absolute top-1/2 left-[65.8%] -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-gray-200 items-center justify-center text-slate-400 shadow-sm">
            <ChevronRight size={16} />
          </div>

          {/* STEP 3 */}
          <div className="group relative bg-white border border-gray-200 rounded-2xl p-7 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/40 hover:-translate-y-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                  <Globe size={20} />
                </div>
                <span className="font-mono italic font-bold text-4xl text-gray-200 group-hover:text-emerald-500/20 transition-colors">
                  03
                </span>
              </div>

              <h3 className="font-bold text-lg text-slate-900 mb-2">
                Translate Anything
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Automated multi-provider failover across Sunbird, Khaya, and HuggingFace.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Auto-routing & Fallback Active</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export { HowItWorksSection as LanguagesSection };
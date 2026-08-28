import { KenteMark } from "../KenteMark";

export function Footer() {
  const linkCls =
    "block text-[#94a3b8] text-xs font-medium no-underline mb-2.5 transition-all duration-200 hover:text-white hover:translate-x-1 w-fit";

  return (
    <footer className="bg-dark-bg text-[#94a3b8] pt-16 pb-8 px-6 border-t border-dark-line/50 relative overflow-hidden">
      {/* Top Accent Stripe matching Nav */}
      <div className="h-1 w-full flex absolute top-0 left-0 right-0">
        <div className="flex-1 bg-[#16a34a]" />
        <div className="flex-1 bg-[#f5c451]" />
        <div className="flex-1 bg-[#dc2626]" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 text-left mb-16 relative z-10">
          <div className="md:col-span-2 pr-4">
            <div className="flex items-center gap-1 font-bold text-xl text-white mb-3">
              <KenteMark size={28} />
              <span className="font-display italic -ml-0.5">asiri</span>
            </div>
            <p className="text-[#64748b] text-xs leading-relaxed max-w-sm">
              Unified translation, speech-to-text, and text-to-speech API for
              African languages. Powered by Sunbird AI, Khaya AI, and
              HuggingFace.
            </p>
          </div>

          <div>
            <h5 className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b] mb-4">
              Product
            </h5>
            <a href="#how-it-works" className={linkCls}>
              How it works
            </a>
            <a href="#languages" className={linkCls}>
              Languages
            </a>
            <a href="#providers" className={linkCls}>
              Providers
            </a>
          </div>

          <div>
            <h5 className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b] mb-4">
              Developers
            </h5>
            <a
              href="https://fasiri.readthedocs.io/en/latest/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkCls}
            >
              Documentation
            </a>
            <a
              href="https://fasiri-bu9u.onrender.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className={linkCls}
            >
              API Reference
            </a>
            <a
              href="https://pypi.org/project/fasiri/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkCls}
            >
              Python SDK
            </a>
          </div>

          <div>
            <h5 className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b] mb-4">
              Resources
            </h5>
            <a href="/demo" className={linkCls}>
              Live Demo
            </a>
            <a
              href="https://www.sunbird.ai"
              target="_blank"
              rel="noopener noreferrer"
              className={linkCls}
            >
              Sunbird AI
            </a>
            <a
              href="https://ghananlp.org"
              target="_blank"
              rel="noopener noreferrer"
              className={linkCls}
            >
              Khaya AI
            </a>
          </div>
        </div>

        {/* Big HIFI-style Typography Banner */}
        <div className="w-full my-6 select-none overflow-hidden flex justify-center items-center">
          <h1 className="text-[15vw] leading-none font-black tracking-tighter text-white/10 uppercase hover:text-white/20 transition-colors duration-500 cursor-default">
            FASIRI
          </h1>
        </div>

        {/* Bottom Legal / Copyright Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#64748b] border-t border-dark-line/40 pt-6 font-mono">
          <span>
            © 2026 Beta-Tech Labs. Built for African language developers.
          </span>

          <div className="flex gap-6">
            <a
              href="https://pypi.org/project/fasiri/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#64748b] no-underline hover:text-white transition-colors"
            >
              PyPI
            </a>
            <a
              href="https://fasiri.readthedocs.io/en/latest/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#64748b] no-underline hover:text-white transition-colors"
            >
              Docs
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
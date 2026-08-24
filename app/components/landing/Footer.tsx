export function Footer() {
  const linkCls = "block text-[#94a3b8] text-[13px] no-underline mb-2 hover:text-white transition-colors duration-150";

  return (
    <footer className="bg-dark-bg text-[#94a3b8] pt-12 px-6 pb-6 mt-5">
      <div className="max-w-[1100px] mx-auto grid grid-cols-[2fr_1fr_1fr_1fr] max-[640px]:grid-cols-2 gap-6 text-left mb-8">
        <div>
          <div className="font-display italic text-white font-bold text-base mb-2">fasiri</div>
          <p className="text-[#64748b] text-xs leading-relaxed">
            Unified translation and speech API for African languages. Powered by Sunbird AI, Khaya AI, and HuggingFace.
          </p>
        </div>
        <div>
          <h5 className="text-xs uppercase text-[#64748b] m-0 mb-2.5">Product</h5>
          <a href="#how-it-works" className={linkCls}>How it works</a>
          <a href="#languages" className={linkCls}>Languages</a>
          <a href="#providers" className={linkCls}>Providers</a>
        </div>
        <div>
          <h5 className="text-xs uppercase text-[#64748b] m-0 mb-2.5">Developers</h5>
          <a href="https://umarkhemis.github.io/fasiri" target="_blank" rel="noopener noreferrer" className={linkCls}>Documentation</a>
          <a href="https://fasiri-bu9u.onrender.com/docs" target="_blank" rel="noopener noreferrer" className={linkCls}>API Reference</a>
          <a href="https://pypi.org/project/fasiri/" target="_blank" rel="noopener noreferrer" className={linkCls}>Python SDK</a>
          <a href="https://github.com/umarkhemis/fasiri" target="_blank" rel="noopener noreferrer" className={linkCls}>GitHub</a>
        </div>
        <div>
          <h5 className="text-xs uppercase text-[#64748b] m-0 mb-2.5">Resources</h5>
          <a href="/demo" className={linkCls}>Live Demo</a>
          <a href="https://www.sunbird.ai" target="_blank" rel="noopener noreferrer" className={linkCls}>Sunbird AI</a>
          <a href="https://ghananlp.org" target="_blank" rel="noopener noreferrer" className={linkCls}>Khaya AI</a>
        </div>
      </div>
      <div className="max-w-[1100px] mx-auto flex justify-between flex-wrap gap-3 text-xs text-[#64748b] border-t border-dark-line pt-5 mt-2.5">
        <span>© 2026 Beta-Tech Labs. Built for African language developers.</span>
        <div className="flex gap-4">
          <a href="https://github.com/umarkhemis/fasiri" target="_blank" rel="noopener noreferrer" className="text-[#64748b] no-underline hover:text-white">GitHub</a>
          <a href="https://pypi.org/project/fasiri/" target="_blank" rel="noopener noreferrer" className="text-[#64748b] no-underline hover:text-white">PyPI</a>
          <a href="https://umarkhemis.github.io/fasiri" target="_blank" rel="noopener noreferrer" className="text-[#64748b] no-underline hover:text-white">Docs</a>
        </div>
      </div>
    </footer>
  );
}

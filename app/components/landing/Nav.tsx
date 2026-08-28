import { KenteMark } from "../KenteMark";

export function Nav() {
  return (
    <>
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-[#16a34a]" />
        <div className="flex-1 bg-[#f5c451]" />
        <div className="flex-1 bg-[#dc2626]" />
      </div>

      <div className="sticky top-0 z-50 bg-dark-bg px-4 py-3">
        <header className="max-w-6xl mx-auto flex items-center justify-between gap-3 flex-wrap rounded-2xl border border-dark-line bg-dark-bg px-5 py-3">
          <div className="flex items-center gap-1 font-bold text-[17px] text-white">
            <KenteMark size={26} />
            <span className="font-display italic -ml-0.5">asiri</span>
          </div>

          <nav className="flex items-center gap-6 flex-wrap text-sm">
            <a href="#how-it-works" className="text-dark-text2 no-underline hover:text-white transition-colors">
              How it works
            </a>
            <a href="#languages" className="text-dark-text2 no-underline hover:text-white transition-colors">
              Languages
            </a>
            <a href="#providers" className="text-dark-text2 no-underline hover:text-white transition-colors">
              Providers
            </a>
            <a
              href="https://fasiri.readthedocs.io/en/latest/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-text2 no-underline hover:text-white transition-colors"
            >
              Docs
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://fasiri-demo.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-dark-bg no-underline text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Try Demo
            </a>
            <a
              href="https://fasiri.readthedocs.io/en/latest/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-dark-line text-white no-underline text-sm font-semibold px-4 py-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              GitHub
            </a>
          </div>
        </header>
      </div>
    </>
  );
}
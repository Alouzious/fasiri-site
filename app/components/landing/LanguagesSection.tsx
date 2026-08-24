import { LANGS } from "../../data/languages";

const capPill = "text-[10px] font-semibold rounded-md px-1.5 py-0.5";

export function LanguagesSection() {
  return (
    <section id="languages" className="py-14 px-6 text-center border-t border-line bg-[#f7f4ec]">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-brand-gold font-bold text-xs uppercase tracking-wide mb-2">Languages</p>
        <h2 className="font-display text-[28px] font-extrabold mb-3 tracking-tight">19+ African languages and counting</h2>
        <p className="text-ink-2 max-w-[560px] mx-auto mb-8 leading-relaxed text-sm">
          From Uganda to Ghana to Kenya to North Africa. Every card shows which capabilities are supported and which provider serves it.
        </p>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3.5 text-left">
          {LANGS.map((l) => (
            <div key={l.code} className="border border-line rounded-xl p-3.5 bg-white">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] text-ink-3 font-bold">{l.code}</span>
                <span className="text-[11px] text-ink-3">{l.provider}</span>
              </div>
              <h4 className="m-0 mb-0.5 text-[15px]">{l.name}</h4>
              <p className="m-0 mb-2.5 text-xs text-ink-3">
                {l.native} · {l.region}
              </p>
              <div className="flex gap-1.5 flex-wrap">
                <span className={`${capPill} bg-[#e8f6ec] text-[#1f7a3d]`}>Translate</span>
                {l.stt && <span className={`${capPill} bg-[#e8f1fc] text-[#1c5fa8]`}>STT</span>}
                {l.tts && <span className={`${capPill} bg-[#f3edfc] text-[#6b3fa0]`}>TTS</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

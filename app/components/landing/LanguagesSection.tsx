import { LANGS } from "../../data/languages";

export function LanguagesSection() {
  return (
    <section id="languages" className="section">
      <p className="section-eyebrow">Languages</p>
      <h2>19+ African languages and counting</h2>
      <p className="section-sub">
        From Uganda to Ghana to Kenya to North Africa. Every card shows which capabilities are supported and which provider serves it.
      </p>
      <div className="lang-grid">
        {LANGS.map((l) => (
          <div key={l.code} className="lang-card">
            <div className="lang-card-top">
              <span className="lang-code">{l.code}</span>
              <span className="lang-provider">{l.provider}</span>
            </div>
            <h4>{l.name}</h4>
            <p className="lang-card-sub">{l.native} · {l.region}</p>
            <div className="lang-card-caps">
              <span className="cap-pill cap-translate">Translate</span>
              {l.stt && <span className="cap-pill cap-stt">STT</span>}
              {l.tts && <span className="cap-pill cap-tts">TTS</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

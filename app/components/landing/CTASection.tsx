import Link from "next/link";

export function CTASection() {
  return (
    <section className="section cta-section">
      <p className="section-eyebrow">Live demo</p>
      <h2>See Fasiri in action</h2>
      <p className="section-sub">
        Try the interactive demo — translate English to any African language, hear the audio, and chat with an AI that responds in your chosen language.
      </p>
      <Link href="/demo" className="btn-primary">Try the live demo</Link>

      <div className="cta-final">
        <h2>Ready to build for African users?</h2>
        <p>Join developers building the next generation of African language applications. Your API key is ready in seconds.</p>
        <div className="hero-cta">
          <a className="btn-primary" href="https://fasiri-bu9u.onrender.com/docs" target="_blank" rel="noopener noreferrer">Get Your Free Key</a>
          <a className="btn-secondary" href="https://github.com/umarkhemis/fasiri" target="_blank" rel="noopener noreferrer">Star on GitHub</a>
        </div>
      </div>
    </section>
  );
}

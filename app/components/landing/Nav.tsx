import { KenteMark } from "../KenteMark";

export function Nav() {
  return (
    <header className="landing-nav">
      <div className="landing-nav-brand">
        <KenteMark size={26} />
        <span>fasiri</span>
      </div>
      <nav className="landing-nav-links">
        <a href="#how-it-works">How it works</a>
        <a href="#languages">Languages</a>
        <a href="#providers">Providers</a>
        <a href="https://umarkhemis.github.io/fasiri" target="_blank" rel="noopener noreferrer">Docs</a>
        <a href="https://github.com/umarkhemis/fasiri" target="_blank" rel="noopener noreferrer">GitHub</a>
      </nav>
      <a href="https://fasiri-bu9u.onrender.com/docs" target="_blank" rel="noopener noreferrer" className="btn-secondary nav-api-btn">API Docs</a>
    </header>
  );
}

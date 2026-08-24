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
        <a href="https://fasiri.readthedocs.io/en/latest/" target="_blank" rel="noopener noreferrer">Docs</a>
      </nav>
    </header>
  );
}

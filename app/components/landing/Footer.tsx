export function Footer() {
  return (
    <footer className="landing-footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand">fasiri</div>
          <p>Unified translation and speech API for African languages. Powered by Sunbird AI, Khaya AI, and HuggingFace.</p>
        </div>
        <div>
          <h5>Product</h5>
          <a href="#how-it-works">How it works</a>
          <a href="#languages">Languages</a>
          <a href="#providers">Providers</a>
        </div>
        <div>
          <h5>Developers</h5>
          <a href="https://umarkhemis.github.io/fasiri" target="_blank" rel="noopener noreferrer">Documentation</a>
          <a href="https://fasiri-bu9u.onrender.com/docs" target="_blank" rel="noopener noreferrer">API Reference</a>
          <a href="https://pypi.org/project/fasiri/" target="_blank" rel="noopener noreferrer">Python SDK</a>
          <a href="https://github.com/umarkhemis/fasiri" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <div>
          <h5>Resources</h5>
          <a href="/demo">Live Demo</a>
          <a href="https://www.sunbird.ai" target="_blank" rel="noopener noreferrer">Sunbird AI</a>
          <a href="https://ghananlp.org" target="_blank" rel="noopener noreferrer">Khaya AI</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Beta-Tech Labs. Built for African language developers.</span>
        <div>
          <a href="https://github.com/umarkhemis/fasiri" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://pypi.org/project/fasiri/" target="_blank" rel="noopener noreferrer">PyPI</a>
          <a href="https://umarkhemis.github.io/fasiri" target="_blank" rel="noopener noreferrer">Docs</a>
        </div>
      </div>
    </footer>
  );
}

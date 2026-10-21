export default function Footer({ linkedin, navigateAnchor }) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <p>Have an idea worth building?</p>
        <a href={linkedin} target="_blank" rel="noreferrer">Let&apos;s connect <span>↗</span></a>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Mykhailo Habor / formeyou</span>
        <div>
          <a href="#top" onClick={(event) => { event.preventDefault(); navigateAnchor('#top'); }}>Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

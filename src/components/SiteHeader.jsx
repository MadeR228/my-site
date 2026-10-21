import { useEffect, useState } from 'react';

function RouteLink({ href, navigatePage, children, ...props }) {
  return <a href={href} onClick={(event) => { event.preventDefault(); navigatePage(href); }} {...props}>{children}</a>;
}

export default function SiteHeader({ linkedin, navigatePage }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const go = (href) => {
    setOpen(false);
    window.setTimeout(() => navigatePage(href), 0);
  };

  return (
    <>
      <header className="site-header">
        <RouteLink className="wordmark" href="/" navigatePage={go} aria-label="HOME | formeyou">MH<span className="accent-dot">.</span></RouteLink>
        <nav className="desktop-nav" aria-label="Primary navigation">
        </nav>
        <button className={`menu-toggle ${open ? 'is-open' : ''}`} type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="menu-panel">
          <span className="menu-label">{open ? 'Close' : 'Menu'}</span>
          <span className="menu-bars" aria-hidden="true"><i /><i /></span>
        </button>
      </header>

      <div className={`menu-panel ${open ? 'is-open' : ''}`} id="menu-panel" aria-hidden={!open}>
        <div className="menu-panel-inner">
          <p className="menu-caption">Navigation</p>
          <nav aria-label="Menu navigation">
            <RouteLink href="/" navigatePage={go}><small>01</small><span>Home</span></RouteLink>
            <RouteLink href="/projects" navigatePage={go}><small>02</small><span>Projects</span></RouteLink>
            <a href={linkedin} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}><small>03</small><span>LinkedIn ↗</span></a>
          </nav>
        </div>
      </div>
    </>
  );
}

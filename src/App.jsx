import { useCallback, useEffect, useRef, useState } from 'react';
import { getPage } from './lib/api.js';
import HomePage from './pages/HomePage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';

const routeName = (pathname) => pathname === '/projects' ? 'projects' : 'home';

function scrollToHash(hash, behavior = 'smooth') {
  const targetId = hash.replace(/^#/, '');
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      if (targetId) document.getElementById(targetId)?.scrollIntoView({ behavior, block: 'start' });
      else window.scrollTo({ top: 0, behavior });
    });
  });
}

export default function App() {
  const [pathname, setPathname] = useState(window.location.pathname);
  const [view, setView] = useState({ status: 'loading', data: null, error: '' });
  const [transition, setTransition] = useState('entering');
  const transitionTimer = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    setView((current) => ({ status: 'loading', data: current.data, error: '' }));

    getPage(routeName(pathname), controller.signal)
      .then((payload) => {
        setView({ status: 'ready', data: payload.data, error: '' });
        setTransition('entering');
        window.requestAnimationFrame(() => window.requestAnimationFrame(() => setTransition('settled')));
        document.title = pathname === '/projects' ? 'Projects | formeyou' : 'formeyou';
        const hash = window.location.hash;
        if (hash) window.setTimeout(() => scrollToHash(hash), 120);
        else window.scrollTo({ top: 0, behavior: 'auto' });
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setView({ status: 'error', data: null, error: error.message });
      });

    return () => controller.abort();
  }, [pathname]);

  useEffect(() => {
    const handlePopState = () => {
      setTransition('leaving');
      window.setTimeout(() => setPathname(window.location.pathname), 180);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => () => window.clearTimeout(transitionTimer.current), []);

  const navigateAnchor = useCallback((hash) => {
    window.history.pushState({}, '', `${window.location.pathname}${hash}`);
    scrollToHash(hash);
  }, []);

  const navigatePage = useCallback((href) => {
    const target = new URL(href, window.location.origin);
    if (target.pathname === window.location.pathname) {
      if (target.hash) navigateAnchor(target.hash);
      else {
        window.history.pushState({}, '', target.pathname);
        scrollToHash('');
      }
      return;
    }

    setTransition('leaving');
    window.clearTimeout(transitionTimer.current);
    transitionTimer.current = window.setTimeout(() => {
      window.history.pushState({}, '', `${target.pathname}${target.hash}`);
      setPathname(target.pathname);
    }, 260);
  }, [navigateAnchor]);

  if (view.status === 'error') {
    return <main className="api-state"><div><strong>API unavailable</strong><p>{view.error}</p><button type="button" onClick={() => window.location.reload()}>Retry</button></div></main>;
  }

  if (!view.data) {
    return <main className="api-state"></main>;
  }

  const page = routeName(pathname) === 'projects'
    ? <ProjectsPage profile={view.data.profile} projects={view.data.projects} navigatePage={navigatePage} navigateAnchor={navigateAnchor} />
    : <HomePage profile={view.data.profile} projects={view.data.projects} navigatePage={navigatePage} navigateAnchor={navigateAnchor} />;

  return (
    <div className={`page-shell phase-${transition}`} aria-busy={view.status === 'loading'}>
      <div className="route-wipe" aria-hidden="true"><span></span></div>
      {page}
    </div>
  );
}

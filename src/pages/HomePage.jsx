import Footer from '../components/Footer.jsx';
import SiteHeader from '../components/SiteHeader.jsx';
import abtPreview from '../img/abtmanager1.jpg';
import actiPreview from '../img/acti1.webp';

const projectPreviews = {
  abt: abtPreview,
  acti: actiPreview,
};

export default function HomePage({ profile, projects, navigatePage, navigateAnchor }) {
  return (
    <main id="top">
      <SiteHeader linkedin={profile.linkedin} navigatePage={navigatePage} />

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy reveal-up">
          <h1 id="hero-title">I build digital<span className="hero-line">products that <em>move.</em></span></h1>
          <p className="hero-intro">{profile.intro}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="/projects" onClick={(event) => { event.preventDefault(); navigatePage('/projects'); }}>Explore my work <span>↗</span></a>
            <a className="text-link" href="#about" onClick={(event) => { event.preventDefault(); navigateAnchor('#about'); }}>More about me <span>↓</span></a>
          </div>
        </div>

        <div className="hero-visual reveal-fade" aria-hidden="true">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="profile-disc"><span>MH</span></div>
          <div className="floating-card card-top"><span className="card-label">Active project</span><strong>BC</strong><span className="card-meta">Flutter · Dart</span></div>
          <div className="floating-card card-bottom"><span className="spark">✦</span><span>Simple ideas.<br /><strong>Solid code.</strong></span></div>
        </div>
        <div className="scroll-cue" aria-hidden="true"><span>SCROLL</span><i /></div>
      </section>
      <section className="about-section" id="about">
        <div className="about-heading"><h2>Engineering with <em><br/>la passion.</em></h2></div>
        <div className="about-grid">
          <div className="about-statement"><p>I&apos;m {profile.name}, a mobile application developer with a Computer Science foundation in databases, algorithms and data structures.</p></div>
          <div className="about-facts">{profile.facts.map((fact) => <div key={fact.label}><span>{fact.label}</span><strong>{fact.value}</strong></div>)}</div>
        </div>
        <div className="profile-proof">{profile.proof.map((item) => <article key={item.period}><span>{item.period}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
        <div className="skill-cloud" aria-label="Skills">{profile.skills.map((skill, index) => <span key={skill}>{String(index + 1).padStart(2, '0')} / {skill}</span>)}<span>and many more</span></div>
      </section>

      <section className="approach-section">
        <div className="approach-title"><h2>From fuzzy idea<br />to <span>clear product.</span></h2><p>Building is a conversation between the problem, the people using the product and the technology underneath it.</p></div>
        <div className="process-grid">
          <article><span>01</span><h3>Understand</h3><p>Find the real user need, define the smallest useful outcome and remove noise.</p></article>
          <article><span>02</span><h3>Shape</h3><p>Turn flows into a coherent system with a clear visual and technical direction.</p></article>
          <article><span>03</span><h3>Build</h3><p>Ship reliable features, test the edges and refine the interactions that matter.</p></article>
        </div>
      </section>

      <section className="selected-section">
        <div className="selected-heading"><h2>Products with a<br/><em>reason to exist.</em></h2><a className="text-link dark-link" href="/projects" onClick={(event) => { event.preventDefault(); navigatePage('/projects'); }}>View all projects <span>↗</span></a></div>
        <div className="project-teasers">
          {projects.map((project, index) => (
            <a className={`project-teaser teaser-${project.tone}`} href={`/projects#${project.slug}`} onClick={(event) => { event.preventDefault(); navigatePage(`/projects#${project.slug}`); }} key={project.slug}>
              <div className="teaser-device">
                <img
                  className="teaser-device-image"
                  src={projectPreviews[project.tone]}
                  alt={`${project.name} app preview`}
                  loading="lazy"
                  draggable="false"
                />
              </div>
              <div className="teaser-meta"><h3>{project.name}</h3><p>{project.category}</p><span>{project.stack}</span></div>
            </a>
          ))}
        </div>
      </section>

      <Footer linkedin={profile.linkedin} navigateAnchor={navigateAnchor} />
    </main>
  );
}

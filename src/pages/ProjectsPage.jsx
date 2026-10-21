import Footer from '../components/Footer.jsx';
import ProjectCarousel from '../components/ProjectCarousel.jsx';
import SiteHeader from '../components/SiteHeader.jsx';
import abtmanagerIcon from '../icons/logo_abt.png';
import actiIcon from '../icons/acti_icon.png';
import bcIcon from '../icons/bc_icon.png';

const projectIcons = {
  abt: abtmanagerIcon,
  acti: actiIcon,
  bc: bcIcon,
};

export default function ProjectsPage({ profile, projects, navigatePage, navigateAnchor }) {
  return (
    <main id="top" className="projects-page">
      <SiteHeader linkedin={profile.linkedin} navigatePage={navigatePage} />
      {projects.map((project, index) => (
        <section className={`project-detail project-${project.tone}`} id={project.slug} key={project.slug}>
          <div className="project-number">0{index + 1}</div>
          <div className="project-info">
            <div>
              <p className="eyebrow dark">{project.category}{project.link && <><span>•</span><a href={project.link}>VISIT SITE</a></>}</p>
              <div className="project-title">
                <span className="project-title-icon" aria-hidden="true">
                  <img src={projectIcons[project.tone]} alt="" />
                </span>
                <h2>{project.name}</h2>
              </div>
            </div>
            <div className="project-description"><p>{project.summary}</p><p>{project.description}</p></div>
            <div className="project-specs">
              <div><span>Role</span><strong>{project.role}</strong></div>
              <div><span>Stack</span><strong>{project.stack}</strong></div>
                <div className="status-link">
                    <span>Status</span>
                    <strong>
                        {project.storeLink ? (
                            <a href={project.storeLink}>{project.status}</a>
                        ) : (
                            project.status
                        )}
                    </strong>
                </div>
            </div>
          </div>
          <ProjectCarousel project={project.shortName} tone={project.tone} slides={project.slides} />
        </section>
      ))}

      <Footer linkedin={profile.linkedin} navigateAnchor={navigateAnchor} />
    </main>
  );
}

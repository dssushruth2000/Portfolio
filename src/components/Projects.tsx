import { useRef, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { projects, personal } from '../data';

export default function Projects() {
  const secRef = useIntersectionObserver();

  return (
    <section className="section-wrapper" id="projects">
      <div className="container section-inner">
        <div ref={secRef as React.RefObject<HTMLDivElement>} className="reveal">
          <div className="section-label">03. Featured Work</div>
          <h2 className="section-title">
            Things I've <span className="grad-text">built</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} delay={i * 0.1} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a
            href={personal.githubRepos}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
            style={{ padding: '0.75rem 2rem', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            View All Projects on GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p, delay }: { project: typeof projects[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { ref.current!.classList.add('visible'); observer.disconnect(); }
    }, { threshold: 0.12 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // 3D tilt
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-10px)`;
    };
    const onLeave = () => { el.style.transform = ''; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, []);

  return (
    <div
      ref={ref}
      className="project-card reveal-scale"
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="project-icon-wrap">{p.icon}</div>
      <div className="project-name">{p.name}</div>
      <div className="project-tagline">{p.tagline}</div>
      <p className="project-desc">{p.description}</p>
      <div className="project-tags">
        {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
      </div>
      <div className="project-links">
        <a href={p.github} className="project-link link-gh" target="_blank" rel="noopener noreferrer">⭐ GitHub</a>
        {p.live && <a href={p.live} className="project-link link-live" target="_blank" rel="noopener noreferrer">🚀 Live</a>}
      </div>
    </div>
  );
}

import { useRef, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { experience } from '../data';

function parseHighlight(text: string) {
  return text.split(/(\*\*.*?\*\*)/).map((part, i) =>
    part.startsWith('**') ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

/* Company logo badge — clearly visible square format */
function CompanyLogo({ logo, initials, color }: { logo: string; initials: string; color: string }) {
  return (
    <div style={{
      width: 64, height: 64,
      borderRadius: 16,
      background: '#fff',
      border: `2.5px solid ${color}`,
      boxShadow: `0 0 16px ${color}55, 0 4px 20px rgba(0,0,0,0.4)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', flexShrink: 0,
      position: 'relative',
    }}>
      <img
        src={logo}
        alt={initials}
        style={{ width: 46, height: 46, objectFit: 'contain', display: 'block' }}
        onError={(e) => {
          const t = e.currentTarget;
          t.style.display = 'none';
          if (t.parentElement) {
            t.parentElement.style.background = '#0a0a1e';
            t.parentElement.innerHTML = `<span style="font-size:1rem;font-weight:900;color:${color};letter-spacing:-0.03em;font-family:'JetBrains Mono',monospace">${initials}</span>`;
          }
        }}
      />
    </div>
  );
}


export default function Experience() {
  const secRef = useIntersectionObserver();

  return (
    <section className="section-wrapper" id="experience" style={{ background: 'linear-gradient(to bottom, transparent, rgba(108,99,255,0.03), transparent)' }}>
      <div className="container section-inner">
        <div ref={secRef as React.RefObject<HTMLDivElement>} className="reveal">
          <div className="section-label">02. Work History</div>
          <h2 className="section-title">
            Where I've <span className="grad-text">shipped</span> value
          </h2>
          <div className="section-divider" />
        </div>

        <div className="timeline">
          {experience.map((job, i) => (
            <ExpItem key={job.company} job={job} delay={i * 0.12} last={i === experience.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpItem({ job, delay, last }: { job: typeof experience[0]; delay: number; last: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { ref.current!.classList.add('visible'); observer.disconnect(); }
    }, { threshold: 0.15 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="timeline-item reveal"
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="timeline-dot-col">
        <CompanyLogo logo={job.logo} initials={job.initials} color={job.color} />
      </div>

      <div className="exp-card">
        <div className="exp-header">
          <div>
            <div className="exp-role">{job.role}</div>
            <div className="exp-company" style={{ color: job.color }}>{job.company}</div>
            <div className="exp-location">📍 {job.location}</div>
          </div>
          <div className="exp-period">{job.period}</div>
        </div>
        <ul className="exp-highlights">
          {job.highlights.map((h, i) => (
            <li key={i}>{parseHighlight(h)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { education } from '../data';

export default function About() {
  const secRef = useIntersectionObserver();
  const leftRef = useIntersectionObserver();
  const rightRef = useIntersectionObserver();

  return (
    <section className="section-wrapper" id="about">
      <div className="container section-inner">
        <div ref={secRef as React.RefObject<HTMLDivElement>} className="reveal">
          <div className="section-label">01. About Me</div>
          <h2 className="section-title">
            The story behind the <span className="grad-text">code</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="about-grid">
          {/* Left — Bio */}
          <div ref={leftRef as React.RefObject<HTMLDivElement>} className="reveal-left">
            <p className="about-bio">
              I'm a <strong>Computer Science graduate</strong> from the <strong>University of Wisconsin-Milwaukee </strong>
              with a GPA of <span className="highlight">3.80/4.00</span> and a deep love for building
              things that actually perform under pressure.
            </p>
            <p className="about-bio" style={{ marginBottom: '1.5rem' }}>
              Over the past 3+ years, I've shipped production software at companies like{' '}
              <strong>Naviget</strong>, <strong>KPMG</strong>, and <strong>Wipro</strong>, cutting API
              latency by 35%, scaling backends that serve 10M+ records, and integrating AI into real
              financial workflows. I thrive at the intersection of{' '}
              <strong>backend precision</strong>, <strong>cloud architecture</strong>, and
              <strong> thoughtful frontend</strong> to make it beautiful.
            </p>
            <p className="about-bio">
              When I'm not writing Python or debugging configs, you'll find me exploring
              AI/ML research, contributing to open source, or hunting for the perfect cup of coffee ☕.
            </p>


          </div>

          {/* Right — Education */}
          <div ref={rightRef as React.RefObject<HTMLDivElement>} className="reveal-right">
            <div style={{ marginBottom: '1.2rem', fontSize: '0.78rem', color: 'var(--muted)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Education
            </div>
            <div className="edu-stack">
              {education.map((e) => (
                <div key={e.school} className="edu-card">
                  {/* College logo + degree header */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    {/* Logo badge */}
                    <div style={{
                      width: 56, height: 56, borderRadius: 12, flexShrink: 0,
                      background: '#fff',
                      border: `2px solid ${e.color}`,
                      boxShadow: `0 0 12px ${e.color}44`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      overflow: 'hidden', marginTop: '0.1rem',
                    }}>
                      <img
                        src={e.logo}
                        alt={e.shortName}
                        style={{ width: 40, height: 40, objectFit: 'contain' }}
                        onError={(evt) => {
                          const t = evt.currentTarget;
                          t.style.display = 'none';
                          if (t.parentElement) {
                            t.parentElement.style.background = '#0a0a1e';
                            t.parentElement.innerHTML = `<span style="font-size:0.8rem;font-weight:900;color:${e.color};letter-spacing:-0.02em;font-family:'JetBrains Mono',monospace">${e.initials}</span>`;
                          }
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="edu-degree">{e.degree}</div>
                      <div className="edu-school">{e.school}</div>
                      <div className="edu-meta">
                        <span>{e.period}</span>
                        <span>📍 {e.location}</span>
                        <span className="edu-gpa">GPA {e.gpa}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick facts */}
            <div style={{ marginTop: '1.8rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { icon: '🌎', text: 'Open to relocation' },
                { icon: '🤝', text: 'Strong collaborator' },
                { icon: '⚡', text: 'Performance minded' },
                { icon: '🤖', text: 'AI/ML enthusiast' },
              ].map((f) => (
                <div key={f.text} style={{
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  padding: '0.75rem 1rem',
                  background: 'var(--glass)',
                  border: '1px solid var(--glass-b)',
                  borderRadius: '10px',
                  fontSize: '0.8rem', color: 'var(--text-2)',
                }}>
                  <span>{f.icon}</span> {f.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

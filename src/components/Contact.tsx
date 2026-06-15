import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { personal } from '../data';

const SERVICE_ID = 'service_zewbo8i';
const TEMPLATE_ID = 'template_8g3flei';
const PUBLIC_KEY = 'DY7EbRP1PNwsJ-rj8';

// Initialise EmailJS (v4 API requires object)
emailjs.init({ publicKey: PUBLIC_KEY });

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const secRef = useIntersectionObserver();
  const leftRef = useIntersectionObserver();
  const rightRef = useIntersectionObserver();

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;

    setStatus('loading');
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { name: form.name, email: form.email, message: form.message, title: 'Portfolio Contact' },
      );
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const socials = [
    { icon: '💻', label: 'GitHub', value: 'github.com/dssushruth2000', href: personal.github },
    { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/sushruth-danivasa-sridhar', href: personal.linkedin },
    { icon: '📧', label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
    { icon: '📞', label: 'Phone', value: personal.phone, href: `tel:${personal.phone}` },
  ];

  const btnLabel = () => {
    if (status === 'loading') return '⏳ Sending…';
    if (status === 'success') return '✅ Message Sent!';
    if (status === 'error') return '❌ Failed — Try Again';
    return '✈️ Send Message';
  };

  const btnStyle: React.CSSProperties =
    status === 'success' ? { background: 'linear-gradient(135deg,#00c853,#009688)' } :
      status === 'error' ? { background: 'linear-gradient(135deg,#e53935,#c62828)' } :
        {};

  return (
    <section className="section-wrapper contact-section" id="contact">
      <div className="container section-inner">
        <div ref={secRef as React.RefObject<HTMLDivElement>} className="reveal">
          <div className="section-label">05. Get in Touch</div>
          <h2 className="section-title">
            Let's <span className="grad-text">connect</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="contact-grid">
          {/* Left */}
          <div ref={leftRef as React.RefObject<HTMLDivElement>} className="reveal-left">
            <h3 className="contact-headline">
              Got a project in mind?<br />
              <span className="grad-text-warm">I'd love to hear it.</span>
            </h3>
            <p className="contact-sub">
              Whether it's a full-stack build, a backend deep-dive, a cloud migration, or just a
              great tech conversation — my inbox is always open.
            </p>
            <div className="social-list">
              {socials.map((s) => (
                <a key={s.label} href={s.href} className="social-item" target="_blank" rel="noreferrer">
                  <div className="social-icon">{s.icon}</div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginBottom: '0.15rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</div>
                    <div>{s.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div ref={rightRef as React.RefObject<HTMLDivElement>} className="reveal-right">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  disabled={status === 'loading'}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  disabled={status === 'loading'}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  className="form-textarea"
                  placeholder="Tell me about your project or idea..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  disabled={status === 'loading'}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === 'loading'}
                style={{ marginTop: '0.4rem', justifyContent: 'center', width: '100%', ...btnStyle }}
              >
                {btnLabel()}
              </button>

              {status === 'error' && (
                <p style={{ marginTop: '0.8rem', fontSize: '0.82rem', color: '#ef5350', textAlign: 'center' }}>
                  Something went wrong. Please try emailing me directly at{' '}
                  <a href={`mailto:${personal.email}`} style={{ color: 'var(--accent-2)' }}>{personal.email}</a>
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

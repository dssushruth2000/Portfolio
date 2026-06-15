import { useEffect, useState } from 'react';
import { personal } from '../data';

const NAV_LINKS = [
  { label: 'ABOUT', href: '#about' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'CERTS', href: '#certifications' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container nav-container-gs">
          <div className="nav-logo" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); close(); }}>
            <span className="logo-tag">&lt;</span>
            <span className="logo-name logo-name-full">Sushruth Danivasa Sridhar</span>
            <span className="logo-name logo-name-short">Sushruth</span>
            <span className="logo-tag">/&gt;</span>
          </div>

          {/* Desktop nav links */}
          <ul className="nav-links">
            {NAV_LINKS.map(l => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
            <li>
              <a href={personal.resumeLink} target="_blank" rel="noreferrer" className="nav-resume-link">
                RESUME{' '}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
            </li>
          </ul>

          {/* Hamburger button — mobile only */}
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} onClick={close}>
        <div className="mobile-menu-inner" onClick={e => e.stopPropagation()}>
          {/* ✕ Close button inside drawer */}
          <button className="mobile-menu-close" onClick={close} aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <ul className="mobile-nav-links">
            {NAV_LINKS.map(l => (
              <li key={l.href}>
                <a href={l.href} onClick={close}>{l.label}</a>
              </li>
            ))}
            <li>
              <a href={personal.resumeLink} target="_blank" rel="noreferrer" onClick={close} className="mobile-resume-link">
                RESUME ↗
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

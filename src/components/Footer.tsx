import { personal } from '../data';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <span className="footer-logo">&lt;{personal.shortName} /&gt;</span>
        <span className="footer-copy">
          Built with 💜 React + Vite &bull; {year}
        </span>
        <span
          className="footer-back"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑ Back to top
        </span>
      </div>
    </footer>
  );
}

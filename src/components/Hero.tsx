import { useEffect, useRef, useState } from 'react';
import { personal } from '../data';

/* ── Particle Engine ── */
function initParticles(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!;
  let mouse = { x: -9999, y: -9999 };
  let width = 0, height = 0;

  const resize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });

  const N = 80;
  const pts = Array.from({ length: N }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.45,
    vy: (Math.random() - 0.5) * 0.45,
    r: Math.random() * 1.8 + 0.8,
    a: Math.random() * 0.45 + 0.1,
  }));

  let raf: number;
  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    pts.forEach((p) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      const dx = mouse.x - p.x, dy = mouse.y - p.y;
      const d = Math.hypot(dx, dy);
      if (d < 130) { p.x -= dx * 0.007; p.y -= dy * 0.007; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(108,99,255,${p.a})`;
      ctx.fill();
    });
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
        if (d < 130) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(108,99,255,${0.13 * (1 - d / 130)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(draw);
  };
  draw();
  return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
}

/* ── Typing Effect ── */
function useTypingEffect(words: string[], typingSpeed = 90, deletingSpeed = 48, pause = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[idx];
    const delay = deleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, displayed.length + 1);
        setDisplayed(next);
        if (next === current) setTimeout(() => setDeleting(true), pause);
      } else {
        const next = displayed.slice(0, -1);
        setDisplayed(next);
        if (next === '') { setDeleting(false); setIdx((i) => (i + 1) % words.length); }
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [displayed, deleting, idx, words, typingSpeed, deletingSpeed, pause]);

  return displayed;
}

/* ── Terminal Typewriter ── */
type TLine = { raw: string; color: string };
const TERM_LINES: TLine[] = [
  { raw: 'def get_engineer():',                                   color: '#6c63ff' },
  { raw: '  return {',                                            color: '#b0b0cc' },
  { raw: '    "name": "Sushruth Danivasa Sridhar",',             color: '#22c55e' },
  { raw: '    "role": "Software Engineer",',                      color: '#22c55e' },
  { raw: '    "specializes_in": ["Backend", "AI Integration"],', color: '#22c55e' },
  { raw: '    "available": True',                                 color: '#00d4ff' },
  { raw: '  }',                                                   color: '#b0b0cc' },
  { raw: '',                                                      color: '#b0b0cc' },
  { raw: '>>> get_engineer()',                                     color: '#fbbf24' },
  { raw: '{ "name": "Sushruth...", ... }',                        color: '#b0b0cc' },
];

function TerminalTyper() {
  const [lines, setLines] = useState<string[]>(['']);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let li = 0;
    let ci = 0;
    let timerId: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (li >= TERM_LINES.length) { setFinished(true); return; }
      const raw = TERM_LINES[li].raw;
      ci++;
      if (ci <= raw.length) {
        setLines(prev => { const n = [...prev]; n[li] = raw.slice(0, ci); return n; });
        timerId = setTimeout(tick, 15);
      } else {
        li++; ci = 0;
        if (li < TERM_LINES.length) {
          setLines(prev => [...prev, '']);
          timerId = setTimeout(tick, raw === '' ? 60 : 140);
        } else {
          setFinished(true);
        }
      }
    };

    timerId = setTimeout(tick, 700);
    return () => clearTimeout(timerId);
  }, []);

  return (
    <div className="term-code">
      {lines.map((text, i) => (
        <div key={i} className="term-line">
          <span style={{ color: TERM_LINES[i]?.color ?? '#b0b0cc' }}>
            {text || '\u00A0'}
          </span>
          {i === lines.length - 1 && !finished && (
            <span className="term-cursor">▌</span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── 3D Tilt ── */
function use3DTilt(strength = 10) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg)`;
    };
    const onLeave = () => { el.style.transform = ''; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, [strength]);
  return ref;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const typed = useTypingEffect(personal.roles);
  const tiltFront = use3DTilt(5);
  const tiltBack = use3DTilt(5);
  const tiltPhoto = use3DTilt(3);
  const tiltDeco = use3DTilt(3);

  useEffect(() => {
    if (!canvasRef.current) return;
    return initParticles(canvasRef.current);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} id="particles-canvas" />
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <section className="gs-hero" id="hero">
        
        {/* ── LEFT: Decorative Terminal Card ── */}
        <div className="gs-deco gs-deco-terminal far-left" ref={tiltDeco as React.RefObject<HTMLDivElement>}>
          <div className="gs-terminal-header">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <span className="term-title">portfolio.py</span>
          </div>
          <div className="gs-terminal-body">
            <TerminalTyper />
          </div>
        </div>

        {/* ── RIGHT: Photo Container — desktop full-bleed ── */}
        <div className="gs-photo-wrap" ref={tiltPhoto as React.RefObject<HTMLDivElement>}>
          <img src={personal.profileImage} alt="" className="gs-photo-img" />
          <div className="gs-photo-overlay" />
        </div>

        {/* ── Mobile-only circular avatar ── */}
        <div className="gs-mobile-avatar">
          <div className="gs-mobile-avatar-ring">
            <img src={personal.profileImage} alt={personal.shortName} className="gs-mobile-avatar-img" />
          </div>
        </div>

        {/* ── STACK LAYER 2: Stats Card (overlaps photo) ── */}
        <div className="gs-card gs-card-back stack-2" ref={tiltBack as React.RefObject<HTMLDivElement>}>
          <div className="gs-back-lines">
            <div className="gs-back-line">2+ Years Exp,</div>
            <div className="gs-back-line">10+ Projects,</div>
            <div className="gs-back-line">3 Companies</div>
          </div>
          <div className="gs-back-avail">
            <span className="gs-avail-badge">Available ~</span>
          </div>
        </div>

        {/* ── STACK LAYER 3: Name Card (overlaps stats) ── */}
        <div className="gs-card gs-card-front stack-3" ref={tiltFront as React.RefObject<HTMLDivElement>}>
          <div className="gs-front-content">
            <span className="gs-front-hi">Hi I'm</span>
            <h1 className="gs-front-name">Sushruth</h1>
            <p className="gs-front-role">{typed}</p>
            
            <div className="gs-front-btns">
              <a href="#projects" className="gs-btn-ref gs-btn-primary">View Projects</a>
              <a href={personal.resumeLink} target="_blank" rel="noreferrer" className="gs-btn-ref gs-btn-outline">Download Resume</a>
            </div>
            
            <div className="gs-front-socials">
              <a href={personal.github} target="_blank" rel="noreferrer" className="sc-mini"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg></a>
              <a href={personal.linkedin} target="_blank" rel="noreferrer" className="sc-mini"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
              <a href={`mailto:${personal.email}`} target="_blank" rel="noreferrer" className="sc-mini"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.733 1.634-1.636 1.634h-3.819V11.73L12 16.58l-6.545-4.85v9.23H1.636C.733 21 0 20.27 0 19.366V5.457c0-1.298 1.436-2.025 2.455-1.228L12 11.25l9.545-7.021C22.564 3.432 24 4.159 24 5.457z"/></svg></a>
            </div>
          </div>
        </div>

        <div className="scroll-hint">
          <span>scroll</span>
          <div className="scroll-line" />
        </div>

      </section>
    </>
  );
}

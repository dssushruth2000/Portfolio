import { useRef, useEffect, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { skills } from '../data';

/* ─── Devicon URL ───────────────────────────────────────── */
const PLAIN_ICONS = new Set([
  'nextjs', 'flask', 'fastapi', 'githubactions', 'pandas', 'azuresqldatabase', 'jenkins',
]);
function iconUrl(icon: string): string {
  if (icon === 'amazonwebservices')
    return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg';
  if (icon === 'googlecloud')
    return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-plain.svg';
  const v = PLAIN_ICONS.has(icon) ? 'plain' : 'original';
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}/${icon}-${v}.svg`;
}

/* ─── Category icons ────────────────────────────────────── */
const CATEGORY_META: Record<string, { icon: string; color: string }> = {
  'Languages':      { icon: '{ }', color: '#6c63ff' },
  'Frontend':       { icon: '⬡',   color: '#00d4ff' },
  'Backend':        { icon: '⚙',   color: '#ff6b9d' },
  'Databases':      { icon: '🗄',  color: '#336791' },
  'Cloud & DevOps': { icon: '☁',   color: '#4285f4' },
  'AI & ML':        { icon: '🤖',  color: '#8b5cf6' },
};

/* ─── component ─────────────────────────────────────────── */
export default function Skills() {
  const secRef = useIntersectionObserver();

  return (
    <section
      className="section-wrapper"
      id="skills"
      style={{ background: 'linear-gradient(to bottom, transparent, rgba(108,99,255,0.03), transparent)' }}
    >
      <div className="container section-inner">

        <div ref={secRef as React.RefObject<HTMLDivElement>} className="reveal">
          <div className="section-label">04. Toolbox</div>
          <h2 className="section-title">
            Skills &amp; <span className="grad-text">Technologies</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="skills-categories">
          {Object.entries(skills).map(([category, items], ci) => {
            const meta = CATEGORY_META[category] ?? { icon: '◈', color: '#6c63ff' };
            return (
              <SkillCategory
                key={category}
                category={category}
                items={items as { name: string; icon: string; color: string }[]}
                meta={meta}
                delay={ci * 0.1}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}

/* ─── Category card ─────────────────────────────────────── */
function SkillCategory({
  category,
  items,
  meta,
  delay,
}: {
  category: string;
  items: { name: string; icon: string; color: string }[];
  meta: { icon: string; color: string };
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`skill-category-card${visible ? ' skill-cat-visible' : ''}`}
      style={{
        '--cat-color': meta.color,
        transitionDelay: `${delay}s`,
      } as React.CSSProperties}
    >
      <div className="skill-cat-header">
        <span className="skill-cat-icon" style={{ color: meta.color }}>{meta.icon}</span>
        <h3 className="skill-cat-title">{category}</h3>
        <span className="skill-cat-count">{items.length}</span>
      </div>
      <div className="skill-chips">
        {items.map((skill, si) => (
          <SkillChip key={skill.name} skill={skill} delay={delay + si * 0.04} />
        ))}
      </div>
    </div>
  );
}

/* ─── Individual skill chip ─────────────────────────────── */
function SkillChip({
  skill,
  delay,
}: {
  skill: { name: string; icon: string; color: string };
  delay: number;
}) {
  const imgRef = useRef<HTMLImageElement>(null);

  return (
    <div
      className="skill-chip"
      style={{ '--chip-color': skill.color, animationDelay: `${delay}s` } as React.CSSProperties}
      title={skill.name}
    >
      <img
        ref={imgRef}
        src={iconUrl(skill.icon)}
        alt={skill.name}
        width={22}
        height={22}
        loading="lazy"
        onError={() => {
          if (!imgRef.current) return;
          imgRef.current.style.display = 'none';
          const fb = imgRef.current.parentElement;
          if (fb) {
            const span = document.createElement('span');
            span.textContent = skill.name.slice(0, 2).toUpperCase();
            span.style.cssText = `font-size:0.65rem;font-weight:900;color:${skill.color}`;
            fb.prepend(span);
          }
        }}
      />
      <span>{skill.name}</span>
    </div>
  );
}

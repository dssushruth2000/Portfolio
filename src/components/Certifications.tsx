import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const CERTS = [
  {
    id: 1,
    title: 'Azure Developer Associate',
    code: 'AZ-204',
    issuer: 'Microsoft',
    issuerLogo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg',
    color: '#0078d4',
    credentialUrl: 'https://learn.microsoft.com/en-us/users/sushruthdanivasasridhar-7480/credentials/3f851d6c6338313b',
    description:
      'Proficiency in designing, building, testing, and maintaining cloud applications and services on Microsoft Azure.',
    skills: ['Azure App Service', 'Azure Functions', 'Cosmos DB', 'Azure Storage', 'API Management'],
  },
  {
    id: 2,
    title: 'Associate Cloud Engineer',
    code: 'ACE',
    issuer: 'Google Cloud',
    issuerLogo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-plain.svg',
    color: '#4285f4',
    credentialUrl: '',
    description:
      'Ability to deploy applications, monitor operations, and manage enterprise solutions on Google Cloud Platform.',
    skills: ['Compute Engine', 'GKE', 'Cloud Storage', 'Cloud Run', 'IAM & Security'],
  },
];

export default function Certifications() {
  const secRef = useIntersectionObserver();

  return (
    <section
      className="section-wrapper"
      id="certifications"
      style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,120,212,0.04), transparent)' }}
    >
      <div className="container section-inner">
        <div ref={secRef as React.RefObject<HTMLDivElement>} className="reveal">
          <div className="section-label">05. Credentials</div>
          <h2 className="section-title">
            Certi<span className="grad-text">fications</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="certs-grid">
          {CERTS.map(cert => (
            <div key={cert.id} className="cert-card" style={{ '--cert-color': cert.color } as React.CSSProperties}>
              {/* Top glow strip */}
              <div className="cert-glow-strip" />

              <div className="cert-header">
                <div className="cert-logo-wrap">
                  <img src={cert.issuerLogo} alt={cert.issuer} width={40} height={40} />
                </div>
                <div>
                  <p className="cert-issuer">{cert.issuer}</p>
                  <span className="cert-code-badge">{cert.code}</span>
                </div>
              </div>

              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-desc">{cert.description}</p>

              <div className="cert-skills">
                {cert.skills.map(s => (
                  <span key={s} className="cert-skill-pill">{s}</span>
                ))}
              </div>

              <div className="cert-footer">
                <span className="cert-verified">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Certified
                </span>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="cert-view-link"
                  >
                    View Credential
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

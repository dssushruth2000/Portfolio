// ============================================================
// PORTFOLIO DATA — All content lives here. Easy to update!
// ============================================================

export const personal = {
  name: 'Sushruth Danivasa Sridhar',
  shortName: 'Sushruth',
  title: 'Software Engineer',
  roles: [
    'Software Engineer',
    'Software Developer',
    'Full Stack Engineer',
    'Backend Architect',
    'Cloud & DevOps Engineer',
    'AI/ML Developer',
  ],
  email: 'dssushruth2000@gmail.com',
  phone: '+1 (414) 629-3242',
  github: 'https://github.com/dssushruth2000',
  githubRepos: 'https://github.com/dssushruth2000?tab=repositories',
  linkedin: 'https://www.linkedin.com/in/sushruth-danivasa-sridhar',
  location: 'Bloomington, Indiana',
  bio: "I'm a Computer Science grad from UW-Milwaukee who loves building things that actually perform. From cutting API latency by 35% in production to training ML models that hit 98.5% accuracy — I bring full-stack thinking, backend precision, and a bias for impact.",
  tagline: 'I build backends that scale and interfaces that wow.',
  available: true,
  profileImage: '/profile.jpg',
  resumeLink: '/Sushruth_Danivasa_Sridhar_Resume.pdf',
  stats: [
    { value: '2+', label: 'Years Exp' },
    { value: '10+', label: 'Projects' },
    { value: '3', label: 'Companies' },
  ],
};

export const experience = [
  {
    company: 'Naviget',
    role: 'Software Engineer',
    period: 'Jun 2025 – Present',
    location: 'Saratoga, California',
    type: 'Full-time',
    color: '#6c63ff',
    logo: '/naviget_logo.jpeg',
    initials: 'N',
    highlights: [
      'Cut API response latency by **35%** by integrating Redis-backed task queues into the video rendering pipeline.',
      'Maintained **95% uptime** across production systems with reliable workflow orchestration via Python & FastAPI.',
      'Reduced media processing time by **30%** with adaptive rendering rules driven by input metadata analysis.',
      'Automated **50+ API tests** with Postman, JSON schemas & GitHub Actions, catching critical failures pre-deployment.',
    ],
  },
  {
    company: 'KPMG',
    role: 'Software Engineer',
    period: 'Aug 2022 – Jul 2023',
    location: 'Bengaluru, India',
    type: 'Full-time',
    color: '#00d4ff',
    logo: '/kpmg_logo.svg',
    initials: 'KP',
    highlights: [
      'Boosted query efficiency by **48%** on a financial analytics dashboard handling **10M+ records** (Flask, PostgreSQL).',
      'Refactored a Python monolith into **8+ microservices**, improving API throughput by **20%**.',
      'Configured **10+ Jenkins CI/CD pipelines** ensuring zero-downtime through an AWS-to-Azure cloud migration.',
      'Integrated AI/ML classification models into APIs, reducing manual financial investigation time by **50%**.',
    ],
  },
  {
    company: 'Wipro',
    role: 'Software Engineer',
    period: 'Mar 2022 – May 2022',
    location: 'Bengaluru, India',
    type: 'Full-time',
    color: '#ff6b9d',
    logo: '/wipro_logo.svg',
    initials: 'W',
    highlights: [
      'Redesigned the flight reservation backend in Java & MongoDB, resolving a concurrency bottleneck that cut booking errors by **20%** during peak traffic.',
      'Refactored service-layer components using OOP principles, reducing technical debt and improving code reuse.',
    ],
  },
];

export const projects = [
  {
    name: 'DevConnect',
    tagline: 'Where developers collaborate, ship, and grow.',
    description:
      'A full-stack developer collaboration platform with 20+ REST endpoints, JWT/OAuth authentication, real-time code review via Google Generative AI, and a React + TypeScript frontend.',
    icon: '🤝',
    tags: ['FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'Render'],
    accentColor: '#6c63ff',
    github: 'https://github.com/dssushruth2000/DevConnect',
    live: 'https://devconnect-frontend-bpcs.onrender.com/',
    featured: true,
  },
  {
    name: 'ClassMate.AI',
    tagline: '950+ users. Sub-second answers. Real-time AI tutoring.',
    description:
      'An AI-powered chatbot built with Python, Flask, and Google Gemini API. Supports 950+ users through optimized prompt pipelines with 92% response accuracy and async query handling.',
    icon: '🤖',
    tags: ['Python', 'Flask', 'Gemini API', 'Azure', 'HTML/CSS/JS'],
    accentColor: '#00d4ff',
    github: 'https://github.com/dssushruth2000/ClassMate.AI',
    live: 'https://college-chatbot-gde7a6atdygbd0da.centralus-01.azurewebsites.net/',
    featured: true,
  },
  {
    name: 'Traffic Sign Recognition',
    tagline: '98.5% accuracy. 50K+ images. Real-world ML.',
    description:
      'A machine learning model trained on 50K+ images using TensorFlow and OpenCV, achieving 98.5% test accuracy through cross-validation, hyperparameter tuning, and checkpoint-based training.',
    icon: '🚦',
    tags: ['Python', 'TensorFlow', 'OpenCV', 'Pandas', 'ML/CV'],
    accentColor: '#ff6b9d',
    github: 'https://github.com/dssushruth2000/Traffic-Sign-Recognition',
    live: null,
    featured: false,
  },
];

export const skills = {
  Languages: [
    { name: 'Python', icon: 'python', color: '#3776ab' },
    { name: 'Java', icon: 'java', color: '#f89820' },
    { name: 'TypeScript', icon: 'typescript', color: '#3178c6' },
    { name: 'JavaScript', icon: 'javascript', color: '#f7df1e' },
    { name: 'SQL', icon: 'azuresqldatabase', color: '#0078d4' },
  ],
  Frontend: [
    { name: 'React', icon: 'react', color: '#61dafb' },
    { name: 'Next.js', icon: 'nextjs', color: '#ffffff' },
    { name: 'Node.js', icon: 'nodejs', color: '#8cc84b' },
    { name: 'HTML5', icon: 'html5', color: '#e34f26' },
    { name: 'CSS3', icon: 'css3', color: '#1572b6' },
  ],
  Backend: [
    { name: 'FastAPI', icon: 'fastapi', color: '#009688' },
    { name: 'Flask', icon: 'flask', color: '#ffffff' },
    { name: 'Microservices', icon: 'microservices', color: '#a78bfa' },
    { name: 'JWT', icon: 'jwt', color: '#d63aff' },
  ],
  Databases: [
    { name: 'PostgreSQL', icon: 'postgresql', color: '#336791' },
    { name: 'MongoDB', icon: 'mongodb', color: '#47a248' },
    { name: 'MySQL', icon: 'mysql', color: '#4479a1' },
    { name: 'Database Design', icon: 'dbdesign', color: '#f59e0b' },
    { name: 'Query Optimization', icon: 'queryopt', color: '#10b981' },
  ],
  'Cloud & DevOps': [
    { name: 'Azure', icon: 'azure', color: '#0078d4' },
    { name: 'AWS', icon: 'amazonwebservices', color: '#ff9900' },
    { name: 'GCP', icon: 'googlecloud', color: '#4285f4' },
    { name: 'Docker', icon: 'docker', color: '#2496ed' },
    { name: 'Kubernetes', icon: 'kubernetes', color: '#326ce5' },
    { name: 'Jenkins', icon: 'jenkins', color: '#d33833' },
    { name: 'GitHub Actions', icon: 'githubactions', color: '#2088ff' },
    { name: 'CI/CD Pipelines', icon: 'cicd', color: '#22c55e' },
  ],
  'AI & ML': [
    { name: 'LLM', icon: 'llm', color: '#8b5cf6' },
    { name: 'Gemini API', icon: 'gemini', color: '#4285f4' },
    { name: 'OpenAI API', icon: 'openai', color: '#10a37f' },
    { name: 'TensorFlow', icon: 'tensorflow', color: '#ff6f00' },
    { name: 'Pandas', icon: 'pandas', color: '#150458' },
    { name: 'API Integration', icon: 'apiint', color: '#06b6d4' },
    { name: 'Model Integration', icon: 'modelint', color: '#ec4899' },
  ],
};

export const education = [
  {
    school: 'University of Wisconsin-Milwaukee',
    shortName: 'UW-Milwaukee',
    degree: 'M.S. Computer Science',
    period: 'Sep 2023 – May 2025',
    gpa: '3.80 / 4.00',
    location: 'Milwaukee, WI',
    logo: '/uwm_logo.svg',
    initials: 'UW',
    color: '#fbbf24',
  },
  {
    school: 'Dayananda Sagar Academy of Technology',
    shortName: 'DSATM',
    degree: 'B.E. Information Science',
    period: 'Aug 2018 – Jul 2022',
    gpa: '3.50 / 4.00',
    location: 'Bengaluru, India',
    logo: '/dsatm_logo.png',
    initials: 'DS',
    color: '#a78bfa',
  },
];

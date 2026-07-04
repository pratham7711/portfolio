export const SITE = {
  name: 'PRATHAM SHARMA',
  titles: ['Full Stack Engineer', 'AI Engineer', 'Frontend Expert'],
  email: 'prathamsharma7711@gmail.com',
  github: 'https://github.com/pratham7711',
  linkedin: 'https://www.linkedin.com/in/pratham-sharma-a7a97a201',
  tagline: 'I build systems. I set plays.',
}

export const EXPERIENCE = [
  {
    company: 'REALTOS',
    role: 'Software Engineer',
    period: '2022 — 2023',
    play: 'THE SERVE',
    summary:
      'First touch. Built real-estate tokenization flows and learned to ship fast in a small team.',
    stack: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    company: 'SALESCODE.AI',
    role: 'Software Engineer',
    period: '2023 — 2024',
    play: 'THE PASS',
    summary:
      'Controlled the chaos. Enterprise-scale AI sales platforms serving global FMCG giants — performance, data pipelines, dashboards.',
    stack: ['React', 'TypeScript', 'GraphQL', 'AWS'],
  },
  {
    company: 'LEEGALITY',
    role: 'Software Engineer — Frontend',
    period: '2024 — NOW',
    play: 'THE SET',
    summary:
      "Setting up every spike. Building India's leading document-infrastructure platform — eSign flows, design systems, AI features used by 2000+ businesses.",
    stack: ['React', 'TypeScript', 'Next.js', 'Design Systems', 'AI'],
  },
]

export const SKILL_GROUPS = [
  {
    label: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'GSAP', 'Three.js', 'Tailwind'],
  },
  {
    label: 'Backend',
    skills: ['Node.js', 'FastAPI', 'PostgreSQL', 'Redis', 'GraphQL'],
  },
  {
    label: 'AI / ML',
    skills: ['LangChain', 'RAG', 'Pinecone', 'Gemini', 'OpenAI', 'Embeddings'],
  },
  {
    label: 'Infra',
    skills: ['AWS', 'Vercel', 'Railway', 'Docker', 'CI/CD'],
  },
]

export interface Project {
  slug: string
  number: string
  name: string
  playCall: string
  description: string
  tags: string[]
  link?: string
  liveUrl?: string
  featured?: boolean
  accent: string
}

export const PROJECTS: Project[] = [
  {
    slug: 'docmind-ai',
    number: '01',
    name: 'DOCMIND AI',
    playCall: 'QUICK SET — A1',
    description:
      'AI document intelligence: upload PDFs, ask questions, get cited answers via RAG. FastAPI, LangChain, Pinecone, Gemini Flash streaming, Supabase.',
    tags: ['Next.js', 'FastAPI', 'LangChain', 'Pinecone', 'RAG', 'Gemini'],
    liveUrl: 'https://frontend-mu-five-51.vercel.app',
    link: 'https://github.com/pratham7711/docmind-ai',
    featured: true,
    accent: '#a78bfa',
  },
  {
    slug: 'collabboard',
    number: '02',
    name: 'COLLABBOARD',
    playCall: 'DOUBLE QUICK',
    description:
      'Real-time collaborative whiteboard — WebSocket multi-cursor, drawing tools, sticky notes, live presence.',
    tags: ['React', 'WebSockets', 'Canvas API', 'Node.js', 'Redis'],
    liveUrl: 'https://collabboard-phi.vercel.app',
    link: 'https://github.com/pratham7711/collabboard',
    featured: true,
    accent: '#34d399',
  },
  {
    slug: 'shopwave',
    number: '03',
    name: 'SHOPWAVE',
    playCall: 'BACK-ROW ATTACK',
    description:
      'Full e-commerce platform — product search, cart, Stripe payments, seller dashboard with real-time analytics.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Prisma'],
    liveUrl: 'https://shopwave-green.vercel.app',
    link: 'https://github.com/pratham7711/shopwave',
    featured: true,
    accent: '#f59e0b',
  },
  {
    slug: 'devpulse',
    number: '04',
    name: 'DEVPULSE',
    playCall: 'PIPE ATTACK',
    description:
      'Developer activity dashboard — GitHub contributions, LeetCode stats, commit heatmaps in one embeddable card.',
    tags: ['React', 'GraphQL', 'GitHub API', 'Chart.js'],
    liveUrl: 'https://devpulse-git-main-prathams-projects-371c8ade.vercel.app',
    link: 'https://github.com/pratham7711/devpulse',
    featured: true,
    accent: '#60a5fa',
  },
  {
    slug: 'cinemate',
    number: '05',
    name: 'CINEMATE',
    playCall: 'CROSS-COURT SHOT',
    description:
      'Netflix-style streaming platform — JWT auth, movie discovery, personalized recommendations, TMDB.',
    tags: ['React', 'Express', 'MongoDB', 'JWT', 'TMDB'],
    link: 'https://github.com/pratham7711/CineMate',
    accent: '#f43f5e',
  },
  {
    slug: 'cryptoexchange',
    number: '06',
    name: 'CRYPTOEXCHANGE',
    playCall: 'LINE SHOT',
    description:
      'Real-time crypto dashboard — live price tracking, historical charts, portfolio management via CoinGecko.',
    tags: ['React', 'CoinGecko API', 'Charts'],
    link: 'https://github.com/pratham7711/cryptoexchange',
    accent: '#22d3ee',
  },
]

export const HOBBIES = [
  {
    id: 'volleyball',
    title: 'VOLLEYBALL',
    meta: 'Setter — captained the college team for two seasons.',
    detail: 'The setter touches the ball every rally. Vision, timing, trust.',
  },
  {
    id: 'chess',
    title: 'CHESS',
    meta: 'Aggressive openings. The Sicilian Najdorf is home.',
    detail: 'Type "najdorf" anywhere on this site.',
  },
  {
    id: 'anime',
    title: 'ANIME',
    meta: 'One Piece, Chainsaw Man, Frieren.',
    detail: 'Long-arc storytelling — the reason this site has acts.',
  },
  {
    id: 'cubing',
    title: 'CUBING',
    meta: 'Sub-90s 3×3 solver. CFOP, slowly learning full OLL.',
    detail: 'Algorithms as muscle memory.',
  },
]

/** Higgsfield-generated media assets (populated during build) */
export const MEDIA = {
  editorialStill: '/media/editorial-set.png',
  volleyballVideo: '/media/volleyball-cinematic.mp4',
  engineerStill: '/media/engineer-portrait.png',
  matchPointVideo: '/media/matchpoint-loop.mp4',
}

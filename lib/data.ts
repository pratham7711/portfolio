export const SITE = {
  name: 'PRATHAM SHARMA',
  titles: ['Full Stack Engineer', 'AI Engineer', 'Frontend Expert'],
  positioning:
    'Full-stack + AI engineer. I take web products from idea to production.',
  email: 'prathamsharma7711@gmail.com',
  github: 'https://github.com/pratham7711',
  linkedin: 'https://www.linkedin.com/in/pratham-sharma-a555b8207',
  resume: '/Pratham_Sharma_Resume.pdf',
  tagline: 'I build systems. I set plays.',
}

export const MAILTO = `mailto:${SITE.email}?subject=${encodeURIComponent(
  "Let's work together — via prathamsharma.in"
)}&body=${encodeURIComponent(
  `Hi Pratham,

Found you through your portfolio.

What I'm building / hiring for:
-

Timeline:
-

When are you free for a quick call?

Best,
`
)}`

export const EXPERIENCE = [
  {
    company: 'REALTOS',
    role: 'Software Engineer',
    period: '2023',
    play: 'SEASON 01 — THE DIG',
    summary:
      'Built the entire PropTech platform frontend from scratch — production in 12 weeks, 500+ initial users, 99.99% uptime on AWS.',
    stack: ['React', 'TypeScript', 'AWS'],
  },
  {
    company: 'SALESCODE.AI',
    role: 'Software Engineer',
    period: '2023 — 2025',
    play: 'SEASON 02 — THE SET',
    summary:
      'Cut a 6–9 hour enterprise data pipeline to under 5 minutes (−99%). Kafka event pipelines: +40% throughput, −25% latency, serving global FMCG giants.',
    stack: ['React', 'TypeScript', 'Java', 'Kafka', 'AWS'],
  },
  {
    company: 'LEEGALITY',
    role: 'Software Engineer — Frontend',
    period: '2025 — NOW',
    play: 'SEASON 03 — THE SPIKE',
    summary:
      'Shipped an 18-component design system (+30% team velocity), an AI Chatbot SDK that cut support escalations 60%, and AI document review used by 2,000+ businesses.',
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
    skills: ['Node.js', 'FastAPI', 'PostgreSQL', 'Redis', 'GraphQL', 'Kafka'],
  },
  {
    label: 'AI / ML',
    skills: ['LangChain', 'RAG', 'Pinecone', 'Gemini', 'OpenAI', 'Embeddings'],
  },
  {
    label: 'AI Tooling',
    skills: [
      'Claude Code',
      'Codex',
      'Cursor',
      'Cline',
      'Agentic Workflows',
      'Prompt Engineering',
    ],
  },
  {
    label: 'Infra',
    skills: ['AWS', 'Vercel', 'Railway', 'Docker', 'CI/CD'],
  },
]

export const STATS = [
  { n: 99, prefix: '', suffix: '%', label: 'PIPELINE TIME CUT' },
  { n: 90, prefix: '', suffix: '+', label: 'LIGHTHOUSE SCORES' },
  { n: 355, prefix: '#', suffix: '', label: 'LEETCODE GLOBAL RANK' },
  { n: 2000, prefix: '', suffix: '+', label: 'BUSINESSES USE MY AI FEATURES' },
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
  image?: string
}

export const PROJECTS: Project[] = [
  {
    slug: 'megakernel-tts',
    image: '/media/projects/megakernel-tts.webp',
    number: '01',
    name: 'MEGAKERNEL TTS',
    playCall: 'KILL SHOT',
    description:
      'Adapted a 1,200-line persistent CUDA megakernel as the decode backend for Qwen3-TTS — ~25ms time-to-first-chunk (RTF 0.12) on an RTX 5090, streamed end-to-end via Pipecat.',
    tags: ['CUDA', 'PyTorch', 'Qwen3-TTS', 'Pipecat', 'Groq'],
    link: 'https://github.com/pratham7711/e3-megakernel-tts-takehome',
    featured: true,
    accent: '#f5a623',
  },
  {
    slug: 'docmind-ai',
    image: '/media/projects/docmind-ai.webp',
    number: '02',
    name: 'DOCMIND AI',
    playCall: 'QUICK SET — A1',
    description:
      'AI document intelligence: upload PDFs, ask questions, get cited answers in under 2 seconds via RAG. FastAPI, LangChain, Pinecone, Gemini Flash streaming.',
    tags: ['Next.js', 'FastAPI', 'LangChain', 'Pinecone', 'RAG', 'Gemini'],
    liveUrl: 'https://docmind-ai-six.vercel.app',
    link: 'https://github.com/pratham7711/docmind-ai',
    featured: true,
    accent: '#00e5d1',
  },
  {
    slug: 'collabboard',
    image: '/media/projects/collabboard.webp',
    number: '03',
    name: 'COLLABBOARD',
    playCall: 'DOUBLE QUICK',
    description:
      'Real-time collaborative whiteboard — 10+ concurrent users at sub-100ms sync. WebSocket multi-cursor, drawing tools, sticky notes, Redis-backed presence.',
    tags: ['React', 'WebSockets', 'Canvas API', 'Node.js', 'Redis'],
    link: 'https://github.com/pratham7711/collabboard',
    featured: true,
    accent: '#f5a623',
  },
  {
    slug: 'pratham-ui',
    image: '/media/projects/pratham-ui.webp',
    number: '04',
    name: '@PRATHAM7711/UI',
    playCall: 'SETTER DUMP',
    description:
      '18-component React library on npm — dark-first theming, Storybook docs, tree-shaking. 200+ weekly downloads, adopted by external projects.',
    tags: ['React', 'TypeScript', 'ShadCN', 'Storybook', 'npm'],
    liveUrl: 'https://www.npmjs.com/package/@pratham7711/ui',
    link: 'https://github.com/pratham7711',
    featured: true,
    accent: '#00e5d1',
  },
  {
    slug: 'shopwave',
    image: '/media/projects/shopwave.webp',
    number: '05',
    name: 'SHOPWAVE',
    playCall: 'BACK-ROW ATTACK',
    description:
      'Full e-commerce platform — product search, cart, Stripe payments, seller dashboard with real-time analytics.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Prisma'],
    liveUrl: 'https://shopwave-green.vercel.app',
    link: 'https://github.com/pratham7711/shopwave',
    accent: '#f5a623',
  },
  {
    slug: 'devpulse',
    image: '/media/projects/devpulse.webp',
    number: '06',
    name: 'DEVPULSE',
    playCall: 'PIPE ATTACK',
    description:
      'Developer activity dashboard — GitHub contributions, LeetCode stats, commit heatmaps in one embeddable card.',
    tags: ['React', 'GraphQL', 'GitHub API', 'Chart.js'],
    liveUrl: 'https://devpulse-dusky.vercel.app',
    link: 'https://github.com/pratham7711/devpulse',
    accent: '#00e5d1',
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

export const SEQ_FRAMES = 61

/** The rally — one possession, three touches, three pitches. */
export const RALLY = [
  {
    id: 'dig',
    touch: 'FIRST TOUCH',
    position: 'LIBERO',
    pitchA: 'Want the careful first touch?',
    pitchB: "I'm the right choice.",
    proof: 'Realtos — solo-built a PropTech platform to production in 12 weeks.',
    seq: '/media/seq/rally-dig',
  },
  {
    id: 'set',
    touch: 'SECOND TOUCH',
    position: 'SETTER',
    pitchA: 'Want someone to steer the whole game?',
    pitchB: 'Still me.',
    proof: 'Salescode — cut a 6–9 hour enterprise pipeline to 5 minutes.',
    seq: '/media/seq/rally-set',
  },
  {
    id: 'spike',
    touch: 'THIRD TOUCH',
    position: 'SPIKER',
    pitchA: 'Want the impactful final touch?',
    pitchB: "Let's talk.",
    proof: 'Leegality — AI features live for 2,000+ businesses.',
    seq: '/media/seq/rally-spike',
  },
]

export const DESK = {
  seq: '/media/seq/desk',
}

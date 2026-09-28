export const personalInfo = {
  name: "Girish Sharma",
  title: "Senior Full Stack & AI Systems Engineer",
  subtitle: "Architecting high-performance web applications, resilient distributed systems, and modern AI-driven user experiences.",
  location: "Bangalore, India (Remote Available)",
  availability: "Available for Q3/Q4 Projects & Advisory",
  bio: "Over 6 years of experience building mission-critical SaaS platforms, reactive user interfaces, and cloud-native backends. Passionate about design precision, sub-100ms latency, and developer experience.",
  email: "girish.sharma.dev@gmail.com",
  github: "https://github.com/girish-sharma",
  linkedin: "https://linkedin.com/in/girish-sharma-dev",
  twitter: "https://twitter.com/girish_codes",
  yearsExperience: "6+",
  projectsCount: "45+",
  satisfiedClients: "99.8%",
  codeContributions: "1,850+"
};

export const metrics = [
  { label: "Years Experience", value: "6+", change: "Full Stack & Cloud" },
  { label: "Production Apps", value: "45+", change: "Fintech, SaaS & AI" },
  { label: "Global Users Served", value: "1.4M+", change: "Across 14 countries" },
  { label: "Average Lighthouse", value: "99/100", change: "Performance & SEO" }
];

export const skillsData = [
  {
    category: "Frontend Architecture",
    description: "Creating accessible, reactive, and fluid web experiences",
    skills: [
      { name: "React 19 / Next.js", level: 96, highlight: true },
      { name: "TypeScript", level: 94, highlight: true },
      { name: "Tailwind CSS / Vanilla CSS", level: 95 },
      { name: "State Machines / Redux / Zustand", level: 90 },
      { name: "WebSockets / Realtime UI", level: 88 },
      { name: "Web Performance & Core Vitals", level: 92 }
    ]
  },
  {
    category: "Backend & Systems",
    description: "Designing scalable microservices, low-latency APIs & data pipelines",
    skills: [
      { name: "Node.js / Express / Fastify", level: 95, highlight: true },
      { name: "Python / FastAPI", level: 89 },
      { name: "PostgreSQL & Prisma / Drizzle", level: 92, highlight: true },
      { name: "Redis & Distributed Caching", level: 90 },
      { name: "REST & GraphQL APIs", level: 94 },
      { name: "Kafka & Event Streams", level: 82 }
    ]
  },
  {
    category: "Cloud & DevOps",
    description: "Automated deployment, infrastructure as code & observability",
    skills: [
      { name: "Docker & Containerization", level: 90, highlight: true },
      { name: "AWS (S3, ECS, Lambda, RDS)", level: 87 },
      { name: "CI/CD (GitHub Actions)", level: 92 },
      { name: "Kubernetes & Helm", level: 80 },
      { name: "Vercel / Cloudflare Edge", level: 95, highlight: true },
      { name: "Monitoring & Datadog / Sentry", level: 85 }
    ]
  },
  {
    category: "AI & Intelligent Tooling",
    description: "Harnessing LLMs, semantic search, and agentic workflows",
    skills: [
      { name: "OpenAI & Anthropic APIs", level: 92, highlight: true },
      { name: "LangChain / LlamaIndex", level: 86 },
      { name: "Vector Databases (Pinecone/pgvector)", level: 88 },
      { name: "Agentic Tool Use & Automation", level: 90, highlight: true },
      { name: "Local Models (Ollama, vLLM)", level: 84 },
      { name: "RAG Pipeline Engineering", level: 88 }
    ]
  }
];

export const projectsData = [
  {
    id: "nexus-cloud",
    title: "NexusCloud AI Engine",
    tagline: "Autonomous Agent Workflow Orchestrator & Observability Suite",
    category: "AI & Cloud",
    featured: true,
    bannerGradient: "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)",
    metrics: "+340% throughput | <45ms execution latency",
    description: "A distributed orchestration platform for executing multi-agent LLM pipelines with real-time streaming traces, token usage guardrails, and visual state debugging.",
    detailedDescription: "NexusCloud gives enterprise development teams full visibility and deterministic control over autonomous agent swarms. Featuring custom Redis event dispatching, server-sent events for streaming DAG visualizations, and automatic fallback routers.",
    techStack: ["React 19", "TypeScript", "FastAPI", "Redis Streams", "pgvector", "Docker"],
    stars: 428,
    forks: 67,
    liveUrl: "https://nexuscloud-demo.dev",
    githubUrl: "https://github.com/girish-sharma/nexus-cloud",
    highlights: [
      "Streamed DAG execution graph rendering 60fps",
      "Dynamic prompt caching reducing LLM costs by 48%",
      "Granular RBAC and SOC2 audit log compliance"
    ]
  },
  {
    id: "strata-hotel",
    title: "Strata Hospitality Suite",
    tagline: "Ultra-Fast Realtime Hotel Booking & Concierge Engine",
    category: "Full Stack",
    featured: true,
    bannerGradient: "linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)",
    metrics: "99.99% booking sync | 120ms average response",
    description: "Full-scale property management & guest reservation portal with sub-second live room inventory locks, Stripe payment intents, and automated guest notifications.",
    detailedDescription: "Designed for boutique hotels and luxury resorts. Eliminates overbooking hazards via distributed transactional locks in Postgres, paired with a fluid Next.js frontend with mobile-first gesture navigation.",
    techStack: ["React", "Node.js", "PostgreSQL", "Stripe API", "WebSockets", "Tailwind CSS"],
    stars: 215,
    forks: 34,
    liveUrl: "https://strata-hotel.dev",
    githubUrl: "https://github.com/girish-sharma/strata-hotel",
    highlights: [
      "Pessimistic concurrency locking preventing double bookings",
      "Interactive 3D room preview with floor plan selector",
      "Integrated multi-currency checkout & automated invoice generation"
    ]
  },
  {
    id: "pulse-metrics",
    title: "Pulse Analytics Studio",
    tagline: "Sub-Second Timeseries Telemetry & Product Analytics",
    category: "Full Stack",
    featured: true,
    bannerGradient: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
    metrics: "10M+ events/day | Zero render lag",
    description: "Lightweight, privacy-first analytics dashboard offering real-time user session replays, funnel breakdowns, and customizable metric widgets.",
    detailedDescription: "Created to provide product teams with instantaneous insights without third-party tracking baggage. Built with ClickHouse backplane, custom canvas graphing engine, and end-to-end encryption.",
    techStack: ["React", "TypeScript", "ClickHouse", "Go", "Canvas API", "Tailwind CSS"],
    stars: 580,
    forks: 92,
    liveUrl: "https://pulse-metrics.dev",
    githubUrl: "https://github.com/girish-sharma/pulse-metrics",
    highlights: [
      "Zero-latency canvas heatmaps rendering 50,000 datapoints",
      "Sub-15kb tracking snippet with offline queueing",
      "Self-hostable with single Docker Compose command"
    ]
  },
  {
    id: "hyper-forge",
    title: "HyperForge Design System",
    tagline: "Headless Accessible UI Primitives with Native Gestures",
    category: "Frontend / UI",
    featured: false,
    bannerGradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
    metrics: "4.8k npm downloads/wk | 100% WCAG AAA",
    description: "A comprehensive React component library engineered for zero-runtime CSS, keyboard navigation compliance, and fluid micro-interactions.",
    detailedDescription: "Provides accessible primitives for dropdowns, virtualized lists, dialog modals, and animated drawers with spring physics. Fully customizable via CSS variables.",
    techStack: ["React", "TypeScript", "CSS Modules", "Storybook", "Rollup"],
    stars: 840,
    forks: 110,
    liveUrl: "https://hyperforge-ui.dev",
    githubUrl: "https://github.com/girish-sharma/hyper-forge",
    highlights: [
      "Zero external runtime dependencies",
      "Comprehensive keyboard shortcuts & screen-reader aria labels",
      "Interactive Storybook with 60+ tested scenarios"
    ]
  },
  {
    id: "zenith-cache",
    title: "Zenith Edge Cache",
    tagline: "Globally Distributed Tiered Caching for Serverless Functions",
    category: "AI & Cloud",
    featured: false,
    bannerGradient: "linear-gradient(135deg, #10b981 0%, #0284c7 100%)",
    metrics: "12ms p99 cache hits | 99.98% availability",
    description: "High-performance edge key-value cache layer tailored for AI embeddings and dynamic API response acceleration across 280+ Cloudflare edge locations.",
    detailedDescription: "Provides intelligent cache invalidation via stale-while-revalidate protocols and vector proximity search directly at edge nodes.",
    techStack: ["Rust", "Cloudflare Workers", "TypeScript", "WebAssembly"],
    stars: 345,
    forks: 41,
    liveUrl: "https://zenith-cache.dev",
    githubUrl: "https://github.com/girish-sharma/zenith-cache",
    highlights: [
      "Compiled Wasm core for instant execution",
      "Automatic tag-based cache purging in under 150ms globally",
      "Edge-computed cryptographic validation"
    ]
  }
];

export const experienceData = [
  {
    role: "Lead Full Stack Architect",
    company: "Aetherial Labs",
    location: "Bangalore (Hybrid)",
    period: "2023 - Present",
    description: "Leading the core platform team of 12 engineers in building next-generation AI developer tooling and high-concurrency cloud systems.",
    achievements: [
      "Architected distributed real-time event streaming pipeline processing 15M+ daily messages with 99.99% uptime.",
      "Spearheaded migration to micro-frontends with Vite and React 19, improving build times by 68% and first-contentful paint by 42%.",
      "Mentored 8 senior engineers and established company-wide automated code quality & security gates."
    ],
    tech: ["React 19", "TypeScript", "Node.js", "FastAPI", "PostgreSQL", "AWS ECS", "Kafka"]
  },
  {
    role: "Senior Software Engineer",
    company: "Vanguard FinTech Systems",
    location: "Bangalore",
    period: "2021 - 2023",
    description: "Engineered secure transactional interfaces and automated reconciliation microservices for high-volume banking workflows.",
    achievements: [
      "Designed and deployed a fault-tolerant payment settlement engine handling $40M+ in monthly transaction volumes.",
      "Optimized database indices and connection pooling, slashing p95 API latency from 450ms down to 65ms.",
      "Implemented WCAG AAA compliance across consumer web dashboards."
    ],
    tech: ["React", "Redux Toolkit", "Express.js", "PostgreSQL", "Redis", "Docker", "Stripe API"]
  },
  {
    role: "Frontend Engineer",
    company: "Cognitive Pixel Studio",
    location: "Remote",
    period: "2019 - 2021",
    description: "Built performant web portals, dynamic interactive dashboards, and design systems for client startups across North America and Europe.",
    achievements: [
      "Shipped 18 web applications from ground zero to production deployment.",
      "Authored modular UI design system reused across 6 client enterprise platforms.",
      "Reduced bundle sizes across projects by average 45% using code splitting and modern asset bundling."
    ],
    tech: ["JavaScript (ES6+)", "React", "CSS3 / Sass", "REST APIs", "Jest", "Webpack"]
  }
];

export const testimonialsData = [
  {
    quote: "Girish is that rare caliber of engineer who pairs deep architectural knowledge with an obsessive eye for user interface delight. He delivered our flagship platform ahead of schedule with flawless reliability.",
    name: "Alex Thorne",
    title: "VP of Engineering at Aetherial Labs",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5
  },
  {
    quote: "Under Girish's technical leadership, our booking engine went from frequent concurrency locks to rock-solid 99.99% uptime. His code is clean, meticulously tested, and documented.",
    name: "Samantha Reed",
    title: "Head of Product at Hospitality Nexus",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    rating: 5
  },
  {
    quote: "Working with Girish was a masterclass in speed and quality. He brought innovative ideas to our design system that elevated our entire customer experience.",
    name: "Marcus Vance",
    title: "Co-Founder & CTO at FinScale",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5
  }
];

export const terminalCommands = {
  help: "Available commands: 'about', 'skills', 'projects', 'contact', 'status', 'clear', 'sudo hire'",
  about: "Girish Sharma - Senior Full Stack Engineer with 6+ years specializing in React, Node, Cloud & AI systems.",
  skills: "Core: React 19, TypeScript, Node.js, Python, PostgreSQL, Redis, Docker, AWS, AI Agent pipelines.",
  projects: "1. NexusCloud AI Engine\n2. Strata Hospitality Suite\n3. Pulse Analytics Studio\n4. HyperForge Design System",
  contact: "Email: girish.sharma.dev@gmail.com | LinkedIn: /in/girish-sharma-dev | GitHub: @girish-sharma",
  status: "🟢 System Status: ALL SYSTEMS OPERATIONAL | Response Latency: 18ms | Open for Q3/Q4 contracts.",
  "sudo hire": "🎉 Sudo permission granted! Initializing fast-track interview protocol. Redirecting to contact..."
};

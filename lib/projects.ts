export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  statementOfPurpose?: string;
  thumbnail?: string;
  techStack: string[];
  highlights: string[];
  architectureTitle: string;
  architectureDesc: string;
  challenges: string[];
  metrics: { label: string; value: string }[];
  schemaSnippet?: string;
  github?: string;
  demo?: string;
  nodes: { id: string; label: string; type: "client" | "service" | "db" | "queue" | "cache"; details: string; tech: string }[];
}

export const projects: Project[] = [
  {
  id: "foths-ecosystem",
  title: "FOTHS — Intelligent Scalable Ecosystem for Human-Centric Experiences",
  description: "An 'All-In-One' Christian platform seamlessly blending faith, community, and highly scalable technology to spark digital revival.",
  thumbnail: "/foths-thumbnail.png",

  statementOfPurpose: `“I chose to work on a Christian-related app and website because I believe technology can be a powerful tool to spread hope, truth, and purpose through Christ. While there are many Christian apps available today — one for Bible tracking, another for devotionals, another for prayer, and maybe one for games — they’re all scattered and limited. If someone wants to grow in every area of their faith, they end up juggling multiple apps with inconsistent features and experiences.

That’s where **FOTHS – Fire of the Holy Spirit** comes in. It’s not just another app — it’s **‘Your All-In-One’** Christian platform. Instead of downloading 5 different apps to manage your spiritual life, FOTHS brings everything into one place: Bible reading, spiritual goal tracking, daily verse motivation, prayer journaling, community connection, Christian media, and much more — all beautifully integrated and customizable.

**FOTHS is built for every believer** — whether you’re new to faith, a missionary on the move, a student, or a full-time pastor. It’s a platform designed to inspire, empower, and connect people with God and with one another.

This project is not just for placement or the pursuit of a high-paying job. **It’s a real-time, passion-driven mission** that I am fully committed to making real, exactly as it was envisioned. I want to set an example that projects rooted in faith can be as technically excellent, scalable, and impactful as any mainstream product.

At the same time, this gives me the chance to **showcase my technical skills** — from creative UI/UX design to full-stack development, database management, and secure system implementation. But I’m not just coding features; **I’m building experiences that lead to transformation.**

Faith should be accessible, engaging, and empowering — and that is exactly what FOTHS aims to deliver. In a world filled with distractions, I want to create a digital space that draws people closer to God, builds community, and sparks revival in the digital age.”`,

  fullDescription: `Designed and developed a next-generation, production-grade platform integrating AI-driven systems, real-time communication, digital learning, and service ecosystems into a unified architecture.

  Built with a strong focus on scalability and modularity using distributed systems and microservices principles, enabling seamless cross-platform experiences across web, mobile, and intelligent interfaces.

  🔹 Core Platform:
- Web & Mobile Apps for user interaction
- API Gateway for routing and orchestration
- Authentication & RBAC system
- Real-time notification system
- Admin dashboard for monitoring

🔹 Spiritual / Core Experience:
- Real-time prayer request system
- Global prayer wall
- Live worship and event streaming
- Sermon and content library
- Event & revival management

🔹 AI & Smart Systems:
- FOTHS AI (Flame assistant)
- AI chatbot for navigation and support
- Recommendation engine for content and events
- Intelligent automation workflows

🔹 Learning & Community:
- FOTHS Academy (courses & discipleship)
- Community groups (FOTHS Connect)
- Mentorship system
- Progress tracking & certifications

🔹 Media & Community (Music Streaming):
- Worship music streaming platform
- Podcast & sermon streaming
- Media upload & management system
- CDN-based delivery

🔹 Marketplace & Services:
- Jehovah Jireh Store (e-commerce)
- Donation system
- Payment integration
- Service booking system

🔹 Internal / Enterprise Systems:
- FOTHS Mail (internal communication)
- CRM system
- Analytics dashboard
- Logging & monitoring systems`,

  techStack: [
    "React",
    "Node.js",
    "Java",
    "Spring Boot",
    "MongoDB",
    "PostgreSQL",
    "WebSockets",
    "Redis",
    "Kafka",
    "Firebase",
    "Docker",
    "AWS"
  ],

  highlights: [
    "Building an 'All-In-One' platform replacing fragmented functional apps to create unified transformation",
    "Architecting distributed microservices for massive scalability and independent deployments",
    "Showcasing top-tier UI/UX, database management, and secure systems in a faith-driven environment",
    "Developing AI Assistant (Flame) for intelligent scripture, recommendation, and navigation support",
    "Combining diverse real-time systems (WebSockets, Streaming) into one extremely cohesive global network"
  ],

  architectureTitle: "Distributed Microservices + Real-Time Architecture",

  architectureDesc: "The system is designed as a distributed microservices architecture with an API Gateway handling routing, authentication, and request orchestration. Each domain (AI, streaming, academy, marketplace, enterprise systems) operates as an independent service. Real-time features are powered by WebSockets, while Kafka enables event-driven communication. Redis is used for caching, and databases are separated for scalability and performance. The architecture supports global scale, low latency, and high availability.",

  challenges: [
    "Unifying heavily diverse functionalities (media, tracking, CRM, marketplace) into an intuitive, seamless single user experience",
    "Ensuring fault-tolerant scaling for real-time faith communication like global prayer walls and live streaming",
    "Balancing a massive, passion-driven product vision with strategic MVP execution and flawless technical architecture",
    "Maintaining loose backend coupling across distinct domains while producing a perfectly integrated front-end experience"
  ],

  metrics: [
    { label: "P99 Latency", value: "< 120ms" },
    { label: "Throughput", value: "50k+ req/s" },
    { label: "System Integrity", value: "99.99%" }
  ],

  schemaSnippet: `// API Gateway Routing Example
{
  "/api/auth": "Auth Service",
  "/api/prayer": "Prayer Service",
  "/api/stream": "Streaming Service",
  "/api/ai": "FOTHS AI (Flame)",
  "/api/academy": "Learning Service",
  "/api/store": "Marketplace Service"
}`,

  nodes: [
    { id: "client", label: "Client Apps", type: "client", tech: "React / Next.js", details: "Cross-platform interfaces optimized for sub-100ms LCP and accessibility." },
    { id: "gateway", label: "API Gateway", type: "service", tech: "Node.js / Express", details: "Central orchestration layer handling JWT validation and request routing." },
    { id: "auth", label: "Auth Service", type: "service", tech: "RBAC / OAuth2", details: "Granular access control system with token-based session management." },
    { id: "prayer", label: "Prayer Service", type: "service", tech: "WebSockets / WS", details: "Low-latency bidirectional streaming for real-time community engagement." },
    { id: "stream", label: "Streaming Service", type: "service", tech: "RTMP / HLS", details: "High-concurrency media delivery with adaptive bitrate streaming." },
    { id: "ai", label: "AI Service", type: "service", tech: "Vector DB / LLM", details: "Intelligent assistant utilizing prompt engineering and semantic search." },
    { id: "academy", label: "Academy Service", type: "service", tech: "Spring Boot", details: "Transactional learning system with progress tracking and persistence." },
    { id: "store", label: "Marketplace", type: "service", tech: "Micro-service", details: "Distributed commerce engine with transactional consistency." },
    { id: "db", label: "Database Cluster", type: "db", tech: "MongoDB + Postgres", details: "Hybrid storage strategy balancing document flexibility and relational integrity." },
    { id: "cache", label: "Cache Layer", type: "cache", tech: "Redis", details: "Distributed in-memory caching with LRU eviction for hot data paths." },
    { id: "queue", label: "Message Queue", type: "queue", tech: "Apache Kafka", details: "Fault-tolerant event streaming for asynchronous service communication." }
  ]
},
  {
  id: "clientra-agency-os",
  title: "Clientra | Agency OS",
  description: "A comprehensive, full-stack Agency Operating System unifying CRM, project management, communications, and automated billing into one platform.",
  fullDescription: "Clientra is a robust, multi-tenant SaaS platform built explicitly to run entire tech agencies, studios, and consultancies from a single brain. Designed to replace disconnected tools like Notion, Slack, ClickUp, HubSpot, and Stripe, it provides a centralized hub. It features dynamic multi-agency support, granular Role-Based Access Control, real-time interactive task boards, integrated chat channels, and secure client portals.",
  techStack: [
    "Next.js 16", 
    "React 19", 
    "Tailwind CSS 4", 
    "NestJS 11", 
    "Prisma", 
    "PostgreSQL", 
    "Socket.io", 
    "Razorpay"
  ],
  highlights: [
    "Multi-tenant architecture supporting unlimited agencies and dedicated client portals.",
    "Real-time event streaming and communication hub utilizing Socket.io WebSockets.",
    "Integrated finance system for automated invoicing, tracking, and Razorpay payments.",
    "Custom automation engine triggered by core system events (e.g., invoice overdue, task completed).",
    "Comprehensive Role-Based Access Control (RBAC) securely separating Admin, Manager, Developer, and Client data."
  ],
  architectureTitle: "Monolithic Real-Time API Architecture",
  architectureDesc: "Clientra leverages a powerful REST and WebSocket gateway architecture. The NestJS backend handles heavy business logic and real-time Socket.io channels, while Prisma guarantees a fully type-safe data layer interfacing with PostgreSQL. The unified Next.js frontend seamlessly consumes these services, delivering instant, optimistic UI updates across interactive dashboards and kanban boards.",
  challenges: [
    "Architecting scalable multi-tenant boundaries within a single PostgreSQL database to strictly prevent agency data spillage.",
    "Managing real-time status synchronization between frontend Kanban boards, user activity logs, and the WebSocket gateway.",
    "Establishing a deeply nested authentication and permission system handling varying team roles alongside restricted external client access.",
    "Engineering complex relational data models linking projects, clients, invoices, and dynamic workflow triggers without compromising query speed."
  ],
  metrics: [
    { label: "Transaction Speed", value: "< 50ms" },
    { label: "Concurrent Users", value: "5k+" },
    { label: "Tenant Isolation", value: "100%" }
  ],
  nodes: [
    { id: "frontend", label: "Clientra UI", type: "client", details: "Next.js 16 Dashboard with optimistic UI updates and responsive layouts.", tech: "Next.js / Tailwind 4" },
    { id: "api", label: "NestJS Core", type: "service", details: "Typed REST API and WebSocket gateway for real-time task synchronization.", tech: "NestJS / Socket.io" },
    { id: "db", label: "PostgreSQL", type: "db", details: "Multi-tenant relational storage with strict schema-level data isolation.", tech: "PostgreSQL" },
    { id: "orm", label: "Prisma ORM", type: "service", details: "Type-safe data access layer with automated migrations and relationship mapping.", tech: "Prisma" },
    { id: "payments", label: "Billing Engine", type: "service", details: "Webhook-driven transaction lifecycle management with Razorpay integration.", tech: "Razorpay / API" }
  ],
  // Optional Fields below
  statementOfPurpose: "Modern agencies bleed hours managing chaotic software subscriptions and pasting links across disconnected apps. Clientra was born from the mission to construct an uncompromising 'God-Tool'—an elegant, central nervous system that brings project execution, client relations, team chatter, and billing into a single, beautifully synchronized source of truth. It's the operating system every agency deserves.",
  thumbnail: "/clientra-thumbnail.jpeg",
  schemaSnippet: `model Agency {
  id                String       @id @default(uuid())
  name              String
  subscription_tier String       @default("FREE")
  created_at        DateTime     @default(now())

  memberships       AgencyMembership[]
  clients           Client[]
  projects          Project[]
  workflows         Workflow[]
}`,
  github: "https://github.com/...", // Update with your actual repo link
  demo: "https://...",       // Update with your live demo if applicable
},
  {
  id: "ambassadors-for-the-lord",
  title: "Ambassadors for the Lord | Spiritual Sanctuary",
  description: "A sacred, anonymous digital sanctuary designed to facilitate spiritual healing, prophetic teaching, and real-time community prayer support.",
  fullDescription: "Ambassadors for the Lord is a robust, full-stack ministry ecosystem built explicitly to provide a judgment-free environment for individuals to reconnect with their faith. Designed to replace fragmented communication tools, it centralizes prayer requests, testimonies, and sermon distribution into one 'Safe Space'. It features a triple-tier architecture: a public 'Come as You Are' portal, a high-performance Ministry Dashboard, and a real-time counseling interface powered by WebSockets.",
  techStack: [
    "Next.js 16", 
    "React 19", 
    "Tailwind CSS 4", 
    "NestJS 11", 
    "Prisma", 
    "PostgreSQL", 
    "Socket.io", 
    "Nodemailer"
  ],
  highlights: [
    "Anonymity-First Architecture: A secure engagement layer allowing users to share burdens without fear of judgment.",
    "Real-Time Spiritual Counseling: A low-latency communication hub utilizing Socket.io for instant pastoral guidance.",
    "Enterprise-Grade Ministry Dashboard: Centralized tracking for thousands of prayer requests, testimonies, and 'Prayer Warriors'.",
    "Automated Spiritual Follow-ups: Integrated notification system via Nodemailer to keep users updated on their prayer status.",
    "Dynamic Content Engine: A scalable sermon and prophetic word archive supporting multi-year and multi-language distribution."
  ],
  architectureTitle: "Distributed Real-Time Ministry Ecosystem",
  architectureDesc: "AFL leverages a powerful decoupled architecture. The NestJS backend acts as the 'Ministry Brain', handling heavy business logic and WebSocket gateways, while Prisma provides a type-safe data layer for the PostgreSQL spiritual records. The project uses specialized Next.js environments for the public Sanctuary and the internal Dashboard, ensuring high performance and security separation.",
  challenges: [
    "Implementing a zero-friction, anonymous request system that remains actionable for ministry leaders while strictly protecting user privacy.",
    "Managing real-time status synchronization between the public Sanctuary and the private Management Dashboard using WebSocket event streaming.",
    "Engineering complex relational models linking 'Prayer Warriors', sermons, and testimonies to provide a unified spiritual truth source.",
    "Designing a robust system audit logging and security layer to monitor all administrative actions across the ministry platform."
  ],
  metrics: [
    { label: "Encryption", value: "AES-256" },
    { label: "Response Latency", value: "< 200ms" },
    { label: "Data Integrity", value: "100%" }
  ],
  nodes: [
    { id: "frontend", label: "Public Portal", type: "client", details: "Anonymous-first user interface optimized for performance and privacy.", tech: "Next.js / Tailwind 4" },
    { id: "dashboard", label: "Ministry Ops", type: "client", details: "Administrative dashboard with real-time analytics and request management.", tech: "Next.js / Recharts" },
    { id: "api", label: "AFL Core Brain", type: "service", details: "High-performance API Gateway and WebSocket hub for instant counseling.", tech: "NestJS / Socket.io" },
    { id: "db", label: "Spiritual Archive", type: "db", details: "Relational storage for testimonies, sermons, and prayer logs with AES-256 encryption.", tech: "PostgreSQL" },
    { id: "orm", label: "Prisma", type: "service", details: "Type-safe interface for complex relational spiritual data models.", tech: "Prisma" },
    { id: "mail", label: "Notify Service", type: "service", details: "Automated transactional email system for prayer status updates.", tech: "Nodemailer" }
  ],
  statementOfPurpose: "Modern spiritual growth is often hindered by judgment, fear, or disconnected communication. 'Ambassadors for the Lord' was born from the mission to construct a digital 'God-Tool'—an elegant, serene nervous system that brings prophetic teaching, prayer support, and collective faith into a single, beautifully synchronized source of truth. It is the digital sanctuary every believer deserves.",
  thumbnail: "/afl-thumbnail.jpeg",
  schemaSnippet: `model PrayerRequest {
  id        String   @id @default(uuid())
  message   String
  category  String
  email     String?
  status    Status   @default(PENDING)
  createdAt DateTime @default(now())
}

enum Status {
  PENDING
  ANSWERED
  ARCHIVED
}`,
  github: "https://github.com/...", // Add your actual repository link
  demo: "https://...",       // Add your live platform link
  }
];

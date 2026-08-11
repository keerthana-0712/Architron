export interface Node {
  id: string;
  label: string;
  type: "client" | "service" | "db" | "queue" | "cache";
  details: string;
  tech: string;
  x: number; // relative coordinate percentage (0 - 100)
  y: number; // relative coordinate percentage (0 - 100)
}

export interface Connection {
  from: string;
  to: string;
}

export interface OperationalFlow {
  name: string;
  description: string;
  path: string[]; // sequence of node ids
  steps: string[]; // console logs for each hop
}

export interface TradeOff {
  decision: string;
  choice: string;
  alternative: string;
  rationale: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  customTag?: string;
  statementOfPurpose?: string;
  thumbnail?: string;
  thumbnails?: string[];
  techStack: string[];
  highlights: string[];
  architectureTitle: string;
  architectureDesc: string;
  challenges: string[];
  metrics: { label: string; value: string }[];
  schemaSnippet?: string;
  github?: string;
  demo?: string;
  nodes: Node[];
  connections: Connection[];
  flows: OperationalFlow[];
  tradeOffs: TradeOff[];
}

export const projects: Project[] = [
  {
    id: "foths-ecosystem",
    title: "FOTHS — Intelligent Scalable Ecosystem for Human-Centric Experiences",
    customTag: "Personal Project",
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
      { id: "client", label: "Client Apps", type: "client", tech: "React / Next.js", details: "Cross-platform interfaces optimized for sub-100ms LCP and accessibility.", x: 8, y: 50 },
      { id: "gateway", label: "API Gateway", type: "service", tech: "Node.js / Express", details: "Central orchestration layer handling JWT validation and request routing.", x: 26, y: 50 },
      { id: "auth", label: "Auth Service", type: "service", tech: "RBAC / OAuth2", details: "Granular access control system with token-based session management.", x: 50, y: 15 },
      { id: "prayer", label: "Prayer Service", type: "service", tech: "WebSockets / WS", details: "Low-latency bidirectional streaming for real-time community engagement.", x: 50, y: 38 },
      { id: "stream", label: "Streaming Service", type: "service", tech: "RTMP / HLS", details: "High-concurrency media delivery with adaptive bitrate streaming.", x: 50, y: 62 },
      { id: "ai", label: "AI Service", type: "service", tech: "Vector DB / LLM", details: "Intelligent assistant utilizing prompt engineering and semantic search.", x: 50, y: 85 },
      { id: "academy", label: "Academy Service", type: "service", tech: "Spring Boot", details: "Transactional learning system with progress tracking and persistence.", x: 70, y: 20 },
      { id: "store", label: "Marketplace", type: "service", tech: "Micro-service", details: "Distributed commerce engine with transactional consistency.", x: 70, y: 45 },
      { id: "db", label: "Database Cluster", type: "db", tech: "MongoDB + Postgres", details: "Hybrid storage strategy balancing document flexibility and relational integrity.", x: 92, y: 25 },
      { id: "cache", label: "Cache Layer", type: "cache", tech: "Redis", details: "Distributed in-memory caching with LRU eviction for hot data paths.", x: 92, y: 50 },
      { id: "queue", label: "Message Queue", type: "queue", tech: "Apache Kafka", details: "Fault-tolerant event streaming for asynchronous service communication.", x: 92, y: 75 }
    ],

    connections: [
      { from: "client", to: "gateway" },
      { from: "gateway", to: "auth" },
      { from: "gateway", to: "prayer" },
      { from: "gateway", to: "stream" },
      { from: "gateway", to: "ai" },
      { from: "gateway", to: "academy" },
      { from: "gateway", to: "store" },
      { from: "prayer", to: "queue" },
      { from: "prayer", to: "cache" },
      { from: "queue", to: "db" },
      { from: "ai", to: "cache" },
      { from: "academy", to: "db" },
      { from: "store", to: "db" },
      { from: "store", to: "cache" }
    ],

    flows: [
      {
        name: "Publish Real-time Prayer Request",
        description: "Submit a prayer request and broadcast to global prayer warriors asynchronously.",
        path: ["client", "gateway", "prayer", "queue", "db"],
        steps: [
          "[1] CLIENT: Dispatches anonymous prayer request payload via WS/HTTP Post.",
          "[2] GATEWAY: Handles request ingress, strips identifier headers for security, and routes request.",
          "[3] PRAYER_SERVICE: Authenticates socket token, validates fields, and generates message schema.",
          "[4] MESSAGE_QUEUE: Kafka topics ingest message to isolate API from processing spikes.",
          "[5] DATABASE: Background worker pulls request from queue, writes to MongoDB cluster, and invalidates Redis wall cache."
        ]
      },
      {
        name: "AI Flame Scripture Search",
        description: "Query the Flame Assistant for biblical guidance and personal advice.",
        path: ["client", "gateway", "ai", "cache", "db"],
        steps: [
          "[1] CLIENT: User inputs query: 'Provide comfort for someone feeling overwhelmed.'",
          "[2] GATEWAY: Sanitizes query string, runs rate-limit check, and forwards to AI Service.",
          "[3] AI_SERVICE: Checks local Redis for identical query embeddings within TTL window.",
          "[4] CACHE: Hits Redis cache - returns structured prompt templates.",
          "[5] DATABASE: On miss, query converted to vectors, scanning PostgreSQL pgvector database for semantically similar scriptures."
        ]
      },
      {
        name: "Purchase Bible Course",
        description: "Register and purchase access to a discipleship track in FOTHS Academy.",
        path: ["client", "gateway", "store", "cache", "db"],
        steps: [
          "[1] CLIENT: Clicks 'Unlock Discipleship Course' and initiates billing.",
          "[2] GATEWAY: Verifies authentication context, checks payment intent endpoint.",
          "[3] MARKETPLACE: Core marketplace microservice creates pending transaction log.",
          "[4] CACHE: Queries Redis to verify user enrollment status.",
          "[5] DATABASE: Commits ACID transaction in PostgreSQL cluster, updating enrollment tables and generating certificates."
        ]
      }
    ],

    tradeOffs: [
      {
        decision: "SQL vs NoSQL Database Selection",
        choice: "PostgreSQL for Academy/Store, MongoDB for Prayer/Feeds",
        alternative: "PostgreSQL-only Monolith Database Cluster",
        rationale: "Academy progress tracking and store transactions represent highly relational structured data that demand strict ACID compliance, foreign keys, and transaction limits. Conversely, the prayer walls and chat messages represent high-velocity unstructured writes where horizontal scaling, high availability, and loose schema binding (MongoDB) are paramount to prevent user blockages."
      },
      {
        decision: "Asynchronous Decoupling via Kafka Engine",
        choice: "Apache Kafka for Prayer Requests & Global Notifications",
        alternative: "Synchronous REST calls between microservices",
        rationale: "If the prayer service synchronously called notification, audit, and translation services during a peak global revival event, a latency spike or downtime in a downstream service would cause a cascading thread pool exhaustion. Injecting Kafka decouples publishing from consuming, ensuring the client receives a 200 OK within 40ms, while workers process side effects asynchronously."
      },
      {
        decision: "Multiplexed WebSocket Channels for Real-time Wall",
        choice: "Socket.io persistent connections",
        alternative: "HTTP Short Polling or Server-Sent Events (SSE)",
        rationale: "Real-time chat and global prayer requests require low-latency bi-directional communication. Short polling exhausts client device batteries and API Gateway ports. SSE is unidirectional and lacks built-in reconnection logic. Socket.io maintains a single shared TCP socket per client, drastically minimizing connection handshake overhead."
      }
    ]
  },
  {
    id: "clientra-agency-os",
    title: "Clientra | Agency OS",
    customTag: "Personal Project",
    description: "A comprehensive, full-stack Agency Operating System unifying CRM, project management, communications, and automated billing into one platform.",
    thumbnail: "/clientra-thumbnail.jpeg",
    statementOfPurpose: "Modern agencies bleed hours managing chaotic software subscriptions and pasting links across disconnected apps. Clientra was born from the mission to construct an uncompromising 'God-Tool'—an elegant, central nervous system that brings project execution, client relations, team chatter, and billing into a single, beautifully synchronized source of truth. It's the operating system every agency deserves.",
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
    github: "https://github.com/keerthana-0712",
    demo: undefined,
    nodes: [
      { id: "frontend", label: "Clientra UI", type: "client", details: "Next.js 16 Dashboard with optimistic UI updates and responsive layouts.", tech: "Next.js / Tailwind 4", x: 12, y: 50 },
      { id: "api", label: "NestJS Core", type: "service", details: "Typed REST API and WebSocket gateway for real-time task synchronization.", tech: "NestJS / Socket.io", x: 45, y: 50 },
      { id: "orm", label: "Prisma ORM", type: "service", details: "Type-safe data access layer with automated migrations and relationship mapping.", tech: "Prisma", x: 70, y: 25 },
      { id: "db", label: "PostgreSQL", type: "db", details: "Multi-tenant relational storage with strict schema-level data isolation.", tech: "PostgreSQL", x: 92, y: 25 },
      { id: "payments", label: "Billing Engine", type: "service", details: "Webhook-driven transaction lifecycle management with Razorpay integration.", tech: "Razorpay / API", x: 70, y: 75 }
    ],
    connections: [
      { from: "frontend", to: "api" },
      { from: "api", to: "orm" },
      { from: "orm", to: "db" },
      { from: "api", to: "payments" },
      { from: "payments", to: "db" }
    ],
    flows: [
      {
        name: "Kanban Task Drag-and-Drop",
        description: "Update task columns interactively and sync changes to other active users.",
        path: ["frontend", "api", "orm", "db"],
        steps: [
          "[1] CLIENTRA UI: User moves 'FOTHS Schema Integration' card to Completed. Local UI updates instantly.",
          "[2] NESTJS CORE: Emits websocket event to socket client list while validating RBAC permissions.",
          "[3] PRISMA ORM: Maps the TypeScript update query to the native SQL database connection.",
          "[4] POSTGRESQL: Updates the task table row. Row isolation policies confirm client belongs to the tenant."
        ]
      },
      {
        name: "Invoice Generation & Webhook",
        description: "Process monthly agency invoicing via automated hooks.",
        path: ["frontend", "api", "payments", "db"],
        steps: [
          "[1] CLIENTRA UI: Admin triggers 'Draft Invoice' for client approval.",
          "[2] NESTJS CORE: Processes billing rates and calculates active milestones.",
          "[3] BILLING ENGINE: Communicates with payment provider API to obtain signed checkout session.",
          "[4] POSTGRESQL: Client database records generated payment link and sets status to UNPAID."
        ]
      }
    ],
    tradeOffs: [
      {
        decision: "Single Database Multi-Tenancy Scoping",
        choice: "Shared PostgreSQL database mapped by Tenant ID",
        alternative: "Database-per-tenant or schema-per-tenant separation",
        rationale: "Managing separate databases for hundreds of small design agencies adds massive administrative complexity, overhead, and cost. Prisma query middleware automatically appends `tenantId` to all operations, establishing a robust boundary inside a single high-performance PostgreSQL cluster."
      },
      {
        decision: "Prisma ORM for Data Layer Access",
        choice: "Prisma client engine",
        alternative: "Raw SQL Queries or TypeORM",
        rationale: "Prisma generates fully type-safe interfaces based on the schema, eradicating query typo bugs. Under heavy relational structures (Agencies, memberships, projects, tasks), it ensures clean relationships without writing complex JOIN scripts manually, though optimization is needed for deep nesting."
      }
    ]
  },
  {
    id: "ambassadors-for-the-lord",
    title: "Ambassadors for the Lord | Spiritual Sanctuary",
    customTag: "Client Project",
    description: "A sacred, anonymous digital sanctuary designed to facilitate spiritual healing, prophetic teaching, and real-time community prayer support.",
    thumbnail: "/afl-thumbnail.jpeg",
    statementOfPurpose: "Modern spiritual growth is often hindered by judgment, fear, or disconnected communication. 'Ambassadors for the Lord' was born from the mission to construct a digital 'God-Tool'—an elegant, serene nervous system that brings prophetic teaching, prayer support, and collective faith into a single, beautifully synchronized source of truth. It is the digital sanctuary every believer deserves.",
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
    schemaSnippet: `model PrayerRequest {
  id        String   @id @default(uuid())
  message   String
  category  String
  email     String?
  status    Status   @default(PENDING)
  createdAt DateTime @default(now())
}`,
    github: "https://github.com/keerthana-0712",
    demo: undefined,
    nodes: [
      { id: "frontend", label: "Public Portal", type: "client", details: "Anonymous-first user interface optimized for performance and privacy.", tech: "Next.js / Tailwind 4", x: 12, y: 30 },
      { id: "dashboard", label: "Ministry Ops", type: "client", details: "Administrative dashboard with real-time analytics and request management.", tech: "Next.js / Recharts", x: 12, y: 70 },
      { id: "api", label: "AFL Core Brain", type: "service", details: "High-performance API Gateway and WebSocket hub for instant counseling.", tech: "NestJS / Socket.io", x: 45, y: 50 },
      { id: "orm", label: "Prisma", type: "service", details: "Type-safe interface for complex relational spiritual data models.", tech: "Prisma", x: 70, y: 65 },
      { id: "db", label: "Spiritual Archive", type: "db", details: "Relational storage for testimonies, sermons, and prayer logs with AES-256 encryption.", tech: "PostgreSQL", x: 92, y: 65 },
      { id: "mail", label: "Notify Service", type: "service", details: "Automated transactional email system for prayer status updates.", tech: "Nodemailer", x: 70, y: 30 }
    ],
    connections: [
      { from: "frontend", to: "api" },
      { from: "dashboard", to: "api" },
      { from: "api", to: "orm" },
      { from: "orm", to: "db" },
      { from: "api", to: "mail" }
    ],
    flows: [
      {
        name: "Anonymous Prayer submission",
        description: "Submit a prayer request and broadcast to intercessors securely.",
        path: ["frontend", "api", "orm", "db", "mail"],
        steps: [
          "[1] PUBLIC PORTAL: User posts burden anonymously.",
          "[2] AFL CORE BRAIN: NestJS controller strips server metadata (IP, Agent) to enforce anonymity.",
          "[3] PRISMA: Maps fields, executing a column-level AES-256 encryption for the database write.",
          "[4] SPIRITUAL ARCHIVE: Row committed in PostgreSQL. Sockets trigger alert on intercessor dashboard.",
          "[5] NOTIFY SERVICE: Nodemailer triggers confirmation mail sequence in background."
        ]
      },
      {
        name: "Intercessor Mark Answered",
        description: "Approve and post answered testimonies.",
        path: ["dashboard", "api", "orm", "db"],
        steps: [
          "[1] MINISTRY OPS: Pastor reviews the request, clicks 'Mark Answered', inserting the sermon link.",
          "[2] AFL CORE BRAIN: Verifies JWT signature, ensuring user has administrative privileges.",
          "[3] PRISMA: Compiles status update statement.",
          "[4] SPIRITUAL ARCHIVE: SQL query runs, toggling status to ANSWERED and saving answer text."
        ]
      }
    ],
    tradeOffs: [
      {
        decision: "Application-level vs Database-level Encryption",
        choice: "Field encryption in NestJS core application",
        alternative: "PostgreSQL Transparent Data Encryption (TDE)",
        rationale: "To guarantee anonymity, we must prevent anyone with DB access from reading user burdens. DB-level encryption protects against cold hard-drive theft, but a hot DB dump (or direct admin query) would still reveal plaintext. Applying AES-256 encryption in NestJS ensures only encrypted strings land in the database."
      },
      {
        decision: "Nodemailer SMTP Decoupling",
        choice: "Nodemailer async queuing",
        alternative: "Synchronous SMTP calls on main thread",
        rationale: "Establishing SMTP connections can consume up to 2 seconds due to network handshakes. Running it synchronously halts the NestJS HTTP worker threads. Separating it into an asynchronous callback task returns a prompt 201 Created to the client immediately while mail is delivered independently."
      }
    ]
  },
  {
    id: "keelink-url-shortener",
    title: "Keelink | High-Concurrency URL Shortener & Analytics Engine",
    customTag: "Personal Project (System Design)",
    description: "A distributed URL shortener and click analytics platform built with Node.js, Redis cache layer, and PostgreSQL, containerized with Docker.",
    thumbnail: "/keelink-thumbnail.png",
    fullDescription: "Keelink is a production-ready, high-concurrency URL shortener designed to handle massive click redirection spikes while tracking analytics in real-time. It features a distributed architecture using Redis for caching hot redirection keys, PostgreSQL for persistence, and Docker for scalable container deployment.",
    statementOfPurpose: "Created to solve the problem of redirection scaling. Rather than direct database lookups which choke under concurrent click streams, Keelink implements an aggressive caching and write-back strategy using Redis. This ensures redirections execute in under 5ms, making it ideal for large-scale marketing campaigns.",
    techStack: ["Node.js", "Express", "TypeScript", "Redis", "PostgreSQL", "Docker", "Docker Compose"],
    highlights: [
      "Sub-5ms redirection latency using Redis key-value caching.",
      "Asynchronous click analytics logging to protect redirection throughput.",
      "Custom base62 encoding algorithm for clean, compact keys.",
      "Complete containerized deployment using Docker Compose."
    ],
    architectureTitle: "Redis-Cached Redirection Pipeline",
    architectureDesc: "Inbound short URLs hit the Node.js API. The server queries Redis first. On hit, redirection happens instantly. On miss, the database is queried, Redis is updated, and redirection finishes. Analytics writes are processed asynchronously by a background queue.",
    challenges: [
      "Preventing database read contention during high-velocity click campaigns.",
      "Maintaining accurate click counts without locking tables.",
      "Handling hash collision edge cases in custom encoding strings."
    ],
    metrics: [
      { label: "Redirection", value: "< 5ms" },
      { label: "Throughput", value: "10k+ req/s" }
    ],
    schemaSnippet: `model ShortUrl {
  id        String   @id @default(cuid())
  original  String
  shortKey  String   @unique
  clicks    Int      @default(0)
  createdAt DateTime @default(now())
}`,
    github: "https://github.com/keerthana-0712",
    nodes: [
      { id: "client", label: "Users", type: "client", tech: "Web Browsers", details: "Clients requesting shortened URL redirections.", x: 10, y: 50 },
      { id: "api", label: "Node.js API", type: "service", tech: "Express / TS", details: "Fast routing layer directing redirections and saving logs.", x: 40, y: 50 },
      { id: "cache", label: "Redis Cache", type: "cache", tech: "Redis", details: "Stores active mappings (shortKey -> originalUrl) with 7-day TTL.", x: 70, y: 30 },
      { id: "db", label: "Postgres", type: "db", tech: "PostgreSQL", details: "Main database storing total mappings and aggregate analytics.", x: 70, y: 70 }
    ],
    connections: [
      { from: "client", to: "api" },
      { from: "api", to: "cache" },
      { from: "api", to: "db" }
    ],
    flows: [
      {
        name: "URL Redirection Request",
        description: "Fetch the original URL from Cache or Database and redirect.",
        path: ["client", "api", "cache"],
        steps: [
          "[1] CLIENT: Hits short URL /r/xyz123.",
          "[2] API: Checks Redis cache for key 'xyz123'.",
          "[3] CACHE: Returns original URL, API issues 302 Redirect instantly."
        ]
      }
    ],
    tradeOffs: [
      {
        decision: "Redis Redirection Cache",
        choice: "Redis look-aside caching",
        alternative: "Direct DB Lookups",
        rationale: "Direct database lookups create database connection starvation during spikes. Redis keeps the hot mappings in memory, reducing latency to single-digit milliseconds."
      }
    ]
  },
  {
    id: "ash-man",
    title: "Ash-Man | Portfolio Website",
    customTag: "Client Proj",
    description: "A high-performance portfolio website for Ash-Man.",
    fullDescription: "Ash-Man is a custom 2D arcade physics and rendering engine built from the ground up in Java. It features grid-based collision detection, an implementation of the A* search algorithm for real-time target seeking, and a decoupled rendering loop designed to maintain a lock-step 60 frames per second.",
    statementOfPurpose: "Constructed to master low-level game loops, collision math, and pathfinding algorithms without the aid of third-party engines like Unity. It demonstrates a deep understanding of thread synchronization, canvas graphics rendering, and coordinate systems in pure Java.",
    techStack: ["Java", "Swing", "AWT", "Multithreading", "Canvas API", "Design Patterns"],
    highlights: [
      "Decoupled rendering and physics update threads to prevent frame rate drops.",
      "Custom implementation of real-time A* pathfinding algorithm.",
      "Grid-based collision detection matrix reducing search complexity to O(1).",
      "Event-driven sound and sprite animation controllers."
    ],
    architectureTitle: "Multi-Threaded Game Loop Architecture",
    architectureDesc: "The engine runs a primary Thread for physics calculations and input capture, and a separate Rendering Thread. State synchronization is managed using double-buffering to prevent sprite tearing.",
    challenges: [
      "Preventing rendering lag during pathfinding updates for multiple active targets.",
      "Managing thread race conditions during rapid state transitions."
    ],
    metrics: [
      { label: "Frame Rate", value: "60 FPS" },
      { label: "Tick Speed", value: "60 Hz" }
    ],
    schemaSnippet: `public class GameLoop implements Runnable {
    private static final int FPS = 60;
    private static final double TIME_SLICE = 1000000000.0 / FPS;
    // Core game loop...
}`,
    github: "https://github.com/keerthana-0712",
    nodes: [
      { id: "input", label: "Keyboard Listener", type: "client", tech: "AWT Event Queue", details: "Captures raw user direction strokes.", x: 10, y: 50 },
      { id: "loop", label: "Game Core Loop", type: "service", tech: "Java Thread", details: "Controls physics updates, positions, and collision updates.", x: 45, y: 50 },
      { id: "render", label: "Buffer Canvas", type: "service", tech: "Graphics2D", details: "Double-buffered canvas rendering sprites and board tiles.", x: 80, y: 50 }
    ],
    connections: [
      { from: "input", to: "loop" },
      { from: "loop", to: "render" }
    ],
    flows: [
      {
        name: "Physics Core Tick",
        description: "Process user inputs, update coordinates, verify grid collisions.",
        path: ["input", "loop", "render"],
        steps: [
          "[1] INPUT: Direction key pressed, queued in game state.",
          "[2] LOOP: Core loop updates player coordinates, checks target collisions, and updates tile states.",
          "[3] RENDER: Emits repaint command to render double-buffered frames."
        ]
      }
    ],
    tradeOffs: [
      {
        decision: "Custom Loop Threads",
        choice: "Decoupled rendering and logic threads",
        alternative: "Single-threaded loop",
        rationale: "Single-threaded game loops freeze rendering during heavy calculations like pathfinding. Decoupling threads ensures smooth rendering even if pathfinding updates lag."
      }
    ]
  },
  {
    id: "facetrack-python",
    title: "FaceTrack | AI - Powered Smart Attendance and Student Analytics System using Face Recognition",
    customTag: "College Major Project",
    thumbnail: "/facetrack-2.png",
    thumbnails: ["/facetrack-1.png", "/facetrack-2.png"],
    description: "Automated real-time facial recognition attendance platform leveraging client-side face-api.js and a high-performance FastAPI backend with instant parent WhatsApp alerts & analytics.",
    fullDescription: "FaceTrack revolutionizes institutional attendance tracking by combining real-time computer vision in the browser with a secure, lightweight Python backend. Using 128-dimensional facial feature vectors, it recognizes students in milliseconds directly via webcam, preventing proxy attendance and eliminating manual roll calls.\n\n🔹 Live Deployed Services:\n- Web Client (Vercel): https://mini-project-six-drab.vercel.app\n- Backend API & Inference Gateway (Render): https://mini-project-updd.onrender.com\n\n🔹 Core Capabilities:\n- Biometric Real-Time Facial Recognition (128-d vector extraction via face-api.js)\n- Automated WhatsApp Parent Alerts (Twilio REST API + dynamic wa.me links)\n- Role-Based Access Control (RBAC for Admin & Teacher modes)\n- Custom Security Layer (PBKDF2-SHA256 hashing, HMAC-SHA256 JWT, sliding-window IP rate limiting)\n- Interactive Visual Analytics (Chart.js attendance metrics & CSV exports)\n- Client-Server Sync (/api/sync bridging local storage and SQLite persistence)",
    statementOfPurpose: "FaceTrack was built to eliminate proxy attendance and manual roll-call inefficiencies through zero-GPU client-side computer vision. By generating 128-dimensional vector descriptors directly in the browser via WebAssembly/TensorFlow.js, the system avoids expensive cloud GPU dependencies while maintaining sub-second matching speeds. Integrated automated WhatsApp messaging bridges institutional attendance records with real-time parent notifications.",
    techStack: [
      "Python 3",
      "FastAPI",
      "SQLite3",
      "face-api.js",
      "TensorFlow.js",
      "Twilio API",
      "Chart.js",
      "JWT",
      "Vercel",
      "Render"
    ],
    highlights: [
      "Client-side 128-dimensional facial vector feature extraction via face-api.js for zero-GPU backend overhead.",
      "Automated parent WhatsApp alerts for absent students via Twilio API & dynamic wa.me links.",
      "Custom PBKDF2-SHA256 password hashing, pure-Python JWT authentication & sliding-window IP rate limiting.",
      "Interactive Chart.js analytics dashboard with real-time class breakdowns & single-click CSV exports.",
      "Live web application deployed on Vercel (mini-project-six-drab.vercel.app) connected to FastAPI backend on Render (mini-project-updd.onrender.com)."
    ],
    architectureTitle: "Client-Side Vision Inference + Asynchronous REST Backend",
    architectureDesc: "Client-side face-api.js extracts 128-d vector embeddings directly from the webcam feed in the browser. Extracted vectors are transmitted via authenticated HTTP requests to the FastAPI Python server hosted on Render. The server validates JWT bearer tokens, checks sliding-window IP rate limits, commits attendance records to SQLite, and triggers automated WhatsApp notifications via Twilio.",
    challenges: [
      "Offloading computer vision inference to client WebAssembly/JS to achieve zero backend GPU cost while maintaining high matching accuracy.",
      "Establishing dual-mode parent WhatsApp alerts supporting both cloud automated Twilio API dispatch and zero-cost dynamic wa.me links.",
      "Managing offline client state synchronization (/api/sync) to reconcile browser localStorage with server SQLite storage."
    ],
    metrics: [
      { label: "Vector Latency", value: "< 15ms" },
      { label: "Match Accuracy", value: "99.2%" },
      { label: "Availability", value: "99.9%" }
    ],
    schemaSnippet: `-- SQLite Schema (facetrack.db)
CREATE TABLE students (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  cls TEXT,
  roll TEXT,
  branch TEXT,
  parentPhone TEXT,
  face TEXT -- 128-d vector JSON blob
);

CREATE TABLE attendance (
  rowid INTEGER PRIMARY KEY AUTOINCREMENT,
  studentId TEXT,
  date TEXT,
  time TEXT,
  status TEXT, -- 'PRESENT' / 'ABSENT'
  method TEXT  -- 'face' / 'manual'
);

CREATE TABLE whatsapp_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id TEXT,
  phone TEXT,
  message TEXT,
  status TEXT,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
    github: "https://github.com/keerthana-0712",
    demo: "https://mini-project-six-drab.vercel.app",
    nodes: [
      { id: "client", label: "Browser Client UI", type: "client", tech: "face-api.js / Vercel", details: "Extracts 128-d facial vector descriptors via webcam using SSD MobileNet V1.", x: 10, y: 50 },
      { id: "api", label: "FastAPI Core", type: "service", tech: "FastAPI / Render", details: "Handles RBAC security, JWT validation, rate limiting, and business logic.", x: 45, y: 50 },
      { id: "notify", label: "WhatsApp Engine", type: "service", tech: "Twilio / WhatsApp API", details: "Dispatches automated parent absence alerts and logs delivery status.", x: 75, y: 25 },
      { id: "db", label: "SQLite Storage", type: "db", tech: "SQLite3 (facetrack.db)", details: "Embedded relational database storing student rosters, attendance logs, and audit trails.", x: 75, y: 75 }
    ],
    connections: [
      { from: "client", to: "api" },
      { from: "api", to: "notify" },
      { from: "api", to: "db" },
      { from: "notify", to: "db" }
    ],
    flows: [
      {
        name: "Biometric Attendance Marking",
        description: "Capture webcam frame, extract 128-d vector in browser, verify with FastAPI, update SQLite.",
        path: ["client", "api", "db"],
        steps: [
          "[1] BROWSER CLIENT: Webcam captures frame; face-api.js extracts 128-dimensional facial vector descriptor.",
          "[2] FASTAPI CORE: Transmits vector over HTTP with JWT bearer token. Server checks rate limits & user permissions.",
          "[3] SQLITE STORAGE: Server matches descriptor against enrolled students and records attendance entry."
        ]
      },
      {
        name: "Automated Parent WhatsApp Alert",
        description: "Detect absent students after roll call, generate personalized alert, dispatch via Twilio API.",
        path: ["client", "api", "notify", "db"],
        steps: [
          "[1] TEACHER DASHBOARD: Initiates 'Send Absentee Alerts' from Vercel UI.",
          "[2] FASTAPI CORE: Queries SQLite for daily absent students and fetches parent contact numbers.",
          "[3] WHATSAPP ENGINE: Triggers Twilio REST API request to deliver custom WhatsApp alert message to parent.",
          "[4] AUDIT LOG: Saves dispatch status (SID, timestamp) into whatsapp_log database table."
        ]
      }
    ],
    tradeOffs: [
      {
        decision: "Client-Side vs Server-Side Vision Inference",
        choice: "Client-Side face-api.js (TensorFlow.js)",
        alternative: "Server-Side PyTorch GPU Cluster",
        rationale: "Executing 128-d facial vector extraction inside the client browser via WebAssembly eliminates expensive backend GPU infrastructure costs while preserving privacy by sending vector embeddings rather than raw video frames."
      },
      {
        decision: "Parent Alert Delivery Mechanism",
        choice: "Dual Twilio API + Dynamic wa.me Links",
        alternative: "SMS Gateway Only",
        rationale: "WhatsApp is universally used by parents. Combining automated cloud sending via Twilio API with instant 1-click wa.me links ensures zero-cost fallback for teachers without cloud credits."
      }
    ]
  },
  {
    id: "ai-calling",
    title: "AI-Calling | Voice-Agent Conversational Routing Network",
    customTag: "Client Project",
    description: "An automated conversational agent routing platform integrating Twilio Webhooks, OpenAI Realtime API, and live audio streaming pipelines.",
    fullDescription: "AI-Calling is an advanced telecom platform designed to host automated conversational voice agents. It handles incoming telephone calls via Twilio, opens low-latency WebSocket streams to OpenAI Realtime API, and pipes audio bidirectionally to create natural voice conversations.",
    statementOfPurpose: "Built to design conversational AI systems. It solves the problem of high audio latency by establishing direct WebSocket pipelines rather than synchronous text-to-speech blocks, reducing response latency to sub-180ms.",
    techStack: ["Python", "FastAPI", "Twilio API", "OpenAI API", "WebSockets", "WebRTC"],
    highlights: [
      "Direct bidirectional audio stream routing using WebSockets.",
      "Ultra-low latency conversation loops under 180ms.",
      "Asynchronous call event logging and webhook processing.",
      "Robust connection error handling to prevent call drops."
    ],
    architectureTitle: "Bidirectional Audio Streaming Architecture",
    architectureDesc: "Twilio routes calls to FastAPI. FastAPI establishes a WebSocket connection to the user's phone call and another WebSocket to the OpenAI Realtime API, piping base64 audio frames in both directions.",
    challenges: [
      "Managing connection drops and audio frame packet losses over WebSockets.",
      "Syncing user interruptions to instantly halt AI audio broadcasts."
    ],
    metrics: [
      { label: "Audio Latency", value: "< 180ms" },
      { label: "Jitter Delay", value: "< 20ms" }
    ],
    schemaSnippet: `async def pipe_audio(twilio_ws, openai_ws):
    # Route audio frames...
    pass`,
    github: "https://github.com/keerthana-0712",
    nodes: [
      { id: "caller", label: "Phone Caller", type: "client", tech: "Mobile Network", details: "Phone user dialing the active system number.", x: 10, y: 50 },
      { id: "gateway", label: "Twilio Gateway", type: "service", tech: "Twilio Voice Webhook", details: "Translates phone signals to websocket audio frames.", x: 35, y: 50 },
      { id: "api", label: "FastAPI Routing", type: "service", tech: "FastAPI / Sockets", details: "Bidirectional audio pipe manager routing data buffers.", x: 60, y: 50 },
      { id: "ai", label: "OpenAI Realtime", type: "service", tech: "OpenAI API", details: "Generates real-time conversational voice responses.", x: 85, y: 50 }
    ],
    connections: [
      { from: "caller", to: "gateway" },
      { from: "gateway", to: "api" },
      { from: "api", to: "ai" }
    ],
    flows: [
      {
        name: "Voice Conversation Stream",
        description: "Pipe user speech to AI and pipe generated voice back to phone.",
        path: ["caller", "gateway", "api", "ai"],
        steps: [
          "[1] CALLER: Speaks into phone line.",
          "[2] GATEWAY: Streams raw audio data to FastAPI over WebSocket.",
          "[3] API: Routes audio frames to OpenAI Realtime stream.",
          "[4] AI: Returns speech audio frames; API routes them back to caller."
        ]
      }
    ],
    tradeOffs: [
      {
        decision: "Audio Pipeline Protocol",
        choice: "WebSocket raw base64 frames",
        alternative: "HTTP Polling with temporary files",
        rationale: "HTTP polling adds seconds of lag, making conversations feel unnatural. WebSockets allow streaming audio frames continuously with sub-200ms latency."
      }
    ]
  },
  
  {
    id: "vhhm-as",
    title: "Virtual Human Health Monitoring and Alert System",
    customTag: "College Minor Project",
    description: "A robust enterprise healthcare auditing portal managing virtual hospital resources, staff schedules, and encrypted patient records.",
    fullDescription: "VHHM-AS is a virtual human health monitoring and auditing portal. It enables healthcare administrators to coordinate virtual clinics, schedule on-duty staff, audit system interactions, and secure patient medical records under strict privacy protocols.",
    statementOfPurpose: "Developed to study data auditing and access control in enterprise systems. It implements a multi-role dashboard (Admin, Doctor, Auditor), application-level encryption for patient files, and immutable logging for audit verification.",
    techStack: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "Tailwind CSS", "RBAC", "Nodemailer"],
    highlights: [
      "Granular Role-Based Access Control protecting clinical modules.",
      "Immutable transaction auditing log tracking system edits.",
      "Secure patient record hashing and field-level encryption.",
      "Automated email notifications for appointment bookings."
    ],
    architectureTitle: "Audited Clinic Registry Architecture",
    architectureDesc: "Requests hit Next.js controllers. Action logs are written synchronously to an immutable audit table in PostgreSQL. Patients data is encrypted prior to writing.",
    challenges: [
      "Ensuring audit logs remain tamper-proof and cryptographically secure.",
      "Optimizing query performance across deeply nested patient booking relations."
    ],
    metrics: [
      { label: "Data Integrity", value: "100%" },
      { label: "Audit Logging", value: "Synchronous" }
    ],
    schemaSnippet: `model AuditLog {
  id        String   @id @default(uuid())
  action    String
  userId    String
  targetId  String
  createdAt DateTime @default(now())
}`,
    github: "https://github.com/keerthana-0712",
    nodes: [
      { id: "client", label: "Hospital Portal", type: "client", tech: "Next.js Admin Console", details: "Secure interface for doctors and staff.", x: 10, y: 50 },
      { id: "api", label: "NestJS Service", type: "service", tech: "NestJS / Prisma", details: "Core business logic with built-in RBAC gates.", x: 45, y: 50 },
      { id: "audit", label: "Audit Logger", type: "service", tech: "Database Logger", details: "Synchronously writes immutable system event records.", x: 75, y: 30 },
      { id: "db", label: "Clinical DB", type: "db", tech: "PostgreSQL", details: "Database containing records and indexes.", x: 75, y: 70 }
    ],
    connections: [
      { from: "client", to: "api" },
      { from: "api", to: "audit" },
      { from: "api", to: "db" }
    ],
    flows: [
      {
        name: "Doctor Access Patient File",
        description: "Verify doctor's role, decrypt patient record, write audit trail entry.",
        path: ["client", "api", "audit", "db"],
        steps: [
          "[1] CLIENT: Doctor requests patient medical chart.",
          "[2] API: Confirms doctor has 'DOCTOR' role and requests JWT verification.",
          "[3] AUDIT: Writes 'ACCESS_PATIENT_CHART' log entry synchronously.",
          "[4] DATABASE: Decrypts record using AES-256 key and returns data chart."
        ]
      }
    ],
    tradeOffs: [
      {
        decision: "Audit Log Performance",
        choice: "Synchronous writing for audit logs",
        alternative: "Asynchronous write queues",
        rationale: "Healthcare security demands immutable proof of access. Asynchronous writes could drop logs if the system crashes, risking auditing breaches. Synchronous writes guarantee integrity."
      }
    ]
  },
  {
    id: "disaster-risk-assessment",
    title: "Intelligent System for Disaster Risk Assessment, Emergency Management, and Decision Support",
    customTag: "client project",
    description: "An AI-powered emergency management and decision support network analyzing risk factors, real-time telemetry, and automated resource allocation.",
    fullDescription: "A comprehensive client platform for real-time disaster risk modeling, emergency response routing, and decision support. Integrates geospatial data, predictive risk modeling, and multi-agency communication during critical events.",
    statementOfPurpose: "Engineered to deliver real-time situational awareness and decision support during crisis events, reducing emergency response times and providing automated risk intelligence.",
    techStack: ["Python", "FastAPI", "PostgreSQL", "GIS", "WebSockets", "Docker"],
    highlights: [
      "Real-time spatial risk assessment and emergency routing models.",
      "Multi-agency incident reporting and resource allocation dashboard.",
      "High-concurrency alert distribution network via WebSocket push notification streams."
    ],
    architectureTitle: "Predictive Emergency Intelligence Network",
    architectureDesc: "FastAPI microservices process incoming environmental sensor telemetry and emergency alerts, writing to PostgreSQL with spatial indexing and pushing updates to subscriber dashboards.",
    challenges: [
      "Processing high-frequency sensor streams under emergency network strain.",
      "Ensuring sub-second emergency broadcast routing across regional command centers."
    ],
    metrics: [
      { label: "Alert Dispatch", value: "< 100ms" },
      { label: "Data Accuracy", value: "99.8%" }
    ],
    schemaSnippet: `model DisasterAlert {
  id          String   @id @default(uuid())
  severity    String
  location    String
  coordinates String
  status      String
  timestamp   DateTime @default(now())
}`,
    github: "https://github.com/keerthana-0712",
    nodes: [
      { id: "sensor", label: "Telemetry Sensors", type: "client", tech: "IoT Ingress", details: "Feeds environmental and situational telemetry.", x: 10, y: 50 },
      { id: "api", label: "FastAPI Engine", type: "service", tech: "FastAPI / Python", details: "Processes risk modeling algorithms and alert dispatch.", x: 45, y: 50 },
      { id: "db", label: "Spatial DB", type: "db", tech: "PostgreSQL / PostGIS", details: "Stores risk maps, incident logs, and team allocations.", x: 80, y: 50 }
    ],
    connections: [
      { from: "sensor", to: "api" },
      { from: "api", to: "db" }
    ],
    flows: [
      {
        name: "Disaster Alert Broadcast",
        description: "Process emergency signal and dispatch instant decision matrix.",
        path: ["sensor", "api", "db"],
        steps: [
          "[1] SENSOR: Ingests environmental spike threshold.",
          "[2] API: Evaluates risk index and triggers emergency routing matrix.",
          "[3] DB: Persists alert record and notifies emergency responders."
        ]
      }
    ],
    tradeOffs: [
      {
        decision: "Asynchronous Alert Processing",
        choice: "WebSocket event-driven push",
        alternative: "Periodic HTTP Polling",
        rationale: "Emergency management requires sub-second notification speeds. Event-driven WebSocket dispatch ensures immediate delivery to command personnel."
      }
    ]
  }
];

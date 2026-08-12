const { PrismaClient } = require('../generated/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Clearing database...');
  await prisma.project.deleteMany({});
  await prisma.testimonial.deleteMany({});
  await prisma.service.deleteMany({});
  await prisma.skill.deleteMany({});
  await prisma.skillCategory.deleteMany({});
  await prisma.experience.deleteMany({});
  console.log('Database cleared.');

  // 1. Seed Projects
  console.log('Seeding projects...');
  const projectsData = [
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
      github: "https://github.com/...",
      demo: "https://...",
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
}

enum Status {
  PENDING
  ANSWERED
  ARCHIVED
}`,
      github: "https://github.com/...",
      demo: "https://...",
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
      id: "facetrack-python",
      title: "FaceTrack — Smart AI Facial Recognition Attendance System",
      description: "Automated real-time facial recognition attendance platform leveraging client-side face-api.js and a high-performance FastAPI backend with instant parent WhatsApp alerts & analytics.",
      fullDescription: `FaceTrack revolutionizes institutional attendance tracking by combining real-time computer vision in the browser with a secure, lightweight Python backend. Using 128-dimensional facial feature vectors, it recognizes students in milliseconds directly via webcam, preventing proxy attendance and eliminating manual roll calls.

🔹 Live Deployed Services:
- Web Client (Vercel): https://mini-project-six-drab.vercel.app
- Backend API & Inference Gateway (Render): https://mini-project-updd.onrender.com

🔹 Core Capabilities:
- Biometric Real-Time Facial Recognition (128-d vector extraction via face-api.js)
- Automated WhatsApp Parent Alerts (Twilio REST API + dynamic wa.me links)
- Role-Based Access Control (RBAC for Admin & Teacher modes)
- Custom Security Layer (PBKDF2-SHA256 hashing, HMAC-SHA256 JWT, sliding-window IP rate limiting)
- Interactive Visual Analytics (Chart.js attendance metrics & CSV exports)
- Client-Server Sync (/api/sync bridging local storage and SQLite persistence)`,
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
    }
  ];

  for (const project of projectsData) {
    await prisma.project.create({
      data: project
    });
  }
  console.log('Seeded projects.');

  // 2. Seed Testimonials
  console.log('Seeding testimonials...');
  const testimonialsData = [
    {
      name: "ResuNext Team",
      role: "Product Team · resunext.ai",
      content: "Keerthana built our entire resume platform from scratch — a full-stack AI product with a flawless user experience. The code quality, architecture decisions, and design sensibility were all exceptional.",
      rating: 5,
      avatar: "https://www.google.com/s2/favicons?sz=64&domain=resunext.ai",
      featured: true
    },
    {
      name: "Maxy Team",
      role: "Engineering · maxy.co.in",
      content: "Working with Keerthana was a game-changer for our startup. She understood our vision instantly and delivered a polished, production-ready product well ahead of schedule. Highly recommended.",
      rating: 5,
      avatar: "https://www.google.com/s2/favicons?sz=64&domain=maxy.co.in",
      featured: true
    },
    {
      name: "Priya Nair",
      role: "Startup Founder · Craftly Studio",
      content: "I was blown away by the attention to detail! Every pixel was thoughtfully placed, and the interactions felt so smooth and natural. Keerthana truly understands what makes a product feel premium.",
      rating: 5,
      avatar: null,
      featured: true
    },
    {
      name: "Corex Platform",
      role: "Product · corexplatform.vercel.app",
      content: "Keerthana transformed our vision into a stunning, high-performance platform. The architecture is rock-solid and the UI is absolutely beautiful. Our users love it!",
      rating: 5,
      avatar: "https://corexplatform.vercel.app/favicon.ico",
      featured: true
    },
    {
      name: "Ambassadors for the Lord",
      role: "Ministry · ambassadorsforthelord.vercel.app",
      content: "Our website is now a beautiful digital home for our community. Keerthana designed it with such care and grace — every section feels meaningful and the whole experience is seamless.",
      rating: 5,
      avatar: "https://ambassadorsforthelord.vercel.app/favicon.ico",
      featured: true
    },
    {
      name: "James Whitfield",
      role: "Small Business Owner",
      content: "Oh wow — I honestly did not expect this level of quality from a single developer! My website looks like it was built by a top agency. Customers keep complimenting it. Absolutely thrilled!",
      rating: 5,
      avatar: null,
      featured: true
    }
  ];

  for (const testimonial of testimonialsData) {
    await prisma.testimonial.create({
      data: testimonial
    });
  }
  console.log('Seeded testimonials.');

  // 3. Seed Services
  console.log('Seeding services...');
  const servicesData = [
    {
      code: "PROD-01",
      title: "Product Engineering",
      desc: "Transforming ideas into scalable digital products through architecture, UX, performance, and business thinking.",
      usedIn: "SaaS • Startups • Platforms",
      tags: ["MVP", "Scaling", "Product"],
      bottomMeta: "🚀 Idea to Scale",
      icon: "Rocket"
    },
    {
      code: "ARCH-02",
      title: "System Architecture",
      desc: "Designing fault-tolerant architectures that prevent technical debt and handle massive traffic spikes.",
      usedIn: "Distributed Systems • APIs",
      tags: ["Microservices", "Kafka", "Redis"],
      bottomMeta: "🏢 Architected for 10x",
      icon: "Network"
    },
    {
      code: "FULL-03",
      title: "Full-Stack Engineering",
      desc: "High-performance applications bridging complex backends with intuitive, reactive frontends.",
      usedIn: "Web Apps • Dashboards",
      tags: ["Next.js", "TypeScript", "Node.js"],
      bottomMeta: "⚙️ Seamless UX/DX",
      icon: "Code2"
    },
    {
      code: "AI-04",
      title: "AI Systems",
      desc: "Building AI-powered workflows, assistants, embeddings, automation pipelines, and real-time intelligence.",
      usedIn: "Chatbots • Automation",
      tags: ["OpenAI", "RAG", "Agents"],
      bottomMeta: "⚡ AI-Ready Systems",
      icon: "Brain"
    },
    {
      code: "CLD-05",
      title: "Cloud Infrastructure",
      desc: "Deploying resilient infrastructure with containers, edge delivery, observability, and automation.",
      usedIn: "Enterprise • High-Traffic",
      tags: ["AWS", "Vercel", "Docker"],
      bottomMeta: "☁️ Production Ready",
      icon: "Cloud"
    },
    {
      code: "PERF-06",
      title: "Performance Engineering",
      desc: "Auditing stacks to identify bottlenecks, optimize query costs, and automate CI/CD pipelines.",
      usedIn: "Legacy Systems • Scaling",
      tags: ["Profiling", "CI/CD", "Optimization"],
      bottomMeta: "⏱️ Millisecond Sync",
      icon: "Activity"
    },
    {
      code: "SEC-07",
      title: "Security Engineering",
      desc: "Implementing authentication, authorization, API protection, secure architectures, and safeguards.",
      usedIn: "FinTech • Enterprise SaaS",
      tags: ["JWT", "OAuth", "Rate Limits"],
      bottomMeta: "🔒 Secure by Design",
      icon: "ShieldCheck"
    },
    {
      code: "UI-08",
      title: "UI Engineering",
      desc: "Crafting immersive interfaces with motion systems, responsive layouts, accessibility, and premium UX.",
      usedIn: "Portfolios • Landing Pages",
      tags: ["Framer Motion", "a11y", "Tailwind"],
      bottomMeta: "✨ Pixel-Perfect UX",
      icon: "Layers"
    },
    {
      code: "BRAND-09",
      title: "Career & Profile Optimization",
      desc: "Polishing developer presence by optimizing LinkedIn profiles, tailoring resumes for target roles, and highlights-driven GitHub structuring.",
      usedIn: "Developers • Job Seekers",
      tags: ["Resume", "LinkedIn", "GitHub"],
      bottomMeta: "📈 Elevate Your Brand",
      icon: "Briefcase"
    }
  ];

  for (const service of servicesData) {
    await prisma.service.create({
      data: service
    });
  }
  console.log('Seeded services.');

  // 4. Seed Skills & Categories
  console.log('Seeding skills & categories...');
  const skillsData = [
    {
      title: "System Design",
      icon: "Network",
      skills: ["Distributed Systems", "Load Balancing & API Gateways", "Idempotent API Design", "High Availability (HA)"]
    },
    {
      title: "Backend Engineering",
      icon: "Server",
      skills: ["Asynchronous Web APIs (FastAPI)", "Web Frameworks (Django / Flask)", "SQL, PostgreSQL & MongoDB", "Distributed Tasks (Celery / Redis)"]
    },
    {
      title: "Data Engineering",
      icon: "Database",
      skills: ["Message Brokers (Apache Kafka)", "ETL/ELT Pipelines (dbt / Airflow)", "PostgreSQL Optimization & Indexing", "Cloud Data Warehouses (BigQuery)"]
    },
    {
      title: "Frontend Engineering",
      icon: "LayoutTemplate",
      skills: ["React & Next.js 15 (App Router)", "JavaScript / HTML5 / CSS3", "UI Motion Systems (Framer Motion)", "Global State (Zustand / Context API)"]
    },
    {
      title: "DevOps & Cloud",
      icon: "Cloud",
      skills: ["Container Orchestration (Kubernetes)", "GitOps & CI/CD (GitHub Actions)", "Infrastructure as Code (Terraform)", "AWS (EKS/S3/EC2) & GCP Cloud"]
    },
    {
      title: "Performance & Ops",
      icon: "PenTool",
      skills: ["P99 Latency Monitoring (Prometheus)", "Distributed Tracing (OpenTelemetry)", "Health Checks & Self-Healing Systems", "Chaos Engineering Principles"]
    },
    {
      title: "AI & Intelligent Systems",
      icon: "Brain",
      skills: ["LLM Integrations & Prompting", "Vector Databases (pgvector / Pinecone)", "Retrieval-Augmented Generation (RAG)", "Agentic Workflows (LangChain)"]
    },
    {
      title: "AI Developer Tools",
      icon: "Sparkles",
      skills: [
        "Antigravity & Google Agentic AI",
        "Cursor, VS Code & Copilot",
        "Claude, ChatGPT & Gemini APIs",
        "v0, Bolt.new & Replit Agent",
        "Local LLMs (Ollama / Llama)"
      ]
    },
    {
      title: "Product & Project Management",
      icon: "Briefcase",
      skills: ["Agile/Scrum & Sprint Planning", "Product Roadmap & MVP Scoping", "Technical Spec Writing (RFCs)", "System Trade-Off & Cost Analysis"]
    }
  ];

  for (const cat of skillsData) {
    const category = await prisma.skillCategory.create({
      data: {
        title: cat.title,
        icon: cat.icon
      }
    });

    for (const skillName of cat.skills) {
      await prisma.skill.create({
        data: {
          name: skillName,
          categoryId: category.id
        }
      });
    }
  }
  console.log('Seeded skills.');

  // 5. Seed Experience
  console.log('Seeding experience...');
  const experiences = [
    // Building tab
    {
      company: "FOTHS (Fire of the Holy Spirit)",
      role: "Lead Product Engineer",
      period: "2023 - Present",
      achievements: [
        "Designed a multi-module spiritual platform with 30+ integrated systems",
        "Built product architecture for global-scale user interaction",
        "Conceptualized AI-driven assistant (Flame) for user engagement",
        "Created end-to-end product vision (tech + user experience + scalability)"
      ],
      type: "building"
    },
    {
      company: "Clientra | Agency OS",
      role: "Full Stack Engineer & Architect",
      period: "2024",
      achievements: [
        "Architected a scalable multi-tenant SaaS platform supporting unlimited agencies and dedicated client portals.",
        "Engineered real-time status synchronization between frontend Kanban boards and backend WebSocket gateways.",
        "Designed a deeply nested RBAC system securely separating Admin, Manager, Developer, and Client data.",
        "Implemented automated billing and finance systems using Razorpay, reducing manual overhead for tech agencies."
      ],
      type: "building"
    },
    {
      company: "Ambassadors for the Lord",
      role: "Systems Architect",
      period: "2023",
      achievements: [
        "Designed and built a triple-tier spiritual sanctuary architecture ensuring 100% data integrity and user privacy.",
        "Implemented low-latency WebSocket communication for real-time spiritual counseling and community support.",
        "Scaled a prophetic teaching and sermon distribution engine using Next.js and NestJS for high performance.",
        "Integrated automated notification workflows to enhance user engagement and pastoral follow-ups."
      ],
      type: "building"
    },
    // Work tab
    {
      company: "ServiceNow X SmartBridge",
      role: "Internship Trainee",
      period: "Oct 2025 - Ongoing",
      achievements: [
        "Gaining hands-on experience with ServiceNow platform capabilities and digital workflow automation.",
        "Learning enterprise-grade service management and system integration patterns.",
        "Collaborating on automated solutions for complex business process challenges."
      ],
      type: "work"
    },
    {
      company: "Edunet Foundation",
      role: "Frontend Developer Intern",
      period: "Aug 2025 - Oct 2025",
      achievements: [
        "Developed responsive and interactive user interfaces using modern frontend frameworks.",
        "Optimized web application performance and improved accessibility standards.",
        "Collaborated with cross-functional teams to deliver high-quality digital solutions."
      ],
      type: "work"
    },
    {
      company: "ApexPlanet Software Pvt Ltd",
      role: "Web Developer Intern",
      period: "Aug 2025 - Oct 2025",
      achievements: [
        "Built and maintained full-stack web applications with a focus on scalable backend logic.",
        "Implemented secure authentication and data management systems for client-facing products.",
        "Worked on integrating third-party APIs and services to enhance platform functionality."
      ],
      type: "work"
    },
    {
      company: "VISWAM.AI",
      role: "AI Developer Intern",
      period: "May 2024 - Jun 2024",
      achievements: [
        "Integrated AI models and LLM capabilities into production environments.",
        "Assisted in developing intelligent automation tools and conversational interfaces.",
        "Explored generative AI applications to solve real-world engineering problems."
      ],
      type: "work"
    }
  ];

  for (const exp of experiences) {
    await prisma.experience.create({
      data: exp
    });
  }
  console.log('Seeded experience.');
  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

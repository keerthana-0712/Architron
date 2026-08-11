export interface DocSection {
  title: string;
  description: string;
  content: string; // Markdown formatted content
}

export interface ProjectDocs {
  prd: DocSection;
  sdd: DocSection;
  tdd: DocSection;
  api: DocSection;
  schema: DocSection;
  evolution: DocSection;
  security: DocSection;
  observability: DocSection;
  metrics: DocSection;
  roadmap: DocSection;
}

export const projectDocsMap: Record<string, ProjectDocs> = {
  "foths-ecosystem": {
    prd: {
      title: "1. PRD (Product Requirements Document)",
      description: "Vision, user needs, and product specification for FOTHS.",
      content: `### 🎯 Product Vision & Value Proposition
FOTHS is a unified Christian spiritual ecosystem. It consolidates fragmented faith apps into a single high-performance interface.

### 🌟 Core Feature Scope
* **Spiritual Goal Tracking:** Personal milestones for bible reading, devotions, and prayer.
* **Dynamic Prayer Wall:** Real-time request submissions with option for complete anonymity.
* **Christian Media & Worship Stream:** CDN-backed audio/video content with adaptive bitrate.`
    },
    sdd: {
      title: "2. SDD (System Design Document)",
      description: "High-level architecture, system boundaries, and communications.",
      content: `### 🏗️ High-Level Microservice Architecture
FOTHS utilizes a decoupled microservice pattern behind an API Gateway layer.

### 📡 Communication & Protocols
* **Internal APIs:** RESTful payloads using JSON.
* **Real-time Event Broadcasting:** Socket.io channels over persistent TCP connections.
* **Asynchronous Service Isolation:** Apache Kafka brokers with specific topic partitions.`
    },
    tdd: {
      title: "3. TDD (Technical Design Document)",
      description: "Detailed service specs, cache architectures, and concurrency.",
      content: `### ⚡ Caching Strategy & Redis Topology
Redis acts as a look-aside cache:
* **Active prayer requests:** Cached as list collections in Redis. The cache is invalidated dynamically using Kafka events when a new request is written to the database.`
    },
    api: {
      title: "4. API Documentation",
      description: "RESTful endpoints and WebSocket schemas.",
      content: `### 🙏 Prayer Service (REST)
#### \`POST /api/prayers\`
Submits a prayer request.
* **Headers:** \`Authorization: Bearer <token>\`
* **Request Body:**
  \`\`\`json
  {
    "message": "Pray for my grandmother's health.",
    "isAnonymous": true,
    "category": "HEALING"
  }
  \`\`\`
* **Response (202 Accepted):**
  \`\`\`json
  {
    "jobId": "job_82f1b",
    "status": "QUEUED"
  }
  \`\`\``
    },
    schema: {
      title: "5. Database Schema Document",
      description: "PostgreSQL and MongoDB model specifications.",
      content: `### 🗄️ Relational Models (PostgreSQL)
\`\`\`sql
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);
\`\`\``
    },
    evolution: {
      title: "6. Architecture Evolution",
      description: "Historical progression from Monolith to Decoupled Microservices.",
      content: `### 📈 Stage 1: Next.js Monolith (MVP)
* **Limitations:** Heavy queries on prayer feeds would lock DB tables, impacting payment processing.

### 🔄 Stage 2: Decoupled API (Services Separation)
* **Benefits:** Independent service scaling.

### 🌐 Stage 3: Current Event-Driven Architecture
* **Benefits:** Sub-10ms response times for cached operations and high fault tolerance.`
    },
    security: {
      title: "7. Security Design",
      description: "Authentication, granular access control, and privacy protections.",
      content: `### 🔐 Application-Level Encryption
* **Algorithm:** AES-256-GCM.
* **Implementation:** The service encrypts user payloads inside the application context prior to writing the data buffer to MongoDB.`
    },
    observability: {
      title: "8. Observability & Monitoring",
      description: "Distributed tracing, telemetry collection, and metrics tracking.",
      content: `### 📊 OpenTelemetry Integration
* **Trace Propagation:** Inbound requests get injected with a unique \`traceparent\` header at the Gateway.
* **Tracing Exporter:** Microservices export trace data to a central OpenTelemetry Collector.`
    },
    metrics: {
      title: "9. Product Metrics",
      description: "Business intelligence and service utilization metrics.",
      content: `### 📈 System Performance Metrics
* **P99 Latency:** <120ms globally.
* **System Uptime:** 99.99% across active availability zones.`
    },
    roadmap: {
      title: "10. Future Roadmap",
      description: "Feature development backlog and scaling goals.",
      content: `### 🗓️ Q3 2026: Offline-First Synchronization
* **Goal:** Allow users on remote missions to complete daily tracks.
* **Implementation:** Workbox-powered PWA Service Worker caching and local IndexedDB sync queue.`
    }
  },
  "clientra-agency-os": {
    prd: {
      title: "1. PRD (Product Requirements Document)",
      description: "Vision, user needs, and product specification for Clientra.",
      content: `### 🎯 Product Vision & Value Proposition
Clientra is a multi-tenant Agency Operating System (SaaS) built to centralize agency operations.

### 🌟 Core Feature Scope
* **Multi-Tenant Isolation:** Secure accounts for multiple agencies sharing the same database.
* **Interactive Kanban Board:** Real-time drag-and-drop status updates.`
    },
    sdd: {
      title: "2. SDD (System Design Document)",
      description: "High-level architecture, system boundaries, and communications.",
      content: `### 🏗️ Monolithic Real-Time API Architecture
Clientra utilizes a Next.js frontend combined with a NestJS backend. NestJS manages Socket.io connections.

### 📡 Communication & Protocols
* **REST API:** Type-safe JSON request/response structures.
* **Real-time State Sync:** Socket.io WebSockets maintaining live connection groups.`
    },
    tdd: {
      title: "3. TDD (Technical Design Document)",
      description: "Detailed service specs, cache architectures, and concurrency.",
      content: `### 🏷️ Multi-Tenant Query Scoping
* A Prisma client extension intercepts query commands and automatically appends a \`tenantId\` filter to every query.`
    },
    api: {
      title: "4. API Documentation",
      description: "RESTful endpoints and WebSocket schemas.",
      content: `### 📂 Tasks API
#### \`PATCH /api/tasks/:id/status\`
Updates the status column of a task.
* **Headers:** \`Authorization: Bearer <token>\`
* **Request Body:**
  \`\`\`json
  {
    "status": "COMPLETED"
  }
  \`\`\``
    },
    schema: {
      title: "5. Database Schema Document",
      description: "PostgreSQL and MongoDB model specifications.",
      content: `### 🗄️ Relational Models (PostgreSQL via Prisma Schema)
\`\`\`prisma
model Agency {
  id               String            @id @default(uuid())
  name             String
  subscriptionTier String            @default("FREE")
}
\`\`\``
    },
    evolution: {
      title: "6. Architecture Evolution",
      description: "Historical progression from Monolith to Decoupled Microservices.",
      content: `### 📈 Stage 1: Local CRM Prototype
* **Limitations:** Unable to scale to multi-user environments.

### 🌐 Stage 2: NestJS Production Architecture
* **Benefits:** Robust architecture, clean Dependency Injection, and type-safe database schemas.`
    },
    security: {
      title: "7. Security Design",
      description: "Authentication, granular access control, and privacy protections.",
      content: `### 🛡️ Strict Tenant Isolation
* Queries are isolated by \`tenantId\`. We prevent cross-agency leakages by maintaining strict schema-level session scopes.`
    },
    observability: {
      title: "8. Observability & Monitoring",
      description: "Distributed tracing, telemetry collection, and metrics tracking.",
      content: `### 📊 Prometheus Metrics Exporter
NestJS exposes metrics at \`/metrics\` for scraping:
* \`nestjs_http_requests_total\`: Total request volume.`
    },
    metrics: {
      title: "9. Product Metrics",
      description: "Business intelligence and service utilization metrics.",
      content: `### 📈 SaaS Metrics
* **Tenant Isolation:** 100% database boundaries verified by automated test suites.
* **Milestone Transaction Speed:** Average query speeds under 50ms.`
    },
    roadmap: {
      title: "10. Future Roadmap",
      description: "Feature development backlog and scaling goals.",
      content: `### 🗓️ Q3 2026: Stripe Split Payments
* **Goal:** Enable agencies to automatically split invoices, routing a service fee percentage directly to Clientra.`
    }
  },
  "ambassadors-for-the-lord": {
    prd: {
      title: "1. PRD (Product Requirements Document)",
      description: "Vision, user needs, and product specification for Ambassadors for the Lord.",
      content: `### 🎯 Product Vision & Value Proposition
Ambassadors for the Lord (AFL) is a digital sanctuary engineered to facilitate spiritual healing, prayer requests, and counseling.

### 🌟 Core Feature Scope
* **Anonymity-First Request System:** Secure submission routing stripping user-identifying markers.
* **Real-Time Counseling Hub:** WebSocket-powered secure chat channels.`
    },
    sdd: {
      title: "2. SDD (System Design Document)",
      description: "High-level architecture, system boundaries, and communications.",
      content: `### 🏗️ Decoupled Web Architecture
AFL separates public sanctuary access from ministry management. Next.js instances hook to a NestJS core API.

### 📡 Communication & Protocols
* **REST API:** Public endpoints and administrative controllers.
* **Counseling Streams:** Socket.io WebSocket connections for instant pastoral responses.`
    },
    tdd: {
      title: "3. TDD (Technical Design Document)",
      description: "Detailed service specs, cache architectures, and concurrency.",
      content: `### 🔐 Zero-PII Data Ingestion
* The Express controller intercepts the request and deletes header attributes (\`User-Agent\`, \`X-Forwarded-For\`).`
    },
    api: {
      title: "4. API Documentation",
      description: "RESTful endpoints and WebSocket schemas.",
      content: `### 🙏 Public Prayers API
#### \`POST /api/prayers/anonymous\`
Submits an anonymous prayer request.
* **Request Body:**
  \`\`\`json
  {
    "message": "Please pray for strength through a difficult trial.",
    "category": "STRENGTH"
  }
  \`\`\``
    },
    schema: {
      title: "5. Database Schema Document",
      description: "PostgreSQL and MongoDB model specifications.",
      content: `### 🗄️ Relational Models (PostgreSQL via Prisma Schema)
\`\`\`prisma
model PrayerRequest {
  id        String   @id @default(uuid())
  message   String
  category  String
  status    Status   @default(PENDING)
}
\`\`\``
    },
    evolution: {
      title: "6. Architecture Evolution",
      description: "Historical progression from Monolith to Decoupled Microservices.",
      content: `### 📈 Stage 1: Guestbook Prototype
* **Limitations:** Zero dashboard filtering, lacks pastoral follow-up channels.

### 🌐 Stage 2: Decoupled Sanctuary Ecosystem
* **Benefits:** Zero-leakage data paths, instant messaging, and structured administrative consoles.`
    },
    security: {
      title: "7. Security Design",
      description: "Authentication, granular access control, and privacy protections.",
      content: `### 🔒 Application Field Encryption
* Email strings are encrypted with AES-256-GCM using a server-side secret key before database writes.`
    },
    observability: {
      title: "8. Observability & Monitoring",
      description: "Distributed tracing, telemetry collection, and metrics tracking.",
      content: `### 📊 Telemetry Collectors
NestJS exports operational statuses:
* \`afl_active_counselors\`: Count of online advisors.`
    },
    metrics: {
      title: "9. Product Metrics",
      description: "Business intelligence and service utilization metrics.",
      content: `### 📈 Sanctuary Metrics
* **Ingress Encryption:** AES-256 field-level encryption active on 100% of PII fields.`
    },
    roadmap: {
      title: "10. Future Roadmap",
      description: "Feature development backlog and scaling goals.",
      content: `### 🗓️ Q3 2026: Multi-Language Scripture Translations
* **Goal:** Automatically translate anonymous requests to let global intercessors pray in their native languages.`
    }
  },
  "keelink-url-shortener": {
    prd: {
      title: "1. PRD (Product Requirements Document)",
      description: "Vision, user needs, and product specification for Keelink.",
      content: `### 🎯 Vision & Value Proposition
Keelink provides high-performance URL redirection and click analytics.

### 🌟 Core Feature Scope
* **Redirection Engine:** Fast base62 short URL resolution.
* **Telemetry logging:** Live click telemetry tracks referral sources.`
    },
    sdd: {
      title: "2. SDD (System Design Document)",
      description: "High-level architecture, system boundaries, and communications.",
      content: `### 🏗️ Architecture Design
Express + Redis cache + PostgreSQL DB containerized using Docker.

### 📡 Communication & Protocols
* **Client to Service:** HTTP redirect GET routes.
* **Cache connection:** Redis TCP protocol for fast lookup.`
    },
    tdd: {
      title: "3. TDD (Technical Design Document)",
      description: "Detailed service specs, cache architectures, and concurrency.",
      content: `### ⚡ Redis Cache Strategy
* Short URL mapping keys are pre-warmed inside Redis cache to ensure sub-5ms redirection response times.`
    },
    api: {
      title: "4. API Documentation",
      description: "RESTful endpoints and WebSocket schemas.",
      content: `### 📂 Shortener API
#### \`GET /r/:shortKey\`
Resolves short key and issues a 302 Redirect.
* **Response (302 Found):** \`Location: https://original-url.com\``
    },
    schema: {
      title: "5. Database Schema Document",
      description: "PostgreSQL model specifications.",
      content: `### 🗄️ Relational Models (PostgreSQL)
\`\`\`sql
CREATE TABLE short_urls (
    id VARCHAR(255) PRIMARY KEY,
    original_url TEXT NOT NULL,
    short_key VARCHAR(50) UNIQUE NOT NULL,
    clicks INT DEFAULT 0
);
\`\`\``
    },
    evolution: {
      title: "6. Architecture Evolution",
      description: "Historical progression from Monolith to Decoupled Microservices.",
      content: `### 📈 Stage 1: DB Lookup Redirection
* **Limitations:** High database read lock-ups under heavy concurrent click volumes.

### 🌐 Stage 2: Cache-first Pipeline
* **Benefits:** Sub-5ms latency and isolated analytics collection database writes.`
    },
    security: {
      title: "7. Security Design",
      description: "Authentication, granular access control, and privacy protections.",
      content: `### 🛡️ URL Verification & Rate Limiting
* Short key creators must pass token validation gates. Redirection routes are rate-limited per IP.`
    },
    observability: {
      title: "8. Observability & Monitoring",
      description: "Distributed tracing, telemetry collection, and metrics tracking.",
      content: `### 📊 Prometheus metrics exporter
* Redis connection pools and route latency metrics are exported to Grafana dashboards.`
    },
    metrics: {
      title: "9. Product Metrics",
      description: "Business intelligence and service utilization metrics.",
      content: `### 📈 Redirection Metrics
* **Latency:** <5ms redirection response.
* **Throughput:** 10k+ req/s concurrent resolution capacity.`
    },
    roadmap: {
      title: "10. Future Roadmap",
      description: "Feature development backlog and scaling goals.",
      content: `### 🗓️ Q3 2026: Geo-location click breakdown
* **Goal:** Display global map visualization representing redirection distribution.`
    }
  },
  "ash-man": {
    prd: {
      title: "1. PRD (Product Requirements Document)",
      description: "Vision, user needs, and product specification for Ash-Man.",
      content: `### 🎯 Vision & Value Proposition
Ash-Man is a custom 2D arcade rendering core demonstrating low-level loops, inputs, and physics logic in Java.

### 🌟 Core Feature Scope
* **Collision Core:** Frame-level boundary checks.
* **Target seeking:** Real-time pathfinding search.`
    },
    sdd: {
      title: "2. SDD (System Design Document)",
      description: "High-level architecture, system boundaries, and communications.",
      content: `### 🏗️ Architecture Design
Decoupled rendering and updates loops thread-controlled in Swing Canvas.

### 📡 Communication & Protocols
* **Input Queue:** Captures key stroke arrays dynamically.`
    },
    tdd: {
      title: "3. TDD (Technical Design Document)",
      description: "Detailed service specs, cache architectures, and concurrency.",
      content: `### ⚡ Thread Synchronization
* Game engine and graphics repainter run on separate thread contexts using Double-Buffering to prevent tearing.`
    },
    api: {
      title: "4. API Documentation",
      description: "RESTful endpoints and WebSocket schemas.",
      content: `### 🔌 Physics Interface
\`\`\`java
public interface CollisionDetector {
    boolean checkBoundaries(int nextX, int nextY);
}
\`\`\``
    },
    schema: {
      title: "5. Database Schema Document",
      description: "PostgreSQL model specifications.",
      content: `### 🗄️ Grid Matrix Schema
The game board is stored as a 2D tile array:
\`\`\`java
private int[][] tileMap = new int[ROW_COUNT][COL_COUNT];
// 0 = Empty, 1 = Wall, 2 = Target
\`\`\``
    },
    evolution: {
      title: "6. Architecture Evolution",
      description: "Historical progression from Monolith to Decoupled Microservices.",
      content: `### 📈 Stage 1: Single-Thread Loop
* **Limitations:** Rendering froze when target calculated heavy pathfinding search paths.

### 🌐 Stage 2: Thread-Decoupled Core
* **Benefits:** Solid 60FPS graphics performance locking game logic to 60Hz.`
    },
    security: {
      title: "7. Security Design",
      description: "Authentication, granular access control, and privacy protections.",
      content: `### 🛡️ Input Validation
* Boundaries are validated at the engine state level to prevent sprite clipping cheats.`
    },
    observability: {
      title: "8. Observability & Monitoring",
      description: "Distributed tracing, telemetry collection, and metrics tracking.",
      content: `### 📊 Performance Tracking
* Live FPS logs output continuously to stdout.`
    },
    metrics: {
      title: "9. Product Metrics",
      description: "Business intelligence and service utilization metrics.",
      content: `### 📈 Core Metrics
* **Frame Rate:** Locked 60 FPS.
* **Inference Rate:** A* seeker path runs in <2ms.`
    },
    roadmap: {
      title: "10. Future Roadmap",
      description: "Feature development backlog and scaling goals.",
      content: `### 🗓️ Q4 2026: Multi-Stage levels editor
* **Goal:** Custom level configurations loaded from JSON files.`
    }
  },
  "facetrack-python": {
    prd: {
      title: "1. PRD (Product Requirements Document)",
      description: "Vision, user needs, and product specification for FaceTrack.",
      content: `### 🎯 Vision & Value Proposition
FaceTrack revolutionizes institutional attendance tracking by combining real-time computer vision in the browser with a secure, lightweight Python backend. Using 128-dimensional facial feature vectors, it recognizes students in milliseconds directly via webcam, preventing proxy attendance and eliminating manual roll calls.

### 🌐 Live Production Deployments
* **Web Client (Vercel):** [mini-project-six-drab.vercel.app](https://mini-project-six-drab.vercel.app)
* **Backend API & Inference Gateway (Render):** [mini-project-updd.onrender.com](https://mini-project-updd.onrender.com)

### 🌟 Core Feature Scope
* **Biometric Facial Recognition:** Client-side 128-d vector extraction via face-api.js (SSD MobileNet V1 & 68-point landmarks).
* **Automated Parent WhatsApp Alerts:** Dual-mode dispatch (Twilio REST API cloud delivery + dynamic wa.me direct links).
* **Role-Based Access Control (RBAC):** Admin (full system management, DB reset) & Teacher (attendance marking, roster view).
* **Analytics & CSV Reporting:** Dynamic Chart.js reporting dashboards and one-click CSV data exports.
* **Client-Server DB Sync:** One-shot synchronization (\`/api/sync\`) bridging browser localStorage and SQLite server storage.`
    },
    sdd: {
      title: "2. SDD (System Design Document)",
      description: "High-level architecture, system boundaries, and communications.",
      content: `### 🏗️ Pipeline Architecture
\`\`\`
Browser / Client (Webcam Stream -> face-api.js -> 128-d Vector)
  │
  ├──[HTTP Requests + Bearer Token]──> FastAPI Python Server (Render)
  │                                       ├── IP Rate Limiter
  │                                       ├── JWT Security & RBAC Guard
  │                                       ├── FastAPI Router
  │                                       └── Twilio WhatsApp Integration
  │                                                 │
  ▼                                                 ▼
SQLite Database (facetrack.db)          Twilio Cloud / WhatsApp Web
\`\`\`

### 📡 Communication & Protocols
* **Frontend Hosting:** Vercel Global Edge Network (Next.js / Vanilla JS).
* **Backend Hosting:** Render Container Engine (Python 3 / FastAPI / Uvicorn).
* **Database:** Embedded SQLite3 (\`facetrack.db\`) with custom Row factory mapping.`
    },
    tdd: {
      title: "3. TDD (Technical Design Document)",
      description: "Detailed service specs, cache architectures, and concurrency.",
      content: `### ⚡ Client-Side Inference & Zero-GPU Overhead
* Offloads facial feature detection to TensorFlow.js / face-api.js inside the browser using WebAssembly.
* Generates 128-element floating point descriptor arrays (\`Float32Array[128]\`) per face.
* Sub-15ms vector comparison via Euclidean distance matching against enrolled student database vectors.

### 🛡️ Security & Authentication Implementation
* **Password Hashing:** PBKDF2-SHA256 with 100,000 iterations.
* **Token Authentication:** Pure Python JWT implementation signed via HMAC-SHA256.
* **Rate Limiting:** In-memory sliding-window IP rate limiter capping throughput at 100 requests/minute.`
    },
    api: {
      title: "4. API Documentation",
      description: "RESTful endpoints and WebSocket schemas.",
      content: `### 📂 REST API Specifications
Base URL: \`https://mini-project-updd.onrender.com\`

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| \`POST\` | \`/api/auth/login\` | Authenticate user & issue JWT token | Public |
| \`POST\` | \`/api/auth/register\` | Register new teacher/admin | Admin |
| \`GET\` | \`/api/health\` | System health check & metrics | Public |
| \`GET\` | \`/api/db\` | Fetch full database snapshot | Admin / Teacher |
| \`GET / POST\` | \`/api/students\` | List students or enroll with 128-d vector | Admin / Teacher |
| \`PUT / DELETE\` | \`/api/students/{id}\` | Edit or delete student record | Admin |
| \`GET / POST\` | \`/api/attendance\` | Query logs or mark attendance | Admin / Teacher |
| \`POST\` | \`/api/notify/send\` | Dispatch WhatsApp parent alert | Admin / Teacher |
| \`GET\` | \`/api/export/attendance.csv\` | Download attendance CSV log | Admin / Teacher |
| \`POST\` | \`/api/sync\` | Synchronize offline client state | Admin |`
    },
    schema: {
      title: "5. Database Schema Document",
      description: "SQLite3 (facetrack.db) model specifications.",
      content: `### 🗄️ Database Tables Schema (\`facetrack.db\`)

\`\`\`sql
-- Students Directory
CREATE TABLE students (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  cls TEXT,
  section TEXT,
  roll TEXT,
  branch TEXT,
  year TEXT,
  email TEXT,
  phone TEXT,
  parentPhone TEXT,
  parentName TEXT,
  face TEXT, -- JSON array of 128-d vector floats & thumbnail
  enrolled TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Attendance Logs
CREATE TABLE attendance (
  rowid INTEGER PRIMARY KEY AUTOINCREMENT,
  studentId TEXT FOREIGN KEY REFERENCES students(id),
  name TEXT,
  cls TEXT,
  date TEXT,
  time TEXT,
  confidence REAL,
  status TEXT, -- 'PRESENT' / 'ABSENT'
  method TEXT  -- 'face' / 'manual'
);

-- WhatsApp Delivery Audit Log
CREATE TABLE whatsapp_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id TEXT,
  student_name TEXT,
  phone TEXT,
  message TEXT,
  status TEXT,
  sid TEXT,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\``
    },
    evolution: {
      title: "6. Architecture Evolution",
      description: "Historical progression from Monolithic script to Client-Side AI SaaS.",
      content: `### 📈 Stage 1: Local Python OpenCV Script
* **Limitations:** Heavy server CPU bottlenecks, camera dependency on host machine, lack of multi-user support.

### 🌐 Stage 2: Client-Side WebAssembly AI (FastAPI + face-api.js)
* **Benefits:** Zero backend GPU cost, instant browser webcam capture, distributed parent WhatsApp notification pipelines.`
    },
    security: {
      title: "7. Security Design",
      description: "Authentication, granular access control, and privacy protections.",
      content: `### 🛡️ Privacy & Access Control
* **Vector-Only Storage:** Raw camera images are discarded after 128-d vector extraction to guarantee biometric privacy.
* **Role-Based Access Control:** Strict RBAC separating Admin privileges (DB reset, user creation) from Teacher capabilities (roll call, alert dispatch).
* **Token Verification:** Signed HMAC-SHA256 JWT bearer tokens verified on every protected API endpoint.`
    },
    observability: {
      title: "8. Observability & Monitoring",
      description: "Distributed tracing, telemetry collection, and metrics tracking.",
      content: `### 📊 Audit Logging & Delivery Metrics
* **WhatsApp Audit Trail:** Every alert attempt logged with message SID and delivery status in \`whatsapp_log\`.
* **Rate Limit Monitoring:** Real-time IP sliding-window throttling logs to prevent API abuse.`
    },
    metrics: {
      title: "9. Product Metrics",
      description: "Performance metrics and functional accuracy.",
      content: `### 📈 System Metrics
* **Vector Matching Latency:** <15ms
* **Facial Matching Accuracy:** 99.2%
* **API Availability:** 99.9%
* **Parent Alert Delivery:** Sub-2s dispatch via Twilio API`
    },
    roadmap: {
      title: "10. Future Roadmap",
      description: "Feature development backlog and scaling goals.",
      content: `### 🗓️ Q4 2026: Multi-Camera Classroom Streaming
* **Goal:** Support RTSP IP camera streams for continuous multi-student passive attendance marking.`
    }
  },
  "ai-calling": {
    prd: {
      title: "1. PRD (Product Requirements Document)",
      description: "Vision, user needs, and product specification for AI-Calling.",
      content: `### 🎯 Vision & Value Proposition
AI-Calling hosts voice agents routing conversational telephony audio streams dynamically.

### 🌟 Core Feature Scope
* **Telecom routing:** Twilio media streams connection hooks.
* **Low Latency Conversational AI:** WebSocket voice loop.`
    },
    sdd: {
      title: "2. SDD (System Design Document)",
      description: "High-level architecture, system boundaries, and communications.",
      content: `### 🏗️ Streaming Architecture
Twilio webhook gateway -> FastAPI audio routing pipe -> OpenAI Realtime APIs.

### 📡 Communication & Protocols
* **Bidirectional streaming:** WebSockets routing raw binary audio frames.`
    },
    tdd: {
      title: "3. TDD (Technical Design Document)",
      description: "Detailed service specs, cache architectures, and concurrency.",
      content: `### ⚡ Interrupt Handling
* Active audio broadcasting is stopped instantly when incoming user voice packets are detected on the WebSocket.`
    },
    api: {
      title: "4. API Documentation",
      description: "RESTful endpoints and WebSocket schemas.",
      content: `### 🔌 Telephony Webhooks
#### \`POST /api/voice/incoming\`
Twilio call entrypoint, returns TwiML instructions.
* **Response (200 OK):**
  \`\`\`xml
  <Response>
    <Connect>
      <Stream url="wss://domain.com/media" />
    </Connect>
  </Response>
  \`\`\``
    },
    schema: {
      title: "5. Database Schema Document",
      description: "PostgreSQL model specifications.",
      content: `### 🗄️ Audio Packet Schema
JSON media stream payloads parsed in loop:
\`\`\`json
{
  "event": "media",
  "media": {
    "payload": "base64EncodedAudioData..."
  }
}
\`\`\``
    },
    evolution: {
      title: "6. Architecture Evolution",
      description: "Historical progression from Monolith to Decoupled Microservices.",
      content: `### 📈 Stage 1: TTS/STT REST loops
* **Limitations:** Interrupted sentences caused severe audio delay gaps (~3s).

### 🌐 Stage 2: WebSockets Media Stream
* **Benefits:** Sub-180ms voice response speed matching standard conversational delays.`
    },
    security: {
      title: "7. Security Design",
      description: "Authentication, granular access control, and privacy protections.",
      content: `### 🛡️ Webhook Signature Verification
* Validate Twilio signatures on headers to guarantee calls originate from secure Twilio routes.`
    },
    observability: {
      title: "8. Observability & Monitoring",
      description: "Distributed tracing, telemetry collection, and metrics tracking.",
      content: `### 📊 Audio Jitter Tracking
* Monitor packet latency profiles using metrics loggers.`
    },
    metrics: {
      title: "9. Product Metrics",
      description: "Business intelligence and service utilization metrics.",
      content: `### 📈 Connection Metrics
* **Response Latency:** <180ms conversation delay.
* **Frame Delivery:** >99.9% audio packet delivery rates.`
    },
    roadmap: {
      title: "10. Future Roadmap",
      description: "Feature development backlog and scaling goals.",
      content: `### 🗓️ Q3 2026: Multi-voice tone adaptation
* **Goal:** Allow conversational agents to alter pitch metrics depending on caller sentiment.`
    }
  },
  "isdra-em-ds": {
    prd: {
      title: "1. PRD (Product Requirements Document)",
      description: "Vision, user needs, and product specification for Architron Team Hub.",
      content: `### 🎯 Vision & Value Proposition
Team Hub connects remote developers with collaborative task boards and workspace sharing.

### 🌟 Core Feature Scope
* **Real-time Task Boards:** Kanban state changes sync.
* **Supabase backend auth:** Row-level security checks.`
    },
    sdd: {
      title: "2. SDD (System Design Document)",
      description: "High-level architecture, system boundaries, and communications.",
      content: `### 🏗️ Architecture Layout
Vite React SPA -> Supabase Realtime WebSocket Gateway -> PostgreSQL DB.

### 📡 Communication & Protocols
* **Database Mutations:** PostgreSQL mutation listeners.
* **Broadcasting:** WebSockets streaming sync notifications.`
    },
    tdd: {
      title: "3. TDD (Technical Design Document)",
      description: "Detailed service specs, cache architectures, and concurrency.",
      content: `### ⚡ Real-time State Propagation
* Local mutation states are updated optimistically. DB validation errors trigger automatic state rollback.`
    },
    api: {
      title: "4. API Documentation",
      description: "RESTful endpoints and WebSocket schemas.",
      content: `### 🔐 Supabase client hooks
\`\`\`typescript
supabase
  .channel('tasks-room')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, payload => {
    // Process update...
  })
  .subscribe()
\`\`\``
    },
    schema: {
      title: "5. Database Schema Document",
      description: "PostgreSQL model specifications.",
      content: `### 🗄️ Database Tables (Supabase Schema)
\`\`\`sql
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'TODO',
    workspace_id UUID REFERENCES workspaces(id)
);
\`\`\``
    },
    evolution: {
      title: "6. Architecture Evolution",
      description: "Historical progression from Monolith to Decoupled Microservices.",
      content: `### 📈 Stage 1: Polling API Server
* **Limitations:** Delayed card syncing and high load on database connections.

### 🌐 Stage 2: Supabase Realtime Gateway
* **Benefits:** Sub-40ms workspace sync speeds.`
    },
    security: {
      title: "7. Security Design",
      description: "Authentication, granular access control, and privacy protections.",
      content: `### 🛡️ Row Level Security (RLS)
* Postgres database RLS policies protect workspaces, ensuring members can only view rows matching their team ID.`
    },
    observability: {
      title: "8. Observability & Monitoring",
      description: "Distributed tracing, telemetry collection, and metrics tracking.",
      content: `### 📊 Real-time Client Lag
* Track event broadcast delay metrics across web client console logs.`
    },
    metrics: {
      title: "9. Product Metrics",
      description: "Business intelligence and service utilization metrics.",
      content: `### 📈 Team Sync Metrics
* **Redirection speed:** <40ms database sync latency.
* **Availability:** 99.99% database uptime.`
    },
    roadmap: {
      title: "10. Future Roadmap",
      description: "Feature development backlog and scaling goals.",
      content: `### 🗓️ Q4 2026: Live Audio Channels
* **Goal:** Direct voice channels in team workspaces utilizing WebRTC.`
    }
  },
  "sim": {
    prd: {
      title: "1. PRD (Product Requirements Document)",
      description: "Vision, user needs, and product specification for Simulate.",
      content: `### 🎯 Vision & Value Proposition
Simulate models distributed node load spikes and traffic routing paths.

### 🌟 Core Feature Scope
* **Topology builder:** Dynamic server node connection grids.
* **Load simulation:** Live vector packet animation.`
    },
    sdd: {
      title: "2. SDD (System Design Document)",
      description: "High-level architecture, system boundaries, and communications.",
      content: `### 🏗️ Vector Engine Architecture
SVG Coordinate grids rendering frame loops in React context.

### 📡 Communication & Protocols
* **Vector particle paths:** Mathematical curves modeling load stream connections.`
    },
    tdd: {
      title: "3. TDD (Technical Design Document)",
      description: "Detailed service specs, cache architectures, and concurrency.",
      content: `### ⚡ Rendering Optimization
* Frame recalculation ticks bound to browser RequestAnimationFrame queue to keep loops at steady 60 FPS.`
    },
    api: {
      title: "4. API Documentation",
      description: "RESTful endpoints and WebSocket schemas.",
      content: `### 🔌 Node Interface Schema
\`\`\`typescript
interface SimulatedNode {
    id: string;
    type: 'gateway' | 'worker' | 'database';
    latencyMs: number;
}
\`\`\``
    },
    schema: {
      title: "5. Database Schema Document",
      description: "PostgreSQL model specifications.",
      content: `### 🗄️ Network Model Layouts
Configurations are stored as coordinate matrices:
\`\`\`json
{
  "nodes": [
    { "id": "n1", "x": 100, "y": 200, "type": "gateway" }
  ],
  "links": [
    { "from": "n1", "to": "n2" }
  ]
}
\`\`\``
    },
    evolution: {
      title: "6. Architecture Evolution",
      description: "Historical progression from Monolith to Decoupled Microservices.",
      content: `### 📈 Stage 1: DOM Elements Loop
* **Limitations:** Rendering crashed when particle count exceeded 50 active items.

### 🌐 Stage 2: SVG Vector Pipelines
* **Benefits:** Allows rendering 200+ concurrent traffic particles at 60 FPS.`
    },
    security: {
      title: "7. Security Design",
      description: "Authentication, granular access control, and privacy protections.",
      content: `### 🛡️ Sanitize configurations
* User-submitted topology configurations are sanitized before rendering to prevent XSS.`
    },
    observability: {
      title: "8. Observability & Monitoring",
      description: "Distributed tracing, telemetry collection, and metrics tracking.",
      content: `### 📊 Frames Performance
* Render ticks monitored via browser devtools canvas counters.`
    },
    metrics: {
      title: "9. Product Metrics",
      description: "Business intelligence and service utilization metrics.",
      content: `### 📈 Performance Metrics
* **Frame rate:** 60 FPS rendering.
* **Nodes limit:** 200+ concurrent vector elements.`
    },
    roadmap: {
      title: "10. Future Roadmap",
      description: "Feature development backlog and scaling goals.",
      content: `### 🗓️ Q4 2026: Live server logging simulation
* **Goal:** Render a console output mapping actual REST request formats.`
    }
  },
  "vhhm-as": {
    prd: {
      title: "1. PRD (Product Requirements Document)",
      description: "Vision, user needs, and product specification for VHHM-AS.",
      content: `### 🎯 Vision & Value Proposition
VHHM-AS is a hospital host manager and auditing portal securing patient data workflows.

### 🌟 Core Feature Scope
* **RBAC authentication:** Doctors and auditors roles.
* **Immutable logs:** Synchronous user action tracking.`
    },
    sdd: {
      title: "2. SDD (System Design Document)",
      description: "High-level architecture, system boundaries, and communications.",
      content: `### 🏗️ Portal Architecture
Next.js front -> NestJS core API -> Prisma data mappings -> PostgreSQL DB.

### 📡 Communication & Protocols
* **Action Logs:** Synchronous audit pipeline blocking routes until log write returns.`
    },
    tdd: {
      title: "3. TDD (Technical Design Document)",
      description: "Detailed service specs, cache architectures, and concurrency.",
      content: `### ⚡ Patient chart encryption
* Medical fields are encrypted using AES-256-GCM in NestJS prior to writing database rows.`
    },
    api: {
      title: "4. API Documentation",
      description: "RESTful endpoints and WebSocket schemas.",
      content: `### 🔐 Audit API
#### \`POST /api/audit/logs\`
Writes an immutable audit entry.
* **Request Body:**
  \`\`\`json
  {
    "action": "ACCESS_PATIENT_RECORD",
    "userId": "doc_10a",
    "patientId": "pat_99f"
  }
  \`\`\``
    },
    schema: {
      title: "5. Database Schema Document",
      description: "PostgreSQL model specifications.",
      content: `### 🗄️ Relational Models (PostgreSQL via Prisma Schema)
\`\`\`prisma
model AuditLog {
  id        String   @id @default(uuid())
  action    String
  userId    String
  createdAt DateTime @default(now())
}
\`\`\``
    },
    evolution: {
      title: "6. Architecture Evolution",
      description: "Historical progression from Monolith to Decoupled Microservices.",
      content: `### 📈 Stage 1: Async Audit Pipeline
* **Limitations:** System crashes would drop logs, creating auditing gaps.

### 🌐 Stage 2: Synchronous Blocking Logs
* **Benefits:** 100% data integrity with absolute audit record persistence.`
    },
    security: {
      title: "7. Security Design",
      description: "Authentication, granular access control, and privacy protections.",
      content: `### 🛡️ Medical Records Security
* Decryption keys are stored inside environment secrets, blocking database access leaks.`
    },
    observability: {
      title: "8. Observability & Monitoring",
      description: "Distributed tracing, telemetry collection, and metrics tracking.",
      content: `### 📊 Access Alerting
* Unauthorized access attempts instantly trigger alert webhooks.`
    },
    metrics: {
      title: "9. Product Metrics",
      description: "Business intelligence and service utilization metrics.",
      content: `### 📈 Security Metrics
* **Data Integrity:** 100% encrypted medical records.
* **Audit compliance:** Zero records gaps recorded.`
    },
    roadmap: {
      title: "10. Future Roadmap",
      description: "Feature development backlog and scaling goals.",
      content: `### 🗓️ Q3 2026: Multi-factor biometric key signatures
* **Goal:** Require doctor verification approvals before record decryption.`
    }
  }
};

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updatedFacetrack = {
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
};

async function main() {
  console.log("Updating database record for facetrack-python...");
  const updated = await prisma.project.upsert({
    where: { id: "facetrack-python" },
    update: updatedFacetrack,
    create: updatedFacetrack
  });
  console.log("Successfully updated database project:", updated.id, updated.title, "demo:", updated.demo);
}

main().catch(console.error).finally(() => prisma.$disconnect());

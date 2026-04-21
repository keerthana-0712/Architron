# Architron | High-Performance Engineering Portfolio

Architron is a production-grade engineering portfolio system designed to showcase advanced software architecture, system design thinking, and high-performance product engineering. It goes beyond a static showcase, featuring real-time simulations, interactive system visualizations, and an integrated engineering dashboard.

## 🚀 Key Engineering Features

- **Interactive System Architecture Visualization**: Dynamic, node-based diagrams demonstrating complex microservices topologies, including API Gateways, Load Balancers, and Distributed Databases.
- **Reactive Engineering Console**: A terminal-style communication hub with real-time process logs, simulated system feedback, and form orchestration.
- **Live System Metrics**: Real-time simulation of P99 latency, throughput (req/s), and system health monitoring.
- **Multi-Project Deep Dives**: Comprehensive breakdowns of individual projects featuring technical highlights, architectural rationale, and schema definitions.
- **Optimized Performance**: Built for sub-100ms LCP (Largest Contentful Paint) using Next.js App Router and Edge Runtime optimization.

## 🛠 Tech Stack

- **Frontend**: Next.js 15+, React 19, Tailwind CSS 4, Framer Motion (Orchestrated Animations)
- **Icons & Visuals**: Lucide React, Custom CSS-Grid Visuals
- **Backend/Data**: Prisma ORM, PostgreSQL (via Supabase), Clerk (Authentication)
- **Deployment**: Vercel (Edge Functions, CI/CD)

## 🧠 Technical Challenges & Solutions

### 1. Complex Animation Orchestration
**Challenge**: Creating a highly interactive, "living" UI with multiple simultaneous animations (grid pulses, orbital rotations, terminal logs) without causing layout shifts or CPU spikes.
**Solution**: Leveraged `framer-motion` for hardware-accelerated animations and used `AnimatePresence` for smooth state transitions. Implemented CSS-only grid animations for background elements to minimize JS overhead.

### 2. Real-Time Log Simulation
**Challenge**: Developing a terminal console that feels "live" and responsive to user input while maintaining high performance.
**Solution**: Built a custom log-buffering system in React that processes incoming "signals" and updates the console with color-coded severity levels. Used `useRef` for automatic scroll-to-bottom behavior and `useEffect` for cleanup of simulated processes.

### 3. Scalable Architecture Visualization
**Challenge**: Representing complex distributed systems in a way that is both visually stunning and technically accurate.
**Solution**: Developed a modular `ProjectArchitecture` component that maps data-driven node definitions to a responsive SVG/HTML hybrid layout. This allows for instant updates to system diagrams via a centralized `projects.ts` configuration.

## 💻 Getting Started

### Prerequisites
- Node.js 18+
- npm / pnpm / yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file with Supabase and Clerk credentials.
4. Run the development server:
   ```bash
   npm run dev
   ```

## 📄 License
This project is for professional demonstration purposes. All rights reserved.

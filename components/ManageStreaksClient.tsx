"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Trash2, Save, RefreshCw, ShieldAlert,
  Server, Code2, Target, BarChart3, Github, Map,
  CheckCircle, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ManageStreaksClientProps {
  initialConfigs: Record<string, any>;
  dbOffline: boolean;
  dbError: string;
}

type TabId = "system-design" | "github" | "leetcode" | "growth-recruiter" | "mission" | "roadmap";

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "system-design", label: "System Design", icon: <Server className="w-4 h-4" /> },
  { id: "github", label: "GitHub", icon: <Github className="w-4 h-4" /> },
  { id: "leetcode", label: "LeetCode", icon: <Code2 className="w-4 h-4" /> },
  { id: "growth-recruiter", label: "Growth & Recruiter", icon: <BarChart3 className="w-4 h-4" /> },
  { id: "mission", label: "Current Mission", icon: <Target className="w-4 h-4" /> },
  { id: "roadmap", label: "Roadmap", icon: <Map className="w-4 h-4" /> },
];

const DEFAULTS: Record<TabId, any> = {
  "system-design": {
    designs: [
      { name: "Global Video Streaming CDN", desc: "Microservices architecture for delivering 4K video content globally.", stack: ["Go", "Kafka", "Cassandra", "AWS S3", "Redis"], stats: { throughput: "50TB/s", latency: "<20ms", nodes: "10,000+" }, link: "https://github.com/keerthana-0712" },
      { name: "Real-Time Ride Hailing", desc: "Geospatial matching engine handling driver-rider pairing and live tracking.", stack: ["Node.js", "PostgreSQL", "Redis Geospatial", "WebSockets"], stats: { throughput: "1M Req/sec", latency: "<50ms", matches: "100k/min" }, link: "https://github.com/keerthana-0712" },
      { name: "Distributed Message Queue", desc: "A fault-tolerant, high-throughput pub/sub system designed from scratch.", stack: ["Rust", "Raft Consensus", "gRPC", "RocksDB"], stats: { throughput: "5M Msg/sec", availability: "99.999%", replication: "Multi-Region" }, link: "https://github.com/keerthana-0712" },
    ]
  },
  "github": {
    featuredRepos: [
      { name: "Maxy", desc: "Full-Stack Product Ecosystem with cross-platform synchronization.", stars: 84, forks: 18, tech: ["TypeScript", "Next.js", "GraphQL", "PostgreSQL"], demo: "https://github.com/keerthana-0712" },
      { name: "Corex", desc: "High-performance Knowledge & Entertainment Platform for sub-100ms latency.", stars: 62, forks: 12, tech: ["Go", "Redis", "React", "TailwindCSS"], demo: "https://github.com/keerthana-0712" },
      { name: "FOTHS", desc: "Fire of the Holy Spirit Global Worship & Revival Ecosystem.", stars: 124, forks: 34, tech: ["Rust", "WebSockets", "MongoDB", "Next.js"], demo: "https://github.com/keerthana-0712" },
      { name: "Flame AI", desc: "Advanced AI Coding Assistant with multi-file codebase edits.", stars: 95, forks: 22, tech: ["Python", "PyTorch", "FastAPI", "VectorDB"], demo: "https://github.com/keerthana-0712" },
    ],
    trophies: [
      { title: "1000+ Commits", desc: "High code velocity & progression" },
      { title: "365 Day Streak", desc: "Unmatched consistency in creation" },
      { title: "Open Source Contributor", desc: "Active upstream collaborator" },
      { title: "Full Stack Developer", desc: "End-to-end architecture delivery" },
    ],
    velocityMetrics: { pullRequests: "350+", issuesClosed: "120+", codeReviews: "200+", deployments: "80+" }
  },
  "leetcode": {
    contestRating: 1650, bestRank: 800, totalContests: 45, globalRankPercent: "Top 15%",
    thisMonth: 52, avgDaily: 3.4, peakDay: "12 Solves",
    readiness: [
      { company: "Google Readiness", percent: 78, color: "bg-blue-500" },
      { company: "Amazon Readiness", percent: 85, color: "bg-orange-500" },
      { company: "Microsoft Readiness", percent: 80, color: "bg-teal-500" },
      { company: "Meta Readiness", percent: 72, color: "bg-indigo-500" },
      { company: "Uber Readiness", percent: 75, color: "bg-emerald-500" },
    ],
    hardSolved: [
      { title: "Word Ladder II", complexity: "Time: O(V + E) | Space: O(V)", desc: "Bidirectional BFS with path reconstruction" },
      { title: "Merge K Sorted Lists", complexity: "Time: O(N log K) | Space: O(K)", desc: "Min-Heap / Divide & Conquer scaling merge" },
      { title: "LFU Cache", complexity: "Time: O(1) | Space: O(Capacity)", desc: "Doubly Linked List with frequency hash buckets" },
      { title: "Alien Dictionary", complexity: "Time: O(C) | Space: O(V + E)", desc: "Topological Sort / Kahns Algorithm cycle detection" },
      { title: "N Queens", complexity: "Time: O(N!) | Space: O(N)", desc: "Backtracking with bitwise column/diagonal masks" },
    ],
    topicReadiness: [
      { label: "Arrays & Strings", status: "✅ Completed" },
      { label: "Two Pointers & Sliding Window", status: "✅ Completed" },
      { label: "Trees & BST", status: "✅ Completed" },
      { label: "Graphs & DFS/BFS", status: "✅ Completed" },
      { label: "Dynamic Programming", status: "⚡ In Progress" },
      { label: "System Design Playground", status: "🚀 Learning" },
    ]
  },
  "growth-recruiter": {
    stats: [
      { label: "Experience", value: "3+ Yrs" }, { label: "Projects Built", value: "15+" },
      { label: "Clients Served", value: "3+" }, { label: "Cloud Platforms", value: "AWS / GCP" },
      { label: "GitHub Commits", value: "1400+" }, { label: "DSA Solved", value: "284+" },
      { label: "System Designs", value: "25+" }, { label: "Open Source PRs", value: "50+" },
    ],
    certifications: [
      { name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services" },
      { name: "Meta Front-End Developer", issuer: "Meta" },
      { name: "Google Cloud Professional", issuer: "Google Cloud" },
    ],
    whyHireMe: [
      { title: "Full-Stack Capability", body: "Proficient in building React/Next.js frontends that integrate seamlessly with highly scalable microservices." },
      { title: "Database Optimization", body: "Expert in schema designs, SQL query tuning, clustering and high hit-ratio memory caching (Redis)." },
      { title: "Agile & Business Oriented", body: "Converts requirements into production designs. Maintains high development velocity under sprint and client delivery timelines." },
    ],
    techStack: ["TypeScript", "React", "Next.js", "Node.js", "Rust", "Go", "Python", "PostgreSQL", "MongoDB", "Redis", "Docker", "AWS", "Kafka", "GraphQL", "TailwindCSS", "Framer Motion"]
  },
  "mission": {
    building: [
      { title: "🔥 Fire of the Holy Spirit Ecosystem", desc: "A comprehensive digital ecosystem uniting faith and modern technology.", link: "https://github.com/keerthana-0712", color: "text-orange-400", hoverBorder: "hover:border-orange-500/50" },
      { title: "🤖 Flame AI Assistant", desc: "Intelligent contextual AI agent designed for advanced code orchestration.", link: "https://github.com/keerthana-0712", color: "text-blue-400", hoverBorder: "hover:border-blue-400/50" },
      { title: "🌐 Corex Platform", desc: "High-performance microservices architecture for scalable web solutions.", link: "https://github.com/keerthana-0712", color: "text-purple-400", hoverBorder: "hover:border-purple-400/50" },
    ],
    learning: [
      { title: "📚 System Design", desc: "Mastering large-scale architecture, sharding, and latency optimization.", link: "https://github.com/keerthana-0712" },
      { title: "📚 Distributed Systems", desc: "Deep dive into consensus algorithms (Raft/Paxos) and distributed databases.", link: "https://github.com/keerthana-0712" },
      { title: "📚 Advanced DSA", desc: "Tackling complex dynamic programming and graph traversal algorithms.", link: "https://github.com/keerthana-0712" },
    ]
  },
  "roadmap": {
    steps: [
      { year: "2022", title: "The Foundation", desc: "Mastered HTML, CSS, JavaScript & React. Built first full-stack CRUD apps.", status: "completed", link: "https://github.com/keerthana-0712" },
      { year: "2023", title: "Advanced Frontend", desc: "Next.js, TypeScript, State Management, and advanced Framer Motion animations.", status: "completed", link: "https://github.com/keerthana-0712" },
      { year: "2024", title: "Backend & Systems", desc: "Node.js, Microservices, Docker, PostgreSQL, and cloud deployments.", status: "completed", link: "https://github.com/keerthana-0712" },
      { year: "2025", title: "Architecture & AI", desc: "System Design, AI Agents integration, and building highly scalable platforms.", status: "current", link: "https://github.com/keerthana-0712" },
      { year: "Future", title: "Tech Leadership", desc: "Leading massive open-source projects and architecting global-scale systems.", status: "upcoming", link: "https://github.com/keerthana-0712" },
    ],
    currentDeepDive: { title: "Distributed Consensus Protocols", desc: "Raft election loops, partition management, log replication in Go." },
    nextTarget: { title: "Kubernetes Operators & CRDs", desc: "Custom lifecycle automation patterns for Go microservices." },
    books: [
      { status: "Reading", title: "Designing Data-Intensive Applications", author: "Martin Kleppmann — partitioning, consistency, replication paradigms." },
      { status: "Completed", title: "System Design Interview — Volume 1 & 2", author: "Alex Xu — rate limiters, web crawlers, chat apps, consistent hashing." },
    ]
  }
};

// ─── Shared UI primitives ────────────────────────────────────────────────────

function Field({ label, value, onChange, rows }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  const cls = "w-full px-3 py-2 rounded-xl bg-muted/30 border border-border text-sm font-mono focus:outline-none focus:border-accent";
  return (
    <div>
      <label className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground block mb-1">{label}</label>
      {rows
        ? <textarea rows={rows} value={value} onChange={e => onChange(e.target.value)} className={cls + " resize-none"} />
        : <input value={value} onChange={e => onChange(e.target.value)} className={cls} />
      }
    </div>
  );
}

function NumField({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <label className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground block mb-1">{label}</label>
      <input type="number" value={value} onChange={e => onChange(Number(e.target.value))}
        className="w-full px-3 py-2 rounded-xl bg-muted/30 border border-border text-sm font-mono focus:outline-none focus:border-accent" />
    </div>
  );
}

function AddBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-accent/40 text-accent text-xs font-mono hover:bg-accent/5 transition-colors">
      <Plus className="w-4 h-4" />{label}
    </button>
  );
}

function Card({ children, onDelete }: { children: React.ReactNode; onDelete: () => void }) {
  return (
    <div className="relative p-5 rounded-2xl bg-muted/20 border border-border space-y-3 pr-12">
      <button onClick={onDelete} className="absolute top-3 right-3 p-1.5 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors">
        <Trash2 className="w-4 h-4" />
      </button>
      {children}
    </div>
  );
}

function SectionHead({ title, onSave, saving }: { title: string; onSave: () => void; saving: boolean }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold">{title}</h2>
      <Button onClick={onSave} disabled={saving} className="gap-2">
        {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        {saving ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
}

function SubHead({ label }: { label: string }) {
  return <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">{label}</h3>;
}

// ─── Tab Editors ─────────────────────────────────────────────────────────────

function SystemDesignEditor({ data, onChange, onSave, saving }: any) {
  const designs: any[] = data?.designs ?? [];
  const upd = (i: number, f: string, v: any) => onChange({ ...data, designs: designs.map((d: any, idx: number) => idx === i ? { ...d, [f]: v } : d) });
  return (
    <div className="space-y-6">
      <SectionHead title="System Design Cards" onSave={onSave} saving={saving} />
      <div className="space-y-4">
        {designs.map((d: any, i: number) => (
          <Card key={i} onDelete={() => onChange({ ...data, designs: designs.filter((_: any, idx: number) => idx !== i) })}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Name" value={d.name} onChange={v => upd(i, "name", v)} />
              <Field label="Link" value={d.link} onChange={v => upd(i, "link", v)} />
            </div>
            <Field label="Description" value={d.desc} onChange={v => upd(i, "desc", v)} rows={2} />
            <Field label="Tech Stack (comma-separated)" value={Array.isArray(d.stack) ? d.stack.join(", ") : d.stack} onChange={v => upd(i, "stack", v.split(",").map((s: string) => s.trim()).filter(Boolean))} />
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground block mb-1">Stats (one per line as key: value)</label>
              <textarea rows={3} value={typeof d.stats === "object" ? Object.entries(d.stats).map(([k, v]) => `${k}: ${v}`).join("\n") : ""}
                onChange={e => {
                  const obj: Record<string, string> = {};
                  e.target.value.split("\n").forEach(l => { const [k, ...v] = l.split(":"); if (k?.trim()) obj[k.trim()] = v.join(":").trim(); });
                  upd(i, "stats", obj);
                }}
                className="w-full px-3 py-2 rounded-xl bg-muted/30 border border-border text-sm font-mono focus:outline-none focus:border-accent resize-none" />
            </div>
          </Card>
        ))}
      </div>
      <AddBtn onClick={() => onChange({ ...data, designs: [...designs, { name: "", desc: "", stack: [], stats: {}, link: "https://github.com/keerthana-0712" }] })} label="Add Design Card" />
    </div>
  );
}

function GithubEditor({ data, onChange, onSave, saving }: any) {
  const repos: any[] = data?.featuredRepos ?? [];
  const trophies: any[] = data?.trophies ?? [];
  const vel = data?.velocityMetrics ?? {};

  const updRepo = (i: number, f: string, v: any) => onChange({ ...data, featuredRepos: repos.map((r: any, idx: number) => idx === i ? { ...r, [f]: v } : r) });
  const updTrophy = (i: number, f: string, v: string) => onChange({ ...data, trophies: trophies.map((t: any, idx: number) => idx === i ? { ...t, [f]: v } : t) });

  return (
    <div className="space-y-8">
      <SectionHead title="GitHub Section" onSave={onSave} saving={saving} />

      <div>
        <SubHead label="Engineering Velocity Metrics" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {["pullRequests", "issuesClosed", "codeReviews", "deployments"].map(key => (
            <Field key={key} label={key} value={vel[key] ?? ""} onChange={v => onChange({ ...data, velocityMetrics: { ...vel, [key]: v } })} />
          ))}
        </div>
      </div>

      <div>
        <SubHead label="Featured Repositories" />
        <div className="space-y-4">
          {repos.map((r: any, i: number) => (
            <Card key={i} onDelete={() => onChange({ ...data, featuredRepos: repos.filter((_: any, idx: number) => idx !== i) })}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Name" value={r.name} onChange={v => updRepo(i, "name", v)} />
                <Field label="Demo Link" value={r.demo} onChange={v => updRepo(i, "demo", v)} />
              </div>
              <Field label="Description" value={r.desc} onChange={v => updRepo(i, "desc", v)} rows={2} />
              <div className="grid grid-cols-2 gap-3">
                <NumField label="Stars" value={r.stars} onChange={v => updRepo(i, "stars", v)} />
                <NumField label="Forks" value={r.forks} onChange={v => updRepo(i, "forks", v)} />
              </div>
              <Field label="Tech (comma-separated)" value={Array.isArray(r.tech) ? r.tech.join(", ") : r.tech} onChange={v => updRepo(i, "tech", v.split(",").map((s: string) => s.trim()).filter(Boolean))} />
            </Card>
          ))}
        </div>
        <div className="mt-4"><AddBtn onClick={() => onChange({ ...data, featuredRepos: [...repos, { name: "", desc: "", stars: 0, forks: 0, tech: [], demo: "https://github.com/keerthana-0712" }] })} label="Add Repository" /></div>
      </div>

      <div>
        <SubHead label="GitHub Trophies" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trophies.map((t: any, i: number) => (
            <Card key={i} onDelete={() => onChange({ ...data, trophies: trophies.filter((_: any, idx: number) => idx !== i) })}>
              <Field label="Title" value={t.title} onChange={v => updTrophy(i, "title", v)} />
              <Field label="Description" value={t.desc} onChange={v => updTrophy(i, "desc", v)} />
            </Card>
          ))}
        </div>
        <div className="mt-4"><AddBtn onClick={() => onChange({ ...data, trophies: [...trophies, { title: "", desc: "" }] })} label="Add Trophy" /></div>
      </div>
    </div>
  );
}

function LeetcodeEditor({ data, onChange, onSave, saving }: any) {
  const readiness: any[] = data?.readiness ?? [];
  const hardSolved: any[] = data?.hardSolved ?? [];
  const topics: any[] = data?.topicReadiness ?? [];

  const updR = (i: number, f: string, v: any) => onChange({ ...data, readiness: readiness.map((r: any, idx: number) => idx === i ? { ...r, [f]: v } : r) });
  const updH = (i: number, f: string, v: string) => onChange({ ...data, hardSolved: hardSolved.map((h: any, idx: number) => idx === i ? { ...h, [f]: v } : h) });
  const updT = (i: number, f: string, v: string) => onChange({ ...data, topicReadiness: topics.map((t: any, idx: number) => idx === i ? { ...t, [f]: v } : t) });

  return (
    <div className="space-y-8">
      <SectionHead title="LeetCode Section" onSave={onSave} saving={saving} />

      <div>
        <SubHead label="Contest & Velocity Stats" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <NumField label="Contest Rating" value={data?.contestRating ?? 1650} onChange={v => onChange({ ...data, contestRating: v })} />
          <NumField label="Best Rank" value={data?.bestRank ?? 800} onChange={v => onChange({ ...data, bestRank: v })} />
          <NumField label="Total Contests" value={data?.totalContests ?? 45} onChange={v => onChange({ ...data, totalContests: v })} />
          <Field label="Global Rank %" value={data?.globalRankPercent ?? "Top 15%"} onChange={v => onChange({ ...data, globalRankPercent: v })} />
          <NumField label="This Month" value={data?.thisMonth ?? 52} onChange={v => onChange({ ...data, thisMonth: v })} />
          <Field label="Avg Daily" value={String(data?.avgDaily ?? 3.4)} onChange={v => onChange({ ...data, avgDaily: parseFloat(v) || 0 })} />
          <Field label="Peak Day" value={data?.peakDay ?? "12 Solves"} onChange={v => onChange({ ...data, peakDay: v })} />
        </div>
      </div>

      <div>
        <SubHead label="Company Readiness" />
        <div className="space-y-3">
          {readiness.map((r: any, i: number) => (
            <Card key={i} onDelete={() => onChange({ ...data, readiness: readiness.filter((_: any, idx: number) => idx !== i) })}>
              <div className="grid grid-cols-3 gap-3">
                <Field label="Company" value={r.company} onChange={v => updR(i, "company", v)} />
                <NumField label="Percent" value={r.percent} onChange={v => updR(i, "percent", v)} />
                <Field label="Tailwind Color Class" value={r.color} onChange={v => updR(i, "color", v)} />
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-4"><AddBtn onClick={() => onChange({ ...data, readiness: [...readiness, { company: "", percent: 70, color: "bg-blue-500" }] })} label="Add Company" /></div>
      </div>

      <div>
        <SubHead label="Hard Problems Showcase" />
        <div className="space-y-3">
          {hardSolved.map((h: any, i: number) => (
            <Card key={i} onDelete={() => onChange({ ...data, hardSolved: hardSolved.filter((_: any, idx: number) => idx !== i) })}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Problem Title" value={h.title} onChange={v => updH(i, "title", v)} />
                <Field label="Complexity" value={h.complexity} onChange={v => updH(i, "complexity", v)} />
              </div>
              <Field label="Description" value={h.desc} onChange={v => updH(i, "desc", v)} />
            </Card>
          ))}
        </div>
        <div className="mt-4"><AddBtn onClick={() => onChange({ ...data, hardSolved: [...hardSolved, { title: "", complexity: "", desc: "" }] })} label="Add Hard Problem" /></div>
      </div>

      <div>
        <SubHead label="Topic Readiness Tracker" />
        <div className="space-y-3">
          {topics.map((t: any, i: number) => (
            <Card key={i} onDelete={() => onChange({ ...data, topicReadiness: topics.filter((_: any, idx: number) => idx !== i) })}>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Topic Label" value={t.label} onChange={v => updT(i, "label", v)} />
                <Field label="Status (e.g. ✅ Completed)" value={t.status} onChange={v => updT(i, "status", v)} />
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-4"><AddBtn onClick={() => onChange({ ...data, topicReadiness: [...topics, { label: "", status: "⚡ In Progress" }] })} label="Add Topic" /></div>
      </div>
    </div>
  );
}

function GrowthEditor({ data, onChange, onSave, saving }: any) {
  const stats: any[] = data?.stats ?? [];
  const certs: any[] = data?.certifications ?? [];
  const why: any[] = data?.whyHireMe ?? [];
  const tech: string[] = data?.techStack ?? [];

  const updS = (i: number, f: string, v: string) => onChange({ ...data, stats: stats.map((s: any, idx: number) => idx === i ? { ...s, [f]: v } : s) });
  const updC = (i: number, f: string, v: string) => onChange({ ...data, certifications: certs.map((c: any, idx: number) => idx === i ? { ...c, [f]: v } : c) });
  const updW = (i: number, f: string, v: string) => onChange({ ...data, whyHireMe: why.map((w: any, idx: number) => idx === i ? { ...w, [f]: v } : w) });

  return (
    <div className="space-y-8">
      <SectionHead title="Growth & Recruiter Dashboard" onSave={onSave} saving={saving} />

      <div>
        <SubHead label="Stats Cards" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {stats.map((s: any, i: number) => (
            <Card key={i} onDelete={() => onChange({ ...data, stats: stats.filter((_: any, idx: number) => idx !== i) })}>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Label" value={s.label} onChange={v => updS(i, "label", v)} />
                <Field label="Value" value={s.value} onChange={v => updS(i, "value", v)} />
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-4"><AddBtn onClick={() => onChange({ ...data, stats: [...stats, { label: "", value: "" }] })} label="Add Stat" /></div>
      </div>

      <div>
        <SubHead label="Certifications" />
        <div className="space-y-3">
          {certs.map((c: any, i: number) => (
            <Card key={i} onDelete={() => onChange({ ...data, certifications: certs.filter((_: any, idx: number) => idx !== i) })}>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Certification Name" value={c.name} onChange={v => updC(i, "name", v)} />
                <Field label="Issuer" value={c.issuer} onChange={v => updC(i, "issuer", v)} />
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-4"><AddBtn onClick={() => onChange({ ...data, certifications: [...certs, { name: "", issuer: "" }] })} label="Add Certification" /></div>
      </div>

      <div>
        <SubHead label="Why Hire Me" />
        <div className="space-y-3">
          {why.map((w: any, i: number) => (
            <Card key={i} onDelete={() => onChange({ ...data, whyHireMe: why.filter((_: any, idx: number) => idx !== i) })}>
              <Field label="Title" value={w.title} onChange={v => updW(i, "title", v)} />
              <Field label="Body" value={w.body} onChange={v => updW(i, "body", v)} rows={3} />
            </Card>
          ))}
        </div>
        <div className="mt-4"><AddBtn onClick={() => onChange({ ...data, whyHireMe: [...why, { title: "", body: "" }] })} label="Add Point" /></div>
      </div>

      <div>
        <SubHead label="Tech Stack Banner" />
        <Field label="Technologies (comma-separated)" value={Array.isArray(tech) ? tech.join(", ") : tech} onChange={v => onChange({ ...data, techStack: v.split(",").map((s: string) => s.trim()).filter(Boolean) })} />
      </div>
    </div>
  );
}

function MissionEditor({ data, onChange, onSave, saving }: any) {
  const building: any[] = data?.building ?? [];
  const learning: any[] = data?.learning ?? [];

  const updB = (i: number, f: string, v: string) => onChange({ ...data, building: building.map((b: any, idx: number) => idx === i ? { ...b, [f]: v } : b) });
  const updL = (i: number, f: string, v: string) => onChange({ ...data, learning: learning.map((l: any, idx: number) => idx === i ? { ...l, [f]: v } : l) });

  return (
    <div className="space-y-8">
      <SectionHead title="Current Mission" onSave={onSave} saving={saving} />

      <div>
        <SubHead label="Currently Building" />
        <div className="space-y-3">
          {building.map((b: any, i: number) => (
            <Card key={i} onDelete={() => onChange({ ...data, building: building.filter((_: any, idx: number) => idx !== i) })}>
              <Field label="Title (with emoji)" value={b.title} onChange={v => updB(i, "title", v)} />
              <Field label="Description" value={b.desc} onChange={v => updB(i, "desc", v)} rows={2} />
              <div className="grid grid-cols-3 gap-3">
                <Field label="Link" value={b.link} onChange={v => updB(i, "link", v)} />
                <Field label="Color class (e.g. text-orange-400)" value={b.color} onChange={v => updB(i, "color", v)} />
                <Field label="Hover border (e.g. hover:border-orange-500/50)" value={b.hoverBorder} onChange={v => updB(i, "hoverBorder", v)} />
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-4"><AddBtn onClick={() => onChange({ ...data, building: [...building, { title: "", desc: "", link: "https://github.com/keerthana-0712", color: "text-orange-400", hoverBorder: "hover:border-orange-500/50" }] })} label="Add Building Item" /></div>
      </div>

      <div>
        <SubHead label="Currently Learning" />
        <div className="space-y-3">
          {learning.map((l: any, i: number) => (
            <Card key={i} onDelete={() => onChange({ ...data, learning: learning.filter((_: any, idx: number) => idx !== i) })}>
              <Field label="Title (with emoji)" value={l.title} onChange={v => updL(i, "title", v)} />
              <Field label="Description" value={l.desc} onChange={v => updL(i, "desc", v)} rows={2} />
              <Field label="Link" value={l.link} onChange={v => updL(i, "link", v)} />
            </Card>
          ))}
        </div>
        <div className="mt-4"><AddBtn onClick={() => onChange({ ...data, learning: [...learning, { title: "", desc: "", link: "https://github.com/keerthana-0712" }] })} label="Add Learning Item" /></div>
      </div>
    </div>
  );
}

function RoadmapEditor({ data, onChange, onSave, saving }: any) {
  const steps: any[] = data?.steps ?? [];
  const books: any[] = data?.books ?? [];
  const cd = data?.currentDeepDive ?? { title: "", desc: "" };
  const nt = data?.nextTarget ?? { title: "", desc: "" };

  const updStep = (i: number, f: string, v: string) => onChange({ ...data, steps: steps.map((s: any, idx: number) => idx === i ? { ...s, [f]: v } : s) });
  const updBook = (i: number, f: string, v: string) => onChange({ ...data, books: books.map((b: any, idx: number) => idx === i ? { ...b, [f]: v } : b) });

  return (
    <div className="space-y-8">
      <SectionHead title="Learning Roadmap" onSave={onSave} saving={saving} />

      <div>
        <SubHead label="Timeline Steps" />
        <div className="space-y-3">
          {steps.map((s: any, i: number) => (
            <Card key={i} onDelete={() => onChange({ ...data, steps: steps.filter((_: any, idx: number) => idx !== i) })}>
              <div className="grid grid-cols-3 gap-3">
                <Field label="Year" value={s.year} onChange={v => updStep(i, "year", v)} />
                <Field label="Title" value={s.title} onChange={v => updStep(i, "title", v)} />
                <div>
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground block mb-1">Status</label>
                  <select value={s.status} onChange={e => updStep(i, "status", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-muted/30 border border-border text-sm font-mono focus:outline-none focus:border-accent">
                    <option value="completed">completed</option>
                    <option value="current">current</option>
                    <option value="upcoming">upcoming</option>
                  </select>
                </div>
              </div>
              <Field label="Description" value={s.desc} onChange={v => updStep(i, "desc", v)} rows={2} />
              <Field label="Link" value={s.link} onChange={v => updStep(i, "link", v)} />
            </Card>
          ))}
        </div>
        <div className="mt-4"><AddBtn onClick={() => onChange({ ...data, steps: [...steps, { year: "", title: "", desc: "", status: "upcoming", link: "https://github.com/keerthana-0712" }] })} label="Add Timeline Step" /></div>
      </div>

      <div>
        <SubHead label="Active Tech Focus" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-muted/20 border border-border space-y-3">
            <p className="text-xs font-mono font-bold text-accent uppercase">Currently Deep-Diving</p>
            <Field label="Title" value={cd.title} onChange={v => onChange({ ...data, currentDeepDive: { ...cd, title: v } })} />
            <Field label="Description" value={cd.desc} onChange={v => onChange({ ...data, currentDeepDive: { ...cd, desc: v } })} rows={2} />
          </div>
          <div className="p-5 rounded-2xl bg-muted/20 border border-border space-y-3">
            <p className="text-xs font-mono font-bold text-blue-400 uppercase">Next Target Skillset</p>
            <Field label="Title" value={nt.title} onChange={v => onChange({ ...data, nextTarget: { ...nt, title: v } })} />
            <Field label="Description" value={nt.desc} onChange={v => onChange({ ...data, nextTarget: { ...nt, desc: v } })} rows={2} />
          </div>
        </div>
      </div>

      <div>
        <SubHead label="Engineering Bookshelf" />
        <div className="space-y-3">
          {books.map((b: any, i: number) => (
            <Card key={i} onDelete={() => onChange({ ...data, books: books.filter((_: any, idx: number) => idx !== i) })}>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Book Title" value={b.title} onChange={v => updBook(i, "title", v)} />
                <div>
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground block mb-1">Status</label>
                  <select value={b.status} onChange={e => updBook(i, "status", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-muted/30 border border-border text-sm font-mono focus:outline-none focus:border-accent">
                    <option value="Reading">Reading</option>
                    <option value="Completed">Completed</option>
                    <option value="Planned">Planned</option>
                  </select>
                </div>
              </div>
              <Field label="Author / Notes" value={b.author} onChange={v => updBook(i, "author", v)} rows={2} />
            </Card>
          ))}
        </div>
        <div className="mt-4"><AddBtn onClick={() => onChange({ ...data, books: [...books, { status: "Reading", title: "", author: "" }] })} label="Add Book" /></div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ManageStreaksClient({ initialConfigs, dbOffline, dbError }: ManageStreaksClientProps) {
  const [activeTab, setActiveTab] = useState<TabId>("system-design");
  const [configs, setConfigs] = useState<Record<string, any>>(initialConfigs);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState("");

  const getData = (tab: TabId) => configs[tab] ?? DEFAULTS[tab];
  const setData = (tab: TabId, data: any) => setConfigs(prev => ({ ...prev, [tab]: data }));

  const saveSection = async (section: TabId) => {
    setSaving(true); setSaveError(""); setSaveSuccess("");
    try {
      const res = await fetch("/api/streaks-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, data: getData(section) }),
      });
      if (!res.ok) throw new Error(await res.text());
      setSaveSuccess(`"${section}" saved successfully!`);
      setTimeout(() => setSaveSuccess(""), 3000);
    } catch (err: any) {
      setSaveError(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (dbOffline) {
    return (
      <div className="p-8 border-2 border-dashed border-red-500/20 rounded-3xl bg-red-500/5">
        <div className="flex items-center gap-3 mb-4">
          <ShieldAlert className="w-8 h-8 text-red-500" />
          <h2 className="text-xl font-bold text-red-500">Database Offline</h2>
        </div>
        <p className="text-muted-foreground mb-4">Cannot connect to the database. Streaks config is unavailable.</p>
        <div className="p-4 bg-background rounded-xl border border-border font-mono text-xs text-red-400">{dbError}</div>
      </div>
    );
  }

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Manage Streaks</h1>
        <p className="text-sm text-muted-foreground mt-1">Edit all 6 tabs of the Streaks section. Changes are saved per-section to the database.</p>
      </header>

      <AnimatePresence>
        {saveSuccess && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
            <CheckCircle className="w-4 h-4" />{saveSuccess}
          </motion.div>
        )}
        {saveError && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />{saveError}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all border ${
              activeTab === tab.id
                ? "bg-accent/10 text-accent border-accent/20"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground border-transparent"
            }`}>
            {tab.icon}{tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
          {activeTab === "system-design" && <SystemDesignEditor data={getData("system-design")} onChange={(d: any) => setData("system-design", d)} onSave={() => saveSection("system-design")} saving={saving} />}
          {activeTab === "github" && <GithubEditor data={getData("github")} onChange={(d: any) => setData("github", d)} onSave={() => saveSection("github")} saving={saving} />}
          {activeTab === "leetcode" && <LeetcodeEditor data={getData("leetcode")} onChange={(d: any) => setData("leetcode", d)} onSave={() => saveSection("leetcode")} saving={saving} />}
          {activeTab === "growth-recruiter" && <GrowthEditor data={getData("growth-recruiter")} onChange={(d: any) => setData("growth-recruiter", d)} onSave={() => saveSection("growth-recruiter")} saving={saving} />}
          {activeTab === "mission" && <MissionEditor data={getData("mission")} onChange={(d: any) => setData("mission", d)} onSave={() => saveSection("mission")} saving={saving} />}
          {activeTab === "roadmap" && <RoadmapEditor data={getData("roadmap")} onChange={(d: any) => setData("roadmap", d)} onSave={() => saveSection("roadmap")} saving={saving} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

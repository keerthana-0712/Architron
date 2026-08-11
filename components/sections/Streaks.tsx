"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, Activity, GitPullRequest, Code2, Rocket, 
  Database, Server, Layout, Shield, Cpu, Github, 
  Users, CheckCircle, Target, BookOpen, Brain, 
  Map as MapIcon, Compass, Sparkles, Flame, Blocks,
  BarChart3, ChevronRight, Zap, ExternalLink, Network,
  Lock, Globe, Cloud, ArrowRight, Star, Award, 
  GitFork, Eye, Play, MessageSquare, RefreshCcw, Calendar, CheckSquare
} from "lucide-react";
import Link from "next/link";

type TabId = "system-design" | "github" | "leetcode" | "growth-recruiter" | "mission" | "roadmap";

export default function Streaks() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("system-design");
  const [configs, setConfigs] = useState<Record<string, any>>({});

  useEffect(() => {
    setIsMounted(true);

    const fetchConfigs = async () => {
      try {
        const res = await fetch("/api/streaks-config");
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data) {
            setConfigs(data.data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch streaks config:", err);
      }
    };
    fetchConfigs();
  }, []);

  if (!isMounted) {
    return (
      <section className="py-24 bg-background relative overflow-hidden min-h-[800px] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </section>
    );
  }

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: "system-design", label: "System Design Playground", icon: <Database className="w-4 h-4" /> },
    { id: "github", label: "GitHub Contributions", icon: <Github className="w-4 h-4" /> },
    { id: "leetcode", label: "LeetCode Profile", icon: <Code2 className="w-4 h-4" /> },
    { id: "growth-recruiter", label: "Growth & Recruiter Dashboard", icon: <BarChart3 className="w-4 h-4" /> },
    { id: "mission", label: "Current Mission", icon: <Target className="w-4 h-4" /> },
    { id: "roadmap", label: "Learning Roadmap", icon: <MapIcon className="w-4 h-4" /> },
  ];

  return (
    <section id="streaks" className="py-24 bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      {/* Ambient Glows */}
      <div className="absolute -left-1/4 top-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute -right-1/4 bottom-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="text-center mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-500/10 via-purple-500/10 to-indigo-500/10 text-rose-300 border border-rose-500/30 mb-6 shadow-[0_0_20px_rgba(244,63,94,0.15)] relative overflow-hidden"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <Activity className="w-3.5 h-3.5 text-rose-400" />
            <span className="text-xs font-semibold tracking-wider uppercase">Live Activity</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Streaks</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mx-auto text-lg"
          >
            Tracking my continuous evolution as an engineer, open-source contributor, and architect.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-5"
          >
            {["Discipline.", "Consistency.", "Commitment.", "Growth."].map((word, i) => (
              <span
                key={i}
                className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400"
              >
                {word}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative ${
                activeTab === tab.id
                  ? "text-primary shadow-[0_0_20px_rgba(var(--primary),0.2)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabStreak"
                  className="absolute inset-0 bg-primary/10 border border-primary/30 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab.icon}
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="min-h-[500px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full"
            >
              {activeTab === "system-design" && <SystemDesignPlayground config={configs["system-design"]} />}
              {activeTab === "github" && <GitHubSection config={configs["github"]} />}
              {activeTab === "leetcode" && <LeetCodeSection config={configs["leetcode"]} />}
              {activeTab === "growth-recruiter" && <GrowthRecruiterDashboard config={configs["growth-recruiter"]} />}
              {activeTab === "mission" && <CurrentMission config={configs["mission"]} />}
              {activeTab === "roadmap" && <LearningRoadmap config={configs["roadmap"]} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// TAB COMPONENTS
// -------------------------------------------------------------

function SystemDesignPlayground({ config }: { config?: any }) {
  const defaultDesigns = [
    { 
      name: "Global Video Streaming CDN (Netflix Clone)", 
      desc: "Microservices architecture for delivering 4K video content globally with minimal buffering.", 
      stack: ["Go", "Kafka", "Cassandra", "AWS S3", "Redis"],
      stats: { throughput: "50TB/s", latency: "<20ms", nodes: "10,000+" },
      link: "https://github.com/keerthana-0712"
    },
    { 
      name: "Real-Time Ride Hailing (Uber Clone)", 
      desc: "Geospatial matching engine handling driver-rider pairing, dynamic pricing, and live tracking.", 
      stack: ["Node.js", "PostgreSQL", "Redis Geospatial", "WebSockets"],
      stats: { throughput: "1M Req/sec", latency: "<50ms", matches: "100k/min" },
      link: "https://github.com/keerthana-0712"
    },
    { 
      name: "Distributed Message Queue", 
      desc: "A fault-tolerant, high-throughput pub/sub system designed from scratch.", 
      stack: ["Rust", "Raft Consensus", "gRPC", "RocksDB"],
      stats: { throughput: "5M Msg/sec", availability: "99.999%", replication: "Multi-Region" },
      link: "https://github.com/keerthana-0712"
    },
  ];

  const getDesignIcon = (name: string, index: number) => {
    const lower = name.toLowerCase();
    const className = "w-6 h-6";
    if (lower.includes("video") || lower.includes("cdn") || lower.includes("streaming") || lower.includes("server")) {
      return <Server className={`${className} text-red-400`} />;
    }
    if (lower.includes("ride") || lower.includes("hailing") || lower.includes("map") || lower.includes("geo")) {
      return <MapIcon className={`${className} text-yellow-400`} />;
    }
    if (lower.includes("queue") || lower.includes("message") || lower.includes("network") || lower.includes("distributed")) {
      return <Network className={`${className} text-blue-400`} />;
    }
    const icons = [
      <Server className={`${className} text-red-400`} />,
      <MapIcon className={`${className} text-yellow-400`} />,
      <Network className={`${className} text-blue-400`} />
    ];
    return icons[index % icons.length];
  };

  const designs = config?.designs || defaultDesigns;

  return (
    <div className="space-y-8">
      <div className="text-center max-w-5xl mx-auto mb-12">
        <h3 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
          <Blocks className="w-8 h-8 text-primary" />
          System Design & Architecture
        </h3>
        <p className="text-muted-foreground text-lg">
          Deep-diving into massively scalable architectures, distributed systems, and real-time data pipelines.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {designs.map((d: any, i: number) => (
          <Link href={d.link} target="_blank" key={i}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group h-full flex flex-col p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-primary/50 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(var(--primary),0.15)] transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="p-3 rounded-xl bg-black/50 border border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  {getDesignIcon(d.name, i)}
                </div>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>

              <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2 relative z-10">
                {d.name}
              </h4>
              <p className="text-sm text-muted-foreground mb-6 flex-grow relative z-10">
                {d.desc}
              </p>

              <div className="space-y-4 relative z-10 mt-auto">
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(d.stack) ? d.stack : []).map((tech: string, idx: number) => (
                    <span key={idx} className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded bg-white/5 text-muted-foreground border border-white/10 group-hover:border-primary/30 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10">
                  {Object.entries(d.stats || {}).map(([key, val]: any, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-[10px] text-muted-foreground uppercase">{key}</div>
                      <div className="text-sm font-bold text-foreground">{val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-4xl mx-auto mt-12 rounded-2xl bg-[#0a0a0a] border border-white/10 overflow-hidden font-mono text-sm shadow-2xl relative"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-muted-foreground text-xs">load_test_simulator.sh</span>
        </div>
        <div className="p-6 pb-8 relative">
          <div className="space-y-2 text-green-400/90 ">
            <p className="text-blue-400">❯ Provisioning 5,000 virtual users...</p>
            <p>❯ Executing distributed load test across 3 regions (us-east-1, eu-west-1, ap-south-1)</p>
            <div className="pl-4 border-l border-white/10 space-y-1 text-muted-foreground my-2">
              <p>[Region: us-east-1] Latency: 12ms | Throughput: 45k Req/s</p>
              <p>[Region: eu-west-1] Latency: 18ms | Throughput: 38k Req/s</p>
              <p>[Region: ap-south-1] Latency: 25ms | Throughput: 42k Req/s</p>
            </div>
            <p className="text-yellow-400 mt-4">❯ Traffic spiking to 200,000 Req/s...</p>
            <p>❯ Auto-scaling triggered. Spinning up 15 additional EC2 instances.</p>
            <p className="text-primary mt-4 font-bold">✓ System stabilized. Zero dropped packets. Peak Latency: 48ms.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function generateFallbackGrid() {
  const grid = [];
  const today = new Date();
  for (let i = 365; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const count = Math.random() > 0.35 ? Math.floor(Math.random() * 8) : 0;
    grid.push({
      date: date.toISOString().split("T")[0],
      count,
      level: count === 0 ? 0 : count < 3 ? 1 : count < 5 ? 2 : count < 7 ? 3 : 4,
    });
  }
  return grid;
}

function GitHubSection({ config }: { config?: any }) {
  const [githubData, setGithubData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/streaks");
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setGithubData(data.github);
          } else {
            throw new Error(data.error);
          }
        } else {
          throw new Error("HTTP Status " + res.status);
        }
      } catch (err) {
        console.warn("Failed to fetch live Github stats, using fallback", err);
        setGithubData({
          currentStreak: 365,
          bestStreak: 365,
          totalContributions: 1424,
          contributionsGrid: generateFallbackGrid(),
          public_repos: 45,
          followers: 120
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const defaultFeaturedRepos = [
    {
      name: "Maxy",
      desc: "Full-Stack Product Ecosystem with cross-platform synchronization, real-time database replications, and a robust micro-frontend setup.",
      stars: 84,
      forks: 18,
      tech: ["TypeScript", "Next.js", "GraphQL", "PostgreSQL"],
      demo: "https://github.com/keerthana-0712"
    },
    {
      name: "Corex",
      desc: "High-performance Knowledge & Entertainment Platform designed for sub-100ms latency content delivery and dynamic content caching.",
      stars: 62,
      forks: 12,
      tech: ["Go", "Redis", "React", "TailwindCSS"],
      demo: "https://github.com/keerthana-0712"
    },
    {
      name: "FOTHS",
      desc: "Fire of the Holy Spirit Global Worship & Revival Ecosystem. Features live media streaming pipelines and high-concurrency event handling.",
      stars: 124,
      forks: 34,
      tech: ["Rust", "WebSockets", "MongoDB", "Next.js"],
      demo: "https://github.com/keerthana-0712"
    },
    {
      name: "Flame AI",
      desc: "Advanced AI Coding Assistant. Orchestrates complex multi-file codebase edits, semantic code queries, and local model fine-tunes.",
      stars: 95,
      forks: 22,
      tech: ["Python", "PyTorch", "FastAPI", "VectorDB"],
      demo: "https://github.com/keerthana-0712"
    }
  ];

  const defaultTrophies = [
    { title: "1000+ Commits", desc: "High code velocity & progression", level: "gold" },
    { title: "365 Day Streak", desc: "Unmatched consistency in creation", level: "emerald" },
    { title: "Open Source Contributor", desc: "Active upstream collaborator", level: "blue" },
    { title: "Full Stack Developer", desc: "End-to-end architecture delivery", level: "purple" }
  ];

  const defaultVelocity = { pullRequests: "350+", issuesClosed: "120+", codeReviews: "200+", deployments: "80+" };

  const featuredRepos = config?.featuredRepos || defaultFeaturedRepos;
  const trophyLevels = ["gold", "emerald", "blue", "purple"];
  const trophies = (config?.trophies || defaultTrophies).map((t: any, i: number) => ({
    ...t,
    level: t.level || trophyLevels[i % trophyLevels.length]
  }));
  const velocity = config?.velocityMetrics || defaultVelocity;

  const getTrophyColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case "gold": return "text-yellow-400";
      case "emerald": return "text-emerald-400";
      case "blue": return "text-blue-400";
      case "purple": return "text-purple-400";
      default: return "text-yellow-400";
    }
  };

  const renderContributionGrid = () => {
    if (!githubData || !githubData.contributionsGrid) return null;
    const grid = githubData.contributionsGrid;
    const cols = [];
    for (let i = 0; i < grid.length; i += 7) {
      cols.push(grid.slice(i, i + 7));
    }
    const displayCols = cols.slice(-24);

    return (
      <div className="flex gap-[3px] overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-white/10">
        {displayCols.map((col: any[], cIdx: number) => (
          <div key={cIdx} className="flex flex-col gap-[3px] shrink-0">
            {col.map((day: any, rIdx: number) => {
              const bgColors = [
                "bg-[#161b22]", // Level 0
                "bg-[#0e4429]", // Level 1
                "bg-[#006d32]", // Level 2
                "bg-[#26a641]", // Level 3
                "bg-[#39d353]", // Level 4
              ];
              return (
                <div 
                  key={rIdx} 
                  title={`${day.count} contributions on ${day.date}`}
                  className={`w-[11px] h-[11px] rounded-[2px] ${bgColors[day.level]} hover:scale-125 transition-transform duration-100 cursor-pointer`}
                />
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-8 rounded-3xl bg-[#0d1117] border border-[#30363d] text-[#c9d1d9] relative overflow-hidden space-y-8">
      {/* Background brand overlay */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-[#30363d] pb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#161b22] border border-[#30363d] rounded-2xl">
            <Github className="w-10 h-10 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold text-white">GitHub Engine</h3>
              <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                Live Sync
              </span>
            </div>
            <Link href="https://github.com/keerthana-0712" target="_blank" className="text-sm text-primary hover:underline flex items-center gap-1 mt-0.5">
              @keerthana-0712 <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="px-4 py-2 rounded-xl bg-[#161b22] border border-[#30363d] text-center min-w-[100px]">
            <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Public Repos</div>
            <div className="text-xl font-bold text-white">
              {loading ? "..." : githubData?.public_repos || "45+"}
            </div>
          </div>
          <div className="px-4 py-2 rounded-xl bg-[#161b22] border border-[#30363d] text-center min-w-[100px]">
            <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Followers</div>
            <div className="text-xl font-bold text-white">
              {loading ? "..." : githubData?.followers || "120+"}
            </div>
          </div>
          <div className="px-4 py-2 rounded-xl bg-[#161b22] border border-[#30363d] text-center min-w-[100px]">
            <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Total Commits</div>
            <div className="text-xl font-bold text-green-400">
              {loading ? "..." : githubData?.totalContributions || "1,424+"}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Repositories Grid */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-white flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" />
          Featured & Production Repositories
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredRepos.map((repo: any, idx: number) => (
            <div key={idx} className="p-5 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-green-500/40 transition-all flex flex-col justify-between group">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-bold text-lg text-white group-hover:text-primary transition-colors flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    {repo.name}
                  </h5>
                  <Link href={repo.demo} target="_blank" className="text-xs text-muted-foreground hover:text-white flex items-center gap-1">
                    Live Demo <Play className="w-3 h-3 text-green-400" />
                  </Link>
                </div>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{repo.desc}</p>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[#30363d] mt-2">
                <div className="flex gap-2">
                  {(Array.isArray(repo.tech) ? repo.tech : []).slice(0, 3).map((t: string, i: number) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-black/40 border border-[#30363d] text-muted-foreground">{t}</span>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-yellow-400" /> {repo.stars}</span>
                  <span className="flex items-center gap-1"><GitFork className="w-3.5 h-3.5 text-primary" /> {repo.forks}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Heatmap Section */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d]">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Contribution Heatmap (Last 6 Months)</h4>
            {loading ? (
              <div className="h-28 w-full bg-white/5 animate-pulse rounded-lg" />
            ) : (
              renderContributionGrid()
            )}
            <div className="flex justify-between items-center text-xs text-muted-foreground mt-4">
              <span>Less</span>
              <div className="flex gap-[3px]">
                <div className="w-2.5 h-2.5 rounded-sm bg-[#161b22]" />
                <div className="w-2.5 h-2.5 rounded-sm bg-[#0e4429]" />
                <div className="w-2.5 h-2.5 rounded-sm bg-[#006d32]" />
                <div className="w-2.5 h-2.5 rounded-sm bg-[#26a641]" />
                <div className="w-2.5 h-2.5 rounded-sm bg-[#39d353]" />
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Timeline & Tech Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tech Distribution */}
            <div className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d] space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Tech Distribution</h4>
              <div className="flex items-center gap-4">
                {/* SVG Visual Ring Chart */}
                <div className="relative w-24 h-24 shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    {/* Background */}
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#222" strokeWidth="3" />
                    {/* Java: 35% */}
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#b07219" strokeWidth="3.5" strokeDasharray="35 65" strokeDashoffset="0" />
                    {/* JavaScript: 25% */}
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1e05a" strokeWidth="3.5" strokeDasharray="25 75" strokeDashoffset="-35" />
                    {/* React: 15% */}
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#61dafb" strokeWidth="3.5" strokeDasharray="15 85" strokeDashoffset="-60" />
                    {/* Node.js: 15% */}
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#339933" strokeWidth="3.5" strokeDasharray="15 85" strokeDashoffset="-75" />
                    {/* Others: 10% */}
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#666" strokeWidth="3.5" strokeDasharray="10 90" strokeDashoffset="-90" />
                  </svg>
                </div>
                <div className="flex-1 space-y-1.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#b07219]" /> Java</span>
                    <span className="font-bold">35%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#f1e05a]" /> JavaScript</span>
                    <span className="font-bold">25%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#61dafb]" /> React</span>
                    <span className="font-bold">15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#339933]" /> Node.js</span>
                    <span className="font-bold">15%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contribution Timeline */}
            <div className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d] space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Progression Timeline</h4>
              <div className="space-y-3 relative before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
                {[
                  { year: "2024", text: "Started Open Source journey & tool configs" },
                  { year: "2025", text: "Built Maxy (Full-Stack Product Suite)" },
                  { year: "2025", text: "Built Corex (Dynamic Scale platform)" },
                  { year: "2026", text: "Built FOTHS (Worship & Revival Ecosystem)" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start pl-6 relative">
                    <div className="absolute left-[7px] top-[5px] w-2 h-2 rounded-full bg-green-500" />
                    <div>
                      <span className="text-xs font-bold text-white bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20">{item.year}</span>
                      <p className="text-[11px] text-muted-foreground mt-1">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Metrics & Trophies */}
        <div className="lg:col-span-4 space-y-6">
          {/* Engineering Metrics */}
          <div className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d] space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Engineering Velocity</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-center">
                <div className="text-2xl font-bold text-white">{velocity.pullRequests || "350+"}</div>
                <div className="text-[10px] text-muted-foreground">Pull Requests</div>
              </div>
              <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-center">
                <div className="text-2xl font-bold text-white">{velocity.issuesClosed || "120+"}</div>
                <div className="text-[10px] text-muted-foreground">Issues Closed</div>
              </div>
              <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-center">
                <div className="text-2xl font-bold text-white">{velocity.codeReviews || "200+"}</div>
                <div className="text-[10px] text-muted-foreground">Code Reviews</div>
              </div>
              <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-center">
                <div className="text-2xl font-bold text-white">{velocity.deployments || "80+"}</div>
                <div className="text-[10px] text-muted-foreground">Deployments</div>
              </div>
            </div>
          </div>

          {/* GitHub Trophies */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#161b22] to-black border border-[#30363d] space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">GitHub Trophies</h4>
            <div className="grid grid-cols-2 gap-3">
              {trophies.map((tr: any, i: number) => (
                <div key={i} className="p-3 bg-[#161b22] border border-[#30363d] rounded-xl flex flex-col justify-between items-center text-center">
                  <Award className={`w-8 h-8 ${getTrophyColor(tr.level)} mb-2`} />
                  <span className="text-[11px] font-bold text-white leading-tight">{tr.title}</span>
                  <span className="text-[9px] text-muted-foreground mt-1">{tr.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeetCodeSection({ config }: { config?: any }) {
  const [leetcodeData, setLeetcodeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/streaks");
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setLeetcodeData(data.leetcode);
          } else {
            throw new Error(data.error);
          }
        } else {
          throw new Error("HTTP Status " + res.status);
        }
      } catch (err) {
        console.warn("Failed to fetch live LeetCode stats, using fallback", err);
        setLeetcodeData({
          currentStreak: 120,
          bestStreak: 120,
          totalSolved: 512,
          ranking: 124321,
          difficultyBreakdown: {
            easy: { solved: 210, total: 650 },
            medium: { solved: 242, total: 1250 },
            hard: { solved: 60, total: 350 },
          }
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const breakdown = leetcodeData?.difficultyBreakdown || {
    easy: { solved: 210, total: 650 },
    medium: { solved: 242, total: 1250 },
    hard: { solved: 60, total: 350 },
  };

  const defaultReadiness = [
    { company: "Google Readiness", percent: 78, color: "bg-blue-500" },
    { company: "Amazon Readiness", percent: 85, color: "bg-orange-500" },
    { company: "Microsoft Readiness", percent: 80, color: "bg-teal-500" },
    { company: "Meta Readiness", percent: 72, color: "bg-indigo-500" },
    { company: "Uber Readiness", percent: 75, color: "bg-emerald-500" }
  ];

  const defaultHardSolved = [
    { title: "Word Ladder II", complexity: "Time: O(V + E) | Space: O(V)", desc: "Bidirectional BFS with path reconstruction" },
    { title: "Merge K Sorted Lists", complexity: "Time: O(N log K) | Space: O(K)", desc: "Min-Heap / Divide & Conquer scaling merge" },
    { title: "LFU Cache", complexity: "Time: O(1) | Space: O(Capacity)", desc: "Doubly Linked List with frequency hash buckets" },
    { title: "Alien Dictionary", complexity: "Time: O(C) | Space: O(V + E)", desc: "Topological Sort / Kahns Algorithm cycle detection" },
    { title: "N Queens", complexity: "Time: O(N!) | Space: O(N)", desc: "Backtracking with bitwise column/diagonal masks" }
  ];

  const defaultTopics = [
    { label: "Arrays & Strings", status: "✅ Completed" },
    { label: "Two Pointers & Sliding Window", status: "✅ Completed" },
    { label: "Trees & BST", status: "✅ Completed" },
    { label: "Graphs & DFS/BFS", status: "✅ Completed" },
    { label: "Dynamic Programming", status: "⚡ In Progress" },
    { label: "System Design Playground", status: "🚀 Learning" }
  ];

  const readiness = config?.readiness || defaultReadiness;
  const hardSolved = config?.hardSolved || defaultHardSolved;
  const topics = config?.topicReadiness || defaultTopics;

  const contestRating = config?.contestRating ?? 1650;
  const bestRank = config?.bestRank ?? 800;
  const totalContests = config?.totalContests ?? 45;
  const globalRankPercent = config?.globalRankPercent ?? "Top 15%";
  const thisMonth = config?.thisMonth ?? 52;
  const avgDaily = config?.avgDaily ?? 3.4;
  const peakDay = config?.peakDay ?? "12 Solves";

  return (
    <div className="p-8 rounded-3xl bg-[#1a1a1a] border border-[#3b3b3b] text-gray-300 relative overflow-hidden space-y-8">
      {/* Background brand overlay */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-[#ffa116]/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-[#3b3b3b] pb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#282828] border border-[#404040] rounded-2xl">
            <Code2 className="w-10 h-10 text-[#ffa116]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold text-white">LeetCode Arena</h3>
              <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#ffa116]/10 text-[#ffa116] border border-[#ffa116]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                Live Sync
              </span>
            </div>
            <Link href="https://leetcode.com/u/keethana_0712/" target="_blank" className="text-sm text-[#ffa116] hover:underline flex items-center gap-1 mt-0.5">
              @keethana_0712 <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="px-4 py-2 rounded-xl bg-[#282828] border border-[#404040] text-center min-w-[100px]">
            <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Global Rank</div>
            <div className="text-xl font-bold text-white">
              {loading ? "..." : leetcodeData?.ranking?.toLocaleString() || "#124,321"}
            </div>
          </div>
          <div className="px-4 py-2 rounded-xl bg-[#282828] border border-[#404040] text-center min-w-[100px]">
            <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Problems Solved</div>
            <div className="text-xl font-bold text-[#ffa116]">
              {loading ? "..." : leetcodeData?.totalSolved || "512"}
            </div>
          </div>
          <div className="px-4 py-2 rounded-xl bg-[#282828] border border-[#404040] text-center min-w-[100px]">
            <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Active Streak</div>
            <div className="text-xl font-bold text-white">
              {loading ? "..." : leetcodeData?.currentStreak || "120d"}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Contest Stats & Velocities */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Contest Performance */}
            <div className="p-6 rounded-2xl bg-[#282828] border border-[#404040] space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#ffa116]" />
                Contest Performance
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">Contest Rating</div>
                  <div className="text-3xl font-bold text-white">{contestRating}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Global Rank</div>
                  <div className="text-xl font-bold text-[#ffa116]">{globalRankPercent}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Best Rank</div>
                  <div className="text-xl font-bold text-white">{bestRank}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Contests</div>
                  <div className="text-xl font-bold text-white">{totalContests}</div>
                </div>
              </div>
            </div>

            {/* Problem Solving Velocity */}
            <div className="p-6 rounded-2xl bg-[#282828] border border-[#404040] space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#ffa116]" />
                Solving Velocity
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">This Month</div>
                  <div className="text-3xl font-bold text-white">{thisMonth}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Average Daily</div>
                  <div className="text-xl font-bold text-green-400">{avgDaily}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Peak Day</div>
                  <div className="text-xl font-bold text-white">{peakDay}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Difficulty breakdown */}
          <div className="p-6 rounded-2xl bg-[#282828] border border-[#404040] space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Difficulty Breakdown</h4>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-[#00b8a3] font-bold">Easy</span>
                  <span className="text-white font-semibold">{breakdown.easy.solved}/{breakdown.easy.total}</span>
                </div>
                <div className="h-2 w-full bg-[#1a1a1a] rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(breakdown.easy.solved / breakdown.easy.total) * 100}%` }} className="h-full bg-[#00b8a3] rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-[#ffc01e] font-bold">Medium</span>
                  <span className="text-white font-semibold">{breakdown.medium.solved}/{breakdown.medium.total}</span>
                </div>
                <div className="h-2 w-full bg-[#1a1a1a] rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(breakdown.medium.solved / breakdown.medium.total) * 100}%` }} className="h-full bg-[#ffc01e] rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-[#ef4743] font-bold">Hard</span>
                  <span className="text-white font-semibold">{breakdown.hard.solved}/{breakdown.hard.total}</span>
                </div>
                <div className="h-2 w-full bg-[#1a1a1a] rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(breakdown.hard.solved / breakdown.hard.total) * 100}%` }} className="h-full bg-[#ef4743] rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Hard Problems Solved Showcase */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-500" />
              Advanced algorithmic showcase (quality over quantity)
            </h4>
            <div className="space-y-3">
              {hardSolved.map((prob: any, i: number) => (
                <div key={i} className="p-4 rounded-xl bg-[#282828] border border-[#404040] hover:border-red-500/30 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                  <div>
                    <h5 className="font-bold text-white flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      {prob.title}
                    </h5>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{prob.desc}</p>
                  </div>
                  <span className="text-[10px] font-mono bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded shrink-0">{prob.complexity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Readiness trackers */}
        <div className="lg:col-span-4 space-y-6">
          {/* Company Readiness */}
          <div className="p-6 rounded-2xl bg-[#282828] border border-[#404040] space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Target className="w-4 h-4 text-[#ffa116]" />
              Companywise Readiness
            </h4>
            <div className="space-y-3.5">
              {readiness.map((r: any, i: number) => (
                <div key={i}>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-medium text-white">{r.company}</span>
                    <span className="font-bold text-[#ffa116]">{r.percent}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1a1a1a] rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${r.percent}%` }} className={`h-full ${r.color} rounded-full`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interview Readiness */}
          <div className="p-6 rounded-2xl bg-[#282828] border border-[#404040] space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Topic Readiness Tracker</h4>
            <div className="space-y-3 text-sm">
              {topics.map((topic: any, i: number) => (
                <div key={i} className="flex justify-between items-center border-b border-[#3b3b3b] pb-2 last:border-0 last:pb-0">
                  <span className="text-xs">{topic.label}</span>
                  <span className="text-xs font-semibold font-mono text-white">{topic.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GrowthRecruiterDashboard({ config }: { config?: any }) {
  const [selectedArch, setSelectedArch] = useState<string>("ai-assistant");
  const [selectedRole, setSelectedRole] = useState<string>("fullstack");

  const roleMatches: { [key: string]: { title: string; skills: string[]; fit: string } } = {
    "fullstack": {
      title: "Full-Stack Engineer / Architect",
      skills: [
        "React & Next.js App Router (SSR, streaming architectures, server components)",
        "Rust/Go Microservices & API design (clean, scalable architecture design)",
        "TypeScript, PostgreSQL, Cassandra, Redis Caching Pipelines",
        "Interactive UX with smooth Framer Motion and responsive Tailwind layouts"
      ],
      fit: "Perfect fit for designing end-to-end features, connecting snappy frontends with highly performant backends, and leading dashboard features."
    },
    "backend": {
      title: "Backend / Distributed Systems Specialist",
      skills: [
        "Go/Rust high-throughput event processing and microservice choreography",
        "Redis Streams, Kafka event sourcing, distributed task queuing",
        "SQL query tuning, index optimization, complex schema design",
        "Distributed lock mechanisms, API gateways, rate limiting, system resiliency"
      ],
      fit: "Perfect fit for heavy lifting backend logic, data-intensive pipelines, concurrency scaling, database clustering, and sub-millisecond API response optimization."
    },
    "cloud": {
      title: "DevOps & Cloud Systems Architect",
      skills: [
        "AWS Cloud ecosystem (ECS/EKS, RDS, S3, IAM, CloudFront caching worker, VPC)",
        "Google Cloud Platform (Google Kubernetes Engine, Cloud Run serverless, CloudSQL)",
        "Docker container orchestration, CI/CD pipeline automations, Terraform IaC",
        "Multi-region deployment, fault tolerance, horizontal auto-scaling setups"
      ],
      fit: "Perfect fit for setting up automated deployments, containerization, cloud resource orchestration, cost optimizations, and multi-region network routing."
    }
  };

  const defaultStats = [
    { label: "Experience", value: "3+ Yrs" },
    { label: "Projects Built", value: "15+" },
    { label: "Clients Served", value: "3+" },
    { label: "Cloud Platforms", value: "AWS / GCP" },
    { label: "GitHub Commits", value: "1400+" },
    { label: "DSA Solved", value: "284+" },
    { label: "System Designs", value: "25+" },
    { label: "Open Source PRs", value: "50+" },
  ];

  const defaultCerts = [
    { name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services" },
    { name: "Meta Front-End Developer", issuer: "Meta" },
    { name: "Google Cloud Professional", issuer: "Google Cloud" },
  ];

  const defaultWhy = [
    { title: "Full-Stack Capability", body: "Proficient in building React/Next.js frontends that integrate seamlessly with highly scalable Rust and Go microservices." },
    { title: "Database Optimization", body: "Expert in schema designs, SQL query tuning, clustering (Cassandra/MongoDB), and high hit-ratio memory caching (Redis)." },
    { title: "Agile & Business Oriented", body: "Converts requirements into production designs. Maintains high development velocity under sprint and client delivery timelines." },
  ];

  const defaultTech = ["TypeScript", "React", "Next.js", "Node.js", "Rust", "Go", "Python", "PostgreSQL", "MongoDB", "Redis", "Docker", "AWS", "Kafka", "GraphQL", "TailwindCSS", "Framer Motion"];

  const getStatStyles = (label: string, index: number) => {
    const lower = label.toLowerCase();
    if (lower.includes("experience") || lower.includes("yr")) {
      return { icon: <Award className="w-5 h-5 text-green-400" />, bg: "bg-green-400/10", border: "border-green-400/20" };
    }
    if (lower.includes("project")) {
      return { icon: <Rocket className="w-5 h-5 text-blue-400" />, bg: "bg-blue-400/10", border: "border-blue-400/20" };
    }
    if (lower.includes("client")) {
      return { icon: <Users className="w-5 h-5 text-purple-400" />, bg: "bg-purple-400/10", border: "border-purple-400/20" };
    }
    if (lower.includes("cloud") || lower.includes("aws") || lower.includes("gcp")) {
      return { icon: <Cloud className="w-5 h-5 text-orange-400" />, bg: "bg-orange-400/10", border: "border-orange-400/20" };
    }
    if (lower.includes("commit") || lower.includes("github")) {
      return { icon: <Github className="w-5 h-5 text-indigo-400" />, bg: "bg-indigo-400/10", border: "border-indigo-400/20" };
    }
    if (lower.includes("dsa") || lower.includes("solve") || lower.includes("leetcode")) {
      return { icon: <Brain className="w-5 h-5 text-green-400" />, bg: "bg-green-400/10", border: "border-green-400/20" };
    }
    if (lower.includes("design") || lower.includes("system")) {
      return { icon: <Database className="w-5 h-5 text-red-400" />, bg: "bg-red-400/10", border: "border-red-400/20" };
    }
    if (lower.includes("pr") || lower.includes("pull") || lower.includes("open source")) {
      return { icon: <GitPullRequest className="w-5 h-5 text-orange-400" />, bg: "bg-orange-400/10", border: "border-orange-400/20" };
    }
    const styles = [
      { icon: <Award className="w-5 h-5 text-green-400" />, bg: "bg-green-400/10", border: "border-green-400/20" },
      { icon: <Rocket className="w-5 h-5 text-blue-400" />, bg: "bg-blue-400/10", border: "border-blue-400/20" },
      { icon: <Users className="w-5 h-5 text-purple-400" />, bg: "bg-purple-400/10", border: "border-purple-400/20" },
      { icon: <Cloud className="w-5 h-5 text-orange-400" />, bg: "bg-orange-400/10", border: "border-orange-400/20" }
    ];
    return styles[index % styles.length];
  };

  const stats = (config?.stats || defaultStats).map((st: any, idx: number) => {
    const style = getStatStyles(st.label || "", idx);
    return { ...st, ...style };
  });

  const certifications = config?.certifications || defaultCerts;
  const whyHireMe = config?.whyHireMe || defaultWhy;
  const techStack = config?.techStack || defaultTech;

  const architectures: { [key: string]: { title: string; desc: string; diagram: React.ReactNode } } = {
    "ai-assistant": {
      title: "Flame AI Assistant Orchestrator",
      desc: "Event-driven asynchronous AI agent with multi-file contextual updates, vector search caching, and rate limiting fallback pipelines.",
      diagram: (
        <svg className="w-full h-full text-[#c9d1d9]" viewBox="0 0 400 160">
          <rect x="10" y="50" width="80" height="40" rx="6" fill="#161b22" stroke="#30363d" strokeWidth="1.5" />
          <text x="50" y="75" fill="white" fontSize="10" textAnchor="middle">Query/User</text>
          
          <line x1="90" y1="70" x2="130" y2="70" stroke="#58a6ff" strokeWidth="1.5" strokeDasharray="3" />
          
          <rect x="130" y="50" width="80" height="40" rx="6" fill="#161b22" stroke="#30363d" strokeWidth="1.5" />
          <text x="170" y="75" fill="white" fontSize="10" textAnchor="middle">Orchestrator</text>
          
          <line x1="210" y1="70" x2="250" y2="50" stroke="#58a6ff" strokeWidth="1.5" />
          <line x1="210" y1="70" x2="250" y2="90" stroke="#58a6ff" strokeWidth="1.5" />
          
          <rect x="250" y="20" width="80" height="40" rx="6" fill="#161b22" stroke="#30363d" strokeWidth="1.5" />
          <text x="290" y="45" fill="white" fontSize="10" textAnchor="middle">Vector DB</text>
          
          <rect x="250" y="80" width="80" height="40" rx="6" fill="#161b22" stroke="#30363d" strokeWidth="1.5" />
          <text x="290" y="105" fill="white" fontSize="10" textAnchor="middle">LLM API</text>
        </svg>
      )
    },
    "mail-system": {
      title: "Scalable SMTP & Transactional Mail Engine",
      desc: "Distributed task queuing using Redis Streams/BullMQ, auto-scaling mail dispatch nodes, and webhook response tracking.",
      diagram: (
        <svg className="w-full h-full text-[#c9d1d9]" viewBox="0 0 400 160">
          <rect x="10" y="50" width="80" height="40" rx="6" fill="#161b22" stroke="#30363d" strokeWidth="1.5" />
          <text x="50" y="75" fill="white" fontSize="10" textAnchor="middle">App API</text>
          
          <line x1="90" y1="70" x2="130" y2="70" stroke="#ffa116" strokeWidth="1.5" />
          
          <rect x="130" y="50" width="80" height="40" rx="6" fill="#161b22" stroke="#30363d" strokeWidth="1.5" />
          <text x="170" y="75" fill="white" fontSize="10" textAnchor="middle">Redis Stream</text>
          
          <line x1="210" y1="70" x2="250" y2="70" stroke="#ffa116" strokeWidth="1.5" />
          
          <rect x="250" y="50" width="80" height="40" rx="6" fill="#161b22" stroke="#30363d" strokeWidth="1.5" />
          <text x="290" y="75" fill="white" fontSize="10" textAnchor="middle">Mail Dispatchers</text>
        </svg>
      )
    },
    "event-platform": {
      title: "Real-time High Concurrency Ticketing & Queue System",
      desc: "Optimistic locking on ticketing database, rate limiting gateway via Redis tokens, and virtual queuing fallback for high-traffic drop events.",
      diagram: (
        <svg className="w-full h-full text-[#c9d1d9]" viewBox="0 0 400 160">
          <rect x="10" y="50" width="80" height="40" rx="6" fill="#161b22" stroke="#30363d" strokeWidth="1.5" />
          <text x="50" y="75" fill="white" fontSize="10" textAnchor="middle">Traffic Spike</text>
          
          <line x1="90" y1="70" x2="130" y2="70" stroke="#ea4aaa" strokeWidth="1.5" />
          
          <rect x="130" y="50" width="80" height="40" rx="6" fill="#161b22" stroke="#30363d" strokeWidth="1.5" />
          <text x="170" y="75" fill="white" fontSize="10" textAnchor="middle">Cloudflare Gateway</text>
          
          <line x1="210" y1="70" x2="250" y2="70" stroke="#ea4aaa" strokeWidth="1.5" />
          
          <rect x="250" y="50" width="80" height="40" rx="6" fill="#161b22" stroke="#30363d" strokeWidth="1.5" />
          <text x="290" y="75" fill="white" fontSize="10" textAnchor="middle">Ticketing DB</text>
        </svg>
      )
    },
    "streaming-platform": {
      title: "Multi-Region Edge Cached CDN Architecture",
      desc: "Video segment chunking pipelines using FFmpeg, adaptive bitrate streaming (HLS), and low-latency Cloudflare Worker edge networks.",
      diagram: (
        <svg className="w-full h-full text-[#c9d1d9]" viewBox="0 0 400 160">
          <rect x="10" y="50" width="80" height="40" rx="6" fill="#161b22" stroke="#30363d" strokeWidth="1.5" />
          <text x="50" y="75" fill="white" fontSize="10" textAnchor="middle">Video Source</text>
          
          <line x1="90" y1="70" x2="130" y2="70" stroke="#00b8a3" strokeWidth="1.5" />
          
          <rect x="130" y="50" width="80" height="40" rx="6" fill="#161b22" stroke="#30363d" strokeWidth="1.5" />
          <text x="170" y="75" fill="white" fontSize="10" textAnchor="middle">FFmpeg Worker</text>
          
          <line x1="210" y1="70" x2="250" y2="70" stroke="#00b8a3" strokeWidth="1.5" />
          
          <rect x="250" y="50" width="80" height="40" rx="6" fill="#161b22" stroke="#30363d" strokeWidth="1.5" />
          <text x="290" y="75" fill="white" fontSize="10" textAnchor="middle">CDN Edge Cache</text>
        </svg>
      )
    },
    "prayer-platform": {
      title: "Worship & Prayer Platform Event Architecture",
      desc: "Live stream ingestion pipelines via RTMP protocol, WebSockets for instant message sync, and PostgreSQL database cluster backing user data.",
      diagram: (
        <svg className="w-full h-full text-[#c9d1d9]" viewBox="0 0 400 160">
          <rect x="10" y="50" width="80" height="40" rx="6" fill="#161b22" stroke="#30363d" strokeWidth="1.5" />
          <text x="50" y="75" fill="white" fontSize="10" textAnchor="middle">Client App</text>
          
          <line x1="90" y1="70" x2="130" y2="70" stroke="#a371f7" strokeWidth="1.5" />
          
          <rect x="130" y="50" width="80" height="40" rx="6" fill="#161b22" stroke="#30363d" strokeWidth="1.5" />
          <text x="170" y="75" fill="white" fontSize="10" textAnchor="middle">GraphQL Gateway</text>
          
          <line x1="210" y1="70" x2="250" y2="70" stroke="#a371f7" strokeWidth="1.5" />
          
          <rect x="250" y="50" width="80" height="40" rx="6" fill="#161b22" stroke="#30363d" strokeWidth="1.5" />
          <text x="290" y="75" fill="white" fontSize="10" textAnchor="middle">WS Live Push</text>
        </svg>
      )
    }
  };

  return (
    <div className="space-y-8">
      {/* Recruiter Stats Summary */}
      <div className="text-center max-w-5xl mx-auto">
        <h3 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
          <Award className="w-8 h-8 text-primary" />
          Growth & Recruiter Console
        </h3>
        <p className="text-muted-foreground text-lg">
          At-a-glance dashboard showcasing key architectural skills, technical credentials, and high velocity execution.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {stats.map((st: any, i: number) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            key={i} 
            className={`p-4 rounded-xl ${st.bg} border ${st.border} hover:border-primary/50 text-center flex flex-col justify-center items-center group transition-colors`}
          >
            <div className="p-2 bg-black/20 rounded-lg mb-2 text-muted-foreground group-hover:text-primary transition-colors">
              {st.icon}
            </div>
            <div className="text-2xl font-black text-white">{st.value}</div>
            <div className="text-[10px] text-muted-foreground leading-tight mt-1">{st.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Certifications & Why Hire Me */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/20 rounded-lg text-primary">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Certifications Earned</h3>
          </div>
          <div className="space-y-3">
            {certifications.map((cert: any, i: number) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-white/5 hover:border-primary/30 transition-colors">
                <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold">{cert.name}</p>
                  <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Why Hire Me */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Why Hire Me?</h3>
          </div>
          <div className="space-y-4">
            {whyHireMe.map((item: any, i: number) => (
              <div key={i} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recruiter Custom Skill Matcher */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-blue-500/5 to-transparent border border-primary/20 mb-8"
      >
        <div className="flex flex-col lg:flex-row gap-6 items-stretch justify-between">
          <div className="max-w-md flex flex-col justify-between">
            <div>
              <h4 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <CheckSquare className="w-5 h-5 text-primary" />
                Recruiter Skill-Matcher Console
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Evaluating candidate alignment? Select a target engineering profile below to instantly audit my relevant stack capabilities and project contributions.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {[
                { id: "fullstack", label: "Full-Stack Engineer" },
                { id: "backend", label: "Backend Specialist" },
                { id: "cloud", label: "DevOps / Cloud Specialist" }
              ].map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    selectedRole === role.id
                      ? "bg-primary/20 border-primary text-primary shadow-[0_0_12px_rgba(var(--primary),0.15)]"
                      : "bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {role.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-grow p-5 rounded-xl bg-black/60 border border-white/5 space-y-3 flex flex-col justify-between">
            <div>
              <h5 className="text-sm font-bold text-white mb-2">
                Target Role Alignment: <span className="text-primary">{roleMatches[selectedRole].title}</span>
              </h5>
              <ul className="space-y-1.5">
                {roleMatches[selectedRole].skills.map((skill, index) => (
                  <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-muted-foreground/80 italic border-t border-white/5 pt-3 mt-2">
              <strong>Recruiter Match Verdict:</strong> {roleMatches[selectedRole].fit}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Architected Systems Showcase - SECRET WEAPON */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-white/10">
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h4 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              Architected Systems
            </h4>
            <p className="text-xs text-muted-foreground mb-6">
              Most candidates show simple CRUD code. I show system thinking. Select a block to review the architectural design pipeline.
            </p>
            <div className="space-y-2">
              {Object.entries(architectures).map(([key, arch]) => (
                <button
                  key={key}
                  onClick={() => setSelectedArch(key)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border flex justify-between items-center ${
                    selectedArch === key
                      ? "bg-primary/20 border-primary text-primary"
                      : "bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10"
                  }`}
                >
                  {arch.title.split(" ")[0] + " " + arch.title.split(" ")[1]}
                  <ChevronRight className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 p-6 rounded-2xl bg-black/80 border border-white/10 flex flex-col justify-between">
          <div>
            <h4 className="text-xl font-bold text-white mb-2">{architectures[selectedArch].title}</h4>
            <p className="text-sm text-muted-foreground mb-6">{architectures[selectedArch].desc}</p>
          </div>
          <div className="w-full flex-grow p-4 rounded-xl bg-black border border-white/5 flex items-center justify-center min-h-[180px]">
            {architectures[selectedArch].diagram}
          </div>
          <div className="mt-4 text-right">
            <Link href="https://github.com/keerthana-0712" target="_blank" className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline">
              Review repository design files <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Tech Stack Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-6 rounded-2xl bg-gradient-to-r from-primary/5 via-blue-500/5 to-purple-500/5 border border-white/10"
      >
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Full-Stack Tech Mastery</h3>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech: string, i: number) => (
            <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-muted-foreground hover:text-white hover:border-primary/40 hover:bg-primary/5 transition-all cursor-default">
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function CurrentMission({ config }: { config?: any }) {
  const defaultBuilding = [
    { title: "🔥 Fire of the Holy Spirit Ecosystem", desc: "A comprehensive digital ecosystem uniting faith and modern technology.", link: "https://github.com/keerthana-0712", color: "text-orange-400", hoverBorder: "hover:border-orange-500/50" },
    { title: "🤖 Flame AI Assistant", desc: "Intelligent contextual AI agent designed for advanced code orchestration.", link: "https://github.com/keerthana-0712", color: "text-blue-400", hoverBorder: "hover:border-blue-400/50" },
    { title: "🌐 Corex Platform", desc: "High-performance microservices architecture for scalable web solutions.", link: "https://github.com/keerthana-0712", color: "text-purple-400", hoverBorder: "hover:border-purple-400/50" },
  ];

  const defaultLearning = [
    { title: "📚 System Design", desc: "Mastering large-scale architecture, sharding, and latency optimization.", link: "https://github.com/keerthana-0712" },
    { title: "📚 Distributed Systems", desc: "Deep dive into consensus algorithms (Raft/Paxos) and distributed databases.", link: "https://github.com/keerthana-0712" },
    { title: "📚 Advanced DSA", desc: "Tackling complex dynamic programming and graph traversal algorithms.", link: "https://github.com/keerthana-0712" },
  ];

  const building = config?.building || defaultBuilding;
  const learning = config?.learning || defaultLearning;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-orange-500/20 rounded-xl text-orange-400">
            <Flame className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold">Currently Building</h3>
        </div>
        <div className="space-y-4">
          {building.map((b: any, idx: number) => (
            <Link key={idx} href={b.link || "https://github.com/keerthana-0712"} target="_blank" className="block">
              <div className={`p-4 rounded-xl bg-black/40 border border-white/5 ${b.hoverBorder || "hover:border-orange-500/50"} transition-colors group`}>
                <div className="flex justify-between items-start">
                  <h4 className={`text-lg font-semibold ${b.color || "text-orange-400"} mb-1`}>{b.title}</h4>
                  <ExternalLink className={`w-4 h-4 ${b.color || "text-orange-400"}/50 group-hover:${b.color || "text-orange-400"} transition-colors`} />
                </div>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold">Currently Learning</h3>
        </div>
        <div className="space-y-6">
          <div className="relative pl-6 border-l-2 border-blue-500/30 space-y-6">
            {learning.map((l: any, idx: number) => (
              <Link key={idx} href={l.link || "https://github.com/keerthana-0712"} target="_blank" className="block group">
                <div className="relative hover:bg-white/5 p-2 -ml-2 rounded-lg transition-colors">
                  <div className="absolute -left-[33px] top-3 w-4 h-4 rounded-full bg-blue-500 border-4 border-background group-hover:scale-125 transition-transform" />
                  <h4 className="font-semibold text-lg flex items-center gap-2">{l.title} <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-400" /></h4>
                  <p className="text-sm text-muted-foreground">{l.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function LearningRoadmap({ config }: { config?: any }) {
  const defaultSteps = [
    { year: "2022", title: "The Foundation", desc: "Mastered HTML, CSS, JavaScript & React. Built first full-stack CRUD apps.", status: "completed", link: "https://github.com/keerthana-0712" },
    { year: "2023", title: "Advanced Frontend", desc: "Next.js, TypeScript, State Management, and advanced Framer Motion animations.", status: "completed", link: "https://github.com/keerthana-0712" },
    { year: "2024", title: "Backend & Systems", desc: "Node.js, Microservices, Docker, PostgreSQL, and cloud deployments.", status: "completed", link: "https://github.com/keerthana-0712" },
    { year: "2025", title: "Architecture & AI", desc: "System Design, AI Agents integration, and building highly scalable platforms.", status: "current", link: "https://github.com/keerthana-0712" },
    { year: "Future", title: "Tech Leadership", desc: "Leading massive open-source projects and architecting global-scale systems.", status: "upcoming", link: "https://github.com/keerthana-0712" },
  ];

  const defaultDeepDive = { title: "Distributed Consensus Protocols", desc: "Raft election loops, partition management, log replication in Go." };
  const defaultNextTarget = { title: "Kubernetes Operators & CRDs", desc: "Custom lifecycle automation patterns for Go microservices." };
  const defaultBooks = [
    { status: "Reading", title: "Designing Data-Intensive Applications", author: "Martin Kleppmann — partitioning, consistency, replication paradigms." },
    { status: "Completed", title: "System Design Interview — Volume 1 & 2", author: "Alex Xu — rate limiters, web crawlers, chat apps, consistent hashing." },
  ];

  const steps = config?.steps || defaultSteps;
  const currentDeepDive = config?.currentDeepDive || defaultDeepDive;
  const nextTarget = config?.nextTarget || defaultNextTarget;
  const books = config?.books || defaultBooks;

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Timeline Column */}
      <div className="lg:col-span-8 p-8 rounded-3xl bg-white/5 border border-white/10">
        <div className="text-center mb-10">
          <Compass className="w-10 h-10 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold">The Continuous Evolution</h3>
          <p className="text-muted-foreground">My path from foundations to architectural mastery.</p>
        </div>
        
        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
          {steps.map((step: any, index: number) => (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10 transition-colors duration-300
                ${step.status === 'completed' ? 'bg-primary' : step.status === 'current' ? 'bg-blue-500 animate-pulse' : 'bg-white/20'}`}>
                {step.status === 'completed' ? <CheckCircle className="w-4 h-4 text-background" /> : 
                 step.status === 'current' ? <Activity className="w-4 h-4 text-background" /> : 
                 <Target className="w-4 h-4 text-white/50" />}
              </div>
              
              <Link href={step.link || "https://github.com/keerthana-0712"} target="_blank" className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] block">
                <motion.div 
                  initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-primary/50 hover:bg-white/5 transition-all cursor-pointer group-hover:shadow-[0_0_20px_rgba(var(--primary),0.1)]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-lg flex items-center gap-2">
                      {step.title}
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                    </h4>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full 
                      ${step.status === 'completed' ? 'bg-primary/20 text-primary' : 
                        step.status === 'current' ? 'bg-blue-500/20 text-blue-400' : 'bg-white/10 text-muted-foreground'}`}>
                      {step.year}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </motion.div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Recruiter Details & Bookshelf Column */}
      <div className="lg:col-span-4 space-y-6">
        {/* Active Skill Focus Shelf */}
        <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-4">
          <h4 className="font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
            <Compass className="w-5 h-5 text-primary" />
            Active Tech Focus
          </h4>
          <div className="space-y-3">
            <div>
              <p className="text-[10px] text-primary font-bold uppercase tracking-wider">Currently Deep-Diving</p>
              <p className="text-sm font-semibold text-white mt-0.5">{currentDeepDive.title}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{currentDeepDive.desc}</p>
            </div>
            <div>
              <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Next Target Skillset</p>
              <p className="text-sm font-semibold text-white mt-0.5">{nextTarget.title}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{nextTarget.desc}</p>
            </div>
          </div>
        </div>

        {/* Reading List (Highly impressive for engineering culture) */}
        <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-4">
          <h4 className="font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            Engineering Bookshelf
          </h4>
          <div className="space-y-2.5">
            {books.map((b: any, idx: number) => {
              const isCompleted = b.status?.toLowerCase() === "completed";
              const isReading = b.status?.toLowerCase() === "reading";
              const tagClass = isCompleted 
                ? "bg-green-500/10 border-green-500/20 text-green-400"
                : isReading
                ? "bg-white/5 border-white/10 text-muted-foreground"
                : "bg-blue-500/10 border-blue-500/20 text-blue-400";
              return (
                <div key={idx} className="flex gap-2.5 items-start">
                  <div className={`px-1.5 py-0.5 rounded text-[9px] font-mono border uppercase shrink-0 mt-0.5 ${tagClass}`}>
                    {b.status}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">{b.title}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{b.author}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recruiter Cheat Sheet */}
        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 space-y-3">
          <h4 className="font-bold text-sm text-primary flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            Quick Recruiter Audit
          </h4>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Self-taught, production-hardened engineering approach with strong academic fundamentals in algorithms, networking, and system architecture design.
          </p>
          <Link 
            href="https://github.com/keerthana-0712" 
            target="_blank"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
          >
            Verify code repositories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  Network,
  Code2,
  Brain,
  Cloud,
  Activity,
  ShieldCheck,
  Layers,
  Settings,
  User,
  Briefcase,
  HelpCircle
} from "lucide-react";

const AVAILABLE_ICONS = {
  Rocket,
  Network,
  Code2,
  Brain,
  Cloud,
  Activity,
  ShieldCheck,
  Layers,
  Briefcase
};

export default function Services({ initialServices }: { initialServices?: any[] }) {
  const handleInquire = (serviceTitle: string) => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
    
    // Dispatch custom event to trigger contact form prefill and log entry
    setTimeout(() => {
      const event = new CustomEvent("inquire-service", {
        detail: { service: serviceTitle }
      });
      window.dispatchEvent(event);
    }, 600);
  };

  const serviceList = [
    {
      code: "PROD-01",
      title: "Product Engineering",
      desc: "Transforming ideas into scalable digital products through architecture, UX, performance, and business thinking.",
      usedIn: <span className="text-white">SaaS • Startups • Platforms</span>,
      tags: ["MVP", "Scaling", "Product"],
      bottomMeta: <span className="text-white">🚀 Idea to Scale</span>,
      icon: <Rocket className="h-5 w-5 text-accent" />
    },
    {
      code: "ARCH-02",
      title: "System Architecture",
      desc: "Designing fault-tolerant architectures that prevent technical debt and handle massive traffic spikes.",
      usedIn: <span className="text-white">Distributed Systems • APIs</span>,
      tags: ["Microservices", "Kafka", "Redis"],
      bottomMeta: <span className="text-white">🏢 Architected for 10x</span>,
      icon: <Network className="h-5 w-5 text-purple-400" />
    },
    {
      code: "FULL-03",
      title: "Full-Stack Engineering",
      desc: "High-performance applications bridging complex backends with intuitive, reactive frontends.",
      usedIn: <span className="text-white">Web Apps • Dashboards</span>,
      tags: ["Next.js", "TypeScript", "Node.js"],
      bottomMeta: <span className="text-white">⚙️ Seamless UX/DX</span>,
      icon: <Code2 className="h-5 w-5 text-blue-400" />
    },
    {
      code: "AI-04",
      title: "AI Systems",
      desc: "Building AI-powered workflows, assistants, embeddings, automation pipelines, and real-time intelligence.",
      usedIn: <span className="text-white">Chatbots • Automation</span>,
      tags: ["OpenAI", "RAG", "Agents"],
      bottomMeta: <span className="text-white">⚡ AI-Ready Systems</span>,
      icon: <Brain className="h-5 w-5 text-emerald-400" />
    },
    {
      code: "CLD-05",
      title: "Cloud Infrastructure",
      desc: "Deploying resilient infrastructure with containers, edge delivery, observability, and automation.",
      usedIn: <span className="text-white">Enterprise • High-Traffic</span>,
      tags: ["AWS", "Vercel", "Docker"],
      bottomMeta: <span className="text-white">☁️ Production Ready</span>,
      icon: <Cloud className="h-5 w-5 text-sky-400" />
    },
    {
      code: "PERF-06",
      title: "Performance Engineering",
      desc: "Auditing stacks to identify bottlenecks, optimize query costs, and automate CI/CD pipelines.",
      usedIn: <span className="text-white">Legacy Systems • Scaling</span>,
      tags: ["Profiling", "CI/CD", "Optimization"],
      bottomMeta: <span className="text-white">⏱️ Millisecond Sync</span>,
      icon: <Activity className="h-5 w-5 text-rose-400" />
    },
    {
      code: "SEC-07",
      title: "Security Engineering",
      desc: "Implementing authentication, authorization, API protection, secure architectures, and safeguards.",
      usedIn: <span className="text-white">FinTech • Enterprise SaaS</span>,
      tags: ["JWT", "OAuth", "Rate Limits"],
      bottomMeta: <span className="text-white">🔒 Secure by Design</span>,
      icon: <ShieldCheck className="h-5 w-5 text-yellow-400" />
    },
    {
      code: "UI-08",
      title: "UI Engineering",
      desc: "Crafting immersive interfaces with motion systems, responsive layouts, accessibility, and premium UX.",
      usedIn: <span className="text-white">Portfolios • Landing Pages</span>  ,
      tags: ["Framer Motion", "a11y", "Tailwind"],
      bottomMeta: <span className="text-white">✨ Pixel-Perfect UX</span>,
      icon: <Layers className="h-5 w-5 text-teal-400" />
    },
    {
      code: "BRAND-09",
      title: "Career & Profile Optimization",
      desc: "Polishing developer presence by optimizing LinkedIn profiles, tailoring resumes for target roles, and highlights-driven GitHub structuring.",
      usedIn: <span className="text-white">Developers • Job Seekers</span>,
      tags: ["Resume", "LinkedIn", "GitHub"],
      bottomMeta: <span className="text-white">📈 Elevate Your Brand</span>,
      icon: <Briefcase className="h-5 w-5 text-indigo-400" />
    }
  ];

  const list = initialServices && initialServices.length > 0
    ? initialServices.map((service, idx) => {
        const IconComponent = (AVAILABLE_ICONS as any)[service.icon] || HelpCircle;
        const iconColors = [
          "text-accent",
          "text-purple-400",
          "text-blue-400",
          "text-emerald-400",
          "text-sky-400",
          "text-rose-400",
          "text-yellow-400",
          "text-teal-400",
          "text-indigo-400"
        ];
        const colorClass = iconColors[idx % iconColors.length];

        return {
          ...service,
          usedIn: <span className="text-white">{service.usedIn}</span>,
          bottomMeta: <span className="text-white">{service.bottomMeta}</span>,
          icon: <IconComponent className={`h-5 w-5 ${colorClass}`} />
        };
      })
    : serviceList;


  return (
    <section id="services" className="py-24 bg-neutral-950/20 border-y border-border/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(var(--accent-rgb),0.02),transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div className="text-left">
            <p className="text-xs uppercase tracking-[0.3em] text-accent font-mono mb-3">
              <span className="font-bold"> ● Engineering Domains </span>
            </p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              View My{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #FFb58b, #ff8c5a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Services
              </span>
            </h2>
          </div>

          {/* Top-right pills */}
          <div className="flex items-center gap-4 text-xs font-mono bg-neutral border border-white/5 px-4 py-2 shrink-0 self-start md:self-auto">
            <span className="flex items-center gap-2">
              <Settings className="h-3.5 w-3.5 text-accent" />
              SYSTEMS: <span className="text-emerald-400 font-bold">SCALABLE</span>
            </span>
            <span className="text-neutral-800">|</span>
            <span className="flex items-center gap-2">
              <User className="h-3.5 w-3.5 text-accent" />
              OWNERSHIP: <span className="text-accent font-bold">E2E</span>
            </span>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {list.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-7 rounded-3xl bg-[#0f172a]/50 border border-[#1e293b]/60 hover:border-accent/20 hover:bg-[#0f172a]/70 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Card Top Row */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-2xl bg-[#1e293b]/40 border border-[#334155]/30 text-accent group-hover:border-accent/30 transition-colors flex items-center justify-center w-11 h-11">
                    {service.icon}
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground/30 tracking-widest uppercase">
                    {service.code}
                  </span>
                </div>

                {/* Title & Desc */}
                <h3 className="text-lg font-bold group-hover:text-accent transition-colors mb-2 tracking-tight text-left">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 text-left">
                  {service.desc}
                </p>

                {/* Used In Row */}
                <div className="text-xs text-muted-foreground/50 italic mb-4 text-left">
                  Used in: <span className="text-muted-foreground/75 font-medium not-italic">{service.usedIn}</span>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {(service.tags as string[]).map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-[10px] font-mono rounded-md bg-[#1e293b]/30 border border-[#334155]/20 text-muted-foreground/80 hover:text-white transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Footer Row */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-muted-foreground/60 text-left">
                <span>{service.bottomMeta}</span>
                <span 
                  onClick={() => handleInquire(service.title)}
                  className="text-accent/100 group-hover:text-accent group-hover:translate-x-0.5 transition-all cursor-pointer flex items-center gap-0.5"
                >
                  inquire &rarr;
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}




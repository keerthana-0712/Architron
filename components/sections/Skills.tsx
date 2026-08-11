"use client";

import { motion } from "framer-motion";
import { Server, Database, Cloud, Network, PenTool, LayoutTemplate, HelpCircle, Brain, Briefcase, Sparkles, Code2 } from "lucide-react";

const AVAILABLE_ICONS = {
  Network,
  Server,
  Database,
  LayoutTemplate,
  Cloud,
  PenTool,
  Brain,
  Briefcase,
  Sparkles
};

export default function Skills({ skillCategories }: { skillCategories?: any[] }) {
  const domains = [
    {
      title: "Backend Engineering",
      icon: <Server className="h-6 w-6 text-accent mb-4" />,
      skills: [
        "Python (FastAPI, Django & Flask)",
        "Node.js & Express.js Runtimes",
        "PostgreSQL, MongoDB & SQL Databases",
        "Distributed Tasks (Celery & Redis)",
        "RESTful & Asynchronous API Design"
      ]
    },
    {
      title: "Frontend Engineering",
      icon: <LayoutTemplate className="h-6 w-6 text-accent mb-4" />,
      skills: [
        "React & Next.js 15 (App Router)",
        "TypeScript & JavaScript (ES6+)",
        "HTML5 & CSS3 Styling Systems",
        "Tailwind CSS & Design Tokens",
        "UI Motion Systems (Framer Motion)"
      ]
    },
    {
      title: "System Design",
      icon: <Network className="h-6 w-6 text-accent mb-4" />,
      skills: [
        "Distributed Microservice Architectures",
        "Load Balancing & API Gateways",
        "Idempotent API Design",
        "High Availability (HA) & Resiliency"
      ]
    },
    {
      title: "Data Engineering",
      icon: <Database className="h-6 w-6 text-accent mb-4" />,
      skills: [
        "Apache Kafka (Message Streaming)",
        "PostgreSQL & SQL Query Optimization",
        "MongoDB NoSQL Document Models",
        "ETL/ELT Pipelines (dbt / Airflow)",
        "Cloud Data Warehouses (BigQuery)"
      ]
    },
    {
      title: "DevOps & Cloud",
      icon: <Cloud className="h-6 w-6 text-accent mb-4" />,
      skills: [
        "Docker (Containerization & Multi-Stage)",
        "Kubernetes (Container Orchestration)",
        "AWS (EKS, EC2, S3) & GCP Cloud",
        "GitOps & CI/CD (GitHub Actions)",
        "Infrastructure as Code (Terraform)"
      ]
    },
    {
      title: "Developer Tools & Workflow",
      icon: <Code2 className="h-6 w-6 text-accent mb-4" />,
      skills: [
        "Git & GitHub Version Control Workflows",
        "VS Code (IDE Tooling & Extensions)",
        "Figma (UI/UX Systems & Hand-off)",
        "AI-Assisted Development (Antigravity & Copilot)"
      ]
    },
    {
      title: "AI & Intelligent Systems",
      icon: <Brain className="h-6 w-6 text-accent mb-4" />,
      skills: [
        "LLM Integrations & Prompt Engineering",
        "Vector Databases (pgvector & Pinecone)",
        "Retrieval-Augmented Generation (RAG)",
        "Agentic Workflows (LangChain & CrewAI)"
      ]
    },
    {
      title: "AI Developer Tools",
      icon: <Sparkles className="h-6 w-6 text-accent mb-4" />,
      skills: [
        "Antigravity & Google Agentic AI",
        "Cursor, VS Code & GitHub Copilot",
        "Claude, ChatGPT & Gemini APIs",
        "v0, Bolt.new & Replit Agent",
        "Local LLMs (Ollama & Llama)"
      ]
    },
    {
      title: "Product & Project Management",
      icon: <Briefcase className="h-6 w-6 text-accent mb-4" />,
      skills: [
        "Agile/Scrum & Sprint Planning",
        "Product Roadmap & MVP Scoping",
        "Technical Spec Writing (RFCs)",
        "System Trade-Off & Cost Analysis"
      ]
    }
  ];

  const list = skillCategories && skillCategories.length > 0
    ? skillCategories.map(cat => {
        const IconComp = (AVAILABLE_ICONS as any)[cat.icon] || HelpCircle;
        return {
          title: cat.title,
          icon: <IconComp className="h-6 w-6 text-accent mb-4" />,
          skills: cat.skills.map((s: any) => s.name)
        };
      })
    : domains;

  const handleDomainClick = (title: string) => {
    const mappings: Record<string, string> = {
      "Currently Exploring Deep Into": "foths-ecosystem",
      "System Design": "foths-ecosystem",
      "Backend Engineering": "foths-ecosystem",
      "Data Engineering": "clientra-agency-os",
      "DevOps & Cloud": "clientra-agency-os",
      "Frontend Engineering": "ambassadors-for-the-lord",
      "Developer Tools & Workflow": "clientra-agency-os",
      "Performance & Ops": "documentation",
      "AI & Intelligent Systems": "foths-ecosystem",
      "AI Developer Tools": "foths-ecosystem",
      "Product & Project Management": "foths-ecosystem"
    };
    
    const targetId = mappings[title];
    if (targetId) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="skills" className="py-24 container mt-10">
      <div className="mb-16 max-w-none">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">Engineering Domains</h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          My expertise spans across the entire lifecycle of software systems, mapping fundamental components to high-performance applications. <span className="text-accent font-medium underline underline-offset-4 cursor-help">Click a domain to view its application.</span>
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Featured "Currently Exploring Deep Into" Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onClick={() => handleDomainClick("Currently Exploring Deep Into")}
          className="relative p-8 rounded-2xl bg-gradient-to-b from-emerald-500/10 via-card to-card border border-emerald-500/30 group hover:border-emerald-400/60 transition-all cursor-pointer shadow-lg shadow-emerald-500/5 hover:shadow-emerald-500/15 hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/20 transition-all" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌱</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active Focus
                </span>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
              Currently Exploring Deep Into
            </h3>

            <ul className="space-y-3 mt-4">
              {[
                "Docker (Containerization & Deployment)",
                "Redis (In-Memory Cache & Pub/Sub)",
                "Apache Kafka (Event Streaming & Queues)",
                "Kubernetes (Container Orchestration)",
                "AWS (Cloud Infrastructure & Services)"
              ].map((skill, idx) => (
                <li key={idx} className="text-muted-foreground text-sm flex items-center font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-3 group-hover:scale-125 transition-transform" />
                  <span className="text-foreground font-semibold">{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-border/40 text-xs font-mono text-emerald-400/90 font-medium flex items-center gap-1.5">
            <span>Next-Gen Cloud Native & Infra Stack</span>
          </div>
        </motion.div>

        {/* Standard Domain Cards */}
        {list.map((domain: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
            onClick={() => handleDomainClick(domain.title)}
            className="p-8 rounded-2xl bg-card border border-border group hover:border-accent/40 transition-all cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              {domain.icon}
              <h3 className="text-xl font-semibold mb-4 text-foreground">{domain.title}</h3>

              <ul className="space-y-3">
                {(domain.skills as string[]).map((skill: string, j: number) => (
                  <li key={j} className="text-muted-foreground text-sm flex items-center font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent/80 mr-3 group-hover:scale-125 transition-transform" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

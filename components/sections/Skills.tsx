"use client";

import { motion } from "framer-motion";
import { Server, Database, Cloud, Network, PenTool, LayoutTemplate } from "lucide-react";

export default function Skills() {
  const domains = [
    {
      title: "System Design",
      icon: <Network className="h-6 w-6 text-accent mb-4" />,
      skills: ["Distributed Systems", "Load Balancing", "Idempotent API Design", "High Availability (HA)"]
    },
    {
      title: "Backend Engineering",
      icon: <Server className="h-6 w-6 text-accent mb-4" />,
      skills: ["Event-Driven Node.js", "Java/Spring Ecosystem", "Reactive Systems", "Polyglot Microservices"]
    },
    {
      title: "Data Engineering",
      icon: <Database className="h-6 w-6 text-accent mb-4" />,
      skills: ["Advanced PostgreSQL", "Query Optimization", "ACID Compliance", "In-Memory Caching (Redis)"]
    },
    {
      title: "Frontend Engineering",
      icon: <LayoutTemplate className="h-6 w-6 text-accent mb-4" />,
      skills: ["State Management", "Static & Dynamic Rendering", "Optimistic UI Updates", "Design Systems"]
    },
    {
      title: "DevOps & Cloud",
      icon: <Cloud className="h-6 w-6 text-accent mb-4" />,
      skills: ["Docker Orchestration", "GitOps (GitHub Actions)", "Infrastructure as Code", "AWS EKS/S3/EC2"]
    },
    {
      title: "Performance & Ops",
      icon: <PenTool className="h-6 w-6 text-accent mb-4" />,
      skills: ["P99 Latency Monitoring", "Distributed Tracing", "Health Checks", "Chaos Engineering Principles"]
    }
  ];

  const handleDomainClick = (title: string) => {
    const mappings: Record<string, string> = {
      "System Design": "foths-ecosystem",
      "Backend Engineering": "foths-ecosystem",
      "Data Engineering": "clientra-agency-os",
      "DevOps & Cloud": "clientra-agency-os",
      "Frontend Engineering": "ambassadors-for-the-lord",
      "Performance & Ops": "documentation"
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
        {domains.map((domain, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            onClick={() => handleDomainClick(domain.title)}
            className="p-8 rounded-2xl bg-card border border-border group hover:border-accent/40 transition-all cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1"
          >
            {domain.icon}
            <h3 className="text-xl font-semibold mb-4 text-foreground">{domain.title}</h3>
            <ul className="space-y-3">
              {domain.skills.map((skill, j) => (
                <li key={j} className="text-muted-foreground text-sm flex items-center font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent/80 mr-3 group-hover:scale-125 transition-transform" />
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

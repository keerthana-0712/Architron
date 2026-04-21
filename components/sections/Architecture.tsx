"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Copy, Terminal, Info, Zap } from "lucide-react";
import { useState } from "react";

export default function Architecture() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const nodeDetails: Record<string, { title: string, desc: string, tech: string }> = {
    client: { title: "Next.js Client", desc: "Enterprise-grade React application utilizing App Router, SSR, and Edge Runtime for sub-100ms LCP.", tech: "Next.js, Vercel" },
    lb: { title: "API Gateway", desc: "Central ingress layer handling JWT validation, rate limiting, and intelligent request orchestration.", tech: "Nginx, Kong" },
    core: { title: "Core Domain", desc: "High-performance microservice managing complex business logic and state transitions via gRPC protocols.", tech: "Go, gRPC" },
    postgres: { title: "Primary DB", desc: "Relational storage optimized with multi-AZ replication, connection pooling, and B-tree indexing.", tech: "PostgreSQL" },
    redis: { title: "Cache Layer", desc: "Distributed in-memory store utilizing LRU eviction for session management and real-time analytical counters.", tech: "Redis" }
  };

  return (
    <section id="architecture" className="py-24 container relative mt-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">System Design Thinking</h2>
          <p className="text-muted-foreground text-lg max-w-none">
            Visualizations demonstrating robust engineering architectures, mimicking scalable enterprise environments.
          </p>
        </div>
        <div className="text-xs font-mono text-accent bg-accent/10 px-3 py-1.5 rounded-full flex items-center gap-2">
          <Zap size={12} /> Click nodes to inspect
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl border border-border bg-card overflow-hidden shadow-2xl relative"
      >
        <div className="border-b border-border bg-muted/50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <span className="text-sm font-mono text-muted-foreground ml-2 flex items-center gap-2">
              <Terminal size={14} /> cluster-topology.v1.drawio
            </span>
          </div>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Copy size={16} />
          </button>
        </div>

        {/* Abstract System Design Visualization Container */}
        <div className="p-12 lg:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-center gap-12 bg-[#020617]">
          
          <AnimatePresence>
            {activeNode && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute top-8 right-8 z-50 w-64 p-5 rounded-2xl bg-foreground text-background shadow-2xl"
              >
                <button onClick={() => setActiveNode(null)} className="absolute top-3 right-3 opacity-50 hover:opacity-100">✕</button>
                <div className="text-[10px] font-bold uppercase tracking-widest text-accent mb-1">{nodeDetails[activeNode].tech}</div>
                <h4 className="font-bold text-lg mb-2">{nodeDetails[activeNode].title}</h4>
                <p className="text-xs leading-relaxed opacity-80">{nodeDetails[activeNode].desc}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* User/Client */}
          <div 
            onClick={() => setActiveNode('client')}
            className={`flex flex-col items-center gap-3 group shrink-0 relative z-10 cursor-pointer transition-all ${activeNode === 'client' ? 'scale-110' : ''}`}
          >
            <div className={`w-16 h-16 rounded-2xl bg-card border-2 shadow-md flex items-center justify-center group-hover:border-accent group-hover:shadow-accent/20 transition-all ${activeNode === 'client' ? 'border-accent shadow-accent/40' : 'border-border'}`}>
              <span className="font-mono font-bold text-sm">Client</span>
            </div>
          </div>

          <div className="w-12 md:w-24 h-px bg-border/80 border-t border-dashed border-border/80 relative hidden md:block" />

          {/* Load Balancer */}
          <div 
            onClick={() => setActiveNode('lb')}
            className={`flex flex-col items-center gap-3 group shrink-0 relative z-10 cursor-pointer transition-all ${activeNode === 'lb' ? 'scale-110' : ''}`}
          >
            <div className={`w-16 h-16 rounded-full bg-secondary border-2 overflow-hidden shadow-md flex items-center justify-center relative transition-all ${activeNode === 'lb' ? 'border-accent' : 'border-secondary'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent mix-blend-overlay"></div>
              <span className="font-mono font-bold text-secondary-foreground text-sm z-10">LB</span>
            </div>
          </div>

          <div className="w-12 md:w-16 h-px bg-border/80 border-t border-dashed border-border/80 relative hidden md:block" />

          {/* Microservices Cluster */}
          <div className="flex flex-col gap-6 relative z-10 shrink-0">
            <div 
              onClick={() => setActiveNode('core')}
              className={`w-40 border-2 rounded-2xl p-4 bg-background shadow-md cursor-pointer transition-all hover:border-accent/40 ${activeNode === 'core' ? 'border-accent scale-105' : 'border-border'}`}
            >
              <span className="text-[10px] font-mono font-bold text-muted-foreground block mb-2 px-1 uppercase tracking-tighter">Core Service</span>
              <div className="flex gap-1 h-1.5">
                <div className="w-full bg-accent rounded-full"></div>
              </div>
            </div>
            <div className="w-40 border-2 border-border/20 rounded-2xl p-4 bg-muted/20 shadow-sm opacity-60">
              <span className="text-[10px] font-mono font-bold text-muted-foreground/90 block mb-2 px-1 uppercase tracking-tighter italic text-center text-white/70">Auth Service</span>
            </div>
          </div>

          <div className="w-12 md:w-16 h-px bg-border/80 border-t border-dashed border-border/80 relative hidden md:block" />

          {/* Databases */}
          <div className="flex flex-col gap-6 items-center relative z-10 shrink-0">
            <div 
              onClick={() => setActiveNode('postgres')}
              className={`w-20 h-24 rounded-t-full rounded-b-2xl border-2 bg-card shadow-inner flex items-center justify-center cursor-pointer transition-all group ${activeNode === 'postgres' ? 'border-accent scale-110 shadow-accent/10' : 'border-border'}`}
            >
              <span className={`font-mono text-xs font-bold rotate-90 w-max translate-x-1 transition-colors ${activeNode === 'postgres' ? 'text-accent' : ''}`}>DB/Postgres</span>
            </div>
            <div 
              onClick={() => setActiveNode('redis')}
              className={`w-20 h-14 rounded-2xl border-2 bg-card shadow-sm flex items-center justify-center cursor-pointer transition-all ${activeNode === 'redis' ? 'border-accent scale-110' : 'border-border'}`}
            >
              <span className={`font-mono text-xs font-bold transition-colors ${activeNode === 'redis' ? 'text-accent' : 'text-muted-foreground'}`}>Cache</span>
            </div>
          </div>

          {/* Decorative background grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] z-0"></div>
        </div>

        <div className="bg-background border-t border-border p-8 flex flex-col md:flex-row gap-12 justify-between">
          <div className="space-y-4 max-w-xl">
            <h3 className="font-bold text-xl text-foreground flex items-center gap-2">
              <Info size={18} className="text-accent" /> Structural Rationale
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Implemented with <strong>High Availability (HA)</strong> in mind. The dual-path caching strategy (Redis) reduces expensive PostgreSQL joins, while the API Gateway ensures single-responsibility for ingress traffic management.
            </p>
          </div>
          <div className="flex flex-col gap-4 md:w-64 shrink-0 justify-center">
             <div className="flex justify-between items-end border-b border-border pb-2">
               <span className="text-[10px] uppercase font-bold text-muted-foreground">Est. Throughput</span>
               <span className="font-mono font-bold text-accent">5k req/s</span>
             </div>
             <div className="flex justify-between items-end border-b border-border pb-2">
               <span className="text-[10px] uppercase font-bold text-muted-foreground">Persistence</span>
               <span className="font-mono font-bold text-accent">ACID Compliant</span>
             </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

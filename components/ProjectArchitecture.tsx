"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Terminal, Database, Cpu, Layout, Server, Zap } from "lucide-react";

interface Node {
  id: string;
  label: string;
  type: "client" | "service" | "db" | "queue" | "cache";
  details: string;
  tech: string;
}

interface Connection {
  from: string;
  to: string;
  label?: string;
}

interface ProjectArchitectureProps {
  nodes: Node[];
  connections: Connection[];
  title: string;
}

export default function ProjectArchitecture({ nodes, connections, title }: ProjectArchitectureProps) {
  const [activeNode, setActiveNode] = useState<Node | null>(null);

  const getIcon = (type: Node["type"]) => {
    switch (type) {
      case "client": return <Layout size={20} />;
      case "service": return <Cpu size={20} />;
      case "db": return <Database size={20} />;
      case "queue": return <Terminal size={20} />;
      case "cache": return <Server size={20} />;
      default: return <Zap size={20} />;
    }
  };

  return (
    <div className="relative w-full min-h-[400px] bg-muted/30 rounded-2xl border border-border/50 overflow-hidden p-8 flex flex-col items-center justify-center">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <div className="absolute top-4 left-6 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{title} Cluster</span>
      </div>

      <div className="relative z-10 flex flex-wrap justify-center gap-12 items-center max-w-3xl">
        {nodes.map((node, i) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setActiveNode(node)}
            className={`cursor-pointer group relative flex flex-col items-center gap-3 transition-all ${activeNode?.id === node.id ? 'scale-110' : 'hover:scale-105'}`}
          >
             <div className={`w-20 h-20 rounded-2xl flex items-center justify-center border-2 transition-all shadow-md
               ${activeNode?.id === node.id 
                 ? 'border-accent bg-accent/10 shadow-accent/20' 
                 : 'border-border bg-card group-hover:border-accent/50'}`}
             >
               <div className={`${activeNode?.id === node.id ? 'text-accent' : 'text-muted-foreground'}`}>
                 {getIcon(node.type)}
               </div>
             </div>
             <span className="text-xs font-bold text-foreground font-mono">{node.label}</span>
             
             {/* Connection indicators could be added here if needed, but for simpler layout we use flex/gap */}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeNode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-12 w-full max-w-xl p-6 rounded-xl bg-card border border-border shadow-xl relative"
          >
            <button 
              onClick={() => setActiveNode(null)} 
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-accent/10 text-accent">
                {getIcon(activeNode.type)}
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-widest text-accent">{activeNode.tech}</div>
                <h4 className="text-lg font-bold">{activeNode.label}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {activeNode.details}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!activeNode && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-[11px] font-mono text-muted-foreground/90 flex items-center gap-2"
        >
          <Zap size={12} /> Click components for architectural deep-dive
        </motion.div>
      )}
    </div>
  );
}

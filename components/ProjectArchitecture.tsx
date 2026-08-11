"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Terminal, Database, Cpu, Layout, Server, Zap, Play } from "lucide-react";
import { Node, Connection, OperationalFlow } from "@/lib/projects";

interface ProjectArchitectureProps {
  nodes: Node[];
  connections: Connection[];
  flows: OperationalFlow[];
  title: string;
}

export default function ProjectArchitecture({ nodes, connections, flows, title }: ProjectArchitectureProps) {
  const [activeNode, setActiveNode] = useState<Node | null>(null);
  const [activeFlow, setActiveFlow] = useState<OperationalFlow | null>(null);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    if (!activeFlow) {
      setLogIndex(-1);
      return;
    }
    setLogIndex(0);
    const interval = setInterval(() => {
      setLogIndex(prev => {
        if (prev < activeFlow.steps.length - 1) return prev + 1;
        return prev;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [activeFlow]);

  const getIcon = (type: Node["type"]) => {
    switch (type) {
      case "client": return <Layout className="h-5 w-5 md:h-6 md:w-6" />;
      case "service": return <Cpu className="h-5 w-5 md:h-6 md:w-6" />;
      case "db": return <Database className="h-5 w-5 md:h-6 md:w-6" />;
      case "queue": return <Terminal className="h-5 w-5 md:h-6 md:w-6" />;
      case "cache": return <Server className="h-5 w-5 md:h-6 md:w-6" />;
      default: return <Zap className="h-5 w-5 md:h-6 md:w-6" />;
    }
  };

  const getFlowPathString = (pathIds: string[]) => {
    const points = pathIds
      .map(id => nodes.find(n => n.id === id))
      .filter((n): n is Node => !!n);
    if (points.length < 2) return "";
    return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  };

  const isConnectionInActiveFlow = (from: string, to: string) => {
    if (!activeFlow) return false;
    const path = activeFlow.path;
    for (let i = 0; i < path.length - 1; i++) {
      if (path[i] === from && path[i + 1] === to) return i <= logIndex;
    }
    return false;
  };

  const isNodeInActiveFlow = (nodeId: string) => {
    if (!activeFlow) return false;
    const idx = activeFlow.path.indexOf(nodeId);
    return idx !== -1 && idx <= logIndex;
  };

  return (
    <div className="space-y-6 w-full">
      <style>{`
        @keyframes flow-dash {
          to { stroke-dashoffset: -20; }
        }
      `}</style>

      {/* Flow Tabs */}
      {flows && flows.length > 0 && (
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
            <Play size={10} className="text-accent" /> Run Operational Request Simulations
          </span>
          <div className="flex flex-wrap gap-2 w-full justify-center">
            {flows.map(flow => (
              <button
                key={flow.name}
                onClick={() => { setActiveFlow(flow); setActiveNode(null); }}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all border ${
                  activeFlow?.name === flow.name
                    ? "bg-accent text-black border-accent shadow-lg shadow-accent/20"
                    : "bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-zinc-500 hover:text-zinc-200"
                }`}
              >
                {flow.name}
              </button>
            ))}
            {activeFlow && (
              <button
                onClick={() => { setActiveFlow(null); setActiveNode(null); }}
                className="px-4 py-2 rounded-full text-xs font-mono font-bold bg-zinc-900 text-zinc-500 border border-zinc-800 hover:text-zinc-300 transition-colors"
              >
                Reset Canvas
              </button>
            )}
          </div>
        </div>
      )}

      {/* Diagram Canvas */}
      <div className="relative w-full h-[380px] md:h-[450px] bg-black rounded-3xl border border-zinc-800 overflow-hidden p-8 flex items-center justify-center hover:border-zinc-700 transition-colors duration-300">
        {/* Dot grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
        {/* Accent border glow */}
        <div className="absolute inset-0 border border-accent/10 rounded-3xl pointer-events-none z-0" />

        {/* Title Tag */}
        <div className="absolute top-4 left-6 flex items-center gap-2 z-10">
          <div className={`w-2 h-2 rounded-full ${activeFlow ? 'bg-accent animate-pulse' : 'bg-zinc-700'}`} />
          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
            {title} {activeFlow ? `| SIMULATION ACTIVE` : `| TOPOLOGY`}
          </span>
        </div>

        {/* SVG Connections */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {connections.map((conn, idx) => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;
            const isActive = isConnectionInActiveFlow(conn.from, conn.to);
            return (
              <g key={idx}>
                {isActive && (
                  <line
                    x1={fromNode.x} y1={fromNode.y}
                    x2={toNode.x} y2={toNode.y}
                    className="stroke-accent/30 stroke-[1.5] blur-[2px]"
                  />
                )}
                <line
                  x1={fromNode.x} y1={fromNode.y}
                  x2={toNode.x} y2={toNode.y}
                  className={`transition-all duration-500 ${
                    isActive ? "stroke-accent stroke-[0.8]" : "stroke-zinc-800 stroke-[0.4]"
                  }`}
                />
              </g>
            );
          })}

          {activeFlow && (
            <path
              d={getFlowPathString(activeFlow.path)}
              fill="none"
              className="stroke-accent stroke-[1.2] opacity-80"
              style={{ strokeDasharray: "4 8", animation: "flow-dash 1.5s linear infinite" }}
            />
          )}
        </svg>

        {/* Nodes */}
        <div className="absolute inset-0 w-full h-full z-20 pointer-events-none">
          {nodes.map((node) => {
            const isHighlighted = isNodeInActiveFlow(node.id);
            const isCurrentlySelected = activeNode?.id === node.id;
            return (
              <div
                key={node.id}
                style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
                onClick={() => { setActiveNode(node); setActiveFlow(null); }}
                className={`absolute cursor-pointer pointer-events-auto flex flex-col items-center gap-2 group transition-all duration-300 ${
                  isCurrentlySelected ? "scale-110" : "hover:scale-105"
                }`}
              >
                <div className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl flex flex-col items-center justify-center border transition-all duration-500 shadow-md ${
                  isCurrentlySelected
                    ? "border-accent bg-accent/10 shadow-accent/20"
                    : isHighlighted
                    ? "border-accent/80 bg-accent/5 shadow-accent/10 animate-pulse"
                    : "border-zinc-800 bg-zinc-900 group-hover:border-zinc-600"
                }`}>
                  <div className={`transition-colors duration-500 ${
                    isCurrentlySelected || isHighlighted ? "text-accent" : "text-zinc-500 group-hover:text-zinc-300"
                  }`}>
                    {getIcon(node.type)}
                  </div>
                  <span className="hidden md:block text-[8px] font-mono text-zinc-600 mt-1 uppercase tracking-tighter">
                    {node.tech.split(" ")[0]}
                  </span>
                </div>
                <span className={`text-[10px] md:text-xs font-bold font-mono transition-colors duration-300 ${
                  isCurrentlySelected || isHighlighted ? "text-accent" : "text-zinc-500 group-hover:text-zinc-300"
                }`}>
                  {node.label}
                </span>
              </div>
            );
          })}
        </div>

        {!activeNode && !activeFlow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-mono text-zinc-600 flex items-center gap-1.5"
          >
            <Zap size={10} className="text-accent" /> Click any component node for technical specifications
          </motion.div>
        )}
      </div>

      {/* Console Log Block */}
      {activeFlow && (
        <div className="w-full rounded-2xl border border-zinc-800 bg-black font-mono text-xs text-zinc-500 overflow-hidden shadow-2xl">
          <div className="bg-zinc-900 px-4 py-2 border-b border-zinc-800 flex items-center justify-between text-[9px] text-zinc-500 font-bold uppercase tracking-widest">
            <span>Execution Flow Log (Sequenced)</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              <span>LOGS STREAMING</span>
            </div>
          </div>
          <div className="p-4 space-y-2 max-h-[160px] overflow-y-auto">
            {activeFlow.steps.map((step, idx) => {
              const isCurrent = idx <= logIndex;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: isCurrent ? 1 : 0.15, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`leading-relaxed transition-colors duration-500 ${
                    isCurrent ? "text-accent" : "text-zinc-700"
                  }`}
                >
                  {step}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Node Detail Card */}
      <AnimatePresence>
        {activeNode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="w-full p-6 rounded-2xl bg-zinc-900 border border-zinc-700 shadow-2xl relative"
          >
            <button
              onClick={() => setActiveNode(null)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white font-bold font-mono transition-colors text-sm"
            >
              ✕
            </button>
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-xl bg-accent/10 text-accent border border-accent/20">
                {getIcon(activeNode.type)}
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[9px] font-bold font-mono bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded text-zinc-400 uppercase">
                    TYPE: {activeNode.type}
                  </span>
                  <span className="text-[9px] font-bold font-mono bg-accent/15 border border-accent/30 px-2 py-0.5 rounded text-accent uppercase">
                    TECH: {activeNode.tech}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">{activeNode.label}</h4>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-3xl">
                  {activeNode.details}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

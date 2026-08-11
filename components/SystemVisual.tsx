"use client";

import React from "react";
import { motion } from "framer-motion";
import { Terminal, Server, Database, Cpu, Globe } from "lucide-react";

export default function SystemVisual() {
  return (
    <div className="relative w-full h-[400px] max-w-md mx-auto flex items-center justify-center overflow-visible select-none pointer-events-none">
      {/* Glow Behind Center */}
      <div className="absolute w-72 h-72 bg-accent/15 rounded-full blur-[80px] z-0" />

      {/* Orbit Rings */}
      <div className="absolute w-[240px] h-[240px] rounded-full border border-border/40 z-0" />
      <div className="absolute w-[360px] h-[360px] rounded-full border border-border/20 border-dashed z-0" />

      {/* Core Terminal Node */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-lg shadow-accent/20 z-20"
      >
        <Terminal className="text-black h-8 w-8 animate-pulse" />
      </motion.div>

      {/* Inner Orbit (API & DB Nodes) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="absolute w-[240px] h-[240px]"
      >
        {/* API Node (Top) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center shadow-md shadow-black/30 pointer-events-auto cursor-pointer hover:border-accent/50 transition-colors"
        >
          <Server className="text-accent h-5 w-5" />
        </motion.div>

        {/* Database Node (Bottom) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center shadow-md shadow-black/30 pointer-events-auto cursor-pointer hover:border-accent/50 transition-colors"
        >
          <Database className="text-purple-400 h-5 w-5" />
        </motion.div>
      </motion.div>

      {/* Outer Orbit (Cloud & CDN Nodes) */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        className="absolute w-[360px] h-[360px]"
      >
        {/* CDN Node (Left) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center shadow-md shadow-black/30 pointer-events-auto cursor-pointer hover:border-accent/50 transition-colors"
        >
          <Globe className="text-blue-400 h-5 w-5" />
        </motion.div>

        {/* Compute Engine Node (Right) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center shadow-md shadow-black/30 pointer-events-auto cursor-pointer hover:border-accent/50 transition-colors"
        >
          <Cpu className="text-emerald-400 h-5 w-5" />
        </motion.div>
      </motion.div>

      {/* Floating Code Visualizers */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-mono text-[10px] text-muted-foreground/60 flex items-center gap-4">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
          API: 200 OK (14ms)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
          CPU: 12%
        </span>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { Activity, Gauge, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface TrafficSimProps {
  baseThroughput: string;
  baseLatency: string;
}

export default function TrafficSimulator({ baseThroughput, baseLatency }: TrafficSimProps) {
  const initialThroughput = parseFloat(baseThroughput);
  const initialLatency = parseFloat(baseLatency);
  
  const [throughput, setThroughput] = useState(isNaN(initialThroughput) ? 0 : initialThroughput);
  const [latency, setLatency] = useState(isNaN(initialLatency) ? 0 : initialLatency);
  const [healthScore, setHealthScore] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      // Add slight jitter for realism
      setThroughput(prev => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
      setLatency(prev => +(prev + (Math.random() * 2 - 1)).toFixed(1));
      
      // Randomly drop health score occasionally
      if (Math.random() > 0.9) {
        setHealthScore(prev => Math.max(98, +(prev - Math.random() * 0.5).toFixed(2)));
      } else if (healthScore < 100) {
        setHealthScore(prev => Math.min(100, +(prev + 0.1).toFixed(2)));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [healthScore]);

  return (
    <div className="p-6 rounded-2xl bg-card border border-border mt-12 overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-4 opacity-5 bg-foreground rounded-bl-3xl">
        <Activity size={80} />
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center animate-pulse">
           <Activity size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Live Telemetry Simulation</h4>
          <p className="text-[10px] text-muted-foreground font-mono">Real-time performance metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5">
            <Gauge size={10} /> Throughput
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold font-mono text-foreground">{throughput}k</span>
            <span className="text-[10px] text-muted-foreground">req/s</span>
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5">
            <Activity size={10} /> P99 Latency
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold font-mono text-foreground">{latency}</span>
            <span className="text-[10px] text-muted-foreground">ms</span>
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5">
            <CheckCircle2 size={10} /> System Health
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold font-mono text-accent">{healthScore}%</span>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
         <div className="flex gap-2">
            {[...Array(20)].map((_, i) => (
              <motion.div 
                key={i}
                initial={{ height: 2 }}
                animate={{ height: Math.random() * 20 + 4 }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", delay: i * 0.05 }}
                className="w-1 bg-accent/20 rounded-full"
              />
            ))}
         </div>
         <div className="text-[10px] font-mono text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
           US-EAST-1 Active
         </div>
      </div>
    </div>
  );
}

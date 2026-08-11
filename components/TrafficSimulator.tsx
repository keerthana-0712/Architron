"use client";

import { useState, useEffect, useRef } from "react";
import { Activity, Gauge, CheckCircle2, AlertTriangle, ShieldAlert, Cpu, Database, Server } from "lucide-react";

interface TrafficSimProps {
  baseThroughput: string;
  baseLatency: string;
}

export default function TrafficSimulator({ baseThroughput, baseLatency }: TrafficSimProps) {
  const rawThroughput = parseFloat(baseThroughput.replace(/[^\d.]/g, ""));
  const rawLatency = parseFloat(baseLatency.replace(/[^\d.]/g, ""));

  const defaultThroughputK = isNaN(rawThroughput) ? 10 : rawThroughput;
  const defaultLatencyMs = isNaN(rawLatency) ? 100 : rawLatency;

  const [loadSlider, setLoadSlider] = useState(defaultThroughputK * 1000);
  const [caching, setCaching] = useState(true);
  const [autoscaling, setAutoscaling] = useState(true);
  const [rateLimiter, setRateLimiter] = useState(false);

  const [throughput, setThroughput] = useState(defaultThroughputK * 1000);
  const [latency, setLatency] = useState(defaultLatencyMs);
  const [healthScore, setHealthScore] = useState(100);
  const [replicas, setReplicas] = useState(1);
  const [logs, setLogs] = useState<string[]>([]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const computedReplicas = autoscaling
      ? Math.min(10, Math.max(1, Math.ceil(loadSlider / 12000)))
      : 1;
    setReplicas(computedReplicas);

    let computedThroughput = loadSlider;
    let blockedRequests = 0;
    if (rateLimiter) {
      const limit = 20000;
      if (loadSlider > limit) {
        computedThroughput = limit;
        blockedRequests = loadSlider - limit;
      }
    }
    const fluctuation = (Math.random() * 0.02 - 0.01) * computedThroughput;
    setThroughput(Math.max(100, +(computedThroughput + fluctuation).toFixed(0)));

    const baseWait = caching ? 18 : defaultLatencyMs;
    const loadPerNode = loadSlider / computedReplicas;
    const congestionFactor = Math.max(0, (loadPerNode - 8000) / 10000);
    let computedLatency = baseWait + (congestionFactor * congestionFactor * 45);
    if (!caching && loadSlider > 15000) computedLatency += (loadSlider - 15000) * 0.012;
    computedLatency += (Math.random() * 6 - 3);
    const finalLatency = Math.max(10, Math.min(2500, +computedLatency.toFixed(1)));
    setLatency(finalLatency);

    let computedHealth = 100;
    if (finalLatency > 250) computedHealth -= (finalLatency - 250) * 0.25;
    if (!autoscaling && loadSlider > 30000 && !caching) computedHealth -= (loadSlider - 30000) * 0.0008;
    setHealthScore(Math.max(5, Math.min(100, +computedHealth.toFixed(1))));

    const timestamp = new Date().toLocaleTimeString();
    const newLogs: string[] = [];
    newLogs.push(`[${timestamp}] [INGRESS] Current Load: ${(loadSlider / 1000).toFixed(1)}k req/s`);
    if (rateLimiter && blockedRequests > 0)
      newLogs.push(`[${timestamp}] [RATE_LIMITER] HTTP 429: Dropped ${(blockedRequests / 1000).toFixed(1)}k req/s.`);
    if (caching)
      newLogs.push(`[${timestamp}] [REDIS] Cache Hit: 94.6%. Egress bypassed SQL compilation.`);
    else
      newLogs.push(`[${timestamp}] [DB_CLUSTER] Direct Query: 100% database read path active.`);
    if (autoscaling)
      newLogs.push(`[${timestamp}] [HPA] Replicas: ${computedReplicas}/10. CPU avg: ${((loadSlider / (computedReplicas * 15000)) * 100).toFixed(0)}%`);
    else
      newLogs.push(`[${timestamp}] [POD_WARNING] Replica pinned at 1. No autoscaler loaded.`);
    if (finalLatency > 400)
      newLogs.push(`[${timestamp}] [ERR_THREAD] Threadpool Saturation. P99: ${finalLatency}ms`);
    else if (finalLatency > 150)
      newLogs.push(`[${timestamp}] [WARN_SYS] Degrading. High TCP wait state.`);
    else
      newLogs.push(`[${timestamp}] [SYS_HEALTH] Latency normal. Load balanced round-robin active.`);

    setLogs(prev => [...prev, ...newLogs].slice(-15));
  }, [loadSlider, caching, autoscaling, rateLimiter, defaultLatencyMs]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 relative group overflow-hidden hover:border-zinc-700 transition-colors duration-300">
      {/* Background icon */}
      <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
        <Activity size={80} className="text-white" />
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 text-accent flex items-center justify-center animate-pulse">
          <Activity size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-white">Live Telemetry Sandbox</h4>
          <p className="text-[10px] text-zinc-500 font-mono">Simulate real system bottlenecks</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-2 py-4 border-y border-zinc-800 mb-6">
        <div className="space-y-1">
          <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase flex items-center gap-1">
            <Gauge size={10} /> Throughput
          </span>
          <div className="flex items-baseline gap-0.5">
            <span className="text-lg font-bold font-mono text-white">{(throughput / 1000).toFixed(1)}k</span>
            <span className="text-[9px] font-mono text-zinc-600">req/s</span>
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase flex items-center gap-1">
            <Activity size={10} /> P99 Latency
          </span>
          <div className="flex items-baseline gap-0.5">
            <span className={`text-lg font-bold font-mono ${latency > 400 ? 'text-red-400 animate-pulse' : latency > 150 ? 'text-yellow-400' : 'text-white'}`}>{latency}</span>
            <span className="text-[9px] font-mono text-zinc-600">ms</span>
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase flex items-center gap-1">
            <CheckCircle2 size={10} /> Health
          </span>
          <div className="flex items-baseline">
            <span className={`text-lg font-bold font-mono ${healthScore < 60 ? 'text-red-400' : healthScore < 90 ? 'text-yellow-400' : 'text-accent'}`}>{healthScore}%</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] font-mono font-bold">
            <span className="text-zinc-500">SIMULATED TRAFFIC LOAD</span>
            <span className="text-accent">{(loadSlider / 1000).toFixed(0)}k req/s</span>
          </div>
          <input
            type="range"
            min="100"
            max="100000"
            step="500"
            value={loadSlider}
            onChange={(e) => setLoadSlider(parseInt(e.target.value))}
            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-accent"
          />
        </div>

        <div className="grid grid-cols-1 gap-2 pt-2 text-xs font-mono text-zinc-400">
          {/* Redis Cache Toggle */}
          <label className="flex items-center justify-between p-2 rounded-lg bg-black border border-zinc-800 hover:border-zinc-700 cursor-pointer transition-colors">
            <div className="flex items-center gap-2">
              <Server size={14} className={caching ? "text-accent" : "text-zinc-600"} />
              <span className={caching ? "text-zinc-300" : "text-zinc-500"}>Redis Cache Layer</span>
            </div>
            <input type="checkbox" checked={caching} onChange={() => setCaching(!caching)} className="sr-only peer" />
            <div className="relative w-8 h-4 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-zinc-500 after:border after:border-zinc-700 after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-accent peer-checked:after:bg-black" />
          </label>

          {/* Autoscaling Toggle */}
          <label className="flex items-center justify-between p-2 rounded-lg bg-black border border-zinc-800 hover:border-zinc-700 cursor-pointer transition-colors">
            <div className="flex items-center gap-2">
              <Cpu size={14} className={autoscaling ? "text-accent" : "text-zinc-600"} />
              <div className="flex flex-col">
                <span className={autoscaling ? "text-zinc-300" : "text-zinc-500"}>Horizontal Pod Scaling</span>
                <span className="text-[8px] text-zinc-600">Pods: {replicas} / 10</span>
              </div>
            </div>
            <input type="checkbox" checked={autoscaling} onChange={() => setAutoscaling(!autoscaling)} className="sr-only peer" />
            <div className="relative w-8 h-4 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-zinc-500 after:border after:border-zinc-700 after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-accent peer-checked:after:bg-black" />
          </label>

          {/* Rate Limiter Toggle */}
          <label className="flex items-center justify-between p-2 rounded-lg bg-black border border-zinc-800 hover:border-zinc-700 cursor-pointer transition-colors">
            <div className="flex items-center gap-2">
              <Database size={14} className={rateLimiter ? "text-accent" : "text-zinc-600"} />
              <span className={rateLimiter ? "text-zinc-300" : "text-zinc-500"}>Ingress Rate Limiting (HTTP 429)</span>
            </div>
            <input type="checkbox" checked={rateLimiter} onChange={() => setRateLimiter(!rateLimiter)} className="sr-only peer" />
            <div className="relative w-8 h-4 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-zinc-500 after:border after:border-zinc-700 after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-accent peer-checked:after:bg-black" />
          </label>
        </div>
      </div>

      {/* Health Warning */}
      {healthScore < 80 && (
        <div className="mt-4 p-2.5 rounded-lg border border-red-900/40 bg-red-950/20 text-red-400 text-[10px] font-mono flex items-start gap-2 animate-pulse">
          {healthScore < 50 ? <ShieldAlert size={14} className="shrink-0 mt-0.5" /> : <AlertTriangle size={14} className="shrink-0 mt-0.5" />}
          <div>
            <span className="font-bold uppercase">{healthScore < 50 ? 'CRITICAL OUTAGE RISK:' : 'SYSTEM DEGRADATION:'} </span>
            {healthScore < 50
              ? 'WebSocket drops. CPU exhausted on primary node. Connections bottlenecked.'
              : 'P99 Latency exceeds SLAs. Direct queries locking database rows.'}
          </div>
        </div>
      )}

      {/* Terminal */}
      <div className="mt-6">
        <div className="bg-zinc-900 border border-zinc-800 border-b-0 px-3 py-1.5 rounded-t-lg flex items-center justify-between text-[9px] font-mono text-zinc-500 font-bold uppercase tracking-widest">
          <span>Sandbox Shell Terminal</span>
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </div>
        <div className="h-[120px] rounded-b-lg border border-zinc-800 bg-black p-3 font-mono text-[9px] text-zinc-500 overflow-y-auto space-y-1.5">
          {logs.map((log, i) => (
            <div key={i} className="leading-normal break-all">
              <span className="text-accent">&gt;</span> {log}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
}

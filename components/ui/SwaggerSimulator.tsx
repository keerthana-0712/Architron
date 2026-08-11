"use client";

import { useState } from "react";
import { Play, Code, ChevronDown, ChevronUp } from "lucide-react";

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  desc: string;
}

interface Endpoint {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  desc: string;
  parameters: Parameter[];
  response: string;
}

interface SwaggerSimulatorProps {
  endpoints: Endpoint[];
}

export default function SwaggerSimulator({ endpoints }: SwaggerSimulatorProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [outputs, setOutputs] = useState<Record<number, string>>({});
  const [executing, setExecuting] = useState<Record<number, boolean>>({});

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleInputChange = (path: string, paramName: string, value: string) => {
    setInputs(prev => ({ ...prev, [`${path}_${paramName}`]: value }));
  };

  const executeEndpoint = (index: number, endpoint: Endpoint) => {
    setExecuting(prev => ({ ...prev, [index]: true }));
    
    // Simulate API fetch delay
    setTimeout(() => {
      setExecuting(prev => ({ ...prev, [index]: false }));
      
      // Attempt to render customized output if query inputs exist
      let responseObj = JSON.parse(endpoint.response);
      
      // Inject query parameters dynamically to make simulator feel alive
      endpoint.parameters.forEach(p => {
        const val = inputs[`${endpoint.path}_${p.name}`];
        if (val && responseObj.data) {
          if (Array.isArray(responseObj.data)) {
            // Apply simple filter logic
          } else {
            responseObj.data[p.name] = val;
          }
        }
      });

      setOutputs(prev => ({
        ...prev,
        [index]: JSON.stringify(responseObj, null, 2)
      }));
    }, 800);
  };

  const methodColors = {
    GET: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    POST: "bg-green-500/10 text-green-400 border-green-500/20",
    PUT: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    DELETE: "bg-red-500/10 text-red-400 border-red-500/20"
  };

  const methodBadge = {
    GET: "bg-blue-500 text-white",
    POST: "bg-green-500 text-white",
    PUT: "bg-yellow-500 text-black",
    DELETE: "bg-red-500 text-white"
  };

  return (
    <div className="rounded-xl border border-border/40 overflow-hidden bg-card/20 backdrop-blur font-mono text-sm text-foreground">
      <div className="p-4 border-b border-border/40 bg-card/30 flex items-center justify-between">
        <span className="font-bold text-accent text-xs uppercase tracking-widest flex items-center gap-2">
          <Code size={14} /> Swagger API Test Sandbox
        </span>
        <span className="text-[10px] text-muted-foreground">SWAGGER v3.0.0</span>
      </div>

      <div className="divide-y divide-border/20">
        {endpoints.map((ep, idx) => {
          const isExpanded = expandedIndex === idx;
          const isExecuting = executing[idx] || false;
          const hasOutput = outputs[idx] !== undefined;

          return (
            <div key={idx} className="overflow-hidden">
              {/* Header Toggle */}
              <button
                onClick={() => toggleExpand(idx)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-card/30 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${methodBadge[ep.method]}`}>
                    {ep.method}
                  </span>
                  <span className="font-bold tracking-tight text-xs md:text-sm text-foreground font-mono">
                    {ep.path}
                  </span>
                  <span className="text-xs text-muted-foreground hidden md:inline">
                    — {ep.desc}
                  </span>
                </div>
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {/* Collapsed content */}
              {isExpanded && (
                <div className={`p-4 border-t border-border/20 ${methodColors[ep.method]} space-y-4`}>
                  {/* Parameter Inputs */}
                  {ep.parameters.length > 0 && (
                    <div className="space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Parameters</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {ep.parameters.map((p) => (
                          <div key={p.name} className="space-y-1 bg-black/20 p-3 rounded-lg border border-border/10">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-foreground font-mono">{p.name}</span>
                              <span className="text-[10px] text-muted-foreground uppercase">{p.type} {p.required && <span className="text-rose-500">*</span>}</span>
                            </div>
                            <input
                              type="text"
                              placeholder={p.desc}
                              value={inputs[`${ep.path}_${p.name}`] || ""}
                              onChange={(e) => handleInputChange(ep.path, p.name, e.target.value)}
                              className="w-full mt-1.5 px-3 py-1.5 bg-neutral-900 border border-border/40 rounded-md text-xs font-mono text-foreground focus:border-accent outline-none"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Execution button */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => executeEndpoint(idx, ep)}
                      disabled={isExecuting}
                      className="px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/80 transition-colors text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 disabled:opacity-50"
                    >
                      <Play size={12} fill="currentColor" />
                      {isExecuting ? "Executing..." : "Try it out"}
                    </button>
                    <span className="text-[10px] text-muted-foreground">Response format: application/json</span>
                  </div>

                  {/* Outputs */}
                  {hasOutput && (
                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Response Output (200 OK)</div>
                      <pre className="p-4 bg-neutral-950 border border-border/40 rounded-lg overflow-x-auto text-[11px] font-mono text-emerald-400 leading-relaxed shadow-inner max-h-60 overflow-y-auto">
                        {outputs[idx]}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
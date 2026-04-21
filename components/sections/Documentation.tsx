"use client";

import { motion } from "framer-motion";
import { BookOpen, Code, Database, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Documentation() {
  const docs = [
    { 
      title: "Contract-First API Design", 
      icon: Globe, 
      desc: "Idempotency keys, rate-limiting logic, and cursor-based pagination formats.",
      level: "L3 - Verified",
      lastUpdated: "4h ago"
    },
    { 
      title: "Relational Integrity & Schema", 
      icon: Database, 
      desc: "BCNF normalization, GIN indices for full-text search, and materialized view refresh strategies.",
      level: "L3 - Verified",
      lastUpdated: "2d ago"
    },
    { 
      title: "CI/CD Orchestration", 
      icon: Code, 
      desc: "GitOps workflows using GitHub Actions, container scanning, and blue-green deployments.",
      level: "L2 - Active",
      lastUpdated: "12h ago"
    },
  ];

  const handleCardClick = (title: string) => {
    if (title.includes("Relational Integrity")) {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="documentation" className="py-24 container mt-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">Engineering Maturity & Documentation</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-none leading-relaxed">
            Great code is only half the battle. Thorough, accessible documentation is the foundation of scalable teams and successful product handoffs. 
          </p>

          <div className="space-y-6">
            {docs.map((doc, i) => {
              const Icon = doc.icon;
              const isComingSoon = doc.title.includes("API Design");
              const isSimulated = doc.title.includes("CI/CD");

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  onClick={() => handleCardClick(doc.title)}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer border border-transparent hover:border-border group relative"
                >
                  <div className="p-2.5 rounded-lg bg-secondary/80 text-secondary-foreground shrink-0 mt-0.5">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="text-base font-semibold text-foreground tracking-tight">{doc.title}</h4>
                      <div className="flex items-center gap-2">
                        {isComingSoon && (
                          <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-500 border border-orange-500/20 animate-pulse">
                            DRAFT - IN REVIEW
                          </span>
                        )}
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded border border-accent/20 bg-accent/5 text-accent uppercase tracking-wider shrink-0">
                          {doc.level}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{doc.desc}</p>
                    <div className="mt-3 flex items-center gap-4 text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest">
                      <span>Ref: DOC-{(i+1)*104}</span>
                      <span>Last Audited: {doc.lastUpdated}</span>
                    </div>

                    {/* Interaction Tooltips/Indicators */}
                    <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      {isComingSoon ? (
                        <span className="text-[10px] text-orange-500/80 font-mono italic">Expected Q2 2026...</span>
                      ) : isSimulated ? (
                        <span className="text-[10px] text-accent/80 font-mono italic">AFL Environment: Online</span>
                      ) : (
                        <span className="text-[10px] text-accent/80 font-mono italic">Click to view in Project</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <a href="#blog">
            <Button className="mt-8 gap-2 bg-foreground text-background hover:bg-foreground/90 font-bold">
              <BookOpen className="h-4 w-4" /> View Technical Blog
            </Button>
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-2xl h-[450px]"
        >
          {/* Mock Code Interface */}
          <div className="h-12 border-b border-border bg-muted flex items-center px-4 gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-border"></div>
              <div className="w-3 h-3 rounded-full bg-border"></div>
              <div className="w-3 h-3 rounded-full bg-border"></div>
            </div>
            <div className="mx-auto px-4 py-1 rounded bg-background border border-border text-xs text-muted-foreground font-mono">
               swagger/api-v1.yaml
            </div>
          </div>
          <div className="relative h-full overflow-hidden">
            {/* Action Bar */}
            <div className="absolute top-4 right-6 z-20 flex gap-2">
              <div className="px-2 py-1 rounded bg-secondary/80 backdrop-blur-md border border-border text-[9px] font-bold text-muted-foreground uppercase tracking-widest shadow-sm">
                Read Only
              </div>
              <div className="p-1 rounded bg-secondary/80 backdrop-blur-md border border-border text-muted-foreground shadow-sm">
                <Code size={12} />
              </div>
            </div>

            <div className="h-full overflow-y-auto custom-scrollbar p-8 font-mono text-[13px] text-muted-foreground leading-relaxed flex flex-col">
            <div><span className="text-purple-500">openapi:</span> 3.0.0</div>
            <div><span className="text-purple-500">info:</span></div>
            <div className="pl-4"><span className="text-blue-500">title:</span> Core Service API</div>
            <div className="pl-4"><span className="text-blue-500">version:</span> 1.0.0</div>
            <div><span className="text-purple-500">paths:</span></div>
            <div className="pl-4"><span className="text-blue-500">/users:</span></div>
            <div className="pl-8"><span className="text-green-500">get:</span></div>
            <div className="pl-12"><span className="text-blue-500">summary:</span> Retrieve paginated users</div>
            <div className="pl-12"><span className="text-blue-500">parameters:</span></div>
            <div className="pl-16 flex gap-1"><span>-</span> <span><span className="text-orange-500">in:</span> query</span></div>
            <div className="pl-20"><span className="text-orange-500">name:</span> limit</div>
            <div className="pl-20"><span className="text-orange-500">schema:</span></div>
            <div className="pl-24"><span className="text-gray-400">type:</span> integer</div>
            <div className="pl-24"><span className="text-gray-400">default:</span> 50</div>
            <div className="pl-8"><span className="text-blue-500">responses:</span></div>
            <div className="pl-12"><span className="text-orange-500">'200':</span></div>
            <div className="pl-16"><span className="text-blue-500">description:</span> A paged array of users</div>
            <div className="pl-16"><span className="text-blue-500">content:</span></div>
            <div className="pl-20"><span className="text-purple-500">application/json:</span></div>
            <div className="pl-24"><span className="text-blue-500">schema:</span></div>
            <div className="pl-28"><span className="text-gray-400">$ref:</span> '#/components/schemas/Users'</div>
            <div className="mt-4 pb-4 border-t border-border/20 pt-4 opacity-50">... (additional endpoints)</div>
            <div className="mt-2"><span className="text-purple-500">components:</span></div>
            <div className="pl-4"><span className="text-purple-500">schemas:</span></div>
            <div className="pl-8"><span className="text-blue-500">Users:</span></div>
            <div className="pl-12"><span className="text-gray-400">type:</span> object</div>
            <div className="pl-12"><span className="text-gray-400">properties:</span></div>
            <div className="pl-16"><span className="text-blue-500">id:</span> <span className="text-gray-400">string</span></div>
            <div className="pl-16"><span className="text-blue-500">name:</span> <span className="text-gray-400">string</span></div>
            <div className="pl-16"><span className="text-blue-500">email:</span> <span className="text-gray-400">string</span></div>
            <div className="pb-8 opacity-30 mt-4">// End of API definition</div>
          </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

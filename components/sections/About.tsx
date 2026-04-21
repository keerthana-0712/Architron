"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Code2, AppWindow, Cpu, BrainCircuit } from "lucide-react";

export default function About() {
  const philosophies = [
    { 
      title: "Outcome-Driven Engineering", 
      desc: "Architecting for system SLAs and end-user business value over purely abstract code patterns.", 
      icon: <AppWindow className="text-accent h-6 w-6" /> 
    },
    { 
      title: "Distributed Fault Tolerance", 
      desc: "Building resilient, self-healing platforms that leverage horizontal scaling and eventual consistency.", 
      icon: <Cpu className="text-accent h-6 w-6" /> 
    },
    { 
      title: "SDLC Mastery (E2E Ownership)", 
      desc: "Executing full ownership from initial requirement analysis to CI/CD and production monitoring.", 
      icon: <Code2 className="text-accent h-6 w-6" /> 
    },
    { 
      title: "Event-Driven Systems", 
      desc: "Leveraging reactive streams and asynchronous messaging to decouple critical business domains.", 
      icon: <BrainCircuit className="text-accent h-6 w-6" /> 
    },
  ];

  const handlePhilosophyClick = (title: string) => {
    const mappings: Record<string, string> = {
      "Outcome-Driven Engineering": "foths-ecosystem",
      "Distributed Fault Tolerance": "documentation",
      "SDLC Mastery (E2E Ownership)": "clientra-agency-os",
      "Event-Driven Systems": "foths-ecosystem"
    };
    
    const targetId = mappings[title];
    if (targetId) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-24 relative bg-muted/40 border-t border-border mt-20">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-6">Engineering Philosophy</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
              <p>
                My approach to software engineering centers on the belief that code is a means to an end, not the end itself. 
                I view every architectural decision through the lens of <strong className="text-foreground">product outcome</strong> and <strong className="text-foreground">system reliability</strong>.
              </p>
              <p className="mt-4">
                Whether deploying microservices on Kubernetes, sharding massive Postgres databases, or refining sub-100ms API responses, 
                my goal remains the same: <span className="italic">build visionary products that scale elegantly under pressure.</span>
              </p>
            </div>

            <div className="mt-10 flex gap-4">
               <a href="/resume.pdf" download>
                 <button className="px-6 py-2.5 bg-accent text-accent-foreground font-bold rounded-lg hover:bg-accent-hover transition-colors shadow-lg shadow-accent/10">
                   Download Resume
                 </button>
               </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {philosophies.map((item, i) => (
              <div 
                key={i} 
                onClick={() => handlePhilosophyClick(item.title)}
                className="p-6 rounded-2xl bg-card border border-border/50 hover:border-accent/40 transition-all cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1"
              >
                <div className="mb-4 p-3 bg-muted rounded-xl inline-block">
                  {item.icon}
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="space-y-4">
            {/* System Status Signal */}
            <div className="flex items-center gap-6 mb-8 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/90">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span>System: Healthy</span>
              </div>
              <div className="hidden sm:block">Latency: 12ms</div>
              <div className="hidden sm:block">Env: Production</div>
              <div className="hidden md:block">Build: v1.0.4-stable</div>
            </div>

            <h2 className="text-accent font-mono text-sm uppercase tracking-widest font-semibold flex items-center gap-2">
              <Terminal size={16} /> Software Engineer • Product Builder • System Architect
            </h2>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              Building Scalable <br />
              <span className="text-secondary-foreground/80 dark:text-muted-foreground">Systems & Visionary</span> <br />
              <span className="text-accent">Products.</span>
            </h1>
          </div>
          
          <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl/relaxed">
            Focused on product engineering, system architecture, and real-world platforms. I map out solutions for complex software challenges and build highly performant web applications.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#projects">
              <Button size="lg" className="h-12 px-8 text-base bg-foreground text-background hover:bg-foreground/90 rounded-full group w-full sm:w-auto">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <a href="#architecture">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-full text-foreground border-border hover:bg-accent/10 w-full sm:w-auto">
                View Architecture
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Right side animated abstract visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hidden lg:flex items-center justify-center h-[500px] relative"
        >
          {/* Abstract System Architecture Node Graphic using HTML/CSS */}
          <div className="relative w-full h-full max-w-md">
            {/* Center Node */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-2xl bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center shadow-lg shadow-accent/20 z-20">
              <Terminal className="text-primary-foreground h-10 w-10" />
            </div>
            
            {/* Orbit rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-border/60 z-0"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-border/30 z-0"></div>

            {/* Orbiting Elements */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px]"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center shadow-md">
                <span className="font-mono text-xs font-bold">API</span>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center shadow-md">
                <span className="font-mono text-xs font-bold">DB</span>
              </div>
            </motion.div>

            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]"
            >
               <div className="absolute top-1/4 -left-4 w-14 h-14 rounded-xl bg-card border border-border flex items-center justify-center shadow-md">
                <span className="font-mono text-[10px] font-bold">Worker</span>
              </div>
               <div className="absolute bottom-1/4 -right-4 w-14 h-14 rounded-xl bg-card border border-border flex items-center justify-center shadow-md">
                <span className="font-mono text-[10px] font-bold">Cache</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

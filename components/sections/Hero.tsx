"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal, Globe, Palette, Rocket } from "lucide-react";

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
          {/* System Status Bar */}
          <div className="flex items-center gap-6 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/80">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>System: Healthy</span>
            </div>
            <span className="hidden sm:block">Latency: 12ms</span>
            <span className="hidden sm:block">Env: Production</span>
            <span className="hidden md:block">Build: v2.0.0-stable</span>
          </div>

          {/* Role subtitle */}
          <div className="flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-widest text-accent">
            <span className="text-accent text-base leading-none">&gt;_</span>
            <span>Software Engineer&nbsp;•&nbsp;Product Builder&nbsp;•&nbsp;System Architect</span>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              Building Scalable<br />
              <span className="text-secondary-foreground/60 dark:text-muted-foreground">Systems & Visionary</span><br />
              <span className="text-accent">Products.</span>
            </h1>
          </div>

          {/* Description */}
          <p className="max-w-[520px] text-base text-muted-foreground leading-relaxed">
            Focused on product engineering, system architecture, and real-world platforms. I map out solutions for complex software challenges and build highly performant web applications.
          </p>

          {/* Stat Badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap items-center gap-3"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-muted/30 text-sm text-muted-foreground">
              <Globe className="h-4 w-4 text-accent" />
              <span className="font-semibold text-foreground">5+</span>
              <span>Production Projects</span>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-muted/30 text-sm text-muted-foreground">
              <Palette className="h-4 w-4 text-[#FFA116]" />
              <span className="font-semibold text-foreground">6+</span>
              <span>Products Designed</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-muted/30 text-sm text-muted-foreground">
              <Rocket className="h-4 w-4 text-blue-400" />
              <span className="font-semibold text-foreground">20+</span>
              <span>Features Shipped</span>
            </div>

            {/*
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-muted/30 text-sm text-muted-foreground">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-accent" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              <span className="font-semibold text-foreground">1,400+</span>
              <span>GitHub Commits</span>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-muted/30 text-sm text-muted-foreground">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#FFA116]" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0z"/></svg>
              <span className="font-semibold text-foreground">512+</span>
              <span>LeetCode Solved</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-muted/30 text-sm text-muted-foreground">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <span className="font-semibold text-foreground">500+</span>
              <span>Active Users</span>
            </div>
            */}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            <a href="#projects">
              <Button size="lg" className="h-12 px-7 text-base bg-foreground text-background hover:bg-foreground/90 rounded-full group font-semibold">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <a href="#services">
              <Button size="lg" variant="outline" className="h-12 px-7 text-base rounded-full text-foreground border-border hover:bg-accent/10 font-semibold">
                View Services
              </Button>
            </a>
            <a href="#architecture">
              <Button size="lg" variant="outline" className="h-12 px-7 text-base rounded-full text-foreground border-border hover:bg-accent/10 font-semibold">
                View Architecture
              </Button>
            </a>
          </motion.div>
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

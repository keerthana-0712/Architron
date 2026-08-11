"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, ArrowLeft, Github, Activity, Server, Shield, Zap, Heart, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects as staticProjects } from "@/lib/projects";
import Link from "next/link";

function ProjectSlideshow({ proj }: { proj: any }) {
  const staticMatch = staticProjects.find((p) => p.id === proj.id);
  const images: string[] = proj.thumbnails?.length
    ? proj.thumbnails
    : staticMatch?.thumbnails?.length
    ? staticMatch.thumbnails
    : proj.thumbnail
    ? [proj.thumbnail]
    : staticMatch?.thumbnail
    ? [staticMatch.thumbnail]
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="absolute inset-0 w-full h-full">
      {images.map((src, idx) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={`${proj.title} slide ${idx + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
            idx === currentIndex
              ? "opacity-90 group-hover:opacity-100 scale-100"
              : "opacity-0 scale-105 pointer-events-none"
          }`}
        />
      ))}

      {images.length > 1 && (
        <>
          {/* Left Chevron Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/70 border border-zinc-700/80 backdrop-blur-md p-2 rounded-full text-zinc-300 hover:text-white hover:bg-black/90 hover:scale-110 hover:border-accent shadow-xl cursor-pointer"
            title="Previous slide"
          >
            <ChevronLeft size={14} />
          </button>

          {/* Right Chevron Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev) => (prev + 1) % images.length);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/70 border border-zinc-700/80 backdrop-blur-md p-2 rounded-full text-zinc-300 hover:text-white hover:bg-black/90 hover:scale-110 hover:border-accent shadow-xl cursor-pointer"
            title="Next slide"
          >
            <ChevronRight size={14} />
          </button>
        </>
      )}
    </div>
  );
}

export default function Projects({ initialProjects, isFullPage = false }: { initialProjects?: any[]; isFullPage?: boolean }) {
  const list = initialProjects && initialProjects.length > 0 ? initialProjects : staticProjects;
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { key: "all", label: "All Projects" },
    { key: "client", label: "Client Projects" },
    { key: "college", label: "College Projects" },
    { key: "personal", label: "Personal Projects" }
  ];

  const getProjectCategory = (id: string) => {
    if (id === "ambassadors-for-the-lord" || id === "ash-man" || id === "disaster-risk-assessment") {
      return "client";
    }
    if (id === "facetrack-python" || id === "isdra-em-ds" || id === "vhhm-as") {
      return "college";
    }
    return "personal";
  };

  const getProjectTagDetails = (proj: any) => {
    const customText = typeof proj === "string" ? null : (proj.customTag || proj.tag || proj.badgeTag);
    const id = typeof proj === "string" ? proj : proj.id;

    let text = customText;

    if (!text) {
      switch (id) {
        case "ambassadors-for-the-lord":
          text = "Client Project";
          break;
        case "ash-man":
        case "disaster-risk-assessment":
          text = "Client Proj";
          break;
        case "facetrack-python":
          text = "College Major Project";
          break;
        case "vhhm-as":
          text = "College Minor Project";
          break;
        case "isdra-em-ds":
          text = "Client Project";
          break;
        case "ai-calling":
          text = "Client Proj";
          break;
        case "foths-ecosystem":
        case "clientra-agency-os":
          text = "Personal Project";
          break;
        case "keelink-url-shortener":
        default:
          text = "Personal Project (System Design)";
          break;
      }
    }

    const lower = text.toLowerCase();
    if (lower.includes("client")) {
      return { 
        text, 
        bg: "#1a1035", 
        color: "#f472b6", 
        border: "rgba(244,114,182,0.45)", 
        shadow: "rgba(244,114,182,0.2)" 
      };
    } else if (lower.includes("college") || lower.includes("major") || lower.includes("minor")) {
      return { 
        text, 
        bg: "#1e1b4b", 
        color: "#a78bfa", 
        border: "rgba(167,139,250,0.45)", 
        shadow: "rgba(167,139,250,0.2)" 
      };
    } else if (lower.includes("group")) {
      return { 
        text, 
        bg: "#064e3b", 
        color: "#34d399", 
        border: "rgba(52,211,153,0.45)", 
        shadow: "rgba(52,211,153,0.2)" 
      };
    } else {
      return { 
        text, 
        bg: "#0d1b2a", 
        color: "#60a5fa", 
        border: "rgba(96,165,250,0.45)", 
        shadow: "rgba(96,165,250,0.2)" 
      };
    }
  };

  const FEATURED_IDS = ["facetrack-python", "ambassadors-for-the-lord", "keelink-url-shortener"];

  let displayedProjects = list;
  if (!isFullPage) {
    // Show only featured projects, in the exact order specified
    displayedProjects = FEATURED_IDS.map(id => list.find(p => p.id === id)).filter(Boolean) as any[];
  } else if (activeCategory !== "all") {
    displayedProjects = list.filter(p => getProjectCategory(p.id) === activeCategory);
  }

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "foths-ecosystem": return <Zap size={12} className="text-yellow-400" />;
      case "clientra-agency-os": return <Server size={12} className="text-orange-400" />;
      case "ambassadors-for-the-lord": return <Shield size={12} className="text-blue-400" />;
      default: return <Activity size={12} className="text-accent" />;
    }
  };

  const getCategoryLabel = (id: string) => {
    switch (id) {
      case "foths-ecosystem": return "Distributed Microservices";
      case "clientra-agency-os": return "Multi-Tenant SaaS Engine";
      case "ambassadors-for-the-lord": return "Anonymity-First Sanctuary";
      default: return "Scalable Architecture";
    }
  };

  const getCategoryColor = (id: string) => {
    switch (id) {
      case "foths-ecosystem": return "text-yellow-400";
      case "clientra-agency-os": return "text-orange-400";
      case "ambassadors-for-the-lord": return "text-blue-400";
      default: return "text-accent";
    }
  };

  return (
    <section id="projects" className="py-24 container relative mt-10">
      {/* Subtle radial background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      {isFullPage && (
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-accent font-mono text-sm transition-colors group">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Overview
          </Link>
        </div>
      )}

      <div className="flex flex-col mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Engineering Showcases
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white text-center md:text-left">
            Production-Grade Scalable Systems
          </h2>
          <p className="text-zinc-400 text-lg max-w-none text-center md:text-left mt-2 leading-relaxed">
            Real-world microservice architectures, SaaS platforms, and distributed systems engineered with high availability, tenant isolation, and strict latency metrics in mind.
          </p>
        </div>
        {isFullPage && (
          <div className="flex flex-wrap justify-center md:justify-end gap-3 shrink-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <Button
                  key={cat.key}
                  variant={isActive ? "default" : "outline"}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`rounded-full font-semibold gap-2 px-5 py-2.5 h-auto text-sm transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20 border-accent"
                      : "text-foreground border-border hover:bg-accent/10"
                  }`}
                >
                  {cat.label}
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
                </Button>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {displayedProjects.map((proj, i) => (
          <motion.div
            key={proj.id}
            id={proj.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="flex flex-col h-full relative rounded-2xl bg-zinc-950 border border-zinc-800 group hover:border-zinc-600 hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)] transition-all duration-500"
          >
            {/* Project Type Tag */}
            {(() => {
              const tag = getProjectTagDetails(proj);
              return (
                <span
                  className="absolute top-0 right-5 -translate-y-1/2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap z-30 cursor-default"
                  style={{
                    background: tag.bg,
                    color: tag.color,
                    border: `1px solid ${tag.border}`,
                    boxShadow: `0 2px 12px ${tag.shadow}`,
                  }}
                >
                  <Heart size={9} fill="currentColor" /> {tag.text}
                </span>
              );
            })()}

            {/* Thumbnail Header */}
            <div className="h-48 bg-zinc-900 border-b border-zinc-800 relative rounded-t-2xl overflow-hidden">
              {/* Thumbnail image & Slideshow */}
              <ProjectSlideshow proj={proj} />

              {/* Subtle bottom gradient overlay so content below is readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent z-10" />

              {/* Tech-grid lines overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:18px_18px] pointer-events-none z-10" />

              {/* Cluster Node ID Tag */}
              <div className="absolute top-3 left-3 bg-black/70 border border-zinc-700/60 backdrop-blur-sm px-2 py-0.5 rounded text-[8px] font-mono text-zinc-400 uppercase tracking-widest z-20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent/70" />
                Cluster Node ID: PRJ-0{i + 1}
              </div>

              {/* Animated node topology inside header */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20 pointer-events-none">
                {["CLIENT", "CORE", "DB"].map((label, j) => (
                  <div key={label} className="flex items-center gap-6">
                    <div className="w-9 h-9 rounded-xl bg-black/60 border border-zinc-700 flex items-center justify-center backdrop-blur-sm group-hover:border-zinc-500 transition-all duration-500">
                      <span className="text-[7px] font-mono font-bold text-zinc-400 group-hover:text-white transition-colors">{label}</span>
                    </div>
                    {j < 2 && (
                      <div className="w-10 h-px bg-zinc-700 relative">
                        <div
                          className="absolute top-1/2 left-0 w-1.5 h-1.5 rounded-full bg-accent/80 animate-ping -translate-y-1/2"
                          style={{ animationDelay: `${j * 0.3}s` }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Card Body */}
            <div className="p-7 flex-1 flex flex-col">
              {/* Category tag */}
              <div className={`flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest mb-3 ${getCategoryColor(proj.id)}`}>
                {getCategoryIcon(proj.id)}
                <span>{getCategoryLabel(proj.id)}</span>
              </div>

              <h3 className="text-lg font-bold mb-3 text-white group-hover:text-zinc-100 transition-colors duration-300 tracking-tight leading-snug">
                {proj.title}
              </h3>

              <p className="text-zinc-400 mb-6 flex-1 text-sm leading-relaxed">
                {proj.description}
              </p>

              <div className="space-y-5">
                {/* Tech stack */}
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2.5 font-mono">Primary Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {(proj.techStack as string[]).slice(0, 4).map((stack: string) => (
                      <span key={stack} className="px-2.5 py-1 bg-zinc-900 border border-zinc-700 text-zinc-400 text-xs font-mono rounded-lg hover:border-zinc-500 transition-colors">
                        {stack}
                      </span>
                    ))}
                    {(proj.techStack as string[]).length > 4 && (
                      <span className="text-[10px] font-mono text-zinc-500 self-center pl-1">
                        +{(proj.techStack as string[]).length - 4} More
                      </span>
                    )}
                  </div>
                </div>

                {/* Micro Telemetry */}
                <div className="p-4 rounded-xl bg-black border border-zinc-800 flex justify-between items-center">
                  <div>
                    <h4 className="text-[8px] font-bold uppercase tracking-wider text-zinc-500 font-mono mb-0.5">Primary Metric</h4>
                    <span className="text-lg font-bold font-mono text-accent">{proj.metrics?.[0]?.value || "N/A"}</span>
                  </div>
                  <div className="text-right">
                    <h4 className="text-[8px] font-bold uppercase tracking-wider text-zinc-500 font-mono mb-0.5">Availability</h4>
                    <span className="text-xs font-bold font-mono text-emerald-400 flex items-center gap-1 justify-end">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      99.99%
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="mt-7 pt-5 border-t border-zinc-800 flex items-center justify-between">
                <a href={proj.github || "#"} target="_blank" rel="noreferrer">
                  <Button variant="ghost" size="sm" className="gap-2 -ml-3 text-zinc-500 hover:text-zinc-300 font-mono text-xs">
                    <Github className="h-4 w-4" /> CODE_REPO
                  </Button>
                </a>
                {proj.demo && (
                  <a href={proj.demo} target="_blank" rel="noreferrer">
                    <Button variant="ghost" size="sm" className="gap-1.5 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 font-mono text-xs">
                      <ExternalLink className="h-3.5 w-3.5" /> DEMO
                    </Button>
                  </a>
                )}
                <Link href={`/projects/${proj.id}`}>
                  <Button variant="ghost" size="sm" className="gap-2 text-accent hover:text-accent/80 hover:bg-accent/10 font-mono text-xs">
                    SYS_DESIGN <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {!isFullPage && (
        <div className="mt-16 flex justify-center">
          <Link href="/projects">
            <Button 
              className="rounded-full gap-2 group h-12 px-8 font-bold border border-accent/20 cursor-pointer bg-accent text-accent-foreground hover:bg-accent/90"
            >
              View More Projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}

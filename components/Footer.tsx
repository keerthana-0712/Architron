"use client";

import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  MapPin,
  Zap,
  Shield,
  Download,
  Calendar,
  FolderOpen,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Cpu,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [latency, setLatency] = useState(14);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * (28 - 10 + 1)) + 10);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const navLinks = {
    Explore: [
      { label: "About", href: "/#about" },
      { label: "Services", href: "/#services" },
      { label: "Projects", href: "/#projects" },
      { label: "Experience", href: "/#experience" },
    ],
    Build: [
      { label: "Skills", href: "/#skills" },
      { label: "Architecture", href: "/#architecture" },
      { label: "Blog", href: "/#blog" },
      { label: "Docs", href: "/#documentation" },
    ],
  };

  const socials = [
    { icon: <Github size={15} />, label: "GitHub", href: "https://github.com/keerthana-0712" },
    { icon: <Linkedin size={15} />, label: "LinkedIn", href: "https://www.linkedin.com/in/keerthana-salla/" },
    { icon: <Mail size={15} />, label: "Email", href: "mailto:keerthana.salla.7@gmail.com" },
  ];

  return (
    <footer className="relative border-t border-border/30 overflow-hidden">
      {/* ── Top glow line ── */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,181,139,0.4), transparent)" }}
      />
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-20 opacity-15"
        style={{ background: "radial-gradient(ellipse at top, rgba(255,140,90,0.35), transparent 70%)" }}
      />

      <div className="container px-4 md:px-6 pt-16 pb-10">

        {/* ═══════════════ ROW 1: BRAND + NAV + MISSION + STATUS ═══════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-14">

          {/* Brand */}
          <div className="md:col-span-3 space-y-5">
            <div>
              <div
                className="font-mono text-2xl font-black tracking-tighter mb-1"
                style={{
                  background: "linear-gradient(135deg, #FFb58b, #ff8c5a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                &lt;KS /&gt;
              </div>
              <p className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-[0.3em]">
                Full-Stack · AI · Cloud
              </p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Architecting high-performance systems and building scalable
              products with an outcome-driven mindset.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground/60 font-mono">
              <MapPin size={12} className="text-accent/60" />
              Hyderabad, India · Available globally
            </div>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-border/60 text-muted-foreground hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation – Explore & Build */}
          <div className="md:col-span-2 grid grid-cols-2 gap-6">
            {Object.entries(navLinks).map(([section, links]) => (
              <div key={section} className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/80">{section}</h4>
                <nav className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <span className="w-0 group-hover:w-2 transition-all duration-200 overflow-hidden">
                        <span className="block w-1.5 h-px bg-accent" />
                      </span>
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>
            ))}
          </div>

          {/* Current Mission */}
          <div className="md:col-span-3 space-y-5">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/80">
              Current Mission
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest mb-1.5">Building</p>
                <div className="space-y-1">
                  {["Maxy", "Corex", "FOTHS Platform"].map((p) => (
                    <div key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ArrowRight size={10} className="text-accent/60" />
                      {p}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest mb-1.5">Focus</p>
                <div className="space-y-1">
                  {["Full-Stack Engineering", "System Design", "Product Development"].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ArrowRight size={10} className="text-accent/60" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Live Developer Status */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/80">
              System Status
            </h4>
            <div className="rounded-2xl border border-border/60 bg-card/40 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/40 bg-muted/20">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest">
                  All Systems Operational
                </span>
              </div>
              <div className="p-4 space-y-2.5">
                {[
                  { icon: <Shield size={11} className="text-emerald-400" />, label: "STATUS", value: "BUILDING", color: "text-emerald-400" },
                  { icon: <MapPin size={11} className="text-sky-400" />, label: "LOCATION", value: "INDIA", color: "text-sky-400" },
                  { icon: <Cpu size={11} className="text-purple-400" />, label: "FOCUS", value: "FULL-STACK", color: "text-purple-400" },
                  { icon: <Sparkles size={11} className="text-amber-400" />, label: "OPEN TO", value: "INTERNSHIPS", color: "text-amber-400" },
                  { icon: <CheckCircle2 size={11} className="text-emerald-400" />, label: "AVAILABILITY", value: "YES", color: "text-emerald-400" },
                  { icon: <Zap size={11} className="text-accent" />, label: "LATENCY", value: `${latency}ms`, color: "text-accent" },
                ].map((m) => (
                  <div key={m.label} className="flex items-center justify-between text-[10px] font-mono">
                    <span className="flex items-center gap-1.5 text-muted-foreground/60">
                      {m.icon} {m.label}:
                    </span>
                    <span className={m.color + " font-bold"}>{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════ ROW 2: RECRUITER ACTIONS + NOW + AVAILABILITY ═══════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-14">

          {/* Recruiter Actions */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/80">
              Recruiter Actions
            </h4>
            <div className="space-y-2.5">
              {[
                { icon: <Download size={13} />, label: "Download Resume", href: "/resume.pdf", external: true },
                { icon: <Calendar size={13} />, label: "Schedule Call", href: "/#contact", external: false },
                { icon: <FolderOpen size={13} />, label: "View Projects", href: "/#projects", external: false },
                { icon: <Mail size={13} />, label: "Hire Me", href: "mailto:keerthana.salla.7@gmail.com", external: true },
              ].map((a) => (
                <a
                  key={a.label}
                  href={a.href}
                  target={a.external ? "_blank" : undefined}
                  rel={a.external ? "noopener noreferrer" : undefined}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-border/50 bg-card/30 text-sm text-muted-foreground hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all duration-200 group"
                >
                  <span className="text-accent/60 group-hover:text-accent transition-colors">{a.icon}</span>
                  {a.label}
                  <ExternalLink size={10} className="ml-auto opacity-0 group-hover:opacity-60 transition-opacity" />
                </a>
              ))}
            </div>
          </div>

          {/* Now */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/80">
              Now
            </h4>
            <div className="space-y-2">
              {[
                { tag: "Learning", value: "System Design" },
                { tag: "Building", value: "Corex" },
                { tag: "Reading", value: "Designing Data-Intensive Applications" },
              ].map((n) => (
                <div key={n.tag} className="flex items-center gap-2 text-sm">
                  <span className="text-[10px] font-mono text-accent/60 uppercase w-16 shrink-0">{n.tag}:</span>
                  <span className="text-muted-foreground">{n.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Availability Badges */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/80">
              Available For
            </h4>
            <div className="flex flex-wrap gap-2">
              {["Internships", "Freelance", "Product Teams", "Remote"].map((b) => (
                <span
                  key={b}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-[11px] font-mono text-accent"
                >
                  <CheckCircle2 size={10} />
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════ PHILOSOPHY ═══════════════ */}
        <div className="mb-10 text-center">
          <div className="inline-block px-8 py-5 rounded-2xl border border-border/40 bg-card/20">
            <p className="text-sm italic text-muted-foreground leading-relaxed">
              &ldquo;Build products, not just projects.<br />
              Solve problems, not assignments.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* ═══════════════ BOTTOM BAR ═══════════════ */}
      <div className="border-t border-border/30 bg-card/20">
        <div className="container px-4 md:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] font-mono text-muted-foreground/50 tracking-widest uppercase">
            © {currentYear} Keerthana Salla · All Systems Operational
          </p>
          <p className="text-[10px] font-mono text-muted-foreground/40 text-center">
            Designed, Developed &amp; Maintained by Keerthana Salla
          </p>
          <p className="text-[10px] font-mono text-muted-foreground/40 flex items-center gap-1.5">
            From Idea <ArrowRight size={8} /> Design <ArrowRight size={8} /> Code <ArrowRight size={8} /> Deployment
          </p>
        </div>
      </div>
    </footer>
  );
}

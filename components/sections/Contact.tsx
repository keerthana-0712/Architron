"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, Send, CheckCircle2, Loader2, MapPin, FileText, Terminal, Activity, Zap, Server, Database, Network, Shield } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [logs, setLogs] = useState<string[]>(["SYSTEM_INIT: Contact protocol online.", "READY: Awaiting input parameters..."]);
  const [metrics, setMetrics] = useState({ latency: 0, node: "US-EAST-1", health: 100 });
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        latency: Math.floor(Math.random() * (45 - 12 + 1)) + 12,
        health: 98 + Math.random() * 2
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleInputFocus = (field: string) => {
    addLog(`INPUT: Awaiting ${field.toLowerCase()} data...`);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    addLog("SEND_INIT: Processing your message...");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        addLog("SUCCESS: Your message has been sent.");
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.error || "Service is currently busy.";
        addLog(`ERROR: ${errorMessage}`);
        setStatus("error");
      }
    } catch (error) {
      addLog("ERROR: Connection interrupted.");
      setStatus("error");
    }
  };

  const contactLinks = [
    { icon: <Mail size={18} />, label: "Email", value: "keerthana.salla.7@gmail.com", href: "mailto:keerthana.salla.7@gmail.com" },
    { icon: <Linkedin size={18} />, label: "LinkedIn", value: "keerthana-salla", href: "https://www.linkedin.com/in/keerthana-salla/" },
    { icon: <Github size={18} />, label: "GitHub", value: "keerthana-0712", href: "https://github.com/keerthana-0712" },
    { icon: <MapPin size={18} />, label: "Location", value: "Hyderabad, India", href: "#" },
  ];

  return (
    <section id="contact" className="py-24 container mt-20 relative">
      <div className="grid lg:grid-cols-12 gap-12 items-center relative">
        {/* Left Column: Metrics & Links */}
        <div className="lg:col-span-4 space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-foreground">Let&apos;s Build One!</h2>
            <p className="text-muted-foreground leading-relaxed">
              I&apos;m currently open to new opportunities to build scalable systems and visionary products. Whether you have a question or just want to connect, feel free to reach out.
            </p>
          </div>

          {/* Real-time Engineering Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <Activity className="text-accent" size={14} />, label: "Latency", value: `${metrics.latency}ms` },
              { icon: <Server className="text-accent" size={14} />, label: "Env", value: "Prod-v1.4" },
              { icon: <Zap className="text-accent" size={14} />, label: "Uptime", value: "99.99%" },
              { icon: <Network className="text-accent" size={14} />, label: "Protocol", value: "HTTP/3 (QUIC)" },
            ].map((m, i) => (
              <div key={i} className="p-4 rounded-2xl bg-muted/40 border border-border flex flex-col gap-2 hover:border-accent/30 transition-colors">
                <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  {m.icon} {m.label}
                </div>
                <div className="text-sm font-mono font-bold text-foreground">{m.value}</div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {contactLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card/50 hover:border-accent/40 transition-all group"
              >
                <div className="text-accent group-hover:scale-110 transition-transform">
                  {link.icon}
                </div>
                <div>
                  <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">{link.label}</div>
                  <div className="text-sm text-foreground font-medium">{link.value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border bg-card overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Form Header */}
            <div className="bg-muted px-6 py-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40" />
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest font-bold">
                  <Terminal size={14} className="text-accent" />
                  Message Console
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row overflow-hidden h-fit">
              {/* Form Side */}
              <div className="flex-1 p-8 border-r border-border/50">
                {status === "success" ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                    <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center text-accent relative">
                      <CheckCircle2 size={40} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold">Message Sent</h3>
                      <p className="text-muted-foreground">Thank you! I'll get back to you soon.</p>
                    </div>
                    <button
                      onClick={() => setStatus("idle")}
                      className="px-6 py-2 rounded-full border border-accent text-accent font-bold hover:bg-accent hover:text-primary-foreground transition-all"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2 ml-1">
                          Name
                        </label>
                        <input
                          required
                          name="name"
                          onFocus={() => handleInputFocus("Name")}
                          className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-accent/50 outline-none transition-all text-sm"
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2 ml-1">
                          Email
                        </label>
                        <input
                          required
                          type="email"
                          name="email"
                          onFocus={() => handleInputFocus("Email")}
                          className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-accent/50 outline-none transition-all text-sm"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2 ml-1">
                        Message
                      </label>
                      <textarea
                        required
                        name="message"
                        onFocus={() => handleInputFocus("Message")}
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-accent/50 outline-none transition-all text-sm resize-none"
                        placeholder="How can I help you?"
                      ></textarea>
                    </div>

                    <button
                      disabled={status === "sending"}
                      className="w-full h-14 bg-foreground text-background font-bold rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="animate-spin" size={18} /> Sending...
                        </>
                      ) : (
                        <>
                          Send Message <Send size={16} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Console Log Side */}
              <div className="w-full md:w-72 bg-muted/30 p-6 flex flex-col font-mono text-[10px] border-t md:border-t-0 md:border-l border-border/50">
                <div className="flex items-center justify-between mb-4 border-b border-border/50 pb-2">
                  <span className="text-muted-foreground font-bold tracking-tighter">PROCESS_LOGS</span>
                </div>
                <div
                  ref={logContainerRef}
                  className="space-y-3 flex-1 overflow-y-auto max-h-[350px] custom-scrollbar pr-2 scroll-smooth"
                >
                  {logs.map((log, i) => {
                    let style: any = { color: "rgba(255,255,255,0.7)" }; // Default muted
                    let className = "";

                    if (log.includes("SUCCESS")) {
                      className = "text-emerald-500 font-bold";
                      style = {};
                    }
                    else if (log.includes("ERROR")) {
                      className = "text-rose-500 font-bold";
                      style = {};
                    }
                    else if (log.includes("SEND_INIT")) {
                      className = "text-white font-bold";
                      style = {};
                    }
                    else if (log.includes("SYSTEM_INIT") || log.includes("READY")) style = { color: "#759fc9" }; // Serenity
                    else if (log.includes("INPUT")) {
                      if (log.includes("name")) style = { color: "#f0d1c0" }; // Blush
                      else if (log.includes("email")) style = { color: "#d6c180" }; // Honey
                      else if (log.includes("message")) style = { color: "#d695a5" }; // Rosette
                    }

                    return (
                      <div key={i} style={style} className={className}>
                        {log}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

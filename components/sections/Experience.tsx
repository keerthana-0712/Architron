"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2, Hammer, Laptop } from "lucide-react";
import { useState } from "react";

export default function Experience() {
  const [activeTab, setActiveTab] = useState<"building" | "work">("building");

  const buildingExperience = [
    {
      company: "FOTHS (Fire of the Holy Spirit)",
      role: "Lead Product Engineer",
      period: "2023 - Present",
      achievements: [
        "Designed a multi-module spiritual platform with 30+ integrated systems",
        "Built product architecture for global-scale user interaction",
        "Conceptualized AI-driven assistant (Flame) for user engagement",
        "Created end-to-end product vision (tech + user experience + scalability)"
      ]
    },
    {
      company: "Clientra | Agency OS",
      role: "Full Stack Engineer & Architect",
      period: "2024",
      achievements: [
        "Architected a scalable multi-tenant SaaS platform supporting unlimited agencies and dedicated client portals.",
        "Engineered real-time status synchronization between frontend Kanban boards and backend WebSocket gateways.",
        "Designed a deeply nested RBAC system securely separating Admin, Manager, Developer, and Client data.",
        "Implemented automated billing and finance systems using Razorpay, reducing manual overhead for tech agencies."
      ]
    },
    {
      company: "Ambassadors for the Lord",
      role: "Systems Architect",
      period: "2023",
      achievements: [
        "Designed and built a triple-tier spiritual sanctuary architecture ensuring 100% data integrity and user privacy.",
        "Implemented low-latency WebSocket communication for real-time spiritual counseling and community support.",
        "Scaled a prophetic teaching and sermon distribution engine using Next.js and NestJS for high performance.",
        "Integrated automated notification workflows to enhance user engagement and pastoral follow-ups."
      ]
    }
  ];

  const workExperience = [
    {
      company: "ServiceNow X SmartBridge",
      role: "Internship Trainee",
      period: "Oct 2025 - Ongoing",
      achievements: [
        "Gaining hands-on experience with ServiceNow platform capabilities and digital workflow automation.",
        "Learning enterprise-grade service management and system integration patterns.",
        "Collaborating on automated solutions for complex business process challenges."
      ]
    },
    {
      company: "Edunet Foundation",
      role: "Frontend Developer Intern",
      period: "Aug 2025 - Oct 2025",
      achievements: [
        "Developed responsive and interactive user interfaces using modern frontend frameworks.",
        "Optimized web application performance and improved accessibility standards.",
        "Collaborated with cross-functional teams to deliver high-quality digital solutions."
      ]
    },
    {
      company: "ApexPlanet Software Pvt Ltd",
      role: "Web Developer Intern",
      period: "Aug 2025 - Oct 2025",
      achievements: [
        "Built and maintained full-stack web applications with a focus on scalable backend logic.",
        "Implemented secure authentication and data management systems for client-facing products.",
        "Worked on integrating third-party APIs and services to enhance platform functionality."
      ]
    },
    {
      company: "VISWAM.AI",
      role: "AI Developer Intern",
      period: "May 2024 - Jun 2024",
      achievements: [
        "Integrated AI models and LLM capabilities into production environments.",
        "Assisted in developing intelligent automation tools and conversational interfaces.",
        "Explored generative AI applications to solve real-world engineering problems."
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 container mt-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-accent/10 text-accent">
              <Briefcase size={28} />
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-foreground">Experience</h2>
          </div>

          <div className="flex p-1 bg-muted rounded-xl border border-border">
            <button
              onClick={() => setActiveTab("building")}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === "building"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Hammer size={16} /> Building
            </button>
            <button
              onClick={() => setActiveTab("work")}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === "work"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Laptop size={16} /> Work
            </button>
          </div>
        </div>

        <div className="space-y-12">
          {(activeTab === "building" ? buildingExperience : workExperience).map((exp, i) => (
            <motion.div
              key={`${exp.company}-${activeTab}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative pl-8 border-l-2 border-border/50 group hover:border-accent transition-colors"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-border group-hover:border-accent group-hover:bg-accent transition-all" />

              <div className="mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <h3 className="text-2xl font-bold text-foreground">{exp.company}</h3>
                  <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground bg-muted/50 px-3 py-1 rounded-full whitespace-nowrap">
                    <Calendar size={14} />
                    {exp.period}
                  </div>
                </div>
                <p className="text-lg font-medium text-accent">{exp.role}</p>
              </div>

              <ul className="space-y-4">
                {exp.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                    <CheckCircle2 size={18} className="text-accent shrink-0 mt-1" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, ReactNode } from "react";
import { projectDocsMap, ProjectDocs, DocSection } from "@/lib/documentation";
import { FileText, Cpu, Code2, Database, GitBranch, ShieldCheck, Activity, LineChart, Milestone, Eye } from "lucide-react";

interface ProjectDocumentationProps {
  projectId: string;
}

type DocKey = keyof ProjectDocs;

const docKeys: { key: DocKey; label: string; icon: any }[] = [
  { key: "prd", label: "PRD", icon: FileText },
  { key: "sdd", label: "System Design", icon: GitBranch },
  { key: "tdd", label: "Technical Design", icon: Cpu },
  { key: "api", label: "API Docs", icon: Code2 },
  { key: "schema", label: "Database Schema", icon: Database },
  { key: "evolution", label: "Architecture Evolution", icon: Milestone },
  { key: "security", label: "Security Design", icon: ShieldCheck },
  { key: "observability", label: "Observability & Ops", icon: Activity },
  { key: "metrics", label: "Product Metrics", icon: LineChart },
  { key: "roadmap", label: "Future Roadmap", icon: Eye },
];

export default function ProjectDocumentation({ projectId }: ProjectDocumentationProps) {
  const docs = projectDocsMap[projectId];
  const [activeTab, setActiveTab] = useState<DocKey>("prd");

  if (!docs) {
    return (
      <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 text-center text-zinc-500">
        No documentation stack found for this project.
      </div>
    );
  }

  const activeDoc: DocSection = docs[activeTab];

  // A simple client-side markdown formatter that translates basics to JSX
  const formatMarkdown = (text: string) => {
    const lines = text.split("\n");
    let inCodeBlock = false;
    let codeContent: string[] = [];
    const formattedElements: ReactNode[] = [];

    lines.forEach((line, index) => {
      // Check for code blocks
      if (line.trim().startsWith("```")) {
        if (inCodeBlock) {
          // Close code block
          inCodeBlock = false;
          formattedElements.push(
            <div key={`code-${index}`} className="rounded-2xl border border-zinc-800 overflow-hidden bg-black/60 my-6 shadow-2xl">
              <div className="bg-zinc-900/80 px-4 py-2 border-b border-zinc-800 text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center justify-between">
                <span>Code Output Console</span>
                <span className="w-2 h-2 rounded-full bg-accent/70 animate-pulse" />
              </div>
              <pre className="p-5 text-[11px] md:text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed whitespace-pre">
                <code>{codeContent.join("\n")}</code>
              </pre>
            </div>
          );
          codeContent = [];
        } else {
          // Open code block
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeContent.push(line);
        return;
      }

      const trimmed = line.trim();

      // Heading 3
      if (trimmed.startsWith("###")) {
        formattedElements.push(
          <h3 key={index} className="text-lg md:text-xl font-bold text-white mt-8 mb-4 tracking-tight border-b border-zinc-800 pb-2 flex items-center gap-2">
            <span className="w-1 h-4 bg-accent rounded-full" />
            {trimmed.replace("###", "").trim()}
          </h3>
        );
        return;
      }

      // Heading 4
      if (trimmed.startsWith("####")) {
        formattedElements.push(
          <h4 key={index} className="text-base font-bold text-zinc-200 mt-6 mb-3 font-mono">
            {trimmed.replace("####", "").trim()}
          </h4>
        );
        return;
      }

      // Unordered lists
      if (trimmed.startsWith("*") || trimmed.startsWith("-")) {
        const textContent = trimmed.substring(1).trim();
        // Parse inline bolding **text**
        const formattedText = parseInlineFormatting(textContent);

        formattedElements.push(
          <div key={index} className="flex gap-3 text-zinc-300 text-sm md:text-base leading-relaxed pl-2 mb-3 items-start">
            <span className="text-accent mt-2.5 h-1.5 w-1.5 rounded-full shrink-0 bg-accent/80" />
            <span>{formattedText}</span>
          </div>
        );
        return;
      }

      // Default paragraph
      if (trimmed) {
        formattedElements.push(
          <p key={index} className="text-zinc-400 text-sm md:text-base leading-relaxed mb-4">
            {parseInlineFormatting(trimmed)}
          </p>
        );
      }
    });

    return formattedElements;
  };

  const parseInlineFormatting = (text: string) => {
    const parts = text.split("**");
    return parts.map((part, index) => {
      // Odd indexes are wrapped in bold
      if (index % 2 === 1) {
        // Check if it's a tag-like format (e.g. [ADMIN]) or a regular bold
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={index} className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-accent font-mono text-xs mx-1">
              {part.substring(1, part.length - 1)}
            </code>
          );
        }
        return (
          <strong key={index} className="text-white font-semibold">
            {part}
          </strong>
        );
      }
      // Check for inline codes inside regular text blocks
      if (part.includes("`")) {
        const subparts = part.split("`");
        return subparts.map((subpart, subindex) => {
          if (subindex % 2 === 1) {
            return (
              <code key={`code-${index}-${subindex}`} className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-accent font-mono text-xs mx-1">
                {subpart}
              </code>
            );
          }
          return subpart;
        });
      }
      return part;
    });
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      {/* Tab Selectors Left Sidebar */}
      <div className="lg:col-span-3 space-y-1.5 lg:sticky lg:top-24 max-h-[calc(100vh-150px)] overflow-y-auto pr-2 custom-scrollbar">
        <div className="p-3 mb-3 rounded-xl bg-zinc-900/40 border border-zinc-800">
          <div className="text-[9px] font-bold font-mono tracking-widest text-zinc-500 uppercase mb-1.5">
            DOCUMENTATION STACK
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Select a document scope below to view detailed specifications, schema models, and system flows.
          </p>
        </div>

        {docKeys.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-[11px] font-semibold text-left transition-all duration-300 border ${
                isActive
                  ? "bg-accent/15 border-accent text-accent shadow-md shadow-accent/5"
                  : "bg-zinc-900/40 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
              }`}
            >
              <Icon size={13} className={isActive ? "text-accent" : "text-zinc-500"} />
              <span className="flex-1 truncate">{tab.label}</span>
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-accent" : "bg-transparent"}`} />
            </button>
          );
        })}
      </div>

      {/* Reader Panel Right Side */}
      <div className="lg:col-span-9 p-8 md:p-10 rounded-3xl bg-zinc-900/40 border border-zinc-800 shadow-2xl relative min-h-[500px]">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-accent/40 rounded-l-3xl" />
        
        {/* Document Header */}
        <div className="border-b border-zinc-800/80 pb-6 mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-2 flex items-center gap-2">
            {activeDoc.title}
          </h2>
          <p className="text-xs md:text-sm text-zinc-500 font-mono italic">
            {activeDoc.description}
          </p>
        </div>

        {/* Document Content Rendered */}
        <div className="prose prose-invert max-w-none">
          {formatMarkdown(activeDoc.content)}
        </div>
      </div>
    </div>
  );
}

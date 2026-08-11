import { projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, ExternalLink, Database, Cpu, Layout, Boxes } from "lucide-react";
import Link from "next/link";
import ProjectArchitecture from "@/components/ProjectArchitecture";
import TrafficSimulator from "@/components/TrafficSimulator";
import ProjectDocumentation from "@/components/ProjectDocumentation";
import { db } from "@/lib/db";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  
  let project: any = null;
  try {
    project = await db.project.findUnique({
      where: { id },
    });
  } catch (err) {
    console.warn("Failed to fetch project from database, falling back to static lists.", err);
  }

  if (!project) {
    project = projects.find((p) => p.id === id);
  }

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-accent selection:text-black">
      {/* Background grid decoration */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none -z-10" />
      {/* Radial accent glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container py-12 lg:py-20 mx-auto px-4 md:px-6">
        <Link href="/#projects">
          <Button variant="ghost" className="mb-8 group -ml-4 text-zinc-400 hover:text-white border border-transparent hover:border-zinc-700 bg-transparent hover:bg-zinc-900">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Overview
          </Button>
        </Link>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="flex flex-col lg:col-span-7 xl:col-span-8 pr-4">
            {/* System Status Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-700 bg-zinc-900 text-zinc-400 text-xs font-mono mb-4 w-max">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              SYSTEM OVERVIEW &amp; SPECS
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6 text-balance text-white">
              {project.title}
            </h1>

            {(() => {
              const blocks: string[] = project.fullDescription.split('\n\n');
              const introBlocks = blocks.filter((b: string) => !b.includes('🔹') && !b.trim().startsWith('-'));
              const introTop = introBlocks.slice(0, 2);
              const introRest = introBlocks.slice(2);

              return (
                <>
                  <div className="space-y-6 max-w-2xl">
                    {introTop.map((block, i) => (
                      <p key={i} className={`leading-relaxed ${i === 0 ? 'text-xl font-medium text-zinc-200' : 'text-lg text-zinc-400'}`}>
                        {block}
                      </p>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 mt-8 mb-12">
                    <a href={project.github || "#"} target="_blank" rel="noreferrer">
                      <Button className="rounded-full px-6 bg-white text-black hover:bg-zinc-100 gap-2 font-mono text-xs font-bold">
                        <Github size={16} /> VIEW_SOURCE
                      </Button>
                    </a>
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noreferrer">
                        <Button variant="outline" className="rounded-full px-6 gap-2 font-mono text-xs border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white bg-transparent">
                          <ExternalLink size={16} /> LIVE_PROD
                        </Button>
                      </a>
                    )}
                  </div>

                  {introRest.length > 0 && (
                    <div className="space-y-6 max-w-2xl">
                      {introRest.map((block, i) => (
                        <p key={i} className="text-zinc-400 leading-relaxed text-base">
                          {block}
                        </p>
                      ))}
                    </div>
                  )}
                </>
              );
            })()}
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4 lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 h-max lg:mt-10">
            {(project.metrics as any[]).map((metric: any, i: number) => (
              <div key={i} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-center items-center text-center hover:border-zinc-600 transition-colors duration-300">
                <span className="text-3xl font-bold text-accent mb-1 font-mono">{metric.value}</span>
                <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold font-mono">{metric.label}</span>
              </div>
            ))}
            <div className="p-6 rounded-2xl bg-accent text-black flex flex-col justify-center items-center text-center shadow-lg shadow-accent/20">
              <Cpu className="mb-2" size={24} />
              <span className="text-[9px] uppercase font-bold tracking-widest font-mono">SYSTEM_STABLE</span>
            </div>
          </div>
        </div>

        {/* Statement of Purpose */}
        {project.statementOfPurpose && (
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white">
              <span className="text-accent text-3xl font-serif">"</span> Developer&apos;s Mission
            </h2>
            <div className="p-8 md:p-12 rounded-3xl bg-zinc-900 border border-zinc-800 relative overflow-hidden group hover:border-zinc-600 transition-colors duration-500">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-accent rounded-l-3xl" />
              <div className="space-y-6 text-lg md:text-xl text-zinc-400 leading-relaxed max-w-5xl pl-4">
                {(project.statementOfPurpose as string).split('\n\n').map((paragraph: string, i: number) => {
                  const formatted = paragraph.split('**').map((chunk: string, index: number) =>
                    index % 2 === 1
                      ? <strong key={index} className="text-white tracking-tight font-semibold bg-accent/10 px-1.5 py-0.5 rounded-md">{chunk}</strong>
                      : chunk
                  );
                  return <p key={i}>{formatted}</p>;
                })}
              </div>
            </div>
          </div>
        )}

        {/* Feature Modules */}
        {(() => {
          const blocks: string[] = project.fullDescription.split('\n\n');
          const featureBlocks = blocks.filter((b: string) => b.includes('🔹') || b.trim().startsWith('-'));
          if (featureBlocks.length === 0) return null;

          return (
            <div className="mb-20">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white">
                <Boxes className="text-accent" /> Platform Domains
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featureBlocks.map((block, i) => (
                  <div key={i} className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-sm group hover:border-zinc-600 transition-colors duration-500">
                    {block.split('\n').map((line, j) => {
                      const trimmed = line.trim();
                      if (trimmed.startsWith('🔹')) {
                        return <h3 key={j} className="text-accent font-semibold text-lg mb-6 tracking-tight">{trimmed.replace('🔹', '').trim()}</h3>;
                      } else if (trimmed.startsWith('-')) {
                        return (
                          <div key={j} className="flex gap-4 mb-4 text-zinc-400 text-sm items-start">
                            <span className="text-accent mt-2 h-1.5 w-1.5 rounded-full shrink-0 bg-accent/80 group-hover:scale-125 transition-transform" />
                            <span className="leading-relaxed">{trimmed.substring(1).trim()}</span>
                          </div>
                        );
                      }
                      return trimmed ? <p key={j} className="text-zinc-400 mb-4 text-sm">{trimmed}</p> : null;
                    })}
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        <hr className="border-zinc-800 mb-20" />

        {/* Project Documentation Stack */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white">
            <Boxes className="text-accent" /> Project Documentation Stack
          </h2>
          <ProjectDocumentation projectId={project.id} />
        </div>

        <hr className="border-zinc-800 mb-20" />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-16">

            {/* System Architecture */}
            <section>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white">
                <Boxes className="text-accent" /> Topology &amp; Data Streams
              </h2>
              <div className="mb-8">
                <ProjectArchitecture
                  title={project.architectureTitle}
                  nodes={project.nodes}
                  connections={project.connections}
                  flows={project.flows}
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{project.architectureTitle}</h3>
              <p className="text-zinc-400 leading-relaxed text-base">
                {project.architectureDesc}
              </p>
            </section>

            {/* Architectural Trade-offs */}
            {project.tradeOffs && project.tradeOffs.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white">
                  <Cpu className="text-accent" /> Architectural Trade-offs &amp; Decisions
                </h2>
                <div className="grid gap-6">
                  {(project.tradeOffs as any[]).map((trade: any, i: number) => (
                    <div key={i} className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 flex flex-col md:flex-row gap-6 justify-between hover:border-zinc-600 transition-colors duration-500">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono font-bold text-accent bg-accent/10 border border-accent/25 px-2 py-0.5 rounded uppercase">
                            Decision
                          </span>
                          <h3 className="font-bold text-base text-white tracking-tight">{trade.decision}</h3>
                        </div>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          <strong className="text-zinc-200">Rationale:</strong> {trade.rationale}
                        </p>
                      </div>
                      <div className="flex md:flex-col gap-4 justify-center md:w-64 border-t md:border-t-0 md:border-l border-zinc-800 pt-4 md:pt-0 md:pl-6 shrink-0">
                        <div>
                          <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">CHOSEN PATH</span>
                          <span className="text-xs font-mono font-bold text-accent">{trade.choice}</span>
                        </div>
                        <div>
                          <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest block mb-1">DISCARDED ALTERNATIVE</span>
                          <span className="text-xs font-mono font-bold text-zinc-600 line-through">{trade.alternative}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Engineering Highlights */}
            <section>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white">
                <Cpu className="text-accent" /> System Engineering Highlights
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {(project.highlights as string[]).map((highlight: string, i: number) => (
                  <div key={i} className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 group hover:border-zinc-600 transition-colors duration-500">
                    <div className="h-1.5 w-8 bg-accent/30 rounded-full mb-4 group-hover:bg-accent/60 transition-colors" />
                    <p className="text-zinc-400 font-medium text-sm leading-relaxed">{highlight}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Challenges */}
            <section>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white">
                <Layout className="text-accent" /> Bottlenecks &amp; Post-Mortem Solutions
              </h2>
              <div className="space-y-4">
                {(project.challenges as string[]).map((challenge: string, i: number) => (
                  <div key={i} className="flex gap-4 p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-600 transition-colors duration-300">
                    <div className="text-accent font-mono text-sm font-bold mt-0.5 shrink-0">0{i + 1}.</div>
                    <p className="text-zinc-400 text-sm leading-relaxed">{challenge}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-10">
            <TrafficSimulator
              baseThroughput={project.metrics[0].value}
              baseLatency={project.metrics[1].value}
            />

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4 font-mono">Platform Stack</h4>
              <div className="flex flex-wrap gap-2">
                {(project.techStack as string[]).map((tech: string) => (
                  <span key={tech} className="px-3.5 py-1.5 bg-zinc-900 text-zinc-400 text-xs font-mono rounded-lg border border-zinc-800 hover:border-zinc-600 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.schemaSnippet && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4 font-mono flex items-center gap-2">
                  <Database size={14} className="text-accent" /> Data Models Scoping
                </h4>
                <div className="rounded-2xl border border-zinc-800 overflow-hidden bg-black">
                  <div className="bg-zinc-900 px-4 py-2 border-b border-zinc-800 text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                    database_schema.sql
                  </div>
                  <pre className="p-5 text-[11px] font-mono text-zinc-400 overflow-x-auto">
                    <code>{project.schemaSnippet}</code>
                  </pre>
                </div>
              </div>
            )}

            <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-colors duration-300">
              <h4 className="font-bold mb-3 text-white tracking-tight">Need a scalable backend engineer?</h4>
              <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                I am currently looking for full-time software engineering roles where I can design, monitor, and optimize backend architectures.
              </p>
              <Link href="/#contact">
                <Button className="w-full bg-accent text-black hover:bg-accent/90 font-mono text-xs font-bold py-5 rounded-xl shadow-lg shadow-accent/20">
                  CONNECT_ENGINEER
                </Button>
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <footer className="border-t border-zinc-800 mt-32 py-12 bg-zinc-900">
        <div className="container text-center text-xs text-zinc-600">
          <p>© {new Date().getFullYear()} Keerthana Salla. All Rights Reserved. Built with Next.js &amp; Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}

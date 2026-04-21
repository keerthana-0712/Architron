import { projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, ExternalLink, Database, Cpu, Layout, Boxes } from "lucide-react";
import Link from "next/link";
import ProjectArchitecture from "@/components/ProjectArchitecture";
import TrafficSimulator from "@/components/TrafficSimulator";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-foreground">
      {/* Background decoration */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none -z-10" />

      <div className="container py-12 lg:py-20 mx-auto px-4 md:px-6">
        <Link href="/#projects">
          <Button variant="ghost" className="mb-8 group -ml-4 text-muted-foreground hover:text-foreground border border-transparent hover:border-border">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Overview
          </Button>
        </Link>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="flex flex-col lg:col-span-7 xl:col-span-8 pr-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6 text-balance">
              {project.title}
            </h1>
            
            {(() => {
              const blocks = project.fullDescription.split('\n\n');
              const introBlocks = blocks.filter(b => !b.includes('🔹') && !b.trim().startsWith('-'));
              const featureBlocks = blocks.filter(b => b.includes('🔹') || b.trim().startsWith('-'));
              
              const introTop = introBlocks.slice(0, 2);
              const introRest = introBlocks.slice(2);

              return (
                <>
                  <div className="space-y-6 max-w-xl">
                    {introTop.map((block, i) => (
                      <p key={i} className={`text-muted-foreground leading-relaxed ${i === 0 ? 'text-xl' : 'text-lg'}`}>
                        {block}
                      </p>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mt-8 mb-16">
                    <Button className="rounded-full px-6 bg-foreground text-background hover:bg-foreground/90 gap-2">
                      <Github size={18} /> View Source
                    </Button>
                    <Button variant="outline" className="rounded-full px-6 gap-2">
                      <ExternalLink size={18} /> Live Performance
                    </Button>
                  </div>

                  {introRest.length > 0 && (
                     <div className="space-y-6 max-w-xl">
                      {introRest.map((block, i) => (
                        <p key={i} className="text-muted-foreground leading-relaxed text-lg">
                          {block}
                        </p>
                      ))}
                     </div>
                  )}
                </>
              );
            })()}
          </div>

          <div className="grid grid-cols-2 gap-4 lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 h-max lg:mt-10">
            {project.metrics.map((metric, i) => (
              <div key={i} className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-center items-center text-center shadow-sm hover:border-accent/40 transition-colors">
                 <span className="text-3xl font-bold text-accent mb-1">{metric.value}</span>
                 <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{metric.label}</span>
              </div>
            ))}
            <div className="p-6 rounded-2xl bg-accent text-accent-foreground flex flex-col justify-center items-center text-center shadow-lg shadow-accent/10">
               <Cpu className="mb-2" size={24} />
               <span className="text-[10px] uppercase font-bold tracking-tighter">System Scaled</span>
            </div>
          </div>
        </div>

        {/* Statement of Purpose */}
        {project.statementOfPurpose && (
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="text-accent text-3xl font-serif">“</span> Developer's Mission
            </h2>
            <div className="p-8 md:p-12 rounded-3xl bg-muted/20 border border-border/50 relative overflow-hidden group hover:border-accent/30 transition-colors duration-500">
              <div className="absolute top-0 left-0 w-2 h-full bg-accent/60 rounded-l-3xl"></div>
              <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-5xl">
                {project.statementOfPurpose.split('\n\n').map((paragraph, i) => {
                  const formatted = paragraph.split('**').map((chunk, index) => 
                    index % 2 === 1 ? <strong key={index} className="text-foreground tracking-tight font-semibold bg-accent/10 px-1 rounded-sm">{chunk}</strong> : chunk
                  );
                  return <p key={i}>{formatted}</p>;
                })}
              </div>
            </div>
          </div>
        )}

        {/* Feature Modules (Moved from Hero) */}
        {(() => {
           const blocks = project.fullDescription.split('\n\n');
           const featureBlocks = blocks.filter(b => b.includes('🔹') || b.trim().startsWith('-'));
           if (featureBlocks.length === 0) return null;

           return (
             <div className="mb-20">
               <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                 <Boxes className="text-accent" /> Platform Domains
               </h2>
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {featureBlocks.map((block, i) => (
                   <div key={i} className="p-8 rounded-2xl bg-card border border-border shadow-sm group hover:border-accent/40 transition-colors">
                     {block.split('\n').map((line, j) => {
                       const trimmed = line.trim();
                       if (trimmed.startsWith('🔹')) {
                         return <h3 key={j} className="text-foreground font-semibold text-lg mb-6 text-accent tracking-tight">{trimmed.replace('🔹', '').trim()}</h3>;
                       } else if (trimmed.startsWith('-')) {
                         return (
                           <div key={j} className="flex gap-4 mb-4 text-muted-foreground text-sm items-start">
                             <span className="text-accent mt-2 h-1.5 w-1.5 rounded-full shrink-0 bg-accent/80 group-hover:scale-125 transition-transform" />
                             <span className="leading-relaxed">{trimmed.substring(1).trim()}</span>
                           </div>
                         );
                       }
                       return trimmed ? <p key={j} className="text-muted-foreground mb-4 text-sm">{trimmed}</p> : null;
                     })}
                   </div>
                 ))}
               </div>
             </div>
           );
        })()}



        <hr className="border-border/60 mb-20" />

        {/* Project Content */}
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            
            {/* System Architecture */}
            <section>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Boxes className="text-accent" /> System Architecture
              </h2>
              <div className="mb-6">
                 <ProjectArchitecture 
                   title={project.architectureTitle} 
                   nodes={project.nodes} 
                   connections={[]} // Simplified for now
                 />
              </div>
              <h3 className="text-xl font-semibold mb-3">{project.architectureTitle}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.architectureDesc}
              </p>
            </section>



            {/* Engineering Highlights */}
            <section>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Cpu className="text-accent" /> Engineering Highlights
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {project.highlights.map((highlight, i) => (
                  <div key={i} className="p-6 rounded-xl border border-border bg-muted/30 group hover:border-accent/40 transition-colors">
                    <div className="h-2 w-8 bg-accent/20 rounded-full mb-4 group-hover:bg-accent/40 transition-colors" />
                    <p className="text-muted-foreground font-medium">{highlight}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Challenges */}
            <section>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Layout className="text-accent" /> Challenges & Solutions
              </h2>
              <div className="space-y-6">
                {project.challenges.map((challenge, i) => (
                  <div key={i} className="flex gap-4 p-6 rounded-xl border border-border/50">
                    <div className="text-accent font-mono text-lg font-bold">0{i+1}.</div>
                    <p className="text-muted-foreground leading-relaxed">{challenge}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-12">
            <TrafficSimulator 
              baseThroughput={project.metrics[0].value} 
              baseLatency={project.metrics[1].value} 
            />
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-4 py-2 bg-secondary text-secondary-foreground text-sm font-medium rounded-lg border border-border/50">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.schemaSnippet && (
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
                  <Database size={16} /> Schema / Structure
                </h4>
                <div className="rounded-xl border border-border overflow-hidden bg-zinc-950">
                  <div className="bg-zinc-900 px-4 py-2 border-b border-border text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                    model_definition
                  </div>
                  <pre className="p-6 text-sm font-mono text-zinc-300 overflow-x-auto">
                    <code>{project.schemaSnippet}</code>
                  </pre>
                </div>
              </div>
            )}

            <div className="p-8 rounded-2xl bg-muted/40 border border-border">
               <h4 className="font-bold mb-4">Involved in this?</h4>
               <p className="text-sm text-muted-foreground mb-6">
                 I'm currently seeking roles where I can apply this type of system thinking to real products.
               </p>
               <Link href="/#contact">
                 <Button className="w-full bg-accent text-accent-foreground hover:bg-accent-hover font-bold">
                   Hire Me
                 </Button>
               </Link>
            </div>
          </aside>
        </div>
      </div>

      <footer className="border-t border-border mt-32 py-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Keerthana Salla. Built with Next.js & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}

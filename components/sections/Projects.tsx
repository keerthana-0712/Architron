"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/projects";
import Link from "next/link";

export default function Projects() {
  return (
    <section id="projects" className="py-24 container relative mt-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4 text-center md:text-left">Production Systems & Projects</h2>
          <p className="text-muted-foreground text-lg max-w-none text-center md:text-left">
            A selection of highly scalable architectures, platforms, and products engineered for performance.
          </p>
        </div>
        <div className="flex justify-center">
          <Button variant="outline" className="rounded-full gap-2">
            View All Projects <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {projects.map((proj, i) => (
          <motion.div
            key={proj.id}
            id={proj.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="flex flex-col h-full overflow-hidden rounded-2xl bg-card border border-border group hover:border-accent hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgb(255,181,139,0.05)] transition-all"
          >
            {/* Visual Header Placeholder or Thumbnail */}
            <div className="h-48 bg-muted border-b border-border/50 relative overflow-hidden flex items-center justify-center">
              {proj.thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={proj.thumbnail} alt={proj.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent z-10" />
                  {/* Fake Architecture Line Graphic */}
                  <div className="w-[120%] h-[1px] bg-accent/30 absolute top-1/2 -rotate-12 blur-[1px]"></div>
                  <div className="text-foreground/20 font-mono text-4xl select-none">System_Node_{i+1}</div>
                </>
              )}
            </div>

            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-accent transition-colors">
                {proj.title}
              </h3>
              <p className="text-muted-foreground mb-6 flex-1 text-sm leading-relaxed">
                {proj.description}
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3 font-mono">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {proj.techStack.slice(0, 4).map(stack => (
                      <span key={stack} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                        {stack}
                      </span>
                    ))}
                    {proj.techStack.length > 4 && <span className="text-xs text-muted-foreground self-center">+{proj.techStack.length - 4} more</span>}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3 font-mono">Engineering Metric</h4>
                  <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-accent">{proj.metrics[0].value}</span>
                      <span className="text-[10px] text-muted-foreground uppercase">{proj.metrics[0].label}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                <Button variant="ghost" size="sm" className="gap-2 -ml-3 text-muted-foreground hover:text-foreground">
                  <Github className="h-4 w-4" /> Code
                </Button>
                <Link href={`/projects/${proj.id}`}>
                  <Button variant="ghost" size="sm" className="gap-2 text-accent hover:text-accent-hover hover:bg-accent/10">
                    System Design <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

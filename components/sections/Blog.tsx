"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock, Lightbulb, PenTool, Rocket, Settings, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const CATEGORIES = [
  { id: "all", label: "All Articles", icon: BookOpen },
  { id: "engineering", label: "Engineering Blogs", icon: Settings },
  { id: "build-logs", label: "Build Logs", icon: PenTool },
  { id: "case-studies", label: "Case Studies", icon: Star },
  { id: "product", label: "Product Thinking", icon: Lightbulb },
  { id: "learning", label: "Learning Journey", icon: Rocket },
];

const POSTS = [
  // A. Engineering Blogs (Core Technical Depth)
  {
    title: "How I Designed a Scalable System for FOTHS",
    excerpt: "Exploring the distributed microservices architecture and API Gateway orchestration that powers a global spiritual ecosystem.",
    date: "May 2024",
    readTime: "12 min read",
    category: "engineering",
    tags: ["Architecture", "Scale"]
  },
  {
    title: "How I Built Production-Grade Apps Using AI (And What I Learned)",
    excerpt: "A deep dive into using LLMs as architectural partners and force multipliers in high-complexity product development.",
    date: "May 2024",
    readTime: "10 min read",
    category: "engineering",
    tags: ["AI", "SDLC"]
  },
  {
    title: "System Design: Scaling a Global Prayer Platform (FOTHS Case Study)",
    excerpt: "Solving for real-time consistency and low latency across global regions using Kafka and distributed database clusters.",
    date: "Apr 2024",
    readTime: "15 min read",
    category: "engineering",
    tags: ["System Design", "Kafka"]
  },
  {
    title: "How to Design Real-Time Systems (Digital Twin Project)",
    excerpt: "Implementing high-frequency state synchronization and reactive UI updates for complex system simulations.",
    date: "Apr 2024",
    readTime: "11 min read",
    category: "engineering",
    tags: ["Real-time", "WebSockets"]
  },
  {
    title: "From Idea → Production: My Development Workflow",
    excerpt: "A transparent look at my end-to-end engineering process, from requirements gathering to CI/CD and production monitoring.",
    date: "Mar 2024",
    readTime: "8 min read",
    category: "engineering",
    tags: ["Workflow", "Best Practices"]
  },

  // B. Build Logs
  {
    title: "Building FOTHS: Day 1 → Vision",
    excerpt: "Documenting the initial spark and the product strategy that transformed a fragmented landscape into a unified mission.",
    date: "Mar 2024",
    readTime: "7 min read",
    category: "build-logs",
    tags: ["Vision", "Product"]
  },
  {
    title: "Mistakes I Made While Building My First Large-Scale Product",
    excerpt: "A transparent reflection on architectural technical debt and the lessons learned from scaling FOTHS.",
    date: "Feb 2024",
    readTime: "9 min read",
    category: "build-logs",
    tags: ["Reflection", "Growth"]
  },
  {
    title: "How I Structured 30+ Modules in FOTHS",
    excerpt: "Managing domain separation and module interoperability in an 'All-In-One' platform without creating a monolith.",
    date: "Feb 2024",
    readTime: "13 min read",
    category: "build-logs",
    tags: ["Modularity", "Systems"]
  },
  {
    title: "Challenges in Designing Multi-Feature Platforms",
    excerpt: "Navigating the complexities of UI/UX cohesion and backend orchestration in feature-rich environments.",
    date: "Jan 2024",
    readTime: "10 min read",
    category: "build-logs",
    tags: ["UX", "Engineering"]
  },

  // C. Case Studies
  {
    title: "FOTHS Case Study: Unifying the Spiritual Digital Experience",
    excerpt: "Problem: Scattered apps. Solution: One platform. A deep dive into tech decisions, challenges, and the future vision of digital revival.",
    date: "Jan 2024",
    readTime: "18 min read",
    category: "case-studies",
    tags: ["Case Study", "Product"]
  },

  // D. How I Learned
  {
    title: "How I Learned React by Building Real Products",
    excerpt: "Moving beyond tutorials to master state management and performance through the lens of real-world constraints.",
    date: "Dec 2023",
    readTime: "8 min read",
    category: "learning",
    tags: ["Learning", "React"]
  },
  {
    title: "How I Built Production Apps Using AI Without Knowing Everything",
    excerpt: "Leveraging AI as a tool for rapid prototyping, architectural guidance, and debugging complex distributed systems.",
    date: "Nov 2023",
    readTime: "9 min read",
    category: "learning",
    tags: ["AI", "Innovation"]
  },
  {
    title: "How I Learned System Design Without Industry Experience",
    excerpt: "The self-taught roadmap to understanding high-level architecture through project experimentation and iterative failures.",
    date: "Oct 2023",
    readTime: "10 min read",
    category: "learning",
    tags: ["System Design", "Growth"]
  },
  {
    title: "How I Went from Zero → Building Complex Platforms",
    excerpt: "The journey of technical evolution, from simple scripts to orchestrating 30+ integrated modules.",
    date: "Sep 2023",
    readTime: "12 min read",
    category: "learning",
    tags: ["Journey", "Evolution"]
  },

  // E. Concept Explainers
  {
    title: "What is System Design? (Explained Simply)",
    excerpt: "Demystifying high-level architecture, scalability, and distributed systems using real-world analogies.",
    date: "Aug 2023",
    readTime: "6 min read",
    category: "engineering",
    tags: ["Education", "Systems"]
  },
  {
    title: "What is Scalability in Real-World Apps?",
    excerpt: "Understanding vertical vs horizontal scaling and how systems handle traffic spikes without breaking.",
    date: "Jul 2023",
    readTime: "7 min read",
    category: "engineering",
    tags: ["Scalability", "Backend"]
  },
  {
    title: "Frontend vs Backend vs Full Stack (With Real Examples)",
    excerpt: "Breaking down the modern tech stack and how the layers communicate to deliver complex user experiences.",
    date: "Jul 2023",
    readTime: "8 min read",
    category: "engineering",
    tags: ["Education", "Stack"]
  },
  {
    title: "What Happens When You Open a Website?",
    excerpt: "From DNS resolution to rendering: A deep dive into the network and browser events that occur in milliseconds.",
    date: "Jun 2023",
    readTime: "10 min read",
    category: "engineering",
    tags: ["Networking", "Systems"]
  },

  // F. Product Thinking
  {
    title: "How I Think Like a Product Engineer",
    excerpt: "Why the best engineers focus on 'Why' before 'How' and how that translates into better system architecture.",
    date: "Jun 2023",
    readTime: "8 min read",
    category: "product",
    tags: ["Product", "Strategy"]
  },
  {
    title: "How I Design Features Before Coding",
    excerpt: "The importance of wireframing, user flows, and product discovery in the engineering lifecycle.",
    date: "Jun 2023",
    readTime: "7 min read",
    category: "product",
    tags: ["Design", "Planning"]
  },
  {
    title: "User-First vs Tech-First Development",
    excerpt: "Balancing technical excellence with user value to build products that actually solve real problems.",
    date: "May 2023",
    readTime: "9 min read",
    category: "product",
    tags: ["Mindset", "Value"]
  },
  {
    title: "Breaking Down Apps Like Instagram, Notion, and Spotify",
    excerpt: "Deconstructing successful products to understand their engineering trade-offs and product-led growth strategies.",
    date: "Apr 2023",
    readTime: "11 min read",
    category: "product",
    tags: ["Analysis", "Systems"]
  }
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPosts = activeCategory === "all" 
    ? POSTS.slice(0, 6) 
    : POSTS.filter(post => post.category === activeCategory);

  return (
    <section id="blog" className="py-24 container mt-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">Engineering Blog</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            I don't just build systems—I think deeply about them. Documenting my journey through 
            <span className="text-accent font-medium"> product engineering</span>, 
            <span className="text-accent font-medium"> system design</span>, and 
            <span className="text-accent font-medium"> architectural case studies</span>.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-12">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                activeCategory === cat.id
                  ? "bg-accent text-accent-foreground border-accent shadow-lg shadow-accent/20"
                  : "bg-muted/50 text-muted-foreground border-border hover:border-accent/40"
              }`}
            >
              <Icon size={14} />
              {cat.label}
            </button>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, i) => (
          <motion.div
            key={post.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col p-8 rounded-2xl bg-card border border-border group hover:border-accent hover:shadow-xl transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <BookOpen size={80} />
            </div>

            <div className="flex items-center gap-2 mb-6">
               {post.tags.map(tag => (
                 <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-accent px-2 py-0.5 rounded bg-accent/10 border border-accent/20">{tag}</span>
               ))}
            </div>
            
            <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-accent transition-colors leading-snug">
              {post.title}
            </h3>
            
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">
              {post.excerpt}
            </p>

            <div className="pt-6 border-t border-border flex items-center justify-between mt-auto">
               <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                 <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
                 <span>•</span>
                 <span>{post.date}</span>
               </div>
               <Button variant="ghost" size="sm" className="h-8 px-0 text-foreground hover:bg-transparent hover:text-accent font-bold gap-2 group/btn">
                 Read <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
               </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {activeCategory === "all" && (
        <div className="mt-16 flex justify-center">
          <Button variant="outline" className="rounded-full gap-2 group h-12 px-8 font-bold border-2">
            View All Research & Articles <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      )}
    </section>
  );
}

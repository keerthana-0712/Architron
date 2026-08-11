"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ArrowLeft,
  BookOpen, 
  Clock, 
  Lightbulb, 
  PenTool, 
  Rocket, 
  Settings, 
  Star, 
  Search, 
  Heart, 
  Eye, 
  Database,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

const CATEGORIES = [
  { id: "all", label: "All Articles", icon: BookOpen },
  { id: "engineering", label: "Engineering Blogs", icon: Settings },
  { id: "system-design", label: "System Design", icon: Database },
  { id: "client-projects", label: "Client Projects", icon: Briefcase },
  { id: "build-logs", label: "Build Logs", icon: PenTool },
  { id: "case-studies", label: "Case Studies", icon: Star },
  { id: "product", label: "Product Thinking", icon: Lightbulb },
  { id: "learning", label: "Learning Journey", icon: Rocket },
];

const POSTS = [
  // G. Client Projects
  {
    slug: "building-clientra-agency-os-from-scratch",
    title: "Building Clientra: A Multi-Tenant Agency Operating System",
    excerpt: "Exploring the SaaS database schema isolation policies, real-time Kanban gateways, and automated billing engines.",
    date: "Jun 2024",
    readTime: "11 min read",
    category: "client-projects",
    tags: ["SaaS", "Prisma", "NestJS"],
    views: "1.6k reads",
    likes: 134,
    gradient: "linear-gradient(135deg, rgba(255, 140, 90, 0.15) 0%, rgba(255, 181, 139, 0.05) 100%)"
  },
  {
    slug: "ambassadors-for-the-lord-digital-sanctuary",
    title: "Designing Ambassadors for the Lord: Anonymity-First Architecture",
    excerpt: "How I engineered a secure, zero-friction communication environment for spiritual counseling and community support.",
    date: "May 2024",
    readTime: "9 min read",
    category: "client-projects",
    tags: ["Security", "WebSockets", "NestJS"],
    views: "1.2k reads",
    likes: 95,
    gradient: "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.05) 100%)"
  },
  // A. Engineering Blogs
  {
    slug: "how-i-designed-a-scalable-system-for-foths",
    title: "How I Designed a Scalable System for FOTHS",
    excerpt: "Exploring the distributed microservices architecture and API Gateway orchestration that powers a global spiritual ecosystem.",
    date: "May 2024",
    readTime: "12 min read",
    category: "engineering",
    tags: ["Architecture", "Scale"],
    views: "1.4k reads",
    likes: 124,
    gradient: "linear-gradient(135deg, rgba(255, 140, 90, 0.15) 0%, rgba(255, 181, 139, 0.05) 100%)"
  },
  {
    slug: "how-i-built-production-grade-apps-using-ai",
    title: "How I Built Production-Grade Apps Using AI (And What I Learned)",
    excerpt: "A deep dive into using LLMs as architectural partners and force multipliers in high-complexity product development.",
    date: "May 2024",
    readTime: "10 min read",
    category: "engineering",
    tags: ["AI", "SDLC"],
    views: "1.2k reads",
    likes: 98,
    gradient: "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.05) 100%)"
  },
  {
    slug: "system-design-scaling-a-global-prayer-platform",
    title: "System Design: Scaling a Global Prayer Platform (FOTHS Case Study)",
    excerpt: "Solving for real-time consistency and low latency across global regions using Kafka and distributed database clusters.",
    date: "Apr 2024",
    readTime: "15 min read",
    category: "system-design",
    tags: ["System Design", "Kafka"],
    views: "2.1k reads",
    likes: 189,
    gradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(239, 68, 68, 0.05) 100%)"
  },
  {
    slug: "how-to-design-real-time-systems",
    title: "How to Design Real-Time Systems (Digital Twin Project)",
    excerpt: "Implementing high-frequency state synchronization and reactive UI updates for complex system simulations.",
    date: "Apr 2024",
    readTime: "11 min read",
    category: "engineering",
    tags: ["Real-time", "WebSockets"],
    views: "920 reads",
    likes: 72,
    gradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.05) 100%)"
  },
  {
    slug: "from-idea-to-production-my-development-workflow",
    title: "From Idea → Production: My Development Workflow",
    excerpt: "A transparent look at my end-to-end engineering process, from requirements gathering to CI/CD and production monitoring.",
    date: "Mar 2024",
    readTime: "8 min read",
    category: "engineering",
    tags: ["Workflow", "Best Practices"],
    views: "1.1k reads",
    likes: 85,
    gradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6) 100%)"
  },

  // B. Build Logs
  {
    slug: "building-foths-day-1-vision",
    title: "Building FOTHS: Day 1 → Vision",
    excerpt: "Documenting the initial spark and the product strategy that transformed a fragmented landscape into a unified mission.",
    date: "Mar 2024",
    readTime: "7 min read",
    category: "build-logs",
    tags: ["Vision", "Product"],
    views: "950 reads",
    likes: 80,
    gradient: "linear-gradient(135deg, rgba(255, 140, 90, 0.15) 0%, rgba(255, 181, 139, 0.05) 100%)"
  },
  {
    slug: "mistakes-i-made-while-building-my-first-large-scale-product",
    title: "Mistakes I Made While Building My First Large-Scale Product",
    excerpt: "A transparent reflection on architectural technical debt and the lessons learned from scaling FOTHS.",
    date: "Feb 2024",
    readTime: "9 min read",
    category: "build-logs",
    tags: ["Reflection", "Growth"],
    views: "1.3k reads",
    likes: 110,
    gradient: "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.05) 100%)"
  },
  {
    slug: "how-i-structured-30-plus-modules-in-foths",
    title: "How I Structured 30+ Modules in FOTHS",
    excerpt: "Managing domain separation and module interoperability in an 'All-In-One' platform without creating a monolith.",
    date: "Feb 2024",
    readTime: "13 min read",
    category: "build-logs",
    tags: ["Modularity", "Systems"],
    views: "1.0k reads",
    likes: 76,
    gradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(239, 68, 68, 0.05) 100%)"
  },
  {
    slug: "challenges-in-designing-multi-feature-platforms",
    title: "Challenges in Designing Multi-Feature Platforms",
    excerpt: "Navigating the complexities of UI/UX cohesion and backend orchestration in feature-rich environments.",
    date: "Jan 2024",
    readTime: "10 min read",
    category: "build-logs",
    tags: ["UX", "Engineering"],
    views: "850 reads",
    likes: 64,
    gradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.05) 100%)"
  },

  // C. Case Studies
  {
    slug: "foths-case-study-unifying-spiritual-digital-experience",
    title: "FOTHS Case Study: Unifying the Spiritual Digital Experience",
    excerpt: "Problem: Scattered apps. Solution: One platform. A deep dive into tech decisions, challenges, and the future vision of digital revival.",
    date: "Jan 2024",
    readTime: "18 min read",
    category: "case-studies",
    tags: ["Case Study", "Product"],
    views: "1.8k reads",
    likes: 145,
    gradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6) 100%)"
  },

  // D. How I Learned
  {
    slug: "how-i-learned-react-by-building-real-products",
    title: "How I Learned React by Building Real Products",
    excerpt: "Moving beyond tutorials to master state management and performance through the lens of real-world constraints.",
    date: "Dec 2023",
    readTime: "8 min read",
    category: "learning",
    tags: ["Learning", "React"],
    views: "1.1k reads",
    likes: 90,
    gradient: "linear-gradient(135deg, rgba(255, 140, 90, 0.15) 0%, rgba(255, 181, 139, 0.05) 100%)"
  },
  {
    slug: "how-i-built-production-apps-using-ai-without-knowing-everything",
    title: "How I Built Production Apps Using AI Without Knowing Everything",
    excerpt: "Leveraging AI as a tool for rapid prototyping, architectural guidance, and debugging complex distributed systems.",
    date: "Nov 2023",
    readTime: "9 min read",
    category: "learning",
    tags: ["AI", "Innovation"],
    views: "1.0k reads",
    likes: 82,
    gradient: "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.05) 100%)"
  },
  {
    slug: "how-i-learned-system-design-without-industry-experience",
    title: "How I Learned System Design Without Industry Experience",
    excerpt: "The self-taught roadmap to understanding high-level architecture through project experimentation and iterative failures.",
    date: "Oct 2023",
    readTime: "10 min read",
    category: "system-design",
    tags: ["System Design", "Growth"],
    views: "1.5k reads",
    likes: 130,
    gradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(239, 68, 68, 0.05) 100%)"
  },
  {
    slug: "how-i-went-from-zero-to-building-complex-platforms",
    title: "How I Went from Zero → Building Complex Platforms",
    excerpt: "The journey of technical evolution, from simple scripts to orchestrating 30+ integrated modules.",
    date: "Sep 2023",
    readTime: "12 min read",
    category: "learning",
    tags: ["Journey", "Evolution"],
    views: "1.2k reads",
    likes: 95,
    gradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.05) 100%)"
  },

  // E. Concept Explainers
  {
    slug: "what-is-system-design-explained-simply",
    title: "What is System Design? (Explained Simply)",
    excerpt: "Demystifying high-level architecture, scalability, and distributed systems using real-world analogies.",
    date: "Aug 2023",
    readTime: "6 min read",
    category: "system-design",
    tags: ["Education", "Systems"],
    views: "800 reads",
    likes: 58,
    gradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6) 100%)"
  },
  {
    slug: "what-is-scalability-in-real-world-apps",
    title: "What is Scalability in Real-World Apps?",
    excerpt: "Understanding vertical vs horizontal scaling and how systems handle traffic spikes without breaking.",
    date: "Jul 2023",
    readTime: "7 min read",
    category: "engineering",
    tags: ["Scalability", "Backend"],
    views: "940 reads",
    likes: 62,
    gradient: "linear-gradient(135deg, rgba(255, 140, 90, 0.15) 0%, rgba(255, 181, 139, 0.05) 100%)"
  },
  {
    slug: "frontend-vs-backend-vs-full-stack",
    title: "Frontend vs Backend vs Full Stack (With Real Examples)",
    excerpt: "Breaking down the modern tech stack and how the layers communicate to deliver complex user experiences.",
    date: "Jul 2023",
    readTime: "8 min read",
    category: "engineering",
    tags: ["Education", "Stack"],
    views: "780 reads",
    likes: 50,
    gradient: "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.05) 100%)"
  },
  {
    slug: "what-happens-when-you-open-a-website",
    title: "What Happens When You Open a Website?",
    excerpt: "From DNS resolution to rendering: A deep dive into the network and browser events that occur in milliseconds.",
    date: "Jun 2023",
    readTime: "10 min read",
    category: "engineering",
    tags: ["Networking", "Systems"],
    views: "1.1k reads",
    likes: 78,
    gradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(239, 68, 68, 0.05) 100%)"
  },

  // F. Product Thinking
  {
    slug: "how-i-think-like-a-product-engineer",
    title: "How I Think Like a Product Engineer",
    excerpt: "Why the best engineers focus on 'Why' before 'How' and how that translates into better system architecture.",
    date: "Jun 2023",
    readTime: "8 min read",
    category: "product",
    tags: ["Product", "Strategy"],
    views: "890 reads",
    likes: 68,
    gradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.05) 100%)"
  },
  {
    slug: "how-i-design-features-before-coding",
    title: "How I Design Features Before Coding",
    excerpt: "The importance of wireframing, user flows, and product discovery in the engineering lifecycle.",
    date: "Jun 2023",
    readTime: "7 min read",
    category: "product",
    tags: ["Design", "Planning"],
    views: "740 reads",
    likes: 54,
    gradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6) 100%)"
  },
  {
    slug: "user-first-vs-tech-first-development",
    title: "User-First vs Tech-First Development",
    excerpt: "Balancing technical excellence with user value to build products that actually solve real problems.",
    date: "May 2023",
    readTime: "9 min read",
    category: "product",
    tags: ["Mindset", "Value"],
    views: "820 reads",
    likes: 60,
    gradient: "linear-gradient(135deg, rgba(255, 140, 90, 0.15) 0%, rgba(255, 181, 139, 0.05) 100%)"
  },
  {
    slug: "breaking-down-apps-like-instagram-notion-and-spotify",
    title: "Breaking Down Apps Like Instagram, Notion, and Spotify",
    excerpt: "Deconstructing successful products to understand their engineering trade-offs and product-led growth strategies.",
    date: "Apr 2023",
    readTime: "11 min read",
    category: "product",
    tags: ["Analysis", "Systems"],
    views: "1.4k reads",
    likes: 105,
    gradient: "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.05) 100%)"
  }
];

const CATCHY_SLUGS = [
  "system-design-scaling-a-global-prayer-platform",
  "breaking-down-apps-like-instagram-notion-and-spotify",
  "how-i-learned-system-design-without-industry-experience"
];

export default function Blog({ isFullPage = false }: { isFullPage?: boolean }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filteredPosts = POSTS.filter(post => {
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Featured article: the specified post matching filters, only highlighted in "all" or specific lists
  const defaultFeaturedPost = POSTS.find(p => p.slug === "from-idea-to-production-my-development-workflow") || POSTS[0];
  const featuredPost = (isFullPage ? (searchQuery === "" && activeCategory === "all") : true) ? defaultFeaturedPost : null;
  
  // Grid posts: excluding the featured post if visible
  const allGridPosts = featuredPost 
    ? filteredPosts.filter(p => p.slug !== featuredPost.slug)
    : filteredPosts;

  const isDefaultState = searchQuery === "" && activeCategory === "all";

  const gridPosts = !isFullPage
    ? allGridPosts.filter(p => CATCHY_SLUGS.includes(p.slug))
                  .sort((a, b) => CATCHY_SLUGS.indexOf(a.slug) - CATCHY_SLUGS.indexOf(b.slug))
    : allGridPosts;

  return (
    <section id="blog" className="py-24 container mt-10 max-w-7xl mx-auto px-4 sm:px-6">
      {isFullPage && (
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-accent font-mono text-sm transition-colors group">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Overview
          </Link>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div className="max-w-4xl lg:max-w-none">
          <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">Engineering Blog</h2>
          <p className="text-muted-foreground text-lg leading-relaxed lg:whitespace-nowrap">
            I don't just build systems—I think deeply about them. Documenting my journey through 
            <span className="text-accent font-medium"> product engineering</span>, 
            <span className="text-accent font-medium"> system design</span>, and 
            <span className="text-accent font-medium"> architectural case studies</span>.
          </p>
        </div>

        {/* Dynamic Search Bar */}
        {isFullPage && (
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-card/50 backdrop-blur-sm border border-border/80 rounded-full text-sm text-foreground focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        )}
      </div>

      {/* Category Tabs */}
      {isFullPage && (
        <div className="flex flex-wrap gap-2.5 mb-12 border-b border-border/20 pb-6">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all border cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-accent/15 text-accent border-accent/35 shadow-lg shadow-accent/5"
                    : "bg-card/40 text-muted-foreground border-border/60 hover:border-accent/40 hover:text-foreground"
                }`}
              >
                <Icon size={14} />
                {cat.label}
              </button>
            );
          })}
        </div>
      )}

      <div className="space-y-10">
        {/* Featured Article Layout */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative rounded-3xl border border-border bg-card/30 backdrop-blur-sm overflow-hidden p-8 lg:p-12 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300"
          >
            {/* Ambient Background Glow */}
            <div 
              className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none"
              style={{ background: featuredPost.gradient }}
            />

            <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 border border-accent/25 rounded-full">
                    Featured Post
                  </span>
                  {featuredPost.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground/85 px-2.5 py-1 rounded bg-muted/50 border border-border/50">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl sm:text-4xl font-extrabold text-foreground group-hover:text-accent transition-colors leading-tight">
                  {featuredPost.title}
                </h3>

                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                  {featuredPost.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-xs text-muted-foreground/80 font-mono pt-4 border-t border-border/30">
                  <span className="flex items-center gap-1.5"><Clock size={13} className="text-accent/70" /> {featuredPost.readTime}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1.5"><Eye size={13} className="text-accent/70" /> {featuredPost.views}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1.5"><Heart size={13} className="text-accent/70" /> {featuredPost.likes} Likes</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{featuredPost.date}</span>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between h-full lg:pl-8 lg:border-l border-border/40">
                <div className="space-y-4 mb-8 lg:mb-0">
                  <p className="text-xs font-mono text-accent/80 uppercase tracking-widest font-semibold">Author</p>
                  <div>
                    <h4 className="text-lg font-bold text-foreground">Keerthana Salla</h4>
                    <p className="text-sm text-muted-foreground">CTO @ Maxy & Founder @ FOTHS</p>
                  </div>
                  <p className="text-xs text-muted-foreground/60 leading-relaxed italic">
                    "Architecting software is the art of balancing present simplicity with future capacity."
                  </p>
                </div>
                
                <Link href={`/blog/${featuredPost.slug}`} className="block mt-6">
                  <Button className="w-full lg:w-auto rounded-xl gap-2 font-bold px-8 py-6 bg-accent text-accent-foreground hover:bg-accent/90 transition-all cursor-pointer">
                    Read Full Article <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Regular Grid Layout */}
        {gridPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {gridPosts.map((post, i) => (
                <motion.div
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex flex-col p-8 rounded-3xl bg-card/25 border border-border/80 group hover:border-accent/50 hover:shadow-xl hover:shadow-accent/[0.02] transition-all relative overflow-hidden"
                >
                  {/* Decorative Subtle Cover Glow */}
                  <div 
                    className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                    style={{ background: post.gradient || "linear-gradient(135deg, rgba(255,140,90,0.05) 0%, rgba(255,181,139,0.01) 100%)" }}
                  />

                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-[9px] font-bold uppercase tracking-widest text-accent px-2.5 py-1 rounded bg-accent/5 border border-accent/15">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground/50 uppercase">{post.category}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-accent transition-colors leading-snug relative z-10">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1 relative z-10">
                    {post.excerpt}
                  </p>

                  <div className="pt-6 border-t border-border/40 flex items-center justify-between mt-auto relative z-10">
                     <div className="flex flex-col gap-1 text-xs text-muted-foreground/80 font-mono">
                       <span className="flex items-center gap-1"><Clock size={11} className="text-accent/65" /> {post.readTime}</span>
                       <span className="flex items-center gap-1"><Eye size={11} className="text-accent/65" /> {post.views}</span>
                     </div>
                     <Link href={`/blog/${post.slug}`}>
                       <Button variant="ghost" size="sm" className="h-9 px-3 text-foreground hover:bg-accent/5 hover:text-accent font-bold gap-1.5 group/btn border border-transparent hover:border-accent/15 rounded-xl cursor-pointer">
                         Read <ArrowRight size={13} className="transition-transform group-hover/btn:translate-x-1" />
                       </Button>
                     </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-border/40 rounded-3xl bg-card/5">
            <p className="text-muted-foreground text-lg">No articles found matching "{searchQuery}".</p>
            <Button onClick={() => { setSearchQuery(""); setActiveCategory("all"); }} className="mt-4 rounded-xl font-semibold cursor-pointer" variant="outline">
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {!isFullPage && (
        <div className="mt-16 flex justify-center">
          <Link href="/blog">
            <Button 
              className="rounded-full gap-2 group h-12 px-8 font-bold border border-accent/20 cursor-pointer bg-accent text-accent-foreground hover:bg-accent/90"
            >
              View More Blogs <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      )}

      {isFullPage && isDefaultState && (
        <div className="mt-16 flex justify-center">
          <Button 
            onClick={() => setActiveCategory("engineering")}
            variant="outline" 
            className="rounded-full gap-2 group h-12 px-8 font-bold border-2 cursor-pointer"
          >
            Explore Technical Work <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      )}
    </section>
  );
}

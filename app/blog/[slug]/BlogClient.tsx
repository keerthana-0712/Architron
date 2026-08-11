"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Eye, 
  Heart, 
  Share2, 
  Linkedin, 
  Twitter, 
  Check, 
  Copy,
  ChevronRight,
  BookOpen
} from "lucide-react";
import { motion } from "framer-motion";
import { BlogPost } from "@/lib/blogs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

interface BlogClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogClient({ post, relatedPosts }: BlogClientProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [activeId, setActiveId] = useState("");
  const [headings, setHeadings] = useState<{ text: string; id: string; isSub: boolean }[]>([]);

  // Parse headings from post content for Table of Contents
  useEffect(() => {
    const lines = post.content.split("\n");
    const parsedHeadings = lines
      .filter((line) => line.startsWith("## ") || line.startsWith("### "))
      .map((line) => {
        const isSub = line.startsWith("### ");
        const text = line.replace(/^###? /, "").trim();
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        return { text, id, isSub };
      });
    setHeadings(parsedHeadings);
  }, [post.content]);

  // Track Reading Progress Bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track Table of Contents Active Heading
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -75% 0px" }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  // Handle Client-side Likes
  useEffect(() => {
    const hasLiked = localStorage.getItem(`blog-like-${post.slug}`);
    if (hasLiked) setLiked(true);
  }, [post.slug]);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikesCount((prev) => prev - 1);
      localStorage.removeItem(`blog-like-${post.slug}`);
    } else {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
      localStorage.setItem(`blog-like-${post.slug}`, "true");
    }
  };

  // Handle Copy Link
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Custom Markdown components for visual excellence
  const markdownComponents = {
    h2: ({ children }: any) => {
      const text = Array.isArray(children) ? children.join("") : String(children);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return (
        <h2 
          id={id} 
          className="text-2xl sm:text-3xl font-extrabold mt-12 mb-5 text-foreground tracking-tight scroll-mt-24 border-b border-border/30 pb-3"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children }: any) => {
      const text = Array.isArray(children) ? children.join("") : String(children);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return (
        <h3 
          id={id} 
          className="text-xl sm:text-2xl font-bold mt-8 mb-4 text-foreground tracking-tight scroll-mt-24"
        >
          {children}
        </h3>
      );
    },
    p: ({ children }: any) => (
      <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6">
        {children}
      </p>
    ),
    li: ({ children }: any) => (
      <li className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-2.5 list-disc ml-6">
        {children}
      </li>
    ),
    ul: ({ children }: any) => (
      <ul className="mb-6 space-y-1">
        {children}
      </ul>
    ),
    code({ className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      const isInline = !match;
      
      if (isInline) {
        return (
          <code 
            className="bg-accent/5 text-accent px-1.5 py-0.5 rounded font-mono text-xs sm:text-sm border border-accent/10" 
            {...props}
          >
            {children}
          </code>
        );
      }

      return (
        <div className="relative my-8 rounded-2xl border border-border bg-zinc-950/90 font-mono text-xs sm:text-sm overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-5 py-3 bg-card/60 border-b border-border/50 text-[10px] sm:text-xs text-muted-foreground">
            <span className="font-mono font-bold tracking-widest uppercase text-accent/80">{match[1]}</span>
            <button
              onClick={() => navigator.clipboard.writeText(String(children).trim())}
              className="flex items-center gap-1.5 hover:text-accent transition-colors cursor-pointer font-bold font-mono"
            >
              <Copy size={11} /> Copy Code
            </button>
          </div>
          <pre className="p-5 overflow-x-auto text-emerald-400/90 selection:bg-emerald-400/10 max-h-[500px]">
            <code className={className} {...props}>
              {children}
            </code>
          </pre>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative">
      <Navbar />

      {/* Reading Progress Bar */}
      <div className="fixed top-16 left-0 right-0 h-[3px] z-50 bg-border/20">
        <div 
          className="h-full bg-accent transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <main className="flex-1 pt-28 pb-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          {/* Back Button */}
          <Link href="/#blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-10 group cursor-pointer">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Articles
          </Link>

          {/* Article Header */}
          <div className="space-y-6 max-w-4xl mb-12">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 border border-accent/25 rounded-full">
                {post.category}
              </span>
              {post.tags.map((tag) => (
                <span key={tag} className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground/80 px-2.5 py-1 rounded bg-card border border-border">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-muted-foreground/80 font-mono py-4 border-y border-border/30">
              <span className="flex items-center gap-1.5"><Calendar size={14} className="text-accent/70" /> {post.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Clock size={14} className="text-accent/70" /> {post.readTime}</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Eye size={14} className="text-accent/70" /> {post.views}</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Heart size={14} className="text-accent/70" /> {likesCount} Likes</span>
            </div>
          </div>

          {/* Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-8 max-w-none">
              <div 
                className="w-full h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent mb-10"
              />
              <ReactMarkdown components={markdownComponents as any}>
                {post.content}
              </ReactMarkdown>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-28 self-start">
              {/* Author Info */}
              <div className="p-6 rounded-3xl border border-border/70 bg-card/20 backdrop-blur-sm space-y-4">
                <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent/80">Author</p>
                <div>
                  <h4 className="text-lg font-bold text-foreground">{post.author.name}</h4>
                  <p className="text-sm text-muted-foreground">{post.author.role}</p>
                </div>
                <p className="text-sm text-muted-foreground/70 leading-relaxed">
                  Building high-performance systems and full-stack ecosystems. Rooted in faith and designed for impact.
                </p>
              </div>

              {/* Table of Contents */}
              {headings.length > 0 && (
                <div className="p-6 rounded-3xl border border-border/70 bg-card/20 backdrop-blur-sm space-y-4">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent/80">Table of Contents</p>
                  <nav className="space-y-2.5 max-h-[300px] overflow-y-auto pr-2">
                    {headings.map((heading) => (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className={`block text-sm transition-colors cursor-pointer ${
                          heading.isSub ? "pl-4 text-xs" : ""
                        } ${
                          activeId === heading.id
                            ? "text-accent font-bold"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {heading.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Interactions Card */}
              <div className="p-6 rounded-3xl border border-border/70 bg-card/20 backdrop-blur-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                      liked 
                        ? "bg-red-500/10 text-red-500 border-red-500/30" 
                        : "bg-muted/40 text-muted-foreground border-border/60 hover:text-foreground hover:border-accent/40"
                    }`}
                  >
                    <Heart size={16} fill={liked ? "currentColor" : "none"} />
                    <span className="text-xs font-bold">{liked ? "Liked" : "Like"}</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-muted/40 text-muted-foreground border-border/60 hover:text-foreground hover:border-accent/40 transition-all cursor-pointer"
                  >
                    {copied ? <Check size={16} className="text-green-500" /> : <Share2 size={16} />}
                    <span className="text-xs font-bold">{copied ? "Copied" : "Share"}</span>
                  </button>
                </div>
              </div>
            </aside>
          </div>

          {/* Related Articles Section */}
          {relatedPosts.length > 0 && (
            <div className="mt-24 pt-16 border-t border-border/30">
              <h3 className="text-2xl font-bold tracking-tight text-foreground mb-8 flex items-center gap-2">
                <BookOpen size={20} className="text-accent" />
                Related Articles
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link href={`/blog/${relatedPost.slug}`} key={relatedPost.slug} className="group block cursor-pointer">
                    <div className="flex flex-col p-6 rounded-3xl bg-card/15 border border-border/60 h-full hover:border-accent/40 hover:shadow-xl transition-all duration-200">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/5 px-2 py-0.5 rounded border border-accent/15">
                          {relatedPost.category}
                        </span>
                        <span className="text-xs text-muted-foreground/60 font-mono">{relatedPost.date}</span>
                      </div>
                      
                      <h4 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors leading-snug mb-3">
                        {relatedPost.title}
                      </h4>
                      
                      <p className="text-muted-foreground text-xs leading-relaxed mb-6 flex-1 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-1.5 text-xs text-accent font-bold font-mono mt-auto group-hover:gap-2.5 transition-all">
                        Read Article <ChevronRight size={14} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

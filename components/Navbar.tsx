"use client";

import { ThemeToggle } from "./ThemeToggle";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between mx-auto px-4 md:px-6">
        <div
          className="font-mono text-xl font-bold tracking-tighter cursor-pointer"
          onClick={scrollToTop}
        >
          &lt;KS /&gt;
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#about" className="hover:text-foreground transition-colors">
            About
          </a>
          <a href="#journey" className="hover:text-foreground transition-colors">
            Journey
          </a>
          <a href="#skills" className="hover:text-foreground transition-colors">
            Skills
          </a>
          <a href="#projects" className="hover:text-foreground transition-colors">
            Projects
          </a>
          <a href="#experience" className="hover:text-foreground transition-colors">
            Experience
          </a>
          <a href="#blog" className="hover:text-foreground transition-colors">
            Blog
          </a>
          <a href="#contact" className="hover:text-foreground transition-colors text-accent">
            Contact
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <Link 
            href="/admin" 
            className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-accent transition-colors"
            title="System Administration"
          >
            <ShieldCheck size={18} />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

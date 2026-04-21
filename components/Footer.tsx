import { Shield, Github, Linkedin, Mail, Heart, Globe } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border bg-card/30">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="font-mono text-xl font-bold tracking-tighter text-foreground">
              &lt;KS /&gt;
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Architecting high-performance systems and building scalable products with an outcome-driven mindset.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">System</h4>
              <nav className="flex flex-col gap-2">
                <a href="#about" className="text-sm text-muted-foreground hover:text-accent transition-colors">Philosophy</a>
                <a href="#projects" className="text-sm text-muted-foreground hover:text-accent transition-colors">Projects</a>
                <a href="#documentation" className="text-sm text-muted-foreground hover:text-accent transition-colors">Docs</a>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">Social</h4>
              <nav className="flex flex-col gap-2">
                <a href="https://github.com/keerthana-0712" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-accent transition-colors">GitHub</a>
                <a href="https://www.linkedin.com/in/keerthana-salla/" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-accent transition-colors">LinkedIn</a>
              </nav>
            </div>
          </div>

          {/* System Status */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">Operations</h4>
            <div className="p-4 rounded-xl bg-background border border-border space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-muted-foreground">STATUS:</span>
                <span className="flex items-center gap-2 text-accent">
                  <span className="relative flex h-3 w-3 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-100"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent shadow-[0_0_8px_rgba(255,165,0,0.8)]"></span>
                  </span>
                  SYSTEM_HEALTHY
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-muted-foreground">DATABASE:</span>
                <span className="text-foreground">SUPABASE_CONNECTED</span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-muted-foreground">REGION:</span>
                <span className="text-foreground">GLOBAL_CDN</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/50 gap-4">
          <p className="text-[10px] font-mono text-muted-foreground">
            © {currentYear} KEERTHANA SALLA. ALL SYSTEMS OPERATIONAL.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
              BUILT WITH <Heart size={10} className="text-red-500 fill-red-500" /> AND NEXT.JS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

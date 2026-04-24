import { 
  TrendingUp, Users, Activity, Globe, ArrowUpRight, 
  Monitor, Smartphone, Download, MousePointerClick, 
  Clock, Search, Map, Calendar, Target, FileText, 
  Share2, ChevronRight, BarChart3, PieChart,
  MessageSquare, Mail, Tag, BookOpen, BrainCircuit,
  Filter, Zap, Server, Link2, Copy, Plus, LineChart
} from "lucide-react";
import CopyableUTMLink from "@/components/admin/CopyableUTMLink";
import HistoricalChart from "@/components/admin/HistoricalChart";
import TrafficSimulator from "@/components/TrafficSimulator";
import { db } from "@/lib/db";

export default async function GrowthPage() {
  // Fetch real contact messages for Contact Intelligence
  const messages = await db.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  const totalMessages = messages.length;
  // Calculate messages in last 7 days vs previous 7 days
  const recentMessages = messages.filter(m => {
    const diffTime = Math.abs(new Date().getTime() - m.createdAt.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) <= 7;
  }).length;

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out pb-24">
      
      {/* ------------------ HEADER ------------------ */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-medium mb-4 border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            System Live & Tracking
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground flex items-center gap-3">
            Growth Command Center
          </h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-2xl leading-relaxed">
            Comprehensive analytics, real-time telemetry, engagement tracking, and conversion funnels. 
            All your vital portfolio metrics consolidated into a single pane of glass.
          </p>
        </div>
        
        <div className="flex gap-2">
           <select className="bg-card text-sm px-4 py-2 rounded-xl border border-border outline-none text-foreground shadow-sm hover:border-accent transition-colors">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>All Time</option>
          </select>
        </div>
      </header>

      {/* ------------------ 1. SYSTEM HEALTH MONITOR ------------------ */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <div className="flex items-center gap-2">
            <Server className="text-emerald-500" size={20} />
            <h2 className="text-2xl font-semibold">System Health Monitor</h2>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest px-2 py-0.5 rounded border border-border">Telemetry Active</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
             <TrafficSimulator baseThroughput="12.4" baseLatency="24" />
          </div>
          
          <div className="p-6 rounded-3xl bg-card border border-border lg:mt-12 overflow-hidden flex flex-col">
            <h3 className="font-semibold text-lg text-foreground mb-1 flex items-center gap-2"><Clock size={16} className="text-muted-foreground"/> Uptime Logs</h3>
            <p className="text-xs text-muted-foreground mb-4">Recent infrastructure events</p>
            
            <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {[
                { time: "10 min ago", event: "Vercel Deployment Successful", status: "success" },
                { time: "2 hrs ago", event: "Supabase Connection Checked", status: "success" },
                { time: "1 day ago", event: "High latency detected on Route /api/contact", status: "warning" },
                { time: "3 days ago", event: "System Reboot", status: "info" },
                { time: "1 week ago", event: "PostgreSQL Automated Backup", status: "success" },
              ].map((log, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <div className="mt-1">
                    {log.status === "success" && <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />}
                    {log.status === "warning" && <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />}
                    {log.status === "info" && <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />}
                  </div>
                  <div>
                    <div className="text-foreground font-medium">{log.event}</div>
                    <div className="text-[10px] text-muted-foreground font-mono mt-0.5">{log.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------ 2. ANALYTICS & METRICS ------------------ */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-border pb-2">
          <BarChart3 className="text-blue-500" size={20} />
          <h2 className="text-2xl font-semibold">Traffic Analytics & Demographics</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Visitors", value: "8,452", trend: "+24.5%", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10", border: "hover:border-blue-500/30" },
            { label: "Real-time Pulse", value: "42", trend: "Active Sessions", icon: Activity, live: true, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "hover:border-emerald-500/30 border-emerald-500/20" },
            { label: "Page Views", value: "24,104", trend: "+12.2%", icon: Globe, color: "text-purple-500", bg: "bg-purple-500/10", border: "hover:border-purple-500/30" },
            { label: "Avg. Time on Site", value: "3m 12s", trend: "+5.1%", icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10", border: "hover:border-amber-500/30" },
          ].map((stat, i) => (
            <div key={i} className={`p-6 rounded-2xl bg-card border border-border flex flex-col gap-4 relative overflow-hidden group transition-all duration-300 ${stat.border}`}>
              <div className="flex items-center justify-between z-10">
                <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                <div className={`p-2 rounded-xl transition-colors ${stat.bg} ${stat.color}`}>
                  <stat.icon size={18} />
                </div>
              </div>
              <div className="z-10">
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className={`text-xs font-medium mt-1 flex items-center gap-1 ${stat.live ? stat.color : "text-muted-foreground"}`}>
                  {stat.live && <span className={`w-2 h-2 rounded-full animate-pulse bg-emerald-500`} />}
                  {stat.trend}
                </div>
              </div>
              <div className={`absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none ${stat.color}`}>
                <stat.icon size={120} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 p-6 rounded-3xl bg-card border border-border flex flex-col">
            <h3 className="font-semibold text-lg text-foreground mb-1 flex items-center gap-2">
              <FileText size={18} className="text-muted-foreground" />
              Most Visited Projects
            </h3>
            <p className="text-xs text-muted-foreground mb-6">Ranked by clicks & views</p>
            
            <div className="space-y-5">
              {[
                { name: "Clientra - ERP System", views: "3,204", pct: "85%" },
                { name: "Ambassadors for the Lord", views: "1,842", pct: "45%" },
                { name: "Neural-Net Visualizer", views: "1,105", pct: "30%" },
                { name: "System Architecture Blog", views: "854", pct: "20%" },
              ].map((proj, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-foreground group-hover:text-blue-500 transition-colors">{i+1}. {proj.name}</span>
                    <span className="text-muted-foreground">{proj.views}</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: proj.pct }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-card border border-border relative overflow-hidden group">
              <h3 className="font-semibold text-lg text-foreground mb-1 flex items-center gap-2">
                <Map size={18} className="text-muted-foreground" />
                Visitor Geography
              </h3>
              <p className="text-xs text-muted-foreground mb-6">Heatmap & regional data</p>
              
              <div className="space-y-4 relative z-10">
                {[
                  { country: "United States", pct: "45%", flag: "🇺🇸", users: "3,803" },
                  { country: "India", pct: "25%", flag: "🇮🇳", users: "2,113" },
                  { country: "United Kingdom", pct: "12%", flag: "🇬🇧", users: "1,014" },
                  { country: "Germany", pct: "8%", flag: "🇩🇪", users: "676" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{item.flag}</span>
                      <span className="font-medium text-foreground">{item.country}</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <span className="font-mono text-muted-foreground text-xs">{item.users}</span>
                       <span className="text-foreground font-medium w-8 text-right">{item.pct}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Globe className="absolute -bottom-10 -right-10 text-muted/20 group-hover:text-blue-500/10 transition-colors duration-700" size={200} />
            </div>

            <div className="p-6 rounded-3xl bg-card border border-border">
              <h3 className="font-semibold text-lg text-foreground mb-1 flex items-center gap-2">
                <PieChart size={18} className="text-muted-foreground" />
                Device & Browser
              </h3>
              <p className="text-xs text-muted-foreground mb-6">Technical breakdown</p>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2 text-muted-foreground">
                    <span className="flex items-center gap-1"><Monitor size={14} className="text-indigo-500"/> Desktop (65%)</span>
                    <span className="flex items-center gap-1"><Smartphone size={14} className="text-pink-500"/> Mobile (35%)</span>
                  </div>
                  <div className="h-3 w-full bg-muted rounded-full overflow-hidden flex shadow-inner">
                    <div className="h-full bg-indigo-500 w-[65%]" />
                    <div className="h-full bg-pink-500 w-[35%]" />
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Chrome</span>
                        <span className="font-medium text-sm">68%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400" />
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Safari</span>
                        <span className="font-medium text-sm">22%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Firefox</span>
                        <span className="font-medium text-sm">7%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-zinc-500" />
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Other</span>
                        <span className="font-medium text-sm">3%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------ 3. PORTFOLIO FUNNEL & ENGAGEMENT ------------------ */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-border pb-2">
          <Filter className="text-amber-500" size={20} />
          <h2 className="text-2xl font-semibold">Funnel & Engagement Tracking</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-between hover:border-amber-500/30 transition-colors">
            <div>
              <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg w-fit mb-4">
                <Download size={18} />
              </div>
              <h3 className="font-medium text-muted-foreground text-sm">Resume Downloads</h3>
              <div className="text-3xl font-bold mt-1">128</div>
            </div>
            <div className="text-xs text-emerald-500 mt-4 flex items-center gap-1">
              <TrendingUp size={12} /> +14 this week
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-between hover:border-purple-500/30 transition-colors">
            <div>
              <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg w-fit mb-4">
                <MousePointerClick size={18} />
              </div>
              <h3 className="font-medium text-muted-foreground text-sm">Contact Form CVR</h3>
              <div className="text-3xl font-bold mt-1 text-foreground">3.49%</div>
            </div>
            <div className="text-xs text-emerald-500 mt-4 flex items-center gap-1">
              <TrendingUp size={12} /> Exceeds avg 2% benchmark
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border lg:col-span-2">
            <h3 className="font-semibold text-lg">CTA Click Heatmap</h3>
            <p className="text-xs text-muted-foreground mb-5">Primary action buttons clicked on Hero</p>
            
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-foreground flex items-center gap-2">
                     <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" /> "View Projects" 
                  </span>
                  <span className="font-mono font-bold">68%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full w-[68%]" />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-foreground flex items-center gap-2">
                     <div className="w-2 h-2 bg-zinc-500 rounded-full" /> "View Architecture"
                  </span>
                  <span className="font-mono font-bold">32%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-zinc-500 rounded-full w-[32%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-card border border-border flex flex-col">
            <h3 className="font-semibold text-lg text-foreground mb-1">Portfolio Funnel</h3>
            <p className="text-xs text-muted-foreground mb-8">Visitor journey drop-off map</p>
            
            <div className="flex flex-col gap-2 relative z-10 flex-1 justify-center max-w-sm mx-auto w-full">
               <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-t-2xl text-center w-full relative">
                 <div className="text-xs text-amber-600 dark:text-amber-400 font-bold uppercase tracking-widest mb-1">1. Unique Visitors</div>
                 <div className="text-2xl font-bold">1,204</div>
                 <div className="absolute right-[-50px] top-1/2 -translate-y-1/2 text-[10px] font-mono text-muted-foreground hidden sm:block">100%</div>
               </div>
               <div className="bg-amber-500/30 border border-amber-500/40 p-4 rounded-lg text-center w-[85%] mx-auto relative">
                 <div className="text-xs text-amber-700 dark:text-amber-300 font-bold uppercase tracking-widest mb-1">2. Viewed Project</div>
                 <div className="text-2xl font-bold">482</div>
                 <div className="absolute right-[-60px] top-1/2 -translate-y-1/2 text-[10px] font-mono text-muted-foreground hidden sm:block">40.0%</div>
               </div>
               <div className="bg-amber-500 border border-amber-400 p-4 rounded-b-2xl text-center w-[60%] mx-auto relative shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                 <div className="text-xs text-amber-100 font-bold uppercase tracking-widest mb-1">3. Sent Message</div>
                 <div className="text-2xl font-bold text-white">42</div>
                 <div className="absolute right-[-70px] top-1/2 -translate-y-1/2 text-[10px] font-mono text-emerald-500 font-bold hidden sm:block">3.49% CVR</div>
               </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-card border border-border">
            <h3 className="font-semibold text-lg text-foreground mb-1 flex items-center gap-2">
              <Clock size={16} /> Scroll Depth & Time per Section
            </h3>
            <p className="text-xs text-muted-foreground mb-6">How far down they scroll & where they linger</p>
            
            <div className="space-y-3">
              <div className="flex text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2 mb-2">
                <span className="w-24">Section</span>
                <span className="flex-1 text-center">Depth %</span>
                <span className="w-16 text-right">Time</span>
              </div>
              {[
                { sec: "Hero Area", pct: "100%", time: "12s" },
                { sec: "About", pct: "95%", time: "34s" },
                { sec: "Journey", pct: "88%", time: "22s" },
                { sec: "Skills", pct: "82%", time: "18s" },
                { sec: "Projects", pct: "75%", time: "1m 45s", highlight: true },
                { sec: "Experience", pct: "60%", time: "42s" },
                { sec: "Architecture", pct: "55%", time: "1m 15s", highlight: true },
                { sec: "Docs", pct: "40%", time: "20s" },
                { sec: "Blog", pct: "35%", time: "45s" },
                { sec: "Contact", pct: "30%", time: "15s" },
              ].map((item, i) => (
                <div key={i} className={`flex items-center text-xs p-1.5 rounded-md overflow-hidden ${item.highlight ? 'bg-accent/10 border border-accent/20' : ''}`}>
                  <span className={`w-20 sm:w-24 font-medium truncate ${item.highlight ? 'text-accent' : 'text-muted-foreground'}`}>{item.sec}</span>
                  <div className="flex-1 h-1.5 bg-muted rounded-full mx-2 sm:mx-3 relative overflow-hidden">
                     <div className={`absolute top-0 left-0 h-full rounded-full ${item.highlight ? 'bg-accent' : 'bg-amber-500/60'}`} style={{ width: item.pct }} />
                  </div>
                  <span className={`w-12 sm:w-16 text-right font-mono text-[10px] sm:text-xs ${item.highlight ? 'text-accent font-bold' : 'text-muted-foreground'}`}>{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------ 4. CONTACT INTELLIGENCE ------------------ */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="text-rose-500" size={20} />
            <h2 className="text-2xl font-semibold">Contact Intelligence</h2>
          </div>
          <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10">Live Database</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-card border border-border">
            <h3 className="font-semibold text-lg text-foreground mb-1 flex items-center gap-2">
              <LineChart size={18} className="text-muted-foreground" />
              Message Volume Trend
            </h3>
            <p className="text-xs text-muted-foreground mb-6">Inquiries per week</p>
            
            <div className="h-40 w-full flex items-end justify-between gap-1 mt-auto pb-4 border-b border-border relative">
               {/* Grid lines */}
               <div className="absolute top-0 w-full border-t border-border/50 border-dashed"></div>
               <div className="absolute top-1/2 w-full border-t border-border/50 border-dashed"></div>
               
               {[2, 5, 3, 8, 4, 12, recentMessages].map((count, i) => (
                 <div key={i} className="w-full flex flex-col items-center gap-2 group relative z-10">
                   <div className="w-full bg-rose-500/20 hover:bg-rose-500/50 transition-colors rounded-t-sm" style={{ height: `${Math.max((count / 15) * 100, 5)}%` }}></div>
                   <span className="text-[9px] text-muted-foreground">W{i+1}</span>
                   {/* Tooltip */}
                   <div className="absolute -top-8 bg-foreground text-background text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-mono">{count} msgs</div>
                 </div>
               ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm font-medium">Total Inbox:</span>
              <span className="text-xl font-bold">{totalMessages}</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-card border border-border">
            <h3 className="font-semibold text-lg text-foreground mb-1 flex items-center gap-2">
              <Clock size={18} className="text-muted-foreground" />
              Response Time
            </h3>
            <p className="text-xs text-muted-foreground mb-6">Avg time to reply</p>
            
            <div className="flex flex-col items-center justify-center h-full pb-8">
              <div className="flex items-end gap-2 mb-4">
                <span className="text-5xl sm:text-6xl font-bold text-foreground tracking-tighter">1.4</span>
                <span className="text-xs sm:text-sm text-muted-foreground mb-2 font-mono uppercase tracking-widest">hours</span>
              </div>
              
              <div className="w-full space-y-2 mt-4">
                <div className="flex justify-between text-xs font-medium text-muted-foreground">
                  <span>Industry Avg (24h)</span>
                  <span className="text-emerald-500">Top 5%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full w-[95%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-card border border-border">
            <h3 className="font-semibold text-lg text-foreground mb-1 flex items-center gap-2">
              <Tag size={18} className="text-muted-foreground" />
              Top Inquiry Topics
            </h3>
            <p className="text-xs text-muted-foreground mb-6">AI-tagged distribution</p>
            
            <div className="space-y-5">
              {[
                { topic: "Job Offer / Recruiting", pct: "60%", color: "bg-rose-500" },
                { topic: "Freelance / Collab", pct: "25%", color: "bg-rose-400" },
                { general: "General Question", pct: "10%", color: "bg-rose-300" },
                { general: "Spam / Irrelevant", pct: "5%", color: "bg-muted-foreground" },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span>{item.topic || item.general}</span>
                    <span className="font-mono text-muted-foreground">{item.pct}</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: item.pct }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------ 5. BLOG PERFORMANCE ------------------ */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-border pb-2 mt-8">
          <BookOpen className="text-purple-500" size={20} />
          <h2 className="text-2xl font-semibold">Blog Performance</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-card border border-border lg:col-span-2">
            <h3 className="font-semibold text-lg text-foreground mb-1">Most Read Categories</h3>
            <p className="text-xs text-muted-foreground mb-6">Traffic distribution across your 20+ articles</p>
            
            <div className="space-y-5">
              {[
                { cat: "Engineering Blogs", views: "4,205", pct: "100%", color: "bg-purple-500" },
                { cat: "Case Studies", views: "2,840", pct: "65%", color: "bg-purple-400" },
                { cat: "Build Logs", views: "1,920", pct: "45%", color: "bg-purple-300" },
                { cat: "Learning Journey", views: "1,105", pct: "25%", color: "bg-muted-foreground" },
                { cat: "Product Thinking", views: "840", pct: "18%", color: "bg-muted-foreground" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-xs sm:text-sm">
                  <span className="w-24 sm:w-36 font-medium text-foreground truncate">{item.cat}</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: item.pct }} />
                  </div>
                  <span className="w-12 sm:w-16 text-right text-muted-foreground font-mono">{item.views}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-card border border-border flex flex-col justify-center h-[180px]">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BrainCircuit size={18} className="text-purple-500" />
                  <h3 className="font-medium text-foreground text-sm">Est. Reading Momentum</h3>
                </div>
                <p className="text-[10px] text-muted-foreground">Total minutes generated (Views × Read Time)</p>
              </div>
              
              <div className="mt-4">
                <div className="text-4xl font-bold text-foreground">12,450</div>
                <div className="text-xs font-mono text-muted-foreground mt-1">minutes read (~207 hours)</div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-card border border-border flex flex-col justify-center h-[180px]">
              <div>
                <h3 className="font-medium text-foreground text-sm mb-2">Blog Engagement Funnel</h3>
              </div>
              <div className="space-y-2 mt-2">
                <div className="flex justify-between text-xs bg-muted/50 p-2 rounded">
                  <span className="text-muted-foreground">List Viewers</span>
                  <span className="font-bold">4,102</span>
                </div>
                <div className="flex justify-between text-xs bg-purple-500/10 border border-purple-500/20 text-purple-400 p-2 rounded">
                  <span>Article Readers</span>
                  <span className="font-bold">1,845</span>
                </div>
                <div className="text-[10px] text-right font-mono text-emerald-500">45% CTR</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------ 6. REFERRAL, SEO & HISTORICAL ------------------ */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-border pb-2 mt-8">
          <Search className="text-indigo-500" size={20} />
          <h2 className="text-2xl font-semibold">Referrals, SEO & Historical</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-card border border-border flex flex-col min-h-[400px] relative overflow-hidden group lg:row-span-2">
            <HistoricalChart />
          </div>

          <div className="p-6 rounded-3xl bg-card border border-border">
            <h3 className="font-semibold text-lg text-foreground mb-1 flex items-center gap-2">
              <Share2 size={18} className="text-muted-foreground" />
              Referral Link Tracker
            </h3>
            <p className="text-xs text-muted-foreground mb-6">Traffic volume by source</p>
            
            <div className="space-y-4">
              {[
                { source: "LinkedIn (Profile Link)", visits: 2450, change: "+12%" },
                { source: "Direct (URL Typed)", visits: 1820, change: "+5%" },
                { source: "GitHub (Readme)", visits: 940, change: "+2%" },
                { source: "Twitter / X", visits: 430, change: "-1%" },
                { source: "Google Search", visits: 310, change: "+45%" },
              ].map((ref, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3 min-w-0 flex-1 pr-2">
                    <div className="w-6 h-6 rounded-full bg-background flex items-center justify-center font-bold text-[10px] text-indigo-500 border border-border shrink-0">
                      {i+1}
                    </div>
                    <span className="font-medium text-sm truncate">{ref.source}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-mono shrink-0">
                    <span className="text-muted-foreground">{ref.visits} views</span>
                    <span className={`w-8 sm:w-10 text-right ${ref.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>{ref.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-card border border-border">
            <h3 className="font-semibold text-lg text-foreground mb-1 flex items-center gap-2">
              <Search size={18} className="text-muted-foreground" />
              Search Keywords
            </h3>
            <p className="text-xs text-muted-foreground mb-4">Google queries mapped to portfolio</p>
            
            <div className="flex flex-wrap gap-2">
              {[
                "Keerthana Salla",
                "Next.js advanced portfolio",
                "ERP system architect",
                "Frontend engineer",
                "React performance",
                "System design blog",
              ].map((keyword, i) => (
                <div key={i} className="px-3 py-1.5 rounded-md bg-muted border border-border text-[10px] uppercase tracking-wider font-bold text-muted-foreground flex items-center gap-1.5">
                  <Search size={10} />
                  {keyword}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-card border border-border">
          <div className="flex items-center gap-2 mb-1">
            <Link2 size={18} className="text-muted-foreground" />
            <h3 className="font-semibold text-lg text-foreground">Shareable UTM Links</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-6">Use these auto-generated links to track incoming traffic sources.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { platform: "LinkedIn", url: "https://architron.dev/?utm_source=linkedin&utm_campaign=portfolio", icon: "Share2" as const },
              { platform: "GitHub", url: "https://architron.dev/?utm_source=github&utm_campaign=readme", icon: "FileText" as const },
              { platform: "Twitter", url: "https://architron.dev/?utm_source=twitter&utm_medium=social", icon: "Search" as const },
              { platform: "Resume PDF", url: "https://architron.dev/?utm_source=resume&utm_medium=document", icon: "Download" as const },
            ].map((link, i) => (
              <CopyableUTMLink 
                key={i}
                platform={link.platform}
                url={link.url}
                fullUrl={link.url}
                icon={link.icon}
              />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

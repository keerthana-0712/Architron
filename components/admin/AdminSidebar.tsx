"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Shield, LayoutDashboard, Star, Briefcase, Settings, Code2, History, TrendingUp, LogOut, Flame
} from "lucide-react";


interface AdminSidebarProps {
  adminEmail: string;
}

export default function AdminSidebar({ adminEmail }: AdminSidebarProps) {
  const pathname = usePathname();

  const links = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: LayoutDashboard,
      active: pathname === "/admin"
    },
    {
      href: "/admin/projects",
      label: "Manage Projects",
      icon: Briefcase,
      active: pathname === "/admin/projects"
    },
    {
      href: "/admin/reviews",
      label: "Manage Reviews",
      icon: Star,
      active: pathname === "/admin/reviews"
    },
    {
      href: "/admin/services",
      label: "Manage Services",
      icon: Settings,
      active: pathname === "/admin/services"
    },
    {
      href: "/admin/skills",
      label: "Manage Skills",
      icon: Code2,
      active: pathname === "/admin/skills"
    },
    {
      href: "/admin/experience",
      label: "Manage Experience",
      icon: History,
      active: pathname === "/admin/experience"
    },
    {
      href: "/admin/streaks",
      label: "Manage Streaks",
      icon: Flame,
      active: pathname === "/admin/streaks"
    },
    {
      href: "/admin/growth",
      label: "Analytics",
      icon: TrendingUp,
      active: pathname === "/admin/growth"
    }
  ];

  return (
    <aside className="w-64 border-r border-border bg-card hidden md:block">
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2 font-mono text-accent">
            <Shield size={20} />
            <span className="font-bold tracking-widest uppercase">Admin.Sys</span>
          </div>
          <div className="mt-2 text-xs text-muted-foreground font-mono">
            Status: <span className="text-green-500">Authenticated</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href}>
                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-xs uppercase tracking-wider transition-all border ${
                  link.active 
                    ? "bg-accent/10 text-accent border-accent/20 font-bold" 
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground border-transparent"
                }`}>
                  <Icon size={16} />
                  {link.label}
                </div>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-border">
          <Link href="/">
            <div className="flex items-center justify-center gap-2 p-2.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors w-full border border-border rounded-xl bg-muted/30">
              <LogOut size={14} />
              Exit Terminal
            </div>
          </Link>
        </div>
      </div>
    </aside>
  );
}

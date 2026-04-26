import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Shield, LayoutDashboard, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user;
  try {
    user = await currentUser();
  } catch (error) {
    console.error("Clerk Authentication Error:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
        <div className="max-w-md w-full text-center space-y-6 border-2 border-dashed border-red-500/20 p-8 rounded-3xl bg-red-500/5">
          <div className="text-red-500 mb-4">
            <Shield size={48} className="mx-auto" />
          </div>
          <h1 className="text-2xl font-bold">Security Module Error</h1>
          <p className="text-muted-foreground">
            The authentication system is currently unavailable. This usually happens when API keys are missing or invalid.
          </p>
          <a href="/" className="inline-block mt-4 text-accent hover:underline">Return to safety</a>
        </div>
      </div>
    );
  }

  if (!user) {
    redirect("/sign-in");
  }

  // Security check: Only allow authorized admin email
  const ADMIN_EMAIL = "keerthana.salla.7@gmail.com";
  const userEmail = user.emailAddresses[0]?.emailAddress;

  if (userEmail !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="p-6 bg-red-500/10 text-red-500 rounded-3xl inline-block">
            <Shield size={48} />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Access Restricted</h1>
            <p className="text-muted-foreground">
              This terminal is reserved for system administrators. Your credentials ({userEmail}) do not have the required clearance level.
            </p>
          </div>
          <div className="pt-4 flex flex-col gap-3">
             <a 
               href="/"
               className="h-12 flex items-center justify-center bg-foreground text-background font-bold rounded-2xl hover:opacity-90 transition-all"
             >
               Return to Base
             </a>
             <div className="flex justify-center pt-2">
               <UserButton />
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border p-6 flex flex-col h-auto md:h-screen sticky top-0">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 bg-accent/10 text-accent rounded-xl">
            <Shield size={20} />
          </div>
          <span className="font-bold tracking-tight">Admin System</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted/50 transition-colors text-sm font-medium">
            <LayoutDashboard size={18} />
            Messages
          </Link>
          <Link href="/admin/growth" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted/50 transition-colors text-sm font-medium">
            <TrendingUp size={18} />
            Growth & Traffic
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-border flex items-center justify-between">
          <span className="text-xs font-mono text-muted-foreground">AUTH: VERIFIED</span>
          <UserButton />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

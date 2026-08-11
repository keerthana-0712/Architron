import { Shield } from "lucide-react";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

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
          <Link href="/">
            <button className="px-6 py-2 border border-border rounded-full hover:bg-accent/10 transition-colors">
              Return to Public Sector
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Cypherpunk Sidebar */}
      <AdminSidebar adminEmail={ADMIN_EMAIL} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <header className="md:hidden border-b border-border bg-card p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-accent">
            <Shield size={18} />
            <span className="font-bold tracking-widest uppercase text-sm">Admin.Sys</span>
          </div>
          <Link href="/">
            <div className="text-xs border border-border px-3 py-1 rounded-full bg-muted">
              Exit
            </div>
          </Link>
        </header>

        <div className="p-6 md:p-10 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
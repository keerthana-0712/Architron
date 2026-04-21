import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { UserButton } from "@clerk/nextjs";
import { Shield, MessageSquare } from "lucide-react";
import MessageList from "@/components/admin/MessageList";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

export default async function AdminDashboard() {
  const user = await currentUser();

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

  // Fetch all messages from the database
  const messages = await db.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  }) as ContactMessage[];

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Admin Header */}
        <header className="flex items-center justify-between mb-12 pb-6 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-accent/10 text-accent rounded-2xl">
              <Shield size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">System Administration</h1>
              <p className="text-sm text-muted-foreground">Managing {messages.length} incoming inquiries</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-muted-foreground hidden sm:block">
              AUTH_STATUS: VERIFIED
            </span>
            <UserButton />
          </div>
        </header>

        {/* Messages Component */}
        {messages.length === 0 ? (
          <div className="text-center py-24 border-2 border-dashed border-border rounded-3xl">
            <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">No messages received yet.</h3>
            <p className="text-sm text-muted-foreground/90">Your system is live and waiting for signals.</p>
          </div>
        ) : (
          <MessageList initialMessages={messages} />
        )}
      </div>
    </div>
  );
}

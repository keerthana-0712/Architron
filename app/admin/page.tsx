import { db } from "@/lib/db";
import { MessageSquare } from "lucide-react";
import MessageList from "@/components/admin/MessageList";

import { ContactMessage } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  try {
    // Fetch all messages from the database
    const messages = await db.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    }) as ContactMessage[];

    return (
      <div>
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Message Center</h1>
          <p className="text-sm text-muted-foreground mt-1">Managing {messages.length} incoming inquiries</p>
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
    );
  } catch (error) {
    console.error("Admin Dashboard Error:", error);
    return (
      <div className="p-8 border-2 border-dashed border-red-500/20 rounded-3xl bg-red-500/5">
        <h2 className="text-xl font-bold text-red-500 mb-2">System Interruption</h2>
        <p className="text-muted-foreground mb-4">
          The message center is currently offline due to a database connection error.
        </p>
        <div className="p-4 bg-background rounded-xl border border-border font-mono text-xs text-red-400 overflow-auto">
          {error instanceof Error ? error.message : "Unknown database error"}
        </div>
      </div>
    );
  }
}

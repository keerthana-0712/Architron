import { db } from "@/lib/db";
import { MessageSquare } from "lucide-react";
import MessageList from "@/components/admin/MessageList";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

export default async function AdminDashboard() {
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
}

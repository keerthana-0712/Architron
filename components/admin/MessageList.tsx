"use client";

import { useState } from "react";
import { Mail, Clock, User, MessageSquare, X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

export default function MessageList({ initialMessages }: { initialMessages: ContactMessage[] }) {
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {initialMessages.map((msg) => (
          <div 
            key={msg.id} 
            onClick={() => setSelectedMessage(msg)}
            className="group p-5 rounded-2xl bg-card border border-border hover:border-accent/40 hover:bg-accent/5 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-accent transition-colors">
                  <User size={18} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-foreground truncate">{msg.name}</h3>
                    <span className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded uppercase">Inquiry</span>
                  </div>
                  <div className="text-xs text-muted-foreground truncate">{msg.email}</div>
                </div>
              </div>

              {/* Message Snippet (Aligned) */}
              <div className="hidden md:block flex-1 max-w-md">
                <p className="text-sm text-muted-foreground/80 line-clamp-1 italic">
                  "{msg.message}"
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-[10px] font-mono text-muted-foreground text-right" suppressHydrationWarning>
                   {new Date(msg.createdAt).toLocaleDateString('en-US')}
                   <br />
                   {new Date(msg.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </div>
                <ExternalLink size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/90 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              className="w-full max-w-2xl bg-card border border-border/60 rounded-[2rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] overflow-hidden relative"
            >
              <div className="p-10 md:p-12">
                {/* Header */}
                <div className="flex items-start justify-between mb-10">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center border border-accent/20">
                      <User size={28} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight text-foreground">{selectedMessage.name}</h2>
                      <div className="text-sm text-accent font-semibold tracking-wide mt-1">{selectedMessage.email}</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedMessage(null)}
                    className="p-3 rounded-xl hover:bg-muted transition-all text-muted-foreground hover:text-foreground border border-transparent hover:border-border"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Content Area (Breathable & Scrollable) */}
                <div className="relative">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <div className="h-[1px] w-4 bg-accent/40" />
                    Message Transcript
                  </div>
                  
                  <div className="bg-secondary/30 rounded-3xl border border-border/40 overflow-hidden">
                    <div className="p-8 max-h-[40vh] overflow-y-auto custom-scrollbar">
                      <p className="text-muted-foreground leading-loose text-[15px] whitespace-pre-wrap">
                        {selectedMessage.message}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-10 pt-8 border-t border-border/40">
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-mono bg-muted/50 px-4 py-2 rounded-full border border-border/50" suppressHydrationWarning>
                    <Clock size={12} className="text-accent" /> 
                    {new Date(selectedMessage.createdAt).toLocaleString('en-US', { 
                      dateStyle: 'medium', 
                      timeStyle: 'short' 
                    })}
                  </div>
                  <a 
                    href={`mailto:${selectedMessage.email}`}
                    className="w-full sm:w-auto h-12 px-8 rounded-2xl bg-foreground text-background font-bold text-sm flex items-center justify-center hover:opacity-90 transition-all shadow-xl shadow-foreground/10 gap-2"
                  >
                    Reply to Sender <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

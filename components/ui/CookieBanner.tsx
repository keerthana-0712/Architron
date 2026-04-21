"use client";

import { useState, useEffect } from "react";
import { X, ShieldCheck } from "lucide-react";
import { Button } from "./button";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-sm z-[100]"
        >
          <div className="bg-card border border-border shadow-2xl rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
            
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-accent/10 text-accent shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-sm">Privacy & Insights</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  I use minimal, privacy-focused analytics to understand how recruiters interact with my system design deep-dives. No personal data is tracked.
                </p>
                <div className="flex gap-3 pt-2">
                  <Button size="sm" onClick={acceptCookies} className="bg-foreground text-background hover:bg-foreground/90 h-8 text-xs font-bold px-4">
                    Accept
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setIsVisible(false)} className="h-8 text-xs px-2">
                    Decline
                  </Button>
                </div>
              </div>
              <button 
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

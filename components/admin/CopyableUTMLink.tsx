"use client";

import { useState } from "react";
import { Copy, Check, Share2, FileText, Search, Download } from "lucide-react";

interface CopyableUTMLinkProps {
  platform: string;
  url: string;
  icon: "Share2" | "FileText" | "Search" | "Download";
  fullUrl: string; // the actual URL to copy
}

const ICONS = {
  Share2,
  FileText,
  Search,
  Download,
};

export default function CopyableUTMLink({ platform, url, icon, fullUrl }: CopyableUTMLinkProps) {
  const [copied, setCopied] = useState(false);
  const IconComponent = ICONS[icon];

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-background/50 group">
      <div className="flex items-center gap-2 overflow-hidden pr-4">
        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shrink-0">
          <IconComponent size={14} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-bold truncate">{platform}</div>
          <div className="text-[10px] font-mono text-muted-foreground truncate" title={url}>
            {url}
          </div>
        </div>
      </div>
      <button 
        onClick={handleCopy}
        className={`p-2 rounded-lg transition-colors shrink-0 ${copied ? 'bg-emerald-500/20 text-emerald-500' : 'hover:bg-muted text-muted-foreground hover:text-foreground'}`}
        title="Copy to clipboard"
      >
         {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";
import { 
  Plus, Trash2, Edit3, X, RefreshCw, Database, ShieldAlert,
  Rocket, Network, Code2, Brain, Cloud, Activity, ShieldCheck, Layers, Briefcase, HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Service {
  id: string;
  code: string;
  title: string;
  desc: string;
  usedIn: string;
  tags: string[];
  bottomMeta: string;
  icon: string;
}

interface ManageServicesClientProps {
  initialServices: Service[];
  dbOffline: boolean;
  dbError: string;
}

const AVAILABLE_ICONS = {
  Rocket,
  Network,
  Code2,
  Brain,
  Cloud,
  Activity,
  ShieldCheck,
  Layers,
  Briefcase
};

export default function ManageServicesClient({
  initialServices,
  dbOffline,
  dbError
}: ManageServicesClientProps) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Form State
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [usedIn, setUsedIn] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [bottomMeta, setBottomMeta] = useState("");
  const [icon, setIcon] = useState("Rocket");

  const [loading, setLoading] = useState(false);
  const [actionError, setActionError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");

  const resetForm = () => {
    setCode("");
    setTitle("");
    setDesc("");
    setUsedIn("");
    setTagsInput("");
    setBottomMeta("");
    setIcon("Rocket");
    setEditingService(null);
    setActionError("");
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (service: Service) => {
    setEditingService(service);
    setCode(service.code);
    setTitle(service.title);
    setDesc(service.desc);
    setUsedIn(service.usedIn);
    setTagsInput(service.tags.join(", "));
    setBottomMeta(service.bottomMeta);
    setIcon(service.icon);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setActionError("");
    setActionSuccess("");

    const parsedTags = tagsInput.split(",").map(t => t.trim()).filter(t => t !== "");

    try {
      const url = "/api/services";
      const method = editingService ? "PUT" : "POST";
      const body = {
        id: editingService?.id,
        code,
        title,
        desc,
        usedIn,
        tags: parsedTags,
        bottomMeta,
        icon
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        throw new Error(await res.text() || "Failed to save service");
      }

      const savedService = await res.json();

      if (editingService) {
        setServices(services.map(s => s.id === savedService.id ? savedService : s));
        setActionSuccess("Service record updated successfully.");
      } else {
        setServices([...services, savedService]);
        setActionSuccess("Service record deployed successfully.");
      }

      setIsModalOpen(false);
      resetForm();
    } catch (err: any) {
      setActionError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    setLoading(true);
    setActionError("");
    setActionSuccess("");

    try {
      const res = await fetch(`/api/services?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete service");

      setServices(services.filter(s => s.id !== id));
      setActionSuccess("Service record deleted successfully.");
    } catch (err: any) {
      setActionError(err.message || "Could not delete service.");
    } finally {
      setLoading(false);
    }
  };

  const renderIcon = (iconName: string) => {
    const IconComp = (AVAILABLE_ICONS as any)[iconName] || HelpCircle;
    return <IconComp className="h-5 w-5" />;
  };

  return (
    <div className="space-y-8 font-mono text-sm text-foreground">
      {/* Header */}
      <div className="border border-border/40 p-6 rounded-2xl bg-card/30 backdrop-blur flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-accent uppercase font-mono">Service Engineering Terminal</h1>
          <p className="text-muted-foreground mt-1">Configure and manage active engineering domains</p>
        </div>
        <Button onClick={openAddModal} className="bg-accent text-accent-foreground hover:bg-accent/80 font-mono uppercase tracking-widest text-xs py-2 px-4 rounded-xl flex items-center gap-2">
          <Plus size={16} /> Deploy New Service
        </Button>
      </div>

      {dbOffline && (
        <div className="p-4 border border-yellow-500/20 bg-yellow-500/5 text-yellow-500 rounded-xl flex items-center gap-3">
          <ShieldAlert size={20} />
          <div>
            <p className="font-bold">Database Off-grid</p>
            <p className="text-xs text-yellow-500/80 mt-0.5">{dbError || "Database offline. Fallback active."}</p>
          </div>
        </div>
      )}

      {actionError && (
        <div className="p-4 border border-rose-500/20 bg-rose-500/5 text-rose-500 rounded-xl">
          {actionError}
        </div>
      )}

      {actionSuccess && (
        <div className="p-4 border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 rounded-xl">
          {actionSuccess}
        </div>
      )}

      {/* Services Grid */}
      <div className="border border-border/40 rounded-2xl overflow-hidden bg-card/10">
        <div className="p-4 border-b border-border/40 bg-card/20 flex items-center justify-between">
          <span className="font-bold text-accent font-mono uppercase tracking-wider text-xs flex items-center gap-2">
            <Database size={14} /> Registered Domains ({services.length})
          </span>
          <div className="text-xs text-muted-foreground">
            SYS STATUS: <span className="text-green-500">LIVE</span>
          </div>
        </div>

        {services.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            No services registered. Deploy a service stack to begin.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-6">
            {services.map((service) => (
              <div key={service.id} className="p-6 rounded-2xl bg-neutral-900/40 border border-border/40 hover:border-accent/30 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-accent/10 text-accent border border-accent/20">
                      {renderIcon(service.icon)}
                    </div>
                    <span className="text-xs font-mono text-muted-foreground bg-neutral-950 px-2 py-0.5 border border-border/20 rounded">
                      {service.code}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-1">{service.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3 font-sans">{service.desc}</p>
                  
                  <div className="text-xs text-muted-foreground/80 mb-2 italic">
                    Used In: <span className="not-italic text-foreground/80">{service.usedIn}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {service.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 text-[10px] font-mono rounded bg-muted border border-border/20 text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border/20 pt-4 mt-4 flex items-center justify-between">
                  <span className="text-xs text-accent/80 font-mono">{service.bottomMeta}</span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => openEditModal(service)} className="p-2 rounded-lg border-border/40 hover:bg-accent/10 hover:text-accent">
                      <Edit3 size={14} />
                    </Button>
                    <Button variant="outline" onClick={() => handleDelete(service.id)} className="p-2 rounded-lg border-border/40 hover:bg-rose-500/10 hover:text-rose-500">
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-lg border border-border/60 bg-card p-6 rounded-2xl shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-border/20 pb-4">
                <h3 className="font-bold text-lg font-mono uppercase text-accent">
                  {editingService ? "Edit Service Parameters" : "Deploy Service Record"}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground uppercase font-mono">Service Code</label>
                    <input required type="text" placeholder="e.g. PROD-01" value={code} onChange={e => setCode(e.target.value)} className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-mono focus:border-accent outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground uppercase font-mono">Service Icon</label>
                    <select value={icon} onChange={e => setIcon(e.target.value)} className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-mono focus:border-accent outline-none">
                      {Object.keys(AVAILABLE_ICONS).map(ico => (
                        <option key={ico} value={ico}>{ico}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground uppercase font-mono">Service Title</label>
                  <input required type="text" placeholder="e.g. Full-Stack Web Development" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-mono focus:border-accent outline-none" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground uppercase font-mono">Description</label>
                  <textarea required value={desc} onChange={e => setDesc(e.target.value)} rows={3} placeholder="Describe service scope..." className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-sans focus:border-accent outline-none resize-none" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground uppercase font-mono">Used In</label>
                    <input type="text" placeholder="e.g. SaaS • Apps • APIs" value={usedIn} onChange={e => setUsedIn(e.target.value)} className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-mono focus:border-accent outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground uppercase font-mono">Bottom Metadata</label>
                    <input type="text" placeholder="e.g. 🚀 Idea to Scale" value={bottomMeta} onChange={e => setBottomMeta(e.target.value)} className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-mono focus:border-accent outline-none" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground uppercase font-mono">Tags (comma separated)</label>
                  <input type="text" placeholder="Next.js, Tailwind, Docker" value={tagsInput} onChange={e => setTagsInput(e.target.value)} className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-mono focus:border-accent outline-none" />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-border/20">
                  <Button type="button" onClick={() => setIsModalOpen(false)} variant="outline" className="border-border/40 hover:bg-accent/10 px-4 py-2 font-mono uppercase tracking-widest text-xs rounded-xl">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading} className="bg-accent text-accent-foreground hover:bg-accent/80 px-4 py-2 font-mono uppercase tracking-widest text-xs rounded-xl">
                    {loading ? <RefreshCw size={14} className="animate-spin" /> : editingService ? "Commit Changes" : "Deploy Service"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

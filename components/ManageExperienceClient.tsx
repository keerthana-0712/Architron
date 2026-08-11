"use client";

import { useState } from "react";
import { 
  Plus, Trash2, Edit3, X, RefreshCw, Database, ShieldAlert,
  Briefcase, Laptop, Hammer, Calendar, PlusCircle, Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  achievements: string[];
  type: string; // "building" or "work"
}

interface ManageExperienceClientProps {
  initialExperiences: Experience[];
  dbOffline: boolean;
  dbError: string;
}

export default function ManageExperienceClient({
  initialExperiences,
  dbOffline,
  dbError
}: ManageExperienceClientProps) {
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [activeTab, setActiveTab] = useState<"building" | "work">("building");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);

  // Form State
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [period, setPeriod] = useState("");
  const [type, setType] = useState("building");
  
  // Achievements (Array list)
  const [achievements, setAchievements] = useState<string[]>([]);
  const [newAchievement, setNewAchievement] = useState("");

  const [loading, setLoading] = useState(false);
  const [actionError, setActionError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");

  const resetForm = () => {
    setCompany("");
    setRole("");
    setPeriod("");
    setType(activeTab);
    setAchievements([]);
    setNewAchievement("");
    setEditingExperience(null);
    setActionError("");
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (exp: Experience) => {
    setEditingExperience(exp);
    setCompany(exp.company);
    setRole(exp.role);
    setPeriod(exp.period);
    setType(exp.type);
    setAchievements([...exp.achievements]);
    setNewAchievement("");
    setIsModalOpen(true);
  };

  const handleAddAchievement = () => {
    if (!newAchievement.trim()) return;
    setAchievements([...achievements, newAchievement.trim()]);
    setNewAchievement("");
  };

  const handleRemoveAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setActionError("");
    setActionSuccess("");

    try {
      const url = "/api/experience";
      const method = editingExperience ? "PUT" : "POST";
      const body = {
        id: editingExperience?.id,
        company,
        role,
        period,
        achievements,
        type
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!res.ok) throw new Error(await res.text() || "Failed to save experience");

      const savedExperience = await res.json();

      if (editingExperience) {
        setExperiences(experiences.map(e => e.id === savedExperience.id ? savedExperience : e));
        setActionSuccess("Experience record updated.");
      } else {
        setExperiences([savedExperience, ...experiences]);
        setActionSuccess("Experience record deployed.");
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
    if (!confirm("Are you sure you want to delete this experience record?")) return;
    setLoading(true);
    setActionError("");
    setActionSuccess("");

    try {
      const res = await fetch(`/api/experience?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete experience");

      setExperiences(experiences.filter(e => e.id !== id));
      setActionSuccess("Experience record deleted.");
    } catch (err: any) {
      setActionError(err.message || "Could not delete experience.");
    } finally {
      setLoading(false);
    }
  };

  const filteredExperiences = experiences.filter(exp => exp.type === activeTab);

  return (
    <div className="space-y-8 font-mono text-sm text-foreground">
      {/* Header */}
      <div className="border border-border/40 p-6 rounded-2xl bg-card/30 backdrop-blur flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-accent uppercase font-mono">Experience Registry</h1>
          <p className="text-muted-foreground mt-1">Configure and manage developer career timelines</p>
        </div>
        <Button onClick={openAddModal} className="bg-accent text-accent-foreground hover:bg-accent/80 font-mono uppercase tracking-widest text-xs py-2 px-4 rounded-xl flex items-center gap-2">
          <Plus size={16} /> Deploy Experience
        </Button>
      </div>

      {dbOffline && (
        <div className="p-4 border border-yellow-500/20 bg-yellow-500/5 text-yellow-500 rounded-xl flex items-center gap-3">
          <ShieldAlert size={20} />
          <div>
            <p className="font-bold">Database Access Fault</p>
            <p className="text-xs text-yellow-500/80 mt-0.5">{dbError}</p>
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

      {/* Tab Switcher */}
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div className="flex p-1 bg-neutral-900 border border-border/40 rounded-xl">
          <button
            onClick={() => setActiveTab("building")}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-bold transition-all font-mono uppercase ${
              activeTab === "building"
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Hammer size={14} /> Building / Projects
          </button>
          <button
            onClick={() => setActiveTab("work")}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-bold transition-all font-mono uppercase ${
              activeTab === "work"
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Laptop size={14} /> Work / Internships
          </button>
        </div>

        <span className="text-xs text-muted-foreground uppercase tracking-widest">
          SYS TIME SEGMENT: <span className="text-accent font-bold">{activeTab}</span>
        </span>
      </div>

      {/* Experience Timeline Grid */}
      <div className="border border-border/40 rounded-2xl overflow-hidden bg-card/10">
        <div className="p-4 border-b border-border/40 bg-card/20 flex items-center justify-between">
          <span className="font-bold text-accent font-mono uppercase tracking-wider text-xs flex items-center gap-2">
            <Database size={14} /> Registered Timelines ({filteredExperiences.length})
          </span>
          <div className="text-xs text-muted-foreground">
            SYS REGISTRY: <span className="text-green-500">READY</span>
          </div>
        </div>

        {filteredExperiences.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            No timelines found. Click 'Deploy Experience' to register record.
          </div>
        ) : (
          <div className="divide-y divide-border/20 p-6 space-y-6">
            {filteredExperiences.map((exp) => (
              <div key={exp.id} className="pt-6 first:pt-0 relative pl-8 border-l border-border/30 group hover:border-accent transition-colors flex flex-col justify-between">
                <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-border group-hover:bg-accent transition-colors" />
                
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-foreground">{exp.company}</h3>
                    <p className="text-xs text-accent font-medium mt-0.5">{exp.role}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground bg-neutral-900 border border-border/20 px-3 py-1 rounded-full w-fit">
                    <Calendar size={12} />
                    {exp.period}
                  </div>
                </div>

                <ul className="mt-4 space-y-2 pl-4 list-disc text-muted-foreground text-xs font-sans leading-relaxed">
                  {exp.achievements.map((ach, i) => (
                    <li key={i}>{ach}</li>
                  ))}
                </ul>

                <div className="mt-6 flex justify-end gap-2 border-t border-border/10 pt-4">
                  <Button variant="outline" onClick={() => openEditModal(exp)} className="p-2 rounded-lg border-border/40 hover:bg-accent/10 hover:text-accent">
                    <Edit3 size={14} />
                  </Button>
                  <Button variant="outline" onClick={() => handleDelete(exp.id)} className="p-2 rounded-lg border-border/40 hover:bg-rose-500/10 hover:text-rose-500">
                    <Trash2 size={14} />
                  </Button>
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
                  {editingExperience ? "Edit Experience Profile" : "Deploy Experience Record"}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground uppercase font-mono">Company / Project</label>
                    <input required type="text" placeholder="e.g. ServiceNow" value={company} onChange={e => setCompany(e.target.value)} className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-mono focus:border-accent outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground uppercase font-mono">Role / Designation</label>
                    <input required type="text" placeholder="e.g. Systems Engineer" value={role} onChange={e => setRole(e.target.value)} className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-mono focus:border-accent outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground uppercase font-mono">Period</label>
                    <input required type="text" placeholder="e.g. 2024 - Present" value={period} onChange={e => setPeriod(e.target.value)} className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-mono focus:border-accent outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground uppercase font-mono">Category Tab</label>
                    <select value={type} onChange={e => setType(e.target.value)} className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-mono focus:border-accent outline-none">
                      <option value="building">Building / Projects</option>
                      <option value="work">Work / Internships</option>
                    </select>
                  </div>
                </div>

                {/* Achievements Config */}
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground uppercase font-mono block">Achievements / bullet points</label>
                  
                  {/* Achievements List */}
                  <div className="space-y-2 max-h-40 overflow-y-auto border border-border/20 p-3 bg-neutral-950 rounded-xl">
                    {achievements.length === 0 ? (
                      <span className="text-xs text-muted-foreground italic">No achievements added yet.</span>
                    ) : (
                      <div className="space-y-1.5">
                        {achievements.map((ach, idx) => (
                          <div key={idx} className="flex items-start justify-between gap-2 bg-neutral-900 p-2 border border-border/20 rounded-lg">
                            <span className="text-xs text-foreground font-sans">{ach}</span>
                            <button type="button" onClick={() => handleRemoveAchievement(idx)} className="text-muted-foreground hover:text-rose-500">
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Add Achievement inline */}
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Add key milestone..." 
                      value={newAchievement} 
                      onChange={e => setNewAchievement(e.target.value)} 
                      onKeyDown={e => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddAchievement();
                        }
                      }}
                      className="flex-1 px-3 py-1.5 bg-neutral-900 border border-border/40 rounded-xl text-xs outline-none text-foreground font-mono focus:border-accent"
                    />
                    <button type="button" onClick={handleAddAchievement} className="p-2 bg-neutral-800 text-accent hover:text-accent-foreground hover:bg-accent border border-border/30 rounded-xl">
                      <PlusCircle size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-border/20">
                  <Button type="button" onClick={() => setIsModalOpen(false)} variant="outline" className="border-border/40 hover:bg-accent/10 px-4 py-2 font-mono uppercase tracking-widest text-xs rounded-xl">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading} className="bg-accent text-accent-foreground hover:bg-accent/80 px-4 py-2 font-mono uppercase tracking-widest text-xs rounded-xl">
                    {loading ? <RefreshCw size={14} className="animate-spin" /> : editingExperience ? "Commit" : "Deploy"}
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

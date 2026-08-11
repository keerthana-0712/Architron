"use client";

import { useState } from "react";
import { 
  Plus, Trash2, Edit3, X, RefreshCw, Database, ShieldAlert,
  Server, Cloud, Network, PenTool, LayoutTemplate, HelpCircle, ChevronDown, ChevronRight, Check,
  Brain, Briefcase
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Skill {
  id: string;
  name: string;
  categoryId: string;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: Skill[];
}

interface ManageSkillsClientProps {
  initialCategories: SkillCategory[];
  dbOffline: boolean;
  dbError: string;
}

const AVAILABLE_ICONS = {
  Network,
  Server,
  Database,
  LayoutTemplate,
  Cloud,
  PenTool,
  Brain,
  Briefcase
};

export default function ManageSkillsClient({
  initialCategories,
  dbOffline,
  dbError
}: ManageSkillsClientProps) {
  const [categories, setCategories] = useState<SkillCategory[]>(initialCategories);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  
  // Category Modal State
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(null);
  const [catTitle, setCatTitle] = useState("");
  const [catIcon, setCatIcon] = useState("Network");

  // Skill Inline State (For adding/editing skills)
  const [activeCategoryIdForNewSkill, setActiveCategoryIdForNewSkill] = useState<string | null>(null);
  const [newSkillName, setNewSkillName] = useState("");
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [editingSkillName, setEditingSkillName] = useState("");

  const [loading, setLoading] = useState(false);
  const [actionError, setActionError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");

  const toggleCategoryExpand = (id: string) => {
    setExpandedCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const resetCatForm = () => {
    setCatTitle("");
    setCatIcon("Network");
    setEditingCategory(null);
    setActionError("");
  };

  const openAddCatModal = () => {
    resetCatForm();
    setIsCatModalOpen(true);
  };

  const openEditCatModal = (cat: SkillCategory, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingCategory(cat);
    setCatTitle(cat.title);
    setCatIcon(cat.icon);
    setIsCatModalOpen(true);
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setActionError("");
    setActionSuccess("");

    try {
      const url = "/api/skills";
      const method = editingCategory ? "PUT" : "POST";
      const body = {
        action: "category",
        id: editingCategory?.id,
        title: catTitle,
        icon: catIcon
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!res.ok) throw new Error(await res.text() || "Failed to save category");

      const savedCategory = await res.json();

      if (editingCategory) {
        setCategories(categories.map(c => c.id === savedCategory.id ? { ...savedCategory, skills: c.skills } : c));
        setActionSuccess("Skill category updated.");
      } else {
        setCategories([...categories, { ...savedCategory, skills: [] }]);
        setActionSuccess("Skill category deployed.");
      }

      setIsCatModalOpen(false);
      resetCatForm();
    } catch (err: any) {
      setActionError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure? Deleting this category will delete all sub-skills!")) return;
    setLoading(true);
    setActionError("");
    setActionSuccess("");

    try {
      const res = await fetch(`/api/skills?type=category&id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete category");

      setCategories(categories.filter(c => c.id !== id));
      setActionSuccess("Skill category purged.");
    } catch (err: any) {
      setActionError(err.message || "Could not delete category.");
    } finally {
      setLoading(false);
    }
  };

  // ─── Skills (Sub-items) CRUD ───────────────────────────────────────────────

  const handleAddSkill = async (categoryId: string) => {
    if (!newSkillName.trim()) return;
    setLoading(true);
    setActionError("");
    setActionSuccess("");

    try {
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "skill",
          name: newSkillName.trim(),
          categoryId
        })
      });

      if (!res.ok) throw new Error("Failed to add skill");
      const savedSkill = await res.json();

      setCategories(categories.map(c => {
        if (c.id === categoryId) {
          return { ...c, skills: [...c.skills, savedSkill] };
        }
        return c;
      }));

      setNewSkillName("");
      setActiveCategoryIdForNewSkill(null);
      setActionSuccess("Skill deployed inline.");
    } catch (err: any) {
      setActionError(err.message || "Error adding skill.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSkill = async (id: string, categoryId: string) => {
    if (!editingSkillName.trim()) return;
    setLoading(true);
    setActionError("");
    setActionSuccess("");

    try {
      const res = await fetch("/api/skills", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "skill",
          id,
          name: editingSkillName.trim(),
          categoryId
        })
      });

      if (!res.ok) throw new Error("Failed to update skill");
      const updatedSkill = await res.json();

      setCategories(categories.map(c => {
        if (c.id === categoryId) {
          return {
            ...c,
            skills: c.skills.map(s => s.id === id ? updatedSkill : s)
          };
        }
        return c;
      }));

      setEditingSkillId(null);
      setEditingSkillName("");
      setActionSuccess("Skill modified.");
    } catch (err: any) {
      setActionError(err.message || "Error updating skill.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkill = async (id: string, categoryId: string) => {
    if (!confirm("Remove this skill?")) return;
    setLoading(true);
    setActionError("");
    setActionSuccess("");

    try {
      const res = await fetch(`/api/skills?type=skill&id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete skill");

      setCategories(categories.map(c => {
        if (c.id === categoryId) {
          return { ...c, skills: c.skills.filter(s => s.id !== id) };
        }
        return c;
      }));

      setActionSuccess("Skill deleted.");
    } catch (err: any) {
      setActionError(err.message || "Error deleting skill.");
    } finally {
      setLoading(false);
    }
  };

  const renderIcon = (iconName: string) => {
    const IconComp = (AVAILABLE_ICONS as any)[iconName] || HelpCircle;
    return <IconComp className="h-5 w-5 text-accent" />;
  };

  return (
    <div className="space-y-8 font-mono text-sm text-foreground">
      {/* Header */}
      <div className="border border-border/40 p-6 rounded-2xl bg-card/30 backdrop-blur flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-accent uppercase font-mono">Domain Skill Matrix</h1>
          <p className="text-muted-foreground mt-1">Manage active engineering categories and respective capabilities</p>
        </div>
        <Button onClick={openAddCatModal} className="bg-accent text-accent-foreground hover:bg-accent/80 font-mono uppercase tracking-widest text-xs py-2 px-4 rounded-xl flex items-center gap-2">
          <Plus size={16} /> Deploy Category
        </Button>
      </div>

      {dbOffline && (
        <div className="p-4 border border-yellow-500/20 bg-yellow-500/5 text-yellow-500 rounded-xl flex items-center gap-3">
          <ShieldAlert size={20} />
          <div>
            <p className="font-bold">Database Access Interrupt</p>
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

      {/* Categories Accordion */}
      <div className="space-y-4">
        {categories.map((cat) => {
          const isExpanded = expandedCategories[cat.id] ?? false;
          return (
            <div key={cat.id} className="border border-border/40 rounded-2xl overflow-hidden bg-card/10">
              {/* Accordion Trigger Header */}
              <div 
                onClick={() => toggleCategoryExpand(cat.id)}
                className="p-5 bg-card/20 flex items-center justify-between hover:bg-card/30 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="p-2 rounded-xl bg-accent/5 border border-accent/15">
                    {renderIcon(cat.icon)}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-base">{cat.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Subskills: {cat.skills.length}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0" onClick={e => e.stopPropagation()}>
                  <Button variant="outline" onClick={(e) => openEditCatModal(cat, e)} className="p-2 rounded-lg border-border/40 hover:bg-accent/10">
                    <Edit3 size={14} />
                  </Button>
                  <Button variant="outline" onClick={(e) => handleDeleteCategory(cat.id, e)} className="p-2 rounded-lg border-border/40 hover:bg-rose-500/10 hover:text-rose-500">
                    <Trash2 size={14} />
                  </Button>
                  <button 
                    onClick={() => toggleCategoryExpand(cat.id)}
                    className="p-2 text-muted-foreground hover:text-foreground"
                  >
                    {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </button>
                </div>
              </div>

              {/* Sub-skills panel */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div 
                    initial={{ height: 0 }} 
                    animate={{ height: "auto" }} 
                    exit={{ height: 0 }}
                    className="overflow-hidden border-t border-border/15 bg-neutral-900/10"
                  >
                    <div className="p-6 space-y-4">
                      {/* Skill Sub-list */}
                      {cat.skills.length === 0 ? (
                        <p className="text-xs text-muted-foreground italic">No sub-skills defined for this domain.</p>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {cat.skills.map((skill) => (
                            <div key={skill.id} className="p-3 bg-neutral-900 border border-border/30 rounded-xl flex items-center justify-between group">
                              {editingSkillId === skill.id ? (
                                <div className="flex items-center gap-2 w-full">
                                  <input 
                                    type="text" 
                                    value={editingSkillName} 
                                    onChange={e => setEditingSkillName(e.target.value)} 
                                    className="flex-1 bg-neutral-950 border border-border/50 text-xs px-2 py-1 rounded outline-none text-foreground font-mono focus:border-accent"
                                    autoFocus
                                  />
                                  <button onClick={() => handleUpdateSkill(skill.id, cat.id)} className="text-emerald-400 hover:text-emerald-300">
                                    <Check size={14} />
                                  </button>
                                  <button onClick={() => setEditingSkillId(null)} className="text-muted-foreground hover:text-foreground">
                                    <X size={14} />
                                  </button>
                                </div>
                              ) : (
                                <>
                                  <span className="text-xs text-foreground font-sans font-medium">{skill.name}</span>
                                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                      onClick={() => {
                                        setEditingSkillId(skill.id);
                                        setEditingSkillName(skill.name);
                                      }} 
                                      className="p-1 text-muted-foreground hover:text-accent"
                                    >
                                      <Edit3 size={12} />
                                    </button>
                                    <button onClick={() => handleDeleteSkill(skill.id, cat.id)} className="p-1 text-muted-foreground hover:text-rose-500">
                                      <Trash2 size={12} />
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add Skill trigger */}
                      {activeCategoryIdForNewSkill === cat.id ? (
                        <div className="flex items-center gap-2 max-w-sm pt-2">
                          <input 
                            required
                            type="text" 
                            placeholder="Skill title..." 
                            value={newSkillName} 
                            onChange={e => setNewSkillName(e.target.value)} 
                            className="w-full px-3 py-1.5 bg-neutral-950 border border-border/50 rounded-xl text-xs outline-none text-foreground font-mono focus:border-accent" 
                          />
                          <Button onClick={() => handleAddSkill(cat.id)} className="bg-accent text-accent-foreground py-1.5 px-3 rounded-xl text-xs uppercase font-mono">
                            Add
                          </Button>
                          <Button variant="outline" onClick={() => setActiveCategoryIdForNewSkill(null)} className="py-1.5 px-3 rounded-xl text-xs font-mono">
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => {
                            setActiveCategoryIdForNewSkill(cat.id);
                            setNewSkillName("");
                          }}
                          className="mt-2 text-xs text-accent/80 hover:text-accent font-mono flex items-center gap-1.5"
                        >
                          <Plus size={14} /> Add new capability
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Category Modal Dialog */}
      <AnimatePresence>
        {isCatModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-lg border border-border/60 bg-card p-6 rounded-2xl shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-border/20 pb-4">
                <h3 className="font-bold text-lg font-mono uppercase text-accent">
                  {editingCategory ? "Configure Skill Category" : "Deploy Skill Category"}
                </h3>
                <button onClick={() => setIsCatModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleCategorySubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground uppercase font-mono">Category Title</label>
                  <input required type="text" placeholder="e.g. Distributed Systems" value={catTitle} onChange={e => setCatTitle(e.target.value)} className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-mono focus:border-accent outline-none" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground uppercase font-mono">Category Icon</label>
                  <select value={catIcon} onChange={e => setCatIcon(e.target.value)} className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-mono focus:border-accent outline-none">
                    {Object.keys(AVAILABLE_ICONS).map(ico => (
                      <option key={ico} value={ico}>{ico}</option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-border/20">
                  <Button type="button" onClick={() => setIsCatModalOpen(false)} variant="outline" className="border-border/40 hover:bg-accent/10 px-4 py-2 font-mono uppercase tracking-widest text-xs rounded-xl">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading} className="bg-accent text-accent-foreground hover:bg-accent/80 px-4 py-2 font-mono uppercase tracking-widest text-xs rounded-xl">
                    {loading ? <RefreshCw size={14} className="animate-spin" /> : editingCategory ? "Commit" : "Deploy"}
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

"use client";

import { useState } from "react";
import { 
  Plus, Trash2, Edit3, X, RefreshCw, Database, ShieldAlert,
  Briefcase, Code, Network, Globe, GitFork
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  statementOfPurpose?: string | null;
  thumbnail?: string | null;
  techStack: string[];
  highlights: string[];
  architectureTitle: string;
  architectureDesc: string;
  challenges: string[];
  metrics: any;
  nodes: any;
  connections: any;
  flows: any;
  tradeOffs: any;
  schemaSnippet?: string | null;
  github?: string | null;
  demo?: string | null;
}

interface ManageProjectsClientProps {
  initialProjects: Project[];
  dbOffline: boolean;
  dbError: string;
}

export default function ManageProjectsClient({
  initialProjects,
  dbOffline,
  dbError
}: ManageProjectsClientProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form State
  const [projectId, setProjectId] = useState(""); // custom ID for routes (e.g., foths-ecosystem)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [statementOfPurpose, setStatementOfPurpose] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [techStackInput, setTechStackInput] = useState("");
  const [highlightsInput, setHighlightsInput] = useState("");
  const [architectureTitle, setArchitectureTitle] = useState("");
  const [architectureDesc, setArchitectureDesc] = useState("");
  const [challengesInput, setChallengesInput] = useState("");
  const [schemaSnippet, setSchemaSnippet] = useState("");
  const [github, setGithub] = useState("");
  const [demo, setDemo] = useState("");

  // JSON fields
  const [metricsJSON, setMetricsJSON] = useState("[]");
  const [nodesJSON, setNodesJSON] = useState("[]");
  const [connectionsJSON, setConnectionsJSON] = useState("[]");
  const [flowsJSON, setFlowsJSON] = useState("[]");
  const [tradeOffsJSON, setTradeOffsJSON] = useState("[]");

  const [loading, setLoading] = useState(false);
  const [actionError, setActionError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");

  const resetForm = () => {
    setProjectId("");
    setTitle("");
    setDescription("");
    setFullDescription("");
    setStatementOfPurpose("");
    setThumbnail("");
    setTechStackInput("");
    setHighlightsInput("");
    setArchitectureTitle("");
    setArchitectureDesc("");
    setChallengesInput("");
    setSchemaSnippet("");
    setGithub("");
    setDemo("");

    setMetricsJSON("[]");
    setNodesJSON("[]");
    setConnectionsJSON("[]");
    setFlowsJSON("[]");
    setTradeOffsJSON("[]");
    setEditingProject(null);
    setActionError("");
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (proj: Project) => {
    setEditingProject(proj);
    setProjectId(proj.id);
    setTitle(proj.title);
    setDescription(proj.description);
    setFullDescription(proj.fullDescription);
    setStatementOfPurpose(proj.statementOfPurpose || "");
    setThumbnail(proj.thumbnail || "");
    setTechStackInput(proj.techStack.join(", "));
    setHighlightsInput(proj.highlights.join("\n"));
    setArchitectureTitle(proj.architectureTitle);
    setArchitectureDesc(proj.architectureDesc);
    setChallengesInput(proj.challenges.join("\n"));
    setSchemaSnippet(proj.schemaSnippet || "");
    setGithub(proj.github || "");
    setDemo(proj.demo || "");

    setMetricsJSON(JSON.stringify(proj.metrics, null, 2));
    setNodesJSON(JSON.stringify(proj.nodes, null, 2));
    setConnectionsJSON(JSON.stringify(proj.connections, null, 2));
    setFlowsJSON(JSON.stringify(proj.flows, null, 2));
    setTradeOffsJSON(JSON.stringify(proj.tradeOffs, null, 2));

    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setActionError("");
    setActionSuccess("");

    // Validate JSON fields
    let metrics, nodes, connections, flows, tradeOffs;
    try {
      metrics = JSON.parse(metricsJSON);
      nodes = JSON.parse(nodesJSON);
      connections = JSON.parse(connectionsJSON);
      flows = JSON.parse(flowsJSON);
      tradeOffs = JSON.parse(tradeOffsJSON);
    } catch (jsonErr: any) {
      setActionError(`JSON Syntax Error: ${jsonErr.message}. Check formatting.`);
      setLoading(false);
      return;
    }

    const techStack = techStackInput.split(",").map(t => t.trim()).filter(t => t !== "");
    const highlights = highlightsInput.split("\n").map(h => h.trim()).filter(h => h !== "");
    const challenges = challengesInput.split("\n").map(c => c.trim()).filter(c => c !== "");

    try {
      const url = "/api/projects";
      const method = editingProject ? "PUT" : "POST";
      const body = {
        id: projectId.trim() || undefined,
        title,
        description,
        fullDescription,
        statementOfPurpose: statementOfPurpose || null,
        thumbnail: thumbnail || null,
        techStack,
        highlights,
        architectureTitle,
        architectureDesc,
        challenges,
        metrics,
        nodes,
        connections,
        flows,
        tradeOffs,
        schemaSnippet: schemaSnippet || null,
        github: github || null,
        demo: demo || null
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!res.ok) throw new Error(await res.text() || "Failed to save project");

      const savedProject = await res.json();

      if (editingProject) {
        setProjects(projects.map(p => p.id === savedProject.id ? savedProject : p));
        setActionSuccess("Project profile updated successfully.");
      } else {
        setProjects([savedProject, ...projects]);
        setActionSuccess("Project profile deployed successfully.");
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
    if (!confirm("Are you sure you want to delete this project? This action is permanent!")) return;
    setLoading(true);
    setActionError("");
    setActionSuccess("");

    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete project");

      setProjects(projects.filter(p => p.id !== id));
      setActionSuccess("Project deleted.");
    } catch (err: any) {
      setActionError(err.message || "Could not delete project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 font-mono text-sm text-foreground">
      {/* Header */}
      <div className="border border-border/40 p-6 rounded-2xl bg-card/30 backdrop-blur flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-accent uppercase font-mono">Project Control Registry</h1>
          <p className="text-muted-foreground mt-1">Manage static/dynamic portfolio architectures</p>
        </div>
        <Button onClick={openAddModal} className="bg-accent text-accent-foreground hover:bg-accent/80 font-mono uppercase tracking-widest text-xs py-2 px-4 rounded-xl flex items-center gap-2">
          <Plus size={16} /> Deploy Project
        </Button>
      </div>

      {dbOffline && (
        <div className="p-4 border border-yellow-500/20 bg-yellow-500/5 text-yellow-500 rounded-xl flex items-center gap-3">
          <ShieldAlert size={20} />
          <div>
            <p className="font-bold">Database Access Alert</p>
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

      {/* Projects list */}
      <div className="border border-border/40 rounded-2xl overflow-hidden bg-card/10">
        <div className="p-4 border-b border-border/40 bg-card/20 flex items-center justify-between">
          <span className="font-bold text-accent font-mono uppercase tracking-wider text-xs flex items-center gap-2">
            <Database size={14} /> System Records ({projects.length})
          </span>
          <div className="text-xs text-muted-foreground">
            SYSTEM ENGINE: <span className="text-green-500">LIVE</span>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            No projects registered. Click 'Deploy Project' to launch a timeline.
          </div>
        ) : (
          <div className="divide-y divide-border/20">
            {projects.map((proj) => (
              <div key={proj.id} className="p-6 flex flex-col md:flex-row md:items-start justify-between gap-6 hover:bg-card/25 transition-colors">
                <div className="space-y-3 flex-1">
                  <div>
                    <h3 className="font-bold text-foreground text-base">{proj.title}</h3>
                    <p className="text-xs text-accent font-mono mt-0.5">ID: {proj.id}</p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed font-sans text-xs">{proj.description}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {proj.techStack.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 text-[10px] font-mono rounded bg-muted border border-border/20 text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                    {proj.github && (
                      <span className="flex items-center gap-1">
                        <GitFork size={12} /> GitHub configured
                      </span>
                    )}
                    {proj.demo && (
                      <span className="flex items-center gap-1">
                        <Globe size={12} /> Live Link configured
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-start">
                  <Button variant="outline" onClick={() => openEditModal(proj)} className="p-2.5 rounded-lg border-border/40 hover:bg-accent/10 hover:text-accent">
                    <Edit3 size={16} />
                  </Button>
                  <Button variant="outline" onClick={() => handleDelete(proj.id)} className="p-2.5 rounded-lg border-border/40 hover:bg-rose-500/10 hover:text-rose-500">
                    <Trash2 size={16} />
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-4xl border border-border/60 bg-card p-6 rounded-2xl shadow-xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-border/20 pb-4">
                <h3 className="font-bold text-lg font-mono uppercase text-accent">
                  {editingProject ? "Configure Project Registry" : "Deploy Project Registry"}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground uppercase font-mono">Project ID (URL slug)</label>
                    <input required type="text" placeholder="e.g. clientra-agency-os" disabled={editingProject !== null} value={projectId} onChange={e => setProjectId(e.target.value)} className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-mono focus:border-accent outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground uppercase font-mono">Project Title</label>
                    <input required type="text" placeholder="Project Name" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-mono focus:border-accent outline-none" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground uppercase font-mono">Short Description</label>
                  <input required type="text" placeholder="Brief tagline..." value={description} onChange={e => setDescription(e.target.value)} className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-sans focus:border-accent outline-none" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground uppercase font-mono">Full Description</label>
                  <textarea required value={fullDescription} onChange={e => setFullDescription(e.target.value)} rows={5} placeholder="Full architecture overview..." className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-sans focus:border-accent outline-none resize-none" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground uppercase font-mono">Statement of Purpose (Passionate Rationale)</label>
                  <textarea value={statementOfPurpose} onChange={e => setStatementOfPurpose(e.target.value)} rows={4} placeholder="Why did you build this? (Markdown supported)" className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-sans focus:border-accent outline-none resize-none" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground uppercase font-mono">Thumbnail Asset Link</label>
                    <input type="text" placeholder="/clientra-thumbnail.jpeg" value={thumbnail} onChange={e => setThumbnail(e.target.value)} className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-mono focus:border-accent outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground uppercase font-mono">Tech Stack (comma separated)</label>
                    <input type="text" placeholder="Next.js 16, React 19, Tailwind, Prisma, PostgreSQL" value={techStackInput} onChange={e => setTechStackInput(e.target.value)} className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-mono focus:border-accent outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground uppercase font-mono">GitHub Repository URL</label>
                    <input type="text" placeholder="https://github.com/..." value={github} onChange={e => setGithub(e.target.value)} className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-mono focus:border-accent outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground uppercase font-mono">Demo Link</label>
                    <input type="text" placeholder="https://..." value={demo} onChange={e => setDemo(e.target.value)} className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-mono focus:border-accent outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground uppercase font-mono">Architecture Title</label>
                    <input required type="text" placeholder="e.g. Distributed Microservices Architecture" value={architectureTitle} onChange={e => setArchitectureTitle(e.target.value)} className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-mono focus:border-accent outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground uppercase font-mono">Schema Snippet (ASCII/Text representation)</label>
                    <textarea value={schemaSnippet} onChange={e => setSchemaSnippet(e.target.value)} rows={3} placeholder="model Agency { id String ... }" className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-mono focus:border-accent outline-none resize-none" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground uppercase font-mono">Architecture Description</label>
                  <textarea required value={architectureDesc} onChange={e => setArchitectureDesc(e.target.value)} rows={3} placeholder="Explain system component operations..." className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-sans focus:border-accent outline-none resize-none" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground uppercase font-mono">Highlights (one per line)</label>
                    <textarea value={highlightsInput} onChange={e => setHighlightsInput(e.target.value)} rows={4} placeholder="High-concurrency systems...&#10;Low latency nodes..." className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-sans focus:border-accent outline-none resize-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground uppercase font-mono">Challenges Faced (one per line)</label>
                    <textarea value={challengesInput} onChange={e => setChallengesInput(e.target.value)} rows={4} placeholder="Establishing strict tenant isolation boundaries...&#10;Real-time websocket synching..." className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-sans focus:border-accent outline-none resize-none" />
                  </div>
                </div>

                {/* Complex JSON Configurations */}
                <div className="border-t border-border/20 pt-6 mt-6 space-y-4">
                  <h4 className="text-sm font-bold text-accent uppercase font-mono">Diagram & System JSON Configs</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground uppercase font-mono block">Metrics JSON (Array of label/value)</label>
                      <textarea required value={metricsJSON} onChange={e => setMetricsJSON(e.target.value)} rows={5} className="w-full px-3 py-2 bg-neutral-950 border border-border/40 rounded-xl text-foreground font-mono text-xs focus:border-accent outline-none resize-none" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground uppercase font-mono block">Trade-offs JSON (Array of decision/choice/alternative/rationale)</label>
                      <textarea required value={tradeOffsJSON} onChange={e => setTradeOffsJSON(e.target.value)} rows={5} className="w-full px-3 py-2 bg-neutral-950 border border-border/40 rounded-xl text-foreground font-mono text-xs focus:border-accent outline-none resize-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground uppercase font-mono block">Flow Nodes JSON (Array of id/label/type/tech/details/x/y)</label>
                      <textarea required value={nodesJSON} onChange={e => setNodesJSON(e.target.value)} rows={8} className="w-full px-3 py-2 bg-neutral-950 border border-border/40 rounded-xl text-foreground font-mono text-xs focus:border-accent outline-none resize-none" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground uppercase font-mono block">Connections JSON (Array of from/to)</label>
                      <textarea required value={connectionsJSON} onChange={e => setConnectionsJSON(e.target.value)} rows={8} className="w-full px-3 py-2 bg-neutral-950 border border-border/40 rounded-xl text-foreground font-mono text-xs focus:border-accent outline-none resize-none" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground uppercase font-mono block">Flow Tracks JSON (Array of name/description/path/steps)</label>
                      <textarea required value={flowsJSON} onChange={e => setFlowsJSON(e.target.value)} rows={8} className="w-full px-3 py-2 bg-neutral-950 border border-border/40 rounded-xl text-foreground font-mono text-xs focus:border-accent outline-none resize-none" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-border/20">
                  <Button type="button" onClick={() => setIsModalOpen(false)} variant="outline" className="border-border/40 hover:bg-accent/10 px-4 py-2 font-mono uppercase tracking-widest text-xs rounded-xl">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading} className="bg-accent text-accent-foreground hover:bg-accent/80 px-4 py-2 font-mono uppercase tracking-widest text-xs rounded-xl">
                    {loading ? <RefreshCw size={14} className="animate-spin" /> : editingProject ? "Commit Modifications" : "Deploy Project"}
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

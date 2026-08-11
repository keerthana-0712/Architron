"use client";

import { useState } from "react";
import { 
  Star, Plus, Trash2, Edit3, X, Sparkles, Check, AlertTriangle, 
  Database, RefreshCw, MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string | null;
  featured: boolean;
  createdAt: string;
}

interface ManageReviewsClientProps {
  initialReviews: Testimonial[];
  dbOffline: boolean;
  dbError: string;
  adminEmail: string;
}

export default function ManageReviewsClient({
  initialReviews,
  dbOffline,
  dbError,
  adminEmail
}: ManageReviewsClientProps) {
  const [reviews, setReviews] = useState<Testimonial[]>(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Testimonial | null>(null);
  
  // Form State
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [avatar, setAvatar] = useState("");
  const [featured, setFeatured] = useState(true);
  
  const [loading, setLoading] = useState(false);
  const [actionError, setActionError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");

  const resetForm = () => {
    setName("");
    setRole("");
    setContent("");
    setRating(5);
    setAvatar("");
    setFeatured(true);
    setEditingReview(null);
    setActionError("");
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (review: Testimonial) => {
    setEditingReview(review);
    setName(review.name);
    setRole(review.role);
    setContent(review.content);
    setRating(review.rating);
    setAvatar(review.avatar || "");
    setFeatured(review.featured);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setActionError("");
    setActionSuccess("");

    try {
      const url = "/api/reviews";
      const method = editingReview ? "PUT" : "POST";
      const body = {
        id: editingReview?.id,
        name,
        role,
        content,
        rating,
        avatar: avatar || null,
        featured
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        throw new Error(await res.text() || "Failed to save review");
      }

      const savedReview = await res.json();
      
      if (editingReview) {
        setReviews(reviews.map(r => r.id === savedReview.id ? savedReview : r));
        setActionSuccess("Review updated successfully.");
      } else {
        setReviews([savedReview, ...reviews]);
        setActionSuccess("Review added successfully.");
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
    if (!confirm("Are you sure you want to delete this review?")) return;
    setLoading(true);
    setActionError("");
    setActionSuccess("");

    try {
      const res = await fetch(`/api/reviews?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete review");
      
      setReviews(reviews.filter(r => r.id !== id));
      setActionSuccess("Review deleted successfully.");
    } catch (err: any) {
      setActionError(err.message || "Could not delete review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 font-mono text-sm text-foreground">
      {/* Header Panel */}
      <div className="border border-border/40 p-6 rounded-2xl bg-card/30 backdrop-blur flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-accent uppercase font-mono">Review Control Terminal</h1>
          <p className="text-muted-foreground mt-1">Admin Email: {adminEmail}</p>
        </div>
        <Button onClick={openAddModal} className="bg-accent text-accent-foreground hover:bg-accent/80 font-mono uppercase tracking-widest text-xs py-2 px-4 rounded-xl flex items-center gap-2">
          <Plus size={16} /> Deploy New Review
        </Button>
      </div>

      {/* Connection warning */}
      {dbOffline && (
        <div className="p-4 border border-yellow-500/20 bg-yellow-500/5 text-yellow-500 rounded-xl flex items-center gap-3">
          <AlertTriangle size={20} />
          <div>
            <p className="font-bold">Database Warning</p>
            <p className="text-xs text-yellow-500/80 mt-0.5">Database appears offline. Fallback mode active. Review modifications will not persist.</p>
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

      {/* Main Table/Grid */}
      <div className="border border-border/40 rounded-2xl overflow-hidden bg-card/10">
        <div className="p-4 border-b border-border/40 bg-card/20 flex items-center justify-between">
          <span className="font-bold text-accent font-mono uppercase tracking-wider text-xs flex items-center gap-2">
            <Database size={14} /> Active Records ({reviews.length})
          </span>
          <div className="text-xs text-muted-foreground">
            SYSTEM STATUS: <span className="text-green-500">ONLINE</span>
          </div>
        </div>

        {reviews.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            <MessageSquare size={32} className="mx-auto text-muted-foreground/30 mb-2" />
            No reviews found in DB.
          </div>
        ) : (
          <div className="divide-y divide-border/20">
            {reviews.map((review) => (
              <div key={review.id} className="p-6 flex flex-col md:flex-row md:items-start justify-between gap-6 hover:bg-card/20 transition-colors">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-foreground text-base">{review.name}</span>
                    <span className="text-xs text-muted-foreground bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded">
                      {review.role}
                    </span>
                    {review.featured && (
                      <span className="text-[10px] font-bold text-accent border border-accent/20 bg-accent/5 px-2 py-0.5 rounded flex items-center gap-1 font-mono uppercase tracking-wider">
                        <Sparkles size={10} /> Featured
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed font-sans">{review.content}</p>
                </div>

                <div className="flex items-center gap-3 self-end md:self-start">
                  <Button variant="outline" onClick={() => openEditModal(review)} className="p-2.5 rounded-lg border-border/40 hover:bg-accent/10 hover:text-accent transition-colors">
                    <Edit3 size={16} />
                  </Button>
                  <Button variant="outline" onClick={() => handleDelete(review.id)} className="p-2.5 rounded-lg border-border/40 hover:bg-rose-500/10 hover:text-rose-500 transition-colors">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-lg border border-border/60 bg-card p-6 rounded-2xl shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-border/20 pb-4">
                <h3 className="font-bold text-lg font-mono uppercase text-accent">
                  {editingReview ? "Modify Review Record" : "Deploy Review Record"}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground uppercase font-mono">Client Name</label>
                    <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-mono focus:border-accent outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground uppercase font-mono">Client Role/Company</label>
                    <input required type="text" value={role} onChange={e => setRole(e.target.value)} className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-mono focus:border-accent outline-none" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground uppercase font-mono">Review Content</label>
                  <textarea required value={content} onChange={e => setContent(e.target.value)} rows={4} className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-sans focus:border-accent outline-none resize-none" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground uppercase font-mono">Rating (1-5)</label>
                    <select value={rating} onChange={e => setRating(parseInt(e.target.value))} className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-mono focus:border-accent outline-none">
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="2">2 Stars</option>
                      <option value="1">1 Star</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground uppercase font-mono">Avatar URL (Optional)</label>
                    <input type="text" value={avatar} onChange={e => setAvatar(e.target.value)} className="w-full px-3 py-2 bg-neutral-900 border border-border/40 rounded-xl text-foreground font-mono focus:border-accent outline-none" />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input type="checkbox" id="featured" checked={featured} onChange={e => setFeatured(e.target.checked)} className="rounded border-border bg-neutral-900 text-accent focus:ring-0" />
                  <label htmlFor="featured" className="text-xs text-muted-foreground uppercase font-mono cursor-pointer">
                    Feature on public portfolio frontpage
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-border/20">
                  <Button type="button" onClick={() => setIsModalOpen(false)} variant="outline" className="border-border/40 hover:bg-accent/10 px-4 py-2 font-mono uppercase tracking-widest text-xs rounded-xl">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading} className="bg-accent text-accent-foreground hover:bg-accent/80 px-4 py-2 font-mono uppercase tracking-widest text-xs rounded-xl">
                    {loading ? <RefreshCw size={14} className="animate-spin" /> : editingReview ? "Commit" : "Deploy"}
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
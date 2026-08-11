import { useEffect, useState } from "react";
import { Star, MessageSquare, RefreshCw } from "lucide-react";

interface Review {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string | null;
  featured?: boolean;
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/reviews");
        if (!res.ok) throw new Error("Failed to load reviews");
        const data = await res.json();
        setReviews(data);
      } catch (err: any) {
        setError(err.message || "Error loading reviews");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-muted-foreground">
        <RefreshCw className="animate-spin mr-2" size={20} /> Loading reviews…
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-rose-500">
        <MessageSquare className="mx-auto mb-2" size={48} />
        {error}
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-bold text-accent uppercase tracking-wider text-center mb-6">
        Customer Reviews
      </h2>
      {reviews.length === 0 ? (
        <p className="text-center text-muted-foreground">No reviews available.</p>
      ) : (
        <div className="divide-y divide-border/20">
          {reviews.map((review) => (
            <div key={review.id} className="p-6 flex flex-col md:flex-row md:items-start justify-between gap-6 hover:bg-card/20 transition-colors">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  {review.avatar ? (
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-mono">
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-foreground">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.role}</p>
                  </div>
                  {review.featured && (
                    <span className="text-[10px] font-bold text-accent border border-accent/20 bg-accent/5 px-2 py-0.5 rounded flex items-center gap-1 font-mono uppercase tracking-wider ml-2">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg> Featured
                    </span>
                  )}
                </div>
                <div className="flex items-center mb-2 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed font-sans mb-2">
                  {review.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

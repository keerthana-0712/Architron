"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Star, CheckCircle, Heart } from "lucide-react";

// ─── Review Data ────────────────────────────────────────────────────────────
const REVIEWS = [
  {
    id: "1",
    type: "enterprise",
    name: "ResuNext Team",
    role: "Product Team · resunext.ai",
    content:
      "Keerthana built our entire resume platform from scratch — a full-stack AI product with a flawless user experience. The code quality, architecture decisions, and design sensibility were all exceptional.",
    rating: 5,
    avatar: "https://www.google.com/s2/favicons?sz=64&domain=resunext.ai",
    nameGradient: "linear-gradient(135deg, #5d8def, #a2bef6)",
    borderColor: "rgba(20,82,204,0.35)",
    glowColor: "rgba(20,82,204,0.18)",
    cardBg: "rgba(10,10,12,0.9)",
  },
  {
    id: "2",
    type: "enterprise",
    name: "Maxy Team",
    role: "Engineering · maxy.co.in",
    content:
      "Working with Keerthana was a game-changer for our startup. She understood our vision instantly and delivered a polished, production-ready product well ahead of schedule. Highly recommended.",
    rating: 5,
    avatar: "https://www.google.com/s2/favicons?sz=64&domain=maxy.co.in",
    nameGradient: "linear-gradient(135deg, #50a8ff, #8ecae6)",
    borderColor: "rgba(80,168,255,0.35)",
    glowColor: "rgba(80,168,255,0.18)",
    cardBg: "rgba(10,10,12,0.9)",
  },
  {
    id: "3",
    type: "happy",
    name: "Priya Nair",
    role: "Startup Founder · Craftly Studio",
    content:
      "I was blown away by the attention to detail! Every pixel was thoughtfully placed, and the interactions felt so smooth and natural. Keerthana truly understands what makes a product feel premium.",
    rating: 5,
    avatar: null,
    nameGradient: "linear-gradient(135deg, #f472b6, #c084fc)",
    borderColor: "rgba(244,114,182,0.35)",
    glowColor: "rgba(244,114,182,0.18)",
    cardBg: "rgba(10,10,12,0.9)",
  },
  {
    id: "4",
    type: "enterprise",
    name: "Corex Platform",
    role: "Product · corexplatform.vercel.app",
    content:
      "Keerthana transformed our vision into a stunning, high-performance platform. The architecture is rock-solid and the UI is absolutely beautiful. Our users love it!",
    rating: 5,
    avatar: "https://corexplatform.vercel.app/favicon.ico",
    nameGradient: "linear-gradient(135deg, #f97316, #ef4444)",
    borderColor: "rgba(249,115,22,0.35)",
    glowColor: "rgba(249,115,22,0.18)",
    cardBg: "rgba(10,10,12,0.9)",
  },
  {
    id: "5",
    type: "enterprise",
    name: "Ambassadors for the Lord",
    role: "Ministry · ambassadorsforthelord.vercel.app",
    content:
      "Our website is now a beautiful digital home for our community. Keerthana designed it with such care and grace — every section feels meaningful and the whole experience is seamless.",
    rating: 5,
    avatar: "https://ambassadorsforthelord.vercel.app/favicon.ico",
    nameGradient: "linear-gradient(135deg, #e5b80b, #f5d56e)",
    borderColor: "rgba(229,184,11,0.35)",
    glowColor: "rgba(229,184,11,0.18)",
    cardBg: "rgba(10,10,12,0.9)",
  },
  {
    id: "6",
    type: "happy",
    name: "James Whitfield",
    role: "Small Business Owner",
    content:
      "Oh wow — I honestly did not expect this level of quality from a single developer! My website looks like it was built by a top agency. Customers keep complimenting it. Absolutely thrilled!",
    rating: 5,
    avatar: null,
    nameGradient: "linear-gradient(135deg, #f472b6, #c084fc)",
    borderColor: "rgba(244,114,182,0.35)",
    glowColor: "rgba(244,114,182,0.18)",
    cardBg: "rgba(10,10,12,0.9)",
  },
];

export default function Testimonials({ testimonials }: { testimonials?: any[] }) {
  const list = testimonials && testimonials.length > 0 ? testimonials : REVIEWS;
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [marqueeErrors, setMarqueeErrors] = useState<Record<string, boolean>>({});
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getReviewStyles = (review: any, idx: number) => {
    const gradients = [
      "linear-gradient(135deg, #5d8def, #a2bef6)",
      "linear-gradient(135deg, #50a8ff, #8ecae6)",
      "linear-gradient(135deg, #f472b6, #c084fc)",
      "linear-gradient(135deg, #f97316, #ef4444)",
      "linear-gradient(135deg, #e5b80b, #f5d56e)",
      "linear-gradient(135deg, #34d399, #6ee7b7)"
    ];
    const borderColors = [
      "rgba(20,82,204,0.35)",
      "rgba(80,168,255,0.35)",
      "rgba(244,114,182,0.35)",
      "rgba(249,115,22,0.35)",
      "rgba(229,184,11,0.35)",
      "rgba(52,211,153,0.35)"
    ];
    const glowColors = [
      "rgba(20,82,204,0.18)",
      "rgba(80,168,255,0.18)",
      "rgba(244,114,182,0.18)",
      "rgba(249,115,22,0.18)",
      "rgba(229,184,11,0.18)",
      "rgba(52,211,153,0.18)"
    ];
    const styleIdx = idx % gradients.length;
    return {
      nameGradient: review.nameGradient || gradients[styleIdx],
      borderColor: review.borderColor || borderColors[styleIdx],
      glowColor: review.glowColor || glowColors[styleIdx],
      cardBg: review.cardBg || "rgba(10,10,12,0.9)",
      type: review.type || (idx % 2 === 0 ? "enterprise" : "happy")
    };
  };

  const goTo = useCallback((idx: number) => {
    setActive((idx + list.length) % list.length);
  }, [list.length]);

  // Restart 2-second autoplay after any interaction
  const scheduleNext = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setActive((prev) => (prev + 1) % list.length);
    }, 2000);
  }, [list.length]);

  useEffect(() => {
    if (!hovered) scheduleNext();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [active, hovered, scheduleNext]);

  const handleCardClick = (idx: number) => {
    goTo(idx);
  };

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const handleMarqueeImageError = (copy: number, id: string) => {
    setMarqueeErrors((prev) => ({ ...prev, [`${copy}-${id}`]: true }));
  };

  return (
    <section
      id="testimonials"
      className="relative py-24 overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 60%, rgba(255,181,139,0.08), transparent)",
        }}
      />

      {/* Section heading */}
      <div className="text-center mb-14 px-4">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-mono mb-3">
          What clients say
        </p>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight">
          Happy{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #FFb58b, #ff8c5a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Clients
          </span>
        </h2>
      </div>

      {/* Carousel */}
      <div className="relative flex items-center justify-center" style={{ minHeight: 360 }}>
        {list.map((review, idx) => {
          const styles = getReviewStyles(review, idx);
          const offset = idx - active;
          // Wrap offset so we always pick the shortest path
          const wrapped =
            offset > list.length / 2
              ? offset - list.length
              : offset < -list.length / 2
              ? offset + list.length
              : offset;

          const isCenter = wrapped === 0;
          const isNeighbor = Math.abs(wrapped) === 1;
          const isVisible = Math.abs(wrapped) <= 2;

          if (!isVisible) return null;

          const scale = isCenter ? 1 : isNeighbor ? 0.88 : 0.78;
          const opacity = isCenter ? 1 : isNeighbor ? 0.5 : 0.22;
          const blur = isCenter ? 0 : isNeighbor ? 1.5 : 3;
          const zIndex = isCenter ? 30 : isNeighbor ? 20 : 10;
          const translateX = wrapped * 340;

          return (
            <div
              key={review.id}
              onClick={() => !isCenter && handleCardClick(idx)}
              style={{
                position: "absolute",
                width: 340,
                transform: `translateX(${translateX}px) scale(${scale})`,
                opacity,
                filter: `blur(${blur}px)`,
                zIndex,
                transition: "all 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: isCenter ? "default" : "pointer",
              }}
            >
              {/* Card */}
              <div
                className="relative rounded-3xl p-7 flex flex-col gap-4"
                style={{
                  background: "rgba(10,10,12,0.9)",
                  border: `1px solid ${isCenter ? styles.borderColor : "rgba(255,255,255,0.06)"}`,
                  boxShadow: isCenter
                    ? `0 20px 60px ${styles.glowColor}, 0 0 0 1px ${styles.borderColor}`
                    : "none",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
              >
                {/* ❤ Happy Client badge — half outside, half inside the card */}
                {styles.type === "happy" && (
                  <span
                    className="absolute top-0 right-5 -translate-y-1/2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap z-10"
                    style={{
                      background: "#1a1035",
                      color: "#f472b6",
                      border: "1px solid rgba(244,114,182,0.45)",
                      boxShadow: "0 2px 12px rgba(244,114,182,0.2)",
                    }}
                  >
                    <Heart size={9} fill="currentColor" /> Happy User's
                  </span>
                )}

                {/* Stars row — badge only for enterprise */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-0.5 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                    ))}
                  </div>
                  {styles.type === "enterprise" && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 border border-emerald-500/25 bg-emerald-500/8 px-2 py-0.5 rounded-full font-mono uppercase tracking-wider whitespace-nowrap">
                      <CheckCircle size={10} /> Verified Partnership
                    </span>
                  )}
                </div>

                {/* Quote */}
                <p className="text-sm leading-relaxed text-muted-foreground font-sans text-left">
                  &ldquo;{review.content}&rdquo;
                </p>

                {/* Divider */}
                <div
                  className="h-px w-full"
                  style={{ background: `linear-gradient(to right, transparent, ${styles.borderColor}, transparent)` }}
                />

                {/* Avatar + Name + Role */}
                <div className="flex items-center gap-3 text-left">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 overflow-hidden"
                    style={{
                      background: "rgba(15,20,35,0.9)",
                      border: `1.5px solid ${styles.borderColor}`,
                      boxShadow: `0 0 10px ${styles.glowColor}`,
                    }}
                  >
                    {review.avatar && !imageErrors[review.id] ? (
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-6 h-6 rounded-sm object-contain"
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(review.id)}
                      />
                    ) : (
                      <span
                        className="items-center justify-center font-black text-base flex"
                        style={{
                          background: styles.nameGradient,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {review.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <p
                      className="font-black text-sm tracking-tight"
                      style={{
                        background: styles.nameGradient,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {review.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {review.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>



      {/* ── Brand Marquee Strip ─────────────────────────────────────────── */}
      <div className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground/50 mt-20 mb-6 font-mono">
        trusted by innovative teams & platforms
      </div>
      <div className="relative overflow-hidden border-y border-border/10 py-5"
        style={{
          background: "rgba(15,23,42,0.3)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(255,255,255,0.04)"
        }}>
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-28 z-10"
          style={{ background: "linear-gradient(to right, var(--background), transparent)" }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-28 z-10"
          style={{ background: "linear-gradient(to left, var(--background), transparent)" }} />

        <div className="flex items-center w-max animate-[marquee_32s_linear_infinite] hover:[animation-play-state:paused]">
          {[0, 1, 2, 3].map((copy) => (
            <div key={copy} className="flex items-center gap-0">

              {/* ResuNext */}
              <a href="https://resunext.ai/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-2 mx-6 rounded-xl border transition-all duration-300 group shrink-0"
                style={{ background: "rgba(20,82,204,0.05)", borderColor: "rgba(20,82,204,0.25)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(20,82,204,0.55)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(20,82,204,0.25)")}>
                {!marqueeErrors[`${copy}-resunext`] && (
                  <img src="https://www.google.com/s2/favicons?sz=64&domain=resunext.ai" alt="ResuNext"
                    referrerPolicy="no-referrer"
                    className="w-5 h-5 rounded-md object-contain shrink-0 group-hover:scale-110 transition-transform duration-300"
                    onError={() => handleMarqueeImageError(copy, "resunext")} />
                )}
                <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter whitespace-nowrap group-hover:brightness-110 transition-all duration-300"
                  style={{ background: "linear-gradient(135deg, #5d8def, #a2bef6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Resu<span className="font-light">Next</span>
                </span>
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </a>

              {/* Maxy */}
              <a href="https://maxy.co.in/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-2 mx-6 rounded-xl border transition-all duration-300 group shrink-0"
                style={{ background: "rgba(80,168,255,0.05)", borderColor: "rgba(80,168,255,0.25)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(80,168,255,0.55)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(80,168,255,0.25)")}>
                {!marqueeErrors[`${copy}-maxy`] && (
                  <img src="https://www.google.com/s2/favicons?sz=64&domain=maxy.co.in" alt="Maxy"
                    referrerPolicy="no-referrer"
                    className="w-5 h-5 rounded-md object-contain shrink-0 group-hover:scale-110 transition-transform duration-300"
                    onError={() => handleMarqueeImageError(copy, "maxy")} />
                )}
                <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter whitespace-nowrap group-hover:brightness-110 transition-all duration-300"
                  style={{ background: "linear-gradient(135deg, #50a8ff, #8ecae6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Maxy
                </span>
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </a>

              {/* Corex Platform */}
              <a href="https://corexplatform.vercel.app/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-2 mx-6 rounded-xl border transition-all duration-300 group shrink-0"
                style={{ background: "rgba(249,115,22,0.05)", borderColor: "rgba(249,115,22,0.25)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(249,115,22,0.55)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(249,115,22,0.25)")}>
                {!marqueeErrors[`${copy}-corex`] && (
                  <img src="https://corexplatform.vercel.app/favicon.ico" alt="Corex Platform"
                    referrerPolicy="no-referrer"
                    className="w-5 h-5 rounded-md object-contain shrink-0 group-hover:scale-110 transition-transform duration-300"
                    onError={() => handleMarqueeImageError(copy, "corex")} />
                )}
                <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter whitespace-nowrap group-hover:brightness-110 transition-all duration-300"
                  style={{ background: "linear-gradient(135deg, #f97316, #ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Corex<span className="font-light text-xl md:text-2xl ml-1">Platform</span>
                </span>
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </a>

              {/* Ambassadors for the Lord */}
              <a href="https://ambassadorsforthelord.vercel.app/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-2 mx-6 rounded-xl border transition-all duration-300 group shrink-0"
                style={{ background: "rgba(229,184,11,0.05)", borderColor: "rgba(229,184,11,0.25)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(229,184,11,0.55)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(229,184,11,0.25)")}>
                {!marqueeErrors[`${copy}-afl`] && (
                  <img src="https://ambassadorsforthelord.vercel.app/favicon.ico" alt="Ambassadors for the Lord"
                    referrerPolicy="no-referrer"
                    className="w-5 h-5 rounded-md object-contain shrink-0 group-hover:scale-110 transition-transform duration-300"
                    onError={() => handleMarqueeImageError(copy, "afl")} />
                )}
                <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter whitespace-nowrap group-hover:brightness-110 transition-all duration-300"
                  style={{ background: "linear-gradient(135deg, #e5b80b, #f5d56e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Ambassadors for the Lord
                </span>
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </a>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
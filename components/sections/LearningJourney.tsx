"use client";

import { motion } from "framer-motion";
import { Brain, Rocket, Code, Lightbulb, TrendingUp } from "lucide-react";

export default function LearningJourney() {
  const steps = [
    {
      title: "The Shift in Mindset",
      desc: "I didn't start by mastering tech stacks or memorizing syntax. I started by identifying problems that needed solving.",
      icon: Brain,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      title: "Building Real Products",
      desc: "My growth accelerated when I stopped following tutorials and started building FOTHS. Real users and real complexity were my best teachers.",
      icon: Code,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "AI as a Force Multiplier",
      desc: "I used AI as a tool, not a shortcut. It allowed me to architect complex systems like microservices and Kafka streams without knowing everything upfront.",
      icon: Rocket,
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    },
    {
      title: "Learning by Breaking",
      desc: "I improved by intentionally breaking systems and rebuilding them. Understanding why a system fails is how I learned to make it resilient.",
      icon: Lightbulb,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10"
    },
    {
      title: "The Product Engineer Evolution",
      desc: "Today, I focus on 'Why' before 'How'. I build with a product mindset, ensuring every line of code serves a user-first goal.",
      icon: TrendingUp,
      color: "text-green-500",
      bg: "bg-green-500/10"
    }
  ];

  return (
    <section id="learning-journey" className="py-24 bg-muted/30 border-y border-border">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">My Learning Journey</h2>
          <p className="text-muted-foreground text-lg">
            Turning the perceived "weakness" of being a fresher into a strength through 
            <span className="text-foreground font-bold italic"> radical ownership </span> and 
            <span className="text-foreground font-bold italic"> builder-first learning</span>.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border/50 hover:border-accent/40 transition-all group"
              >
                <div className={`p-4 rounded-xl ${step.bg} ${step.color} mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon size={32} />
                </div>
                <h3 className="text-lg font-bold mb-3 text-foreground leading-tight">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-accent/5 border border-accent/20 text-center max-w-4xl mx-auto">
          <p className="text-xl font-medium text-foreground italic">
            "I didn't wait for permission to build. I started with a vision, broke it down into systems, and learned what I needed to make it real."
          </p>
        </div>
      </div>
    </section>
  );
}

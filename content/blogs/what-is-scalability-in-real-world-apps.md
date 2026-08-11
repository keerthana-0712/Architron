---
slug: "what-is-scalability-in-real-world-apps"
title: "What is Scalability in Real-World Apps?"
date: "Jul 2023"
readTime: "7 min read"
category: "engineering"
tags: ["Scalability","Backend"]
views: "940 reads"
likes: 62
author:
  name: "Keerthana Salla"
  role: "CTO @ Maxy · Founder @ FOTHS"
excerpt: "Understanding vertical vs horizontal scaling and how systems handle traffic spikes without breaking."
---

# What is Scalability in Real-World Apps?

Scalability is the measure of a system's ability to handle increasing amounts of work by adding resources.

## Vertical vs Horizontal Scaling
- **Vertical Scaling (Scaling Up)**: Adding more CPU or RAM to a single server. It has a physical limit and creates a single point of failure.
- **Horizontal Scaling (Scaling Out)**: Adding more server nodes to your pool. This is the standard for modern cloud applications, allowing infinite scale.

By design, modern full-stack applications should remain stateless, enabling traffic to be routed across any node seamlessly.

---
slug: "how-i-structured-30-plus-modules-in-foths"
title: "How I Structured 30+ Modules in FOTHS"
date: "Feb 2024"
readTime: "13 min read"
category: "build-logs"
tags: ["Modularity","Systems"]
views: "1.0k reads"
likes: 76
author:
  name: "Keerthana Salla"
  role: "CTO @ Maxy · Founder @ FOTHS"
excerpt: "Managing domain separation and module interoperability in an 'All-In-One' platform without creating a monolith."
---

# How I Structured 30+ Modules in FOTHS

FOTHS is an "All-In-One" platform. It contains a Bible reader, prayer logs, social groups, an e-commerce shop, live streams, dynamic course trackers, and internal team emails. Maintaining a codebase with 30+ modules requires a clean folder structure and strict boundaries to prevent it from turning into a chaotic spaghetti code pile.

Here is the exact repository organization structure I used.

## The Monorepo Strategy
I structured the portfolio project using a unified monorepo framework (using npm workspaces).

```
portfolio/
 ├── apps/
 │    ├── web/ (Next.js frontend)
 │    └── gateway/ (Express router)
 ├── packages/
 │    ├── database/ (Prisma and schemas)
 │    ├── shared-ui/ (React UI tokens)
 │    └── utils/ (Core helper libraries)
 └── content/ (Blog articles and markdown)
```

## Module Separation Rules
To keep modules modular and prevent cross-dependencies, I enforced two main architectural rules:

1. **Strict Imports**: Modules under `packages/` cannot import files directly from `apps/`. They must be self-contained libraries.
2. **Interface Contracts**: If the `Store Service` needs metrics data from the `Academy Service`, it must make an API request or pull from a shared queue rather than accessing the other service's internal helpers.

This structure allows us to rebuild any single feature module (e.g. replacing Express with NestJS) without affecting the remaining codebase.

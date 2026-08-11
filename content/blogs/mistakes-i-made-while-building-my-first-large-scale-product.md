---
slug: "mistakes-i-made-while-building-my-first-large-scale-product"
title: "Mistakes I Made While Building My First Large-Scale Product"
date: "Feb 2024"
readTime: "9 min read"
category: "build-logs"
tags: ["Reflection","Growth"]
views: "1.3k reads"
likes: 110
author:
  name: "Keerthana Salla"
  role: "CTO @ Maxy · Founder @ FOTHS"
excerpt: "A transparent reflection on architectural technical debt and the lessons learned from scaling FOTHS."
---

# Mistakes I Made While Building My First Large-Scale Product

We learn more from our failures than our successes. While FOTHS is now a highly performant and stable system, its early versions had structural mistakes that caused load issues and developer frustration.

Here is a transparent reflection on the architectural mistakes I made and how I fixed them.

## Mistake 1: Premature Microservice Partitioning
Initially, I separated the backend into 8 different microservices, each with its own repository and deployment configuration.
- **The Issue**: As a single developer, I was spending 60% of my time managing network configurations, API synchronization, and local Docker networks.
- **The Correction**: I consolidated the codebase into a monorepo setup. The services remain separated logically in folders, but they share configurations, reducing maintenance overhead.

## Mistake 2: Missing Database Connection Pool Limits
I noticed that during traffic simulation tests, the API Gateway would start throwing `504 Gateway Timeout` errors. Under high load, PostgreSQL was rejecting new connections.
- **The Issue**: Every API handler was opening a new connection to PostgreSQL without closing it promptly, quickly exceeding the server's `max_connections` limit.
- **The Correction**: I implemented Prisma's built-in connection pooling and limited the pool size.

```typescript
// Optimized connection string
// DATABASE_URL="postgresql://user:pass@host:5432/db?connection_limit=20"
```

## Mistake 3: Storing Binary Files in the Main Database
In version 0.1, when users uploaded sermon clips, I stored the files directly as base64 strings inside MongoDB document payloads.
- **The Issue**: MongoDB documents have a 16MB limit. Large uploads failed, and database memory usage surged during read/write cycles.
- **The Correction**: I refactored the media engine to upload files directly to **AWS S3** via presigned URLs and stored only the file URL path in MongoDB.

By systematically identifying these failure points and refactoring them, I gained a deep appreciation for database administration and system observability.

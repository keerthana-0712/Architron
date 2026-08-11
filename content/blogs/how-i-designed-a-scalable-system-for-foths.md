---
slug: "how-i-designed-a-scalable-system-for-foths"
title: "How I Designed a Scalable System for FOTHS"
date: "May 2024"
readTime: "12 min read"
category: "engineering"
tags: ["Architecture","Scale"]
views: "1.4k reads"
likes: 124
author:
  name: "Keerthana Salla"
  role: "CTO @ Maxy · Founder @ FOTHS"
excerpt: "Exploring the distributed microservices architecture and API Gateway orchestration that powers a global spiritual ecosystem."
---

# How I Designed a Scalable System for FOTHS

Designing the backend infrastructure for FOTHS (Fire of the Holy Spirit) was one of the most challenging and rewarding projects I've ever undertaken. The goal was simple but massive: build an "All-In-One" Christian platform capable of handling real-time Bible goal tracking, global prayer request walls, worship audio streaming, and community forums for thousands of concurrent users.

Here is how I designed a distributed, resilient, and scalable architecture to make this possible.

## The Problem: The Monolithic Pitfall
In early conceptualization, combining Bible reading, media streaming, and community networking into a single codebase seemed logical. However, as the feature set grew to over 30 modules, a monolith would have created tight coupling, deployment bottlenecks, and single-point-of-failure vulnerabilities. If the audio streaming service experienced load spikes, the prayer wall and user authentication would crash.

## The Solution: Distributed Microservices
I separated the system into distinct, autonomous services organized around domain-driven design (DDD) principles.

```
[ Client Apps (React/Next.js) ]
              │
              ▼ (HTTPS / WebSockets)
     [ API Gateway (Express) ]
              │
      ┌───────┼───────┬──────────────┐
      ▼       ▼       ▼              ▼
   [Auth] [Prayer] [Stream]      [Academy]
      │       │       │              │
      └───────┼───────┴──────┐       │
              ▼              ▼       ▼
          [ Redis ]      [ Kafka ] [Postgres]
                             │
                             ▼
                         [MongoDB]
```

### 1. The API Gateway Layer
The API Gateway acts as the single entry point for all client requests. It handles:
- **Rate Limiting**: Custom token-bucket rate limiter to prevent DDoS attacks.
- **Authentication**: Validating JWT tokens and injecting user headers into downstream requests.
- **Request Routing**: Proxying client requests to corresponding microservices.

```javascript
// API Gateway Router Snippet (Express)
const express = require('express');
const httpProxy = require('express-http-proxy');
const app = express();

const authServiceProxy = httpProxy('http://auth-service:5001');
const prayerServiceProxy = httpProxy('http://prayer-service:5002');
const streamServiceProxy = httpProxy('http://stream-service:5003');

app.use('/api/v1/auth', (req, res, next) => authServiceProxy(req, res, next));
app.use('/api/v1/prayers', (req, res, next) => prayerServiceProxy(req, res, next));
app.use('/api/v1/stream', (req, res, next) => streamServiceProxy(req, res, next));

app.listen(8000, () => console.log('API Gateway active on port 8000'));
```

### 2. Dual Database Strategy
- **PostgreSQL**: Used for structured, transactional data such as user profiles, billing/donations, and course enrollments.
- **MongoDB**: Used for high-volume, unstructured document data like Bible reading logs, prayer comments, and notifications.

### 3. Asynchronous Event-Driven Messaging
To avoid blocking synchronous HTTP requests, services communicate using **Apache Kafka**. For instance, when a user finishes a Bible chapter:
1. The `Academy Service` publishes a `CHAPTER_COMPLETED` event to Kafka.
2. The `Streak Service` consumes this event, increments the user's daily streak, and invalidates the cache.
3. The `Notification Service` pushes a congrats message to the client.

## Scaling & Key Optimizations
- **Distributed Caching (Redis)**: We cache frequently accessed Bible verses and active prayer walls. This reduced database read latency from 45ms to <3ms.
- **Database Indexing**: Compound indexing on MongoDB (`userId` + `date`) optimized streak checks.

## Conclusion
By shifting from a monolith to a distributed microservices approach, FOTHS achieved independent service deployability, high fault tolerance, and sub-120ms P99 latency under load. Technology, when architected correctly, can indeed become a powerful vessel for community and purpose.

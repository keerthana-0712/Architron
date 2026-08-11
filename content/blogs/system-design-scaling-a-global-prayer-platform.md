---
slug: "system-design-scaling-a-global-prayer-platform"
title: "System Design: Scaling a Global Prayer Platform (FOTHS Case Study)"
date: "Apr 2024"
readTime: "15 min read"
category: "engineering"
tags: ["System Design","Kafka"]
views: "2.1k reads"
likes: 189
author:
  name: "Keerthana Salla"
  role: "CTO @ Maxy · Founder @ FOTHS"
excerpt: "Solving for real-time consistency and low latency across global regions using Kafka and distributed database clusters."
---

# System Design: Scaling a Global Prayer Platform

In a standard application, standard REST endpoints are enough. But when you are building a global prayer platform like FOTHS, where thousands of believers are posting prayer requests, liking them, and praying for them in real-time, the system requirements change drastically.

The goal was: sub-100ms update propagation, persistent storage, and high availability even during traffic spikes (e.g. during a global streaming revival event).

## High-Level System Architecture

```
[ Client Browser ] ──► [ Load Balancer (Nginx) ]
                               │
                       (WebSocket Conn)
                               ▼
                   [ WebSocket Server Cluster ]
                     │                      ▲
              (Publish Events)         (Read Buffer)
                     ▼                      │
             [ Kafka (Event Log) ] ──────► [ Redis Cache ]
                     │
             (Consumer Group)
                     ▼
          [ Worker Services ] ──► [ MongoDB Database ]
```

## 1. Handling Real-Time Feeds with WebSockets
To ensure users see prayer updates instantly without polling the database, we established persistent WebSocket connections.
- **Gateway Server**: Express server running `socket.io`.
- **Horizontal Scaling**: Since a single node can only support a limited number of TCP connections, we deployed a cluster of WebSocket servers behind Nginx.
- **Inter-node Communication**: We used Redis Pub/Sub to synchronize socket events across servers. When user A posts a prayer on Server 1, Server 1 publishes to Redis, and Server 2 catches the message and forwards it to user B connected to Server 2.

## 2. Decoupling DB Writes with Kafka
Directly writing every prayer, comment, and "Amen" click to MongoDB during high-load events creates write contention. To resolve this, we introduced **Apache Kafka** as a write buffer.

When a user clicks "Amen":
1. The WebSocket server sends a fast ACK to the client (optimistic UI update).
2. It publishes an event `prayer.amen.clicked` to the Kafka queue.
3. A background consumer worker polls Kafka in batches and updates MongoDB using bulk-write operations.

```typescript
// Kafka Producer Code Snippet
import { Kafka } from "kafkajs";

const kafka = new Kafka({ clientId: "prayer-app", brokers: ["kafka:9092"] });
const producer = kafka.producer();

export async function publishAmenEvent(prayerId: string, userId: string) {
  await producer.connect();
  await producer.send({
    topic: "prayer-events",
    messages: [
      { 
        key: prayerId, 
        value: JSON.stringify({ event: "AMEN", prayerId, userId, timestamp: Date.now() }) 
      }
    ]
  });
}
```

## 3. Database Schema Optimizations
For the prayer logs, we used MongoDB with a document schema designed for speed:

```json
{
  "_id": "ObjectId",
  "userId": "String",
  "content": "String",
  "category": "Spiritual/Healing",
  "amenCount": "Number",
  "comments": [
    { "userId": "String", "text": "String", "createdAt": "Date" }
  ],
  "createdAt": "Date"
}
```

We placed a compound index on `{ category: 1, createdAt: -1 }` to serve the filtered prayer feed instantly.

## Results
- **Max Throughput**: 15,000 operations per second.
- **Latency**: P99 read latency under 15ms; real-time update propagation under 80ms.
- **Resilience**: Shudown of any single database node did not lead to data loss due to Kafka replication.

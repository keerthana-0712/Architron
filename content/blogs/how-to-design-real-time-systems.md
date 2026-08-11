---
slug: "how-to-design-real-time-systems"
title: "How to Design Real-Time Systems (Digital Twin Project)"
date: "Apr 2024"
readTime: "11 min read"
category: "engineering"
tags: ["Real-time","WebSockets"]
views: "920 reads"
likes: 72
author:
  name: "Keerthana Salla"
  role: "CTO @ Maxy · Founder @ FOTHS"
excerpt: "Implementing high-frequency state synchronization and reactive UI updates for complex system simulations."
---

# How to Design Real-Time Systems (Digital Twin Project)

A "Digital Twin" is a virtual representation of a physical system, capturing its state changes in real-time. In my Digital Twin Simulation project, the goal was to model high-frequency server metrics (CPU, Memory, Network) and sync them with a 3D Canvas visualizer.

Here is the engineering breakdown of how to design a high-frequency real-time state synchronization pipeline.

## The Sync Challenge
If your backend collects telemetry metrics at 10Hz (10 times a second), sending 10 separate JSON payloads over HTTP per client is extremely inefficient. The browser rendering engine will struggle with paint layout thrashing, and the server will exhaust sockets.

## The Architecture: Binary Streams + WebSocket Gateway
To solve this, I designed a pipeline that compresses metrics and pushes them via a dedicated WebSocket connection using structured binary formats or compacted JSON arrays.

```
[ Hardware / Telemetry Agent ] ──► (JSON Array) ──► [ Node.js Collector ]
                                                           │
                                                   (WebSocket Broadcast)
                                                           ▼
[ React 19 Frontend ] ◄── (framer-motion lerp) ◄── [ client-hook state ]
```

### 1. State Throttling on the Server
Instead of pushing every single tick immediately, the server groups metrics into 100ms intervals and sends them as a single packaged message.

```typescript
// Server metric aggregator
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
let metricsBuffer: any[] = [];

setInterval(() => {
  if (metricsBuffer.length > 0) {
    const payload = JSON.stringify({ type: 'TELEMETRY_BATCH', data: metricsBuffer });
    wss.clients.forEach(client => {
      if (client.readyState === 1) client.send(payload);
    });
    metricsBuffer = []; // Clear buffer
  }
}, 100); // 10Hz batch interval
```

### 2. Smooth Interpolation on the Client
Receiving updates every 100ms can look stuttered on a 60Hz/120Hz display. To make transitions seamless, the client-side visualizer does not snap elements directly to the new values. Instead, it interpolates (lerps) the state.

I used **framer-motion** and **three.js** properties to animate coordinates smoothly:

```typescript
// Client Interpolation Loop (lerp)
function lerp(start: number, end: number, amt: number) {
  return (1 - amt) * start + amt * end;
}

// In render frame loop:
currentX = lerp(currentX, targetX, 0.1);
mesh.position.x = currentX;
```

## Monitoring & Safety
- **Keep-Alives**: We implement a ping/pong heartbeat every 30 seconds to close dead connections and prevent socket leaks.
- **Backpressure Handling**: If a client's network buffer is full, the server drops messages rather than queuing them in memory, protecting the host process.

With this setup, our digital twin dashboard handles telemetry streams with virtually zero browser lag and sub-50ms glass-to-glass latency.

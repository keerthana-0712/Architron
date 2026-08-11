---
slug: "how-i-learned-react-by-building-real-products"
title: "How I Learned React by Building Real Products"
date: "Dec 2023"
readTime: "8 min read"
category: "learning"
tags: ["Learning","React"]
views: "1.1k reads"
likes: 90
author:
  name: "Keerthana Salla"
  role: "CTO @ Maxy · Founder @ FOTHS"
excerpt: "Moving beyond tutorials to master state management and performance through the lens of real-world constraints."
---

# How I Learned React by Building Real Products

Many people spend months watching YouTube tutorials and building simple To-Do lists. While this teaches basic syntax, it does not prepare you to build production-grade applications. I learned React by jumping straight into building real, complex products under real-world constraints.

Here is my roadmap for mastering React through product development.

## Step 1: Ditch the To-Do Apps
To master React, you need to encounter real problems:
- **State management issues**: Pass state down multiple levels to feel the pain of "prop drilling" before using Context or custom hooks.
- **Render performance lags**: Build large grids to see how unnecessary renders slow down the browser.

## Step 2: Write Custom Hooks
Don't copy libraries for everything. Write your own hooks to handle fetching data, WebSockets, and local storage synchronization.

```typescript
// Custom WebSocket hook snippet
import { useEffect, useState } from "react";

export function useWebSocket(url: string) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const ws = new WebSocket(url);
    ws.onmessage = (event) => setMessages((prev) => [...prev, event.data]);
    setSocket(ws);
    return () => ws.close();
  }, [url]);

  return { socket, messages };
}
```

By solving real engineering bottlenecks in my projects, React became an extension of my thinking rather than just another framework.

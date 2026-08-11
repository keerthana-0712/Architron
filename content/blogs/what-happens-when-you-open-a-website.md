---
slug: "what-happens-when-you-open-a-website"
title: "What Happens When You Open a Website?"
date: "Jun 2023"
readTime: "10 min read"
category: "engineering"
tags: ["Networking","Systems"]
views: "1.1k reads"
likes: 78
author:
  name: "Keerthana Salla"
  role: "CTO @ Maxy · Founder @ FOTHS"
excerpt: "From DNS resolution to rendering: A deep dive into the network and browser events that occur in milliseconds."
---

# What Happens When You Open a Website?

When you type `https://google.com` and hit Enter, a complex series of events occurs in milliseconds:

1. **DNS Lookup**: The browser queries DNS servers to translate the domain name into an IP address.
2. **TCP Handshake**: Establishing a secure network connection.
3. **HTTP Request**: The browser requests the page files.
4. **Rendering**: The browser parses HTML, CSS, and JS to paint the layout on your screen.

Optimizing these stages is the key to delivering ultra-fast web applications.

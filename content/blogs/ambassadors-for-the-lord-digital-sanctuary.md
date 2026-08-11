---
slug: "ambassadors-for-the-lord-digital-sanctuary"
title: "Designing Ambassadors for the Lord: Anonymity-First Architecture"
date: "May 2024"
readTime: "9 min read"
category: "client-projects"
tags: ["Security","WebSockets","NestJS"]
views: "1.2k reads"
likes: 95
author:
  name: "Keerthana Salla"
  role: "CTO @ Maxy · Founder @ FOTHS"
excerpt: "How I engineered a secure, zero-friction communication environment for spiritual counseling and community support."
---

# Designing Ambassadors for the Lord: Anonymity-First Architecture

Ambassadors for the Lord is a sacred, anonymous digital sanctuary designed to facilitate spiritual healing, prophetic teaching, and real-time community prayer support.

## Key Architecture Decisions

- **Anonymity-First Request Protocol**: Stripping incoming connection headers (such as IP addresses and User-Agent info) in the NestJS controller layer to enforce privacy.
- **Application-Level Field Encryption**: Implementing AES-256 field encryption in the NestJS application layer to protect spiritual requests prior to storing them in PostgreSQL.
- **Asynchronous Mail Queues**: Offloading Nodemailer SMTP connection handshakes from the main thread using an event-driven worker queue to keep API response latency under 200ms.

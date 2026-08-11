---
slug: "building-clientra-agency-os-from-scratch"
title: "Building Clientra: A Multi-Tenant Agency Operating System"
date: "Jun 2024"
readTime: "11 min read"
category: "client-projects"
tags: ["SaaS","Prisma","NestJS"]
views: "1.6k reads"
likes: 134
author:
  name: "Keerthana Salla"
  role: "CTO @ Maxy · Founder @ FOTHS"
excerpt: "Exploring the SaaS database schema isolation policies, real-time Kanban gateways, and automated billing engines."
---

# Building Clientra: A Multi-Tenant Agency Operating System

Clientra is a robust, multi-tenant SaaS platform built explicitly to run entire tech agencies, studios, and consultancies from a single brain.

## Key Architecture Decisons

- **Single Database Multi-Tenancy**: Establishing secure data boundaries within a shared PostgreSQL database using Prisma query middleware to automatically append `tenantId`.
- **Real-Time Kanban State Syncing**: Leveraging WebSockets via Socket.io to synchronize project card status transitions across multiple user sessions concurrently.
- **Automated Billing Engine**: Integrated payment lifecycles and invoice generation using webhook-driven Razorpay events to minimize manual billing overhead.

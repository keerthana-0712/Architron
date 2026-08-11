import { PrismaClient } from "../generated/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// In development, Next.js dev server preserves global variables across hot-reloads.
// We must recreate the client if it is using an outdated schema cache that lacks 'streakConfig'.
const getDb = () => {
  if (globalThis.prisma && "streakConfig" in globalThis.prisma) {
    return globalThis.prisma;
  }
  return new PrismaClient();
};

export const db = getDb();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

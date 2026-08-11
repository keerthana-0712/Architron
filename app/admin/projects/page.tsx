/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/lib/db";
import ManageProjectsClient from "@/components/ManageProjectsClient";

export const dynamic = "force-dynamic";

export default async function ManageProjectsPage() {
  let projects: any[] = [];
  let dbOffline = false;
  let dbError = "";

  try {
    projects = await db.project.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error: any) {
    console.error("Failed to query projects:", error);
    dbOffline = true;
    dbError = error.message || "Failed to query Neon Database";
  }

  // Formatting Projects to match component specifications
  const formattedProjects = projects.map((p: any) => ({
    ...p,
    metrics: typeof p.metrics === "string" ? JSON.parse(p.metrics) : p.metrics,
    nodes: typeof p.nodes === "string" ? JSON.parse(p.nodes) : p.nodes,
    connections: typeof p.connections === "string" ? JSON.parse(p.connections) : p.connections,
    flows: typeof p.flows === "string" ? JSON.parse(p.flows) : p.flows,
    tradeOffs: typeof p.tradeOffs === "string" ? JSON.parse(p.tradeOffs) : p.tradeOffs,
  }));

  return (
    <div>
      <ManageProjectsClient
        initialProjects={formattedProjects}
        dbOffline={dbOffline}
        dbError={dbError}
      />
    </div>
  );
}

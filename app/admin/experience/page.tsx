import { db } from "@/lib/db";
import ManageExperienceClient from "@/components/ManageExperienceClient";

export const dynamic = "force-dynamic";

export default async function ManageExperiencePage() {
  let experiences: any[] = [];
  let dbOffline = false;
  let dbError = "";

  try {
    experiences = await db.experience.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error: any) {
    console.error("Failed to query experience:", error);
    dbOffline = true;
    dbError = error.message || "Failed to query Neon Database";
  }

  return (
    <div>
      <ManageExperienceClient
        initialExperiences={experiences}
        dbOffline={dbOffline}
        dbError={dbError}
      />
    </div>
  );
}

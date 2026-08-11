import { db } from "@/lib/db";
import ManageStreaksClient from "@/components/ManageStreaksClient";

export const dynamic = "force-dynamic";

export default async function ManageStreaksPage() {
  let streakConfigs: Record<string, any> = {};
  let dbOffline = false;
  let dbError = "";

  try {
    const configs = await db.streakConfig.findMany();
    for (const c of configs) {
      streakConfigs[c.section] = c.data;
    }
  } catch (error: any) {
    console.error("Failed to query streakConfig:", error);
    dbOffline = true;
    dbError = error.message || "Failed to query Neon Database";
  }

  return (
    <div>
      <ManageStreaksClient
        initialConfigs={streakConfigs}
        dbOffline={dbOffline}
        dbError={dbError}
      />
    </div>
  );
}

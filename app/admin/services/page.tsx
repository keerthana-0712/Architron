/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/lib/db";
import ManageServicesClient from "@/components/ManageServicesClient";

export const dynamic = "force-dynamic";

export default async function ManageServicesPage() {
  let services: any[] = [];
  let dbOffline = false;
  let dbError = "";

  try {
    services = await db.service.findMany({
      orderBy: { code: "asc" },
    });
  } catch (error: any) {
    console.error("Failed to query services:", error);
    dbOffline = true;
    dbError = error.message || "Failed to query Neon Database";
  }

  return (
    <div>
      <ManageServicesClient
        initialServices={services}
        dbOffline={dbOffline}
        dbError={dbError}
      />
    </div>
  );
}

import { db } from "@/lib/db";
import ManageSkillsClient from "@/components/ManageSkillsClient";

export const dynamic = "force-dynamic";

export default async function ManageSkillsPage() {
  let categories: any[] = [];
  let dbOffline = false;
  let dbError = "";

  try {
    categories = await db.skillCategory.findMany({
      include: {
        skills: {
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "asc" },
    });
  } catch (error: any) {
    console.error("Failed to query skills:", error);
    dbOffline = true;
    dbError = error.message || "Failed to query Neon Database";
  }

  return (
    <div>
      <ManageSkillsClient
        initialCategories={categories}
        dbOffline={dbOffline}
        dbError={dbError}
      />
    </div>
  );
}

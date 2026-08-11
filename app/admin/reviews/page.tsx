import { db } from "@/lib/db";
import ManageReviewsClient from "@/components/ManageReviewsClient";

export const dynamic = "force-dynamic";

export default async function ManageReviewsPage() {
  let reviews: any[] = [];
  let dbOffline = false;
  let dbError = "";

  try {
    reviews = await db.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error: any) {
    console.error("Failed to query testimonials:", error);
    dbOffline = true;
    dbError = error.message || "Failed to connect to Neon Database";
  }

  // Formatting Dates to match Client interface expectation
  const formattedReviews = reviews.map((r: any) => ({
    ...r,
    createdAt: r.createdAt.toISOString(),
  }));

  const ADMIN_EMAIL = "keerthana.salla.7@gmail.com";

  return (
    <div>
      <ManageReviewsClient
        initialReviews={formattedReviews}
        dbOffline={dbOffline}
        dbError={dbError}
        adminEmail={ADMIN_EMAIL}
      />
    </div>
  );
}

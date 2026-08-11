import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

const ADMIN_EMAIL = "keerthana.salla.7@gmail.com";

async function verifyAdmin() {
  try {
    const user = await currentUser();
    if (!user) return false;
    const email = user.emailAddresses[0]?.emailAddress;
    return email === ADMIN_EMAIL;
  } catch (error) {
    console.error("verifyAdmin auth error:", error);
    return false;
  }
}

// Public: Get all streak config sections
export async function GET() {
  try {
    const configs = await db.streakConfig.findMany({
      orderBy: { section: "asc" },
    });
    // Transform to a keyed object for convenience
    const result: Record<string, any> = {};
    for (const c of configs) {
      result[c.section] = c.data;
    }
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("GET StreakConfig error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Admin only: Upsert a section's data
export async function POST(req: Request) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) return new NextResponse("Unauthorized", { status: 403 });

    const body = await req.json();
    const { section, data } = body;

    if (!section || data === undefined) {
      return NextResponse.json({ error: "section and data are required" }, { status: 400 });
    }

    const config = await db.streakConfig.upsert({
      where: { section },
      update: { data },
      create: { section, data },
    });

    return NextResponse.json({ success: true, config });
  } catch (error: any) {
    console.error("POST StreakConfig error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

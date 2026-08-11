import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { ip, city, region, country, org, userAgent, path, referer } = body;

    if (!path) {
      return NextResponse.json({ error: "Missing path" }, { status: 400 });
    }

    // Capture headers for fallback detection
    const fallbackIp = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || null;
    const fallbackUserAgent = req.headers.get("user-agent") || null;

    // Save visitor log entry in the database
    const log = await db.visitorLog.create({
      data: {
        ip: ip || fallbackIp,
        city: city || null,
        region: region || null,
        country: country || null,
        org: org || null,
        userAgent: userAgent || fallbackUserAgent,
        path,
        referer: referer || null,
      },
    });

    return NextResponse.json({ success: true, id: log.id });
  } catch (error: any) {
    console.error("POST Track error:", error);
    return NextResponse.json({ error: error.message || "Failed to log visit" }, { status: 500 });
  }
}

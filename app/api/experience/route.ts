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

// Public: Fetch all experiences
export async function GET() {
  try {
    const experiences = await db.experience.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(experiences);
  } catch (error: any) {
    console.error("GET Experience error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch experiences" }, { status: 500 });
  }
}

// Admin only: Create an experience
export async function POST(req: Request) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { company, role, period, achievements, type } = await req.json();

    if (!company || !role || !period || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const experience = await db.experience.create({
      data: {
        company,
        role,
        period,
        achievements: achievements || [],
        type,
      },
    });

    return NextResponse.json(experience);
  } catch (error: any) {
    console.error("POST Experience error:", error);
    return NextResponse.json({ error: error.message || "Failed to create experience" }, { status: 500 });
  }
}

// Admin only: Update an experience
export async function PUT(req: Request) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { id, company, role, period, achievements, type } = await req.json();

    if (!id || !company || !role || !period || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const experience = await db.experience.update({
      where: { id },
      data: {
        company,
        role,
        period,
        achievements: achievements || [],
        type,
      },
    });

    return NextResponse.json(experience);
  } catch (error: any) {
    console.error("PUT Experience error:", error);
    return NextResponse.json({ error: error.message || "Failed to update experience" }, { status: 500 });
  }
}

// Admin only: Delete an experience
export async function DELETE(req: Request) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing experience ID" }, { status: 400 });
    }

    await db.experience.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE Experience error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete experience" }, { status: 500 });
  }
}

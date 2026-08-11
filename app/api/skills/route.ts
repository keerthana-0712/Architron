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

// Public: Fetch all skill categories with their nested skills
export async function GET() {
  try {
    const categories = await db.skillCategory.findMany({
      include: {
        skills: {
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(categories);
  } catch (error: any) {
    console.error("GET Skills error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch skills" }, { status: 500 });
  }
}

// Admin only: Create category or skill
export async function POST(req: Request) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const body = await req.json();
    const { action, title, icon, name, categoryId } = body;

    if (action === "category") {
      if (!title || !icon) {
        return NextResponse.json({ error: "Title and icon are required" }, { status: 400 });
      }
      const category = await db.skillCategory.create({
        data: { title, icon },
        include: { skills: true },
      });
      return NextResponse.json(category);
    } else if (action === "skill") {
      if (!name || !categoryId) {
        return NextResponse.json({ error: "Name and categoryId are required" }, { status: 400 });
      }
      const skill = await db.skill.create({
        data: { name, categoryId },
      });
      return NextResponse.json(skill);
    } else {
      return NextResponse.json({ error: "Invalid action type" }, { status: 400 });
    }
  } catch (error: any) {
    console.error("POST Skills error:", error);
    return NextResponse.json({ error: error.message || "Failed to create resource" }, { status: 500 });
  }
}

// Admin only: Update category or skill
export async function PUT(req: Request) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const body = await req.json();
    const { action, id, title, icon, name, categoryId } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    if (action === "category") {
      if (!title || !icon) {
        return NextResponse.json({ error: "Title and icon are required" }, { status: 400 });
      }
      const category = await db.skillCategory.update({
        where: { id },
        data: { title, icon },
        include: { skills: true },
      });
      return NextResponse.json(category);
    } else if (action === "skill") {
      if (!name || !categoryId) {
        return NextResponse.json({ error: "Name and categoryId are required" }, { status: 400 });
      }
      const skill = await db.skill.update({
        where: { id },
        data: { name, categoryId },
      });
      return NextResponse.json(skill);
    } else {
      return NextResponse.json({ error: "Invalid action type" }, { status: 400 });
    }
  } catch (error: any) {
    console.error("PUT Skills error:", error);
    return NextResponse.json({ error: error.message || "Failed to update resource" }, { status: 500 });
  }
}

// Admin only: Delete category or skill
export async function DELETE(req: Request) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // "category" or "skill"
    const id = searchParams.get("id");

    if (!id || !type) {
      return NextResponse.json({ error: "ID and type are required" }, { status: 400 });
    }

    if (type === "category") {
      await db.skillCategory.delete({
        where: { id },
      });
    } else if (type === "skill") {
      await db.skill.delete({
        where: { id },
      });
    } else {
      return NextResponse.json({ error: "Invalid delete type" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE Skills error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete resource" }, { status: 500 });
  }
}

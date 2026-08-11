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

// Public: Fetch all services
export async function GET() {
  try {
    const services = await db.service.findMany({
      orderBy: { code: "asc" },
    });
    return NextResponse.json(services);
  } catch (error: any) {
    console.error("GET Services error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch services" }, { status: 500 });
  }
}

// Admin only: Create a service
export async function POST(req: Request) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { code, title, desc, usedIn, tags, bottomMeta, icon } = await req.json();

    if (!code || !title || !desc) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const service = await db.service.create({
      data: {
        code,
        title,
        desc,
        usedIn: usedIn || "",
        tags: tags || [],
        bottomMeta: bottomMeta || "",
        icon: icon || "Settings",
      },
    });

    return NextResponse.json(service);
  } catch (error: any) {
    console.error("POST Service error:", error);
    return NextResponse.json({ error: error.message || "Failed to create service" }, { status: 500 });
  }
}

// Admin only: Update a service
export async function PUT(req: Request) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { id, code, title, desc, usedIn, tags, bottomMeta, icon } = await req.json();

    if (!id || !code || !title || !desc) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const service = await db.service.update({
      where: { id },
      data: {
        code,
        title,
        desc,
        usedIn: usedIn || "",
        tags: tags || [],
        bottomMeta: bottomMeta || "",
        icon: icon || "Settings",
      },
    });

    return NextResponse.json(service);
  } catch (error: any) {
    console.error("PUT Service error:", error);
    return NextResponse.json({ error: error.message || "Failed to update service" }, { status: 500 });
  }
}

// Admin only: Delete a service
export async function DELETE(req: Request) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing service ID" }, { status: 400 });
    }

    await db.service.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE Service error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete service" }, { status: 500 });
  }
}

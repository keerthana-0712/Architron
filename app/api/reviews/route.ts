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

// Public: Fetch all reviews
export async function GET() {
  try {
    const reviews = await db.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(reviews);
  } catch (error: any) {
    console.error("GET Reviews error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch reviews" }, { status: 500 });
  }
}

// Admin only: Create a review
export async function POST(req: Request) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { name, role, content, rating, avatar, featured } = await req.json();

    if (!name || !role || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const review = await db.testimonial.create({
      data: {
        name,
        role,
        content,
        rating: Number(rating),
        avatar: avatar || null,
        featured: featured ?? true,
      },
    });

    return NextResponse.json(review);
  } catch (error: any) {
    console.error("POST Review error:", error);
    return NextResponse.json({ error: error.message || "Failed to create review" }, { status: 500 });
  }
}

// Admin only: Update a review
export async function PUT(req: Request) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { id, name, role, content, rating, avatar, featured } = await req.json();

    if (!id || !name || !role || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const review = await db.testimonial.update({
      where: { id },
      data: {
        name,
        role,
        content,
        rating: Number(rating),
        avatar: avatar || null,
        featured: featured ?? true,
      },
    });

    return NextResponse.json(review);
  } catch (error: any) {
    console.error("PUT Review error:", error);
    return NextResponse.json({ error: error.message || "Failed to update review" }, { status: 500 });
  }
}

// Admin only: Delete a review
export async function DELETE(req: Request) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing review ID" }, { status: 400 });
    }

    await db.testimonial.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE Review error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete review" }, { status: 500 });
  }
}

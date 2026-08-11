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

// Public: Fetch all projects
export async function GET() {
  try {
    const projects = await db.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(projects);
  } catch (error: any) {
    console.error("GET Projects error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch projects" }, { status: 500 });
  }
}

// Admin only: Create a project
export async function POST(req: Request) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const body = await req.json();
    const {
      title,
      description,
      fullDescription,
      statementOfPurpose,
      thumbnail,
      techStack,
      highlights,
      architectureTitle,
      architectureDesc,
      challenges,
      metrics,
      nodes,
      connections,
      flows,
      tradeOffs,
      schemaSnippet,
      github,
      demo,
      id // Allow custom ID from seed or custom entry, otherwise db creates one
    } = body;

    if (!title || !description || !fullDescription) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const project = await db.project.create({
      data: {
        id: id || undefined,
        title,
        description,
        fullDescription,
        statementOfPurpose: statementOfPurpose || null,
        thumbnail: thumbnail || null,
        techStack: techStack || [],
        highlights: highlights || [],
        architectureTitle,
        architectureDesc,
        challenges: challenges || [],
        metrics: metrics || [],
        nodes: nodes || [],
        connections: connections || [],
        flows: flows || [],
        tradeOffs: tradeOffs || [],
        schemaSnippet: schemaSnippet || null,
        github: github || null,
        demo: demo || null,
      },
    });

    return NextResponse.json(project);
  } catch (error: any) {
    console.error("POST Project error:", error);
    return NextResponse.json({ error: error.message || "Failed to create project" }, { status: 500 });
  }
}

// Admin only: Update a project
export async function PUT(req: Request) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const body = await req.json();
    const {
      id,
      title,
      description,
      fullDescription,
      statementOfPurpose,
      thumbnail,
      techStack,
      highlights,
      architectureTitle,
      architectureDesc,
      challenges,
      metrics,
      nodes,
      connections,
      flows,
      tradeOffs,
      schemaSnippet,
      github,
      demo
    } = body;

    if (!id || !title || !description || !fullDescription) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const project = await db.project.update({
      where: { id },
      data: {
        title,
        description,
        fullDescription,
        statementOfPurpose: statementOfPurpose || null,
        thumbnail: thumbnail || null,
        techStack: techStack || [],
        highlights: highlights || [],
        architectureTitle,
        architectureDesc,
        challenges: challenges || [],
        metrics: metrics || [],
        nodes: nodes || [],
        connections: connections || [],
        flows: flows || [],
        tradeOffs: tradeOffs || [],
        schemaSnippet: schemaSnippet || null,
        github: github || null,
        demo: demo || null,
      },
    });

    return NextResponse.json(project);
  } catch (error: any) {
    console.error("PUT Project error:", error);
    return NextResponse.json({ error: error.message || "Failed to update project" }, { status: 500 });
  }
}

// Admin only: Delete a project
export async function DELETE(req: Request) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing project ID" }, { status: 400 });
    }

    await db.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE Project error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete project" }, { status: 500 });
  }
}

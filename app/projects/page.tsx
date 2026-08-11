import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Projects from "@/components/sections/Projects";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Production Projects | Keerthana Salla",
  description: "Production-grade scalable architectures, SaaS systems, and microservices engineered for high concurrency and zero-downtime.",
};

export default async function ProjectsPage() {
  let projects: any[] = [];
  try {
    projects = await db.project.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.warn("Projects database fetch failed. Falling back to static data.", error);
  }

  const serialize = (data: any) => JSON.parse(JSON.stringify(data));

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-foreground">
      <Navbar />
      <main className="flex flex-col pt-16">
        <Projects isFullPage={true} initialProjects={serialize(projects)} />
      </main>
      <Footer />
    </div>
  );
}

import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Services from "../components/sections/Services";
import LearningJourney from "../components/sections/LearningJourney";
import Skills from "../components/sections/Skills";
// import Streaks from "../components/sections/Streaks";
import Projects from "../components/sections/Projects";
import Experience from "../components/sections/Experience";
import Architecture from "../components/sections/Architecture";
import Documentation from "../components/sections/Documentation";
import Blog from "../components/sections/Blog";
import Testimonials from "../components/sections/Testimonials";
import Contact from "../components/sections/Contact";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  let testimonials: any[] = [];
  let projects: any[] = [];
  let experiences: any[] = [];
  let services: any[] = [];
  let skillCategories: any[] = [];

  try {
    testimonials = await db.testimonial.findMany({
      where: { featured: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.warn("Testimonials database fetch failed. Falling back to static data.", error);
  }

  try {
    projects = await db.project.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.warn("Projects database fetch failed. Falling back to static data.", error);
  }

  try {
    experiences = await db.experience.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.warn("Experiences database fetch failed. Falling back to static data.", error);
  }

  try {
    services = await db.service.findMany({
      orderBy: { code: "asc" },
    });
  } catch (error) {
    console.warn("Services database fetch failed. Falling back to static data.", error);
  }

  try {
    skillCategories = await db.skillCategory.findMany({
      include: {
        skills: {
          orderBy: { createdAt: "asc" }
        }
      },
      orderBy: { createdAt: "asc" },
    });
  } catch (error) {
    console.warn("Skills database fetch failed. Falling back to static data.", error);
  }

  // Helper serialization for Server Components passing data to Client Components
  const serialize = (data: any) => JSON.parse(JSON.stringify(data));

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-foreground">
      <Navbar />

      <main className="flex flex-col pt-16">
        <Hero />
        <About />
        <section id="journey">
          <LearningJourney />
        </section>
        <Skills skillCategories={serialize(skillCategories)} />
        {/* <Streaks />
        <div className="relative h-px w-full">
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div> */}
        <Projects initialProjects={serialize(projects)} />
        <div className="relative h-px w-full"><div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" /></div>
        <Experience initialExperiences={serialize(experiences)} />
        <div className="relative h-px w-full"><div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" /></div>
        <Architecture />
        <div className="relative h-px w-full"><div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" /></div>
        <Documentation />
        <div className="relative h-px w-full"><div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" /></div>
        <Blog />
        <div className="relative h-px w-full"><div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" /></div>
        <Services initialServices={serialize(services)} />
        <div className="relative h-px w-full"><div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" /></div>
        <Testimonials testimonials={serialize(testimonials)} />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}
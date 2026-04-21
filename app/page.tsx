import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import LearningJourney from "../components/sections/LearningJourney";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Experience from "../components/sections/Experience";
import Architecture from "../components/sections/Architecture";
import Documentation from "../components/sections/Documentation";
import Blog from "../components/sections/Blog";
import Contact from "../components/sections/Contact";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-foreground">
      <Navbar />

      <main className="flex flex-col pt-16">
        <Hero />
        <About />
        <section id="journey">
          <LearningJourney />
        </section>
        <Skills />
        <Projects />
        <Experience />
        <Architecture />
        <Documentation />
        <Blog />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}

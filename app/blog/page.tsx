import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Blog from "@/components/sections/Blog";

export const metadata = {
  title: "Engineering Blog | Keerthana Salla",
  description: "Product engineering, system design, and architectural case studies.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-foreground">
      <Navbar />
      <main className="flex flex-col pt-16">
        <Blog isFullPage={true} />
      </main>
      <Footer />
    </div>
  );
}

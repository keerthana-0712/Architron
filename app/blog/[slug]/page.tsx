import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogBySlug, getAllBlogs } from "@/lib/blogs";
import BlogClient from "./BlogClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate Dynamic SEO Metadata for Each Blog Article
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) {
    return {
      title: "Article Not Found | Keerthana Salla",
    };
  }

  return {
    title: `${post.title} | Keerthana Salla`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      authors: ["Keerthana Salla"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    }
  };
}

// Generate Static Paths for Next.js Build Time Optimizations
export async function generateStaticParams() {
  const posts = getAllBlogs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get Related Articles (max 3 from same category, falling back to other categories)
  const allBlogs = getAllBlogs();
  let relatedPosts = allBlogs.filter(
    (b) => b.category === post.category && b.slug !== post.slug
  );
  
  if (relatedPosts.length < 3) {
    const fallbackPosts = allBlogs.filter(
      (b) => b.category !== post.category && b.slug !== post.slug
    );
    relatedPosts = [...relatedPosts, ...fallbackPosts].slice(0, 3);
  } else {
    relatedPosts = relatedPosts.slice(0, 3);
  }

  return <BlogClient post={post} relatedPosts={relatedPosts} />;
}

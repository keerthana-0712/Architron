import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogAuthor {
  name: string;
  role: string;
  avatar?: string;
}

export interface BlogMetadata {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  views: string;
  likes: number;
  author: BlogAuthor;
  excerpt: string;
  coverGradient?: string;
}

export interface BlogPost extends BlogMetadata {
  content: string;
}

const contentDir = path.join(process.cwd(), 'content', 'blogs');

// Predefined cover HSL gradients for high-end styling
const COVER_GRADIENTS = [
  "linear-gradient(135deg, rgba(255, 140, 90, 0.15) 0%, rgba(255, 181, 139, 0.05) 100%)",
  "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.05) 100%)",
  "linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(239, 68, 68, 0.05) 100%)",
  "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.05) 100%)",
  "linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6) 100%)",
];

export function getBlogBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(contentDir, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Assign a deterministic gradient based on slug length
    const gradientIndex = slug.length % COVER_GRADIENTS.length;
    const coverGradient = COVER_GRADIENTS[gradientIndex];

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      readTime: data.readTime || '',
      category: data.category || 'engineering',
      tags: data.tags || [],
      views: data.views || '0 reads',
      likes: data.likes || 0,
      author: {
        name: data.author?.name || 'Keerthana Salla',
        role: data.author?.role || 'CTO @ Maxy · Founder @ FOTHS',
        avatar: data.author?.avatar,
      },
      excerpt: data.excerpt || '',
      coverGradient,
      content,
    } as BlogPost;
  } catch (error) {
    console.error(`Error reading blog by slug: ${slug}`, error);
    return null;
  }
}

export function getAllBlogs(): BlogPost[] {
  try {
    if (!fs.existsSync(contentDir)) return [];
    
    const fileNames = fs.readdirSync(contentDir);
    const posts = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        return getBlogBySlug(slug);
      })
      .filter((post): post is BlogPost => post !== null);

    // Sort posts by date (since date is represented like "May 2024", we parse or sort)
    // For sorting, since dates are formatted like "Month Year", let's map them to Dates
    const months: Record<string, number> = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };

    return posts.sort((a, b) => {
      const [aMonth, aYear] = a.date.split(' ');
      const [bMonth, bYear] = b.date.split(' ');
      
      const aDate = new Date(parseInt(aYear), months[aMonth.substring(0, 3)] || 0);
      const bDate = new Date(parseInt(bYear), months[bMonth.substring(0, 3)] || 0);
      
      return bDate.getTime() - aDate.getTime();
    });
  } catch (error) {
    console.error("Error reading all blogs:", error);
    return [];
  }
}

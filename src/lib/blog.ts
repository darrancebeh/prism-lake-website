import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "src/content/research");

export interface Post {
  slug: string;
  meta: {
    title: string;
    date: string;
    description: string;
    category: string;
    author: string;
    premium?: boolean;
  };
  content: string;
}

export function getPosts() {
  // Ensure directory exists
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);

  const posts = files
    // FILTER: Only process .mdx files (ignores .DS_Store)
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(".mdx", "");
      const markdownWithMeta = fs.readFileSync(
        path.join(contentDirectory, filename),
        "utf-8"
      );
      const { data: meta } = matter(markdownWithMeta);

      return {
        slug,
        meta,
      } as Post;
    });

  // Sort by date (newest first)
  return posts.sort((a, b) => (new Date(a.meta.date) > new Date(b.meta.date) ? -1 : 1));
}

export function getPostBySlug(slug: string) {
  // Safety check
  if (!slug || slug === "undefined") return null;

  try {
    const markdownWithMeta = fs.readFileSync(
      path.join(contentDirectory, `${slug}.mdx`),
      "utf-8"
    );
    const { data: meta, content } = matter(markdownWithMeta);

    return {
      slug,
      meta,
      content,
    } as Post;
  } catch (error) {
    console.error(`Error reading post: ${slug}`, error);
    // Return a dummy error post so the app doesn't crash completely
    return {
      slug,
      meta: { title: "Post Not Found", date: "", description: "", category: "Error", author: "System" },
      content: "The requested article could not be found.",
    } as Post;
  }
}
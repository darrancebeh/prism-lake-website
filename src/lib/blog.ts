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
    premium?: boolean; // For your business model
  };
  content: string;
}

export function getPosts() {
  const files = fs.readdirSync(contentDirectory);

  const posts = files.map((filename) => {
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
}
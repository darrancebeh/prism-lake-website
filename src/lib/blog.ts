// src/lib/blog.ts
import matter from "gray-matter";

// --- CONFIGURATION ---
const REPO_OWNER = process.env.GITHUB_REPO_OWNER;
const REPO_NAME = process.env.GITHUB_REPO_NAME;
const FOLDER_PATH = process.env.GITHUB_CONTENT_PATH || "content/research";
const FLASH_FOLDER_PATH = process.env.GITHUB_FLASH_CONTENT_PATH || "content/flash-updates";
const TOKEN = process.env.GITHUB_VAULT_TOKEN;

// Validation Check
if (!REPO_OWNER || !REPO_NAME || !TOKEN) {
  console.error("❌ MISSING ENV VARIABLES: Please check .env.local for GitHub config.");
}

export interface FlashUpdate {
  id: string;
  meta: {
    headline: string;
    date: string;
    time: string;
    category: string;
    impact: "High" | "Medium" | "Low";
  };
}

export interface Post {
  slug: string;
  meta: {
    title: string;
    date: string;
    description: string;
    categories: string[]; 
    isPinned?: boolean;
    complexity?: "Low" | "Medium" | "High";
    readTime: string; 
    author: string;
    authorRole?: string;
    premium?: boolean;
  };
  content: string;
}

interface GitHubFile {
  name: string;
  path: string;
  type: string;
}

// 1. Helper to fetch raw content from GitHub
async function fetchGithubFile(path: string, cacheTag?: string) {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${cleanPath}`;
  
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/vnd.github.v3.raw", 
    },
    next: { 
      tags: cacheTag ? [cacheTag] : [],
      revalidate: false // Only revalidate via webhook
    },
  });

  if (!res.ok) throw new Error(`Failed to fetch ${cleanPath}: ${res.statusText}`);
  return res.text();
}

// 2. Helper to list files
async function fetchGithubFileList(folderPath: string, cacheTag: string) {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${folderPath}`;
  
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
    next: { 
      tags: [cacheTag],
      revalidate: false // Only revalidate via webhook
    },
  });

  if (!res.ok) {
    console.warn(`⚠️ Could not list files in ${folderPath}. Status: ${res.status}`);
    return [];
  }

  const files: GitHubFile[] = await res.json();
  return files.filter((f) => f.name.endsWith(".mdx") && f.type === "file");
}

// 3. Main function to get all posts
export async function getPosts(): Promise<Post[]> {
  try {
    const files = await fetchGithubFileList(FOLDER_PATH, 'posts');
    
    const posts = await Promise.all(
      files.map(async (file) => {
        const rawContent = await fetchGithubFile(file.path, 'posts');
        const { data: meta } = matter(rawContent);
        
        return {
          slug: file.name.replace(".mdx", ""),
          meta,
        } as Post;
      })
    );

    // Sort: Pinned first, then by date (newest first)
    return posts.sort((a, b) => {
      if (a.meta.isPinned && !b.meta.isPinned) return -1;
      if (!a.meta.isPinned && b.meta.isPinned) return 1;
      return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
    });

  } catch (error) {
    console.error("Vault Access Failed:", error);
    return [];
  }
}

// 4. Get Flash Updates
export async function getFlashUpdates(): Promise<FlashUpdate[]> {
  try {
    const files = await fetchGithubFileList(FLASH_FOLDER_PATH, 'flash-updates');

    const updates = await Promise.all(
      files.map(async (file) => {
        const rawContent = await fetchGithubFile(file.path, 'flash-updates');
        const { data: meta } = matter(rawContent);
        
        return {
          id: file.name,
          meta,
        } as FlashUpdate;
      })
    );

    // Sort by date + time (newest first)
    return updates.sort((a, b) => {
      const dateA = new Date(`${a.meta.date}T${a.meta.time}`);
      const dateB = new Date(`${b.meta.date}T${b.meta.time}`);
      return dateB.getTime() - dateA.getTime();
    });

  } catch (error) {
    console.error("Flash Feed Offline:", error);
    return [];
  }
}

// 5. Get Single Post
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const filePath = `${FOLDER_PATH}/${slug}.mdx`;
    const rawContent = await fetchGithubFile(filePath, 'posts');
    const { data: meta, content } = matter(rawContent);

    return {
      slug,
      meta,
      content,
    } as Post;
  } catch (error) {
    console.error(`Post not found: ${slug}`, error);
    return null;
  }
}
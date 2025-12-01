import matter from "gray-matter";

// --- CONFIGURATION ---
const REPO_OWNER = process.env.GITHUB_REPO_OWNER;
const REPO_NAME = process.env.GITHUB_REPO_NAME;
const FOLDER_PATH = process.env.GITHUB_CONTENT_PATH || "content/research";
const FLASH_FOLDER_PATH = process.env.GITHUB_FLASH_CONTENT_PATH || "content/flash-updates";
const TOKEN = process.env.GITHUB_VAULT_TOKEN;

// Validation Check
if (!REPO_OWNER || !REPO_NAME || !TOKEN) {
  // In production, you might want to just log a warning instead of crashing
  console.error("❌ MISSING ENV VARIABLES: Please check .env.local for GitHub config.");
}

export interface FlashUpdate {
  id: string; // filename
  meta: {
    headline: string;
    date: string; // YYYY-MM-DD
    time: string; // HH:MM (24h)
    category: string; // e.g. MACRO, EARNINGS
    impact: "High" | "Medium" | "Low"; // For visual urgency
  };
}

// Interfaces
export interface Post {
  slug: string;
  meta: {
    title: string;
    date: string;
    description: string;
    
    // Taxonomy
    categories: string[]; 
    isPinned?: boolean; // NEW: Forces post to top
    complexity?: "Low" | "Medium" | "High"; // NEW: For visual indicators
    readTime: string; 
    
    // Authorship
    author: string;
    authorRole?: string; // NEW: Allow override (e.g. "Senior Analyst")
    
    // Access
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
async function fetchGithubFile(path: string) {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${cleanPath}`;
  
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/vnd.github.v3.raw", 
    },
    next: { revalidate: 60 }, // Cache for 1 hour
  });

  if (!res.ok) throw new Error(`Failed to fetch ${cleanPath}: ${res.statusText}`);
  return res.text();
}

// 2. Helper to list files
async function fetchGithubFileList() {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FOLDER_PATH}`;
  
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
    next: { revalidate: 60 }, 
  });

  if (!res.ok) {
    console.warn(`⚠️ Could not list files in ${FOLDER_PATH}. Status: ${res.status}`);
    return [];
  }

  const files: GitHubFile[] = await res.json();
  return files.filter((f) => f.name.endsWith(".mdx") && f.type === "file");
}

// 3. Main function to get all posts (With Sorting Logic)
export async function getPosts(): Promise<Post[]> {
  try {
    const files = await fetchGithubFileList();
    
    const posts = await Promise.all(
      files.map(async (file) => {
        const rawContent = await fetchGithubFile(file.path);
        const { data: meta } = matter(rawContent);
        
        return {
          slug: file.name.replace(".mdx", ""),
          meta,
        } as Post;
      })
    );

    // SORTING LOGIC:
    // 1. Pinned posts first
    // 2. Then by Date (Newest first)
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

// --- NEW FUNCTION: GET FLASH UPDATES ---
export async function getFlashUpdates(): Promise<FlashUpdate[]> {
  try {
    // Reuse the existing helper but point to the new folder
    // We need to manually construct the url inside fetchGithubFileList to accept a custom path arg
    // OR we just duplicate the fetch logic slightly for safety/clarity here:
    
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FLASH_FOLDER_PATH}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      next: { revalidate: 30 }, // Faster revalidation (30s) for live news
    });

    if (!res.ok) return []; // Fail silently if folder doesn't exist yet

    const files: GitHubFile[] = await res.json();
    const validFiles = files.filter((f) => f.name.endsWith(".mdx") && f.type === "file");

    const updates = await Promise.all(
      validFiles.map(async (file) => {
        const rawContent = await fetchGithubFile(file.path);
        const { data: meta } = matter(rawContent);
        
        return {
          id: file.name,
          meta,
        } as FlashUpdate;
      })
    );

    // Sort by Date AND Time (Newest first)
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

// 4. Get Single Post
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const filePath = `${FOLDER_PATH}/${slug}.mdx`;
    const rawContent = await fetchGithubFile(filePath);
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
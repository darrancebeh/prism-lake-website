import matter from "gray-matter";

// --- CONFIGURATION ---
const REPO_OWNER = process.env.GITHUB_REPO_OWNER;
const REPO_NAME = process.env.GITHUB_REPO_NAME;
const FOLDER_PATH = process.env.GITHUB_CONTENT_PATH || "content/research";
const TOKEN = process.env.GITHUB_VAULT_TOKEN;

// Validation Check
if (!REPO_OWNER || !REPO_NAME || !TOKEN) {
  throw new Error("❌ MISSING ENV VARIABLES: Please check .env.local for GitHub config.");
}

// Interfaces
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

interface GitHubFile {
  name: string;
  path: string;
  type: string;
}

// 1. Helper to fetch raw content from GitHub
async function fetchGithubFile(path: string) {
  // Ensure we don't double slash the URL if path starts with /
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${cleanPath}`;
  
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`, // Use the constant
      Accept: "application/vnd.github.v3.raw", // Request raw content
    },
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!res.ok) throw new Error(`Failed to fetch ${cleanPath}: ${res.statusText}`);
  return res.text();
}

// 2. Helper to list files in the directory
async function fetchGithubFileList() {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FOLDER_PATH}`;
  
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/vnd.github.v3+json", // Request JSON list
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

// 3. Main function to get all posts
export async function getPosts(): Promise<Post[]> {
  try {
    const files = await fetchGithubFileList();
    
    // Fetch content in parallel
    const posts = await Promise.all(
      files.map(async (file) => {
        // Use file.path directly as it contains the full path (e.g. content/research/post.mdx)
        const rawContent = await fetchGithubFile(file.path);
        const { data: meta } = matter(rawContent);
        
        return {
          slug: file.name.replace(".mdx", ""),
          meta,
        } as Post;
      })
    );

    // Sort by Date (Newest First)
    return posts.sort((a, b) => (new Date(a.meta.date) > new Date(b.meta.date) ? -1 : 1));
  } catch (error) {
    console.error("Vault Access Failed:", error);
    return [];
  }
}

// 4. Get Single Post
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    // Construct the specific file path
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
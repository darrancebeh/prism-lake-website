import Parser from "rss-parser";

// Initialize the parser
const parser = new Parser();

// Replace with your actual Substack URL
const SUBSTACK_URL = "https://prismlake.substack.com/feed"; 

export interface Article {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  categories?: string[];
}

export async function getLatestArticles() {
  try {
    const feed = await parser.parseURL(SUBSTACK_URL);
    
    // Return the top 3 articles only
    return feed.items.slice(0, 3).map((item) => ({
      title: item.title || "Untitled Analysis",
      link: item.link || "#",
      // Format the date to be cleaner (e.g., "Nov 28, 2025")
      pubDate: item.pubDate 
        ? new Date(item.pubDate).toLocaleDateString("en-US", {
            month: "short", day: "numeric", year: "numeric"
          })
        : "",
      // Substack summaries can be long, so we truncate
      contentSnippet: item.contentSnippet?.substring(0, 150) + "..." || "",
      categories: item.categories || ["Market Structure"],
    }));
  } catch (error) {
    console.error("Failed to fetch Substack feed:", error);
    // Return empty array so the site doesn't crash
    return [];
  }
}
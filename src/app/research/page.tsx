import { getPosts } from "@/lib/blog";
import Link from "next/link";
import { Lock } from "lucide-react";

export default function ResearchPage() {
  const posts = getPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold mb-8">Research Library</h1>
      
      <div className="grid gap-6">
        {posts.map((post) => (
          <Link 
            key={post.slug} 
            href={`/research/${post.slug}`}
            className="glass-panel p-6 rounded-xl hover:border-[#1b17ff] transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-[#1b17ff] uppercase">
                {post.meta.category}
              </span>
              {post.meta.premium && <Lock size={14} className="text-gray-500" />}
            </div>
            <h2 className="text-2xl font-bold mb-2 group-hover:text-[#1b17ff] transition-colors">
              {post.meta.title}
            </h2>
            <p className="text-gray-400 text-sm mb-4">{post.meta.description}</p>
            <div className="flex gap-4 text-xs text-gray-500 font-mono">
              <span>{post.meta.author}</span>
              <span>•</span>
              <span>{post.meta.date}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
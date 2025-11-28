import Link from "next/link";
import { getPosts } from "@/lib/blog";
import { ArrowRight, Lock } from "lucide-react";

export default function ResearchPage() {
  const posts = getPosts();

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 max-w-7xl mx-auto">
      <div className="mb-16">
        <h1 className="text-5xl font-bold mb-4">Prism <span className="text-[#1b17ff]">Intelligence</span>.</h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          Institutional-grade Market Analysis & Education, in Real Time.
          <br/>Written by the Prism Lake Research Team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link 
            href={`/research/${post.slug}`} 
            key={post.slug}
            className="group glass-panel p-8 rounded-2xl hover:border-[#1b17ff] transition-all duration-300 relative overflow-hidden flex flex-col h-full"
          >
            {/* Top Meta */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-[#1b17ff] text-xs font-mono border border-[#1b17ff]/30 px-2 py-1 rounded">
                {post.meta.category.toUpperCase()}
              </span>
              <span className="text-gray-500 text-xs font-mono">{post.meta.date}</span>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#1b17ff] transition-colors">
              {post.meta.title}
            </h2>

            <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
              {post.meta.description}
            </p>

            {/* Footer / Premium Indicator */}
            <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
              <span className="text-xs text-gray-500 font-mono">By {post.meta.author}</span>
              
              {post.meta.premium ? (
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                   <Lock size={12} /> PREMIUM
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm font-bold text-[#1b17ff]">
                  READ <ArrowRight size={14} />
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
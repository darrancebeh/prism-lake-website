"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutGrid, Lock, ArrowRight, Clock, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Re-defining the Post type for props (or import from @/lib/blog if exported)
type Post = {
  slug: string;
  meta: {
    title: string;
    description: string;
    date: string;
    categories: string[];
    readTime: string;
    complexity?: string;
    premium?: boolean;
  };
};

export function ArchiveGrid({ posts }: { posts: Post[] }) {
  const [activeFilter, setActiveFilter] = useState("ALL");

  // 1. Automatically extract all unique categories from the posts
  const allCategories = ["ALL", ...Array.from(new Set(posts.flatMap(p => p.meta.categories || [])))];

  // 2. Filter Logic
  const filteredPosts = activeFilter === "ALL" 
    ? posts 
    : posts.filter(p => p.meta.categories?.includes(activeFilter));

  return (
    <div className="mt-24">
      
      {/* --- FILTER BAR --- */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 px-2 border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-2">
          <LayoutGrid size={16} className="text-[#1b17ff]" />
          <h3 className="text-sm font-mono text-white uppercase tracking-widest">
            Historical Archive
          </h3>
          <span className="text-xs text-gray-500 font-mono">({filteredPosts.length})</span>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
          <Filter size={12} className="text-gray-600 shrink-0" />
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`
                px-3 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wide transition-all border whitespace-nowrap
                ${activeFilter === cat 
                  ? 'bg-[#1b17ff] text-white border-[#1b17ff] shadow-[0_0_15px_rgba(27,23,255,0.4)]' 
                  : 'bg-transparent text-gray-500 border-white/10 hover:text-white hover:border-white/30'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- THE GRID --- */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredPosts.map((post) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              key={post.slug}
            >
              <Link 
                href={`/research/${post.slug}`}
                className="group glass-panel p-6 rounded-2xl hover:border-[#1b17ff] transition-all duration-300 relative overflow-hidden flex flex-col h-full hover:-translate-y-1 block"
              >
                <div className="mb-4 flex justify-between items-start">
                  <div className="flex flex-wrap gap-2">
                    {post.meta.categories?.slice(0, 2).map((cat) => (
                      <span key={cat} className="text-[#1b17ff] text-[10px] font-bold font-mono py-1 px-2 rounded border border-[#1b17ff]/20 bg-[#1b17ff]/5 uppercase tracking-wide">
                        {cat}
                      </span>
                    ))}
                  </div>
                  
                  {/* Complexity Visual */}
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex gap-0.5">
                      <div className={`w-1 h-3 rounded-sm bg-[#22d3ee]`} />
                      <div className={`w-1 h-3 rounded-sm ${post.meta.complexity === 'Medium' || post.meta.complexity === 'High' ? 'bg-[#1b17ff]' : 'bg-white/10'}`} />
                      <div className={`w-1 h-3 rounded-sm ${post.meta.complexity === 'High' ? 'bg-[#4f46e5]' : 'bg-white/10'}`} />
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#1b17ff] transition-colors line-clamp-2">
                  {post.meta.title}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed mb-6 flex-grow line-clamp-3">
                  {post.meta.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                  <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1.5">
                    <Clock size={10} /> {post.meta.readTime}
                  </span>
                  
                  <div className="flex items-center gap-3">
                    {post.meta.premium && <Lock size={12} className="text-amber-400" />}
                    <span className="text-[10px] font-bold text-[#1b17ff] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      ACCESS <ArrowRight size={10} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="py-20 text-center text-gray-500 font-mono text-sm">
          No archives found for filter: &quot;{activeFilter}&quot;
        </div>
      )}
    </div>
  );
}
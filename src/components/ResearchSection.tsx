import Link from "next/link";
import { getPosts } from "@/lib/blog"; // Direct import from your library
import { ArrowRight, Lock, BookOpen, Clock } from "lucide-react";

export async function ResearchSection() {
  // 1. Fetch Data on the Server (Instant Load, Good SEO)
  // We handle the empty array fallback inside getPosts(), so this is safe.
  const allPosts = await getPosts(); 
  const posts = allPosts.slice(0, 3); // Take the latest 3

  return (
    <section className="py-32 relative max-w-7xl mx-auto px-4 z-10" id="research">
      
      {/* Background Ambient Glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#1b17ff] opacity-5 blur-[100px] rounded-full pointer-events-none" />

      {/* 1. Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-[#1b17ff]/10 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1b17ff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1b17ff]"></span>
            </span>
            <span className="text-xs font-mono text-[#1b17ff] tracking-widest uppercase">Prism Intelligence</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold font-sans text-white">
            Market <span className="text-[#1b17ff]">Alpha.</span>
          </h2>
          
          <p className="mt-4 text-gray-400 max-w-xl text-lg font-light leading-relaxed">
            <span className="text-md font-mono text-[#1b17ff] tracking-wide uppercase">Prism Intelligence </span>
            is our proprietary research arm. We publish <strong>institutional-level coverage</strong> on real-time market dynamics, news, catalysts, and quantitative deep-dives.
          </p>
        </div>
        
        <Link 
          href="/research" 
          className="group flex items-center gap-3 px-6 py-3 rounded-lg border border-[#1b17ff]/30 hover:bg-[#1b17ff] hover:text-white transition-all duration-300"
        >
          <span className="text-sm font-mono font-bold">VIEW ALL ARCHIVES</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 2. The Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <Link 
              key={post.slug} 
              href={`/research/${post.slug}`}
              className="group glass-panel p-8 rounded-2xl hover:border-[#1b17ff] hover:shadow-[0_0_30px_rgba(27,23,255,0.1)] transition-all duration-300 relative overflow-hidden flex flex-col h-full hover:-translate-y-1"
            >
              {/* "Latest Release" Badge (Only on first card) */}
              {index === 0 && (
                <div className="absolute top-0 right-0 bg-[#1b17ff] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg z-20 font-mono tracking-wider">
                  LATEST SIGNAL
                </div>
              )}

              {/* Meta Tags */}
              <div className="mb-6 flex justify-between items-center z-10">
                <div className="bg-[#1b17ff]/10 text-[#1b17ff] text-[10px] font-bold font-mono py-1.5 px-3 rounded-full border border-[#1b17ff]/20 uppercase tracking-wide">
                  {post.meta.category}
                </div>
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Clock size={12} />
                  <span className="text-xs font-mono">{post.meta.date}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-[#1b17ff] transition-colors leading-tight line-clamp-2 z-10">
                {post.meta.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-400 leading-relaxed mb-8 flex-grow line-clamp-3 z-10 font-light border-l-2 border-white/5 pl-4">
                {post.meta.description}
              </p>

              {/* Footer / Premium Indicator */}
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5 z-10">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#1b17ff] to-cyan-400 opacity-80" />
                  <span className="text-xs text-gray-400 font-mono font-medium">{post.meta.author}</span>
                </div>
                
                {post.meta.premium ? (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded border border-amber-400/20 font-mono">
                     <Lock size={10} /> PARTNER
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1b17ff] group-hover:underline decoration-1 underline-offset-4 font-mono">
                    READ ANALYSIS <ArrowRight size={12} />
                  </div>
                )}
              </div>

              {/* Hover Gradient Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#1b17ff]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </Link>
          ))
        ) : (
          // Empty State (No Articles Found)
          <div className="col-span-1 md:col-span-3 text-center py-24 glass-panel rounded-2xl border-dashed border-white/10 bg-[#0a1128]/50">
            <div className="bg-[#1b17ff]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#1b17ff]/20">
              <BookOpen className="h-8 w-8 text-[#1b17ff]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-mono">No Signals Detected</h3>
            <p className="text-sm text-gray-500 font-mono">
              Research pipeline is initializing. Check back soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
import Link from "next/link";
import { getPosts } from "@/lib/blog";
import { ArrowRight, Lock, Clock, BookOpen } from "lucide-react";

export const metadata = {
  title: "Prism Intelligence | Research Archive",
  description: "Institutional-grade analysis on Market Structure, Volatility, and Algo-flows.",
};

// FIX 1: Make the component 'async'
export default async function ResearchPage() {
  // FIX 2: 'await' the data fetch
  const posts = await getPosts();

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="mb-16 border-b border-[#1b17ff]/10 pb-8">
        <h1 className="text-5xl md:text-6xl font-mono tracking-widest font-bold mb-6 text-white">
          PRISM <span className="text-[#1b17ff]">INTELLIGENCE</span>.
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          Institutional-grade Market Analysis & Education, in Real Time. <br/>Brought to you by the Prism Lake Research Team.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/research/${post.slug}`}
              className="group glass-panel p-8 rounded-2xl hover:border-[#1b17ff] transition-all duration-300 relative overflow-hidden flex flex-col h-full hover:-translate-y-1"
            >
              {/* Meta */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-[#1b17ff] text-[10px] font-bold font-mono py-1 px-3 rounded-full border border-[#1b17ff]/20 bg-[#1b17ff]/5 uppercase tracking-wide">
                  {post.meta.category}
                </span>
                <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                  <Clock size={12} />
                  {post.meta.date}
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#1b17ff] transition-colors line-clamp-2 leading-tight">
                {post.meta.title}
              </h2>

              <p className="text-sm text-gray-400 leading-relaxed mb-8 flex-grow line-clamp-3">
                {post.meta.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                <span className="text-xs text-gray-500 font-mono">By {post.meta.author}</span>
                
                {post.meta.premium ? (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded border border-amber-400/20">
                     <Lock size={10} /> PARTNER
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1b17ff] group-hover:underline decoration-1 underline-offset-4">
                    READ <ArrowRight size={12} />
                  </div>
                )}
              </div>
            </Link>
          ))
        ) : (
           // Empty State
           <div className="col-span-full py-20 text-center glass-panel rounded-3xl border-dashed border-gray-800">
             <BookOpen className="mx-auto h-12 w-12 text-gray-700 mb-4" />
             <h3 className="text-xl font-bold text-white">No Intelligence Found</h3>
             <p className="text-gray-500 mt-2 font-mono text-sm">The archives are currently empty.</p>
           </div>
        )}
      </div>
    </div>
  );
}
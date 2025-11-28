import { getLatestArticles } from "@/lib/substack";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";

export async function ResearchSection() {
  const articles = await getLatestArticles();

  return (
    <section className="py-24 relative max-w-7xl mx-auto px-4" id="research">
      
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-3xl font-bold font-sans mb-4">
            Institutional <span className="text-[#1b17ff]">Intelligence</span>.
          </h2>
          <div className="h-1 w-20 bg-[#1b17ff]" />
          <p className="mt-4 text-gray-400 max-w-xl">
            We don't sell signals. We sell logic. Read our latest deep-dives on 
            US Market Structure, Volatility Flows, and Macro-Quant setups.
          </p>
        </div>
        
        <Link 
          href="https://prismlake.substack.com" 
          target="_blank"
          className="group flex items-center gap-2 text-sm font-mono text-[#1b17ff] hover:text-white transition-colors"
        >
          VIEW ARCHIVE <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>
      </div>

      {/* 2. The Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.length > 0 ? (
          articles.map((article, idx) => (
            <Link 
              key={idx} 
              href={article.link} 
              target="_blank"
              className="group glass-panel p-8 rounded-2xl hover:border-[#1b17ff] transition-all duration-300 relative overflow-hidden flex flex-col h-full"
            >
              {/* Top Tag */}
              <div className="mb-6 flex justify-between items-start">
                <div className="bg-[#1b17ff]/10 text-[#1b17ff] text-xs font-mono py-1 px-3 rounded-full border border-[#1b17ff]/20">
                  {article.categories?.[0] || "RESEARCH"}
                </div>
                <span className="text-xs text-gray-500 font-mono">{article.pubDate}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#1b17ff] transition-colors line-clamp-2">
                {article.title}
              </h3>

              {/* Snippet */}
              <p className="text-sm text-gray-400 leading-relaxed mb-8 flex-grow">
                {article.contentSnippet}
              </p>

              {/* Read More Link */}
              <div className="flex items-center gap-2 text-sm font-bold text-white mt-auto">
                READ ANALYSIS <ArrowUpRight size={14} className="text-[#1b17ff]" />
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b17ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </Link>
          ))
        ) : (
          // Fallback if no articles found (or feed is empty)
          <div className="col-span-3 text-center py-12 glass-panel rounded-xl border-dashed border-gray-700">
            <BookOpen className="mx-auto h-12 w-12 text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-400">Loading Intelligence...</h3>
            <p className="text-sm text-gray-600">Checking the wire for latest reports.</p>
          </div>
        )}
      </div>
    </section>
  );
}
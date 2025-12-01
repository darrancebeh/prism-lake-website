import Link from "next/link";
import Image from "next/image";
import { getPosts } from "@/lib/blog"; 
import { 
  ArrowRight, 
  Lock, 
  Clock, 
  Hash, 
  LayoutGrid, 
  Calendar, 
  Globe, 
  Zap, 
  Cpu, 
  Search, 
  Terminal, 
  BookOpen, 
  Pin 
} from "lucide-react";

export const metadata = {
  title: "Prism Intelligence | The Wire",
  description: "Real-time market microstructure analysis and volatility research.",
};

export default async function ResearchPage() {
  const allPosts = await getPosts();
  
  // Segmentation Strategy
  // 1. Featured: The first post (usually Pinned or Newest)
  const featuredPost = allPosts[0]; 
  // 2. The Wire: The next 3 posts for the sidebar
  const theWire = allPosts.slice(1, 4); 
  // 3. Archive: Everything else
  const archive = allPosts.slice(4); 

  return (
    <div className="min-h-screen bg-[#020410] pt-32 pb-20 px-4 md:px-6 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#1b17ff]/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">

        {/* --- 1. THE TERMINAL HEADER --- */}
        <header className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-white/10 pb-6">
          <div className="w-full md:w-auto">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
              <span className="text-[10px] font-mono text-green-500 tracking-widest uppercase">Live Feed</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-sans text-white tracking-tight">
              THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1b17ff] to-cyan-400">WIRE</span>.
            </h1>
          </div>
          
          <div className="flex flex-col items-end gap-4 mt-6 md:mt-0 w-full md:w-auto">
            
            {/* COVERAGE HUD */}
            <div className="flex flex-wrap justify-end gap-2">
              <CoverageBadge icon={<Globe size={10} />} label="US MARKETS" />
              <CoverageBadge icon={<Zap size={10} />} label="VOLATILITY" />
              <CoverageBadge icon={<Cpu size={10} />} label="QUANT" />
            </div>

            {/* TERMINAL SEARCH BAR */}
            <div className="relative group w-full md:w-64">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500 font-mono">
                <Terminal size={14} />
                <span className="ml-2 text-[#1b17ff]">{`>`}</span>
              </div>
              <input 
                type="text" 
                placeholder="search_query..." 
                className="w-full bg-[#0a1128]/50 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-[#1b17ff]/50 focus:bg-[#0a1128] transition-all"
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <Search size={14} className="text-gray-600 group-focus-within:text-[#1b17ff] transition-colors" />
              </div>
            </div>

          </div>
        </header>

        {/* --- 2. TRENDING MARQUEE --- */}
        <div className="mb-12 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#020410] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#020410] to-transparent z-10" />
          
          <div className="flex gap-8 text-[10px] font-mono text-gray-500 uppercase tracking-widest animate-marquee whitespace-nowrap">
             {[1,2,3,4].map(i => (
                <div key={i} className="flex gap-8">
                  <span className="flex items-center gap-2 text-[#1b17ff]">#VOLATILITY_SKEW</span>
                  <span className="flex items-center gap-2">#0DTE_FLOWS</span>
                  <span className="flex items-center gap-2 text-green-400">#NVIDIA_EARNINGS</span>
                  <span className="flex items-center gap-2">#MACRO_RATES</span>
                  <span className="flex items-center gap-2 text-orange-400">#CPI_DATA</span>
                </div>
             ))}
          </div>
        </div>


        {/* --- 3. THE "ABOVE THE FOLD" BENTO --- */}
        {featuredPost ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-24">
            
            {/* LEFT: FEATURED STORY */}
            <div className="lg:col-span-8 group relative">
              <Link href={`/research/${featuredPost.slug}`} className="block h-full">
                <div className="h-full glass-panel p-8 md:p-12 rounded-3xl border border-[#1b17ff]/30 bg-gradient-to-br from-[#0a1128] to-[#020410] relative overflow-hidden hover:shadow-[0_0_50px_rgba(27,23,255,0.15)] transition-all duration-500 group-hover:-translate-y-1">
                  
                  {/* Background Glow */}
                  <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#1b17ff] opacity-10 blur-[100px] group-hover:opacity-20 transition-opacity" />
                  
                  <div className="relative z-10 flex flex-col h-full justify-between min-h-[420px]">
                    <div>
                      {/* Meta Row */}
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        
                        {/* Pinned Badge */}
                        {featuredPost.meta.isPinned && (
                          <span className="px-3 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-bold font-mono rounded-full tracking-wide flex items-center gap-1 shadow-glow-amber">
                            <Pin size={10} fill="currentColor" /> PINNED
                          </span>
                        )}

                        <span className="px-3 py-1 bg-[#1b17ff] text-white text-[10px] font-bold font-mono rounded-full tracking-wide shadow-glow">
                          FEATURED
                        </span>
                        
                        {/* Categories */}
                        {featuredPost.meta.categories?.map((cat) => (
                          <span key={cat} className="text-[10px] font-mono text-[#1b17ff] uppercase bg-[#1b17ff]/10 px-2 py-0.5 rounded border border-[#1b17ff]/20">
                            {cat}
                          </span>
                        ))}

                        <div className="h-4 w-[1px] bg-white/20 hidden sm:block" />
                        
                        <span className="text-xs text-gray-400 font-mono flex items-center gap-1.5">
                          <Clock size={12} /> {featuredPost.meta.readTime}
                        </span>
                      </div>
                      
                      <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-[1.1] group-hover:text-[#1b17ff] transition-colors">
                        {featuredPost.meta.title}
                      </h2>
                      
                      <p className="text-lg text-gray-400 font-light leading-relaxed max-w-2xl line-clamp-3">
                        {featuredPost.meta.description}
                      </p>
                    </div>

                    {/* Author & CTA */}
                    <div className="flex items-center justify-between mt-8 pt-8 border-t border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 p-[1px] bg-gradient-to-tr from-[#1b17ff] to-cyan-500">
                           <div className="w-full h-full rounded-full overflow-hidden relative">
                             {/* Fallback image if none provided */}
                             <Image 
                               src="/images/darrancebeh2.jpg" 
                               alt="Author" 
                               fill 
                               className="object-cover" 
                             />
                           </div>
                        </div>
                        <div className="text-xs">
                          <div className="text-white font-bold tracking-wide">{featuredPost.meta.author}</div>
                          <div className="text-[#1b17ff] font-mono text-[10px] uppercase">
                            {featuredPost.meta.authorRole || "GP & Chief Researcher"}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 group-hover:bg-[#1b17ff] group-hover:border-[#1b17ff] transition-all">
                        <span className="text-xs font-bold text-white tracking-wide">READ REPORT</span>
                        <ArrowRight size={14} className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* RIGHT: THE "WIRE" (Sidebar) */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="flex items-center justify-between px-2 mb-2">
                <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Hash size={12} className="text-[#1b17ff]" /> Flash Updates
                </h3>
              </div>
              
              {theWire.map((post) => (
                <Link key={post.slug} href={`/research/${post.slug}`} className="group block">
                  <div className="glass-panel p-5 rounded-xl border border-white/5 hover:border-[#1b17ff]/50 hover:bg-[#1b17ff]/5 transition-all relative overflow-hidden">
                    <div className="absolute left-0 top-0 w-[2px] h-full bg-[#1b17ff] opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[9px] font-mono text-[#1b17ff] uppercase bg-[#1b17ff]/10 px-2 py-0.5 rounded border border-[#1b17ff]/20">
                        {post.meta.categories?.[0] || 'GENERAL'}
                      </span>
                      <span className="text-[10px] text-gray-600 font-mono">{post.meta.date}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white leading-snug mb-1 group-hover:text-[#1b17ff] transition-colors line-clamp-2">
                      {post.meta.title}
                    </h4>
                  </div>
                </Link>
              ))}
              
              {/* Subscribe Box */}
              <div className="mt-auto glass-panel p-6 rounded-xl bg-gradient-to-br from-[#1b17ff]/20 to-[#0a1128] border border-[#1b17ff]/30 text-center relative overflow-hidden group">
                <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <Zap size={120} />
                </div>
                <h4 className="text-white font-bold text-lg mb-1 relative z-10">Inner Circle Access.</h4>
                <p className="text-gray-400 text-xs mb-4 relative z-10 font-light">Get the weekly institutional memo delivered to your terminal.</p>
                <button className="w-full py-3 bg-[#1b17ff] text-white font-bold text-xs rounded-lg shadow-lg hover:bg-[#1b17ff]/90 transition-all relative z-10 tracking-widest border border-white/10">
                  INITIALIZE SUBSCRIPTION
                </button>
              </div>
            </div>

          </div>
        ) : (
          // Empty State
          <div className="py-20 text-center glass-panel rounded-3xl border-dashed border-gray-800 mb-20">
             <BookOpen className="mx-auto h-12 w-12 text-gray-700 mb-4" />
             <h3 className="text-xl font-bold text-white">No Signals Detected</h3>
             <p className="text-gray-500 mt-2 font-mono text-sm">Initialize the pipeline to generate signals.</p>
          </div>
        )}


        {/* --- 3. THE ARCHIVE (Filterable Grid) --- */}
        <div className="mt-24">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 px-2 border-b border-white/10 pb-4 gap-4">
            <div className="flex items-center gap-2">
              <LayoutGrid size={16} className="text-[#1b17ff]" />
              <h3 className="text-sm font-mono text-white uppercase tracking-widest">
                Historical Archive
              </h3>
            </div>
            {/* Visual Filters */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar max-w-full">
              <FilterPill label="ALL" active />
              <FilterPill label="MACRO" />
              <FilterPill label="VOLATILITY" />
              <FilterPill label="CRYPTO" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {archive.map((post) => (
              <Link 
                key={post.slug} 
                href={`/research/${post.slug}`}
                className="group glass-panel p-6 rounded-2xl hover:border-[#1b17ff] transition-all duration-300 relative overflow-hidden flex flex-col h-full hover:-translate-y-1"
              >
                <div className="mb-4 flex justify-between items-start">
                  <div className="flex flex-wrap gap-2">
                    {post.meta.categories?.slice(0, 2).map((cat) => (
                      <span key={cat} className="text-[#1b17ff] text-[10px] font-bold font-mono py-1 px-2 rounded border border-[#1b17ff]/20 bg-[#1b17ff]/5 uppercase tracking-wide">
                        {cat}
                      </span>
                    ))}
                  </div>
                  
                  {/* Visual Complexity Indicator */}
                  <ComplexityBars level={post.meta.complexity || "Medium"} />
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
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// --- UI HELPERS ---

function CoverageBadge({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1 bg-[#0a1128] border border-white/10 rounded-full text-[10px] font-bold text-gray-400 font-mono hover:text-white hover:border-[#1b17ff] transition-colors cursor-default">
      <span className="text-[#1b17ff]">{icon}</span>
      {label}
    </div>
  );
}

function FilterPill({ label, active }: { label: string, active?: boolean }) {
  return (
    <button className={`
      px-3 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wide transition-all border
      ${active 
        ? 'bg-[#1b17ff] text-white border-[#1b17ff] shadow-glow' 
        : 'bg-transparent text-gray-500 border-white/10 hover:text-white hover:border-white/30'}
    `}>
      {label}
    </button>
  );
}

function ComplexityBars({ level }: { level: string }) {
  // Logic: Low = 1 bar, Medium = 2 bars, High = 3 bars
  const fillCount = level === "High" ? 3 : level === "Medium" ? 2 : 1;
  
  return (
    <div className="flex items-center gap-1" title={`Complexity: ${level}`}>
      {[1, 2, 3].map((i) => (
        <div 
          key={i} 
          className={`w-1 h-3 rounded-sm ${i <= fillCount ? 'bg-[#1b17ff]' : 'bg-white/10'}`} 
        />
      ))}
    </div>
  );
}
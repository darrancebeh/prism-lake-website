import Link from "next/link";
import Image from "next/image";
import { getPosts, getFlashUpdates } from "@/lib/blog"; 
import { 
  ArrowRight, 
  Clock, 
  Hash, 
  Zap, 
  Cpu, 
  Search, 
  Terminal, 
  BookOpen, 
  Pin, 
  Globe, 
  LayoutGrid,
  AlertCircle
} from "lucide-react";
import { ArchiveGrid } from "@/components/ArchiveGrid";

// --- CONFIGURATION ---
const FEATURED_SLUG = "the-structural-decoupling-of-value"; 

export const metadata = {
  title: "Prism Intelligence | The Wire",
  description: "Real-time market microstructure analysis and volatility research.",
};

export default async function ResearchPage() {
  // 1. Fetch Data (Parallel)
  const [longFormPosts, flashUpdates] = await Promise.all([
    getPosts(),         
    getFlashUpdates()   
  ]);
  
  // 2. Determine Featured Post
  let featuredPost = longFormPosts.find(p => p.slug === FEATURED_SLUG);
  
  if (!featuredPost) {
    // Fallback: Find first pinned post, or just the first post
    featuredPost = longFormPosts.find(p => p.meta.isPinned) || longFormPosts[0];
  }

  // 3. The Wire (Flash Updates)
  const wireUpdates = flashUpdates.slice(0, 5);

  // 4. The Archive (Logic: Deduplicate -> Sort Pinned -> Sort Date)
  const archivePosts = longFormPosts
    // Step A: Remove the Featured post so it doesn't show up twice
    .filter(post => post.slug !== featuredPost?.slug)
    // Step B: Sort Remainder (Pinned First, Then Newest)
    .sort((a, b) => {
      // Priority 1: Is Pinned?
      if (a.meta.isPinned && !b.meta.isPinned) return -1; // a comes first
      if (!a.meta.isPinned && b.meta.isPinned) return 1;  // b comes first
      
      // Priority 2: Date (Newest First)
      return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
    });

  return (
    <div className="min-h-screen bg-[#020410] pt-32 pb-20 px-4 md:px-6 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#1b17ff]/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">

        {/* --- 1. HEADER --- */}
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
            <div className="flex flex-wrap justify-end gap-2">
              <CoverageBadge icon={<Globe size={10} />} label="US MARKETS" />
              <CoverageBadge icon={<Zap size={10} />} label="VOLATILITY" />
              <CoverageBadge icon={<Cpu size={10} />} label="QUANT" />
            </div>
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

        {/* --- 2. MARQUEE --- */}
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

        {/* --- 3. BENTO SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-24">
            
          {/* FEATURED STORY */}
          <div className="lg:col-span-8 group relative">
            {featuredPost ? (
              <Link href={`/research/${featuredPost.slug}`} className="block h-full">
                <div className="h-full glass-panel p-8 md:p-12 rounded-3xl border border-[#1b17ff]/30 bg-gradient-to-br from-[#0a1128] to-[#020410] relative overflow-hidden hover:shadow-[0_0_50px_rgba(27,23,255,0.15)] transition-all duration-500 group-hover:-translate-y-1">
                  
                  {/* Background Glow */}
                  <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#1b17ff] opacity-10 blur-[100px] group-hover:opacity-20 transition-opacity" />
                  
                  <div className="relative z-10 flex flex-col h-full justify-between min-h-[420px]">
                    <div>
                      {/* Meta Row */}
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        {featuredPost.meta.isPinned && (
                          <span className="px-3 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-bold font-mono rounded-full tracking-wide flex items-center gap-1 shadow-glow-amber">
                            <Pin size={10} fill="currentColor" /> PINNED
                          </span>
                        )}
                        <span className="px-3 py-1 bg-[#1b17ff] text-white text-[10px] font-bold font-mono rounded-full tracking-wide shadow-glow">
                          FEATURED
                        </span>
                        {featuredPost.meta.categories.slice(0, 3).map((cat) => (
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

                    <div className="flex items-center justify-between mt-8 pt-8 border-t border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 p-[1px] bg-gradient-to-tr from-[#1b17ff] to-cyan-500">
                           <div className="w-full h-full rounded-full overflow-hidden relative">
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
            ) : (
              <div className="h-full glass-panel p-12 flex flex-col items-center justify-center text-center border-dashed border-gray-800 min-h-[400px]">
                <BookOpen size={48} className="text-gray-700 mb-4" />
                <h3 className="text-xl font-bold text-gray-500">No Featured Intelligence</h3>
                <p className="text-sm text-gray-600 mt-2">System awaiting primary signal input.</p>
              </div>
            )}
          </div>

          {/* THE WIRE (Flash Updates) */}
          <div className="lg:col-span-4 flex flex-col gap-4 h-full">
            <div className="flex items-center justify-between px-2 mb-1">
              <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Zap size={12} className="text-orange-500 fill-orange-500" /> 
                Live Wire
              </h3>
              <span className="text-[10px] font-mono text-[#1b17ff] animate-pulse">RECEIVING DATA...</span>
            </div>
            
            {wireUpdates.length > 0 ? (
              wireUpdates.map((flash) => (
                <div 
                  key={flash.id} 
                  className={`
                    glass-panel p-4 rounded-xl border transition-all relative overflow-hidden
                    ${flash.meta.impact === 'High' 
                      ? 'border-red-500/40 bg-red-500/5' 
                      : 'border-white/5 hover:border-[#1b17ff]/50 hover:bg-[#1b17ff]/5'}
                  `}
                >
                  {flash.meta.impact === 'High' && (
                    <div className="absolute top-3 right-3 flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-2 pr-6">
                    <div className="flex gap-2 items-center">
                      <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border 
                        ${flash.meta.impact === 'High' 
                          ? 'text-red-400 border-red-500/30 bg-red-500/10' 
                          : 'text-[#1b17ff] border-[#1b17ff]/20 bg-[#1b17ff]/10'}`
                      }>
                        {flash.meta.category}
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono">
                        {flash.meta.time} ET
                      </span>
                    </div>
                  </div>
                  
                  <h4 className={`text-sm font-bold leading-snug ${flash.meta.impact === 'High' ? 'text-white' : 'text-gray-300'}`}>
                    {flash.meta.headline}
                  </h4>
                </div>
              ))
            ) : (
              <div className="p-6 text-center border border-dashed border-white/10 rounded-xl bg-white/5 flex-1 flex flex-col items-center justify-center">
                <AlertCircle size={24} className="text-gray-600 mb-2" />
                <p className="text-xs text-gray-500 font-mono">NO FLASH SIGNALS DETECTED</p>
              </div>
            )}

            <div className="mt-auto glass-panel p-6 rounded-xl bg-gradient-to-br from-[#1b17ff]/20 to-[#0a1128] border border-[#1b17ff]/30 text-center relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <Zap size={120} />
              </div>
              {/* Subscribe Box */}
              <div className="mt-auto glass-panel p-6 rounded-xl bg-gradient-to-br from-[#1b17ff]/20 to-[#0a1128] border border-[#1b17ff]/30 text-center relative overflow-hidden group">
                <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <Zap size={120} />
                </div>
                <h4 className="text-white font-bold text-lg mb-1 relative z-10">Inner Circle Access.</h4>
                <p className="text-gray-400 text-xs mb-4 relative z-10 font-light">Get the weekly institutional memo delivered to your terminal.</p>
                
                {/* NEW LINK BUTTON */}
                <Link 
                  href="/subscribe"
                  className="block w-full py-3 bg-[#1b17ff] text-white font-bold text-xs rounded-lg shadow-lg hover:bg-[#1b17ff]/90 transition-all relative z-10 tracking-widest border border-white/10"
                >
                  INITIALIZE SUBSCRIPTION
                </Link>
              </div>
            </div>
          </div>

        </div>


        {/* --- 3. THE ARCHIVE (Interactive Component) --- */}
        <ArchiveGrid posts={archivePosts} />

      </div>
    </div>
  );
}

function CoverageBadge({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1 bg-[#0a1128] border border-white/10 rounded-full text-[10px] font-bold text-gray-400 font-mono hover:text-white hover:border-[#1b17ff] transition-colors cursor-default">
      <span className="text-[#1b17ff]">{icon}</span>
      {label}
    </div>
  );
}
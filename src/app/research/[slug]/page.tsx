import Image from "next/image";
import { getPostBySlug, getPosts } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Lock, Clock, BarChart3, Calendar, Hash } from "lucide-react";
import { CommentSection } from "@/components/CommentSection"; 
import { ReactionBar } from "@/components/ReactionBar";
import { Metadata } from 'next';
import { ArticleFooter } from "@/components/ArticleFooter";
import { ViewTracker } from "@/components/ViewTracker";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: 'Article Not Found' };

  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: 'article',
      publishedTime: post.meta.date,
      authors: [post.meta.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta.title,
      description: post.meta.description,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getPosts(); 
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return <div className="text-center py-20 text-gray-500">Post not found</div>;

  return (
    <article className="min-h-screen pt-40 pb-20 px-4">
      
      {/* --- 1. THE IMPACT HEADER (New Design) --- */}
      <header className="max-w-4xl mx-auto mb-16 relative animate-fade-in-up">
        
        {/* HUD Row: Meta Data & Tech Specs */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-b border-white/10 pb-6">
          
          {/* LEFT: Context (Date + Tags) */}
          <div className="flex flex-col gap-3">
            
            {/* Date */}
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
              <Calendar size={12} className="text-[#1b17ff]" />
              <span className="tracking-wide">{post.meta.date}</span>
            </div>

            {/* Categories (The Tags) */}
            <div className="flex flex-wrap items-center gap-2">
              <Hash size={12} className="text-gray-600" />
              {post.meta.categories?.map((cat: string) => (
                <span key={cat} className="text-[10px] font-mono text-[#1b17ff] uppercase bg-[#1b17ff]/10 px-2 py-1 rounded border border-[#1b17ff]/20 hover:bg-[#1b17ff] hover:text-white transition-colors cursor-default">
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT: Specs (Time + Complexity) */}
          <div className="flex items-center gap-6">
            
            {/* Read Time */}
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest mb-1">Est. Time</span>
              <div className="flex items-center gap-2 text-xs font-mono text-white">
                {post.meta.readTime || "5 min"} <Clock size={12} className="text-gray-500" />
              </div>
            </div>

            <div className="w-[1px] h-8 bg-white/10" />

            {/* Complexity Visualizer */}
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest mb-1">Complexity</span>
              <ComplexityBadge level={post.meta.complexity} />
            </div>

          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-10 text-white tracking-tighter leading-[1.1] text-center max-w-5xl mx-auto">
          {post.meta.title}
        </h1>

        {/* AUTHOR CHIP (Centered) */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-4 bg-[#0a1128]/80 backdrop-blur-md border border-[#1b17ff]/30 pr-6 pl-2 py-2 rounded-full shadow-[0_0_30px_rgba(27,23,255,0.1)] hover:border-[#1b17ff] transition-colors group cursor-default">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#1b17ff] group-hover:scale-105 transition-transform">
                <Image 
                  src="/images/darrancebeh2.jpg" 
                  alt={post.meta.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-white leading-none mb-0.5">{post.meta.author}</p>
                <p className="text-[10px] text-[#1b17ff] font-mono uppercase tracking-widest">
                  {post.meta.authorRole || "Founding Partner"}
                </p>
              </div>
          </div>
        </div>

        {/* View Count */}
        <div className="flex justify-center">
          <ViewTracker slug={post.slug} />
        </div>

      </header>

      {/* --- 2. CONTENT BODY --- */}
      <div className="max-w-3xl mx-auto relative animate-fade-in mb-16">
        <div className={`prose prose-invert prose-lg max-w-none 
          prose-headings:font-sans prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight
          prose-p:text-gray-300 prose-p:leading-relaxed prose-p:font-light
          prose-a:text-[#1b17ff] prose-a:no-underline hover:prose-a:underline
          prose-strong:text-white prose-strong:font-bold
          prose-code:text-[#1b17ff] prose-code:bg-[#1b17ff]/10 prose-code:px-1 prose-code:rounded prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-[#0a1128] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
          prose-blockquote:border-l-[#1b17ff] prose-blockquote:bg-[#1b17ff]/5 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:not-italic prose-blockquote:rounded-r-lg
          ${post.meta.premium ? 'mask-gradient' : ''}`}
        >
          <MDXRemote source={post.content} />
        </div>

        {/* PAYWALL OVERLAY */}
        {post.meta.premium && (
          <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-[#020410] via-[#020410] to-transparent flex flex-col items-center justify-end pb-12 z-20">
            <div className="glass-panel p-8 rounded-2xl text-center max-w-md border-[#1b17ff]/30 shadow-[0_0_50px_rgba(27,23,255,0.1)] backdrop-blur-xl">
               <div className="w-12 h-12 bg-[#1b17ff]/20 text-[#1b17ff] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#1b17ff]/20">
                 <Lock size={20} />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">Institutional Access Required</h3>
               <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                 This deep-dive analysis contains proprietary volatility data reserved for Prism Lake Partners.
               </p>
               <button className="w-full py-3 bg-[#1b17ff] text-white font-bold rounded hover:bg-[#1b17ff]/90 transition-all text-sm tracking-wide shadow-lg shadow-[#1b17ff]/20">
                 REQUEST ACCESS
               </button>
            </div>
          </div>
        )}
      </div>

      {/* --- 3. FOOTER AREA --- */}
      <div className="max-w-3xl mx-auto animate-fade-in delay-100 mb-16">
        <ArticleFooter author={post.meta.author} />
      </div>

      {!post.meta.premium && (
        <div className="animate-fade-in-up delay-200">
          <ReactionBar />
          <CommentSection />
        </div>
      )}

    </article>
  );
}

// --- ROBUST HELPER COMPONENT ---

function ComplexityBadge({ level }: { level?: string }) {
  // 1. Normalize input to lowercase to handle "High", "HIGH", "high"
  const normalizedLevel = level?.toLowerCase() || "medium";

  // 2. Logic: Determine which bars are active
  // "Low" activates Bar 1. "Medium" activates 1 & 2. "High" activates 1, 2 & 3.
  const showBar1 = ["low", "medium", "high"].includes(normalizedLevel);
  const showBar2 = ["medium", "high"].includes(normalizedLevel);
  const showBar3 = ["high"].includes(normalizedLevel);

  return (
    <div className="flex gap-1" title={`Complexity: ${level}`}>
      
      {/* Bar 1: Low (Brand Blue) */}
      {/* Represents foundational knowledge */}
      <div 
        className={`w-1.5 h-3 rounded-sm transition-all duration-500 ${
          showBar1 ? 'bg-[#1b17ff] shadow-[0_0_8px_#1b17ff]' : 'bg-white/10'
        }`} 
      />
      
      {/* Bar 2: Medium (Cyan) */}
      {/* Represents intermediate concepts / volatility */}
      <div 
        className={`w-1.5 h-3 rounded-sm transition-all duration-500 ${
          showBar2 ? 'bg-[#22d3ee]' : 'bg-white/10'
        }`} 
      />
      
      {/* Bar 3: High (Violet) */}
      {/* Represents advanced math / deep alpha */}
      <div 
        className={`w-1.5 h-3 rounded-sm transition-all duration-500 ${
          showBar3 ? 'bg-[#4f46e5]' : 'bg-white/10'
        }`} 
      />
    </div>
  );
}
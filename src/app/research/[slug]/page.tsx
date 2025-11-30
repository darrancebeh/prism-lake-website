import { getPostBySlug, getPosts } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Lock } from "lucide-react";
import { CommentSection } from "@/components/CommentSection"; 
import { ReactionBar } from "@/components/ReactionBar";
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

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
  // FIX: Added 'await' here because getPosts() fetches from GitHub now
  const posts = await getPosts(); 
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug); // Added 'await' here too for safety

  if (!post) return <div className="text-center py-20 text-gray-500">Post not found</div>;

  return (
    <article className="min-h-screen pt-40 pb-20 px-4">
      
      {/* 1. Header */}
      <header className="max-w-3xl mx-auto mb-12 text-center animate-fade-in-up">
        
        {/* Meta Tag Pill */}
        <div className="flex items-center justify-center gap-4 mb-8 text-xs font-mono text-gray-500">
           <span>{post.meta.date}</span>
           <span className="text-gray-800">|</span>
           <span className="text-[#1b17ff] bg-[#1b17ff]/10 px-3 py-1 rounded-full border border-[#1b17ff]/20 uppercase tracking-wider">
             {post.meta.category}
           </span>
        </div>
        
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight text-white tracking-tighter">
          {post.meta.title}
        </h1>

        {/* Author Block */}
        <div className="flex items-center justify-center gap-4 border-y border-white/5 py-8">
           <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#1b17ff] to-cyan-500 p-[1px]">
             <div className="w-full h-full rounded-full bg-[#020410]" />
           </div>
           <div className="text-left">
             <p className="text-sm font-bold text-white tracking-wide">{post.meta.author}</p>
             <p className="text-xs text-gray-500 font-mono uppercase">Founding Partner</p>
           </div>
        </div>
      </header>

      {/* 2. Content Body */}
      <div className="max-w-3xl mx-auto relative animate-fade-in">
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
               <h3 className="text-xl font-bold text-white mb-2">Subscription Access Required</h3>
               <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                 This deep-dive analysis contains proprietary research and analysis reserved for Prism Lake Subscribers and Clients.
               </p>
               <button className="w-full py-3 bg-[#1b17ff] text-white font-bold rounded hover:bg-[#1b17ff]/90 transition-all text-sm tracking-wide shadow-lg shadow-[#1b17ff]/20">
                 REQUEST ACCESS
               </button>
            </div>
          </div>
        )}
      </div>

      {/* --- NEW ENGAGEMENT SECTION --- */}
      {/* Only show comments if NOT premium, or if you want to tease engagement */}
      {!post.meta.premium && (
        <div className="animate-fade-in-up delay-200">
          <ReactionBar />
          <CommentSection />
        </div>
      )}

    </article>
  );
}
import { getPostBySlug, getPosts } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// UPDATE: params is now a Promise<{ slug: string }>
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  // 1. AWAIT the params before using them
  const { slug } = await params; 
  
  const post = getPostBySlug(slug);

  return (
    <article className="min-h-screen pt-24 pb-20 px-4">
      {/* ... (Rest of the JSX remains exactly the same) ... */}
      
      {/* Back Button */}
      <div className="max-w-3xl mx-auto mb-8">
        <Link href="/research" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#1b17ff] transition-colors">
          <ChevronLeft size={16} /> Back to Intelligence
        </Link>
      </div>

      {/* Header */}
      <header className="max-w-3xl mx-auto mb-12 text-center">
        <div className="flex items-center justify-center gap-4 mb-6 text-xs font-mono text-gray-500">
           <span>{post.meta.date}</span>
           <span>|</span>
           <span className="text-[#1b17ff]">{post.meta.category}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          {post.meta.title}
        </h1>
        <div className="flex items-center justify-center gap-3">
           <div className="w-10 h-10 rounded-full bg-gray-800 border border-white/10" /> 
           <div className="text-left">
             <p className="text-sm font-bold text-white">{post.meta.author}</p>
             <p className="text-xs text-gray-500">Founding Partner</p>
           </div>
        </div>
      </header>

      {/* Content Body */}
      <div className="max-w-3xl mx-auto relative">
        <div className={`prose prose-invert prose-lg max-w-none prose-headings:font-sans prose-headings:font-bold prose-p:text-gray-300 prose-a:text-[#1b17ff] prose-code:text-[#1b17ff] ${post.meta.premium ? 'mask-gradient' : ''}`}>
          {/* @ts-ignore */}
          <MDXRemote source={post.content} />
        </div>

        {/* PAYWALL OVERLAY */}
        {post.meta.premium && (
          <div className="absolute bottom-0 left-0 w-full h-80 bg-gradient-to-t from-[#020410] via-[#020410]/95 to-transparent flex flex-col items-center justify-end pb-12">
            <div className="glass-panel p-8 rounded-2xl text-center max-w-md border-[#1b17ff]/30">
               <h3 className="text-xl font-bold text-white mb-2">Unlock Institutional Alpha</h3>
               <p className="text-gray-400 text-sm mb-6">
                 This deep-dive analysis is reserved for Prism Lake Partners and Clients.
               </p>
               <button className="w-full py-3 bg-[#1b17ff] text-white font-bold rounded hover:bg-[#1b17ff]/90 transition-all">
                 Request Access
               </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
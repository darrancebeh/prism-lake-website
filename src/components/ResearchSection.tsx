"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";

interface Post {
  slug: string;
  meta: {
    title: string;
    date: string;
    description: string;
    category: string;
    author: string;
    premium?: boolean;
  };
}

export function ResearchSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.slice(0, 3)); // Get latest 3 posts
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load posts:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center text-gray-500">Loading research...</div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl font-bold mb-2">
            The <span className="text-[#1b17ff]">Research</span>.
          </h2>
          <p className="text-gray-400 text-sm">
            Institutional-grade analysis. Published weekly.
          </p>
        </div>
        <Link 
          href="/research" 
          className="text-[#1b17ff] font-mono text-sm hover:underline flex items-center gap-2"
        >
          View All <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/research/${post.slug}`}
            className="glass-panel p-6 rounded-xl hover:border-[#1b17ff] transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-[#1b17ff] uppercase">
                {post.meta.category}
              </span>
              {post.meta.premium && (
                <Lock size={14} className="text-gray-500" />
              )}
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-[#1b17ff] transition-colors">
              {post.meta.title}
            </h3>
            <p className="text-sm text-gray-400 mb-4 line-clamp-2">
              {post.meta.description}
            </p>
            <div className="text-xs text-gray-500 font-mono">
              {new Date(post.meta.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
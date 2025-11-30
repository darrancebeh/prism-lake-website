"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Send, User } from "lucide-react";
import { usePathname } from "next/navigation";

type Comment = {
  id: number;
  author_name: string;
  text: string;
  created_at: string;
  role: "TRADER" | "GUEST";
};

export function CommentSection() {
  const pathname = usePathname();
  const slug = pathname.split("/").pop() || "home";

  const [comments, setComments] = useState<Comment[]>([]);
  const [input, setInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // 1. Fetch Comments
  useEffect(() => {
    fetch(`/api/comments?slug=${slug}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [slug]);

  // 2. Submit Comment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setSubmitting(true);

    const finalName = nameInput.trim() || `ANON-${Math.floor(Math.random() * 900) + 100}`;

    const res = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        slug,
        name: finalName,
        text: input,
        role: "GUEST" // Default role
      }),
    });

    const newComment = await res.json();
    setComments([newComment, ...comments]); // Add to top
    setInput("");
    setSubmitting(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-16 border-t border-white/5 pt-12">
      
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare size={18} className="text-[#1b17ff]" />
        <h3 className="text-lg font-bold text-white font-mono uppercase tracking-wider">The Wire ({comments.length})</h3>
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="mb-10 glass-panel p-1 rounded-xl bg-[#0a1128]/50">
        <div className="p-4 space-y-3">
          <input 
            type="text" 
            placeholder="Alias (Optional, defaults to ANON-ID)" 
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="w-full bg-transparent text-sm font-mono text-[#1b17ff] placeholder-[#1b17ff]/40 focus:outline-none"
          />
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add your thesis..."
            className="w-full bg-transparent text-gray-300 text-sm focus:outline-none resize-none h-20 placeholder-gray-600"
          />
        </div>
        <div className="flex justify-between items-center px-4 pb-2">
          <span className="text-[10px] text-gray-600 font-mono">MARKDOWN SUPPORTED</span>
          <button 
            type="submit"
            disabled={!input.trim() || submitting}
            className="p-2 rounded-lg bg-[#1b17ff] text-white hover:bg-[#1b17ff]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send size={14} />
          </button>
        </div>
      </form>

      {/* Comment Stream */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 group animate-fade-in-up">
            <div className={`
              w-8 h-8 rounded border flex items-center justify-center shrink-0
              ${comment.role === 'TRADER' ? 'bg-[#1b17ff]/10 border-[#1b17ff]/30 text-[#1b17ff]' : 'bg-white/5 border-white/10 text-gray-500'}
            `}>
              <User size={14} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className={`text-xs font-bold font-mono ${comment.role === 'TRADER' ? 'text-[#1b17ff]' : 'text-gray-400'}`}>
                  {comment.author_name}
                </span>
                {comment.role === 'TRADER' && (
                  <span className="text-[9px] bg-[#1b17ff] text-white px-1.5 rounded-sm font-bold">STAFF</span>
                )}
                <span className="text-[10px] text-gray-600 font-mono">
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed font-light">
                {comment.text}
              </p>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <div className="text-center text-gray-600 text-xs font-mono py-8">
            {"// NO SIGNAL DETECTED. BE THE FIRST TO TRANSMIT."}
          </div>
        )}
      </div>

    </div>
  );
}
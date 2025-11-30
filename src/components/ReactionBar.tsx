"use client";

import { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown, Flame, Share2, Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";

export function ReactionBar() {
  // Get the slug from the URL (e.g., /research/volatility -> "volatility")
  const pathname = usePathname();
  const slug = pathname.split("/").pop() || "home";

  const [votes, setVotes] = useState({ up: 0, down: 0, fire: 0 });
  const [loading, setLoading] = useState(true);
  const [userVoted, setUserVoted] = useState<string | null>(null); // Simple local check

  // 1. Load initial data
  useEffect(() => {
    fetch(`/api/reactions?slug=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setVotes(data);
        setLoading(false);
      });
  }, [slug]);

  // 2. Handle Vote
  const handleVote = async (type: 'up' | 'down' | 'fire') => {
    // Optimistic Update (Make UI fast)
    setVotes((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    setUserVoted(type);

    // Sync with Server
    await fetch("/api/reactions", {
      method: "POST",
      body: JSON.stringify({ slug, type }),
    });
  };

  if (loading) return <div className="py-8 flex justify-center"><Loader2 className="animate-spin text-[#1b17ff]" /></div>;

  return (
    <div className="w-full flex justify-center py-8">
      <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-6 md:gap-8 border-[#1b17ff]/20">
        
        {/* Upvote */}
        <button onClick={() => handleVote('up')} className="group flex items-center gap-2 transition-all hover:scale-110">
          <ThumbsUp size={18} className={userVoted === 'up' ? "text-[#1b17ff] fill-[#1b17ff]/20" : "text-gray-500 group-hover:text-white"} />
          <span className="text-xs font-mono font-bold text-gray-400">{votes.up}</span>
        </button>

        {/* Fire */}
        <button onClick={() => handleVote('fire')} className="group flex items-center gap-2 transition-all hover:scale-110">
          <Flame size={18} className={userVoted === 'fire' ? "text-orange-500 fill-orange-500/20" : "text-gray-500 group-hover:text-orange-400"} />
          <span className="text-xs font-mono font-bold text-gray-400">{votes.fire}</span>
        </button>

        {/* Downvote */}
        <button onClick={() => handleVote('down')} className="group flex items-center gap-2 transition-all hover:scale-110">
          <ThumbsDown size={18} className={userVoted === 'down' ? "text-red-500 fill-red-500/20" : "text-gray-500 group-hover:text-white"} />
        </button>

        <div className="w-[1px] h-6 bg-white/10" />

        {/* Share */}
        <button onClick={() => navigator.clipboard.writeText(window.location.href)} className="group flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
          <Share2 size={16} />
          <span className="text-xs font-mono hidden md:inline">SHARE</span>
        </button>

      </div>
    </div>
  );
}
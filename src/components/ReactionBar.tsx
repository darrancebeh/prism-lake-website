"use client";

import { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown, Flame, Share2, Loader2, Check } from "lucide-react";
import { usePathname } from "next/navigation";

export function ReactionBar() {
  const pathname = usePathname();
  // Fallback to "home" if pathname is empty, though in article pages it won't be
  const slug = pathname.split("/").pop() || "home";

  const [votes, setVotes] = useState({ up: 0, down: 0, fire: 0 });
  const [loading, setLoading] = useState(true);
  const [userVoted, setUserVoted] = useState<string | null>(null);
  const [hasCopied, setHasCopied] = useState(false); // New state for copy feedback

  // 1. Load initial data
  useEffect(() => {
    fetch(`/api/reactions?slug=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setVotes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load reactions", err);
        setLoading(false);
      });
  }, [slug]);

  // 2. Handle Vote
  const handleVote = async (type: 'up' | 'down' | 'fire') => {
    setVotes((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    setUserVoted(type);

    await fetch("/api/reactions", {
      method: "POST",
      body: JSON.stringify({ slug, type }),
    });
  };

  // 3. Handle Intelligent Share
  const handleShare = async () => {
    const url = window.location.href;
    const title = "Prism Lake Intelligence";

    // Attempt Native Share (Mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: 'Institutional-grade analysis from Prism Lake.',
          url: url,
        });
        return; // Exit if successful
      } catch (err) {
        console.log('Share cancelled or failed, falling back to clipboard');
      }
    }

    // Fallback: Clipboard Copy (Desktop)
    try {
      await navigator.clipboard.writeText(url);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000); // Reset after 2s
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  if (loading) return <div className="py-8 flex justify-center"><Loader2 className="animate-spin text-[#1b17ff]" /></div>;

  return (
    <div className="w-full flex justify-center py-8">
      <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-6 md:gap-8 border-[#1b17ff]/20 shadow-[0_0_30px_rgba(27,23,255,0.05)]">
        
        {/* Upvote */}
        <button onClick={() => handleVote('up')} className="group flex items-center gap-2 transition-all hover:scale-110 active:scale-95">
          <ThumbsUp size={18} className={`transition-colors ${userVoted === 'up' ? "text-[#1b17ff] fill-[#1b17ff]/20" : "text-gray-500 group-hover:text-white"}`} />
          <span className={`text-xs font-mono font-bold ${userVoted === 'up' ? "text-white" : "text-gray-500"}`}>{votes.up}</span>
        </button>

        {/* Fire */}
        <button onClick={() => handleVote('fire')} className="group flex items-center gap-2 transition-all hover:scale-110 active:scale-95">
          <Flame size={18} className={`transition-colors ${userVoted === 'fire' ? "text-orange-500 fill-orange-500/20" : "text-gray-500 group-hover:text-orange-400"}`} />
          <span className={`text-xs font-mono font-bold ${userVoted === 'fire' ? "text-white" : "text-gray-500"}`}>{votes.fire}</span>
        </button>

        {/* Downvote */}
        <button onClick={() => handleVote('down')} className="group flex items-center gap-2 transition-all hover:scale-110 active:scale-95">
          <ThumbsDown size={18} className={`transition-colors ${userVoted === 'down' ? "text-red-500 fill-red-500/20" : "text-gray-500 group-hover:text-white"}`} />
        </button>

        <div className="w-[1px] h-6 bg-white/10" />

        {/* Intelligent Share Button */}
        <button 
          onClick={handleShare}
          className="group flex items-center gap-2 text-gray-500 hover:text-white transition-colors min-w-[70px] justify-center"
        >
          {hasCopied ? (
            <>
              <Check size={16} className="text-green-400" />
              <span className="text-xs font-mono text-green-400 font-bold animate-fade-in">COPIED</span>
            </>
          ) : (
            <>
              <Share2 size={16} className="group-hover:text-[#1b17ff] transition-colors" />
              <span className="text-xs font-mono hidden md:inline group-hover:text-[#1b17ff] transition-colors">SHARE</span>
            </>
          )}
        </button>

      </div>
    </div>
  );
}
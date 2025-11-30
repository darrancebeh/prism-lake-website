"use client";

import { useState, useEffect, useRef } from "react";
import { ThumbsUp, ThumbsDown, Flame, Share2, Loader2, Check } from "lucide-react";
import { usePathname } from "next/navigation";

export function ReactionBar() {
  const pathname = usePathname();
  const slug = pathname.split("/").pop() || "home";

  const [votes, setVotes] = useState({ up: 0, down: 0, fire: 0 });
  const [userState, setUserState] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasCopied, setHasCopied] = useState(false);
  
  // FIX: Use useRef instead of useState for ID (No re-renders)
  const userIdRef = useRef<string>("");

  useEffect(() => {
    // 1. Initialize ID (Silent, no render)
    let storedId = localStorage.getItem("prism_visitor_id");
    if (!storedId) {
      storedId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem("prism_visitor_id", storedId);
    }
    userIdRef.current = storedId;

    // 2. Fetch Data using the ref
    fetch(`/api/reactions?slug=${slug}&userId=${storedId}`)
      .then((res) => res.json())
      .then((data) => {
        setVotes({ up: data.up, down: data.down, fire: data.fire });
        setUserState(data.userState || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

  }, [slug]);

  const handleVote = async (type: 'up' | 'down' | 'fire') => {
    if (!userIdRef.current) return; // Guard using ref

    const isActive = userState.includes(type);
    const newVotes = { ...votes };
    let newUserState = [...userState];

    if (type === 'fire') {
      if (isActive) {
        newVotes.fire--;
        newUserState = newUserState.filter(t => t !== 'fire');
      } else {
        newVotes.fire++;
        newUserState.push('fire');
      }
    } else {
      const opposite = type === 'up' ? 'down' : 'up';
      if (isActive) {
        newVotes[type]--;
        newUserState = newUserState.filter(t => t !== type);
      } else {
        newVotes[type]++;
        newUserState.push(type);
        if (newUserState.includes(opposite)) {
          newVotes[opposite]--;
          newUserState = newUserState.filter(t => t !== opposite);
        }
      }
    }

    setVotes(newVotes);
    setUserState(newUserState);

    await fetch("/api/reactions", {
      method: "POST",
      body: JSON.stringify({ slug, type, userId: userIdRef.current }), // Use ref here
    });
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = "Prism Intelligence Article by Prism Lake";

    // 1. Detect if Mobile (We only want the Share Sheet on actual phones)
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    // 2. Mobile Logic: Native Share Sheet
    if (isMobile && navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
        return; // Stop here if successful
      } catch (err) {
        // If they cancel the sheet, do nothing.
        return; 
      }
    }

    // 3. Desktop Logic: Force Clipboard Copy
    try {
      await navigator.clipboard.writeText(url);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
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
          <ThumbsUp size={18} className={`transition-colors ${userState.includes('up') ? "text-[#1b17ff] fill-[#1b17ff]/20" : "text-gray-500 group-hover:text-white"}`} />
          <span className={`text-xs font-mono font-bold ${userState.includes('up') ? "text-white" : "text-gray-500"}`}>{votes.up}</span>
        </button>

        {/* Fire */}
        <button onClick={() => handleVote('fire')} className="group flex items-center gap-2 transition-all hover:scale-110 active:scale-95">
          <Flame size={18} className={`transition-colors ${userState.includes('fire') ? "text-orange-500 fill-orange-500/20" : "text-gray-500 group-hover:text-orange-400"}`} />
          <span className={`text-xs font-mono font-bold ${userState.includes('fire') ? "text-white" : "text-gray-500"}`}>{votes.fire}</span>
        </button>

        {/* Downvote */}
        <button onClick={() => handleVote('down')} className="group flex items-center gap-2 transition-all hover:scale-110 active:scale-95">
          <ThumbsDown size={18} className={`transition-colors ${userState.includes('down') ? "text-red-500 fill-red-500/20" : "text-gray-500 group-hover:text-white"}`} />
        </button>

        <div className="w-[1px] h-6 bg-white/10" />

        {/* Share */}
        <button onClick={handleShare} className="group flex items-center gap-2 text-gray-500 hover:text-white transition-colors min-w-[70px] justify-center">
          {hasCopied ? (
            <>
              <Check size={16} className="text-green-400" />
              <span className="text-[10px] md:text-xs font-mono text-green-400 font-bold animate-fade-in">COPIED</span>
            </>
          ) : (
            <>
              <Share2 size={16} className="group-hover:text-[#1b17ff] transition-colors" />
              <span className="text-[10px] md:text-xs font-mono hidden md:inline group-hover:text-[#1b17ff] transition-colors">SHARE</span>
            </>
          )}
        </button>

      </div>
    </div>
  );
}
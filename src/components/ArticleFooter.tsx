import Image from "next/image";
import Link from "next/link";
import { Linkedin, Twitter, BadgeCheck, Link2 } from "lucide-react";

interface ArticleFooterProps {
  author: string; // e.g., "Darrance Beh" or "Darrance Beh & Jane Doe"
}

export function ArticleFooter({ author }: ArticleFooterProps) {
  // Simple heuristic: If string has " & " or "," assume multiple authors
  const isPlural = author.includes(" & ") || author.includes(",");
  const label = isPlural ? "ABOUT THE AUTHORS" : "ABOUT THE AUTHOR";

  return (
    <div className="mt-20">
      
      {/* 1. The Header Label */}
      <div className="flex items-center gap-4 mb-8 opacity-80">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#1b17ff]/50" />
        <span className="text-[#1b17ff] font-mono text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap">
          {label}
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#1b17ff]/50" />
      </div>

      {/* 2. The Author Card */}
      <div className="glass-panel p-8 rounded-2xl bg-[#0a1128]/40 border border-[#1b17ff]/20 relative overflow-hidden group">
        
        {/* Decorative Background Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#1b17ff] opacity-5 blur-[50px] rounded-full pointer-events-none group-hover:opacity-10 transition-opacity" />

        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
          
          {/* Avatar */}
          <div className="shrink-0 relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#1b17ff]/30 p-1">
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-900 relative">
                 {/* NOTE: In a real app with multiple authors, you'd map over an array. 
                    For now, we default to the Founder's image if the name matches, 
                    or a generic placeholder if it's someone else/plural.
                 */}
                 <Image 
                   src={author.includes("Darrance") ? "/images/darrancebeh2.jpg" : "/images/placeholder_avatar.jpg"} 
                   alt={author}
                   fill
                   className="object-cover transition-all duration-500"
                 />
              </div>
            </div>
            {/* Verified Badge */}
            <div className="absolute bottom-0 right-0 bg-[#0a1128] text-[#1b17ff] p-1 rounded-full border border-[#1b17ff]/50">
              <BadgeCheck size={16} fill="#0a1128" />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-2 mb-3">
              <h3 className="text-xl font-bold text-white font-sans tracking-tight">{author}</h3>
              <span className="hidden md:inline text-gray-600">•</span>
              <span className="text-[10px] font-mono text-[#1b17ff] uppercase tracking-wider bg-[#1b17ff]/10 px-2 py-0.5 rounded border border-[#1b17ff]/20">
                Founder | Chief Researcher
              </span>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-2xl font-light">
              Computer Science undergrad and discretionary proprietary trader specializing in informational and volatility arbitrage and market microstructure. 
              Currently self-funding university tuition via market alpha. Building Prism Lake to bridge the gap between Wall Street and Kuala Lumpur.
            </p>

            {/* Social Links */}
            <div className="flex items-center justify-center md:justify-start gap-4">
              <Link 
                href="https://linkedin.com/in/darrancebeh" 
                target="_blank"
                className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors"
              >
                <Linkedin size={14} /> LINKEDIN
              </Link>
              <Link 
                href="https://x.com/quant_in_my" 
                target="_blank"
                className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors"
              >
                <Twitter size={14} /> X / TWITTER
              </Link>
              <div className="h-3 w-[1px] bg-white/10" />
              <Link 
                href="/research" 
                className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors"
              >
                <Link2 size={14} /> MORE POSTS
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
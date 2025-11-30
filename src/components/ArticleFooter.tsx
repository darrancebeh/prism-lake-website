import Image from "next/image";
import Link from "next/link";
import { Linkedin, Twitter, BadgeCheck } from "lucide-react";

interface ArticleFooterProps {
  author: string; // "Darrance Beh"
}

export function ArticleFooter({ author }: ArticleFooterProps) {
  // In a real app, you might look up bio details based on the author string.
  // For now, we default to the Founder's profile.
  
  return (
    <div className="mt-16 pt-10 border-t border-white/5">
      <div className="glass-panel p-8 rounded-2xl bg-[#0a1128]/40 border border-[#1b17ff]/20 relative overflow-hidden group">
        
        {/* Decorative Background Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#1b17ff] opacity-5 blur-[50px] rounded-full pointer-events-none group-hover:opacity-10 transition-opacity" />

        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
          
          {/* Avatar */}
          <div className="shrink-0 relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#1b17ff]/30 p-1">
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-900 relative">
                 <Image 
                   src="/images/darrancebeh2.jpg" 
                   alt={author}
                   fill
                   className="object-cover"
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
            <div className="flex flex-col md:flex-row items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-white font-sans">{author}</h3>
              <span className="hidden md:inline text-gray-600">•</span>
              <span className="text-xs font-mono text-[#1b17ff] uppercase tracking-wider bg-[#1b17ff]/10 px-2 py-0.5 rounded border border-[#1b17ff]/20">
                Founder | Chief Researcher
              </span>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-2xl">
              Computer Science undergrad and proprietary trader specializing in informational and volatility arbitrage. 
              Currently self-funding university tuition via portfolio. Building Prism Lake to bridge the gap between Wall Street and Kuala Lumpur.
            </p>

            {/* Social Links */}
            <div className="flex items-center justify-center md:justify-start gap-4">
              <Link 
                href="https://linkedin.com/in/darrancebeh" 
                target="_blank"
                className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin size={14} /> LINKEDIN
              </Link>
              <Link 
                href="https://x.com/quant_in_my" 
                target="_blank"
                className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={14} /> TWITTER / X
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
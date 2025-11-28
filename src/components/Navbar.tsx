"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Home, ChevronRight } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  // 1. Split the path into segments (e.g., /research/volatility -> ['research', 'volatility'])
  const segments = pathname.split("/").filter((item) => item !== "");

  return (
    <nav className="fixed top-8 left-0 right-0 z-50 px-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* LEFT: Dynamic Breadcrumb Trail */}
        <div className="glass-panel px-4 py-3 rounded-lg flex items-center gap-2 text-xs font-mono text-gray-500 shadow-[0_4px_20px_rgba(0,0,0,0.4)] bg-[#0a1128]/90">
          
          {/* Root: PRISM LAKE (Home) */}
          <Link 
            href="/" 
            className={`flex items-center gap-2 hover:text-white transition-colors ${segments.length === 0 ? "text-white font-bold" : ""}`}
          >
            <div className={`w-2 h-2 rounded-sm ${segments.length === 0 ? "bg-[#1b17ff] shadow-[0_0_8px_#1b17ff]" : "bg-gray-600"}`} />
            PRISM LAKE
          </Link>

          {/* Dynamic Segments */}
          {segments.map((segment, index) => {
            // Reconstruct path for links (e.g., /research)
            const path = `/${segments.slice(0, index + 1).join("/")}`;
            const isLast = index === segments.length - 1;

            return (
              <div key={path} className="flex items-center gap-2 animate-fade-in">
                <span className="text-gray-700">/</span>
                
                {isLast ? (
                  // Active Page (Non-clickable, Highlighted)
                  <span className="text-[#1b17ff] font-bold uppercase tracking-wide">
                    {segment.replace(/-/g, " ")} {/* Removes hyphens from slugs */}
                  </span>
                ) : (
                  // Parent Page (Clickable)
                  <Link href={path} className="hover:text-white transition-colors uppercase">
                    {segment}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* RIGHT: Contextual Actions */}
        <div className="flex items-center gap-4">
          
          {/* Only show these "Quick Links" if on the Home Page to reduce noise */}
          {segments.length === 0 && (
            <div className="hidden md:flex gap-6 text-xs font-mono text-gray-400 glass-panel px-4 py-3 rounded-lg">
              <Link href="/research" className="hover:text-[#1b17ff] transition-colors">INTELLIGENCE</Link>
              <Link href="/careers" className="hover:text-[#1b17ff] transition-colors">PARTNERS</Link>
            </div>
          )}

          {/* Always show CTA */}
          <Link 
            href="https://forms.gle/hLKy96cNe7e5atUDA" 
            target="_blank"
            className="flex items-center gap-2 text-xs font-bold bg-[#1b17ff] text-white px-4 py-3 rounded-lg hover:bg-[#1b17ff]/90 transition-all shadow-[0_0_15px_rgba(27,23,255,0.3)] pointer-events-auto"
          >
            <span className="hidden sm:inline">JOIN COHORT 0</span>
            <span className="sm:hidden">APPLY</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

      </div>
    </nav>
  );
}
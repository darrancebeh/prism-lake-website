"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X, Home, Terminal, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // 1. Split path for breadcrumbs
  const segments = pathname.split("/").filter((item) => item !== "");

  // Close menu when clicking a link (handled by Link component navigation)
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-10 md:top-12 left-0 right-0 z-50 px-4 md:px-6 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          
          {/* --- LEFT: DYNAMIC BREADCRUMBS --- */}
          <div className="glass-panel px-3 md:px-4 py-3 rounded-lg flex items-center gap-2 text-xs font-mono text-gray-500 shadow-2xl bg-[#0a1128]/90 min-w-0 flex-1 md:flex-none mr-3 md:mr-0 z-50 relative">
            
            {/* Root Home Link */}
            <Link 
              href="/" 
              className={`flex items-center gap-2 hover:text-white transition-colors shrink-0 ${segments.length === 0 ? "text-white font-bold" : ""}`}
              onClick={handleLinkClick}
            >
              <div className={`w-2 h-2 rounded-sm ${segments.length === 0 ? "bg-[#1b17ff] shadow-[0_0_8px_#1b17ff]" : "bg-gray-600"}`} />
              <span className="hidden sm:inline">PRISM LAKE</span>
              <span className="sm:hidden font-bold">PRISM LAKE</span>
            </Link>

            {/* Segments Loop */}
            {segments.map((segment, index) => {
              const path = `/${segments.slice(0, index + 1).join("/")}`;
              const isLast = index === segments.length - 1;

              return (
                <div key={path} className="flex items-center gap-2 animate-fade-in min-w-0">
                  <span className="text-gray-700 shrink-0">/</span>
                  
                  {isLast ? (
                    // Active Page (Truncated for Mobile)
                    <span className="text-[#1b17ff] font-bold uppercase tracking-wide truncate max-w-[100px] sm:max-w-[200px]" title={segment}>
                      {segment.replace(/-/g, " ")} 
                    </span>
                  ) : (
                    // Intermediate Pages (Hidden on Mobile to save space)
                    <Link href={path} className="hover:text-white transition-colors uppercase shrink-0 hidden sm:block" onClick={handleLinkClick}>
                      {segment}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* --- RIGHT: ACTIONS (Desktop) --- */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            {segments.length === 0 && (
              <div className="flex gap-6 text-xs font-mono text-gray-400 glass-panel px-4 py-3 rounded-lg">
                <Link href="/research" className="hover:text-[#1b17ff] transition-colors">INTELLIGENCE</Link>
                <Link href="/careers" className="hover:text-[#1b17ff] transition-colors">CAREER</Link>
              </div>
            )}
            <Link 
              href="/apply" 
              className="flex items-center font-mono gap-2 text-xs font-bold bg-[#1b17ff] text-white px-4 py-3 rounded-lg hover:bg-[#1b17ff]/90 transition-all shadow-glow"
            >
              JOIN COHORT {"{"}ZERO{"}"} <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* --- RIGHT: MOBILE MENU TOGGLE --- */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden glass-panel p-3 rounded-lg text-white hover:bg-white/10 active:scale-95 transition-all z-50 relative"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

        </div>
      </nav>

      {/* --- MOBILE HUD MENU (The Dropdown) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-20 left-4 right-4 z-40 md:hidden"
          >
            <div className="glass-panel bg-[#0a1128]/95 backdrop-blur-2xl border border-[#1b17ff]/30 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              
              {/* Menu Label */}
              <div className="px-5 py-3 border-b border-white/5 flex justify-between items-center">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Navigation Protocol</span>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500/20" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500/20" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                </div>
              </div>

              {/* Links Grid */}
              <div className="p-2 grid gap-1">
                <MobileMenuItem href="/" icon={<Home size={16} />} label="Mission Control" sub="Home" onClick={handleLinkClick} />

                {/* Custom item so we can apply font-mono only to the label */}
                <Link
                  href="/research"
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 active:bg-[#1b17ff]/10 transition-colors group"
                  onClick={handleLinkClick}
                >
                  <div className="p-2.5 rounded-lg bg-white/5 text-gray-400 group-hover:text-[#1b17ff] group-hover:bg-[#1b17ff]/10 transition-colors">
                    <Terminal size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-200 group-hover:text-white leading-none mb-1 font-mono">
                      PRISM INTELLIGENCE
                    </div>
                    <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wide group-hover:text-[#1b17ff]/80">
                      Market Research & Reports
                    </div>
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowUpRight size={14} className="text-[#1b17ff]" />
                  </div>
                </Link>

                <MobileMenuItem href="/careers" icon={<Users size={16} />} label="Careers" sub="Open Roles" onClick={handleLinkClick} />
              </div>

              {/* Mobile CTA */}
              <div className="p-4 border-t border-white/5 bg-[#1b17ff]/5">
                <Link 
                  href="/apply"
                  className="flex w-full font-mono items-center justify-center gap-2 text-sm font-bold bg-[#1b17ff] text-white py-3.5 rounded-xl hover:bg-[#1b17ff]/90 transition-all shadow-lg shadow-[#1b17ff]/20"
                  onClick={handleLinkClick}
                >
                  JOIN COHORT {"{"}ZERO{"}"} <ArrowUpRight size={16} />
                </Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// --- SUB-COMPONENT: MOBILE MENU ITEM ---
function MobileMenuItem({ href, icon, label, sub, onClick }: { href: string, icon: React.ReactNode, label: string, sub: string, onClick?: () => void }) {
  return (
    <Link 
      href={href} 
      className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 active:bg-[#1b17ff]/10 transition-colors group"
      onClick={onClick}
    >
      <div className="p-2.5 rounded-lg bg-white/5 text-gray-400 group-hover:text-[#1b17ff] group-hover:bg-[#1b17ff]/10 transition-colors">
        {icon}
      </div>
      <div>
        <div className="text-sm font-bold text-gray-200 group-hover:text-white leading-none mb-1">
          {label}
        </div>
        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wide group-hover:text-[#1b17ff]/80">
          {sub}
        </div>
      </div>
      <div className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
        <ArrowUpRight size={14} className="text-[#1b17ff]" />
      </div>
    </Link>
  );
}
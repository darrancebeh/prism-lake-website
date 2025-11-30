"use client";

import Image from "next/image";
import Link from "next/link";
import { Link2, TrendingUp, ShieldCheck, ArrowRight, ArrowDown } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";

export function FounderSection() {
  return (
    <section className="py-20 md:py-24 px-4 max-w-5xl mx-auto">
      
      {/* Section Label */}
      <div className="flex items-center gap-4 mb-8 opacity-80">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#1b17ff]/50" />
        <span className="text-[#1b17ff] font-mono text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap">
          General Partner Dossier
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#1b17ff]/50" />
      </div>

      <SpotlightCard className="p-6 md:p-10 overflow-hidden bg-[#0a1128]/40 border-[#1b17ff]/20">
        
        {/* --- IDENTITY SECTION --- */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start mb-10">
          
          {/* IMAGE COLUMN */}
          <div className="shrink-0 relative group">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-2 border-[#1b17ff]/30 relative z-10 bg-[#020410] shadow-[0_0_30px_rgba(27,23,255,0.15)] group-hover:border-[#1b17ff] transition-all duration-500">
               <Image 
                 src="/images/darrancebeh2.jpg" 
                 alt="Darrance Beh"
                 width={200}
                 height={200}
                 className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
               />
            </div>
            {/* Active Status Badge */}
            <div className="absolute -bottom-4 -right-4 bg-[#0a1128] border border-[#1b17ff]/30 px-3 py-1.5 rounded-lg shadow-xl z-20 flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400"></span>
              </span>
              <span className="text-[10px] font-bold text-white font-mono uppercase tracking-wide">Online</span>
            </div>
          </div>

          {/* TEXT COLUMN */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Darrance Beh Heng Shek
            </h2>
            
            {/* Tags */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-3 mb-6">
              <span className="text-[#1b17ff] font-mono text-[10px] md:text-xs uppercase tracking-widest border-r border-white/10 pr-3">
                Founder & Chief Researcher
              </span>
              <span className="text-[10px] md:text-xs font-mono text-gray-500">Age: 20</span>
              <span className="text-[10px] md:text-xs font-mono text-gray-500 hidden md:inline">•</span>
              <span className="text-[10px] md:text-xs font-mono text-gray-500">BSc (Hons) Computer Science</span>
            </div>
            
            {/* --- JUSTIFIED BIO TEXT --- */}
            <p className="text-gray-300 leading-relaxed font-light text-sm md:text-base mb-6 text-justify hyphens-auto">
              A first-class Computer Science undergrad and active discretionary and quantitative investor-trader navigating the markets since 15 in 2020.
              He specializes in <span className="text-white font-medium">Game Theory, Statistical & Informational Arbitrage, and Econometrics</span>, and leverages on a background in <span className="text-white font-medium">Competitive Programming</span> and <span className="text-white font-medium"> State-Level Debating</span> to exploit market psychology.
            </p>

            <div className="flex flex-col md:flex-row items-center gap-4">
              <Link href="https://linkedin.com/in/darrancebeh" target="_blank" className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-[#1b17ff] transition-colors border-b border-white/10 pb-0.5 hover:border-[#1b17ff]">
                <Link2 size={14}/> CONNECT ON LINKEDIN
              </Link>
              <span className="hidden md:inline text-gray-700">|</span>
              <div className="text-xs text-gray-500 font-mono">
                Founder of 2 Fastest-Growing MY/SG Discord Servers
              </div>
            </div>
          </div>
        </div>

        {/* --- TRACK RECORD SECTION --- */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#1b17ff]/10 to-[#0a1128] border border-[#1b17ff]/30 p-6 md:p-8 overflow-hidden group">
          
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
            <TrendingUp size={120} className="text-[#1b17ff]" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* THE NUMBERS */}
            <div className="flex flex-col items-center md:items-start gap-4 w-full md:w-auto">
              <div className="flex items-center gap-2 text-[#1b17ff] font-mono text-xs uppercase tracking-widest mb-1">
                <ShieldCheck size={14} /> 
                Performance Audit (2020 - 2025)
              </div>

              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                <span className="text-4xl md:text-4xl font-bold text-white/60">RM 600</span>
                <ArrowDown size={24} className="text-[#1b17ff] animate-bounce md:hidden" />
                <ArrowRight size={24} className="text-[#1b17ff] animate-pulse hidden md:block" />
                <span className="text-5xl md:text-5xl font-bold text-white tracking-tight">6-Figures</span>
              </div>

              <div className="mt-2 w-full md:w-auto text-center md:text-left">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg text-xs text-green-400 font-mono font-bold">
                  <TrendingUp size={12} /> 59.8% CAGR (5 Years, RM400 AVG Monthly DCA)
                </span>
              </div>
            </div>

            {/* THE CONTEXT - JUSTIFIED */}
            <div className="text-center md:text-right max-w-sm pt-6 md:pt-0 border-t border-white/5 md:border-t-0 md:border-l md:pl-8">
              <p className="text-sm text-gray-300 font-light leading-relaxed text-justify md:text-right hyphens-auto">
                Achieved via <strong className="text-white">Discretionary & Quantitative Investing</strong> in US Equities & Digital Commodities since 2020.
              </p>
              <div className="mt-3 text-[10px] md:text-xs text-gray-500 font-mono bg-white/5 px-3 py-1.5 rounded inline-block text-justify md:text-right">
                Currently self-funding Sunway University tuition (~RM60k) purely through portfolio.
              </div>
            </div>

          </div>
        </div>

      </SpotlightCard>
    </section>
  );
}
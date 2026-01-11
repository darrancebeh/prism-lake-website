"use client";

import Link from "next/link";
import { ArrowRight, Cpu, ShieldCheck, TrendingUp } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

export function HeroSection() {
  return (
    <section className="relative flex flex-col justify-center min-h-[85vh] md:min-h-[90vh] px-4 md:px-12 pt-20 pb-16 md:pt-20 md:pb-20 overflow-hidden">
      
      <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24 items-start pt-2 md:pt-12">
        
        {/* --- LEFT COLUMN: HEADLINE & TITLE --- */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <FadeIn delay={0.1}>
            <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-9xl font-serif font-bold tracking-tighter text-white leading-[0.9]">
              Capital <br/>Meets<br />
              <span className="text-[#2563EB]">Conviction.</span>
            </h1>
          </FadeIn>
        </div>


        {/* --- RIGHT COLUMN: CONTEXT & ACTIONS --- */}
        <div className="lg:col-span-5 flex flex-col items-start text-left pt-2 lg:pt-4">
           <FadeIn delay={0.2}>
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 mb-6 md:mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1b17ff] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1b17ff]"></span>
                </span>
                <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                  KUALA LUMPUR — NEW YORK
                </span>
              </div>

              {/* Refined Bio - No longer a 'word dump' */}
              <div className="space-y-4 md:space-y-6 border-l border-white/10 pl-4 md:pl-6 mb-8 md:mb-10">
                <p className="text-lg md:text-xl text-white font-light leading-relaxed">
                  Prism Lake is a Kuala Lumpur-based quantitative research and trading firm specializing in <span className="text-white font-medium border-b border-[#1b17ff]/50 pb-0.5">systematic US equity</span> and <span className="text-white font-medium border-b border-[#1b17ff]/50 pb-0.5">options strategies.</span>
                </p>
                <p className="text-sm text-gray-400 leading-relaxed font-mono">
                  We bridge ASEAN intellectual capital with Wall Street volatility, engineering discretionary quantitative edges for private capital.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3 w-full">
                <Link 
                  href="/careers" 
                  className="group inline-flex items-center justify-between px-6 py-4 bg-white text-black font-medium text-sm rounded hover:bg-gray-200 transition-all"
                >
                  Join The Team
                  <ArrowRight className="w-4 h-4 group-hover:-rotate-45 transition-transform duration-300" />
                </Link>
                
                <Link 
                  href="#track-record" 
                  className="group inline-flex items-center justify-between px-6 py-4 border border-white/10 text-white font-medium text-sm rounded hover:bg-white/5 transition-all"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('track-record')?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }}
                >
                  Our Approach
                  <ArrowRight className="w-4 h-4 opacity-50 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
           </FadeIn>
        </div>

      </div>

      {/* --- FEATURE CARDS (Moved to footer of Hero) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mt-12 md:mt-24 w-full max-w-7xl mx-auto z-10 border-t border-white/5 pt-8 md:pt-12">
        <FadeIn delay={0.2} className="h-full">
          <SimpleCard 
            title="Quantitative"
            desc="We exploit market inefficiencies by leveraging proprietary data and systematic algorithms."
          />
        </FadeIn>
        <FadeIn delay={0.3} className="h-full">
          <SimpleCard 
            title="Partnership"
            desc="We deploy principal capital alongside our strategic partners, ensuring absolute alignment of risk and reward."
          />
        </FadeIn>
        <FadeIn delay={0.4} className="h-full">
          <SimpleCard 
            title="Research"
            desc="We engineer discretionary edges that bridge the gap between theory and market execution."
          />
        </FadeIn>
      </div>

    </section>
  );
}

// --- HELPER: Minimalist Text Card ---
function SimpleCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="group flex flex-col items-start">
      <h3 className="text-white font-medium text-lg mb-2 group-hover:text-[#1b17ff] transition-colors">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
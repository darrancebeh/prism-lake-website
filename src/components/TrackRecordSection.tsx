"use client";

import { Users, TrendingUp, ArrowUpRight, ShieldCheck, FileText, Globe } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

export function TrackRecordSection() {
  return (
    <section className="py-24 bg-[#050a1f] border-y border-[#1b17ff]/10 relative overflow-hidden" id="track-record">
      
      {/* Background Decor */}
      <div className="absolute left-0 top-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* 1. Header with Live Pulse */}
        <FadeIn className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-mono mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </span>
              SYSTEMS OPERATIONAL
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-sans text-white">
              Firm <span className="text-[#1b17ff]">Snapshot</span>.
            </h2>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-gray-400 text-sm font-mono">DATA AS OF Q4 2024</p>
            <p className="text-[#1b17ff] text-xs font-mono">AUDITED INTERNAL</p>
          </div>
        </FadeIn>

        {/* 2. The Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          {/* AUM / Capital Deployed */}
          <FadeIn delay={0.1} className="glass-panel p-6 rounded-2xl border-l-4 border-l-[#1b17ff]">
            <div className="flex justify-between items-start mb-2">
              <span className="text-gray-400 text-xs font-mono uppercase tracking-widest">Est. Notional</span>
              <ShieldCheck size={16} className="text-[#1b17ff]" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">&gt;30,000 USD</div>
            <div className="text-xs text-gray-500 font-mono">Proprietary Capital Deployed</div>
          </FadeIn>

          {/* Team Size (Cohort Zero) */}
          <FadeIn delay={0.2} className="glass-panel p-6 rounded-2xl border-l-4 border-l-cyan-500">
            <div className="flex justify-between items-start mb-2">
              <span className="text-gray-400 text-xs font-mono uppercase tracking-widest">The Team</span>
              <Users size={16} className="text-cyan-500" />
            </div>
            {/* "Cohort Zero" looks intentional and exclusive here */}
            <div className="text-2xl font-bold text-white mb-1 mt-1">Cohort Zero</div>
            <div className="text-xs text-gray-500 font-mono">Founding Partners (Recruiting)</div>
          </FadeIn>

          {/* Education / Reach */}
          <FadeIn delay={0.3} className="glass-panel p-6 rounded-2xl border-l-4 border-l-purple-500">
            <div className="flex justify-between items-start mb-2">
              <span className="text-gray-400 text-xs font-mono uppercase tracking-widest">Community Reach</span>
              <Globe size={16} className="text-purple-500" />
            </div>
            {/* Replace 150+ with your actual estimated number */}
            <div className="text-3xl font-bold text-white mb-1">150+</div>
            <div className="text-xs text-gray-500 font-mono">Workshop & Event Attendees</div>
          </FadeIn>

          {/* Research Output */}
          <FadeIn delay={0.4} className="glass-panel p-6 rounded-2xl border-l-4 border-l-green-500">
            <div className="flex justify-between items-start mb-2">
              <span className="text-gray-400 text-xs font-mono uppercase tracking-widest">Intelligence</span>
              <FileText size={16} className="text-green-500" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">&gt;13</div>
            <div className="text-xs text-gray-500 font-mono">Market Research & Memos Published</div>
          </FadeIn>
        </div>

        {/* 3. Performance Highlight Card */}
        <FadeIn delay={0.5}>
          <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden group">
            
            {/* Background Gradient */}
            <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#1b17ff]/10 to-transparent pointer-events-none" />

            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
              
              {/* Left: The Narrative */}
              <div>
                <h3 className="text-[#1b17ff] font-mono text-sm uppercase tracking-widest mb-2">Fiscal Year 2024</h3>
                <h4 className="text-4xl font-bold text-white mb-6">Outperforming the Benchmark.</h4>
                <p className="text-gray-400 leading-relaxed mb-8">
                  While the S&P 500 relies on passive flows, Prism Lake captures alpha through 
                  <span className="text-white font-medium"> Structural Inefficiencies</span>. 
                  Our volatility-first approach allowed us to profit during Q3 drawdowns where traditional portfolios bled.
                </p>
                
                {/* Comparison Stats */}
                <div className="flex gap-12 border-t border-white/10 pt-6">
                  <div>
                    <div className="text-gray-500 text-xs font-mono mb-1">PRISM LAKE (FY 2024)</div>
                    <div className="text-3xl font-bold text-green-400 flex items-center gap-2">
                      +69.56% <ArrowUpRight size={20} />
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs font-mono mb-1">S&P 500 (FY 2024)</div>
                    <div className="text-2xl font-bold text-gray-400 flex items-center gap-2">
                      +23.31% <TrendingUp size={18} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: The Visual "Alpha Gap" */}
              <div className="bg-[#020410] rounded-xl border border-white/10 p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                  <span className="text-xs font-mono text-gray-400">CUMULATIVE RETURN (FY 2024)</span>
                  <div className="flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1b17ff]"></span>
                    <span className="w-2 h-2 rounded-full bg-gray-600"></span>
                  </div>
                </div>
                
                {/* Simplified Bar Visualization */}
                <div className="space-y-4 font-mono text-xs">
                  <div className="flex items-center gap-4">
                    <span className="w-12 text-gray-500">PRISM</span>
                    <div className="flex-1 h-8 bg-[#1b17ff]/20 rounded relative overflow-hidden group-hover:bg-[#1b17ff]/30 transition-colors">
                      <div className="absolute top-0 left-0 h-full bg-[#1b17ff] w-[74.9%] rounded" />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#1b17ff] font-bold">69.56%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-12 text-gray-500">SPX</span>
                    <div className="flex-1 h-8 bg-gray-800 rounded relative overflow-hidden">
                      <div className="absolute top-0 left-0 h-full bg-gray-600 w-[25.1%] rounded" />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">23.31%</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 text-[10px] text-gray-500 text-center">
                  *Alpha generated via Volatility Arbitrage & Short Gamma strategies.
                </div>
              </div>

            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
"use client";

import { Users, TrendingUp, ArrowUpRight, ShieldCheck, FileText, Globe } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

export function TrackRecordSection() {
  return (
    <section className="py-20 md:py-24 bg-[#050a1f] border-y border-[#1b17ff]/10 relative overflow-hidden" id="track-record">
      
      {/* Background Decor */}
      <div className="absolute left-0 top-0 w-full h-full opacity-5 pointer-events-none bg-grid-pattern" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* 1. Header */}
        <FadeIn className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-[10px] md:text-xs font-mono mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </span>
              SYSTEMS OPERATIONAL
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-sans text-white">
              Firm <span className="text-[#1b17ff]">Snapshot</span>.
            </h2>
          </div>
          <div className="text-left md:text-right">
            <p className="text-gray-400 text-xs md:text-sm font-mono">DATA AS OF Q4 2024</p>
            <p className="text-[#1b17ff] text-[10px] md:text-xs font-mono">AUDITED INTERNAL</p>
          </div>
        </FadeIn>

        {/* 2. The Metrics Grid (Swipeable on Mobile) */}
        <div className="flex overflow-x-auto pb-6 -mx-4 px-4 md:grid md:grid-cols-4 md:overflow-visible md:pb-0 md:px-0 gap-4 mb-8 no-scrollbar snap-x snap-mandatory">
          
          <MetricCard 
            label="Est. Notional" 
            value=">30,000 USD" 
            sub="Proprietary Capital Deployed" 
            icon={<ShieldCheck size={16} className="text-[#1b17ff]" />} 
            borderColor="border-l-[#1b17ff]"
          />
          
          <MetricCard 
            label="The Team" 
            value="Cohort Zero" 
            sub="Founding Partners (Recruiting)" 
            icon={<Users size={16} className="text-cyan-500" />} 
            borderColor="border-l-cyan-500"
          />

          <MetricCard 
            label="Community Reach" 
            value="150+" 
            sub="Workshop & Event Attendees" 
            icon={<Globe size={16} className="text-purple-500" />} 
            borderColor="border-l-purple-500"
          />

          <MetricCard 
            label="Intelligence" 
            value=">13" 
            sub="Market Research & Memos" 
            icon={<FileText size={16} className="text-green-500" />} 
            borderColor="border-l-green-500"
          />
        </div>

        {/* 3. Performance Highlight Card */}
        <FadeIn delay={0.5}>
          <div className="glass-panel p-6 md:p-12 rounded-3xl relative overflow-hidden group border border-white/5 bg-[#0a1128]/60">
            
            {/* Background Gradient */}
            <div className="absolute top-0 right-0 w-full md:w-2/3 h-full bg-gradient-to-b md:bg-gradient-to-l from-[#1b17ff]/10 to-transparent pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center relative z-10">
              
              {/* Left: The Narrative */}
              <div>
                <h3 className="text-[#1b17ff] font-mono text-xs uppercase tracking-widest mb-3">Fiscal Year 2024</h3>
                <h4 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 leading-tight">
                  Outperforming the Benchmark.
                </h4>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-8 font-light">
                  Unlike passive benchmarks like the S&P500, Prism Lake generates returns through a carefully constructed and actively managed investment portfolio. We systematically allocate capital across US equities and options, employing discretionary quantitative models to drive strategy and capitalize on market movements.
                </p>
                
                {/* Mobile: Stacked Stats / Desktop: Side-by-Side */}
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 border-t border-white/10 pt-6">
                  <div>
                    <div className="text-gray-500 text-[10px] md:text-xs font-mono mb-1">PRISM LAKE (FY 2024)</div>
                    <div className="text-2xl md:text-3xl font-bold text-green-400 flex items-center gap-2">
                      +69.56% <ArrowUpRight size={20} />
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-[10px] md:text-xs font-mono mb-1">S&P 500 (FY 2024)</div>
                    <div className="text-xl md:text-2xl font-bold text-gray-400 flex items-center gap-2">
                      +23.31% <TrendingUp size={18} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: The Visual "Alpha Gap" */}
              <div className="bg-[#020410] rounded-xl border border-white/10 p-5 md:p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                  <span className="text-[10px] md:text-xs font-mono text-gray-400 uppercase">Cumulative Return (FY 2024)</span>
                  <div className="flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1b17ff]"></span>
                    <span className="w-2 h-2 rounded-full bg-gray-600"></span>
                  </div>
                </div>
                
                {/* Bar Visualization */}
                <div className="space-y-5 font-mono text-xs">
                  
                  {/* Prism Bar */}
                  <div>
                    <div className="flex justify-between text-gray-400 mb-1.5">
                      <span>PRISM LAKE</span>
                      <span className="text-[#1b17ff] font-bold">+69.56%</span>
                    </div>
                    <div className="h-6 md:h-8 bg-[#1b17ff]/10 rounded-full relative overflow-hidden w-full">
                      <div className="absolute top-0 left-0 h-full bg-[#1b17ff] w-[70%] rounded-full shadow-[0_0_15px_rgba(27,23,255,0.5)]" />
                    </div>
                  </div>

                  {/* SPX Bar */}
                  <div>
                    <div className="flex justify-between text-gray-500 mb-1.5">
                      <span>S&P 500</span>
                      <span>+23.31%</span>
                    </div>
                    <div className="h-6 md:h-8 bg-gray-800/50 rounded-full relative overflow-hidden w-full">
                      <div className="absolute top-0 left-0 h-full bg-gray-600 w-[23%] rounded-full" />
                    </div>
                  </div>

                </div>

                <div className="mt-6 pt-4 border-t border-white/5 text-[9px] text-gray-500 text-center leading-relaxed">
                  *Performance generated via active discretionary and quantitative strategies.
                </div>
              </div>

            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}

// Sub-component with proper types
interface MetricCardProps {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  borderColor: string;
}

function MetricCard({ label, value, sub, icon, borderColor }: MetricCardProps) {
  return (
    <FadeIn className={`glass-panel p-5 md:p-6 rounded-2xl border-l-4 ${borderColor} min-w-[260px] md:min-w-0 snap-center`}>
      <div className="flex justify-between items-start mb-3">
        <span className="text-gray-400 text-[10px] md:text-xs font-mono uppercase tracking-widest">{label}</span>
        {icon}
      </div>
      <div className="text-2xl md:text-3xl font-bold text-white mb-1 whitespace-nowrap">{value}</div>
      <div className="text-[10px] md:text-xs text-gray-500 font-mono leading-tight">{sub}</div>
    </FadeIn>
  );
}
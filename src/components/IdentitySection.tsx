import { Target, Lightbulb, TrendingUp, Users } from "lucide-react";

export function IdentitySection() {
  return (
    <section className="py-24 relative max-w-7xl mx-auto px-4">
      {/* Section Header */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold font-sans mb-4">
          The <span className="text-[#1b17ff]">Identity</span>.
        </h2>
        <div className="h-1 w-20 bg-[#1b17ff]" />
      </div>

      {/* The Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
        
        {/* 1. The Vision (Large Card) */}
        <div className="md:col-span-2 glass-panel p-8 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Target size={100} />
          </div>
          <h3 className="text-[#1b17ff] font-mono text-sm mb-2">THE VISION</h3>
          <h4 className="text-2xl font-bold mb-4">The "Jane Street" of Malaysia.</h4>
          <p className="text-gray-400 leading-relaxed max-w-lg">
            To establish Malaysia's premier <span className="text-white">Quantamental Proprietary Trading Firm</span>. 
            We envision a future where elite local talent fuses fundamental insight with 
            quantitative rigor to generate verified alpha in US markets.
          </p>
        </div>

        {/* 2. The Problem (Tall Card) */}
        <div className="md:row-span-2 glass-panel p-8 rounded-2xl flex flex-col justify-end relative bg-gradient-to-b from-transparent to-[#1b17ff]/10">
           <div className="absolute top-6 left-6 bg-[#0a1128] p-3 rounded-lg border border-[#1b17ff]/20">
            <Lightbulb className="text-[#1b17ff]" />
          </div>
          <h3 className="text-[#1b17ff] font-mono text-sm mb-2 mt-12">THE PROBLEM</h3>
          <h4 className="text-xl font-bold mb-4">The Talent Silo.</h4>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Finance students know "Value." CS students know "Code." <br/><br/>
            But modern markets demand <strong>Both</strong>.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Existing clubs teach outdated theory. We teach the reality of 
            <span className="text-white"> Market Microstructure</span> and <span className="text-white">Derivatives</span>.
          </p>
        </div>

        {/* 3. The Mission (Medium Card) */}
        <div className="glass-panel p-8 rounded-2xl">
          <h3 className="text-[#1b17ff] font-mono text-sm mb-2">THE MISSION</h3>
          <h4 className="text-xl font-bold mb-2">Bridge the Gap.</h4>
          <ul className="text-gray-400 text-sm space-y-2 mt-4">
            <li className="flex items-center gap-2">
              <TrendingUp size={16} className="text-[#1b17ff]" /> Engineer Alpha (Returns)
            </li>
            <li className="flex items-center gap-2">
              <Users size={16} className="text-[#1b17ff]" /> Build the Talent Engine
            </li>
            <li className="flex items-center gap-2">
              <div className="w-4 h-4 border border-[#1b17ff] rounded-sm flex items-center justify-center text-[10px] text-[#1b17ff]">G</div>
              Operate the "Glass Box"
            </li>
          </ul>
        </div>

        {/* 4. The Culture (Medium Card) */}
        <div className="glass-panel p-8 rounded-2xl border-[#1b17ff]/40">
           <h3 className="text-[#1b17ff] font-mono text-sm mb-2">THE CULTURE</h3>
           <h4 className="text-xl font-bold">Meritocracy.</h4>
           <p className="text-gray-400 text-sm mt-2">
             The best idea wins. Whether it comes from a 1st year student or the Founder.
           </p>
        </div>

      </div>
    </section>
  );
}
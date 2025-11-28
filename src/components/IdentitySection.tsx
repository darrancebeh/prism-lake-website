import { Target, Zap, Eye, Cpu, Globe, Layers, Award } from "lucide-react";

export function IdentitySection() {
  return (
    <section className="py-32 relative max-w-7xl mx-auto px-4">
      
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold font-sans mb-4">
            The <span className="text-[#1b17ff]">Identity</span>.
          </h2>
          <div className="h-1 w-20 bg-[#1b17ff]" />
        </div>
        <p className="text-gray-500 font-mono text-xs uppercase tracking-widest max-w-xs text-right">
          Defining the standard for student-led proprietary trading.
        </p>
      </div>

      {/* The Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
        
        {/* 1. THE VISION (Large Card - Top Left) */}
        <div className="md:col-span-2 glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Globe size={200} />
          </div>
          
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <h3 className="flex items-center gap-2 text-[#1b17ff] font-mono text-xs uppercase tracking-widest mb-4">
                <Target size={14} /> The Vision
              </h3>
              <h4 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                Malaysia&apos;s Premier <br/>
                <span className="text-[#1b17ff]">US-Market Powerhouse.</span>
              </h4>
            </div>
            
            <p className="text-gray-400 leading-relaxed max-w-lg text-sm md:text-base">
              We envision a self-sustaining institution where elite talent from 
              <span className="text-white font-medium"> Finance</span> and 
              <span className="text-white font-medium"> Technology</span> converge. 
              Our goal is to build a localized firm operating with the sophistication of a global hedge fund—fusing deep fundamental research with quantitative expertise.
            </p>
          </div>
        </div>

        {/* 2. THE OBJECTIVES (Tall Card - Right Column) */}
        <div className="md:row-span-2 glass-panel p-8 rounded-3xl flex flex-col relative overflow-hidden bg-gradient-to-b from-[#0a1128] to-[#020410] border border-[#1b17ff]/20">
          
          <h3 className="flex items-center gap-2 text-[#1b17ff] font-mono text-xs uppercase tracking-widest mb-8">
            <Layers size={14} /> Core Objectives
          </h3>

          <div className="space-y-8 flex-grow">
            {/* Objective A: Performance */}
            <div className="group/item">
              <div className="flex items-center gap-3 mb-2 text-white font-bold group-hover/item:text-[#1b17ff] transition-colors">
                <div className="p-2 bg-[#1b17ff]/10 rounded-lg border border-[#1b17ff]/20"><Zap size={18} /></div>
                Performance
              </div>
              <p className="text-xs text-gray-400 leading-relaxed pl-12 border-l border-white/5 ml-4">
                To deploy proprietary capital into the capital markets using a hybrid approach combining high-conviction fundamental theses (Finance) with data-driven execution and risk management (Quant).
              </p>
            </div>

            {/* Objective B: Transparency */}
            <div className="group/item">
              <div className="flex items-center gap-3 mb-2 text-white font-bold group-hover/item:text-[#1b17ff] transition-colors">
                <div className="p-2 bg-[#1b17ff]/10 rounded-lg border border-[#1b17ff]/20"><Eye size={18} /></div>
                Transparency
              </div>
              <p className="text-xs text-gray-400 leading-relaxed pl-12 border-l border-white/5 ml-4">
                To dismantle the opacity of traditional finance by publicly documenting our research, logic, and performance and establishing a new standard of trust and accountability in the ecosystem.
              </p>
            </div>

            {/* Objective C: Innovation */}
            <div className="group/item">
              <div className="flex items-center gap-3 mb-2 text-white font-bold group-hover/item:text-[#1b17ff] transition-colors">
                <div className="p-2 bg-[#1b17ff]/10 rounded-lg border border-[#1b17ff]/20"><Cpu size={18} /></div>
                Innovation
              </div>
              <p className="text-xs text-gray-400 leading-relaxed pl-12 border-l border-white/5 ml-4">
                To cultivate a high-performance environment where talented analysts and researchers converge and drive groundbreaking innovation and superior results.
              </p>
            </div>
          </div>
        </div>

        {/* 3. THE MISSION (Medium Card - Bottom Left) */}
        <div className="glass-panel p-8 rounded-3xl flex flex-col justify-center border-l-4 border-l-[#1b17ff]">
          <h3 className="text-[#1b17ff] font-mono text-xs uppercase tracking-widest mb-3">The Mission</h3>
          <h4 className="text-xl font-bold text-white mb-2">Bridge Theory & Reality.</h4>
          <p className="text-gray-400 text-xs leading-relaxed">
            To prove that a localized firm can execute at a global standard through the application of proprietary capital and radical transparency.
          </p>
        </div>

        {/* 4. THE CULTURE (Medium Card - Bottom Middle) */}
        <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-[#1b17ff] to-transparent opacity-50" />
          
          <h3 className="flex items-center gap-2 text-[#1b17ff] font-mono text-xs uppercase tracking-widest mb-4">
            <Award size={14} /> The Culture
          </h3>
          <h4 className="text-2xl font-bold text-white mb-2">Meritocracy & Adhocracy.</h4>
          <p className="text-gray-400 text-xs leading-relaxed mt-2">
            <strong>The best idea wins.</strong> Whether it comes from a 1st year analyst or the Founder. 
            We operate with fluid structures to solve hard problems fast.
          </p>
        </div>

      </div>
    </section>
  );
}
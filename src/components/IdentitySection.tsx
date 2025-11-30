"use client";

import { useState } from "react";
import { Target, Zap, Eye, Cpu, Globe, Layers, Award, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function IdentitySection() {
  return (
    <section className="py-20 md:py-32 relative max-w-7xl mx-auto px-4">
      
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold font-sans mb-4">
            The <span className="text-[#1b17ff]">Identity</span>.
          </h2>
          <div className="h-1 w-20 bg-[#1b17ff]" />
        </div>
        <p className="text-gray-500 font-mono text-xs uppercase tracking-widest max-w-xs text-left md:text-right">
          Defining the standard for quantitive research & proprietary trading. In Malaysia.
        </p>
      </div>

      {/* --- MOBILE LAYOUT (Stack & Accordions) --- */}
      <div className="flex flex-col gap-6 md:hidden">
        
        {/* 1. Mobile Vision Card */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Globe size={100} />
          </div>
          <h3 className="flex items-center gap-2 text-[#1b17ff] font-mono text-xs uppercase tracking-widest mb-3">
            <Target size={14} /> The Vision
          </h3>
          <h4 className="text-2xl font-bold text-white mb-4 leading-tight">
            Malaysia&apos;s Premier <br/>
            <span className="text-[#1b17ff]">US-Market Powerhouse.</span>
          </h4>
          <p className="text-gray-400 text-sm leading-relaxed">
            We envision a self-sustaining institution where elite talent from  
            <span className="text-white font-medium"> Finance</span> and <span className="text-white font-medium"> Technology</span> converge. Our goal is to build a localized firm operating with the sophistication of a global hedge fund.
          </p>
        </div>

        {/* 2. Mobile Objectives Accordion */}
        <div className="glass-panel p-1 rounded-2xl border border-[#1b17ff]/20">
          <div className="px-5 py-4 border-b border-white/5">
            <h3 className="flex items-center gap-2 text-[#1b17ff] font-mono text-xs uppercase tracking-widest">
              <Layers size={14} /> Core Objectives
            </h3>
          </div>
          
          <div className="flex flex-col">
            <MobileAccordionItem 
              icon={<Zap size={16} />} 
              title="Performance" 
              desc="To generate superior risk-adjusted returns by leveraging advanced quantitative research to capitalize on market inefficiencies."
            />
            <MobileAccordionItem 
              icon={<Eye size={16} />} 
              title="Transparency" 
              desc="To build trust and accountability by operating with radical transparency. We document our research, logic, and performance to establish a new standard of trust."
            />
            <MobileAccordionItem 
              icon={<Cpu size={16} />} 
              title="Innovation" 
              desc="To push boundaries by cultivating a high-performance environment where analysts and researchers drive groundbreaking innovation."
              isLast
            />
          </div>
        </div>

        {/* 3. Mobile Mission & Culture (Compact Grid) */}
        <div className="grid grid-cols-1 gap-4">
          <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-[#1b17ff]">
            <h3 className="text-[#1b17ff] font-mono text-xs uppercase tracking-widest mb-2">The Mission</h3>
            <p className="text-white font-bold text-lg leading-tight">
              To Be at the Forefront of Quantitative Research and Market Intelligence Across Global Markets. <br/>
              <span className="text-gray-500 text-sm">Based In Malaysia.</span>
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="flex items-center gap-2 text-[#1b17ff] font-mono text-xs uppercase tracking-widest mb-2">
              <Award size={14} /> The Culture
            </h3>
            <h4 className="text-xl font-bold text-white mb-2">Meritocracy & Adhocracy.</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Impact is determined by <strong>quality of thought</strong>, not seniority.
            </p>
          </div>
        </div>

      </div>

      {/* --- DESKTOP LAYOUT (Bento Grid) --- */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-[600px]">
        
        {/* 1. THE VISION */}
        <div className="md:col-span-2 glass-panel p-10 rounded-3xl relative overflow-hidden group flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Globe size={200} />
          </div>
          <div className="relative z-10">
            <h3 className="flex items-center gap-2 text-[#1b17ff] font-mono text-xs uppercase tracking-widest mb-4">
              <Target size={14} /> The Vision
            </h3>
            <h4 className="text-4xl font-bold text-white mb-6 leading-tight">
              Malaysia&apos;s Premier <br/>
              <span className="text-[#1b17ff]">US-Market Powerhouse.</span>
            </h4>
            <p className="text-gray-400 leading-relaxed max-w-lg text-base">
              We envision a self-sustaining institution where elite talent from 
              <span className="text-white font-medium"> Finance</span> and 
              <span className="text-white font-medium"> Technology</span> converge. 
              Our goal is to build a localized firm operating with the sophistication of a global hedge fund.
            </p>
          </div>
        </div>

        {/* 2. THE OBJECTIVES */}
        <div className="md:row-span-2 glass-panel p-8 rounded-3xl flex flex-col relative overflow-hidden bg-gradient-to-b from-[#0a1128] to-[#020410] border border-[#1b17ff]/20">
          <h3 className="flex items-center gap-2 text-[#1b17ff] font-mono text-xs uppercase tracking-widest mb-8">
            <Layers size={14} /> Core Objectives
          </h3>
          <div className="space-y-8 flex-grow">
            <DesktopObjectiveItem icon={<Zap size={18} />} title="Performance">
              To generate superior, sustainable risk-adjusted returns by leveraging advanced quantitative research.
            </DesktopObjectiveItem>
            <DesktopObjectiveItem icon={<Eye size={18} />} title="Transparency">
              To build trust by publicly documenting our research, logic, and performance metrics.
            </DesktopObjectiveItem>
            <DesktopObjectiveItem icon={<Cpu size={18} />} title="Innovation">
              To continuously push boundaries by cultivating an environment where finance meets machine precision.
            </DesktopObjectiveItem>
          </div>
        </div>

        {/* 3. THE MISSION */}
        <div className="glass-panel p-8 rounded-3xl flex flex-col justify-center border-l-4 border-l-[#1b17ff]">
          <h3 className="text-[#1b17ff] font-mono text-xs uppercase tracking-widest mb-3">The Mission</h3>
          <h4 className="text-xl font-bold text-white mb-2">
            To Be at the Forefront of Quantitative Research across Global Markets. <span className="text-gray-500">Based In Malaysia.</span>
          </h4>
        </div>

        {/* 4. THE CULTURE */}
        <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-[#1b17ff] to-transparent opacity-50" />
          <h3 className="flex items-center gap-2 text-[#1b17ff] font-mono text-xs uppercase tracking-widest mb-4">
            <Award size={14} /> The Culture
          </h3>
          <h4 className="text-2xl font-bold text-white mb-2">Meritocracy & Adhocracy.</h4>
          <p className="text-gray-400 text-sm leading-relaxed mt-2">
            Impact is determined by the <strong>quality of thought,</strong> not seniority. We foster fluid structures to solve hard problems at speed.
          </p>
        </div>

      </div>
    </section>
  );
}

// --- SUB-COMPONENTS ---

function MobileAccordionItem({ icon, title, desc, isLast }: { icon: React.ReactNode, title: string, desc: string, isLast?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`overflow-hidden ${!isLast ? 'border-b border-white/5' : ''}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3 font-bold text-white text-sm">
          <div className={`p-1.5 rounded-lg border border-[#1b17ff]/20 ${isOpen ? 'bg-[#1b17ff] text-white' : 'bg-[#1b17ff]/10 text-[#1b17ff]'}`}>
            {icon}
          </div>
          {title}
        </div>
        <ChevronDown size={16} className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-5 pb-5 pl-14 text-xs text-gray-400 leading-relaxed">
              {desc}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DesktopObjectiveItem({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) {
  return (
    <div className="group/item">
      <div className="flex items-center gap-3 mb-2 text-white font-bold group-hover/item:text-[#1b17ff] transition-colors">
        <div className="p-2 bg-[#1b17ff]/10 rounded-lg border border-[#1b17ff]/20">{icon}</div>
        {title}
      </div>
      <p className="text-xs text-gray-400 leading-relaxed pl-12 border-l border-white/5 ml-4">
        {children}
      </p>
    </div>
  );
}
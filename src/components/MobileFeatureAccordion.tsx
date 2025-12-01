"use client"; // This component handles state, so it must be Client

import { useState } from "react";
import { Cpu, ShieldCheck, TrendingUp, ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function MobileFeatureAccordion() {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  const features = [
    {
      icon: <Cpu size={18} />,
      title: "Quantitative",
      desc: "We combine traditional market analysis with statistical expertise and algorithmic execution."
    },
    {
      icon: <ShieldCheck size={18} />,
      title: "Proprietary",
      desc: "We deploy proprietary, principal capital to capture market opportunities. We do not manage external client funds."
    },
    {
      icon: <TrendingUp size={18} />,
      title: "Research",
      desc: "We actively conduct and publish our research, sharing institutional-grade analysis and market research."
    }
  ];

  return (
    <div className="flex flex-col gap-3">
      {features.map((item, idx) => {
        const isActive = activeIdx === idx;
        return (
          <div 
            key={idx}
            onClick={() => setActiveIdx(isActive ? null : idx)}
            className={`
              relative overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer
              ${isActive 
                ? 'bg-[#1b17ff]/10 border-[#1b17ff] shadow-[0_0_20px_rgba(27,23,255,0.15)]' 
                : 'bg-[#0a1128]/60 border-white/5 hover:border-white/10'
              }
            `}
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className={`
                  p-2 rounded-lg transition-colors
                  ${isActive ? 'bg-[#1b17ff] text-white' : 'bg-[#1b17ff]/10 text-[#1b17ff]'}
                `}>
                  {item.icon}
                </div>
                <span className={`font-bold text-lg tracking-tight font-mono ${isActive ? 'text-white' : 'text-gray-400'}`}>
                  {item.title}
                </span>
              </div>
              
              <div className={`transition-transform duration-300 ${isActive ? 'rotate-180 text-[#1b17ff]' : 'text-gray-600'}`}>
                {isActive ? <ChevronDown size={20} /> : <ArrowRight size={18} />}
              </div>
            </div>

            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-4 pb-5 pl-[4.5rem] text-sm text-gray-300 font-light leading-relaxed border-t border-[#1b17ff]/10 pt-3 mt-1 font-mono">
                    {item.desc}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Cpu, ShieldCheck, TrendingUp, Link2, Terminal, Mic2, Users, ChevronDown, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Components
import { FadeIn } from "@/components/FadeIn";
import { PartnersSection } from "@/components/PartnersSection";
import { IdentitySection } from "@/components/IdentitySection";
import { TrackRecordSection } from "@/components/TrackRecordSection";
import { ResearchSection } from "@/components/ResearchSection";
import { SpotlightCard } from "@/components/SpotlightCard";

export default function Home() {
  return (
    <div className="overflow-hidden">
      
{/* --- HERO SECTION --- */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 pt-20 pb-20 md:pt-10">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#1b17ff] opacity-15 blur-[100px] md:blur-[150px] rounded-full pointer-events-none" />

        <FadeIn delay={0.1} className="flex flex-col items-center z-10 w-full max-w-5xl">
          
          {/* Status Badge */}
          <div className="glass-panel px-3 py-1.5 md:px-4 rounded-full text-[10px] md:text-xs font-mono text-[#1b17ff] mb-6 md:mb-8 flex items-center gap-2 border-[#1b17ff]/30 shadow-[0_0_15px_rgba(27,23,255,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1b17ff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1b17ff]"></span>
            </span>
            <span className="tracking-widest font-bold whitespace-nowrap">COHORT ZERO: APPLICATIONS OPEN</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold text-center tracking-tighter mb-4 md:mb-6 leading-[0.95] md:leading-[0.9]">
            WE TRADE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-[#1b17ff]/80">
              REALITY.
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-sm md:text-xl text-gray-400 text-center max-w-2xl mb-8 md:mb-10 leading-relaxed font-light px-4">
            Prism Lake is a student-founded, and Malaysia&apos;s first <span className="text-white font-medium">Quantitative Research & Proprietary Trading Firm</span>.
            We deploy our proprietary capital into US Equities & Derivatives using institutional-grade research.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6 sm:px-0">
            <Link 
              href="/apply" 
              className="w-full sm:w-auto px-8 py-4 bg-[#1b17ff] text-white font-bold rounded-lg hover:bg-[#1b17ff]/90 hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(27,23,255,0.4)] text-sm md:text-base"
            >
              Join The Founding Cohort
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <Link 
              href="/#track-record" 
              className="w-full sm:w-auto px-8 py-4 glass-panel text-white font-medium rounded-lg hover:bg-white/5 transition-all flex items-center justify-center text-sm md:text-base"
            >
              View Track Record
            </Link>
          </div>
        </FadeIn>

        {/* --- FEATURE GRID (RESPONSIVE SWITCH) --- */}
        
        {/* 1. DESKTOP: Standard Grid (Hidden on Mobile) */}
        <div className="hidden md:grid grid-cols-3 gap-6 mt-24 w-full max-w-6xl z-10">
          <FadeIn delay={0.2} className="h-full">
            <Card 
              icon={<Cpu className="w-6 h-6 text-[#1b17ff]" />}
              title="Quantitative"
              desc="We combine traditional market analysis, with statistical and quantitative expertise and algorithmic execution."
            />
          </FadeIn>
          <FadeIn delay={0.3} className="h-full">
            <Card 
              icon={<ShieldCheck className="w-6 h-6 text-[#1b17ff]" />}
              title="Proprietary"
              desc="We deploy proprietary, principal capital to capture market opportunities. We do not manage external client funds."
            />
          </FadeIn>
          <FadeIn delay={0.4} className="h-full">
            <Card 
              icon={<TrendingUp className="w-6 h-6 text-[#1b17ff]" />}
              title="Research"
              desc="We actively conduct and publish our research, sharing institutional-grade analysis and market research."
            />
          </FadeIn>
        </div>

        {/* 2. MOBILE: Interactive Accordion Stack (Hidden on Desktop) */}
        <div className="md:hidden mt-16 w-full max-w-lg z-10 flex flex-col gap-3 px-2">
          <MobileFeatureAccordion />
        </div>

      </section>

      {/* --- SECTIONS STACK --- */}
      
      {/* 1. Partners / Infrastructure */}
      <FadeIn>
        <PartnersSection />
      </FadeIn>

      {/* 2. Identity (Vision/Mission) */}
      <FadeIn>
        <IdentitySection />
      </FadeIn>

      {/* 3. Track Record */}
      <FadeIn id="track-record">
        <TrackRecordSection />
      </FadeIn>

      {/* 4. Founder Dossier */}
      <FadeIn>
        <FounderSection />
      </FadeIn>

      {/* 5. Research Feed */}
      <FadeIn>
        <ResearchSection />
      </FadeIn>
      
      {/* 6. Final CTA Footer */}
      <section className="py-32 text-center relative z-10">
        <FadeIn>
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to build the future?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            We are looking for the obsessive few. If you dream in Python and Volatility, we have a desk for you.
          </p>
          <Link href="/careers" className="inline-flex px-10 py-4 border border-[#1b17ff] text-[#1b17ff] hover:bg-[#1b17ff] hover:text-white transition-all rounded-lg font-bold tracking-wide">
             VIEW OPEN ROLES
          </Link>
        </FadeIn>
      </section>

    </div>
  );
}

// --- MOBILE COMPONENT: FEATURE ACCORDION ---
function MobileFeatureAccordion() {
  // Default to 0 (Quantitative) being open so the UI isn't empty
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
            {/* Header Row */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className={`
                  p-2 rounded-lg transition-colors
                  ${isActive ? 'bg-[#1b17ff] text-white' : 'bg-[#1b17ff]/10 text-[#1b17ff]'}
                `}>
                  {item.icon}
                </div>
                <span className={`font-bold text-lg tracking-tight ${isActive ? 'text-white' : 'text-gray-400'}`}>
                  {item.title}
                </span>
              </div>
              
              {/* Animated Plus/Minus Icon */}
              <div className={`transition-transform duration-300 ${isActive ? 'rotate-180 text-[#1b17ff]' : 'text-gray-600'}`}>
                {isActive ? <ChevronDown size={20} /> : <ArrowRight size={18} />}
              </div>
            </div>

            {/* Expandable Content */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-4 pb-5 pl-[4.5rem] text-sm text-gray-300 font-light leading-relaxed border-t border-[#1b17ff]/10 pt-3 mt-1">
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

// --- HELPER COMPONENT: FOUNDER SECTION ---
function FounderSection() {
  return (
    <section className="py-24 px-4 max-w-5xl mx-auto">
      
      {/* Section Label */}
      <div className="flex items-center gap-4 mb-8 opacity-80">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#1b17ff]/50" />
        <span className="text-[#1b17ff] font-mono text-xs uppercase tracking-widest">General Partner Dossier</span>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#1b17ff]/50" />
      </div>

      <SpotlightCard className="p-8 md:p-10 overflow-hidden bg-[#0a1128]/40 border-[#1b17ff]/20">
        
        {/* TOP ROW: Identity & Bio */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start mb-10">
          
          {/* IMAGE COLUMN (Fixed Width) */}
          <div className="shrink-0 relative group mx-auto md:mx-0">
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
              <span className="text-[10px] font-bold text-white font-mono uppercase">Online</span>
            </div>
          </div>

          {/* TEXT COLUMN (Fills remaining space) */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl font-bold text-white tracking-tight mb-2">Darrance Beh Heng Shek</h2>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
              <span className="text-[#1b17ff] font-mono text-xs uppercase tracking-widest border-r border-white/10 pr-3">
                Founder & Chief Researcher
              </span>
              <span className="text-xs font-mono text-gray-500">Age: 20</span>
              <span className="text-xs font-mono text-gray-500">•</span>
              <span className="text-xs font-mono text-gray-500">BSc (Hons) in Computer Science</span>
            </div>
            
            <p className="text-gray-300 leading-relaxed font-light text-sm md:text-base mb-6">
              A first-class Computer Science undergrad and active discretionary and quantitative investor-trader navigating the markets since 15 in 2020.
              He specializes in <span className="text-white font-medium">Game Theory, Statistical & Informational Arbitrage, and Econometrics</span>, and leverages on a background in <span className="text-white font-medium">Competitive Programming</span> and 
              <span className="text-white font-medium"> State-Level Debating</span> to exploit market psychology.
            </p>

            {/* Socials / Secondary Stats */}
            <div className="flex items-center justify-center md:justify-start gap-4">
              <a href="https://linkedin.com/in/darrancebeh" target="_blank" className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-[#1b17ff] transition-colors">
                <Link2 size={14}/> LINKEDIN
              </a>
              <div className="h-4 w-[1px] bg-white/10" />
              <div className="text-xs text-gray-500 font-mono">
                Founder of 2 Fastest-Growing MY/SG Discord Servers
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: The "Alpha" Box (Full Width) */}
        <div className="relative rounded-xl bg-gradient-to-r from-[#1b17ff]/10 to-[#0a1128] border border-[#1b17ff]/30 p-6 md:p-8 overflow-hidden group">
          
          {/* Background Highlight */}
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp size={100} className="text-[#1b17ff]" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* The Numbers */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2 text-[#1b17ff] font-mono text-xs uppercase tracking-widest mb-1">
                <ShieldCheck size={14} /> 
                Performance Audit (2020 - 2025)
              </div>
              <div className="flex items-center gap-4">
                <span className="text-3xl md:text-4xl font-bold text-white/60">RM 600</span>
                <ArrowRight size={24} className="text-[#1b17ff] animate-pulse" />
                <span className="text-4xl md:text-5xl font-bold text-white">6-Figures</span>
              </div>
              <div className="mt-2 inline-flex items-center gap-2 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded text-[10px] text-green-400 font-mono">
                <TrendingUp size={10} /> 59.8% CAGR (5 Years, RM400 AVG Monthly DCA)
              </div>
            </div>

            {/* The Context */}
            <div className="text-center md:text-right max-w-sm">
              <p className="text-sm text-gray-300 font-light leading-relaxed">
                Achieved via <strong className="text-white">Discretionary & Quantitative Investing</strong> in US Equities & Digital Commodities since 2020.
              </p>
              <div className="mt-3 text-xs text-gray-500 font-mono border-t border-white/5 pt-3 inline-block">
                Currently self-funding Sunway University tuition (~RM60k) purely through portfolio.
              </div>
            </div>

          </div>
        </div>

      </SpotlightCard>
    </section>
  );
}

// --- HELPER COMPONENT: CARD ---
function Card({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="group glass-panel p-8 rounded-2xl hover:border-[#1b17ff] transition-all duration-300 hover:-translate-y-1 relative overflow-hidden h-full">
      {/* Hover Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1b17ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      <div className="relative z-10">
        <div className="mb-6 bg-[#0a1128] w-12 h-12 flex items-center justify-center rounded-xl border border-[#1b17ff]/20 group-hover:shadow-[0_0_15px_rgba(27,23,255,0.3)] transition-all">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-3 font-sans tracking-tight">{title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed font-mono">{desc}</p>
      </div>
    </div>
  );
}
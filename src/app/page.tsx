// REMOVED "use client" - This is now a Server Component
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Cpu, ShieldCheck, TrendingUp, Link2, Terminal, Mic2, Users } from "lucide-react";

// Components
import { FadeIn } from "@/components/FadeIn";
import { PartnersSection } from "@/components/PartnersSection";
import { IdentitySection } from "@/components/IdentitySection";
import { TrackRecordSection } from "@/components/TrackRecordSection";
import { ResearchSection } from "@/components/ResearchSection";
import { SpotlightCard } from "@/components/SpotlightCard";
import { MobileFeatureAccordion } from "@/components/MobileFeatureAccordion";
import { FounderSection } from "@/components/FounderSection";

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
        <div className="md:hidden mt-16 w-full max-w-lg z-10 px-2">
          {/* Using the extracted client component */}
          <MobileFeatureAccordion />
        </div>

      </section>

      {/* --- SECTIONS STACK --- */}
      <FadeIn><PartnersSection /></FadeIn>
      <FadeIn><IdentitySection /></FadeIn>
      <FadeIn id="track-record"><TrackRecordSection /></FadeIn>
      <FadeIn><FounderSection /></FadeIn>
      
      {/* This async component will now work because page.tsx is a Server Component */}
      <FadeIn><ResearchSection /></FadeIn>
      
      {/* 6. Final CTA Footer */}
      <section className="py-20 md:py-32 text-center relative z-10 px-4">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to build the future?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto text-sm md:text-base">
            We are looking for the obsessive few. If you dream in Python and Volatility, we have a desk for you.
          </p>
          <Link href="/careers" className="inline-flex px-10 py-4 border border-[#1b17ff] text-[#1b17ff] hover:bg-[#1b17ff] hover:text-white transition-all rounded-lg font-bold tracking-wide text-sm md:text-base">
             VIEW OPEN ROLES
          </Link>
        </FadeIn>
      </section>

    </div>
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
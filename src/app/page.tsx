import Link from "next/link";
import { ArrowRight, Cpu, ShieldCheck, TrendingUp } from "lucide-react";

// Components
import { FadeIn } from "@/components/FadeIn";
import { PartnersSection } from "@/components/PartnersSection";
import { IdentitySection } from "@/components/IdentitySection";
import { TrackRecordSection } from "@/components/TrackRecordSection";
import { ResearchSection } from "@/components/ResearchSection";

export default function Home() {
  return (
    <div className="overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 pt-10 pb-20">
        
        {/* Background Ambient Glow (The "Heartbeat") */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1b17ff] opacity-10 blur-[150px] rounded-full pointer-events-none" />

        <FadeIn delay={0.1} className="flex flex-col items-center z-10">
          
          {/* Status Badge */}
          <div className="glass-panel px-4 py-1.5 rounded-full text-xs font-mono text-[#1b17ff] mb-8 flex items-center gap-2 border-[#1b17ff]/30 shadow-[0_0_15px_rgba(27,23,255,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1b17ff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1b17ff]"></span>
            </span>
            <span className="tracking-widest font-bold">COHORT ZERO: APPLICATIONS OPEN</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-8xl font-bold text-center tracking-tighter mb-6 max-w-5xl leading-[0.9]">
            WE TRADE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-[#1b17ff]/80">
              REALITY.
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-gray-400 text-center max-w-2xl mb-10 leading-relaxed font-light">
            Prism Lake is a student-led, and Malaysia&apos;s first <span className="text-white font-medium">Quantitative Research & Proprietary Trading Firm</span>.
            We deploy proprietary capital into US Equities & Derivatives using institutional-grade math.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              href="/apply" 
              target="_blank"
              className="px-8 py-4 bg-[#1b17ff] text-white font-bold rounded-lg hover:bg-[#1b17ff]/90 hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(27,23,255,0.4)]"
            >
              Join The Founding Cohort
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <Link 
              href="/#track-record" 
              className="px-8 py-4 glass-panel text-white font-medium rounded-lg hover:bg-white/5 transition-all flex items-center justify-center"
            >
              View Track Record
            </Link>
          </div>
        </FadeIn>

        {/* Feature Grid (The "Why Us") */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full max-w-6xl z-10">
          <FadeIn delay={0.2} className="h-full">
            <Card 
              icon={<Cpu className="w-6 h-6 text-[#1b17ff]" />}
              title="Algorithmic Execution"
              desc="Automated Python pipelines executing volatility strategies on US Options."
            />
          </FadeIn>
          <FadeIn delay={0.3} className="h-full">
            <Card 
              icon={<ShieldCheck className="w-6 h-6 text-[#1b17ff]" />}
              title="Proprietary Capital"
              desc="We trade our own skin in the game. No client funds. No simulations."
            />
          </FadeIn>
          <FadeIn delay={0.4} className="h-full">
            <Card 
              icon={<TrendingUp className="w-6 h-6 text-[#1b17ff]" />}
              title="Glass Box Research"
              desc="We publish our logic. 100% transparency on wins, losses, and models."
            />
          </FadeIn>
        </div>

      </section>

      {/* --- SECTIONS STACK --- */}
      
      {/* 1. Partners Ticker */}
      <FadeIn>
        <PartnersSection />
      </FadeIn>

      {/* 2. Identity (Vision/Mission Bento Grid) */}
      <FadeIn>
        <IdentitySection />
      </FadeIn>

      {/* 3. Track Record (Interactive Chart) */}
      <FadeIn id="track-record">
        <TrackRecordSection />
      </FadeIn>
      
      {/* 4. Research Feed (Local MDX Files) */}
      <FadeIn>
        <ResearchSection />
      </FadeIn>
      
      {/* 5. Final CTA Footer */}
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

// --- HELPER COMPONENT (Internal Card) ---
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
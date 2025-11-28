import Link from "next/link";
import { ArrowRight, Terminal, TrendingUp, ShieldCheck, Cpu } from "lucide-react";
import { IdentitySection } from "@/components/IdentitySection";
import { TrackRecordSection } from "@/components/TrackRecordSection";
import { PartnersSection } from "@/components/PartnersSection";
import { ResearchSection } from "@/components/ResearchSection";

export default function Home() {
  return (
    <main>
      {/* 1. HERO SECTION (Keep the previous code here, or extract to HeroSection.tsx) */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden pt-20">
         {/* ... (Paste your Hero Code from previous response here) ... */}
         {/* ... Or better yet, move the Hero code to components/HeroSection.tsx and import it ... */}
         
         {/* For brevity, I assume you have the hero code here */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1b17ff] opacity-10 blur-[150px] rounded-full pointer-events-none" />
         <div className="glass-panel px-4 py-1.5 rounded-full text-xs font-mono text-[#1b17ff] mb-8 flex items-center gap-2 border-[#1b17ff]/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1b17ff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1b17ff]"></span>
            </span>
            <span className="tracking-widest font-bold">COHORT ZERO: APPLICATIONS OPEN</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-bold text-center tracking-tighter mb-6 z-10 max-w-5xl">
            WE TRADE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-[#1b17ff]/80">
              REALITY.
            </span>
          </h1>
          {/* ... CTA Buttons ... */}
          <div className="flex flex-col sm:flex-row gap-4 z-10 w-full sm:w-auto mt-8">
            <Link href="https://forms.gle/hLKy96cNe7e5atUDA" target="_blank" className="px-8 py-4 bg-[#1b17ff] text-white font-bold rounded-lg hover:bg-[#1b17ff]/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(27,23,255,0.4)]">
              Join The Founding Cohort <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
      </div>

      {/* 2. PARTNERS SECTION */}
      <PartnersSection />

      {/* 3. IDENTITY SECTION (Vision/Mission) */}
      <IdentitySection />

      {/* 4. TRACK RECORD SECTION (Charts) */}
      <TrackRecordSection />

      <ResearchSection />
      
      {/* 5. CALL TO ACTION FOOTER */}
      <section className="py-24 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to build the future?</h2>
        <Link href="/careers" className="inline-flex px-8 py-4 border border-[#1b17ff] text-[#1b17ff] hover:bg-[#1b17ff] hover:text-white transition-all rounded-lg font-bold">
           View Open Roles
        </Link>
      </section>

    </main>
  );
}
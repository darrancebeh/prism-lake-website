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
import {HeroSection } from "@/components/HeroSection";
import { FounderSection } from "@/components/FounderSection";

export default function Home() {
  return (
    <div className="overflow-hidden">
      
      {/* --- HERO SECTION --- */}
        
        <HeroSection />

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
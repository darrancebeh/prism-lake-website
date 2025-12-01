import Link from "next/link";
import { ArrowLeft, Unlock, Zap, ShieldCheck, Mail } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { SpotlightCard } from "@/components/SpotlightCard";

export const metadata = {
  title: "Prism Lake | Access Protocol",
  description: "Our philosophy on pricing, value, and open access.",
};

export default function SubscribePage() {
  return (
    <div className="min-h-screen bg-[#020410] pt-32 pb-20 px-4 relative overflow-hidden flex flex-col items-center justify-center">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1b17ff] opacity-10 blur-[120px] rounded-full pointer-events-none" />

      <FadeIn className="w-full max-w-2xl relative z-10">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link href="/research" className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-[#1b17ff] transition-colors">
            <ArrowLeft size={14} /> RETURN TO THE WIRE
          </Link>
        </div>

        <SpotlightCard className="p-8 md:p-12 bg-[#0a1128]/80 border-[#1b17ff]/20">
          
          {/* Header Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 shadow-[0_0_30px_rgba(34,197,94,0.15)]">
              <Unlock size={32} />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
              Access Protocol: <span className="text-green-400">OPEN</span>
            </h1>
            <p className="text-sm text-gray-500 font-mono uppercase tracking-widest">
              Operational Status: Value Creation Phase
            </p>
          </div>

          {/* The Manifesto Text */}
          <div className="space-y-6 text-gray-300 font-light leading-relaxed text-sm md:text-base text-justify">
            <p>
              Thank you for your interest in Prism Intelligence.
            </p>
            <p>
              At Prism Lake, we adhere to a strict standard of exchange: <strong className="text-white">Price must strictly equal Value.</strong>
            </p>
            <p>
              We only monetize when our proprietary alpha, infrastructure, and research output meet an institutional standard that we believe is mathematically worthy of your capital. We are building towards that standard every day.
            </p>
            <div className="pl-6 border-l-2 border-[#1b17ff] italic text-gray-400 my-8">
              &quot;As of right now, all of our signals, deep-dives, and market data will remain <span className="text-white font-bold">100% FREE indefinitely</span>.&quot;
            </div>
            <p>
              Enjoy the alpha, and thank you for supporting the build.
            </p>
          </div>

          {/* The "Fake" Subscription Form (Visual Only, or Connect to API later)
          <div className="mt-12 pt-8 border-t border-white/5">
            <h3 className="text-xs font-mono text-gray-400 mb-4 uppercase tracking-wider flex items-center gap-2">
              <Mail size={14} /> Initialize Feed (Optional)
            </h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email frequency..." 
                className="flex-1 bg-[#020410] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#1b17ff] transition-colors font-mono"
              />
              <button className="px-6 py-3 bg-[#1b17ff] text-white font-bold text-xs rounded-lg hover:bg-[#1b17ff]/90 transition-all shadow-glow">
                CONFIRM
              </button>
            </div>
            <p className="text-[10px] text-gray-600 mt-3 text-center sm:text-left font-mono">
              *Zero spam. Unsubscribe anytime.
            </p>
          </div>
         */}

        </SpotlightCard>

        {/* Trust Badges Footer */}
        <div className="mt-8 flex justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
            <ShieldCheck size={14} /> No Paywalls
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
            <Zap size={14} /> Real-time
          </div>
        </div>

      </FadeIn>
    </div>
  );
}
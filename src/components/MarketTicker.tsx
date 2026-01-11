"use client";

// Define the component outside of render
const TickerContent = () => (
  <>
    {/* Increased loop count to ensure seamless scrolling */}
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
      <div key={i} className="flex items-center gap-16">
        <span className="text-gray-400">Quantitative Research</span>
        <span className="text-gray-400">Proprietary Capital</span>
        <span className="text-gray-400">US Equities & Options</span>
        <span className="text-gray-500">•</span>
        <span className="text-gray-400">Kuala Lumpur</span>
        <span className="text-gray-400">Institutional Grade</span>
        <span className="text-gray-400">Systematic Strategies</span>
        <span className="text-gray-500">•</span>
      </div>
    ))}
  </>
);

export function MarketTicker() {
  return (
    <div className="fixed top-0 z-40 w-full bg-[#020410]/95 backdrop-blur-sm border-b border-white/[0.02] h-6 overflow-hidden flex items-center select-none pointer-events-none">
      
      {/* Track A */}
      <div className="flex shrink-0 min-w-full animate-marquee items-center gap-16 pr-16 text-[11px] font-mono text-gray-400 whitespace-nowrap">
        <TickerContent />
      </div>

      {/* Track B (The Seamless Duplicate) */}
      <div className="flex shrink-0 min-w-full animate-marquee items-center gap-16 pr-16 text-[11px] font-mono text-gray-400 whitespace-nowrap" aria-hidden="true">
        <TickerContent />
      </div>

    </div>
  );
}
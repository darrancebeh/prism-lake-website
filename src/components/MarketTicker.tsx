"use client";

// Define the component outside of render
const TickerContent = () => (
  <>
    {/* Increased loop count to 10 to ensure width > screen width */}
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
      <div key={i} className="flex items-center gap-12">
        <span className="flex items-center gap-2">
          SPX <span className="text-green-500">6,849.08 (+0.54%)</span>
        </span>
        <span className="flex items-center gap-2">
          NDX <span className="text-green-500">25,434.89 (+0.78%)</span>
        </span>
        <span className="flex items-center gap-2">
          VIX <span className="text-[#1b17ff]">16.34 (-5.11%)</span>
        </span>
        <span className="flex items-center gap-2 text-[#1b17ff]">
          ● PRISM SENTINEL: <span className="text-white">VOL_SHORT_REGIME</span>
        </span>
      </div>
    ))}
  </>
);

export function MarketTicker() {
  return (
    <div className="fixed top-0 z-40 w-full bg-[#020410] border-b border-white/5 h-8 overflow-hidden flex items-center select-none pointer-events-none">
      
      {/* THE MECHANICS:
         1. Two identical lists side-by-side.
         2. 'min-w-full' ensures they stretch if content is small (though loop 10 fixes this).
         3. 'shrink-0' is critical so they don't squash.
      */}
      
      {/* Track A */}
      <div className="flex shrink-0 min-w-full animate-marquee items-center gap-12 pr-12 text-[10px] font-mono font-bold tracking-wider text-gray-500 uppercase whitespace-nowrap">
        <TickerContent />
      </div>

      {/* Track B (The Seamless Duplicate) */}
      <div className="flex shrink-0 min-w-full animate-marquee items-center gap-12 pr-12 text-[10px] font-mono font-bold tracking-wider text-gray-500 uppercase whitespace-nowrap" aria-hidden="true">
        <TickerContent />
      </div>

    </div>
  );
}
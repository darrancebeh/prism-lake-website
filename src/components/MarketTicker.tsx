export function MarketTicker() {
  return (
    <div className="w-full bg-[#020410] border-b border-white/5 h-8 overflow-hidden flex items-center fixed top-0 z-40">
      <div className="animate-marquee whitespace-nowrap flex gap-12 text-[10px] font-mono font-bold tracking-wider text-gray-500 uppercase">
        {/* Repeater for infinite scroll */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex gap-12">
            <span className="flex items-center gap-2">
              SPX <span className="text-green-500">4,780.20 (+0.4%)</span>
            </span>
            <span className="flex items-center gap-2">
              NDX <span className="text-green-500">16,830.50 (+0.8%)</span>
            </span>
            <span className="flex items-center gap-2">
              VIX <span className="text-[#1b17ff]">12.40 (-2.1%)</span>
            </span>
            <span className="flex items-center gap-2 text-[#1b17ff]">
              ● PRISM SENTINEL: <span className="text-white">VOL_SHORT_REGIME</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
import Image from "next/image";

export function PartnersSection() {
  const partners = [
    {
      name: "Interactive Brokers",
      logo: "/logos/ibkr3.png",
      category: "Direct Market Access (DMA)",
      width: 160,
      mobileWidth: 140,
    },
    {
      name: "Bloomberg Terminal",
      logo: "/logos/bloomberg.png",
      category: "Institutional Analytics",
      width: 160,
      mobileWidth: 120,
    },
    {
      name: "The Wall Street Journal",
      logo: "/logos/wsj.png",
      category: "Global News Source",
      width: 120,
      mobileWidth: 100,
    },
    {
      name: "FRED (St. Louis Fed",
      logo: "/logos/fred2.png",
      category: "Macro Economic Data",
      width: 160,
      mobileWidth: 120,
    },
    {
      name: "TOKEN2049",
      logo: "/logos/token2049.png",
      category: "Industry Network",
      width: 160,
      mobileWidth: 120,
    },
    {
      name: "TradingView",
      logo: "/logos/tradingview.png",
      category: "Charting & Data",
      width: 200,
      mobileWidth: 150,
    },
  ];

  return (
    <section className="py-20 md:py-24 border-b border-[#1b17ff]/10 bg-[#020410]">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 opacity-80">
          <h3 className="text-sm font-mono text-[#1b17ff] uppercase tracking-widest flex items-center gap-3">
            <span className="w-10 h-[1px] bg-[#1b17ff]"></span>
            The Ecosystem
          </h3>
          <p className="text-xs text-gray-500 font-mono mt-2 md:mt-0">
            POWERED BY INDUSTRY LEADERS
          </p>
        </div>

        {/* --- DESKTOP LAYOUT (Grid + Hover Reveal) --- */}
        <div className="hidden md:grid grid-cols-3 gap-20 items-center justify-items-center">
          {partners.map((partner, idx) => (
            <div key={idx} className="group flex flex-col items-center justify-center gap-4 w-full">
              {/* Logo: Grayscale -> Color on Hover */}
              <div className="relative h-16 w-full flex items-center justify-center transition-all duration-500 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={partner.width}
                  height={60}
                  className="object-contain"
                />
              </div>
              {/* Text: Hidden -> Visible on Hover */}
              <div className="text-center transition-all duration-300 opacity-0 transform translate-y-2 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="text-xs text-gray-500 font-mono uppercase tracking-wider">
                  {partner.category}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- MOBILE LAYOUT (The "Manifest" List) --- */}
        <div className="md:hidden flex flex-col gap-6">
          {partners.map((partner, idx) => (
            <div key={idx} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0">
              
              {/* Left: The Category Label */}
              <div className="text-[10px] font-mono text-[#1b17ff] uppercase tracking-widest opacity-80 flex-1">
                {partner.category}
              </div>

              {/* Right: The Logo - Remove maxHeight constraint */}
              <div className="relative h-16 min-w-[140px] flex items-center justify-end">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={partner.mobileWidth}
                  height={60}
                  className="object-contain object-right opacity-80"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 md:mt-20 pt-8 border-t border-white/5 text-center md:text-left">
           <p className="text-[10px] text-gray-700 font-mono leading-relaxed">
             *Logos represent the firm&apos;s operational infrastructure, talent origins, and network. Prism Lake is an independent proprietary firm.
           </p>
        </div>

      </div>
    </section>
  );
}
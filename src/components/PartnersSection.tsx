import Image from "next/image";

export function PartnersSection() {
  const partners = [
    {
      name: "Sunway University",
      logo: "/logos/sunway.png", // Ensure this file exists in public/logos/
      category: "Founding Talent Source",
      width: 160, // Adjust based on logo aspect ratio
    },
    {
      name: "Interactive Brokers",
      logo: "/logos/ibkr3.png",
      category: "Prime Execution",
      width: 160,
    },
    {
      name: "TOKEN2049",
      logo: "/logos/token2049.png",
      category: "Industry Network",
      width: 160,
    },
    {
      name: "Python",
      logo: "/logos/python2.png",
      category: "Quantitative Stack",
      width: 160, // Square logos need smaller width
    },
    {
      name: "TradingView",
      logo: "/logos/tradingview.png",
      category: "Charting & Data",
      width: 160,
    },
    {
      name: "Google Cloud Platform",
      logo: "/logos/gcp2.png", // Or GitHub logo
      category: "Cloud Infrastructure",
      width: 160,
    },
  ];

  return (
    <section className="py-24 border-b border-[#1b17ff]/10 bg-[#020410]">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 opacity-80">
          <h3 className="text-sm font-mono text-[#1b17ff] uppercase tracking-widest flex items-center gap-3">
            <span className="w-10 h-[1px] bg-[#1b17ff]"></span>
            The Ecosystem
          </h3>
          <p className="text-xs text-gray-500 font-mono mt-2 md:mt-0">
            POWERED BY INDUSTRY LEADERS
          </p>
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-20 items-center justify-items-center">
          {partners.map((partner, idx) => (
            <div key={idx} className="group flex flex-col items-center justify-center gap-4 w-full">
              
              {/* Logo Container */}
              <div className="relative h-16 w-full flex items-center justify-center transition-all duration-500 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={partner.width}
                  height={60}
                  className="object-contain" // Ensures logo doesn't stretch
                />
              </div>

              {/* Label (Hidden until hover for cleaner look, or always visible) */}
              <div className="text-center transition-opacity duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                <div className="text-xs text-gray-500 font-mono uppercase tracking-wider">
                  {partner.category}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-20 pt-8 border-t border-white/5 text-center md:text-left">
           <p className="text-[10px] text-gray-700 font-mono">
             *Logos represent the firm&apos;s operational infrastructure, talent origins, and network. Prism Lake is an independent proprietary firm.
           </p>
        </div>

      </div>
    </section>
  );
}
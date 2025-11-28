export function PartnersSection() {
  // Replace with actual partner names/logos
  const partners = ["University Investment Club", "Interactive Brokers", "TradingView", "Sunway University"];

  return (
    <section className="py-12 border-b border-[#1b17ff]/10 bg-[#020410]">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-xs font-mono text-gray-500 mb-8 tracking-widest uppercase">
          Ecosystem & Infrastructure Partners
        </p>
        <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
           {/* Placeholder Text Logos - Replace with <Image> tags later */}
           {partners.map((partner) => (
             <span key={partner} className="text-xl font-bold font-sans text-gray-400 hover:text-white cursor-default">
               {partner}
             </span>
           ))}
        </div>
      </div>
    </section>
  );
}
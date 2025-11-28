import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { MarketTicker } from "@/components/MarketTicker";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";

// 1. Font Configuration
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prism Lake",
  description: "Bridging the gap between academic theory and market reality. Malaysia's first student-founded US Proprietary Trading Firm.",
  icons: {
    icon: "/icon.png", // Ensure you have a favicon in /public
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="antialiased min-h-screen bg-[#020410] text-white selection:bg-[#1b17ff] selection:text-white">
        
        {/* 1. Global Ticker (Fixed Top, z-index 50) */}
        <MarketTicker />
        
        {/* 2. Global Navbar (Floating below Ticker, z-index 40) */}
        <Navbar />

        {/* 3. Main Content Area */}
        {/* pt-24 ensures content isn't hidden behind the fixed header elements */}
        <main className="relative z-0 pt-24 min-h-screen">
          {children}
        </main>

        {/* 4. Global Footer */}
        <Footer />

        <ScrollProgress />

        {/* 5. Global Ambient Effects */}
        {/* Bottom Glow */}
        <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#1b17ff]/5 to-transparent pointer-events-none z-[-1]" />
        
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { MarketTicker } from "@/components/MarketTicker";
import { Footer } from "@/components/Footer";

// Font Configuration
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
  description: "Malaysia's First US-Market Quantitative Research & Proprietary Trading Firm.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="antialiased min-h-screen bg-[#020410] text-white selection:bg-[#1b17ff] selection:text-white">
        
        {/* 1. Global Ticker (Fixed Top) */}
        <MarketTicker />
        
        {/* 2. Global Navbar (Floating) */}
        <Navbar />

        {/* 3. Main Content Area */}
        <main className="relative z-0 pt-24 min-h-screen">
          {children}
        </main>

        {/* 4. Global Footer */}
        <Footer />

        {/* 5. Global Ambient Effects */}
        <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#1b17ff]/5 to-transparent pointer-events-none z-[-1]" />
        
      </body>
    </html>
  );
}
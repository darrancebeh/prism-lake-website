import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { MarketTicker } from "@/components/MarketTicker";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";

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
  // 1. Base URL: Critical for social images to resolve correctly
  // Replace 'https://prism-lake.vercel.app' with your actual custom domain if you have one
  metadataBase: new URL('https://prism-lake.vercel.app'), 

  // 2. Title Template: Allows sub-pages to look like "Article Name | Prism Lake"
  title: {
    default: "Prism Lake",
    template: "%s | Prism Lake", 
  },
  description: "Malaysia's First US-Market Quantitative Research & Proprietary Trading Firm.",
  keywords: ["Quantitative Finance", "Proprietary Trading", "US Equities", "Options", "Volatility", "Malaysia", "Algorithmic Trading"],
  
  // 3. Authorship
  authors: [{ name: "Prism Lake" }],
  creator: "Prism Lake",

  // 4. Open Graph (Facebook, LinkedIn, Discord, iMessage)
  openGraph: {
    title: "Prism Lake",
    description: "Malaysia's First US-Market Quantitative Research & Proprietary Trading Firm.",
    url: 'https://prism-lake.com',
    siteName: 'Prism Lake',
    locale: 'en_US',
    type: 'website',
    // images: Next.js automatically finds opengraph-image.tsx
  },

  // 5. Twitter Card (X)
  twitter: {
    card: 'summary_large_image', // This makes the image big and bold
    title: "Prism Lake",
    description: "Bridging the gap between academic theory and market reality.",
    // creator: '@prism_lake', // Add your handle if you have one
  },

  // 6. Icons
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
    shortcut: "/icon.png",
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
        <ScrollProgress />
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
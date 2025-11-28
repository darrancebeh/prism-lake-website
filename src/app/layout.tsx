import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Load fonts and assign CSS variables
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Matches CSS var(--font-inter)
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains", // Matches CSS var(--font-jetbrains)
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      {/* The background class is handled in globals.css body selector */}
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
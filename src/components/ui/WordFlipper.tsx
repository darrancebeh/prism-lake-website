"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["REALITY", "US EQUITIES", "DERIVATIVES", "VOLATILITY", "INFORMATION", "INEFFICIENCY", "ASYMMETRY", "CONVEXITY", "ALGORITHMICALLY", "QUANTITATIVELY"];

export function WordFlipper() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000); // Flip every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex justify-center items-center h-[1.1em] align-top ml-2 md:ml-4 overflow-hidden perspective-1000">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={words[index]}
          layout
          initial={{ 
            opacity: 0, 
            y: 50, 
            rotateX: -90, 
            filter: "blur(10px)" 
          }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            rotateX: 0, 
            filter: "blur(0px)" 
          }}
          exit={{ 
            opacity: 0, 
            y: -50, 
            rotateX: 90, 
            filter: "blur(10px)" 
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20,
            mass: 1.2,
            layout: { duration: 0.3 }
          }}
          className="whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-[#1b17ff] to-[#2549e7] font-black block origin-center drop-shadow-[0_0_15px_rgba(27,23,255,0.5)] drop-shadow-[0_0_30px_rgba(27,23,255,0.5)] text-[1.05em] md:text-[1.15em] tracking-wider"
        >
          {words[index]}.
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function FadeIn({ 
  children, 
  delay = 0, 
  className = "",
  id 
}: { 
  children: ReactNode; 
  delay?: number; 
  className?: string;
  id?: string;
}) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
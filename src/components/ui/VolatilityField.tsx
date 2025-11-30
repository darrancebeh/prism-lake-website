"use client";

import { useEffect, useRef } from "react";

// --- CONFIGURATION (Moved Outside) ---
const DENSITY = 9000; 
const CONNECTION_DISTANCE = 200;
const MOVE_SPEED = 0.8;
const PARTICLE_SIZE_BASE = 2;

// --- CLASS DEFINITION (Moved Outside) ---
class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;

  constructor(w: number, h: number) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * MOVE_SPEED;
    this.vy = (Math.random() - 0.5) * MOVE_SPEED;
    this.size = Math.random() * PARTICLE_SIZE_BASE + 1; 
  }

  // We pass w/h here so it knows the boundaries even after resize
  update(w: number, h: number) {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off edges
    if (this.x < 0 || this.x > w) this.vx *= -1;
    if (this.y < 0 || this.y > h) this.vy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    // Bright Cyan core
    ctx.fillStyle = "#5eead4"; 
    ctx.fill();
  }
}

export const VolatilityField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const particles: Particle[] = [];

    // Initialize
    const particleCount = Math.floor((w * h) / DENSITY);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(w, h));
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Loop through particles
      particles.forEach((p, index) => {
        p.update(w, h);
        p.draw(ctx);

        // Draw Connections
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECTION_DISTANCE) {
            ctx.beginPath();
            // Opacity based on distance (Closer = Brighter)
            const opacity = 1 - distance / CONNECTION_DISTANCE;
            // Electric Blue Line
            ctx.strokeStyle = `rgba(27, 23, 255, ${opacity * 0.4})`; 
            ctx.lineWidth = 1; 
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      
      // Re-initialize particles on resize to prevent stretching
      particles.length = 0;
      const newCount = Math.floor((w * h) / DENSITY);
      for (let i = 0; i < newCount; i++) {
        particles.push(new Particle(w, h));
      }
    };

    const animationId = requestAnimationFrame(animate);
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.8 }} 
    />
  );
};
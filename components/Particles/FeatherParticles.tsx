"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAngelStore } from "../../store/useAngelStore";

interface Feather {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  opacity: number;
}

export const FeatherParticles: React.FC = () => {
  const { settings, stage } = useAngelStore();
  const [feathers, setFeathers] = useState<Feather[]>([]);

  useEffect(() => {
    if (!settings.particlesEnabled) return;

    // Generate 18 floating white & golden feathers
    const initialFeathers: Feather[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage x
      size: Math.random() * 24 + 18, // 18px to 42px
      duration: Math.random() * 6 + 7, // 7s to 13s
      delay: Math.random() * 5,
      rotation: Math.random() * 360,
      opacity: Math.random() * 0.5 + 0.4,
    }));

    setFeathers(initialFeathers);
  }, [settings.particlesEnabled]);

  if (!settings.particlesEnabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-15 overflow-hidden select-none">
      {feathers.map((f) => (
        <motion.div
          key={f.id}
          initial={{
            y: "-10vh",
            x: `${f.x}vw`,
            rotate: f.rotation,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: [
              `${f.x}vw`,
              `${f.x + (f.id % 2 === 0 ? 8 : -8)}vw`,
              `${f.x + (f.id % 2 === 0 ? -6 : 6)}vw`,
              `${f.x}vw`,
            ],
            rotate: [f.rotation, f.rotation + 180, f.rotation + 360],
            opacity: stage === "calling" ? [0, f.opacity, f.opacity, 0] : [0, f.opacity * 0.7, f.opacity * 0.7, 0],
          }}
          transition={{
            duration: stage === "calling" ? f.duration * 0.6 : f.duration,
            repeat: Infinity,
            delay: f.delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            width: `${f.size}px`,
            height: `${f.size}px`,
          }}
          className="drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]"
        >
          {/* Feather SVG Silhouette */}
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id={`featherGrad-${f.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#FFF7D6" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#FCD34D" stopOpacity="0.7" />
              </linearGradient>
            </defs>
            {/* Soft Feather Path */}
            <path
              d="M50,5 C30,20 15,45 20,75 C22,87 35,95 50,95 C65,95 78,87 80,75 C85,45 70,20 50,5 Z"
              fill={`url(#featherGrad-${f.id})`}
            />
            {/* Center Quill Vane line */}
            <path d="M50,5 Q50,50 50,95" stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M50,30 Q35,40 25,48" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.8" />
            <path d="M50,45 Q65,55 75,63" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.8" />
            <path d="M50,60 Q35,70 25,78" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.8" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

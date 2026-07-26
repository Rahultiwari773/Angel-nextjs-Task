"use client";

import React from "react";
import { motion } from "framer-motion";
import { useAngelStore } from "../../store/useAngelStore";

export const HeavenBackground: React.FC = () => {
  const { settings, stage } = useAngelStore();
  const isLight = settings.themeMode === "light";

  return (
    <div className="fixed inset-0 z-0 overflow-hidden select-none transition-colors duration-1000">
      {/* Dynamic Animated Gradient Background */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isLight
            ? "bg-gradient-to-b from-sky-200 via-amber-50 to-indigo-100"
            : "bg-gradient-to-b from-slate-950 via-purple-950/80 to-slate-900"
        }`}
      />

      {/* Aurora Borealis Ethereal Rays Effect */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.05, 1],
          rotate: [0, 2, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[120vw] h-[70vh] rounded-full blur-[100px] pointer-events-none bg-gradient-to-r from-amber-400/20 via-pink-500/20 to-purple-600/30"
      />

      {/* Celestial Moon 3D Glow */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: stage === "dark_intro" ? 0.4 : 1, y: 0 }}
        transition={{ duration: 3 }}
        className="absolute top-12 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
      >
        <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-amber-100 via-amber-200 to-amber-400 shadow-[0_0_90px_rgba(251,191,36,0.6)] border border-amber-200/40">
          <div className="absolute inset-0 rounded-full bg-white/20 blur-md" />
          {/* Moon Surface Craters Texture Detail */}
          <div className="absolute top-8 left-10 w-8 h-8 rounded-full bg-amber-300/30 blur-[1px]" />
          <div className="absolute bottom-10 right-12 w-12 h-12 rounded-full bg-amber-300/25 blur-[1px]" />
          <div className="absolute top-16 right-8 w-6 h-6 rounded-full bg-amber-300/30 blur-[1px]" />
        </div>
      </motion.div>

      {/* Golden Light Rays Beam descending from heaven */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-40 mix-blend-screen">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <defs>
            <linearGradient id="rayGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points="500,0 200,1000 350,1000" fill="url(#rayGrad)" />
          <polygon points="500,0 420,1000 580,1000" fill="url(#rayGrad)" />
          <polygon points="500,0 650,1000 800,1000" fill="url(#rayGrad)" />
        </svg>
      </div>

      {/* Ethereal Moving Heaven Clouds (Layer 1 - Deep) */}
      <motion.div
        animate={{ x: ["-10%", "10%", "-10%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[-20%] w-[140%] h-[350px] pointer-events-none opacity-40 blur-xl bg-gradient-to-r from-purple-300/30 via-amber-100/40 to-indigo-300/30 rounded-[100%]"
      />

      {/* Moving Heaven Clouds (Layer 2 - Foreground Soft Volumetric) */}
      <motion.div
        animate={{ x: ["5%", "-5%", "5%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] left-[-10%] w-[120%] h-[400px] pointer-events-none opacity-70 blur-2xl bg-gradient-to-t from-slate-900 via-amber-200/20 to-transparent rounded-t-[100%]"
      />
    </div>
  );
};

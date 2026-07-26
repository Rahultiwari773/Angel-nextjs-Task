"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAngelStore } from "../../store/useAngelStore";
import { soundEngine } from "../../lib/soundEngine";

export const HeavenLoading: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const { setStage, settings } = useAngelStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoaded(true);
            setStage("ready");
            soundEngine.playBell(settings.volume, settings.sfxEnabled);
            soundEngine.startBgm(settings.volume, settings.bgmEnabled);
          }, 400);
          return 100;
        }
        return prev + 5;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [setStage, settings]);

  if (isLoaded) return null;

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-100 select-none"
    >
      {/* Animated Glowing Angel Emblem */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-32 h-32 mb-8 flex items-center justify-center rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-600 p-1 shadow-[0_0_80px_rgba(255,215,0,0.9)]"
      >
        <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-4xl">
          <span>👼</span>
        </div>
      </motion.div>

      {/* Header Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300 tracking-wider mb-2">
        Angel Entry Experience
      </h1>
      <p className="text-amber-200/70 text-sm mb-8 tracking-widest uppercase font-mono">
        Loading Celestial Realm...
      </p>

      {/* Progress Bar Container */}
      <div className="w-full max-w-md h-3 rounded-full bg-slate-900 border border-amber-300/40 overflow-hidden shadow-inner p-0.5 relative">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 shadow-[0_0_15px_rgba(255,215,0,0.9)]"
          style={{ width: `${progress}%` }}
          transition={{ ease: "easeOut" }}
        />
      </div>

      <span className="mt-3 text-xs text-amber-300 font-mono">{progress}%</span>
    </motion.div>
  );
};

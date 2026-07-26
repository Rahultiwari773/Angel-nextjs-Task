"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAngelStore } from "../../store/useAngelStore";
import { soundEngine } from "../../lib/soundEngine";
import { getEntryStyleInfo } from "../../lib/entryStyles";
import { Sparkles, SlidersHorizontal } from "lucide-react";

export const CallAngelButton: React.FC = () => {
  const {
    stage,
    activeEntryType,
    selectedEntryType,
    callAngel,
    toggleStyleModal,
    settings,
  } = useAngelStore();
  const [isRippling, setIsRippling] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const activeStyleInfo = getEntryStyleInfo(activeEntryType);

  const handleClick = async () => {
    if (stage === "calling") return;

    // Trigger sound effects
    soundEngine.playButtonClick(settings.volume, settings.sfxEnabled);
    soundEngine.playMagicSparkle(settings.volume, settings.sfxEnabled);

    // Ripple visual state
    setIsRippling(true);
    setTimeout(() => setIsRippling(false), 800);

    // Call store action (automatically cycles to next entry style on every press!)
    await callAngel();
  };

  if (!isMounted || stage === "dark_intro") return null;

  return (
    <div className="relative z-30 flex flex-col items-center max-w-xl w-full px-1">
      {/* Main Call Button */}
      <motion.div
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative mb-2"
      >
        {/* Ripple ring animation on click */}
        {isRippling && (
          <motion.div
            initial={{ scale: 0.8, opacity: 1 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border-2 border-amber-300 pointer-events-none bg-amber-400/20 blur-sm"
          />
        )}

        {/* Glowing aura halo behind button */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 blur-md opacity-80 animate-pulse-glow" />

        <button
          onClick={handleClick}
          disabled={stage === "calling"}
          className={`relative px-6 py-2.5 sm:px-8 sm:py-3 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 border-2 border-amber-200/90 shadow-[0_0_25px_rgba(255,215,0,0.8)] text-slate-950 font-extrabold text-sm sm:text-base md:text-lg tracking-wider flex items-center space-x-2 sm:space-x-3 transition-all duration-300 transform hover:scale-105 active:scale-95 group overflow-hidden ${
            stage === "calling" ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {/* Shimmer light bar across button */}
          <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

          <span className="text-lg sm:text-xl group-hover:rotate-12 transition-transform duration-300">
            {activeStyleInfo.icon}
          </span>
          <span className="drop-shadow-sm">
            {stage === "present" || stage === "reacting"
              ? "Re-Call My Angel ❤️"
              : "Call My Angel ❤️"}
          </span>
          <span className="text-lg sm:text-xl group-hover:-rotate-12 transition-transform duration-300">
            ✨
          </span>
        </button>
      </motion.div>

      {/* Active Entry Style Badge & Modal Opener Trigger */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeEntryType}
          initial={{ opacity: 0, y: 4, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="mt-0.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-2xl bg-slate-950/90 border border-amber-400/40 shadow-[0_0_15px_rgba(255,215,0,0.25)] backdrop-blur-md flex items-center space-x-2 text-center"
        >
          <div className="text-[11px] sm:text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 flex items-center space-x-1.5 drop-shadow-sm">
            <span className="text-sm">{activeStyleInfo.icon}</span>
            <span>Style ({activeEntryType}/6): {activeStyleInfo.name}</span>
          </div>

          <button
            onClick={() => {
              soundEngine.playButtonClick(settings.volume, settings.sfxEnabled);
              toggleStyleModal(true);
            }}
            className="ml-2 px-2.5 py-1 rounded-xl bg-amber-400/20 border border-amber-300/60 text-amber-200 hover:bg-amber-400 hover:text-slate-950 text-[10px] sm:text-xs font-bold transition-all flex items-center space-x-1 shadow-sm group"
          >
            <SlidersHorizontal className="w-3 h-3 group-hover:rotate-45 transition-transform" />
            <span>Select Style</span>
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAngelStore } from "../../store/useAngelStore";
import { soundEngine } from "../../lib/soundEngine";

export const CallAngelButton: React.FC = () => {
  const { stage, callAngel, settings } = useAngelStore();
  const [isRippling, setIsRippling] = useState(false);

  const handleClick = async () => {
    if (stage === "calling") return;

    // Trigger sound effects
    soundEngine.playButtonClick(settings.volume, settings.sfxEnabled);
    soundEngine.playMagicSparkle(settings.volume, settings.sfxEnabled);

    // Ripple visual state
    setIsRippling(true);
    setTimeout(() => setIsRippling(false), 800);

    // Call store action
    await callAngel();
  };

  if (stage === "dark_intro") return null;

  return (
    <div className="relative z-30 flex flex-col items-center">
      <motion.div
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
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
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 blur-lg opacity-80 animate-pulse-glow" />

        <button
          onClick={handleClick}
          disabled={stage === "calling"}
          className={`relative px-6 py-3.5 sm:px-10 sm:py-5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 border-2 border-amber-200/90 shadow-[0_0_40px_rgba(255,215,0,0.8)] text-slate-950 font-bold text-base sm:text-xl md:text-2xl tracking-wider flex items-center space-x-2 sm:space-x-3 transition-all duration-300 transform hover:scale-105 active:scale-95 group overflow-hidden ${
            stage === "calling" ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {/* Shimmer light bar across button */}
          <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

          <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">✨</span>
          <span className="drop-shadow-sm">
            {stage === "present" || stage === "reacting" ? "Re-Call My Angel ❤️" : "Call My Angel ❤️"}
          </span>
          <span className="text-2xl group-hover:-rotate-12 transition-transform duration-300">✨</span>
        </button>
      </motion.div>

      <p className="mt-3 text-xs md:text-sm text-amber-200/80 font-medium tracking-wide drop-shadow-md">
        Touch to awaken celestial magic
      </p>
    </div>
  );
};

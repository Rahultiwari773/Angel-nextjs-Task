"use client";

import React from "react";
import { motion } from "framer-motion";
import { useAngelStore } from "../../store/useAngelStore";
import { FlyingRose } from "./FlyingRose";
import { soundEngine } from "../../lib/soundEngine";
import { RoseItem } from "../../types/angel";

const ROSES_CATALOG: RoseItem[] = [
  { id: "red", name: "Red Rose", color: "#F43F5E", glowColor: "rgba(244,63,94,0.8)", description: "Passionate Love", iconSymbol: "🌹" },
  { id: "pink", name: "Pink Rose", color: "#EC4899", glowColor: "rgba(236,72,153,0.8)", description: "Gentle Romance", iconSymbol: "🌸" },
  { id: "white", name: "White Rose", color: "#FFFFFF", glowColor: "rgba(255,255,255,0.9)", description: "Pure Devotion", iconSymbol: "🤍" },
  { id: "gold", name: "Golden Rose", color: "#FFD700", glowColor: "rgba(255,215,0,0.9)", description: "Divine Glory", iconSymbol: "✨" },
  { id: "blue", name: "Blue Rose", color: "#38BDF8", glowColor: "rgba(56,189,248,0.8)", description: "Mystic Dream", iconSymbol: "💙" },
  { id: "purple", name: "Purple Rose", color: "#A855F7", glowColor: "rgba(168,85,247,0.8)", description: "Enchanted Spell", iconSymbol: "💜" },
  { id: "emerald", name: "Emerald Rose", color: "#10B981", glowColor: "rgba(16,185,129,0.8)", description: "Everlasting Hope", iconSymbol: "💚" },
  { id: "rosegold", name: "Rose Gold", color: "#FB7185", glowColor: "rgba(251,113,133,0.8)", description: "Warm Tenderness", iconSymbol: "💖" },
  { id: "violet", name: "Cosmic Violet", color: "#8B5CF6", glowColor: "rgba(139,92,246,0.8)", description: "Celestial Harmony", iconSymbol: "🔮" },
  { id: "starlight", name: "Starlight Rose", color: "#FDE68A", glowColor: "rgba(253,230,138,0.9)", description: "Eternal Light", iconSymbol: "⭐" },
];

export const RoseBar: React.FC = () => {
  const { stage, setStage, launchRose, flyingRoses, appliedRoses, clearAppliedRoses, settings } = useAngelStore();

  const handleRoseClick = (rose: RoseItem, event: React.MouseEvent<HTMLButtonElement>) => {
    // If Angel is not summoned yet, bring Angel onto screen
    if (stage === "ready") {
      setStage("present");
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    soundEngine.playRoseSwoosh(settings.volume, settings.sfxEnabled);
    launchRose(rose, startX, startY);
  };

  const handleLaunchBurst = () => {
    if (stage === "ready") {
      setStage("present");
    }

    soundEngine.playRoseSwoosh(settings.volume, settings.sfxEnabled);
    ROSES_CATALOG.forEach((rose, idx) => {
      setTimeout(() => {
        const startX = (window.innerWidth / 11) * (idx + 1);
        const startY = window.innerHeight - 80;
        launchRose(rose, startX, startY);
      }, idx * 120);
    });
  };

  if (stage === "dark_intro") return null;

  return (
    <>
      {/* Active Flying Roses Render Layer */}
      {flyingRoses.map((rose) => (
        <FlyingRose key={rose.id} rose={rose} />
      ))}

      {/* Bottom Fixed Glassmorphic Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="fixed bottom-2 sm:bottom-3 inset-x-0 mx-auto z-40 max-w-4xl w-[94vw] sm:w-[90vw] px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl sm:rounded-3xl bg-slate-950/90 border-2 border-amber-300/60 shadow-[0_0_40px_rgba(255,215,0,0.4)] backdrop-blur-2xl flex flex-col items-center space-y-1 sm:space-y-1.5"
      >
        <div className="flex items-center justify-between w-full px-1 sm:px-2">
          <div className="flex items-center space-x-1.5 text-amber-200 text-xs sm:text-sm font-semibold">
            <span>🌹</span>
            <span className="text-[11px] sm:text-xs">Offer Celestial Roses</span>
            {appliedRoses.length > 0 && (
              <span className="hidden sm:inline-block ml-1.5 px-2 py-0.5 rounded-full text-[10px] bg-amber-400/20 border border-amber-300/50 text-amber-200 font-bold animate-pulse" style={{ color: appliedRoses[0].color }}>
                ✨ {appliedRoses[0].name} {appliedRoses[0].iconSymbol}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-1.5">
            {appliedRoses.length > 0 && (
              <button
                onClick={clearAppliedRoses}
                className="px-2 py-0.5 text-[10px] sm:text-xs rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 font-medium transition-colors"
                title="Remove applied roses from Angel"
              >
                Clear
              </button>
            )}

            <button
              onClick={handleLaunchBurst}
              className="px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-bold hover:scale-105 transition-transform shadow-md"
            >
              Launch All 🌹✨
            </button>
          </div>
        </div>

        {/* 10 Roses Interactive Carousel / Row */}
        <div className="flex items-center justify-start md:justify-center space-x-1.5 md:space-x-2.5 overflow-x-auto w-full py-0.5 scrollbar-none px-0.5">
          {ROSES_CATALOG.map((rose) => {
            const isApplied = appliedRoses.some((r) => r.id === rose.id);
            return (
              <motion.button
                key={rose.id}
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => handleRoseClick(rose, e)}
                className={`relative flex flex-col items-center justify-center p-1 sm:p-1.5 rounded-xl transition-all duration-300 group min-w-[48px] sm:min-w-[52px] ${
                  isApplied
                    ? "bg-amber-950/60 border border-amber-400 shadow-[0_0_15px_rgba(255,215,0,0.5)] ring-1 ring-amber-300"
                    : "bg-slate-900/80 border border-slate-700/60 hover:border-amber-300"
                }`}
                title={`${rose.name} - ${rose.description}${isApplied ? " (Currently Applied on Angel)" : ""}`}
              >
                {/* Active Applied Badge */}
                {isApplied && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] flex items-center justify-center shadow-md animate-bounce">
                    ✓
                  </span>
                )}

                <div
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm sm:text-base shadow-lg transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    boxShadow: `0 0 12px ${isApplied ? rose.glowColor : "transparent"}`,
                  }}
                >
                  <span>{rose.iconSymbol}</span>
                </div>
                <span
                  className={`text-[9px] sm:text-[10px] font-medium mt-0.5 truncate max-w-[52px] ${
                    isApplied ? "text-amber-200 font-bold" : "text-slate-300"
                  }`}
                >
                  {rose.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

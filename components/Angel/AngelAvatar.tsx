"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAngelStore } from "../../store/useAngelStore";

interface AngelAvatarProps {
  isSmiling?: boolean;
  isWaving?: boolean;
}

export const AngelAvatar: React.FC<AngelAvatarProps> = ({ isSmiling = false, isWaving = false }) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const { settings, appliedRoses, removeAppliedRose, setAvatarMode } = useAngelStore();
  const isRealMode = settings.avatarMode === "real";

  // Periodic natural eye blink for vector mode
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const activeRose = appliedRoses.length > 0 ? appliedRoses[0] : null;

  return (
    <div className="relative flex flex-col items-center justify-center select-none pointer-events-auto group scale-95 sm:scale-100 origin-center transition-all duration-300">
      {/* Mode Switcher Badge (Allows user to toggle Real Divine Angel vs Vector Visual) */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setAvatarMode(isRealMode ? "vector" : "real")}
        className="absolute -top-10 xs:-top-11 sm:-top-12 z-30 px-3 py-1 rounded-full bg-slate-950/90 border border-amber-300/80 shadow-[0_0_15px_rgba(255,215,0,0.6)] backdrop-blur-md text-amber-200 text-xs font-extrabold flex items-center space-x-1.5 hover:border-amber-200 transition-all cursor-pointer"
        title="Toggle between Pure Real Photorealistic Angel & Vector Avatar"
      >
        <span>{isRealMode ? "👑 Pure Real Angel" : "✨ Vector Angel"}</span>
        <span className="text-[10px] bg-amber-400/30 text-amber-100 px-1.5 py-0.5 rounded-full font-bold">
          Switch
        </span>
      </motion.button>

      {/* REAL PHOTOREALISTIC DIVINE ANGEL RENDER MODE */}
      {isRealMode ? (
        <div className="relative flex flex-col items-center justify-center">
          {/* Outer Radiant Golden Heavenly Aura Rays */}
          <motion.div
            animate={{
              scale: [1, 1.06, 1],
              opacity: [0.75, 0.95, 0.75],
            }}
            transition={{
              duration: 3.5 / settings.animationSpeed,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -inset-6 sm:-inset-10 rounded-full bg-gradient-to-r from-amber-300/30 via-yellow-200/40 to-amber-400/30 blur-xl sm:blur-2xl pointer-events-none -z-10"
          />

          {/* Floating Divine Light Halo pulse overhead */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.85, 1, 0.85],
              rotate: [0, 360],
            }}
            transition={{
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            }}
            className="absolute -top-3 sm:-top-4 w-24 h-7 sm:w-32 sm:h-9 rounded-[100%] border-[3px] sm:border-[4px] border-amber-300 shadow-[0_0_35px_rgba(255,215,0,1)] bg-gradient-to-r from-amber-200/50 via-yellow-300/30 to-amber-200/50 blur-[0.5px] z-20"
          />

          {/* Main Photorealistic Angel Image Container (Perfectly Fit without Empty Dark Frame) */}
          <motion.div
            animate={{
              y: [0, -6, 0],
              scale: isWaving || isSmiling ? [1, 1.03, 1] : [1, 1, 1],
            }}
            transition={{
              y: { duration: 4.5 / settings.animationSpeed, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 1.5, repeat: Infinity },
            }}
            className="relative z-10 w-56 xs:w-64 sm:w-76 md:w-80 h-auto max-h-[42vh] rounded-2xl sm:rounded-3xl overflow-hidden p-1 sm:p-1.5 flex items-center justify-center border-2 border-amber-300/70 shadow-[0_0_40px_rgba(255,215,0,0.8)] bg-gradient-to-b from-amber-950/60 via-slate-950/80 to-amber-950/70 backdrop-blur-md"
          >
            {/* Real Divine Angel Image */}
            <img
              src="/images/real_angel.png"
              alt="Pure Divine Real Angel"
              className="w-full h-auto max-h-[40vh] object-cover rounded-xl sm:rounded-2xl drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)] filter brightness-105 contrast-105"
            />

            {/* Glowing Ethereal Overlay Light Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-amber-200/20 pointer-events-none rounded-xl sm:rounded-2xl" />

            {/* Featured Active Rose Applied on Real Angel */}
            {activeRose && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0.9, 1.15, 1], opacity: 1, y: [0, -5, 0] }}
                transition={{
                  scale: { type: "spring", stiffness: 400, damping: 20 },
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
                className="absolute bottom-3 sm:bottom-6 z-30 flex flex-col items-center pointer-events-auto cursor-pointer"
                onClick={() => removeAppliedRose(activeRose.id)}
                title={`${activeRose.name}: ${activeRose.description} (Click to remove)`}
              >
                {/* Glowing Aura Ring behind Rose */}
                <div
                  className="absolute w-12 h-12 sm:w-14 sm:h-14 rounded-full blur-md opacity-90 animate-pulse"
                  style={{ backgroundColor: activeRose.color }}
                />

                {/* Rose Flower Badge */}
                <div
                  className="relative px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-slate-950/95 border-2 flex items-center space-x-1 sm:space-x-1.5 shadow-[0_0_25px_rgba(255,215,0,1)] backdrop-blur-md"
                  style={{ borderColor: activeRose.color }}
                >
                  <span className="text-xl sm:text-2xl animate-bounce">{activeRose.iconSymbol}</span>
                  <span
                    className="text-[10px] sm:text-xs font-black tracking-wide"
                    style={{ color: activeRose.color }}
                  >
                    {activeRose.name}
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Floating Ground Golden Reflection Shadow */}
          <div className="w-36 sm:w-48 h-3.5 sm:h-4 rounded-full bg-amber-400/35 blur-md sm:blur-lg -mt-2 sm:-mt-2.5 shadow-[0_0_20px_rgba(255,215,0,0.9)]" />
        </div>
      ) : (
        /* STYLIZED VECTOR ANGEL AVATAR (FALLBACK / ALTERNATIVE) */
        <div className="relative flex flex-col items-center justify-center">
          {/* Dynamic Golden Celestial Halo */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.8, 1, 0.8],
              rotate: [0, 360],
            }}
            transition={{
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            }}
            className="absolute -top-6 w-24 h-7 rounded-[100%] border-[3px] border-amber-300 shadow-[0_0_25px_rgba(255,215,0,0.9)] bg-gradient-to-r from-amber-200/40 via-yellow-400/20 to-amber-200/40 blur-[0.5px]"
          />

          {/* Main Container with Wings */}
          <div className="relative flex items-center justify-center">
            {/* Left Wing (Animated Wing Flap) */}
            <motion.div
              animate={{
                rotateY: [0, 30, 0],
                rotateZ: [-5, 5, -5],
              }}
              transition={{
                duration: 2.8 / settings.animationSpeed,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -left-20 sm:-left-24 -top-6 origin-right w-24 h-36 sm:w-32 sm:h-44 pointer-events-none drop-shadow-[0_0_20px_rgba(255,215,0,0.7)]"
            >
              <svg viewBox="0 0 200 300" className="w-full h-full">
                <defs>
                  <linearGradient id="wingGradLeft" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="60%" stopColor="#FFF5C0" />
                    <stop offset="100%" stopColor="#FFD700" />
                  </linearGradient>
                </defs>
                <path
                  d="M190,150 C140,50 60,20 10,60 C-10,120 40,180 120,220 C160,240 185,200 190,150 Z"
                  fill="url(#wingGradLeft)"
                  opacity="0.95"
                />
                <path
                  d="M180,140 C140,70 80,50 30,90 C10,130 60,180 130,200 Z"
                  fill="#FFFFFF"
                  opacity="0.7"
                />
                <path
                  d="M170,130 C140,90 90,75 50,110 C40,140 80,175 130,185 Z"
                  fill="#FDE68A"
                  opacity="0.8"
                />
              </svg>
            </motion.div>

            {/* Right Wing (Animated Wing Flap) */}
            <motion.div
              animate={{
                rotateY: [0, -30, 0],
                rotateZ: [5, -5, 5],
              }}
              transition={{
                duration: 2.8 / settings.animationSpeed,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-20 sm:-right-24 -top-6 origin-left w-24 h-36 sm:w-32 sm:h-44 pointer-events-none drop-shadow-[0_0_20px_rgba(255,215,0,0.7)]"
            >
              <svg viewBox="0 0 200 300" className="w-full h-full">
                <defs>
                  <linearGradient id="wingGradRight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="60%" stopColor="#FFF5C0" />
                    <stop offset="100%" stopColor="#FFD700" />
                  </linearGradient>
                </defs>
                <path
                  d="M10,150 C60,50 140,20 190,60 C210,120 160,180 80,220 C40,240 15,200 10,150 Z"
                  fill="url(#wingGradRight)"
                  opacity="0.95"
                />
                <path
                  d="M20,140 C60,70 120,50 170,90 C190,130 140,180 70,200 Z"
                  fill="#FFFFFF"
                  opacity="0.7"
                />
                <path
                  d="M30,130 C60,90 110,75 150,110 C160,140 120,175 70,185 Z"
                  fill="#FDE68A"
                  opacity="0.8"
                />
              </svg>
            </motion.div>

            {/* Angel Body & Head Vector Visual */}
            <motion.div
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10 flex flex-col items-center"
            >
              {/* Head & Hair */}
              <div className="relative w-18 h-18 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-amber-100 via-amber-200 to-amber-300 p-1 shadow-[0_0_25px_rgba(255,215,0,0.8)] border-2 border-amber-300/60">
                {/* Flowing Golden Hair Wings */}
                <motion.div
                  animate={{ rotate: [-2, 2, -2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-2 -left-3 w-24 h-18 sm:w-28 sm:h-20 bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-500 rounded-full blur-[1px] -z-10"
                />

                {/* Face Detail */}
                <div className="w-full h-full rounded-full bg-gradient-to-b from-[#FFF5EB] to-[#FFE3D1] flex flex-col items-center justify-center relative overflow-hidden">
                  {/* Soft Pink Blush */}
                  <div className="absolute top-8 sm:top-10 left-2 w-3.5 h-2 sm:w-4 sm:h-2.5 rounded-full bg-pink-400/40 blur-[2px]" />
                  <div className="absolute top-8 sm:top-10 right-2 w-3.5 h-2 sm:w-4 sm:h-2.5 rounded-full bg-pink-400/40 blur-[2px]" />

                  {/* Eyes (Open or Blinking) */}
                  <div className="flex space-x-3.5 sm:space-x-4 mt-2 sm:mt-2.5">
                    {isBlinking ? (
                      <>
                        <div className="w-2.5 h-1 sm:w-3 sm:h-1 bg-amber-900 rounded-full" />
                        <div className="w-2.5 h-1 sm:w-3 sm:h-1 bg-amber-900 rounded-full" />
                      </>
                    ) : (
                      <>
                        <div className="relative w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-amber-950 flex items-center justify-center">
                          <div className="w-1 h-1 rounded-full bg-white absolute top-0.5 left-0.5" />
                        </div>
                        <div className="relative w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-amber-950 flex items-center justify-center">
                          <div className="w-1 h-1 rounded-full bg-white absolute top-0.5 left-0.5" />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Expression */}
                  <div className="mt-1.5 sm:mt-2">
                    {isSmiling ? (
                      <div className="w-4 h-2 sm:w-5 sm:h-2.5 border-b-3 border-pink-500 rounded-b-full animate-bounce" />
                    ) : (
                      <div className="w-3.5 h-1.5 sm:w-4 sm:h-1.5 border-b-2 border-amber-900 rounded-b-full" />
                    )}
                  </div>
                </div>
              </div>

              {/* Celestial Gown Dress & Arms */}
              <div className="relative -mt-1.5 flex flex-col items-center">
                {/* Raised Hand Wave Animation */}
                {isWaving && (
                  <motion.div
                    animate={{ rotate: [0, 20, -10, 20, 0] }}
                    transition={{ duration: 1.2, repeat: 2 }}
                    className="absolute -right-7 sm:-right-8 top-1 w-5 h-8 sm:w-6 sm:h-9 origin-top-left bg-gradient-to-b from-amber-100 to-amber-200 rounded-full border border-amber-300 shadow-sm"
                  />
                )}

                {/* Floating Ethereal Dress */}
                <motion.div
                  animate={{ scaleX: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-20 h-24 sm:w-28 sm:h-32 bg-gradient-to-b from-white via-amber-100 to-amber-300 rounded-t-2xl rounded-b-[40px] shadow-[0_10px_30px_rgba(255,215,0,0.6)] border-t border-amber-200 flex flex-col items-center justify-end pb-3"
                >
                  <div className="w-14 h-1 sm:w-18 sm:h-1.5 rounded-full bg-amber-400/40 blur-[1px]" />
                  <div className="w-10 h-1 sm:w-14 sm:h-1.5 rounded-full bg-amber-400/30 blur-[1px] mt-1" />
                </motion.div>

                {/* Featured Active Rose Held / Applied on Angel */}
                {activeRose && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0.8, 1.1, 1], opacity: 1, y: [0, -4, 0] }}
                    transition={{
                      scale: { type: "spring", stiffness: 400, damping: 20 },
                      y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    }}
                    className="absolute top-10 sm:top-12 z-30 flex flex-col items-center pointer-events-auto cursor-pointer"
                    onClick={() => removeAppliedRose(activeRose.id)}
                    title={`${activeRose.name}: ${activeRose.description} (Click to remove)`}
                  >
                    <div
                      className="absolute w-10 h-10 sm:w-12 sm:h-12 rounded-full blur-md opacity-80 animate-pulse"
                      style={{ backgroundColor: activeRose.color }}
                    />
                    <div
                      className="relative px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-slate-950/90 border-2 flex items-center space-x-1 shadow-[0_0_20px_rgba(255,215,0,0.9)] backdrop-blur-md"
                      style={{ borderColor: activeRose.color }}
                    >
                      <span className="text-lg sm:text-xl animate-bounce">{activeRose.iconSymbol}</span>
                      <span
                        className="text-[10px] sm:text-[11px] font-extrabold tracking-wide"
                        style={{ color: activeRose.color }}
                      >
                        {activeRose.name}
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Floating Ground Shadow & Reflection */}
          <div className="w-32 sm:w-36 h-3.5 sm:h-4 rounded-full bg-amber-400/20 blur-md -mt-3 shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
        </div>
      )}
    </div>
  );
};

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
    <div className="relative flex flex-col items-center justify-center select-none pointer-events-auto group scale-[0.8] xs:scale-88 sm:scale-98 md:scale-105 origin-center transition-all duration-300">
      {/* LIVE 60 FPS CELESTIAL GUARDIAN ANGEL CHARACTER ICON */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Soft Heavenly Golden Aura Glow behind Angel */}
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3.5 / settings.animationSpeed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -inset-12 sm:-inset-20 rounded-full bg-gradient-to-r from-amber-300/40 via-yellow-200/60 to-amber-400/40 blur-3xl pointer-events-none -z-10"
        />

        {/* Dynamic Golden Celestial Halo & Floral Tiara Overhead */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 3.2 / settings.animationSpeed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-11 sm:-top-14 w-38 h-10 sm:w-48 sm:h-12 rounded-[100%] border-[3px] border-amber-300 shadow-[0_0_50px_rgba(255,215,0,0.95)] bg-gradient-to-r from-amber-100/50 via-yellow-300/40 to-amber-100/50 blur-[0.5px] z-20 flex items-center justify-center"
        >
          <div className="w-24 h-1 sm:w-30 sm:h-1 rounded-full bg-yellow-200 blur-[1px]" />
        </motion.div>

        {/* Photorealistic Celestial Guardian Angel Container */}
        <div className="relative flex items-center justify-center my-2 sm:my-3">
          {isRealMode ? (
            <motion.div
              animate={{
                y: [0, -14, 0],
                scale: isWaving || isSmiling ? [1, 1.04, 1] : [1, 1, 1],
              }}
              transition={{
                y: { duration: 4.2 / settings.animationSpeed, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 1.5, repeat: Infinity },
              }}
              className="relative z-10 flex flex-col items-center max-w-sm sm:max-w-md pointer-events-auto"
            >
              {/* Photorealistic 3D Celestial Angel with Automatic 60 FPS Wing Flap & Wave Motion */}
              <motion.div
                animate={{
                  rotateY: [0, 22, -10, 22, 0],
                  scaleX: [1, 1.05, 0.96, 1.05, 1],
                  scaleY: [1, 1.03, 0.98, 1.03, 1],
                }}
                transition={{
                  duration: 2.8 / settings.animationSpeed,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative flex items-center justify-center pointer-events-auto"
              >
                <img
                  src="/images/real_angel.webp"
                  alt="Photorealistic 3D Celestial Guardian Angel"
                  onError={(e) => {
                    e.preventDefault();
                  }}
                  className="w-72 h-auto sm:w-96 md:w-[420px] drop-shadow-[0_0_55px_rgba(255,215,0,0.9)] object-contain filter brightness-110 contrast-105 mix-blend-screen"
                  style={{
                    maskImage: "radial-gradient(ellipse 55% 85% at 50% 50%, black 40%, transparent 82%)",
                    WebkitMaskImage: "radial-gradient(ellipse 55% 85% at 50% 50%, black 40%, transparent 82%)",
                  }}
                />
              </motion.div>

              {/* Featured Active Rose Applied directly on Real Angel Gown */}
              {activeRose && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0.9, 1.1, 1], opacity: 1, y: [0, -4, 0] }}
                  transition={{
                    scale: { type: "spring", stiffness: 400, damping: 20 },
                    y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center pointer-events-auto cursor-pointer"
                  onClick={() => removeAppliedRose(activeRose.id)}
                  title={`${activeRose.name}: ${activeRose.description} (Click to remove)`}
                >
                  <div
                    className="absolute w-14 h-14 sm:w-16 sm:h-16 rounded-full blur-md opacity-90 animate-pulse"
                    style={{ backgroundColor: activeRose.color }}
                  />
                  <div
                    className="relative px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-slate-950/95 border-2 border-amber-300 flex items-center space-x-1.5 shadow-[0_0_35px_rgba(255,215,0,1)] backdrop-blur-xl"
                    style={{ borderColor: activeRose.color }}
                  >
                    <span className="text-xl sm:text-2xl animate-bounce">{activeRose.iconSymbol}</span>
                    <span
                      className="text-xs sm:text-sm font-extrabold tracking-wide drop-shadow-sm"
                      style={{ color: activeRose.color }}
                    >
                      {activeRose.name}
                    </span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <>
          {/* Left Wing (Majestic Spreading White Feather Wing with 60 FPS Flap) */}
          <motion.div
            animate={{
              rotateY: [0, 26, 0],
              rotateZ: [-6, 6, -6],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 3.2 / settings.animationSpeed,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -left-38 sm:-left-52 -top-16 origin-right w-48 h-64 sm:w-60 sm:h-80 pointer-events-none drop-shadow-[0_0_45px_rgba(255,215,0,0.9)]"
          >
            <svg viewBox="0 0 240 320" className="w-full h-full">
              <defs>
                <linearGradient id="liveWingLeft" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="35%" stopColor="#FFFBF0" />
                  <stop offset="70%" stopColor="#FDE68A" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
                <filter id="liveFeatherGlow">
                  <feGaussianBlur stdDeviation="2.0" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M230,170 C180,20 60,0 5,45 C-25,120 35,210 135,255 C185,275 220,230 230,170 Z"
                fill="url(#liveWingLeft)"
                filter="url(#liveFeatherGlow)"
              />
              <path
                d="M215,160 C170,45 80,25 25,65 C5,125 55,195 145,220 Z"
                fill="#FFFFFF"
                opacity="0.95"
              />
              <path
                d="M195,150 C155,65 95,50 40,85 C30,135 75,185 135,200 Z"
                fill="#FFFBEB"
                opacity="0.98"
              />
              <path d="M160,80 L60,120 M180,115 L80,155 M190,150 L100,190" stroke="#F59E0B" strokeWidth="1.8" opacity="0.65" strokeLinecap="round" />
            </svg>
          </motion.div>

          {/* Right Wing (Majestic Spreading White Feather Wing with 60 FPS Flap) */}
          <motion.div
            animate={{
              rotateY: [0, -26, 0],
              rotateZ: [6, -6, 6],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 3.2 / settings.animationSpeed,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-38 sm:-right-52 -top-16 origin-left w-48 h-64 sm:w-60 sm:h-80 pointer-events-none drop-shadow-[0_0_45px_rgba(255,215,0,0.9)]"
          >
            <svg viewBox="0 0 240 320" className="w-full h-full">
              <defs>
                <linearGradient id="liveWingRight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="35%" stopColor="#FFFBF0" />
                  <stop offset="70%" stopColor="#FDE68A" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
              </defs>
              <path
                d="M10,170 C60,20 180,0 235,45 C265,120 205,210 105,255 C55,275 20,230 10,170 Z"
                fill="url(#liveWingRight)"
                filter="url(#liveFeatherGlow)"
              />
              <path
                d="M25,160 C70,45 160,25 215,65 C235,125 185,195 95,220 Z"
                fill="#FFFFFF"
                opacity="0.95"
              />
              <path
                d="M45,150 C85,65 145,50 200,85 C210,135 165,185 105,200 Z"
                fill="#FFFBEB"
                opacity="0.98"
              />
              <path d="M80,80 L180,120 M60,115 L160,155 M50,150 L140,190" stroke="#F59E0B" strokeWidth="1.8" opacity="0.65" strokeLinecap="round" />
            </svg>
          </motion.div>

          {/* Angel Character Body & Head */}
          <motion.div
            animate={{
              y: [0, -14, 0],
              scale: isWaving || isSmiling ? [1, 1.05, 1] : [1, 1, 1],
            }}
            transition={{
              y: { duration: 4.2 / settings.animationSpeed, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 1.5, repeat: Infinity },
            }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Head & Wavy Golden Hair */}
            <div className="relative w-28 h-28 sm:w-34 sm:h-34 rounded-full bg-gradient-to-b from-amber-100 via-amber-200 to-amber-400 p-1 shadow-[0_0_45px_rgba(255,215,0,1)] border-2 border-amber-300">
              {/* Golden Floral Tiara Crown Overhead */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 px-3.5 py-0.5 rounded-full bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 border border-amber-200 shadow-md text-[11px] font-black text-amber-950 flex items-center space-x-1">
                <span>👑</span>
                <span>Tiara</span>
              </div>

              {/* Long Flowing Wavy Golden Hair Locks */}
              <motion.div
                animate={{ rotate: [-4, 4, -4], scaleY: [1, 1.04, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 -left-6 w-36 h-30 sm:w-44 sm:h-36 bg-gradient-to-b from-amber-200 via-yellow-400 to-amber-600 rounded-full blur-[0.5px] -z-10 shadow-lg"
              />

              {/* Face Detail */}
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#FFFDF9] via-[#FFF3EB] to-[#FFE0D0] flex flex-col items-center justify-center relative overflow-hidden">
                {/* Soft Pink Blush */}
                <div className="absolute top-13 sm:top-15 left-4.5 w-6 h-4 sm:w-7 sm:h-4.5 rounded-full bg-rose-400/40 blur-[2px]" />
                <div className="absolute top-13 sm:top-15 right-4.5 w-6 h-4 sm:w-7 sm:h-4.5 rounded-full bg-rose-400/40 blur-[2px]" />

                {/* Sparkling Gorgeous Celestial Eyes (ALWAYS OPEN & PROPER SHOW) */}
                <div className="flex space-x-6 sm:space-x-8 mt-4.5 sm:mt-5.5">
                  <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-950 flex items-center justify-center shadow-md ring-2 ring-amber-300">
                    <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-200 to-white absolute top-0.5 left-0.5 shadow-sm" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white absolute top-0.5 left-0.5" />
                    <div className="w-0.5 h-0.5 rounded-full bg-white absolute bottom-1 right-1" />
                  </div>
                  <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-950 flex items-center justify-center shadow-md ring-2 ring-amber-300">
                    <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-200 to-white absolute top-0.5 left-0.5 shadow-sm" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white absolute top-0.5 left-0.5" />
                    <div className="w-0.5 h-0.5 rounded-full bg-white absolute bottom-1 right-1" />
                  </div>
                </div>

                {/* Smile Expression */}
                <div className="mt-3.5 sm:mt-4">
                  {isSmiling ? (
                    <div className="w-6.5 h-4 sm:w-7.5 sm:h-4.5 border-b-3 border-rose-500 rounded-b-full animate-bounce" />
                  ) : (
                    <div className="w-6 h-3 sm:w-6.5 sm:h-3 border-b-2 border-amber-950 rounded-b-full" />
                  )}
                </div>
              </div>
            </div>

            {/* Celestial Gown Dress & Arms */}
            <div className="relative -mt-2 flex flex-col items-center">
              {/* Raised Hand Wave Animation */}
              {isWaving && (
                <motion.div
                  animate={{ rotate: [0, 24, -12, 24, 0] }}
                  transition={{ duration: 1.2, repeat: 2 }}
                  className="absolute -right-12 sm:-right-13 top-1 w-8.5 h-13 sm:w-9.5 sm:h-14 origin-top-left bg-gradient-to-b from-amber-100 to-amber-200 rounded-full border border-amber-300 shadow-md"
                />
              )}

              {/* Multi-Draped Ivory Silk Gown with Gold Lace Trim */}
              <motion.div
                animate={{ scaleX: [1, 1.06, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-30 h-34 sm:w-38 sm:h-44 bg-gradient-to-b from-white via-amber-50 to-amber-300 rounded-t-2xl rounded-b-[50px] shadow-[0_18px_55px_rgba(255,215,0,0.85)] border-t-2 border-amber-300 flex flex-col items-center justify-end pb-3.5 border-b-4 relative overflow-hidden"
              >
                {/* Gold Lace Embroidery Corset Waistband */}
                <div className="absolute top-4 w-full h-4 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 opacity-90 flex items-center justify-center border-y border-amber-400">
                  <div className="w-18 h-1 bg-amber-600/40 rounded-full" />
                </div>
                <div className="w-24 h-2.5 sm:w-28 sm:h-2.5 rounded-full bg-amber-400/50 blur-[1px]" />
                <div className="w-18 h-1.5 sm:w-22 sm:h-2 rounded-full bg-amber-400/35 blur-[1px] mt-1" />
              </motion.div>

              {/* Floating Graceful Celestial Legs & Golden Sandals */}
              <motion.div
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative -mt-3.5 flex space-x-4.5 sm:space-x-5.5 z-0 pointer-events-none"
              >
                {/* Left Leg & Golden Sandal */}
                <div className="flex flex-col items-center">
                  <div className="w-4.5 h-11 sm:w-5 sm:h-13 bg-gradient-to-b from-[#FFE4D4] via-[#FFD2BC] to-[#FFC5A8] rounded-b-md shadow-inner border-r border-amber-200/50" />
                  <div className="w-6 h-4 sm:w-7 sm:h-4.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 rounded-b-full shadow-[0_0_14px_rgba(255,215,0,0.9)] border border-amber-200 -mt-0.5" />
                </div>

                {/* Right Leg & Golden Sandal */}
                <div className="flex flex-col items-center">
                  <div className="w-4.5 h-11 sm:w-5 sm:h-13 bg-gradient-to-b from-[#FFE4D4] via-[#FFD2BC] to-[#FFC5A8] rounded-b-md shadow-inner border-l border-amber-200/50" />
                  <div className="w-6 h-4 sm:w-7 sm:h-4.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 rounded-b-full shadow-[0_0_14px_rgba(255,215,0,0.9)] border border-amber-200 -mt-0.5" />
                </div>
              </motion.div>

              {/* Featured Active Rose Applied directly on Celestial Angel Chest */}
              {activeRose && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0.9, 1.1, 1], opacity: 1, y: [0, -4, 0] }}
                  transition={{
                    scale: { type: "spring", stiffness: 400, damping: 20 },
                    y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="absolute top-16 sm:top-20 z-30 flex flex-col items-center pointer-events-auto cursor-pointer"
                  onClick={() => removeAppliedRose(activeRose.id)}
                  title={`${activeRose.name}: ${activeRose.description} (Click to remove)`}
                >
                  <div
                    className="absolute w-14 h-14 sm:w-16 sm:h-16 rounded-full blur-md opacity-90 animate-pulse"
                    style={{ backgroundColor: activeRose.color }}
                  />
                  <div
                    className="relative px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-slate-950/95 border-2 border-amber-300 flex items-center space-x-1.5 shadow-[0_0_35px_rgba(255,215,0,1)] backdrop-blur-xl"
                    style={{ borderColor: activeRose.color }}
                  >
                    <span className="text-xl sm:text-2xl animate-bounce">{activeRose.iconSymbol}</span>
                    <span
                      className="text-xs sm:text-sm font-extrabold tracking-wide drop-shadow-sm"
                      style={{ color: activeRose.color }}
                    >
                      {activeRose.name}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
          </>
        )}
        </div>

        {/* Floating Ground Golden Reflection Shadow */}
        <div className="w-52 sm:w-68 h-5 sm:h-6 rounded-full bg-amber-400/40 blur-md sm:blur-lg -mt-3 shadow-[0_0_35px_rgba(255,215,0,0.9)]" />
      </div>
    </div>
  );
};

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
  const { settings, appliedRoses, removeAppliedRose } = useAngelStore();

  // Periodic natural eye blink
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const activeRose = appliedRoses.length > 0 ? appliedRoses[0] : null;

  return (
    <div className="relative flex flex-col items-center justify-center select-none pointer-events-auto group scale-75 sm:scale-90 md:scale-100 origin-center transition-transform duration-300">

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
        className="absolute -top-12 w-32 h-10 rounded-[100%] border-[4px] border-amber-300 shadow-[0_0_35px_rgba(255,215,0,0.9)] bg-gradient-to-r from-amber-200/40 via-yellow-400/20 to-amber-200/40 blur-[1px]"
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
          className="absolute -left-36 -top-10 origin-right w-44 h-64 pointer-events-none drop-shadow-[0_0_25px_rgba(255,215,0,0.7)]"
        >
          <svg viewBox="0 0 200 300" className="w-full h-full">
            <defs>
              <linearGradient id="wingGradLeft" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#FFF5C0" />
                <stop offset="100%" stopColor="#FFD700" />
              </linearGradient>
            </defs>
            {/* Feathers layers */}
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
          className="absolute -right-36 -top-10 origin-left w-44 h-64 pointer-events-none drop-shadow-[0_0_25px_rgba(255,215,0,0.7)]"
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
            y: [0, -8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative z-10 flex flex-col items-center"
        >
          {/* Head & Hair */}
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-b from-amber-100 via-amber-200 to-amber-300 p-1 shadow-[0_0_30px_rgba(255,215,0,0.8)] border-2 border-amber-300/60">
            {/* Flowing Golden Hair Wings */}
            <motion.div
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3 -left-4 w-36 h-28 bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-500 rounded-full blur-[1px] -z-10"
            />

            {/* Face Detail */}
            <div className="w-full h-full rounded-full bg-gradient-to-b from-[#FFF5EB] to-[#FFE3D1] flex flex-col items-center justify-center relative overflow-hidden">
              {/* Soft Pink Blush */}
              <div className="absolute top-14 left-3 w-5 h-3 rounded-full bg-pink-400/40 blur-[2px]" />
              <div className="absolute top-14 right-3 w-5 h-3 rounded-full bg-pink-400/40 blur-[2px]" />

              {/* Eyes (Open or Blinking) */}
              <div className="flex space-x-6 mt-4">
                {isBlinking ? (
                  <>
                    <div className="w-4 h-1 bg-amber-900 rounded-full" />
                    <div className="w-4 h-1 bg-amber-900 rounded-full" />
                  </>
                ) : (
                  <>
                    <div className="relative w-4 h-4 rounded-full bg-amber-950 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white absolute top-0.5 left-0.5" />
                    </div>
                    <div className="relative w-4 h-4 rounded-full bg-amber-950 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white absolute top-0.5 left-0.5" />
                    </div>
                  </>
                )}
              </div>

              {/* Cute Smile / Expression */}
              <div className="mt-3">
                {isSmiling ? (
                  <div className="w-6 h-3 border-b-4 border-pink-500 rounded-b-full animate-bounce" />
                ) : (
                  <div className="w-5 h-2 border-b-2 border-amber-900 rounded-b-full" />
                )}
              </div>
            </div>
          </div>

          {/* Celestial Gown Dress & Arms */}
          <div className="relative -mt-2 flex flex-col items-center">
            {/* Raised Hand Wave Animation when Reacting */}
            {isWaving && (
              <motion.div
                animate={{ rotate: [0, 20, -10, 20, 0] }}
                transition={{ duration: 1.2, repeat: 2 }}
                className="absolute -right-10 top-2 w-8 h-12 origin-top-left bg-gradient-to-b from-amber-100 to-amber-200 rounded-full border border-amber-300 shadow-sm"
              />
            )}

            {/* Floating Ethereal Dress */}
            <motion.div
              animate={{ scaleX: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-36 h-48 bg-gradient-to-b from-white via-amber-100 to-amber-300 rounded-t-3xl rounded-b-[60px] shadow-[0_15px_40px_rgba(255,215,0,0.6)] border-t-2 border-amber-200 flex flex-col items-center justify-end pb-4"
            >
              <div className="w-28 h-2 rounded-full bg-amber-400/40 blur-[1px]" />
              <div className="w-20 h-2 rounded-full bg-amber-400/30 blur-[1px] mt-2" />
            </motion.div>

            {/* Featured Active Rose Held / Applied on Angel */}
            {activeRose && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0.8, 1.15, 1], opacity: 1, y: [0, -6, 0] }}
                transition={{
                  scale: { type: "spring", stiffness: 400, damping: 20 },
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
                className="absolute top-20 z-30 flex flex-col items-center pointer-events-auto cursor-pointer"
                onClick={() => removeAppliedRose(activeRose.id)}
                title={`${activeRose.name}: ${activeRose.description} (Click to remove)`}
              >
                {/* Glowing Aura Ring behind Rose */}
                <div
                  className="absolute w-16 h-16 rounded-full blur-md opacity-80 animate-pulse"
                  style={{ backgroundColor: activeRose.color }}
                />

                {/* Rose Flower Badge */}
                <div
                  className="relative px-3 py-1.5 rounded-full bg-slate-950/90 border-2 flex items-center space-x-1.5 shadow-[0_0_25px_rgba(255,215,0,0.9)] backdrop-blur-md"
                  style={{ borderColor: activeRose.color }}
                >
                  <span className="text-2xl animate-bounce">{activeRose.iconSymbol}</span>
                  <span
                    className="text-xs font-extrabold tracking-wide"
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
      <div className="w-48 h-6 rounded-full bg-amber-400/20 blur-md -mt-4 shadow-[0_0_20px_rgba(255,215,0,0.5)]" />
    </div>
  );
};

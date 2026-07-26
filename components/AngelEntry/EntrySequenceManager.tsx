"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAngelStore } from "../../store/useAngelStore";
import { AngelAvatar } from "../Angel/AngelAvatar";
import { soundEngine } from "../../lib/soundEngine";

export const EntrySequenceManager: React.FC = () => {
  const { stage, activeEntryType, setStage, settings, reactionMessage, setAngelPos } = useAngelStore();
  const [sequenceStep, setSequenceStep] = useState(0);
  const angelRef = useRef<HTMLDivElement | null>(null);

  // Sync Angel position for precise Rose targeting
  useEffect(() => {
    const updatePos = () => {
      if (angelRef.current) {
        const rect = angelRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        setAngelPos({ x: centerX, y: centerY });
      }
    };

    updatePos();
    window.addEventListener("resize", updatePos);
    window.addEventListener("scroll", updatePos);
    const interval = setInterval(updatePos, 500);

    return () => {
      window.removeEventListener("resize", updatePos);
      window.removeEventListener("scroll", updatePos);
      clearInterval(interval);
    };
  }, [setAngelPos, stage]);

  useEffect(() => {
    if (stage === "calling") {
      setSequenceStep(1);

      // Play introductory portal/bell/wing sounds
      if (activeEntryType === 2) {
        soundEngine.playPortalSound(settings.volume, settings.sfxEnabled);
      } else {
        soundEngine.playBell(settings.volume, settings.sfxEnabled);
      }

      // Step transitions
      const t1 = setTimeout(() => {
        setSequenceStep(2);
        soundEngine.playWingFlap(settings.volume, settings.sfxEnabled);
      }, 1200);

      const t2 = setTimeout(() => {
        setSequenceStep(3);
        soundEngine.playLandingSound(settings.volume, settings.sfxEnabled);
        setStage("present");

        const entryGreetings: Record<number, string> = {
          1: "I have descended from the heavens for you! ✨",
          2: "Stepping through the portal to your heart! 💖",
          3: "Orbital celestial grace, just for you! 🌹",
          4: "Born from the starlight of your love! ⭐",
        };
        useAngelStore.getState().setReactionMessage(entryGreetings[activeEntryType] || "Welcome to Heaven! ✨");

        setTimeout(() => {
          useAngelStore.getState().setReactionMessage(null);
        }, 5000);
      }, 3200);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [stage, activeEntryType, setStage, settings.volume, settings.sfxEnabled]);

  if (stage === "dark_intro") return null;

  return (
    <div ref={angelRef} className="relative flex flex-col items-center justify-center my-4">
      {/* Prominent Fixed Top Reaction Toast / Angel Dialogue Whisper */}
      <AnimatePresence>
        {reactionMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className="fixed top-16 sm:top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 sm:px-8 sm:py-4 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-950 via-amber-950 to-slate-950 border-2 border-amber-300 shadow-[0_0_60px_rgba(255,215,0,0.95)] backdrop-blur-2xl text-amber-100 font-extrabold text-xs sm:text-base md:text-xl tracking-wide flex items-center space-x-2 sm:space-x-3 max-w-[92vw] text-center"
          >
            <span className="text-2xl animate-bounce">✨</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              {reactionMessage}
            </span>
            <span className="text-2xl animate-bounce">❤️</span>

            {/* Pointer indicator */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-amber-300" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Default Idle / Present Angel Visual */}
      {(stage === "ready" || stage === "present" || stage === "reacting") && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <AngelAvatar
            isSmiling={stage === "reacting"}
            isWaving={stage === "reacting"}
          />
        </motion.div>
      )}

      {/* Calling Entry Type Animations - Highly Visual & Cinematic */}
      {stage === "calling" && (
        <div className="relative flex items-center justify-center min-h-[320px]">
          {/* Entry Type 1: Heavenly Descent */}
          {activeEntryType === 1 && (
            <div className="relative flex flex-col items-center">
              {/* Heavenly Light Beam Stream */}
              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: [0, 0.8, 0.4], scaleY: [0, 1, 1] }}
                transition={{ duration: 1.5 }}
                className="absolute -top-[500px] w-64 h-[700px] bg-gradient-to-b from-amber-200/60 via-yellow-400/30 to-transparent blur-md rounded-full pointer-events-none -z-10"
              />

              <motion.div
                initial={{ y: -650, opacity: 0, scale: 0.4, rotate: -5 }}
                animate={{
                  y: sequenceStep >= 2 ? 0 : -250,
                  opacity: sequenceStep >= 1 ? 1 : 0,
                  scale: sequenceStep >= 2 ? 1 : 0.65,
                  rotate: sequenceStep >= 2 ? 0 : 5,
                }}
                transition={{
                  duration: 2.4 / settings.animationSpeed,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <AngelAvatar isSmiling={false} isWaving={false} />
              </motion.div>

              {/* Landing Golden Flare Burst */}
              {sequenceStep >= 2 && (
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 1.2 }}
                  className="absolute bottom-0 w-72 h-20 rounded-[100%] bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 blur-lg"
                />
              )}
            </div>
          )}

          {/* Entry Type 2: Ethereal Purple Portal */}
          {activeEntryType === 2 && (
            <div className="relative flex items-center justify-center">
              {/* Dual Swirling Outer & Inner Magic Portal Rings */}
              <motion.div
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: [0, 1.4, 1.1], rotate: 720 }}
                transition={{ duration: 2.2 / settings.animationSpeed, ease: "easeOut" }}
                className="absolute w-96 h-96 rounded-full border-[10px] border-purple-400 border-t-amber-300 shadow-[0_0_100px_rgba(168,85,247,0.95)] bg-gradient-to-tr from-purple-950/80 via-fuchsia-900/50 to-amber-400/30 blur-[1px] animate-portal-spin"
              />
              <motion.div
                initial={{ scale: 0, rotate: 360 }}
                animate={{ scale: [0, 1.2, 0.9], rotate: -360 }}
                transition={{ duration: 2.5 / settings.animationSpeed, ease: "easeOut" }}
                className="absolute w-72 h-72 rounded-full border-[6px] border-amber-300 border-b-purple-500 shadow-[0_0_60px_rgba(255,215,0,0.8)]"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.1, z: -200 }}
                animate={{
                  opacity: sequenceStep >= 2 ? 1 : 0,
                  scale: sequenceStep >= 2 ? 1 : 0.35,
                }}
                transition={{ duration: 1.8 / settings.animationSpeed, ease: "easeOut" }}
                className="relative z-10"
              >
                <AngelAvatar isSmiling={false} isWaving={false} />
              </motion.div>
            </div>
          )}

          {/* Entry Type 3: Orbital Celestial Flight */}
          {activeEntryType === 3 && (
            <div className="relative flex items-center justify-center">
              {/* Ribbon Trail Glow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2.2 }}
                className="absolute w-[500px] h-[300px] border-2 border-amber-300/60 rounded-full blur-sm -z-10 animate-pulse"
              />

              <motion.div
                initial={{ x: -500, y: -250, rotate: -35, opacity: 0, scale: 0.5 }}
                animate={{
                  x: sequenceStep >= 2 ? 0 : [ -400, 250, -150, 0 ],
                  y: sequenceStep >= 2 ? 0 : [ -250, -150, -200, 0 ],
                  rotate: sequenceStep >= 2 ? 0 : [ -35, 30, -15, 0 ],
                  scale: sequenceStep >= 2 ? 1 : [ 0.5, 1.2, 0.8, 1 ],
                  opacity: 1,
                }}
                transition={{ duration: 2.6 / settings.animationSpeed, ease: "easeInOut" }}
              >
                <AngelAvatar isSmiling={false} isWaving={false} />
              </motion.div>
            </div>
          )}

          {/* Entry Type 4: Constellation Genesis (Supernova Shockwave) */}
          {activeEntryType === 4 && (
            <motion.div
              animate={sequenceStep === 1 ? { x: [-12, 12, -8, 8, 0], y: [-6, 6, -4, 4, 0] } : {}}
              transition={{ duration: 0.6 }}
              className="relative flex items-center justify-center"
            >
              {/* Converging Starlight Supernova Burst */}
              {sequenceStep === 1 && (
                <>
                  <motion.div
                    initial={{ scale: 5, opacity: 0 }}
                    animate={{ scale: 0.1, opacity: 1 }}
                    transition={{ duration: 1.0 }}
                    className="absolute w-72 h-72 rounded-full border-4 border-amber-200 bg-amber-400/40 blur-md"
                  />
                  <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 4.5, opacity: 0 }}
                    transition={{ duration: 1.4 }}
                    className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-white via-amber-300 to-yellow-500 shadow-[0_0_150px_rgba(255,255,255,1)]"
                  />
                </>
              )}

              <motion.div
                initial={{ opacity: 0, scale: 2.2, filter: "blur(25px)" }}
                animate={{
                  opacity: sequenceStep >= 2 ? 1 : 0.2,
                  scale: sequenceStep >= 2 ? 1 : 1.6,
                  filter: sequenceStep >= 2 ? "blur(0px)" : "blur(12px)",
                }}
                transition={{ duration: 2.2 / settings.animationSpeed }}
              >
                <AngelAvatar isSmiling={false} isWaving={false} />
              </motion.div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

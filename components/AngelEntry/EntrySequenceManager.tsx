"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAngelStore } from "../../store/useAngelStore";
import { AngelAvatar } from "../Angel/AngelAvatar";
import { soundEngine } from "../../lib/soundEngine";
import { getEntryStyleInfo } from "../../lib/entryStyles";

export const EntrySequenceManager: React.FC = () => {
  const { stage, activeEntryType, setStage, settings, reactionMessage, setAngelPos } = useAngelStore();
  const [sequenceStep, setSequenceStep] = useState(0);
  const angelRef = useRef<HTMLDivElement | null>(null);

  // Sync Angel position for precise Rose targeting (Event-driven without layout thrashing)
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

    return () => {
      window.removeEventListener("resize", updatePos);
      window.removeEventListener("scroll", updatePos);
    };
  }, [setAngelPos, stage]);

  useEffect(() => {
    if (stage === "calling") {
      setSequenceStep(1);

      // Play sound effect per entry style
      switch (activeEntryType) {
        case 1:
          soundEngine.playBell(settings.volume, settings.sfxEnabled);
          soundEngine.playWingFlap(settings.volume, settings.sfxEnabled);
          break;
        case 2:
          soundEngine.playPortalSound(settings.volume, settings.sfxEnabled);
          break;
        case 3:
          soundEngine.playWingFlap(settings.volume, settings.sfxEnabled);
          soundEngine.playBell(settings.volume, settings.sfxEnabled);
          break;
        case 4:
          soundEngine.playCrackersPop(settings.volume, settings.sfxEnabled);
          break;
        case 5:
          soundEngine.playPhoenixRise(settings.volume, settings.sfxEnabled);
          break;
        case 6:
          soundEngine.playButterflySwarm(settings.volume, settings.sfxEnabled);
          break;
        default:
          soundEngine.playBell(settings.volume, settings.sfxEnabled);
      }

      // Step transitions for divine descent
      const t1 = setTimeout(() => {
        setSequenceStep(2);
        soundEngine.playWingFlap(settings.volume, settings.sfxEnabled);
      }, 1000);

      const t2 = setTimeout(() => {
        setSequenceStep(3);
        soundEngine.playLandingSound(settings.volume, settings.sfxEnabled);
        setStage("present");

        const styleInfo = getEntryStyleInfo(activeEntryType);
        useAngelStore.getState().setReactionMessage(styleInfo.greeting);

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
    <div ref={angelRef} className="relative flex flex-col items-center justify-center my-1 sm:my-2">
      {/* Prominent Fixed Top Reaction Toast / Angel Dialogue Whisper */}
      <AnimatePresence>
        {reactionMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className="fixed top-14 sm:top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 sm:px-6 sm:py-3 rounded-2xl bg-gradient-to-r from-slate-950 via-amber-950 to-slate-950 border-2 border-amber-300 shadow-[0_0_50px_rgba(255,215,0,0.9)] backdrop-blur-2xl text-amber-100 font-extrabold text-xs sm:text-base md:text-lg tracking-wide flex items-center space-x-2 sm:space-x-3 max-w-[90vw] text-center"
          >
            <span className="text-xl sm:text-2xl animate-bounce">✨</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              {reactionMessage}
            </span>
            <span className="text-xl sm:text-2xl animate-bounce">❤️</span>

            {/* Pointer indicator */}
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-amber-300" />
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

      {/* Calling Entry Type Animations - 6 Distinct AAA Visual Sequences */}
      {stage === "calling" && (
        <div className="relative flex items-center justify-center min-h-[220px] xs:min-h-[260px] sm:min-h-[340px]">
          {/* Entry Type 1: Heavenly Light Materialization & Rising Descent */}
          {activeEntryType === 1 && (
            <div className="relative flex flex-col items-center justify-center">
              {/* Converging Golden Particles & Soft Light Rays */}
              <motion.div
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: [0, 1, 0.7], scale: [0.2, 1.8, 1.2] }}
                transition={{ duration: 3.5 / settings.animationSpeed, ease: "easeInOut" }}
                className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-t from-amber-300/60 via-yellow-200/40 to-transparent blur-2xl pointer-events-none -z-10"
              />

              {/* Angel Materializing & Floating Upward from Bottom Center (4-6s Duration) */}
              <motion.div
                initial={{ y: 280, opacity: 0, scale: 0.5 }}
                animate={{
                  y: sequenceStep >= 2 ? 0 : 140,
                  opacity: sequenceStep >= 1 ? 1 : 0,
                  scale: sequenceStep >= 2 ? 1 : 0.75,
                }}
                transition={{
                  duration: 4.2 / settings.animationSpeed,
                  ease: [0.16, 1, 0.3, 1], // Smooth Disney/Pixar ease-in-out curve
                }}
              >
                <AngelAvatar isSmiling={false} isWaving={false} />
              </motion.div>

              {/* Landing Golden Flare Burst & Sparkle Explosion */}
              {sequenceStep >= 2 && (
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 3.2, opacity: 0 }}
                  transition={{ duration: 1.6 }}
                  className="absolute bottom-0 w-96 h-28 rounded-[100%] bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-400 blur-2xl"
                />
              )}
            </div>
          )}

          {/* Entry Type 2: Mystic Portal Vortex */}
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

          {/* Entry Type 3: Celestial Orbital Flight */}
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
                  x: sequenceStep >= 2 ? 0 : [-400, 250, -150, 0],
                  y: sequenceStep >= 2 ? 0 : [-250, -150, -200, 0],
                  rotate: sequenceStep >= 2 ? 0 : [-35, 30, -15, 0],
                  scale: sequenceStep >= 2 ? 1 : [0.5, 1.2, 0.8, 1],
                  opacity: 1,
                }}
                transition={{ duration: 2.6 / settings.animationSpeed, ease: "easeInOut" }}
              >
                <AngelAvatar isSmiling={false} isWaving={false} />
              </motion.div>
            </div>
          )}

          {/* Entry Type 4: Starlight Supernova Genesis */}
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

          {/* Entry Type 5: Golden Phoenix Rise */}
          {activeEntryType === 5 && (
            <div className="relative flex flex-col items-center justify-center">
              {/* Divine Golden Flame Radiance */}
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: [0, 1.3, 1], opacity: [0, 0.9, 0.4] }}
                transition={{ duration: 1.8 }}
                className="absolute bottom-0 w-80 h-96 rounded-full bg-gradient-to-t from-amber-500 via-orange-400/50 to-transparent blur-xl pointer-events-none -z-10"
              />

              {/* Flame Wing Shapes */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0.7] }}
                transition={{ duration: 2.0 }}
                className="absolute w-96 h-48 rounded-full bg-gradient-to-r from-red-500/30 via-amber-300/60 to-yellow-400/30 blur-md pointer-events-none -z-10"
              />

              <motion.div
                initial={{ y: 350, opacity: 0, scale: 0.5 }}
                animate={{
                  y: sequenceStep >= 2 ? 0 : 120,
                  opacity: sequenceStep >= 1 ? 1 : 0,
                  scale: sequenceStep >= 2 ? 1 : 0.75,
                }}
                transition={{
                  duration: 2.5 / settings.animationSpeed,
                  ease: "easeOut",
                }}
              >
                <AngelAvatar isSmiling={false} isWaving={false} />
              </motion.div>
            </div>
          )}

          {/* Entry Type 6: Diamond Butterfly Tempest */}
          {activeEntryType === 6 && (
            <div className="relative flex items-center justify-center">
              {/* Swarm of Fluttering Crystal Butterflies */}
              {[...Array(12)].map((_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const radius = 140;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={i}
                    initial={{ x: x * 2, y: y * 2, opacity: 0, scale: 0 }}
                    animate={{
                      x: sequenceStep >= 2 ? [x, 0] : [x * 1.5, x],
                      y: sequenceStep >= 2 ? [y, 0] : [y * 1.5, y],
                      rotate: [0, 360],
                      opacity: sequenceStep >= 2 ? [1, 0] : [0, 1, 0.8],
                      scale: sequenceStep >= 2 ? [1.2, 0] : [0.5, 1],
                    }}
                    transition={{
                      duration: 2.4 / settings.animationSpeed,
                      delay: i * 0.08,
                      ease: "easeInOut",
                    }}
                    className="absolute text-3xl pointer-events-none z-20 drop-shadow-[0_0_12px_rgba(236,72,153,0.9)]"
                  >
                    🦋
                  </motion.div>
                );
              })}

              {/* Sparkle Burst Aura */}
              <motion.div
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{
                  opacity: sequenceStep >= 2 ? 1 : 0.4,
                  scale: sequenceStep >= 2 ? 1 : 0.6,
                }}
                transition={{ duration: 1.8 / settings.animationSpeed }}
              >
                <AngelAvatar isSmiling={false} isWaving={false} />
              </motion.div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

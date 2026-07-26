"use client";

import React, { useEffect, useRef } from "react";
import { useAngelStore } from "../../store/useAngelStore";
import { ActiveFlyingRose } from "../../types/angel";
import { soundEngine } from "../../lib/soundEngine";

interface FlyingRoseProps {
  rose: ActiveFlyingRose;
}

export const FlyingRose: React.FC<FlyingRoseProps> = ({ rose }) => {
  const { updateRoseProgress, removeRose, applyRoseToAngel, setStage, setReactionMessage, triggerFireworksBurst, settings } = useAngelStore();
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    let lastTime = performance.now();

    const animate = (now: number) => {
      const delta = (now - lastTime) / 16.66;
      lastTime = now;

      if (rose.progress >= 0.96) {
        // Hit target (Angel body reached!)
        if (rose.item) {
          applyRoseToAngel(rose.item);
        }

        soundEngine.playAngelWhisper(settings.volume, settings.sfxEnabled);
        soundEngine.playMagicSparkle(settings.volume, settings.sfxEnabled);

        setStage("reacting");
        triggerFireworksBurst();

        // Romantic reaction messages
        const whispers = [
          "My heart blossoms for you! ❤️",
          "Thank you for this beautiful rose, my love! ✨",
          "Your affection brightens all of heaven! 🌹",
          "Forever entwined in celestial grace! 💖",
        ];
        const randomMsg = whispers[Math.floor(Math.random() * whispers.length)];
        setReactionMessage(randomMsg);

        setTimeout(() => {
          setStage("present");
        }, 3000);

        setTimeout(() => {
          setReactionMessage(null);
        }, 4500);

        removeRose(rose.id);
        return;
      }

      updateRoseProgress(rose.id, delta);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [rose, updateRoseProgress, removeRose, setStage, setReactionMessage, triggerFireworksBurst, settings]);

  // Quadratic Bezier Formula: P(t) = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
  const t = rose.progress;
  const currentX =
    (1 - t) * (1 - t) * rose.startX +
    2 * (1 - t) * t * rose.controlX +
    t * t * rose.targetX;
  const currentY =
    (1 - t) * (1 - t) * rose.startY +
    2 * (1 - t) * t * rose.controlY +
    t * t * rose.targetY;

  return (
    <div
      className="pointer-events-none fixed z-40"
      style={{
        transform: `translate3d(${currentX}px, ${currentY}px, 0) scale(${1 - t * 0.35})`,
        opacity: t > 0.9 ? (1 - t) * 10 : 1,
      }}
    >
      <div className="relative flex items-center justify-center">
        {/* Sparkle Particle Trail behind flying rose */}
        <div
          className="absolute w-10 h-10 rounded-full blur-md opacity-80 animate-ping"
          style={{ backgroundColor: rose.color }}
        />

        {/* Rose SVG Icon */}
        <svg
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill={rose.color}
          className="drop-shadow-[0_0_20px_rgba(255,215,0,0.95)] animate-spin-slow"
        >
          <path d="M12 2C9.24 2 7 4.24 7 7c0 1.95 1.11 3.63 2.73 4.47L8 20h8l-1.73-8.53C15.89 10.63 17 8.95 17 7c0-2.76-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
          <circle cx="12" cy="7" r="4" fill={rose.color} />
        </svg>
      </div>
    </div>
  );
};

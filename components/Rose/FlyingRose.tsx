"use client";

import React, { useEffect, useState, useRef } from "react";
import { useAngelStore } from "../../store/useAngelStore";
import { ActiveFlyingRose } from "../../types/angel";
import { soundEngine } from "../../lib/soundEngine";

interface FlyingRoseProps {
  rose: ActiveFlyingRose;
}

export const FlyingRose: React.FC<FlyingRoseProps> = ({ rose }) => {
  const [progress, setProgress] = useState(0);
  const { removeRose, applyRoseToAngel, setStage, setReactionMessage, triggerFireworksBurst, settings } = useAngelStore();
  const requestRef = useRef<number | null>(null);
  const isFinishedRef = useRef(false);

  useEffect(() => {
    let lastTime = performance.now();

    const animate = (now: number) => {
      if (isFinishedRef.current) return;
      const delta = (now - lastTime) / 16.66;
      lastTime = now;

      setProgress((prev) => {
        const next = prev + rose.speed * delta;
        if (next >= 0.96) {
          isFinishedRef.current = true;

          // Defer store dispatches to microtask to prevent React "setState in render" warning
          queueMicrotask(() => {
            if (rose.item) {
              applyRoseToAngel(rose.item);
            }

            soundEngine.playAngelWhisper(settings.volume, settings.sfxEnabled);
            soundEngine.playMagicSparkle(settings.volume, settings.sfxEnabled);

            setStage("reacting");
            triggerFireworksBurst();

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
          });

          return 1;
        }
        return next;
      });

      if (!isFinishedRef.current) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [rose.id, rose.speed, rose.item, removeRose, applyRoseToAngel, setStage, setReactionMessage, triggerFireworksBurst, settings.volume, settings.sfxEnabled]);

  // Quadratic Bezier Formula: P(t) = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
  const t = progress;
  // Pure straight-up vertical ascent through the middle of the screen
  const currentX =
    (1 - t) * (1 - t) * rose.startX +
    2 * (1 - t) * t * rose.controlX +
    t * t * rose.targetX;
  const currentY =
    (1 - t) * (1 - t) * rose.startY +
    2 * (1 - t) * t * rose.controlY +
    t * t * rose.targetY;

  // Scale starts at 1.0 right from bottom box, expands to 1.35 mid-flight, and lands at 1.0
  const scale = t < 0.3 ? 1.0 + t * 1.16 : t < 0.85 ? 1.35 - (t - 0.3) * 0.63 : 1.0;
  const rotation = t * 360;

  return (
    <div
      className="pointer-events-none fixed z-[9999] transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${currentX}px, ${currentY}px, 0) scale(${scale}) rotate(${rotation}deg)`,
        opacity: t > 0.94 ? (1 - t) * 16.6 : 1, // 100% Fully visible right from bottom box (t=0)
      }}
    >
      <div className="relative flex items-center justify-center">
        {/* Soft Glowing Aura Trail behind flying rose */}
        <div
          className="absolute w-14 h-14 rounded-full blur-md opacity-90 animate-pulse"
          style={{ backgroundColor: rose.color }}
        />

        {/* Trailing Particle Sparkles & Hearts */}
        <div className="absolute -bottom-6 flex items-center space-x-1 opacity-85 pointer-events-none animate-bounce">
          <span className="text-xs text-yellow-300 drop-shadow-md">✨</span>
          <span className="text-[10px] text-pink-400 drop-shadow-md">💖</span>
          <span className="text-xs text-amber-200 drop-shadow-md">✨</span>
        </div>

        {/* Arrival Bloom Expansion Ring when approaching Angel */}
        {t > 0.75 && (
          <div
            className="absolute w-20 h-20 rounded-full border-2 border-amber-300 animate-ping opacity-75"
            style={{ borderColor: rose.color }}
          />
        )}

        {/* Rose Symbol / Icon */}
        {rose.item ? (
          <div className="relative px-3.5 py-1.5 rounded-full bg-slate-950/95 border-2 flex items-center space-x-1.5 shadow-[0_0_35px_rgba(255,215,0,1)] backdrop-blur-md" style={{ borderColor: rose.color }}>
            <span className="text-2xl sm:text-3xl animate-bounce">{rose.item.iconSymbol}</span>
            <span className="text-xs sm:text-sm font-black tracking-wide" style={{ color: rose.color }}>
              {rose.item.name}
            </span>
          </div>
        ) : (
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill={rose.color}
            className="drop-shadow-[0_0_25px_rgba(255,215,0,1)]"
          >
            <path d="M12 2C9.24 2 7 4.24 7 7c0 1.95 1.11 3.63 2.73 4.47L8 20h8l-1.73-8.53C15.89 10.63 17 8.95 17 7c0-2.76-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
            <circle cx="12" cy="7" r="4" fill={rose.color} />
          </svg>
        )}
      </div>
    </div>
  );
};
